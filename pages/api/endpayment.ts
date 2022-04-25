
const mongodb: any = require('mongodb');
const transbank: any = require('transbank-sdk');
const nodemailer = require('nodemailer');


async function sendMail(subject: string, text: string) {
    let transporter = await nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.mail,
            pass: process.env.password,
        },
    });

    await transporter.sendMail({
        from: process.env.mail,
        to: process.env.mail,
        subject,
        text
    });
}










export default async function Db(request: any, response: any) {
    if (request.method !== 'GET' && request.method !== 'POST') {return};


    

    const transaction = new transbank.WebpayPlus.Transaction(new transbank.Options(process.env.commerceCode, process.env.apiKey, transbank.Environment.Integration));
    let buyOrder: string|undefined;

    if (request.method === 'GET') {//Transacción completa o cancelada al final o pasaron 10 minutos sin pagar

        buyOrder = request.query.TBK_ORDEN_COMPRA; // pasan 10 minutos sin pagar

        if (request.query.token_ws !== undefined) { //pago completo o interrumpido al final
            const client: any = new mongodb.MongoClient(process.env.mongodbURI);

            await new Promise((resolve, reject)=>resolve(null))
            .then(async () => await client.connect())
            .then(() => {
                const db: any = client.db(process.env.mongodbDB);
                return db.collection(process.env.mongodbCollection);
            })
            .then(async (collection) => {
                const status = await transaction.commit(request.query.token_ws);
                return {collection, status};
            })
            .then( async ({collection, status}) => {
                buyOrder = status.buy_order;
                await collection.updateOne({ _id: new mongodb.ObjectId(buyOrder) }, { $set: { status } });
                return status;
            }).then(async (status) => {
                if (status.status === 'AUTHORIZED') {
                    await sendMail('Compra en Tu Salad ' + status.buy_order, `Alguien realizó una compra. Para ver los detalles entra a \n\nwww.${request.rawHeaders[1]}/receipt/?buyOrder=${status.buy_order}`);
                }
            })
            .catch(async (error) => {
                await sendMail('Error en el registro de compra', `Hubo un error al momento de registrar la compra de código ${buyOrder}\nEl error es\n\n${error}`)
            })
            .finally(async () => {
                await client.close();
                response.redirect(307, `/receipt?buyOrder=${buyOrder}`);
            });
        }


    } else if (request.method === 'POST') {//Se devuelve a la página con el botón al inicio del pago.
        buyOrder = request.body.TBK_ORDEN_COMPRA;
        response.redirect(307, `/receipt/?buyOrder=${buyOrder}`);
    }

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
// NO SE PUEDE COMMIT

// CANCELADO INMEDIATO
// POST
// TBK_TOKEN
// TBK_ORDEN_COMPRA
// TBK_ID_SESION
// NO SE PUEDE COMMIT




// Para verificar si una transacción fue aprobada, debes confirmar el que código de respuesta response_code sea exactamente 0 y que el estado status sea exactamente AUTHORIZED.


// AL INICIAR
// {
//     amount: 2000,
//     status: 'INITIALIZED',
//     buy_order: '62671e600684d8873b019ded',
//     session_id: '62671e600684d8873b019ded',
//     accounting_date: '0425',
//     transaction_date: '2022-04-25T22:19:12.244Z',
//     installments_number: 0
// }



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



// EL USUARIO CANCELA AL FINAL
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



// SE INICIÓ EL PROCESO, PERO AUN NO TERMINA O SE SALE AL PRINCIPIO
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



