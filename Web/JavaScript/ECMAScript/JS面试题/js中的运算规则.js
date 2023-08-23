/**
 * 算术运算（+ - * / % ++ --）
 * 1、首先转换成原始类型
 * 2、无特殊情况，转换成数字，然后运算
 * 3、特殊情况：x + y，x 和 y 有一个是字符串。转换为字符串，然后拼接
 * 4、特殊情况：NaN 和任何类型运算得到的还是 NaN
 */

/**
 * null + undefined 分析：
 * 1、null 和 undefined 都是原始类型
 * 2、无特殊情况，转换成数字，然后运算
 *    Number(null) === 0
 *    Number(undefined) === NaN
 * 3、0 + NaN
 * 4、存在特殊情况，NaN 和任何类型运算得到的还是 NaN
 */
console.log(null + undefined); // NaN


/**
 *
 * 对象如何转原始类型？
 * 1、如果对象拥有 [Symbol.toPrimitive] 方法，调用该方法
 *    若该方法能得到原始值，使用该原始值
 *    若该方法得不到原始值，抛出异常
 * 2、调用对象的 valueOf 方法
 *    若该方法能得到原始值，使用该原始值
 *    若该方法得不到原始值，进入下一步
 * 3、调用对象的 toString 方法
 *    若该方法能得到原始值，使用该原始值
 *    若该方法得不到原始值，抛出异常
 *
 * [] + {} 分析：
 * 1、首先转换成原始类型
 *    [].valueOf() => []
 *    [].toString() => ''
 *    {}.valueOf() => {}
 *    {}.toString() => '[object Object]'
 * 2、存在特殊情况：x + y，x 和 y 有一个是字符串。转换为字符串，然后拼接
 *    '' + '[object Object]' === '[object Object]'
 */
console.log([] + {}) // '[object Object]'

/**
 * 比较运算（> < >= <= == != === !==）
 *
 * （> < >= <=）
 * 1、首先转换成原始类型
 * 2、无特殊情况，转换成数字，然后比较
 * 3、特殊情况：两端全是字符串，比较字典顺序
 * 4、特殊情况：两端存在 NaN，一定为 false
 *
 * （===）
 * 1、类型和值必须都相同
 * 2、特殊情况：两端存在 NaN，一定为 false
 *
 * （==）
 * 1、两端类型相同，比较值
 * 2、两端都是原始类型，转换成数字比较
 * 3、一端是原始类型，一端是对象类型，把对象转换成原始类型后比较
 * 4、特殊情况：undefined 和 null 只有与自身比较，或者互相比较时，才会返回 true
 * 5、特殊情况：两端存在 NaN，返回 false
 *
 * （!= !==）
 * 1、对相等取反
 */

/**
 * null > undefined 分析：
 * 1、两端都为原始类型
 * 2、无特殊情况
 * 3、转换成数字
 *    Number(null) === 0
 *    Number(undefined) === NaN
 * 4、比较 0 > NaN
 * 5、存在特殊情况：两端存在 NaN，一定为 false
 */
console.log(null > undefined) // false

/**
 * 逻辑运算（！ && || ？:）
 * 1、首先转换为 boolean
 * 2、x && y
 *    x 为 false，返回 x
 *    x 为 true，返回 y
 * 3、x || y
 *    x 为 false，返回 y
 *    x 为 true，返回 x
 */
console.log(1 || 2) // 1
