/**
 * ['1', '2', '3'].map(parseInt)
 * 问：表达式的结果是什么?
 */

const arr = ['1', '2', '3'].map(parseInt);
console.log(arr); // [parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)] => [1, NaN, NaN]

/**
 * 主要考察parseInt的转换规则
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 */

const arr2 = ['0b11', '0x12', '013'].map(parseInt);
console.log(arr2); // [parseInt('0b11', 0), parseInt('0x12', 1), parseInt('013', 2)] => [0, NaN, 1]
