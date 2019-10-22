/**
 * 如何使用express创建一个服务
 *
 * 1、引入express
 *      const express = require('express');
 *
 * 2、创建服务
 *      const server = express();
 *
 * 3、监听
 *      server.listen(8080, () => {});
 *
 * 4、接收请求
 *      server.get(url, (req, res) => {})
 *      server.post(url, (req, res) => {})
 *      server.use(url, (req, res) => {})
 */

const express = require('express');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use('/', (req, res) => {
    res.send({
        ok: true,
        message: ''
    });
});