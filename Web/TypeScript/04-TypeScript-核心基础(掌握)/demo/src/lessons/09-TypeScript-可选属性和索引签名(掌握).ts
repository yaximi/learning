export {};

/**
 * interface
 */
// interface Person {
//     name: string;
//     age: number;
// }
//
// const p1: Person = {
//     name: '小明',
//     age: 18
// }
//
// // 少一个或多个属性，报错
// const p2: Person = {
//     name: '小明'
// }
//
// // 多一个或多个属性，报错
// const p3: Person = {
//     name: '小明',
//     age: 18,
//     gender: '男'
// }
//
// function say({name, age}: Person): void {
//     console.log(`我是${name}，今年${age}岁`)
// }
//
// say({name: '小明', age: 18});
//
// // 少一个或多个属性，报错
// say({name: '小明'});
//
// // 多一个或多个属性，报错
// say({name: '小明', age: 18, gender: '男'})

/**
 * 怎么做到少一个或多个属性？
 * 1、可选属性
 */

// interface Person {
//     name: string;
//     age?: number;
// }
//
// const p1: Person = {
//     name: '小明',
//     age: 18
// }
//
// const p2: Person = {
//     name: '小明'
// }
//
// function say({name, age}: Person): void {
//     console.log(`我是${name}，今年${age || 18}岁`)
// }
//
// say({name: '小明', age: 16});
//
// say({name: '小明'});

/**
 * 怎么做到多一个或多个属性？
 * 1、类型断言
 * 2、变量赋值
 * 3、索引签名
 */

// interface Person {
//     name: string;
//     age: number;
// }
//
// function say({name, age}: Person): void {
//     console.log(`我是${name}，今年${age}岁`)
// }
//
// // 方式一：类型断言
// say({name: '小明', age: 18, gender: '男'} as Person);
//
// // 方式二：变量赋值
// const p = {name: '小明', age: 18, gender: '男'};
// say(p);

// 方式三：索引签名
interface Person {
    name: string;
    age: number;
    [key: string]: any;
}

function say({name, age}: Person): void {
    console.log(`我是${name}，今年${age}岁`)
}

say({name: '小明', age: 18, gender: '男'});
