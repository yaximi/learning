console.log('here we go')

/**
 * 方式1：使用reject()或者throw抛出错误，使用onRejected状态响应函数处理错误
 */
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(new Error('出错了'))
//     }, 1000)
// })
//     .then(null, (reason) => {
//         console.log(reason)
//     })

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         throw new Error('出错了')
//     }, 1000)
// })
//     .then(null, (reason) => {
//         console.log(reason)
//     })

/**
 * 方式2：使用reject()或者throw抛出错误，使用.catch()处理错误
 * 推荐使用这种方式，更加清晰好读，且能捕获前面.then()中的错误
 */
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(new Error('出错了'))
//     }, 1000)
// })
//     .catch(error => {
//         console.log(error)
//     })

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         throw new Error('出错了')
//     }, 1000)
// })
//     .catch(error => {
//         console.log(error)
//     })

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
