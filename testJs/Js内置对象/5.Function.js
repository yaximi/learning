/**
 * 1、Function构造函数（JS内置对象），不仅有对象都有的__proto__和constructor属性，还有函数仅有的prototype属性
 */
console.log(Function.prototype)     // [Function]
console.log(Function.__proto__)     // [Function]
console.log(Function.constructor)   // [Function: Function]

/**
 * 2、Function.constructor是通过__proto__原型链继承来的，因为constructor属性只有prototype对象是显式定义的，其他对象都是继承来的
 */
console.log(Function.__proto__ === Function.prototype)      // true
console.log(Function.prototype.constructor === Function)    // true 函数的原型对象的构造函数指向该函数本身
console.log(Function.constructor === Function)              // true Function.constructor是通过Function.__proto__继承了Function.prototype对象的constructor

/**
 * 3、Function.prototype对象与Object.prototype等其他函数的原型对象有所不同，Function.prototype是一个函数
 */
console.log(Object.prototype)           // {}
console.log(Function.prototype)         // [Function]
console.log(typeof Object.prototype)    // 'object'
console.log(typeof Function.prototype)  // 'function'

/**
 * 4、Function.prototype是一个函数，理论上它不仅有对象都有的__proto__和constructor属性，还有函数仅有的prototype属性，但其实是没有prototype属性了
 */
console.log(Function.prototype.prototype)                       // undefined
console.log(Function.prototype.__proto__ === Object.prototype)  // true
console.log(Function.prototype.constructor === Function)        // 函数的原型对象的构造函数指向该函数本身