
const mongodb: any = require('mongodb');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;


export default async function Db(request: any, response: any) {
    const buyOrder: string = request.body.buyOrder;
    let data = {}
    const client: any = new mongodb.MongoClient(process.env.mongodbURI);

    try {
        await client.connect();
        const db: any = client.db(process.env.mongodbDB);
        const collection: any = db.collection(process.env.mongodbCollection);
        data = await collection.findOne({ _id: new mongodb.ObjectId(buyOrder) });
        response.json(data);
    }
    catch (error) {
        response.json({});
    }
    finally {
        await client.close();
    }
    
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


