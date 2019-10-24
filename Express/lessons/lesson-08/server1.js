/**
 * express 如何向客户端发送 cookie：res.cookie(name, value, params)
 */

const express = require('express');
const server = express();

server.use('/', (req, res) => {
    res.cookie('username', 'xiaoming');
    res.end();
});

server.listen(8080, () => {
    console.log('http://localhost:8080');
});