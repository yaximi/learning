/**
 * 单例模式：一个类是能存在一个实例
 */

// es5写法
// function User (name) {
//     this.name = name
//     this.instance = null
// }
// User.getInstance = function (name) {
//     if (!this.instance) {
//         this.instance = new User(name)
//     }
//     return this.instance
// }
// var user1 = User.getInstance('小明')
// var user2 = User.getInstance('小红')
// console.info(user1.name) // 小明
// console.info(user2.name) // 小明


// es6写法
class User {
    instance = null

    constructor (name) {
        this.name = name
    }

    static getInstance (name) {
        if (!this.instance) {
            this.instance = new User(name)
        }
        return this.instance
    }
}
var user1 = User.getInstance('小明')
var user2 = User.getInstance('小红')
console.info(user1.name) // 小明
console.info(user2.name) // 小明
