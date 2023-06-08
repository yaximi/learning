export {};

// 函数接口
interface AddInterface {
    (x: number, y: number): number; // 注意点：此时参数类型与返回值类型之间使用的是 : 而非 =>，注意与函数类型表达式语法的区别
}
let add:AddInterface = function (x, y) {
    return x + y
};
console.log(add(1, 2));

// 混合接口（描述函数及其属性）
interface SubInterface extends AddInterface {
    description: string;
}
let sub:SubInterface = (():SubInterface => {
    const fn = <SubInterface>((x, y) => {
        return x - y
    });
    fn.description = '减';
    return fn
})();
console.log(sub(2, 1));
