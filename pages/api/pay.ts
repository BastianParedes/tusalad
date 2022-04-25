// 4051 8842 3993 7763
const JSONProducts: any = require('/public/products.json');
const mongodb: any = require('mongodb');
const transbank: any = require('transbank-sdk');


export default async function Pay(request: any, response: any) {
    if (typeof request.body.cart !== 'object') {//termina la ejecución si el body no es un objeto
        response.json({status: 400, message:'Algo salió mal. Por favor recargue la página y vuelva a intentarlo.'});
        return;
    }

    // calcula el monto total
    const DBcart: any = {};
    let amount: number = 0;
    for (let key in request.body.cart) {
        const product: {name: string, price: number, src: string, description: string, included: string, enabled: boolean} = JSONProducts[key];
        if (product !== undefined) {//comprueba que la key sea válida
            if (product.enabled) {//comprueba que el producto esté disponible
                if (typeof request.body.cart[key] === 'number') {//comprueba que la cantidad solcitada de ese producto sea realmente un número
                    let quantity = request.body.cart[key];
                    if (quantity > 0 && Number.isInteger(quantity)) {
                        amount += quantity * product['price'];
                        DBcart[key] = quantity;
                    }
                }
            }
        }
    }

    //detiene la ejecución si el usuario no envía artículos o si falta algún dato
    if (amount === 0) {
        response.json({status: 400, message:'No hay objetos en el carro de compra'});
        return;
    } else if (request.body.rut === '') {
        response.json({status: 400, message:'No has ingresado el rut'});
        return;
    } else if (request.body.name === '') {
        response.json({status: 400, message:'No has ingresado el nombre'});
        return;
    } else if (request.body.phone === '') {
        response.json({status: 400, message:'No has ingresado el número de teléfono'});
        return;
    } else if (request.body.e_mail === '') {
        response.json({status: 400, message:'No has ingresado el E-mail'});
        return;
    } else if (request.body.city === '') {
        response.json({status: 400, message:'No has ingresado la ciudad'});
        return;
    } else if (request.body.address === '') {
        response.json({status: 400, message:'No has ingresado la dirección'});
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
            phone: request.body.phone,
            e_mail: request.body.e_mail,
            products: DBcart,
            city: request.body.city,
            address: request.body.address,
        };

        const insertResult: {acknowledged: boolean, insertedId: any} = await collection.insertOne(DBVaules);
        const buyOrder: string = insertResult.insertedId.toHexString();


        const transaction = await new transbank.WebpayPlus.Transaction(new transbank.Options(process.env.commerceCode, process.env.apiKey, transbank.Environment.Integration));
        const creation = await transaction.create(
            buyOrder, //orden de compra
            buyOrder, //session id
            amount,
            request.headers.origin + '/api/endpayment'
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
        response.json({status: 400});
    }
    finally {
        await client.close();
    }
};


