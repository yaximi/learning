export {};

/**
 * JS本身是个动态语言，JS中函数根据传入不同的参数而返回不同类型的数据是很常见的
 * 例如：getArr函数-传入数字val时返回0到val-1的数组，传入字符串val时，返回val单个字母分隔的数组
 */

// function getArr (val) {
//     if (typeof val === 'number') {
//         let arr = [];
//         for (let i = 0; i < val; i++) {
//             arr.push(i)
//         }
//         return arr;
//     } else {
//         return val.split('');
//     }
// }

/**
 * 对于上面的例子，我们需要对getArr进行函数重载
 * 方法是为同一个函数提供多个函数类型定义来进行函数重载
 */

function getArr(val:number):number[];
function getArr(val:string):string[];
function getArr(val:any):any[] {
    if (typeof val === 'number') {
        let arr = [];
        for (let i = 0; i < val; i++) {
            arr.push(i)
        }
        return arr;
    } else {
        return val.split('');
    }
}

console.log(getArr(3)); // [1, 2, 3]
console.log(getArr('abc')); // ['a', 'b', 'c']
