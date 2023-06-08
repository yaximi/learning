/**
 * 1、斐波那契数，指的是这样一个数列：0、1、1、2、3、5、8、13、21、...
 * 2、在数学上，斐波那契数列以如下被以递归的方法定义：F0=0，F1=1，Fn=Fn-1+Fn-2（n>=2，n∈N*）
 * 3、用文字来说，就是斐波那契数列由 0 和 1 开始，之后的斐波那契数列系数就由之前的两数相加
 * 4、常用的计算斐波那契数列的方法分为两大类：递归和循环
 */

// 1、递归

/**
 * 方法一 - 普通递归
 * 1、代码优美逻辑清晰，但是有重复计算的问题
 * 2、如：当n为5的时候要计算fibonacci(4) + fibonacci(3)，当n为4的要计算fibonacci(3) + fibonacci(2)，这时fibonacci(3)就是重复计算了
 * 3、运行 fibonacci(50) 会出现浏览器假死现象，毕竟递归需要堆栈，数字过大内存不够。
 */
// function feibonaqi(n) {
//     if (n === 1 || n === 2) {
//         return 1
//     }
//     return feibonaqi(n - 2) + feibonaqi(n - 1)
// }

/**
 * 方法二 - 改进递归（把前两位数字做成参数避免重复计算）
 */
// function feibonaqi(n) {
//     function fn(n, v1, v2) {
//         if (n === 1) {
//             return v1
//         }
//         if (n === 2) {
//             return v2
//         }
//         return fn(n - 1, v2, v1 + v2)
//     }
//     return fn(n, 1, 1)
// }

/**
 * 方法三 - 改进递归（利用闭包特性把运算结果存储在数组里，避免重复计算）
 */
// function feibonaqi(n) {
//     let arr = [0, 1]
//     function fn(n) {
//         if (arr[n] === undefined) {
//             arr[n] = fn(n - 2) + fn(n - 1)
//         }
//         return arr[n]
//     }
//     return fn(n)
// }

/**
 * 方法四 - 改进递归（摘出存储计算结果的功能函数）
 */
// function memorize(func) {
//     let arr = []
//     function fn(n) {
//         if (arr[n] === undefined) {
//             arr[n] = func(n)
//         }
//         return arr[n]
//     }
//     return fn
// }
// const feibonaqi = memorize(function (n) {
//     if (n === 1 || n === 2) {
//         return 1
//     }
//     return feibonaqi(n - 2) + feibonaqi(n - 1)
// })

// 2、循环

/**
 * 方法1 - 普通for循环
 */
// function feibonaqi(n) {
//     if (n === 1 || n === 2) {
//         return 1
//     }
//     let v1 = 1
//     let v2 = 1
//     let sum
//     for (let i = 3; i <= n; i++) {
//         sum = v1 + v2
//         v1 = v2
//         v2 = sum
//     }
//     return sum
// }

/**
 * 方法2 - for循环 + 解构赋值
 */
// function feibonaqi(n) {
//     let v1 = 1
//     let v2 = 1
//     if (n >= 3) {
//         for (let i = 3; i <= n; i++) {
//             [v1, v2] = [v2, v1 + v2]
//         }
//     }
//     return v2
// }
