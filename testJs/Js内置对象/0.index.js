/**
 * 1.js的世界里，一切皆对象，函数亦如是
 * 2.任何对象都存在constructor和__proto__属性（规范中用[[proto]]表示），但只有函数对象存在prototype属性
 * 3.函数对象的原型对象（prototype）的构造函数（constructor）指向该函数本身
 * 4.除Object外，其他内置对象的原型对象（prototype）的__proto__属性均指向Object.prototype，Object.prototype.__proto__ === null
 */
console.log(Boolean.prototype.constructor === Boolean)
console.log(Boolean.prototype.__proto__ === Object.prototype)
console.log(typeof Boolean.prototype)   // object

console.log(Number.prototype.constructor === Number)
console.log(Number.prototype.__proto__ === Object.prototype)
console.log(typeof Number.prototype)    // object

console.log(String.prototype.constructor === String)
console.log(String.prototype.__proto__ === Object.prototype)
console.log(typeof String.prototype)    // object

console.log(Array.prototype.constructor === Array)
console.log(Array.prototype.__proto__ === Object.prototype)
console.log(typeof Array.prototype)     // object

console.log(Function.prototype.constructor === Function)
console.log(Function.prototype.__proto__ === Object.prototype)
console.log(typeof Function.prototype)  // function

console.log(Object.prototype.constructor === Object)
console.log(Object.prototype.__proto__ === null)
console.log(typeof Object.prototype)    // object