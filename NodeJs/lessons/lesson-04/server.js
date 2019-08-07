/**
 * 获取post请求数据
 * 注意：如果post请求数据量很大时，会分段处理
 */

const http = require('http');
const queryString = require('querystring');

http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    let str = ''; // 存储post请求数据 ？不合理的方式
    let i = 1;  // 接收次数

    // data - 每一段post请求数据到达时都会触发（可能触发多次）
    req.on('data', (data) => {
        console.log(`第${i++}次接收数据`);
        str += data;
    });

    // end - post请求数据全部到达时触发（仅触发一次）
    req.on('end', () => {
        console.log(str);
        let POST = queryString.parse(str);
        console.log('post请求数据：', POST);

        res.end();
    });
}).listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
})