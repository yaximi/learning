/**
 * 1、使用Boolean(value)方法可以强制转换任意类型的值为boolean类型
 * 2、除了以下8个值转为false外，其他都是自动转为true
 */
console.log(Boolean(''));           // false
console.log(Boolean(0));            // false
console.log(Boolean(+0));           // false
console.log(Boolean(-0));           // false
console.log(Boolean(NaN));                // false
console.log(Boolean(undefined));    // false
console.log(Boolean(null));         // false
console.log(Boolean(false));        // false

/**
 * 注意：
 * 1、Boolean('0') === true
 * 2、所用对象（null除外）的布尔值都是true，甚至false对象对应的布尔值也是true
 */
console.log(Boolean('0'));                  // true
console.log(Boolean([]));                   // true
console.log(Boolean({}));                   // true
console.log(Boolean(() => {}));             // true
console.log(Boolean(new Boolean(false)));   // true

/**
 *  && 与运算，从第一个开始表达式，遇到值为false的表达式就返回这个表达式，否则返回最后一个表达式
 *  || 或运算，从第一个开始表达式，遇到值为true的表达式就返回这个表达式，否则返回最后一个表达式
 */
var o = new Boolean(false);
console.log(o && true);             // true
console.log(true && o);             // [Boolean: false] 此时打印的false值实际上是o对象的值
console.log(typeof (true && o));    // object

/**
 * 总结：调用Boolean()函数
 * 1、数字中除了0，+0，-0，NaN，其余都是true
 * 2、字符串中除了空串，其余都是true
 * 3、null，undefined都是false
 * 4、对象（除了null）会转换为true
 * 5、为任意数据类型做两次非运算（!!），即可将其转换为布尔值
 */