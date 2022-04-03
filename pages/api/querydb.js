
const mysql = require('mysql2/promise');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;


export default async function Db(request, respond) {
    if (request.method !== 'POST') {
        return;    
    }
    console.log('QUERYDB');
    const token_ws = request.body.token_ws;

    const promiseConnection = await mysql.createConnection({
        host: process.env.sqlHost,
        user: process.env.sqlUser,
        password: process.env.sqlPassword,
        database: process.env.sqlDB,
    });

    let data = await promiseConnection.query(`SELECT * FROM \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` WHERE \`token_ws\` = '${token_ws}';`);
    respond.json(data[0][0]);

    const transaction = new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration));
    const transactionStatus = await transaction.status(token_ws);
    console.log(transactionStatus);

}


// {
//     WEBPAY: '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
//     PATPASS_COMERCIO: 'cxxXQgGD9vrVe4M41FIt'
// }


// transaction.getTransactionResult(token)
//   .then((response) => {
//     const output = response.detailOutput[0];
//     if (output.responseCode === 0) {
//       // La transacción se ha realizado correctamente
//     }
//   })
//   .catch((error) => {
//     console.log(error.toString())
//     // Cualquier error durante la transacción será recibido acá
//   });


// {
//     vci: 'TSY',
//     amount: 2000,
//     status: 'INITIALIZED',
//     buy_order: 'TU-SALAD-18',
//     session_id: 'S-18',
//     card_detail: { card_number: '7763' },
//     accounting_date: '0403',
//     transaction_date: '2022-04-03T16:11:22.098Z',
//     payment_type_code: 'VD',
//     installments_number: 0
//   }