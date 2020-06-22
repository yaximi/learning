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
