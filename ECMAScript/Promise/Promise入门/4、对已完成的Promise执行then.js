console.log('here we go')

const promise = new Promise(resolve => {
    setTimeout(() => {
        console.log('the promise fulfilled')
        resolve('hello world')
    }, 1000)
})

setTimeout(() => {
    promise.then(value => {
        console.log(value)
    })
}, 2000)