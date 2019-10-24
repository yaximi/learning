/**
 * express配合ejs模板引擎渲染.ejs文件
 */

const express = require('express');
const ejs = require('ejs');
const server = express();

server.use('/', (req, res) => {
    ejs.renderFile('./views/index2.ejs', {
        showTitle: true,
        title: '111',
        content: '<div>222</div>'
    }, (err, data) => {
        if (err) {
            console.info('出错了：', err);
            res.end();
        } else {
            console.info('成功了：', data);
            res.send(data);
        }
    });
});

server.listen(8080, () => {
    console.log('http://localhost:8080');
});