console.log('here we go')
new Promise(resolve => {
    setTimeout(() => {
        resolve('hello')
    }, 1000)
})
    .then(value => {
        console.log(value)

        return new Promise(resolve => {
            setTimeout(() => {
                resolve('world')
            }, 1000)
        })
    })
    .then(value => {
        console.log(value)
    })