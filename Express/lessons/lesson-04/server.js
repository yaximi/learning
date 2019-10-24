/**
 * express获取post请求参数：
 *
 * 1、使用body-parser中间件：
 *  server.use(bodyParser.urlencoded({
 *      extended: false,    // 是否开启扩展模式
 *      limit: 2*1024*1024  // 2M
 *  }))
 *
 * 2、通过req.body获取post请求参数
 */

const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(express.static('./www'));

server.use(bodyParser.urlencoded({
    extended: false,
    limit: 2*1024*1024
}));

server.post('/', (req, res) => {
    console.info('post请求参数：', req.body);
    res.end();
});

server.listen(8080, () => {
    console.log('http://localhost:8080/form-post.html');
});