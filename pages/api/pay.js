
import JSONProducts from '/public/products.json';
const mysql = require('mysql');
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Environment = require('transbank-sdk').Environment;


// setting webpay
WebpayPlus.commerceCode = process.env.commerceCode;
WebpayPlus.apiKey = process.env.apiKey;
// WebpayPlus.environment = Environment.Integration;


export default async function Pay(request, respond) {
    const cart = request.body;
    if (typeof cart !== 'object') {//termina la ejecución si el body no es un objeto
        respond.json({status: 400});
        return;
    }


    let totalPrice = 0;
    for (let key in cart) {
        const product = JSONProducts[key];
        if (product !== undefined) {
            totalPrice += product['price'];
        }
    }
    
    if (totalPrice === 0) {// termina la ejecución si el precio total es 0. Esto puede pasar si se altera el sessionStorage ingresando valores inválidos o si un bug hace que no se hayan guardado
        respond.json({status: 400});
        return;
    }

    const buyOrder = 'O-' + Math.floor(Math.random() * 10000) + 1;
    const sessionId = 'S-' + Math.floor(Math.random() * 10000) + 1;
    const amount = totalPrice;
    const returnUrl = request.headers.origin + '/receipt';  //GENERARÁ ERROR?
    
    const createResponse = await (new WebpayPlus.Transaction()).create(
        buyOrder,
        sessionId,
        amount,
        returnUrl
    );

    const token = createResponse.token;
    const url = createResponse.url;
    const viewData = {
        buyOrder,
        sessionId,
        amount,
        returnUrl,
        token,
        url,
    };




    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    //     con.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log("1 record inserted");
    //     });
    //   });






    respond.json({
        status: 200,
        token,
        url
    });
};
