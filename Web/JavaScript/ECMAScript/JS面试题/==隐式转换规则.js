/**
 * ? 位置应该怎么写才能输出true
 * var a = ?
 * console.log(
 *  a == 1 &&
 *  a == 2 &&
 *  a == 3
 * )
 */

/**
 * == 隐式转换规则：
 * 1、两端类型相同，比较值
 * 2、两端存在 NaN，返回 false
 * 3、undefined 和 null 只有与自身比较，或者互相比较时，才会返回 true
 * 4、两端都是原始类型（类型不同），转换成数字比较
 * 5、一端是原始类型，一端是对象类型，把对象转换成原始类型后，再套用以上规则
 */

/**
 * 对象如何转原始类型？
 * 1、如果对象拥有 [Symbol.toPrimitive] 方法，调用该方法
 *    若该方法能得到原始值，使用该原始值
 *    若该方法得不到原始值，抛出异常
 * 2、调用对象的 valueOf 方法
 *    若该方法能得到原始值，使用该原始值
 *    若该方法得不到原始值，进入下一步
 * 3、调用对象的 toString 方法
 *    若该方法能得到原始值，使用该原始值
 *    若该方法得不到原始值，抛出异常
 */

// 方式一
// var a = {
//     n: 1,
//     valueOf: function () {
//         return this.n++
//     }
// }

// 方式二
// var a = {
//     n: 1,
//     toString: function () {
//         return this.n++
//     }
// }

// 方式三
var a = {
    n: 1,
    [Symbol.toPrimitive]: function () {
        return this.n++
    }
}

console.log(
    a == 1 &&
    a == 2 &&
    a == 3
)

/**
 * 衍生问题
 * 如何实现：
 * console.log(
 *  x === 1 &&
 *  x === 2 &&
 *  x === 3
 * )
 */

// 方式一（严格模式下报错）
// var o = {
//     _x: 1,
//     get x() {
//         return this._x++
//     }
// }
// with (o) {
//     console.log(
//         x === 1 &&
//         x === 2 &&
//         x === 3
//     )
// }

// 方式二
var _x = 1
Reflect.defineProperty(globalThis, 'x', {
    get() {
        return _x++
    }
})
console.log(
    x === 1 &&
    x === 2 &&
    x === 3
)
