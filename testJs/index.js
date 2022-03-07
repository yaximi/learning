let person = {}
Object.defineProperty(person, 'name', {
    value: '小明'
})
console.log(person.name)
Object.defineProperty(person, 'name', {
    configurable: true,
    writable: true
})
console.log(person.name)
person.name = '小强'
console.log(person.name)
