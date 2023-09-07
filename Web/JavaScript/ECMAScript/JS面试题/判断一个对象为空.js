/**
 * Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中
 * 也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 方法返回
 * 但是，它不是私有属性，有一个 Object.getOwnPropertySymbols() 方法，可以获取指定对象的所有 Symbol 属性名。
 */

/**
 * JSON.stringify()
 * 1、属性值为 undefined、function、Symbol 值时，存在问题
 * 2、属性名为 Symbol 值时，也存在问题
 */
function isEmpty1(obj) {
    return JSON.stringify(obj) === '{}';
}

// // 测试：普通情况
// const obj1 = {};
// console.log(isEmpty1(obj1)); // true
//
// const obj2 = { n: 1 };
// console.log(isEmpty1(obj2)); // false
//
// // 测试：特殊情况
// const obj3 = { n: undefined };
// console.log(isEmpty1(obj3)); // true
//
// const obj4 = { n: function () {} };
// console.log(isEmpty1(obj4)); // true
//
// const obj5 = { n: Symbol('n') };
// console.log(isEmpty1(obj5)); // true
//
// const obj6 = { [Symbol('n')]: 1 };
// console.log(isEmpty1(obj6)); // true

/**
 * Object.keys()
 * 1、自身的（不含继承）
 * 2、可枚举的（enumerable）
 * 3、不包含symbol
 */
function isEmpty2(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Object.getOwnPropertyNames()
 * 1、自身的（不含继承）
 * 2、可枚举的（enumerable）
 * 3、不包含symbol
 *
 * Object.getOwnPropertySymbols()
 * 1、自身的（不含继承）
 * 2、可枚举的（enumerable）
 * 3、symbol
 *
 * @param obj
 * @returns {boolean|boolean}
 */
function isEmpty3(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
}

/**
 * for in
 * 1、包含继承
 * 2、可枚举的（enumerable）
 * 3、不包含symbol
 *
 * @param obj
 * @returns {boolean}
 */
function isEmpty4(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }
    return true;
}

/**
 * Reflect.ownKeys()
 * 相当于Object.getOwnPropertyNames()与Object.getOwnPropertySymbols()之和
 *
 * @param obj
 * @returns {boolean}
 */
function isEmpty5(obj) {
    return Reflect.ownKeys(obj).length === 0;
}

const obj = {
    [Symbol('e')]: 'e'
};
console.log('[1], obj is empty: ', isEmpty1(obj));
console.log('[2], obj is empty: ', isEmpty2(obj));
console.log('[3], obj is empty: ', isEmpty3(obj));
console.log('[4], obj is empty: ', isEmpty4(obj));
console.log('[5], obj is empty: ', isEmpty5(obj));
