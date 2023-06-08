export {};

// 数组类型
// 方式一
let arr1:Array<number>; // 表示定义了一个名称为arr1的数组，这个数组中将来只能够存储数值类型的数据
arr1 = [1, 2, 3];
// arr1 = ['a', 2, 3]; // 报错
// arr1 = [true, 2, 3]; // 报错
console.log(arr1);

// 方式二
let arr2:number[]; // 表示定义了一个名称为arr2的数组，这个数组中将来只能够存储数值类型的数据
arr2 = [1, 2, 3];
// arr2 = ['a', 2, 3]; // 报错
// arr2 = [true, 2, 3]; // 报错
console.log(arr2);

// 联合类型
let arr3:Array<number | string>; // 表示定义了一个名称为arr3的数组，这个数组中将来既可以存储数值类型的数据，也可以存储字符串类型的数据
arr3 = ['a', 2, 3];
console.log(arr3);

let arr4:(number | string)[]; // 表示定义了一个名称为arr4的数组，这个数组中将来既可以存储数值类型的数据，也可以存储字符串类型的数据
arr4 = ['a', 2, 3];
console.log(arr4);

// 任意类型
let arr5:Array<any>; // 表示定义了一个名称为arr5的数组，这个数组中将来可以存储任意类型的数据
arr5 = ['a', 2, true];
console.log(arr5);

let arr6:any[];
arr6 = ['a', 2, true]; // 表示定义了一个名称为arr6的数组，这个数组中将来可以存储任意类型的数据
console.log(arr6);

// 元祖类型
// TS中的元祖类型其实就是数组类型的扩展
// 元祖类型用于保存定长定元素类型的数据(注意：在TypeScript2.7版本之后，元祖类型不在支持越界元素，定长)
let arr7:[string, number, boolean]; // 表示定义了一个名称为arr7的元祖，这个元祖中将来只可以存储3个元素，且第一个元素必须是字符串类型，第二个元素必须是数值类型，第三个元素必须是布尔类型
arr7 = ['a', 2, true];
// arr7 = ['a', 2, true, false]; // 报错
// arr7 = [2, 'a', true]; // 报错
console.log(arr7);
