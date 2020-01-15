/**
 * 上传的文件没有扩展名，看不出是什么类型的文件
 * 通过fs.rename(oldPath, newPath, callback)方法将文件名改成带扩展名的形式
 */

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const server = express();

server.use(express.static('./www'));

server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(multer({
    dest: './www/upload'
}).any());

server.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

server.post('/upload', (req, res) => {
    const file = req.files[0];
    let oldPath = file.path;
    let newPath = oldPath + path.extname(file.originalname);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            res.json({
                error: '1',
                message: 'rename error',
                data: {}
            })
        } else {
            res.json({
                error: '0',
                message: '',
                data: {
                    url: `http://10.176.168.77:8888/upload/${path.parse(newPath).base}`
                }
            })
        }
    })
});

server.post('/submit', (req, res) => {
    console.info('post请求参数：', req.body);
    res.json({
        error: '0',
        message: '',
        data: {}
    })
})

server.listen(8888, () => {
    console.log('http://localhost:8888');
});