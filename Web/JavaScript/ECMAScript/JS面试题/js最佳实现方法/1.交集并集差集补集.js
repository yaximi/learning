const arrA = []
const arrB = []
const setA = new Set(arrA)
const setB = new Set(arrB)

// 交集
const intersection = arrA.filter(item => setB.has(item))

// 差集
const subtraction = arrA.filter(item => !setB.has(item))

// 并集
const union = (arrA, arrB) => Array.from(new Set([...arrA, ...arrB]))

// 补集
const complement = (arrA, arrB) => [...arrA.filter(item => !setB.has(item)), ...arrB.filter(item => !setA.has(item))]
