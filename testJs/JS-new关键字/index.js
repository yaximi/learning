/**
 * 1、new的作用
 *  创建实例对象
 *
 * 2、new创建实例对象的过程
 *  （1）、创建一个新的空对象{}
 *  （2）、将空对象的__proto__属性指向构造函数的prototype属性
 *  （3）、将空对象作为构造函数的this的上下文，执行构造函数
 *  （4）、返回新对象
 */

// 举个例子
function Fn(name) {
    this.name = name;
}

var f1 = new Fn('小明');
var f2 = (function (name) {
            var obj = {};
            obj.__proto__ = Fn.prototype;
            Fn.call(obj, name);
            return obj;
         })('小明');

console.log(f1);
console.log(f2);

/**
 * new创建实例对象的过程
 * (1)、创建一个新对象：
 *   var obj = {}
 *
 * (2)、obj的__proto__属性指向Fn的prototype属性：
 *   obj.__proto__ = Fn.prototype
 *   形成原型链：obj ->(__proto__)-> Fn.prototype ->(__proto__)-> Object.prototype ->(__proto__)-> null
 *
 * (3)、obj作为Fn的this的上下文，执行Fn：
 *   Fn.call(obj, name)
 *
 * (4)、返回obj：
 *   return obj
 */
