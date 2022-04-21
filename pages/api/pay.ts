
// 4051 8842 3993 7763
const JSONProducts: any = require('/public/products.json');
const mongodb: any = require('mongodb');
const transbank: any = require('transbank-sdk');


export default async function Pay(request: any, response: any) {
    if (typeof request.body.cart !== 'object') {//termina la ejecución si el body no es un objeto
        response.json({status: 400});
        return;
    }

    const DBcart: any = {};
    let amount: number = 0;
    for (let key in request.body.cart) {
        const product: {name: string, price: number, src: string, description: string, included: string} = JSONProducts[key];
        if (product !== undefined) {//comprueba que la key sea válida
            if (typeof request.body.cart[key] === 'number') {//comprueba que la cantidad solcitiada de ese producto sea realmente un número
                let quantity = request.body.cart[key];
                if (quantity > 0 && Number.isInteger(quantity)) {
                    amount += quantity * product['price'];
                    DBcart[key] = quantity;
                }
            }
        }
    }


    if (amount === 0) {// termina la ejecución si el precio total es 0. Esto puede pasar si se altera el sessionStorage ingresando valores inválidos o si un bug hace que no se hayan guardado
        response.json({status: 400});
        return;
    }

    const client: any = new mongodb.MongoClient(process.env.mongodbURI);
    try {
        await client.connect();
        const db: any = client.db(process.env.mongodbDB);
        const collection: any = db.collection(process.env.mongodbCollection);

        
        const DBVaules: any = {
            token: '',
            status: {},
            delivered: false,
            rut: request.body.rut,
            name: request.body.name,
            e_mail: request.body.e_mail,
            products: DBcart,
            city: request.body.city,
            address: request.body.address,
            date: new Date()
        };

        const insertResult: {acknowledged: boolean, insertedId: any} = await collection.insertOne(DBVaules);
        const buyOrder: string = insertResult.insertedId.toHexString();


        const transaction = await new transbank.WebpayPlus.Transaction(new transbank.Options(process.env.commerceCode, process.env.apiKey, transbank.Environment.Integration));
        const creation = await transaction.create(
            buyOrder, //orden de compra
            buyOrder, //session id
            amount,
            request.headers.origin + '/api/endpayment'  //return URL    //GENERARÁ ERROR?
        );

        const status = await transaction.status(creation.token);
        await collection.updateOne({ _id: new mongodb.ObjectId(buyOrder) }, { $set: { status, token: creation.token } });

        


        response.json({
            status: 200,
            token: creation.token,
            url: creation.url
        });



    }
    catch (error) {
        console.log(error);
        response.json({status: 400});
    }
    finally {
        await client.close();
    }
};


