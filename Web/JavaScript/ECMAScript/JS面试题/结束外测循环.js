/**
 * 结束内层循环
 */
// for (let i = 0; i < 10; i++) {
//     console.log('外层循环')
//     for (let j = 0; j < 10; j++) {
//         console.log('内层循环')
//         break
//     }
// }

/**
 * 结束外层循环（label标记语法）
 */
outerLoop: for (let i = 0; i < 10; i++) {
    console.log('外层循环')
    innerLoop: for (let j = 0; j < 10; j++) {
        console.log('内层循环')
        break outerLoop
    }
}
