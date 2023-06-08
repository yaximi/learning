export {};

/**
 * 对于函数类型表达式，我们可以使用type定义类型别名，好处是：
 * 1、方便重复使用
 * 2、JS中，函数也是对象，除了可以调用外，还可以定义属性，而函数类型表达式只能定义函数类型，不能定义函数属性类型，解决方法如下：
 *  (1)使用interface定义混合接口
 *  (2)使用type定义混合类型别名
 */

// 1、使用type给函数类型表达式定义别名，方便重复使用
// type MyType = (x:number, y:number) => number;
//
// let add:MyType = function (x, y) {
//     return x + y
// };
//
// let sub:MyType = function (x, y) {
//     return x - y
// };

// 2、使用混合接口，描述函数及其属性
// interface AddInterface {
//     (x:number, y:number): number; // 注意点：此时参数类型与返回值类型之间使用的是 : 而非 =>，注意与函数类型表达式语法的区别
//     description: string;
// }
// let add:AddInterface = (():AddInterface => {
//     const fn = <AddInterface>((x, y) => {
//         return x + y
//     });
//     fn.description = '加';
//     return fn
// })();

// 3、使用type给混合接口定义别名
// type AddType = AddInterface
type AddType = {
    (x:number, y:number): number; // 注意点：此时参数类型与返回值类型之间使用的是 : 而非 =>，注意与函数类型表达式语法的区别
    description: string;
}
let add:AddType = (():AddType => {
    const fn = <AddType>((x, y) => {
        return x + y
    });
    fn.description = '加';
    return fn
})();
