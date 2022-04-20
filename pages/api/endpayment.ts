
const mongodb: any = require('mongodb');
const transbank: any = require('transbank-sdk');

const WebpayPlus: any = transbank.WebpayPlus;
const Environment: any = transbank.Environment;
const Options: any = transbank.Options;

// tanto el pago como el rechazo final usan get y mandan solo token_ws
// Si se cancela antes en el botón, usa post y tiene TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION
// http://localhost:3000/api/endpayment?TBK_ORDEN_COMPRA=ORDER-19&TBK_ID_SESION=SESSION-19

export default async function Db(request: any, response: any) {
    if (request.method !== 'GET' && request.method !== 'POST') return;

    const transaction = new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration));
    let buyOrder: string|undefined;

    if (request.method === 'GET') {//Transacción completa o cancelada al final o pasaron 10 minutos sin pagar.
        let token: string|undefined = request.query.token_ws;
        const TBK_ORDEN_COMPRA: string|undefined = request.query.TBK_ORDEN_COMPRA;
        const TBK_ID_SESION: string|undefined = request.query.TBK_ID_SESION;

        const client: any = new mongodb.MongoClient(process.env.mongodbURI);
        await client.connect();
        const db: any = client.db(process.env.mongodbDB);
        const collection: any = db.collection(process.env.mongodbCollection);

        if (token === undefined) {
            buyOrder = TBK_ORDEN_COMPRA;

            const findResult = await collection.findOne({ _id: new mongodb.ObjectId(buyOrder) });
            const token = findResult.token;//error
            const status = await transaction.commit(token);
            await collection.updateOne({ _id: new mongodb.ObjectId(buyOrder) }, { $set: { status } });

        } else if (token !== undefined) { // COMPRA COMPLETA O CANCELADA AL FINAL
            const status = await transaction.commit(token);
            await collection.updateOne({ token }, { $set: { status } });
            const findResult = await collection.findOne({ token });
            buyOrder = findResult._id.toHexString();
        }

        await client.close();




    } else if (request.method === 'POST') {//Se devuelve a la página con el botón al inicio del pago.
        const token: string = request.body.TBK_TOKEN;
        buyOrder = request.body.TBK_ORDEN_COMPRA;
        const session: string = request.body.TBK_ID_SESION;
    }

    response.redirect(307, `/receipt?buyOrder=${buyOrder}`);


}

// TODO CORRECTO
// GET
// token_ws
// se puede commit

// CANCELADO A ÚLTIMO MOMENTO
// GET
// token_ws
// se puede commit

// CANCELADO POR TIEMPO
// GET
// TBK_ORDEN_COMPRA
// TBK_ID_SESION

// CANCELADO INMEDIATO
// POST
// TBK_TOKEN
// TBK_ORDEN_COMPRA
// TBK_ID_SESION
// NO SE PUEDE COMMIT




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






// TypeError: Cannot read properties of null (reading 'token')
//   33 | 
//   34 |             const findResult = await collection.findOne({ _id: new mongodb.ObjectId(buyOrder) });
// > 35 |             const token = findResult.token;
//      |                                     ^
//   36 |             const status = await transaction.commit(token);
//   37 |             await collection.updateOne({ _id: new mongodb.ObjectId(buyOrder) }, { $set: { status } });
//   38 | 