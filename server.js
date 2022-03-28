"use strict";

// require
const JSONProducts = require('./products.json');
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Environment = require('transbank-sdk').Environment;
const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

// setting webpay
WebpayPlus.commerceCode = 597055555532;
WebpayPlus.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
WebpayPlus.environment = Environment.Integration;

// routes
app.use('/', express.static(__dirname + '/frontend/main/build/'));
app.get('/', function (request, respond) {
    respond.sendFile(__dirname + '/frontend/main/build/index.html');
});


app.use('/cart', express.static(__dirname + '/frontend/cart/build/'));
app.get('/cart', function (request, respond) {
    respond.sendFile(__dirname + '/frontend/cart/build/index.html');
});


app.post('/buy', async function (request, respond) {

    let totalPrice = 0;
    request.body.products.forEach((info) => {
        let JSONProduct = JSONProducts.products.find((JSONInfo) => info.id === JSONInfo.id);
        totalPrice += info.quantity * JSONProduct.price;
    });


    let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    let amount = totalPrice;
    let returnUrl = request.protocol + "://" + request.get("host") + "/webpay_plus/commit";

    const createResponse = await (new WebpayPlus.Transaction()).create(
        buyOrder,
        sessionId,
        amount,
        returnUrl
    );

    let token = createResponse.token;
    let url = createResponse.url;
  
    let viewData = {
        buyOrder,
        sessionId,
        amount,
        returnUrl,
        token,
        url,
    };

    respond.json({token, url});
});


// settings
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'));
console.log('http://localhost:3000/');




