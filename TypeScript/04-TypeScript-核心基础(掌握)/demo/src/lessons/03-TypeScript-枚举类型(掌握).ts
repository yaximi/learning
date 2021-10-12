export {};

// 枚举类型(enum)是TS为JS扩展的一种类型，在原生JS中是没有枚举类型的
// 枚举类型用于表示固定的几个取值
// 例如：一年只有四季，性别只有男女

// 注意点：TS中的枚举类型的取值，默认是从上至下从0开始递增的，虽然默认是从0开始递增的，但是我们也可以手动的指定枚举的取值的值
enum Gender {
    Male,
    Female
}
console.log(Gender.Male); // 0
console.log(Gender.Female); // 1
console.log(Gender[0]); // 'Male'
console.log(Gender[1]); // 'Female'

let val1:Gender;

// 注意点：TS中的枚举类型底层实现的本质其实就是数值类型，所以赋值一个数值不会报错
val1 = 666;
console.log(val1); // 666

val1 = Gender.Male;
console.log(val1); // 0

let val2:number = Gender.Male;
console.log(val2); // 0

let val3:string = Gender[0];
console.log(val3); // 'Male'

// 注意点：如果手动指定了前面枚举值的取值(数值)，那么后面枚举值的取值会根据前面的值来递增
enum Gender1 {
    Male = 10,
    Female
}
console.log(Gender1.Male); // 10
console.log(Gender1.Female); // 11
console.log(Gender1[10]); // 'Male'
console.log(Gender1[11]); // 'Female'

// 注意点：如果手动指定了后面枚举值的取值，那么前面枚举值的取值不会受到影响
enum Gender2 {
    Male,
    Female = 11
}
console.log(Gender2.Male); // 0
console.log(Gender2.Female); // 11
console.log(Gender2[0]); // 'Male'
console.log(Gender2[11]); // 'Female'

// 注意点：如果手动指定了前面枚举值的取值(字符串)，那么后面枚举值的取值也需要手动指定
enum Gender3 {
    Male = 'Male',
    Female = 0
}
console.log(Gender3.Male); // 'Male'
console.log(Gender3.Female); // 0
console.log(Gender3['Male']); // 'Male'
console.log(Gender3[0]); // 'Female'

// 注意点：如果手动指定了后面枚举值的取值(字符串)，那么前面枚举值的取值不会受到影响
enum Gender5 {
    Male,
    Female = 'Female'
}
console.log(Gender5.Male); // 0
console.log(Gender5.Female); // 'Female'
console.log(Gender5[0]); // 'Male'
console.log(Gender5['Female']); // 'Female'

// 例子
enum Seasons {
    Spring,
    Summer = 'Summer',
    Autumn = 2,
    Winter
}
console.log(Seasons.Spring); // 0
console.log(Seasons.Summer); // 'Summer'
console.log(Seasons.Autumn); // 2
console.log(Seasons.Winter); // 3
