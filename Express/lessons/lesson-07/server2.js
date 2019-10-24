/**
 * 通过原生方法封装一个获取post请求参数的中间件-my-body-parser
 */

const express = require('express');
const myBodyParser = require('./libs/my-body-parser');
const server = express();

server.use(express.static('./www'));

server.use(myBodyParser.urlencoded());

server.post('/', (req, res) => {
    console.info('post请求参数：', req.body);
    res.end();
});

server.listen(8080, () => {
    console.log('http://localhost:8080/form-post.html');
});