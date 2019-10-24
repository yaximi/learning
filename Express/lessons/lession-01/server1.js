/**
 * 如何使用express创建一个服务
 *
 * 1、引入express
 *      const express = require('express');
 *
 * 2、创建服务
 *      const server = express();
 *
 * 3、监听端口
 *      server.listen(8080, () => {});
 *
 * 4、处理请求
 *      server.get('/', (req, res) => {});
 */

const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.sendStatus(200)
});

server.listen(8080, () => {
    console.log('http://localhost:8080');
});