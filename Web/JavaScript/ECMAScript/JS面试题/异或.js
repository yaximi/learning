/**
 * 找单身狗
 * nums 数组中包含1个或多个正整数
 * 其他的数字都出现2次
 * 只有一个数字只出现了1次
 * 找出只出现了1次的数字
 * @param nums
 */
function uniqueNumber(nums) {
    return nums.reduce((a, b) => a ^ b, 0)
}

const arr = [1, 2, 3, 2, 1]
console.log(uniqueNumber(arr))

/**
 * 异或 ^
 * 1、满足交换率：a ^ b = b ^ a
 * 2、a ^ a = 0
 * 3、0 ^ a = a
 */
