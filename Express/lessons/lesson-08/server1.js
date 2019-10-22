/**
 * express 如何向客户端发送 cookie ?
 *
 * 1、res.cookie(name, value, params)
 */

const express = require('express');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use('/', (req, res) => {
    res.cookie('username', 'xiaoming');
    res.end();
});