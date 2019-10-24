/**
 * 使用express托管静态资源：express.static(root)
 */

const express = require('express');
const server = express();

// server.use(express.static('./www', {
//     index: 'index.html'  // 默认为'index.html'
// }));

server.use(express.static('./www'));

server.listen(8080, () => {
    console.log('http://localhost:8080');
});