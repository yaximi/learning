/**
 * 在Node.js中，一个字符串的长度与根据该字符串所创建的缓存区的长度并不相同。
 * 因为在计算字符串的长度时，以文字作为一个单位，而在计算缓存区的长度时，以字节作为一个单位。
 * 例如，针对“我喜爱编程”这个字符串，该字符串对象的length属性值与根据该字符串创建的Buffer对象的length属性值并不相同。
 * 因为字符串对象的length属性值获取的是文字个数，而Buffer对象的length属性值获取的是缓存区的长度，即缓存区中的字节数。
 */
import { Buffer } from 'buffer';

let str = '我喜爱编程';
let buf = Buffer.from(str);
console.log('字符串str的长度：str.length = ', str.length); // 5
console.log('缓冲区buf的长度：buf.length = ', buf.length); // 15

/**
 * 1. Buffer.byteLength(str[, encoding]);
 * 获取字符串（str）在不同编码格式（encoding，默认为utf8）下的字节数
 *
 * 2. Buffer.byteLength(buf);
 * 获取缓冲区（buf）的长度（字节数）
 */
console.log('Buffer.byteLength(str) = ', Buffer.byteLength(str)); // 15
console.log('Buffer.byteLength(str, "utf8") = ', Buffer.byteLength(str, 'utf8')); // 15
console.log('Buffer.byteLength(str, "ascii") = ', Buffer.byteLength(str, 'ascii')); // 5

console.log('Buffer.byteLength(buf) = ', Buffer.byteLength(buf)); // 15
console.log('Buffer.byteLength(buf, "utf8") = ', Buffer.byteLength(buf, 'utf8')); // 15
console.log('Buffer.byteLength(buf, "ascii") = ', Buffer.byteLength(buf, 'ascii')); // 15

/**
 * 1. str[index]
 * 2. buf[index]
 * 可以通过索引运算符[index]取出字符串对象或缓存区对象中的数据。
 * 但是，在获取数据时，字符串对象也是以文字作为一个单位，而缓存区对象（即Buffer对象）以字节作为一个单位。
 * 例如，针对一个引用了字符串对象的str变量来说，str[2]获取的是第三个文字，
 * 而针对一个引用了缓存区对象的buf变量来说，buf[2]获取的是缓存区中第三个字节数据转换为整数后的数值。
 */
console.log('str = ', str); // '我喜爱编程'
console.log('str[2] = ', str[2]); // '爱'

console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e5 8f 98 e6 88 90>
console.log('buf[2] = ', buf[2]); // 0x91 = 145

/**
 * 另外，字符串对象的索引运算符（即：str[index]），只读不可写。
 * 而Buffer对象的索引运算符（即：buf[index]），可读可写。
 */
console.log('str = ', str); // '我喜爱编程'
// str[2] = '欢'; // TypeError: Cannot assign to read only property '2' of string '我喜爱编程'

console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
buf[2] = 0;
console.log('buf = ', buf); // <Buffer e6 88 00 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
buf[2] = 145;
console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>

/**
 * buf.slice([start[, end]]);
 */
console.log('str = ', str); // '我喜爱编程'
console.log('str.slice(2, 4) = ', str.slice(2, 4)); // '爱编'
console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
console.log('buf.slice(2, 4) = ', buf.slice(2, 4)); // <Buffer 91 e5>

/**
 * 另外，由于Buffer对象的slice方法并不是复制缓存区中的数据，而是与该数据共享内存区域
 * 因此，如果修改使用slice方法取出的数据，则缓存区中保存的数据也将被修改。
 */
console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
const subBuf = buf.slice(2, 4);
console.log('subBuf = ', subBuf); // <Buffer 91 e5>
subBuf[0] = 0;
console.log('subBuf = ', subBuf); // <Buffer 00 e5>
console.log('buf = ', buf); // <Buffer e6 88 00 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
subBuf[0] = 145;
console.log('subBuf = ', subBuf); // <Buffer 91 e5>
console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>

/**
 * 总结：
 * 1. 获取字符串的长度（字符数）
 *    str.length
 *
 * 2. 获取字符串不同编码格式下的字节数（encoding默认为utf8）
 *    Buffer.byteLength(str[, encoding]);
 *
 * 3. 获取缓存区的长度（字节数）
 *    buf.length
 *    Buffer.byteLength(buf);
 *
 * 4. buf[index]
 *    索引运算符[index]可用于获取和设置buf中位置index处的数据（一个字节，即8位二进制数据），这些值是指单个字节，因此合法值范围介于 0x00 和 0xFF（十六进制）或 0 和 255（十进制）之间。
 *    当 index 为负或大于等于 buf.length 时，buf[index] 返回 undefined，如果 index 为负或大于等于 buf.length，buf[index] = value 不修改缓冲区。
 *
 * 5. buffer.slice([start[, end]]);
 *    返回新的 Buffer，其引用与原始缓冲区相同的内存，但由 start 和 end 索引进行偏移和裁剪。
 */