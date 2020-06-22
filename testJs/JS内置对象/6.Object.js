/**
 * 1、Object构造函数（JS内置对象），不仅有对象都有的__proto__和constructor属性，还有函数独有的prototype属性
 */
console.log(Object.prototype)   // {}
console.log(Object.__proto__)   // [Function]
console.log(Object.constructor) // [Function: Function]

/**
 * 2、Object.constructor属性是通过__proto__原型链继承来的，因为constructor属性只有prototype对象是显式定义的，其他对象都是继承来的
 */
console.log(Object.__proto__ === Function.prototype)        // true
console.log(Function.prototype.constructor === Function)    // true 函数的原型对象的构造函数指向该函数本身
console.log(Object.constructor === Function)                // true Object.constructor是通过Object.__proto__继承了Function.prototype对象的constructor

/**
 * 3、Object.prototype对象，只有有对象都有的__proto__和constructor属性，没有函数独有的prototype属性
 */
console.log(Object.prototype.__proto__ === null)        // true
console.log(Object.prototype.constructor === Object)    // true 函数的原型对象的构造函数指向该函数本身