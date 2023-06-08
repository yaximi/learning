class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    say() {
       console.log(`My name is ${this.name}, i am ${this.age} years old.`)
    }
}

let p1 = new People('小明', 18)

console.log(p1.hasOwnProperty('name'))
console.log(p1.hasOwnProperty('age'))
console.log(p1.hasOwnProperty('say'))

console.log(p1)
console.log(People.prototype)
console.log(People.prototype.hasOwnProperty('constructor'))
console.log(People.prototype.hasOwnProperty('say'))
