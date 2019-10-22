/**
 * 使用express.static处理静态资源请求
 */

const express = require('express');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use(express.static('./www'));