/**
 * 单例模式：一个类只能存在一个实例
 */

// // es5写法
// function User (name) {
//     this.name = name
//     this.instance = null
// }
// User.getInstance = function (name) {
//     if (!this.instance) {
//         this.instance = new User(name)
//     }
//     return this.instance
// }
// const user1 = User.getInstance('小明');
// const user2 = User.getInstance('小红');
// console.log(user1 === user2);


// // es6写法
// class User {
//     constructor() {}
//
//     /**
//      * static 静态属性
//      * 1、静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。
//      * 2、因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。（该写法仅为一种提案）
//      *
//      * # 私有属性/方法
//      * 1、只能在类的内部访问的方法，外部不能访问。
//      */
//     static #instance;
//
//     /**
//      * static 静态方法
//      * 1、该方法不会被实例继承，而是直接通过类来调用。
//      * 2、如果静态方法包含this关键字，这个this指的是类，而不是实例。
//      */
//     static createInstance() {
//         if (!this.#instance) {
//             this.#instance = new User();
//         }
//         return this.#instance;
//     }
// }
// const user1 = User.createInstance();
// const user2 = User.createInstance();
// console.log(user1 === user2);


/**
 * 判断value是否为原始值
 * @param value
 * @returns {boolean}
 */
function isPrimitive(value) {
    return (typeof value !== 'object' && typeof value !== 'function') || value === null;
}
/**
 * 判断 x 和 y 是否相等
 * @param x
 * @param y
 */
function equal(x, y) {
    if (isPrimitive(x) || isPrimitive(y)) {
        return Object.is(x, y);
    }
    const entitiesX = Object.entries(x);
    const entitiesY = Object.entries(y);
    if (entitiesX.length !== entitiesY.length) {
        return false;
    }
    for(const [key, value] of entitiesX) {
        if (!(key in y) || !equal(value, y[key])) {
            return false;
        }
    }
    return true;
}
/**
 * 单例模式
 * @param className
 * @returns {*}
 */
function singleton(className) {
    let _instance;
    let _parameter;
    return new Proxy(className, {
       construct(target, argArray, newTarget) {
           if (!_instance) {
               _instance = new target(...argArray);
               _parameter = argArray;
           }
           if (!equal(_parameter, argArray)) {
               throw new Error("单例模式，无法创建新实例");
           }
           return _instance;
       }
    });
}
class User {
    constructor(name) {
        this.name = name;
    }
}
const UserProxy = singleton(User);
const user1 = new UserProxy('小明');
const user2 = new UserProxy('小明');
console.log(user1 === user2);
