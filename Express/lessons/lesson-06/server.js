/**
 * 通过next()实现链式操作
 */

const express = require('express');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use('/', (req, res, next) => {
    req.a = 10;
    next();
});

server.use('/', (req, res) => {
   console.log(req.a);
});