export {};

/**
 * 1、索引签名
 */

interface Obj {
    [key: string]: any;
}

const obj:Obj = {
    name: '小明',
    age: 18
};
console.log(obj);

interface Arr {
    [key: number]: any;
}

const arr:Arr = [0, 1];
console.log(arr);


/**
 * 2、只读属性
 */

interface Person {
    name: string;
    readonly age: number;
}

const p:Person = {
    name: '小明',
    age: 18
};

p.name = '小强';
console.log(p);
// p.age = 20; // 报错
