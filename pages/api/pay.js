// 4051 8842 3993 7763
import JSONProducts from '/public/products.json';
const mysql = require('mysql2/promise');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;


export default async function Pay(request, respond) {

    if (typeof request.body.cart !== 'object') {//termina la ejecución si el body no es un objeto
        respond.json({status: 400});
        return;
    }

    const DBcart = {};
    let amount = 0;
    for (let key in request.body.cart) {
        const product = JSONProducts[key];
        if (product !== undefined) {//comprueba que la key sea válida
            if (typeof request.body.cart[key] === 'number') {//comprueba que la cantidad solcitiada de ese producto sea realmente un número
                let quantity = request.body.cart[key];
                if (quantity > 0 && Number.isInteger(quantity)) {
                    amount += quantity * product['price'];
                    DBcart[key] = quantity;
                }
            }
        }
    }


    if (amount === 0) {// termina la ejecución si el precio total es 0. Esto puede pasar si se altera el sessionStorage ingresando valores inválidos o si un bug hace que no se hayan guardado
        respond.json({status: 400});
        return;
    }


    const promiseConnection = await mysql.createConnection({
        host: process.env.sqlHost,
        user: process.env.sqlUser,
        password: process.env.sqlPassword,
        database: process.env.sqlDB,
    });



    var response = await promiseConnection.query(`SELECT \`buyOrder\` FROM \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` WHERE \`buyOrder\`=(SELECT max(\`buyOrder\`) FROM \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\`)`);
    let buyOrder;
    if (response[0].length !== 0) {
        buyOrder = response[0][0].buyOrder + 1;
    } else if (response[0].length === 0) {
        buyOrder = 0;
    }


    const transaction = await new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration)).create(
        'TU-SALAD-' + buyOrder, //orden de compra
        'S-' + buyOrder, //session id
        amount,
        request.headers.origin + '/receipt'  //return URL    //GENERARÁ ERROR?
    );


    const data = {
        buyOrder,
        token_ws: transaction.token,
        amount,
        rut: request.body.rut,
        name: request.body.name,
        e_mail: request.body['e-mail'],
        products: JSON.stringify(DBcart),
        city: request.body.city,
        address: request.body.address,
    };




    var response = await promiseConnection.query(`DESCRIBE \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\``);
    let fields = response[0].map(column => column.Field);
    let sqlFields = '(`' + fields.join('`,`') + '`)';

    let sqlValues = '('
    
    for (let field of fields) {
        sqlValues += `\'${data[field].toString().replaceAll('\\','\\\\').replaceAll('\'','\\\'')}\',`;
    }
    sqlValues = sqlValues.slice(0, -1) + ')';

    await promiseConnection.query(`INSERT INTO \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` ${sqlFields} VALUES ${sqlValues};`);

    respond.json({
        status: 200,
        token_ws: transaction.token,//no cambiar a token_ws
        url: transaction.url
    });
};
