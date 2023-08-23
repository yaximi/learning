/**
 * 两个超过整数存储范围的大正整数求和
 * @param a string
 * @param b string
 */
function sum(a, b) {
    const len = Math.max(a.length, b.length)
    a = a.padStart(len, '0')
    b = b.padStart(len, '0')
    let carry = 0
    let result = ''
    for (let i = len - 1; i >= 0; i--) {
        const sum = +a[i] + +b[i] + carry
        result = (sum % 10) + result
        carry = Math.floor(sum / 10)
    }
    if (carry) {
        result = carry + result
    }
    return result
}

console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MAX_SAFE_INTEGER + 10)
console.log(sum(Number.MAX_SAFE_INTEGER + '', '10'))
