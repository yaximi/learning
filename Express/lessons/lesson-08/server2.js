/**
 * express 如何给向客户端发送的 cookie 添加签名（类似加密）？
 *
 * 1、req.secret = '签名字符串'
 *
 * 2、res.cookie(name, value, {
 *     signed: true
 * })
 */

const express = require('express');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use('/', (req, res) => {
    req.secret = 'q1w2e3r4t5y6u7i8o9p0';
    res.cookie('username', 'xiaoming', {
        signed: true
    });
    res.end();
});