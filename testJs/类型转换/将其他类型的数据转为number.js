/**
 * 转换方式一：使用Number()函数
 *
 *  - 字符串 --> 数字
 *      1、如果是纯数字的字符串，则直接将其转换为数字
 *      2、如果字符串中有非数字的内容，则转换为NaN
 *      3、如果字符串是一个空串或者是一个全是空格的字符串，则转换为0
 *
 *  - 布尔 --> 数字
 *      1、true  转成 1
 *      2、false 转成 0
 *
 *  - null --> 数字
 *      1、null 转成 0
 *
 *  - undefined --> 数字
 *      1、undefined 转成 NaN
 */

let a1 = '123';
a1 = Number(a1);
console.log(a1);    // 123
console.log(typeof a1); // number

let a2 = '12a';
a2 = Number(a2);
console.log(a2);    // NaN
console.log(typeof a2); // number

let a3 = '';
a3 = Number(a3);
console.log(a3);    // 0
console.log(typeof a3); // number

let a4 = false;
a4 = Number(a4);
console.log(a4);    // 0
console.log(typeof a4); // number

let a5 = null;
a5 = Number(a5);
console.log(a5);    // 0
console.log(typeof a5); // number

let a6 = undefined;
a6 = Number(a6);
console.log(a6);    // NaN
console.log(typeof a6); // number

/**********************************************************************************************************************/

/**
 * 转换方式二：使用parseInt()、parseFloat()函数
 *
 *      1、parseInt()可以将一个字符串中的有效的整数内容取出来，然后转换为Number
 *
 *      2、parseFloat()作用和parseInt()类似，不同的是它可以获得有效的小数
 *
 *      3、如果对非string类型的数据使用parseInt()或parseFloat()，它会先将其转换为string然后再操作
 */

let a7 = '1234a567px';
a7 = parseInt(a7);
console.log(a7);    // 1234
console.log(typeof a7); // number

let a8 = '123.456.789px';
a8 = parseFloat(a8);
console.log(a8);    // 123.456
console.log(typeof a8); // number

let a9 = true;
a9 = parseFloat(a9);
console.log(a9);    // NaN
console.log(typeof a9); // number

let a10 = null;
a10 = parseFloat(a10);
console.log(a10);   // NaN
console.log(typeof a10);// number

let a11 = undefined;
a11 = parseFloat(a11);
console.log(a11);   // NaN
console.log(typeof a11);// number

/**********************************************************************************************************************/

/**
 * 转换方式三：隐式类型转化
 *      1、减（-）
 *      2、乘（*）
 *      3、除（/）
 * 可以通过一个值-0 *1 /1将其转换为number，原理和Number()函数一样
 */

let a12 = '123';
a12 = a12 - 0;
console.log(a12);   // 123
console.log(typeof a12);// number

let a13 = '123a';
a13 = a13 - 0;
console.log(a13);   // NaN
console.log(typeof a13);// number

let a14 = '';
a14 = a14 - 0;
console.log(a14);   // 0
console.log(typeof a14);// number

let a15 = true;
a15 = a15 - 0;
console.log(a15);   // 1
console.log(typeof a15);// number

let a16 = false;
a16 = a16 - 0;
console.log(a16);   // 0
console.log(typeof a16);// number

let a17 = null;
a17 = a17 - 0;
console.log(a17);   // 0
console.log(typeof a17);// number

let a18 = undefined;
a18 = a18 - 0;
console.log(a18);   // NaN
console.log(typeof a18);// number