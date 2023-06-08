/**
 * 基本数据类型：boolean number string undefined null symbol(ES6) bigint(ES10)
 * 引用数据类型：object
 */

/**********************************************************************************************************************/

/**
 * 方法一：typeof
 *
 * 1、返回一个表示数据类型的字符串，返回结果包括以下7种数据类型：
 *  'boolean'
 *  'number'
 *  'string'
 *  'undefined'
 *  'object'
 *  'function'
 *  'symbol'
 *
 * 2、不能判断null、array等
 *
 * 3、typeof null === 'object'的原因？
 *  这是一个历史遗留问题（bug）
 *  1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑null，只把它当作object的一种特殊值。
 *  JavaScript 中会把二进制前三位都为0的数值判断为object类型，而作为object特殊值的null，二进制表示全都是0，自然前三位也是0，所以执行typeof时会返回'object'
 *  后来null独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null返回'object'就没法改变了。
 */

console.log(typeof true);       // 'boolean'
console.log(typeof 0);          // 'number'
console.log(typeof '');         // 'string'
console.log(typeof undefined);  // 'undefined'
console.log(typeof null);       // 'object'
console.log(typeof []);         // 'object'
console.log(typeof {});         // 'object'
console.log(typeof (() => {})); // 'function'
console.log(typeof Symbol());   // 'symbol'

console.log(typeof NaN);            // 'number'

console.log(typeof new Date());     // 'object'
console.log(typeof new RegExp());   // 'object'

/**********************************************************************************************************************/

/**
 * 方法二：Array.isArray()
 */

console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

/**********************************************************************************************************************/

/**
 * 方法三：instanceof
 *
 * 1、A instanceof B，用来判断A是否为B的实例，返回 boolean 值
 *
 * 2、instanceof 用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
 *
 * 3、不能检测 undefined 和 null
 */


console.log([] instanceof Array);               // true
console.log({} instanceof Object);              // true
console.log((() => {}) instanceof Function);    // true
console.log(new Date() instanceof Date);        // true
console.log(new RegExp() instanceof RegExp);    // true

console.log(true instanceof Boolean);   // false
console.log(0 instanceof Number);       // false
console.log('' instanceof String);      // false

// console.log(undefined instanceof undefined); // error
// console.log(null instanceof null);           // error

/**********************************************************************************************************************/

/**
 * 方法四：Object.prototype.toString.call()
 */

console.log(Object.prototype.toString.call(true));      // [object Boolean]
console.log(Object.prototype.toString.call(0));         // [object Number]
console.log(Object.prototype.toString.call(''));        // [object String]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null));      // [object Null]
console.log(Object.prototype.toString.call([]));        // [object Array]
console.log(Object.prototype.toString.call({}));        // [object Object]
console.log(Object.prototype.toString.call(() => {}));  // [object Function]
console.log(Object.prototype.toString.call(new Date()));       // [object Date]
console.log(Object.prototype.toString.call(new RegExp()));     // [object RegExp]
console.log(Object.prototype.toString.call(new Error()));      // [object Error]
console.log(Object.prototype.toString.call(Symbol()));         // [object Symbol]

/**********************************************************************************************************************/

function dataType (data) {
    return Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

console.log(dataType(true));    // 'boolean'
console.log(dataType(0));       // 'number'
console.log(dataType(''));      // 'string'
