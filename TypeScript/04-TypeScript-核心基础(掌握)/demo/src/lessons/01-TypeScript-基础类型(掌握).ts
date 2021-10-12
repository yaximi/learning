export {};

// TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型等，方便我们使用

// 布尔类型 boolean
let val1:boolean; // 定义了一个名称为val1的变量，这个变量中将来只能存储布尔类型的数据
val1 = true;
// val1 = 123; // 报错
// val1 = 'abc'; // 报错
console.log(val1);

// 数值类型 number
let val2:number; // 定义了一个名称为val2的变量，这个变量中将来只能存储数值类型的数据
val2 = 123;
// val2 = true; // 报错
// val2 = 'abc'; // 报错
// val2 = 0b11; // 支持二进制
// val2 = 0o11; // 支持八进制
// val2 = 0x11; // 支持十六进制
console.log(val2);

// 字符串类型 string
let val3:string; // 定义了一个名为val3的变量，这个变量中将来只能存储字符串类型的数据
val3 = 'abc';
// val3 = 123; // 报错
// val3 = true; // 报错
// val3 = `abc`; // 支持ES6的字符串模板语法
console.log(val3);
