export {};

/**
 * any类型
 * any表示任意类型，当我们不清楚某个值的具体类型的时候我们就可以使用any
 * 一般用于定义一些通用性比较强的变量，或者用于保存从其他框架中获取的不确定类型的值
 * TS中任何数据类型的值都可以赋值给any类型
 */
let val:any;
val = 123;
val = 'abc';
val = true;
val = undefined;
val = null;
val = [];
val = {};
val = function () {};

/**
 * void类型
 * void与any正好相反，表示没有任何类型，一般用于没有返回值的函数的返回值类型
 * TS中只有null和undefined可以赋值给void类型(非严格模式下)
 * 注意点：null和undefined是所有类型的子类型，所以我们可以将null和undefined赋值给任意类型(非严格模式下)
 */
function test():void {
    console.log('Hello World!');
}
test();

let val1:void;
// val1 = 123; // 报错
// val1 = 'abc'; // 报错
// val1 = true; // 报错
// val1 = null; // tsconfig.json中配置了"strict": true，开启了严格模式，会报错
// val2 = undefined; // tsconfig.json中配置了"strict": true，开启了严格模式，会报错
