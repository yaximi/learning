/**
 * 1、初始化一个自动打包的webpack项目
 * 2、通过 tsc --init 初始化TypeScript配置文件
 * 3、通过 npm install typescript ts-loader --save-dev 安装对应的loader
 * 4、修改webpack配置文件:
 * "entry": {
 *     "main":  "./src/main.ts"
 * },
 * "resolve": {
 *     extensions: [".tsx", ".ts", ".js"]
 * },
 * "rules": [
 *     // ts编译配置
 *     {
 *         test: /\.tsx?$/,
 *         use: "ts-loader",
 *         exclude: /node_modules/
 *     }
 * ]
 */

let val:string = 'Hello TypeScript!';
console.log(val);
