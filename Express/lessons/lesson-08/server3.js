/**
 * express 如何接收的 cookie ?
 *
 * 1、使用 cookie-parser 中间件：
 *      server.use(cookieParser())
 *
 * 2、req.cookies 接收 cookie
 */

const express = require('express');
const cookieParser = require('cookie-parser');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use(cookieParser());

server.use('/', (req, res) => {
    console.info('cookie:', req.cookies);
    res.end();
});