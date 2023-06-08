define(['constant'], function (constant) {
    function log () {
        console.log(`My name is ${constant.name}, i am ${constant.age} years old.`)
    }
    return {
        log: log
    }
})
