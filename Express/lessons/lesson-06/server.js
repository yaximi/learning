/**
 * 通过next()实现链式操作
 */

const express = require('express');
const server = express();

server.use('/', (req, res, next) => {
    req.a = 10;
    next();
});

server.use('/user', (req, res) => {
   console.info('a = ', req.a);
   res.end();
});

server.listen(8080, () => {
    console.log('http://localhost:8080/user');
});