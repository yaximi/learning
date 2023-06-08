export {};

/**
 * 描述函数最简单的方式是使用函数类型表达式，那什么是函数类型表达式？
 * 函数类型表达式包含两个部分：参数类型和返回值类型，以（=>）符号分隔，语法上类似于箭头函数
 * 例如：(x:number, y:number) => number;
 */

// let add:(x:number, y:number) => number;
// add = function (x:number, y:number):number {
//     return x + y
// };

// 上面的写法是先声明再赋值，也可以在定义时直接初始化
// let add:(x:number, y:number) => number =
//     function (x:number, y:number):number {
//         return x + y
//     };

// TS内部存在类型推论，上面的写法可以进一步的简化
// let add:(x:number, y:number) => number =
//     function (x, y) {
//         return x + y
//     };

// 注意点：如未指定参数类型，则它是隐式的any
// 如果在tsconfig.json中打开了严格模式（"strict": true）或配置了不允许隐式any转换（"noImplicitAny": true）时会报错
// type AddType = (x:number, y) => number; // 此时y是隐式any类型
// let add:AddType = function (x, y) {
//     if (typeof y === 'number') {
//         return x + y
//     }
//     return x
// };

// 注意点：函数类型表达式中参数名是必需的
// type LogType = (s: string) => void;
// let log:LogType = function (s) {
//     console.log(s)
// };
// 如果参数名未指定，如下
// type LogType = (string) => void; // 此时表示一个接收名为string，类型为隐式any的参数的函数，严格模式下或不允许隐式any转换时会报错

/**
 * 引申：在JS中，函数也是对象，除了可以调用外，还可以有属性，而函数类型表达式只能定义函数类型，不能定义函数属性类型，那么我们该如何做？
 * 1、使用interface定义混合接口
 * 2、使用type定义混合类型别名
 * 在之后的章节中做详细介绍
 */
