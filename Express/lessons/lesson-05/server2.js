/**
 * 上传的文件没有扩展名，看不出是什么类型的文件
 * 通过fs.rename(oldPath, newPath, callback)方法将文件名改成带扩展名的形式
 */

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

const multerObj = multer({
    dest: './www/upload'
});
server.use(multerObj.any());
server.use('/', (req, res) => {
    const files = req.files || [];
    if (files.length > 0) {
        files.forEach(file => {
            let oldPath = file.path;
            let newPath = oldPath + path.extname(file.originalname);
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.info('重命名失败：', err);
                } else {
                    console.info('重命名成功');
                }
            })
        });
    }
});