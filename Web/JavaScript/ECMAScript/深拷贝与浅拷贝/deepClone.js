/**
 * 简易深拷贝
 * @param obj
 * @returns {Array}
 */
const deepClone = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }

    return newObj;
};

/**
 * 原型问题优化
 * @param obj
 * @returns {[]|{}|*}
 */
const deepClone1 = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const newObj = Array.isArray(obj) ? [] : {};
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj)); // 设置原型

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone1(obj[key]);
        }
    }

    return newObj;
};

/**
 * 循环引用问题优化
 * @param obj
 * @param cache
 * @returns {[]|{}|any}
 */
const deepClone2 = (obj, cache = new WeakMap()) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (cache.has(obj)) {
        return cache.get(obj);
    }

    const newObj = Array.isArray(obj) ? [] : {};
    cache.set(obj, newObj); // 设置缓存
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj)); // 设置原型

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone2(obj[key], cache);
        }
    }

    return newObj;
};

const obj1 = {
    a: 1,
    b: [1],
    c: {
        a: 1
    },
    d: Symbol('1'),
    e: function () {

    }
};
obj1.f = obj1;
const obj2 = deepClone2(obj1);
console.log(obj1);
console.log(obj2);
