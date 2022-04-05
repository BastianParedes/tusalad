
const mysql = require('mysql2/promise');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;


export default async function Db(request, response) {
    if (request.method !== 'GET' && request.method !== 'POST') {
        return;
    }
    const token_ws: string = request.method === 'GET' ? request.query.token_ws : request.body.TBK_TOKEN;


    const transaction = new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration));
    const webpayPlusStatus = await transaction.commit(token_ws);    //ARREGLAR YA QUE NO SE PUEDE USAR SI EL USUARIO CANCELA ANTES DE PAGAR


    const promiseConnection = await mysql.createConnection({
        host: process.env.sqlHost,
        user: process.env.sqlUser,
        password: process.env.sqlPassword,
        database: process.env.sqlDB,
    });

    await promiseConnection.execute(`UPDATE \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` SET \`status\` = '${webpayPlusStatus.status}' WHERE (\`token_ws\` = '${token_ws}');`);
    await promiseConnection.end();


    response.redirect(307, `/receipt?token_ws=${token_ws}`);
}




// Para verificar si una transacción fue aprobada, debes confirmar el que código de respuesta response_code sea exactamente 0 y que el estado status sea exactamente AUTHORIZED.

// SE INICIÓ EL PROCESO, PERO AUN NO TERMINA
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

// EL USUARIO CANCELA
// {
//     vci: 'TSN',
//     amount: 2000,
//     status: 'FAILED',
//     buy_order: 'TU-SALAD-27',
//     session_id: 'S-27',
//     card_detail: { card_number: '2022' },
//     accounting_date: '0403',
//     transaction_date: '2022-04-04T02:17:30.953Z',
//     authorization_code: '000000',
//     payment_type_code: 'VD',
//     response_code: -1,
//     installments_number: 0
//   }


// PASÓ DEMASIADO TIEMPO
// https://webpay3gint.transbank.cl/webpayserver/error.cgi?TBK_TOKEN=01ab1f1c36286108d6c29f5d47bb53ca556247065126c2439cc1397344c5e999
// {
//     vci: 'ABO',
//     amount: 4000,
//     status: 'FAILED',
//     buy_order: 'TU-SALAD-30',
//     session_id: 'S-30',
//     card_detail: { card_number: '2022' },
//     accounting_date: '0403',
//     transaction_date: '2022-04-04T02:30:39.160Z',
//     authorization_code: '156520',
//     payment_type_code: 'VD',
//     response_code: 0,
//     installments_number: 0
//   }


// TRANSACCION COMPLETA Y EXITOSA
// {
//     vci: 'TSY',
//     amount: 2000,
//     status: 'AUTHORIZED',
//     buy_order: 'TU-SALAD-24',
//     session_id: 'S-24',
//     card_detail: { card_number: '7763' },
//     accounting_date: '0403',
//     transaction_date: '2022-04-04T02:12:28.848Z',
//     authorization_code: '1415',
//     payment_type_code: 'VD',
//     response_code: 0,
//     installments_number: 0
//   }


// CLIENTE ANULA LA COMPRA ANTES DE PAGAR
// [Object: null prototype] {
//     TBK_TOKEN: '01ab0162729c673a3254c238b960295405a7641b8eab12f626dddf9729edf229',
//     TBK_ORDEN_COMPRA: 'TU-SALAD-15',
//     TBK_ID_SESION: 'S-15'
// }