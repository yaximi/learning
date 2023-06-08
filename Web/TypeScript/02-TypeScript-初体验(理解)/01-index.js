let val;
val = 123;
val = '123';
val = true;
val = [1, 2, 3];

/**
 * 注意点：
 * 由于JS是弱类型的，所以只要定义了一个变量，就可以往这个变量中存储任意类型的数据
 * 也正是因为如此，所以会给我们带来一些问题
 */

function test(a, b) { // 期望a是一个数组，b是一个数值
    return a.length + b
}

let res = test([1, 2, 3], 10) // 入参类型与期望一致
console.log(res) // 13

res = test(1, 10) // 入参类型与期望不一致
console.log(res) // NaN 这种情况不会报错，程序能给正常运行，但结果往往不是我们想要的，在代码量很多的时候不易定位问题所在的位置
