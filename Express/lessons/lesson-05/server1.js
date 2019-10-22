/**
 * express接收post文件上传：
 *
 * 1、引入multer中间件
 *      const multer = require('multer');
 *
 * 2、执行multer函数，传入保存上传文件的目录，并返回一个对象
 *      const obj = multer({
 *          dest: './www/upload'
 *      });
 *
 * 3、use返回对象中的方法，如：any()
 *      server.use(obj.any());
 *
 * 4、通过req.files获取上传的文件数组
 *      server.use('/', (req, res) => { const files = req.files; })
 */

const express = require('express');
const multer = require('multer');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

const multerObj = multer({
    dest: './www/upload'
});
server.use(multerObj.any());
server.use('/', (req, res) => {
    console.info('files：', req.files);
});