/**
 * 1、.then(onFulfilled, onRejected)接收两个函数作为参数，分别代表fulfilled和rejected状态下的响应函数
 * 2、.then(onFulfilled, onRejected)返回一个新的Promise实例，所以它可以链式调用
 * 3、当前面的Promise状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行
 * 3、状态响应函数（onFulfilled、onRejected）可以返回新的Promise，或其他值。
 *    3.1、如果返回新的Promise，那么下一级.then()会在新Promise状态改变之后执行
 *    3.2、如果返回其他任何值，则会立刻执行下一级.then()
 */
