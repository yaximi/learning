const Promise = require('./promise2.js');

// new Promise((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('ok');
//         })
//     }));
// })
//     .then((value) => {
//         console.log(value);
//     }, (reason) => {
//         console.log(reason);
//     });

const p = new Promise((resolve, reject) => {
    resolve()
})

const p2 = p.then(() => p2)
