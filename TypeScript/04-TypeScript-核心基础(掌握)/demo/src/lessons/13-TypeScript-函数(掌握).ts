export {};

// 方式一：
// 我们可以给每个参数添加类型之后再为函数本身添加返回值类型

// 命名函数（Named function）
// function add(x:number, y:number):number {
//     return x + y
// }

// 匿名函数（Anonymous function）
// let add = function (x:number, y:number):number {
//     return x + y
// };

// 箭头函数
// let add = (x:number, y:number):number => {
//     return x + y
// };

// 方式二：函数类型表达式
// 函数类型表达式包含两部分：参数类型和返回值类型，中间使用(=>)符号分隔
// let add:(x:number, y:number) => number;
// add = function (x, y) {
//     return x + y
// };

// let add:(x:number, y:number) => number =
//     function (x, y) {
//         return x + y;
//     };

// 注意点：方式一和方式二，都只在赋值语句的一边指定了类型而另一边没有类型，此时TypeScript编译器会自动识别出另一边的类型，这叫做“按上下文归类”，是类型推论的一种。

// 方式三：书写完整函数类型(非必要，使用方式二即可)
// let add:(x:number, y:number) => number =
//     function (x:number, y:number):number {
//         return x + y
//     };

// 方式四：使用接口定义函数类型（注意与方式二写法的区别）
// interface AddInterface {
//     (x:number, y:number): number;
// }
// let add:AddInterface = function (x, y) {
//     return x + y
// };

// 方式五：使用type定义类型别名
// type AddType = (x:number, y:number) => number;
// let add:AddType = function (x, y) {
//     return x + y
// };

// 方式六：函数重载
// JS本身是个动态语言，JS中函数根据传入不同的参数而返回不同类型的数据是很常见的
// 例如：getArr函数-传入数字val时返回0到val-1的数组，传入字符串val时，返回val单个字母分隔的数组

// function getArr (val) {
//     if (typeof val === 'number') {
//         let arr = [];
//         for (let i = 0; i < val; i++) {
//             arr.push(i)
//         }
//         return arr;
//     } else {
//         return val.split('');
//     }
// }

// 对于上面的例子，我们需要对getArr进行函数重载
// 方法是为同一个函数提供多个函数类型定义来进行函数重载

// function getArr(val:number):number[];
// function getArr(val:string):string[];
// function getArr(val:any):any[] {
//     if (typeof val === 'number') {
//         let arr = [];
//         for (let i = 0; i < val; i++) {
//             arr.push(i)
//         }
//         return arr;
//     } else {
//         return val.split('');
//     }
// }

// 7、在JS中，函数也是一个对象，除了可以调用外，还可以有属性
// 但是函数类型表达式不允许声明属性，那我们要如何做？
// 方式1：使用接口
// interface AddInterface {
//     description: string;
//     (x:number, y:number): number;
// }
//
// let add:AddInterface = (() => {
//     const fn = (x:number, y:number):number => {
//         return x + y
//     };
//     fn.description = '加';
//     return fn
// })();

// 方式2：使用type类型别名(相当于给接口起个别名)
type AddType = {
    description: string;
    (x:number, y:number): number;
}

let add:AddType = (() => {
    const fn = (x:number, y:number):number => {
        return x + y
    };
    fn.description = '加';
    return fn
})();

