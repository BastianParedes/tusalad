
import JSONProducts from '/public/products.json';
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Environment = require('transbank-sdk').Environment;


// setting webpay
WebpayPlus.commerceCode = process.env.commerceCode;
WebpayPlus.apiKey = process.env.apiKey;
// WebpayPlus.environment = Environment.Integration;


export default async function (request, respond) {

    let totalPrice = 0;
    request.body.products.forEach((info) => {
        const JSONProduct = JSONProducts.products.find((JSONInfo) => info.id === JSONInfo.id);
        totalPrice += info.quantity * JSONProduct.price;
    });

    const buyOrder = 'O-' + Math.floor(Math.random() * 10000) + 1;
    const sessionId = 'S-' + Math.floor(Math.random() * 10000) + 1;
    const amount = totalPrice;
    const returnUrl = request.headers.origin + '/api/webpay_plus';  //GENERARÁ ERROR?

    

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

    respond.json({
        token,
        url
    });
};
