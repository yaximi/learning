class Event {
    constructor () {
        this._handlers = {}
    }

    /**
     * on 添加事件监听
     * @param type 事件类型（如click）
     * @param handler 事件处理函数
     * @param once 只执行一次
     */
    on (type, handler, once = false) {
        if (!this._handlers[type]) {
            this._handlers[type] = []
        }
        if (!this._handlers[type].includes(handler)) {
            this._handlers[type].push(handler)
            if (once) {
                handler.once = true
            }
        }
    }

    /**
     * off 取消事件监听
     * @param type 事件类型（如click）
     * @param handler 事件处理函数
     */
    off (type, handler) {
        if (this._handlers[type]) {
            if (!handler) {
                this._handlers[type] = []
            } else {
                this._handlers[type] = this._handlers[type].filter(fn => fn !== handler)
            }
        }
    }

    /**
     * trigger 执行函数
     * @param type
     * @param data
     * @param cxt
     */
    trigger (type, data = {}, cxt = this) {
        this._handlers[type] && this._handlers[type].forEach(handler => {
            handler.call(cxt, data)
            if (handler.once) {
                this.off(type, handler)
            }
        })
    }

    /**
     * once 只执行一次
     * @param type
     * @param handler
     */
    once (type, handler) {
        this.on(type, handler, true)
    }
}