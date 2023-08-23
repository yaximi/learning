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
 * 1、特殊
 *    1.1、undefined == null
 *    1.2、NaN != NaN
 * 2、类型相同：比较值
 * 3、类型不同
 *    3.1、均为原始值：转换为数字比较
 *    3.2、一端原始值，一端引用值（对象）：引用值（对象）转原始值后比较（先调用valueOf，若无法转换成原始值，再调用toString）
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
