/**
 * express获取get请求参数：通过req.query直接获取get请求参数
 */

const express = require('express');
const server = express();

server.use(express.static('./www'));

server.get('/', (req, res) => {
    console.log('get请求参数：', req.query);
    res.end();
});

server.listen(8080, () => {
    console.log('http://localhost:8080/form-get.html');
});