/**
 * 数组去重
 * 两个属性相同的对象也认为是重复的
 * @param arr
 * @returns {[]}
 */
function uniqueArray(arr) {
    const res = [];

    for(let i = 0; i < arr.length; i++) {
        const x = arr[i];
        let has = false;
        for(let j = 0; j < res.length; j++) {
            const y = res[j];
            if (equal(x, y)) {
                has = true;
                break;
            }
        }
        if (!has) {
            res.push(x);
        }
    }

    return res;
}

/**
 * 判断value是否为原始值
 * @param value
 * @returns {boolean}
 */
function isPrimitive(value) {
    return (typeof value !== 'object' && typeof value !== 'function') || value === null;
}

/**
 * 判断 x 和 y 是否相等
 * @param x
 * @param y
 */
function equal(x, y) {
    if (isPrimitive(x) || isPrimitive(y)) {
        return Object.is(x, y);
    }
    const entitiesX = Object.entries(x);
    const entitiesY = Object.entries(y);
    if (entitiesX.length !== entitiesY.length) {
        return false;
    }
    for(const [key, value] of entitiesX) {
        if (!(key in y) || !equal(value, y[key])) {
            return false;
        }
    }
    return true;
}

const arr = [
    { a: 1, b: undefined },
    { a: 1, c: undefined }
];
console.log(uniqueArray(arr));
