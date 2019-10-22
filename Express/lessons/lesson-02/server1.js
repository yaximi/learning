/**
 * 使用express-static中间件处理静态资源请求：express.use(expressStatic('./www'))
 */

const express = require('express');
const expressStatic = require('express-static');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.use(expressStatic('./www'));