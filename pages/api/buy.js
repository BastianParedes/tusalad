
import JSONProducts from '/products.json';
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Environment = require('transbank-sdk').Environment;


// setting webpay
// WebpayPlus.commerceCode = 597055555532;
// WebpayPlus.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
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
    const returnUrl = 'http://localhost:3000/api/webpay_plus/commit';
    // request.protocol + "://" + request.get("host") + "/webpay_plus/commit";

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
