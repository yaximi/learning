function quickSort (arr) {
    if (arr.length <= 1) {
        return arr
    }

    let index = Math.floor(arr.length / 2)
    let item = arr.splice(index, 1)[0]

    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < item) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([item], quickSort(right))
}

let arr = [22, 11, 55, 23, 20, 99, 100, 0, 5, 99, 50]

console.log(quickSort(arr))
