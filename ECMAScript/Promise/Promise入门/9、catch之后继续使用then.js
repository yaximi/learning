// console.log('here we go')
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 1000)
// })
//     .then(() => {
//         throw new Error('出错了')
//     })
//     .catch(error => {
//         console.log(error)
//     })
//     .then(() => {
//         console.log('哈哈')
//     })
//     .catch(() => {
//         console.log('呜呜')
//     })

console.log('here we go')
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
})
    .then(() => {
        throw new Error('出错了')
    })
    .catch(error => {
        console.log(error)
        throw new Error('又错了')
    })
    .then(() => {
        console.log('哈哈')
    })
    .catch(() => {
        console.log('呜呜')
    })