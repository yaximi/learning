/**
 * let promise = doSomething()
 * promise = promise.then(doSomethingElse)
 * promise = promise.then(doSomethingElse2)
 * promise = promise.then(doSomethingElse3)
 * ...
 */
// 方式1
// function queue(things) {
//     let promise = Promise.resolve()
//     things.forEach(thing => {
//         promise = promise.then(() => new Promise(resolve => {
//             doThing(thing, () => {
//                 resolve()
//             })
//         }))
//     })
//     return promise
// }

// 方式1常见错误
// function queue(things) {
//     let promise = Promise.resolve()
//     things.forEach(thing => {
//         // 这里漏掉了promise赋值
//         promise.then(() => new Promise(resolve => {
//             doThing(thing, () => {
//                 resolve()
//             })
//         }))
//     })
//     return promise
// }

// 方式2
// function queue(things) {
//     return things.reduce((promise, thing) => {
//         return promise.then(() => new Promise(resolve => {
//             doThing(thing, () => {
//                 resolve()
//             })
//         }))
//     }, promise.resolve())
// }

// 方式2常见错误
// function queue(things) {
//     return things.reduce((promise, thing) => {
//         const step = new Promise(resolve => {
//             doThing(thing, () => {
//                 resolve()
//             })
//         })
//         // 这里.then()的状态响应函数传成了Promise实例对象
//         return promise.then(step)
//     }, Promise.resolve())
// }