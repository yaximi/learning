
/**
 * https://blog.csdn.net/cc18868876837/article/details/81211729
 *
 * 1、js的世界里，一切皆对象，函数亦如是（js中函数也是一种对象）
 *
 * 2、__proto__和constructor属性是对象都有的，但prototype属性是函数独有的
 *  （1）、__proto__和constructor属性是对象都有的，js中函数也是一种对象，所以函数同样有这两个属性
 *  （2）、constructor属性是对象都有的（本身拥有或继承而来），这里的意思是每个对象都可以找到其对应的constructor，
 *      因为创建对象的前提是需要有constructor，而这个constructor可能是对象自己本身显式定义的或通过__proto__在原型链中继承来的，
 *      抛开从原型链中继承来的，而单从显式定义来讲，只有prototype对象有constructor属性
 *  （3）、prototype属性是函数独有的，除函数之外，其他对象没有该属性
 *
 * 3、__proto__   从一个对象指向一个对象（从实例对象指向其构造函数prototype属性指向的原型对象）
 *  构造函数通过new关键字创建的实例对象.__proto__ === 该构造函数.prototype
 *
 * 4、prototype   从一个函数指向一个对象（从函数指向该函数的原型对象）
 *
 * 5、constructor 从一个对象指向一个函数（从函数的原型对象指向该函数本身）
 *  函数.prototype.constructor === 该函数本身
 *
 * 6、所有对象（包括函数）的__proto__最终都指向Object.prototype，而Object.prototype.__proto__ === null
 *
 * 7、所有函数和对象最终都是有Function构造函数得来，所以constructor属性的终点是Function构造函数
 */

