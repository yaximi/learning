/**
 * 方式1、布尔判定
 * 存在很多问题
 * 如值为：0 undefined null false NaN... 会判定为不存在
 */
let obj1 = {
    a: 1,
    b: 0,
    c: undefined, 
    d: null,
    e: false,
    f: NaN
}

if (obj1.a) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (obj1.b) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在，判断错误
}

if (obj1.c) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在，判断错误
}

if (obj1.d) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在，判断错误
}

if (obj1.e) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在，判断错误
}

if (obj1.f) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在，判断错误
}

/**
 * 方式2、undefined判定
 * 同样存在问题
 * 如值为：undefined 会判定为不存在
 */
let obj2 = {
    a: 1,
    b: 0,
    c: undefined, 
    d: null,
    e: false,
    f: NaN
}

if (obj1.a !== undefined) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (obj1.b !== undefined) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (obj1.c !== undefined) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在，判断错误
}

if (obj1.d !== undefined) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (obj1.e !== undefined) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (obj1.f !== undefined) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

/**
 * 方式3、Object.keys() 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
 * 1、不包含原型上的属性的键名
 * 2、不包含不可枚举属性的键名
 * 3、不包含symbol类型键名
 */
let obj3 = {
    a: 1,
    [Symbol('b')]: 2
}
Object.defineProperty(obj3, 'c', {
    value: 3,
    enumerable: false
})
console.log(Object.keys(obj3)) // ['a']

/**
 * 方式4、
 * 
 * Object.getOwnPropertyNames() 自身的所有非Symbol键名
 * 1、不包含原型上的属性的键名
 * 2、包含不可枚举属性的键名
 * 3、不包含symbol类型键名
 * 
 * Object.getOwnPropertySymbols() 自身的所有Symbol键名
 * 1、不包含原型上的属性的键名
 * 2、包含不可枚举属性的键名
 * 3、仅包含symbol类型键名
 * 
 * Reflect.ownKeys() 自身的所有键名，基本等同于Object.getOwnPropertyNames()与Object.getOwnPropertySymbols()之和
 * 1、不包含原型上的属性的键名
 * 2、包含不可枚举属性的键名
 * 3、包含symbol类型键名
 * 
 * https://blog.51cto.com/u_16213631/7245401
 */
let obj4 = {
    a: 1,
    b: Symbol(),
    [Symbol('c')]: 3
}
Object.defineProperty(obj4, 'd', {
    value: 4,
    enumerable: false
})
Object.defineProperty(obj4, Symbol('e'), {
    value: 5,
    enumerable: false
})
console.log(Object.getOwnPropertyNames(obj4)) // ['a', 'b', 'd']
console.log(Object.getOwnPropertySymbols(obj4)) // [Symbol('c'), Symbol('e')]
console.log(Reflect.ownKeys(obj4)) // ['a', 'b', 'd', Symbol('c'), Symbol('e')]

/**
 * 方式5、
 * 
 * Object.prototype.hasOwnProperty()
 * 1、不包含原型上的属性
 * 2、包含不可枚举属性
 * 3、包含键名为Symbol的属性
 * 
 * Object.hasOwn() 
 * 功能等同与 Object.prototype.hasOwnProperty()
 * 优点可参考：https://es6.ruanyifeng.com/#docs/object-methods#Object-hasOwn
 */
let obj5 = Object.create({
    a: 1
})
Object.defineProperty(obj5, 'b', {
    value: 2,
    enumerable: false
})
let c = Symbol('c')
obj5[c] = 3

if (obj5.hasOwnProperty('a')) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在
}

if (obj5.hasOwnProperty('b')) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (obj5.hasOwnProperty(c)) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (Object.hasOwn(obj5, 'a')) {
    console.log('存在')
} else {
    console.log('不存在') // 不存在
}

if (Object.hasOwn(obj5, 'b')) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (Object.hasOwn(obj5, c)) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

/**
 * 方式6、in 、Reflect.has()
 * 1、包含原型上的属性
 * 2、包含不可枚举属性
 * 3、包含键名为Symbol的属性
 */
let obj6 = Object.create({
    a: 1
})
Object.defineProperty(obj6, 'b', {
    value: 2,
    enumerable: false
})
let d = Symbol('d')
obj6[d] = 3

if ('a' in obj6) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if ('b' in obj6) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (d in obj6) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (Reflect.has(obj6, 'a')) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (Reflect.has(obj6, 'b')) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}

if (Reflect.has(obj6, d)) {
    console.log('存在') // 存在
} else {
    console.log('不存在')
}