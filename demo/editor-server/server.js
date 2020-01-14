/**
 * 上传的文件没有扩展名，看不出是什么类型的文件
 * 通过fs.rename(oldPath, newPath, callback)方法将文件名改成带扩展名的形式
 */

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const server = express();

server.use(express.static('./www'));

const multerObj = multer({
    dest: './www/upload'
});
server.use(multerObj.any());

server.post('/upload', (req, res) => {
    const file = req.files[0];
    let oldPath = file.path;
    let newPath = oldPath + path.extname(file.originalname);
    fs.rename(oldPath, newPath, (err) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
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

server.listen(8888, () => {
    console.log('http://localhost:8888');
});