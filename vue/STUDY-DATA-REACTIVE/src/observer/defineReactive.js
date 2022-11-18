import { observe } from "./observe";
import { Dep } from "./Dep";

/**
 * 相应化处理
 * @param target
 * @param key
 * @param value 闭包
 * @returns {*}
 */
export function defineReactive(target, key, value) {
    if (arguments.length === 2) {
        value = target[key];
    }
    let childOb = observe(value); // 递归调用

    const dep = new Dep(); // 闭包
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend(); // 收集依赖
            if (childOb) {
                childOb.dep.depend(); // 作用于数组push、pop等方法
            }
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            value = newValue;
            /**
             * 注意：
             * 1. 对 newValue 进行相应化处理
             * 2. 将响应化处理后的 newValue.__ob__ 赋值给 childOb
             *    这里如果没有赋值，而 newValue 是一个数组时，对新设置的 newValue 做 push、pop 等操作将不会触发更新
             */
            childOb = observe(value);
            dep.notify(); // 发布更新
        }
    })
}