import { def } from "./utils";

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
methodsToPatch.forEach(method => {
    // 备份原始方法
    const original = arrayProto[method];

    def(arrayMethods, method, function (...args) {
        // 注意：
        // 1、该方法的定义不能使用箭头函数，因为我们要在方法内部使用this
        // 2、这里的this指向调用该方法的数组

        // 执行原始方法
        const result = original.apply(this, args);
        const ob = this.__ob__;

        // 对新插入数组的值进行相应化处理
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted) {
            ob.observeArray(inserted);
        }

        // 发布更新
        ob.dep.notify();

        return result;
    })
})
