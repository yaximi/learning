export {};

/**
 * never类型
 * 表示的是那些永不存在的值的类型
 * 一般用于抛出异常或根本不可能有返回值的函数
 */

// function demo1():never {
//     throw new Error('报错了');
// }
// demo1()

// function demo2():never {
//     while (true) {}
// }
// demo2()

/**
 * object类型
 * 表示一个对象
 */
let obj:object;
// obj = 1; // 报错
// obj = 'a'; // 报错
// obj = true; // 报错
obj = {
    name: '小明',
    age: 18
};
console.log(obj);
