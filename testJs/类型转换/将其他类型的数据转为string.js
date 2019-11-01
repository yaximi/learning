/**
 *
 * 方法一：toString()
 *      1、调用被转换数据的toString()方法，就可以将其他类型转换为string
 *      2、该方法不会影响到原变量，它会将转换的结果返回
 *      3、null，undefined这两个值没有toString()方法，如果使用，会报错
 *
 * 方法二：String()
 *      1、使用String()函数做强制类型转换时，除了null、undefined，实际上就是调用toString()方法
 *      2、对于null和undefined，就不是调用toString()方法了，它会将null直接转换为'null'，将undefined直接转换为'undefined'
 *
 * 方法三：隐式类型转换
 *      1、任何值和字符串做加法，都会将其转换为字符串，而后做拼接，可以利用这个特点，通过+''，将任意数据类型转换为string
 *      2、该方法实际上是调用的string()函数，所以都能进行转换
 */
