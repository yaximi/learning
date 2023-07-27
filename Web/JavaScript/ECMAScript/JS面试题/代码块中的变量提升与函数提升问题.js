// "use strict";

var a;
if (true) {
    console.log(a);
    a = 5;
    function a() {}
    function b() {}
    a = 0;
    console.log(a);
}

console.log(a);
console.log(b);

/**
 * 非严格模式：
 * [Function: a]
 * 0
 * 5
 * [Function: b]
 *
 * 严格模式：
 * [Function: a]
 * 0
 * undefined
 * 报错 b is not defined
 */
