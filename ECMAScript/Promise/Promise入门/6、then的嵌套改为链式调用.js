// then嵌套
// console.log('here we go')
// new Promise(resolve => {
//     setTimeout(() => {
//         console.log('step1')
//         resolve()
//     }, 1000)
// })
//     .then(() => {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 console.log('step2')
//                 resolve('hello world')
//             }, 1000)
//         })
//             .then(value => {
//                 console.log('step3')
//                 return value
//             })
//     })
//     .then(value => {
//         console.log('step4')
//         console.log(value)
//     })

// then链式调用
console.log('here we go')
new Promise(resolve => {
    setTimeout(() => {
        console.log('step1')
        resolve()
    }, 1000)
})
    .then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('step2')
                resolve('hello world')
            }, 1000)
        })
    })
    .then(value => {
        console.log('step3')
        return value
    })
    .then(value => {
        console.log('step4')
        console.log(value)
    })
