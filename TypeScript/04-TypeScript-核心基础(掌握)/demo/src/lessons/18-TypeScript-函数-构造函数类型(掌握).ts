export {};

// 构造函数
type SomeConstructor = {
    new (name: string): object;
}

let fn = function(c: SomeConstructor) {
    return new c('小明')
};

// 如JS中的Date对象，既可以当普通函数调用，又可以当构造函数调用
interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
}
