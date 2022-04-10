'use strict';

let obj = {
    '1': 2000,
    '2': 3000,
    '3': 10000
}


let x = Object.keys(obj).reduce((a, b, c, d) => {

    return a + obj[b]

}, 0);

console.log(x)



