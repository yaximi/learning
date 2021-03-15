// function throttle (fn, timeout) {
//     let prev = Date.now()
//
//     return function () {
//         let now = Date.now()
//         if (now - prev >= timeout) {
//             fn.apply(this, arguments)
//             prev = Date.now()
//         }
//     }
// }

function throttle (fn, timeout) {
    let timer = null

    return function () {
        const args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                clearTimeout(timer)
                timer = null
            }, timeout)
        }
    }
}

function handler () {
    console.info('222')
}

window.addEventListener('scroll', throttle(handler, 1000))
