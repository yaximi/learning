// 函数防抖：当持续触发事件时，一定时间段内没有再次触发事件，事件处理函数才会执行一次，如果在设定的时间到来之前，再次触发了事件，就从新开始计时

const debounce = (fn, timeout) => {
    let timer = null
    return () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, timeout)
    }
}

const handler = () => {
    console.info('111')
}

window.addEventListener('scroll', debounce(handler, 1000))
