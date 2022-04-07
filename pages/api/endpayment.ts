
const mysql = require('mysql2/promise');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;

// tanto el pago como el rechazo final usan get y mandan solo token_ws
// Si se cancela antes en el botón, usa post y tiene TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION
// http://localhost:3000/api/endpayment?TBK_ORDEN_COMPRA=ORDER-19&TBK_ID_SESION=SESSION-19

export default async function Db(request, response) {

    const transaction = new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration));

    if (request.method === 'GET') {//Transacción completa o cancelada al final o pasaron 10 minutos sin pagar.
        let token: string|undefined = request.query.token_ws;
        const TBK_ORDEN_COMPRA: string|undefined = request.query.TBK_ORDEN_COMPRA;
        const TBK_ID_SESION: string|undefined = request.query.TBK_ID_SESION;

        const promiseConnection = await mysql.createConnection({
            host: process.env.sqlHost,
            user: process.env.sqlUser,
            password: process.env.sqlPassword,
            database: process.env.sqlDB,
        });

        if (token === undefined) {
            let response = await promiseConnection.query(`select token_ws from \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` WHERE \`buyOrderNumber\` = ${TBK_ORDEN_COMPRA}`);
            let object = response[0][0];
            token = object.token;
        } else {
            const webpayPlusStatus = await transaction.commit(token);
            await promiseConnection.execute(`UPDATE \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` SET \`status\` = '${webpayPlusStatus.status}' WHERE (\`token\` = '${token}');`);
        }

        await promiseConnection.end();

        response.redirect(307, `/receipt?token=${token}`);



    } else if (request.method === 'POST') {//Se devuelve a la página con el botón al inicio del pago.
        const token: string = request.body.TBK_TOKEN;
        const order: string = request.body.TBK_ORDEN_COMPRA;
        const session: string = request.body.TBK_ID_SESION;

        const webpayPlusStatus = await transaction.status(token);

        response.redirect(307, `/receipt?token=${token}`);
    }



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
// http://localhost:3000/api/endpayment?TBK_ORDEN_COMPRA=ORDER-19&TBK_ID_SESION=SESSION-19
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