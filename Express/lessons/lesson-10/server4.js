/**
 * express设置模板引擎
 *
 * 1、server.set('view engine', 'html');
 *
 * 2、server.set('views', './template');
 *
 * 3、server.engine('html', ejs.__express);
 */

const express = require('express');
const ejs = require('ejs');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

server.set('view engine', 'html');
server.set('views', './template');
server.engine('html', ejs.__express);

server.use('/', (req, res) => {
    res.render('index2.ejs', {
        showTitle: true,
        title: '111',
        content: '<div>222</div>'
    });
});