
const mysql = require('mysql');

export default async function Db(request, respond) {
    respond.json({
        sessionId: 34,
        amount: 15000
    });
}



// CREATE TABLE `tu-salad`.`receipts` (
//         `id` INT NOT NULL,
//         `token_ws` VARCHAR(128) NOT NULL,
//         `status` VARCHAR(20) NOT NULL DEFAULT 'Iniciado',
//         `amount` INT NOT NULL,
//         `rut` VARCHAR(45) NOT NULL,
//         `name` VARCHAR(50) NOT NULL,
//         `e-mail` VARCHAR(45) NOT NULL DEFAULT '@',
//         `products` VARCHAR(255) NOT NULL DEFAULT '{}',
//         `payment method` VARCHAR(45) NULL,
//         `city` VARCHAR(45) NOT NULL,
//         `address` VARCHAR(45) NOT NULL,
//         `date` VARCHAR(45) NOT NULL,
//         `hour` INT NOT NULL,
//         `minute` INT NOT NULL,
//         PRIMARY KEY (`id`),
//         UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
//       ENGINE = InnoDB
//       DEFAULT CHARACTER SET = utf8;