/**
 * express 如何接收有签名的 cookie ?
 *
 * 1、使用 cookie-parse 中间件时传入'签名字符串'
 *      server.use(cookieParser('签名字符串'))
 *
 * 2、req.signedCookies 接收有签名的 cookie
 */

const express = require('express');
const cookieParser = require('cookie-parser');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

const key = 'q1w2e3r4t5y6u7i8o9p0';
server.use(cookieParser(key));

server.use('/', (req, res) => {
    // 在使用cookie-parser中间件时传入签名字符串即可，此处可省略
    // req.secret = key;
    console.info('无签名的cookie:', req.cookies);
    console.info('有签名的cookie:', req.signedCookies);
    res.end();
});