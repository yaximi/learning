/**
 * boolean类型
 */

let flag1 = true;
let flag2 = false;

console.log(flag1); // true
console.log(flag2); // false

console.log(typeof flag1);  // boolean
console.log(typeof flag2);  // boolean

/**********************************************************************************************************************/

/**
 * 通过new Boolean()方法定义的值，是object类型，而非boolean类型
 * 注意：空字符串（''）和空格串（' '），以及字符串0（'0'）和数字0、+0、-0的区别
 */

let flag3 = new Boolean('');
let flag4 = new Boolean(0);
let flag5 = new Boolean(+0);
let flag6 = new Boolean(-0);
let flag7 = new Boolean(NaN);
let flag8 = new Boolean(false);
let flag9 = new Boolean(undefined);
let flag10 = new Boolean(null);

let flag11 = new Boolean(' ');
let flag12 = new Boolean('0');
let flag13 = new Boolean([]);
let flag14 = new Boolean({});
let flag15 = new Boolean(() => {});

console.log(flag3);     // [Boolean: false]
console.log(flag4);     // [Boolean: false]
console.log(flag5);     // [Boolean: false]
console.log(flag6);     // [Boolean: false]
console.log(flag7);     // [Boolean: false]
console.log(flag8);     // [Boolean: false]
console.log(flag9);     // [Boolean: false]
console.log(flag10);    // [Boolean: false]

console.log(flag11);    // [Boolean: true]
console.log(flag12);    // [Boolean: true]
console.log(flag13);    // [Boolean: true]
console.log(flag14);    // [Boolean: true]
console.log(flag15);    // [Boolean: true]

console.log(typeof flag3);  // object
console.log(typeof flag4);  // object
console.log(typeof flag5);  // object
console.log(typeof flag6);  // object
console.log(typeof flag7);  // object
console.log(typeof flag8);  // object
console.log(typeof flag9);  // object
console.log(typeof flag10); // object

console.log(typeof flag11); // object
console.log(typeof flag12); // object
console.log(typeof flag13); // object
console.log(typeof flag14); // object
console.log(typeof flag15); // object

/**********************************************************************************************************************/

/**
 * 通过Boolean()方法强制类型转换之后得到的值是boolean类型
 * 注意：空字符串（''）和空格串（' '），以及字符串0（'0'）和数字0、+0、-0的区别
 * 具体转换规则请移步：JS数据类型转换/将其他类型的数据转为boolean.js
 */

let flag16 = Boolean('');
let flag17 = Boolean(0);
let flag18 = Boolean(+0);
let flag19 = Boolean(-0);
let flag20 = Boolean(NaN);
let flag21 = Boolean(undefined);
let flag22 = Boolean(null);
let flag23 = Boolean(false);

let flag24 = Boolean(' ');
let flag25 = Boolean('0');
let flag26 = Boolean([]);
let flag27 = Boolean({});
let flag28 = Boolean(() => {});
let flag29 = Boolean(new Boolean(false));

console.log(flag16);    // false
console.log(flag17);    // false
console.log(flag18);    // false
console.log(flag19);    // false
console.log(flag20);    // false
console.log(flag21);    // false
console.log(flag22);    // false
console.log(flag23);    // false

console.log(flag24);    // true
console.log(flag25);    // true
console.log(flag26);    // true
console.log(flag27);    // true
console.log(flag28);    // true
console.log(flag29);    // true

console.log(typeof flag16); // boolean
console.log(typeof flag17); // boolean
console.log(typeof flag18); // boolean
console.log(typeof flag19); // boolean
console.log(typeof flag20); // boolean
console.log(typeof flag21); // boolean
console.log(typeof flag22); // boolean
console.log(typeof flag23); // boolean

console.log(typeof flag24); // boolean
console.log(typeof flag25); // boolean
console.log(typeof flag26); // boolean
console.log(typeof flag27); // boolean
console.log(typeof flag28); // boolean
console.log(typeof flag29); // boolean

/**********************************************************************************************************************/

/**
 * 疑点
 */

let flag30 = true
let flag31 = new Boolean(true)

console.log(flag30) // true
console.log(flag31) // [Boolean: true]

console.log(typeof flag30)  // boolean
console.log(typeof flag31)  // object

console.log(flag30 == flag31)   // true
console.log(flag30 === flag31)  // false

let flag32 = flag31

console.log(flag31) // [Boolean: true]
console.log(flag32) // [Boolean: true]

console.log(typeof flag31)  // object
console.log(typeof flag32)  // object

console.log(flag31 == flag32)   // true
console.log(flag31 === flag32)  // true

flag32 = false

console.log(flag31) // [Boolean: true]
console.log(flag32) // false

console.log(typeof flag31)  // object
console.log(typeof flag32)  // boolean

console.log(flag31 == flag32)   // false
console.log(flag31 === flag32)  // false

/**********************************************************************************************************************/
