// 4051 8842 3993 7763
import JSONProducts from '/public/products.json';
const mysql = require('mysql2/promise');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;


export default async function Pay(request, response) {

    if (typeof request.body.cart !== 'object') {//termina la ejecución si el body no es un objeto
        response.json({status: 400});
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
        response.json({status: 400});
        return;
    }


    const promiseConnection = await mysql.createConnection({
        host: process.env.sqlHost,
        user: process.env.sqlUser,
        password: process.env.sqlPassword,
        database: process.env.sqlDB,
    });



    var queryResponse = await promiseConnection.query(`SELECT \`buyOrder\` FROM \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` WHERE \`buyOrder\`=(SELECT max(\`buyOrder\`) FROM \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\`)`);
    let buyOrder;
    if (queryResponse[0].length !== 0) {
        buyOrder = queryResponse[0][0].buyOrder + 1;
    } else if (queryResponse[0].length === 0) {
        buyOrder = 0;
    }

    const transaction = await new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration)).create(
        'TU-SALAD-' + buyOrder, //orden de compra
        'S-' + buyOrder, //session id
        amount,
        request.headers.origin + '/api/endpayment'  //return URL    //GENERARÁ ERROR?
    );


    const date = new Date();
    const DBVaules = {
        buyOrder,
        token_ws: transaction.token,
        status: 'INITIALIZED',
        amount,
        rut: request.body.rut,
        name: request.body.name,
        e_mail: request.body.e_mail,
        products: JSON.stringify(DBcart),
        city: request.body.city,
        address: request.body.address,
        date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };



    var queryResponse = await promiseConnection.query(`DESCRIBE \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\``);
    let fields = queryResponse[0].map(column => column.Field);
    let sqlFields = '(`' + fields.join('`,`') + '`)';

    let sqlValues = '('

    for (let field of fields) {
        sqlValues += `\'${DBVaules[field].toString().replaceAll('\\','\\\\').replaceAll('\'','\\\'')}\',`;
    }
    sqlValues = sqlValues.slice(0, -1) + ')';

    await promiseConnection.execute(`INSERT INTO \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` ${sqlFields} VALUES ${sqlValues};`);

    response.json({
        status: 200,
        token_ws: transaction.token,//no cambiar a token_ws
        url: transaction.url
    });
};
