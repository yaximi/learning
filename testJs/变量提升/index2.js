/**
 * 1.JavaScript中创建函数有两种方式：函数声明和函数表达式。函数声明存在函数提升，函数表达式存在变量提升。
 * 2.函数提升会将函数声明和函数定义的部分一起提升到它所在作用域的最开始的部分（但只能提升到形参的声明与赋值之后）
 * 3.函数提升的优先级高于变量提升
 */

(function () {
    console.log(a); // undefined
    var a = function () {};
    console.log(a); // [Function a]
})();

// var a = function () {}; 函数表达式，存在变量提升，即将变量声明提升到它所在作用域的最开始的部分（注意：只会提升变量名的声明，而不会提升变量的赋值初始化）
// 所以上面的代码相当于：
(function () {
    var a;
    console.log(a); // undefined
    a = function () {};
    console.log(a); // [Function a]
})();

/**********************************************************************************************************************/

(function () {
    console.log(a); // [Function a]
    function a () {};
    console.log(a); // [Function a]
})();

// function a () {}; 函数声明，存在函数提升，即将函数声明和函数定义的部分一起提升到它所在作用域的最开始的部分
// 所以上面的代码相当于：
(function () {
    var a;
    a = function () {};
    console.log(a); // [Function a]
    console.log(a); // [Function a]
})();

/**********************************************************************************************************************/

(function () {
    console.log(a); // [Function a]
    var a = 10;
    console.log(a); // 10
    function a () {};
    console.log(a); // 10
})();

// var a = 10; 存在变量提升，即将变量声明提升到它所在作用域的最开始的部分（注意：只会提升变量名的声明，而不会提升变量的赋值初始化）
// function a () {}; 存在函数提升，即将函数声明和函数定义的部分一起提升到它所在作用域的最开始的部分
// 函数提升的优先级高于变量提升
// 所以上面的代码相当于：
(function () {
    var a;
    a = function () {};
    console.log(a); // [Function a]
    var a = 10;
    console.log(a); // 10
    console.log(a); // 10
})();

// 在 function a () {}; 优先提升之后，相当于已经声明并提升了变量a
// 在 var a = 10; 进行变量提升时，重复的变量a的声明将被忽略
// 所以上面的代码又相当于：
(function () {
    var a;
    a = function () {};
    console.log(a); // [Function a]
    a = 10;
    console.log(a); // 10
    console.log(a); // 10
})();