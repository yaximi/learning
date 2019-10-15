/**
 * express获取post请求参数：
 * 1、使用body-parser中间件：server.use(bodyParser.urlencoded({}))
 * 2、通过req.body获取post请求参数
 */

const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({
    extended: false,    // 是否开启扩展模式
    limit: 2*1024*1024  // 2M
}));

server.use('/', (req, res) => {
    console.info('post请求参数：', req.body);
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});