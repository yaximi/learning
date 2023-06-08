function Fn() {
    this.log1 = function (msg) {
        console.log('log1:' + msg)
    }
}
Fn.prototype.log2 = function (msg) {
    console.log('log2:' + msg)
}

var f1 = new Fn()
var f2 = new Fn()

f1.log1('123')
f1.log2('456')

console.log(f1.hasOwnProperty('log1'))
console.log(f1.hasOwnProperty('log2'))
console.log(f1.log1 === f2.log1)
console.log(f1.log2 === f2.log2)
