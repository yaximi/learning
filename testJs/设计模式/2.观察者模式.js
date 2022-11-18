// 观察者模式
// 当对象之间存在一对多的依赖关系时，当被观察的对象（被观察者、目标对象）状态发生改变时，所有观察它的对象（观察者）都会收到通知，这就是观察者模式。

// 基本思想
// 在观察者模式中，只有两种主体：目标对象（Subject）和观察者（Observer）。
// Subject对象拥有添加、删除和通知一系列Observer的方法等，Observer对象拥有更新方法等。
// 在Subject对象添加了一系列Observer对象之后，Subject对象则维护着这一系列Observer对象，当有关状态发生变更时Subject对象则会通知这一系列Observer对象进行更新。

// 优缺点
// 1、耦合度高，通常用来实现一些响应式的效果
// 2、角色很明确，没有事件调度中心作为中间者，目标对象Subject和观察者Observer都要实现约定的成员方法
// 3、双方联系紧密，目标对象的主动性很强，自己收集和维护观察者，并在状态变化时主动通知观察者更新

// 被观察者（目标对象）
class Subject {
    constructor () {
        this.observers = []
    }

    // 收集观察者
    add (observer) {
        this.observers.push(observer)
    }

    // 发布
    notify () {
        this.observers.forEach(observer => {
            if (observer && typeof observer.update === 'function') {
                observer.update()
            }
        })
    }

    // 删除观察者
    remove (observer) {
        const index = this.observers.findIndex(item => item === observer)
        if (index !== -1) {
            this.observers.splice(index, 1)
        }
    }
}

// 观察者
class Observer {
    constructor (name) {
        this.name = name
    }

    update () {
        console.log(`${this.name} updated`)
    }
}

const subject = new Subject()
const o1 = new Observer('小明')
const o2 = new Observer('小强')

subject.add(o1)
subject.add(o2)

console.log('第一次通知')
subject.notify()

subject.remove(o2)

console.log('第二次通知')
subject.notify()