/**
 * 使用consolidate统一管理模板引擎
 */

const express = require('express');
const consolidate = require('consolidate');

const server = express();
server.listen(8080, () => {
   console.log('Application is running at http://localhost:8080');
});

server.set('view engine', 'html');
server.set('views', './template');
server.engine('html', consolidate.ejs);

server.use('/', (req, res) => {
    res.render('index2.ejs', {
        showTitle: true,
        title: '111',
        content: '<div>222</div>'
    })
});

