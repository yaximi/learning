/**
 * 1、全局安装typeScript:
 * npm install typescript -g
 *
 * 2、通过tsc命令可以将ts文件编译成js文件
 * 例如执行：tsc 02-index.ts
 * 会编译生成：02-index.js文件
 */

/**
 * 注意点:
 * 由于TS并不是一门新的语言，而是对JS的扩展，所以我们可以在TS文件中直接编写JS代码
 * TS支持类型注解，我们可以通过类型注解来告诉系统，变量中将来只能存储什么类型的数据
 */

// let val:number;
// val = 123;
// val = '123'; // 此时会报错
// val = true; // 此时会报错
// val = [1, 2, 3]; // 此时会报错

function test(a:any[], b:number) { // 期望a是一个数组，b是一个数值
    return a.length + b
}

let res = test([1, 2, 3], 10) // 入参类型与期望一致
console.log(res) // 13

// res = test(1, 10) // 入参类型与期望不一致 直接报错
// console.log(res)
