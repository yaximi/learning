/**
 * 深拷贝与浅拷贝
 * @param obj
 * @returns {Array}
 */
const deepClone = (obj) => {
    let newObj = new obj.constructor;
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] === obj) {
                continue;
            }
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    newObj[key] = deepClone(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
    }
    return newObj;
};

let obj1 = {
    a: 1,
    b: {
        c: 2
    }
};
let obj2 = deepClone(obj1);
obj1.b.c = 3;
console.log(obj1);
console.log(obj2);
