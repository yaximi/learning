/**
 * express中使用原生方法获取post请求参数
 */

const express = require('express');
const querystring = require('querystring');
const server = express();

server.use(express.static('./www'));

server.use((req, res, next) => {
    let str = '';
    req.on('data', (data) => {
        str += data;
    });
    req.on('end', () => {
        req.body = querystring.parse(str);
        next();
    })
});

server.post('/', (req, res) => {
    console.info('post请求参数：', req.body);
    res.end();
});

server.listen(8080, () => {
    console.log('http://localhost:8080/form-post.html');
});