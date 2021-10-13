export {};

/**
 * 1、什么是接口（interface）类型？
 * 和boolean，number，string，enum这些数据类型一样
 * 接口也是一种类型，也是用来约束使用者的
 */
interface Person {
    name: string;
    age: number;
}

function say({name, age}:Person):void {
    console.log(`我是${name}，几年${age}岁`)
}

const obj = {
    name: '小明',
    age: 18,
    gender: 'male'
};
say(obj);

// say({
//     name: '小明',
//     age: 18,
//     gender: 'male'
// });
