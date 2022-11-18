import { Buffer } from 'buffer';
import { StringDecoder } from 'string_decoder';

/**
 * 1.字符串对象转换成Buffer对象
 * Buffer.alloc(str[, encoding]);
 */
const buf = Buffer.from('我喜爱编程');
console.log('buf = ', buf); // <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>

/**
 * 2.Buffer对象转换成字符串对象
 * buf.toString([encoding[, start[, end]]]);
 */
const str = buf.toString();
console.log('str = ', str); // 我喜爱编程
console.log('str[4] = ', buf.toString('utf8', 9, 12)); // 编

/**
 * 3.向已创建的Buffer对象中写入字符串
 * buf.write(str[, offset[, length]][, encoding]);
 */
console.log('buf = ', buf);
console.log('buf.toString() = ', buf.toString()); // 我喜爱编程
buf.write('欢', 6, 3);
console.log('buf = ', buf);
console.log('buf.toString() = ', buf.toString()); // 我喜欢编程

/**
 * 4.使用StringDecoder对象将Buffer对象中保存的数据转换成字符串
 * 详细API可查看string_decoder模块
 */
const decoder = new StringDecoder('utf16le');
console.log(decoder.write(Buffer.from('我喜爱', 'utf16le')));
console.log(decoder.end(Buffer.from('编程', 'utf16le')));