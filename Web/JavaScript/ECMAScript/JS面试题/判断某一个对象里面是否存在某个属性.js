/**
 * 最优实现
 * @param obj
 * @param key
 * @returns {boolean}
 */
function hasProperty(obj, key) {
    return key in obj;
}

/**
 * 方式1
 */
function hasProperty1(obj, key) {
    return obj[key] !== undefined;
}
const obj1 = {
    a: undefined
};
console.log(hasProperty1(obj1, 'a')); // false
console.log(hasProperty(obj1, 'a')); // true

/**
 * 方式2
 */
function hasProperty2(obj, key) {
    return Object.keys(obj).includes(key);
}
const obj2 = {};
Object.defineProperty(obj2, 'a', {
    enumerable: false,
    value: undefined
});
console.log(hasProperty2(obj2, 'a')); // false
console.log(hasProperty(obj2, 'a')); // true

/**
 * 方式3
 */
function hasProperty3(obj, key) {
    return obj.hasOwnProperty(key);
}
const obj3 = {}
console.log(hasProperty3(obj3, 'toString')) // false
console.log(hasProperty(obj3, 'toString')); // true
