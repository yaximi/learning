import { Dep } from "./Dep";
import { parsePath } from "./utils";

let uid = 0;

export class Watcher {
    constructor(target, expression, callback) {
        this.id = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }

    update() {
        const value = this.get();
        if (this.value !== value || typeof value === 'object') {
            /**
             * 注意判断条件
             * 1. 值发生改变，不论是基本数据类型还是引用数据类型，都要触发更新回调
             * 2. 值未发生改变，但值为引用数据类型，也要触发更新回调
             *    例如数组push、pop等方法添加或删除元素，数组内容发生了改变，但数组的指针不变
             */
            const oldValue = this.value;
            this.value = value;
            this.callback.call(this.target, value, oldValue);
        }
    }

    get() {
        Dep.target = this;
        let value;
        try {
            value = this.getter(this.target);
        } finally {
            Dep.target = null;
        }
        return value;
    }
}