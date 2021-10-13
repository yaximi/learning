export {};

// 函数接口
// 我们除了可以通过接口来限定对象以外，我们还可以使用接口来限定函数

// interface Sum {
//     (a: number, b: number): number;
// }
//
// const sum: Sum = function (a: number, b: number): number {
//     return a + b;
// }
//
// let res: number = sum(1, 2);
// console.log(res);

// 混合接口
// 约定的内容中既有对象属性，又有函数

interface Count {
    (): void;
    count: number;
}

const getCount = (function (): Count {
    const fn = <Count>function () {
        fn.count++;
        console.log(fn.count);
    }
    fn.count = 0;
    return fn;
})();

getCount();
getCount();
getCount();
