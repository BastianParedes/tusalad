
const mysql = require('mysql2/promise');
const transbank = require('transbank-sdk');

const WebpayPlus = transbank.WebpayPlus;
const Environment = transbank.Environment;
const Options = transbank.Options;


export default async function Db(request, response) {
    const token_ws: string = request.body.token_ws;

    const promiseConnection = await mysql.createConnection({
        host: process.env.sqlHost,
        user: process.env.sqlUser,
        password: process.env.sqlPassword,
        database: process.env.sqlDB,
    });

    const queryResponse = await promiseConnection.query(`SELECT * FROM \`${process.env.sqlDB}\`.\`${process.env.sqlTable}\` WHERE (\`token_ws\` = '${token_ws}');`);
    const DBData = queryResponse[0][0];

    const transaction = new WebpayPlus.Transaction(new Options(process.env.commerceCode, process.env.apiKey, Environment.Integration));
    const webpayPlusStatus = await transaction.status(token_ws);


    promiseConnection.end();
    response.json({...DBData, ...webpayPlusStatus});
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



// CREATE TABLE `b8dwf2kovvcuvrsmnudk`.`receipts` (
//     `buyOrder` INT NOT NULL,
//     `token_ws` VARCHAR(128) NOT NULL,
//     `status` VARCHAR(45) NOT NULL,
//     `amount` INT NOT NULL,
//     `rut` VARCHAR(45) NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `e_mail` VARCHAR(45) NOT NULL,
//     `products` VARCHAR(255) NOT NULL,
//     `city` VARCHAR(45) NOT NULL,
//     `address` VARCHAR(50) NOT NULL,
//     `date` VARCHAR(45) NOT NULL,
//     PRIMARY KEY (`buyOrder`, `token_ws`),
//     UNIQUE INDEX `buyOrder_UNIQUE` (`buyOrder` ASC) VISIBLE,
//     UNIQUE INDEX `token_ws_UNIQUE` (`token_ws` ASC) VISIBLE);