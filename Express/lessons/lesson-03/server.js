/**
 * express获取get请求参数：直接通过req.query获取get请求参数
 */

const express = require('express');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use('/', (req, res) => {
    console.log('get请求参数：', req.query);
});