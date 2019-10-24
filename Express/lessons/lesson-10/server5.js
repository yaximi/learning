/**
 * 使用consolidate统一管理模板引擎
 */

const express = require('express');
const consolidate = require('consolidate');
const server = express();

server.set('view engine', 'html');
server.set('views', './views');
server.engine('html', consolidate.ejs);

server.use('/', (req, res) => {
    res.render('index2.ejs', {
        showTitle: true,
        title: '111',
        content: '<div>222</div>'
    })
});

server.listen(8080, () => {
    console.log('http://localhost:8080');
});