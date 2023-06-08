/**
 * 假设 doSomething() 和 doSomethingElse() 均返回 Promise 实例
 */

/**
 * 示例1
 *
 * doSomething()
 *  .then(function () {
 *      return doSomethingElse()
 *  })
 *  .then(finalHandler)
 *
 *  执行顺序
 *  doSomething
 *  |---------|
 *            doSomethingElse(undefined)
 *            |------------------------|
 *                                     finalHandler(resultOfDoSomethingElse)
 *                                     |-----------------------------------|
 */

/**
 * 示例2
 *
 * doSomething()
 *  .then(function () {
 *      doSomethingElse()
 *  })
 *  .then(finalHandler)
 *
 *  执行顺序
 *  doSomething
 *  |---------|
 *            doSomethingElse(undefined)
 *            |------------------------|
 *            finalHandler(undefined)
 *            |---------------------|
 */

/**
 * 示例3
 *
 * doSomething()
 *  .then(doSomethingElse())
 *  .then(finalHandler)
 *
 *  执行顺序
 *  doSomething
 *  |---------|
 *  doSomethingElse(undefined)
 *  |------------------------|
 *            finalHandler(resultOfDoSomething)
 *            |-------------------------------|
 *
 *  注意：这个示例具有欺骗性，第一个.then()中的参数doSomethingElse()其实是一个Promise实例，并非一个函数，所以直接忽略
 */

/**
 * 示例4
 *
 * doSomething()
 *  .then(doSomethingElse)
 *  .then(finalHandler)
 *
 *  执行顺序
 *  doSomething
 *  |---------|
 *            doSomethingElse(resultOfDoSomething)
 *            |----------------------------------|
 *                                               finalHandler(resultOfDoSomethingElse)
 *                                               |-----------------------------------|
 */