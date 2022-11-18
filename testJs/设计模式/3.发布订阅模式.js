// 发布订阅模式
// 基于一个事件（主题）通道，希望接受通知的对象Subscriber通过自定义事件订阅主题，被激活事件的对象Publisher通过发布主题事件的方式通知各个订阅该主题的Subscriber，这就是发布订阅模式
// 发布订阅模式中有三个角色：发布者Publisher，事件调度中心Event Channel，订阅者Subscriber。

// 优缺点
// 发布订阅模式中，对于发布者Publisher和订阅者Subscriber没有特殊的约束，他们借助事件调度中心提供的接口发布和订阅事件，互不了解对方是谁
// 松散耦合，灵活度高，常用于事件总线
// 易理解，可类比于DOM事件中的addEventListener
// 当事件类型越来越多时，难以维护，需要考虑事件命名的规范，也要防范数据流混乱

class EventEmitter {
    constructor () {
        this.list = {}

        if (!EventEmitter.instance) {
            EventEmitter.instance = this
        }
        return EventEmitter.instance
    }

    on (name, fn) {
        if (!this.list[name]) {
            this.list[name] = []
        }
        this.list[name].push(fn)
    }

    emit (...rest) {
        const name = ([].shift.call(rest))
        const fns = this.list[name] || []
        fns.forEach(fn => {
            fn.apply(this, rest)
        })
    }

    off (name) {
        this.list[name] = []
    }

    clean () {
        this.list = {}
    }
}

const eventEmitter = new EventEmitter()

eventEmitter.on('click', () => console.log('我是订阅者A，订阅了click事件')) // 订阅者订阅事件
eventEmitter.on('click', () => console.log('我是订阅者B，订阅了click事件')) // 订阅者订阅事件
eventEmitter.emit('click') // 发布者发布事件


eventEmitter.on('go', name => console.log(`${name}走了`))
eventEmitter.emit('go', '小明')
eventEmitter.emit('go', '小强')


eventEmitter.on('come', name => console.log(`${name}来了`))
eventEmitter.emit('come', '小红')

/**
 * 观察者模式 VS 发布订阅模式
 * 1、概念与实现上
 *  （1）、从概念上理解，两者没什么不同，都在解决对象之间解耦，通过事件的方式在某个时间点进行触发，监听这个事件的订阅者可以进行相应的操作。
 *  （2）、在实现上有所不同，观察者模式对订阅事件的订阅者通过发布者自身来维护，后续的一系列操作都要通过发布者完成。发布订阅模式是订阅者和发布者中间会有一个事件总线，操作都要经过事件总线完成。
 * 2、耦合
 *  （1）、观察者模式是面向目标和观察者编程的，用于耦合目标和观察者。观察者和被观察者之间还存在耦合，被观察者还是知道观察者的。
 *  （2）、发布订阅模式是面向调度中心编程的，用于解耦发布者和订阅者。发布者和订阅者不需要知道对方的存在，通过消息代理进行通信，解耦更加彻底。
 * 3、关系
 *  （1）、观察者模式的观察者和被观察者就像 商家-顾客 的关系，当商品有更新等，商家会直接通知订阅的顾客。
 *  （2）、发布订阅模式的发布者和订阅者，就像 商家-APP-顾客 的关系，顾客（订阅者）在APP上订阅商品通知，待商品有更新时，商家（发布者）通过APP通知订阅的顾客（订阅者）。
 * 4、从使用层面上讲
 *  （1）、观察者模式，多用于单个应用内部。
 *  （2）、发布订阅模式，更多的是一种跨应用的模式(cross-application pattern)，比如消息中间件。
 */