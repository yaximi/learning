/**
 * 1.在ES6之前，JavaScript没有块级作用域(一对花括号{}即为一个块级作用域)，只有全局作用域和函数作用域
 * 2.变量提升即将变量声明提升到它所在作用域的最开始的部分，注意：只会提升变量名的声明，而不会提升变量的赋值初始化
 * 3.同一个变量只会声明一次，其他的会被忽略掉
 */
(function (a) {
    console.log(a); // 10
    var a = 100;
    console.log(a); // 100
})(10);

// 上面函数自执行时传入实参，可看作下面代码
(function () {
    var a = 10;
    console.log(a);
    var a = 100;
    console.log(a);
})();

// 存在变量提升，又相当于下面的代码
(function () {
    var a;
    a = 10;
    console.log(a);
    a = 100;
    console.log(a);
})();


/**
 * 1.JS中创建函数有两种方式：函数声明和函数表达式。只有函数声明才存在函数提升，函数表达式仍属于变量提升。
 * 2.函数提升会将函数声明和函数定义的部分一起提升（但在形参声明与赋值之后）
 * 3.函数提升的优先级高于变量提升，低于形参的声明与赋值
 */
(function (a) {
    console.log(a); // 10
    var a = function () {};
    console.log(a); // [Function: a]
})(10);

(function (a) {
    console.log(a); // [Function: a]
    function a () {}
    console.log(a); // [Function: a]
})(10);

(function (a) {
    var a = 100;
    console.log(a); // 100
    function a () {}
    console.log(a); // 100
})(10);