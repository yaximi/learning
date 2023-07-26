/**
 * 手写 call 函数
 * 不得使用 apply、bind 辅助
 */

Function.prototype.myCall = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        configurable: true,
        enumerable: false,
        value: this
    });
    const result = ctx[key](...args);
    delete ctx[key];
    return result;
};

function add (a, b) {
    console.log(this, a, b);
    return a + b;
}

add.myCall({}, 1, 2);
