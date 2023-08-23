// /**
//  * 深拷贝
//  * @param obj
//  * @returns {Array}
//  */
// const deepClone = (obj) => {
//     let newObj = new obj.constructor;
//     if (obj && typeof obj === 'object') {
//         for (let key in obj) {
//             if (obj[key] === obj) {
//                 continue;
//             }
//             if (obj.hasOwnProperty(key)) {
//                 if (obj[key] && typeof obj[key] === 'object') {
//                     newObj[key] = deepClone(obj[key]);
//                 } else {
//                     newObj[key] = obj[key];
//                 }
//             }
//         }
//     }
//     return newObj;
// };

const cache = new WeakMap();
const deepClone = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (cache.has(obj)) {
        return cache.get(obj);
    }

    let params;
    if (obj instanceof Date || obj instanceof RegExp) {
        params = obj;
    }
    const res = new obj.constructor(params);

    cache.set(obj, res);

    if (obj instanceof Map) {
        for (let [key, value] of obj) {
            res.set(deepClone(key), deepClone(value))
        }
    } else if (obj instanceof Set) {
        for (let value of obj) {
            res.add(deepClone(value))
        }
    } else if (Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = deepClone(obj[key]);
            }
        }
    }

    return res;
};

let obj1 = {
    a: 1,
    b: 2,
};
obj1.c = obj1;
let obj2 = deepClone(obj1);
console.log(obj1);
console.log(obj2);
