import { hasProto, isArray, def } from "./utils";
import { defineReactive } from "./defineReactive";
import { observe } from "./observe";
import { arrayMethods } from "./array";
import { Dep } from "./Dep";

export class Observer {
    constructor(value) {
        def(value, '__ob__', this);
        this.dep = new Dep(); // 作用于数组push、pop等方法

        if (isArray(value)) {
            if (hasProto) {
                value.__proto__ = arrayMethods
            } else {
                Object.getOwnPropertyNames(arrayMethods).forEach(method => {
                    def(value, method, arrayMethods[method])
                })
            }
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    walk(value) {
        Object.keys(value).forEach(key => {
            defineReactive(value, key)
        })
    }

    observeArray(value) {
        value.forEach(val => {
            observe(val)
        })
    }
}