/**
 * 如何创建一个http服务：
 *
 * 1、引入http模块
 *      const http = require('http');
 *
 * 2、创建http服务
 *      const server = http.createServer((request, response) => {});
 *
 * 3、监听端口
 *      server.listen(8080, () => {});
 */

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World!')
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});