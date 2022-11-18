/**
 * 虽然 Buffer 类在全局作用域内可用，但仍然建议通过 import 或 require 语句显式地引用它
 */
import { Buffer } from 'buffer';

/**
 * Buffer.alloc(size[, fill[, encoding]]);
 */
const buf1 = Buffer.alloc(5);
console.log('buf1: ', buf1); // <Buffer 00 00 00 00 00>

const buf2 = Buffer.alloc(5, 17);
console.log('buf2: ', buf2); // <Buffer 11 11 11 11 11>

const buf3 = Buffer.alloc(5, 'a', 'ascii');
console.log('buf3: ', buf3); // <Buffer 61 61 61 61 61>

/**
 * Buffer.allocUnsafe(size);
 */
const buf4 = Buffer.allocUnsafe(5);
console.log('buf4: ', buf4);
buf4.fill(0);
console.log('buf4: ', buf4);

/**
 * Buffer.allocUnsafeSlow(size);
 */
const buf5 = Buffer.allocUnsafeSlow(5);
console.log('buf5: ', buf5);
buf5.fill(0);
console.log('buf5: ', buf5);

/**
 * 注意点：
 * 1. Buffer.allocUnsafe(size)与Buffer.allocUnsafeSlow(size)方法创建的Buffer实例的底层内存不会被初始化，新创建的Buffer的内容是未知的，可能包含敏感的数据。
 * 2. Buffer.allocUnsafe(size)分配新的Buffer实例时，4KB以下的分配（即size < 4 * 1024）将从单个预先分配的Buffer中切分（即不会初始化新的Buffer），提高了性能与内存使用率。
 *    但是，如果开发人员需要在一段时间内保留一定数量的开销内存，则可以使用Buffer.allocUnsafeSlow(size)方法。
 */

/**
 * Buffer.from(array);
 */
const buf6 = Buffer.from([0, 1, 2, 3, 4]);
console.log('buf6: ', buf6); // <Buffer 00 01 02 03 04>

const buf7 = Buffer.from(['0', '1', '2', '3', '4']);
console.log('buf7: ', buf7); // <Buffer 00 01 02 03 04>

const buf8 = Buffer.from([256, 257, 258, 259, 260]); // array中的数字范围为0-255，范围之外的数组元素会被截断以符合它
console.log('buf8: ', buf8); // <Buffer 00 01 02 03 04>

const buf9 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04]);
console.log('buf9: ', buf9); // <Buffer 00 01 02 03 04>

const buf10 = Buffer.from(['a', 'b', 'c', 'd', 'e']); // array中的元素只能是数字或数字串，不然会自动被0覆盖
console.log('buf10: ', buf10); // <Buffer 00 00 00 00 00>

/**
 * 注意点：
 * 1. Buffer.from(array); array中的元素只能是数字或数字串，不然会自动被0覆盖
 * 2. Buffer.from(array); array中的数字范围为0-255，范围之外的元素会被截断以符合它
 * 3. Buffer.from(array); 和 Buffer.from(string); 也像Buffer.allocUnsafe(size)一样，使用内部Buffer池
 */

/**
 * Buffer.from(arrayBuffer[, byteOffset[, length]]);
 * arrayBuffer：如typedArray.buffer属性等
 */
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
const buf11 = Buffer.from(arr.buffer); // 与 `arr` 共享内存
console.log('buf11: ', buf11); // <Buffer 88 13 a0 0f>
arr[1] = 6000; // 更改原始的 Uint16Array 也会更改缓冲区
console.log('buf11: ', buf11); // <Buffer 88 13 70 17>

/**
 * Buffer.from(buffer);
 * 将传入的buffer数据复制到新的Buffer实例上
 */
const buf12 = Buffer.from('buffer');
const buf13 = Buffer.from(buf12);
buf12[0] = 0x61;
console.log('buf12: ', buf12.toString()); // auffer
console.log('buf13: ', buf13.toString()); // buffer

/**
 * Buffer.from(string[, encoding]);
 */
const buf14 = Buffer.from('buffer');
console.log('buf14: ', buf14); // <Buffer 62 75 66 66 65 72>

/**
 * 总结，创建Buffer实例的方法有以下几种：
 * 1. Buffer.alloc(size[, fill[, encoding]]);
 * 2. Buffer.allocUnsafe(size);
 * 3. Buffer.allocUnsafeSlow(size);
 * 4. Buffer.from(array);
 * 5. Buffer.from(arrayBuffer[, byteOffset[, length]]);
 * 6. Buffer.from(buffer);
 * 7. Buffer.from(string[, encoding]);
 */
