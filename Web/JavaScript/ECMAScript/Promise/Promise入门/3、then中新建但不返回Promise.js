console.log('here we go')
new Promise(resolve => {
    setTimeout(() => {
        resolve('hello')
    }, 1000)
})
    .then(value => {
        console.log(value);

        (function () {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('world')
                    resolve('world')
                }, 1000)
            })
        })()

        return false
    })
    .then(value => {
        console.log(value)
    })