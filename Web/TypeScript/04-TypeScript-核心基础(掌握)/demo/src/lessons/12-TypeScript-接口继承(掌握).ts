export {};

// 接口继承
interface LengthInterface {
    length: number;
}
interface WidthInterface {
    width: number;
}
interface HeightInterface {
    height: number;
}
interface RectInterface extends LengthInterface, WidthInterface, HeightInterface {
    color: string;
}
const rect: RectInterface = {
    length: 10,
    width: 20,
    height: 30,
    color: 'red'
};
console.log(rect);
