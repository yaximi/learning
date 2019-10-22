const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const fs = require('fs');
const path = require('path');

const server = express();
server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});

// static数据
server.use(express.static('./www'));

// 解析post请求参数
server.use(bodyParser.urlencoded({
    extended: false
}));

// 解析post文件上传
const multerObj = multer({
    dest: './www/upload'
});
server.use(multerObj.any());

// 解析cookie
server.use(cookieParser('q1w2e3r4t5y6u7i8o9p0'));

// 解析session
const keys = [];
for (let i = 0; i < 10000; i++) {
    keys.push('sig_' + Math.random())
}
server.use(cookieSession({
    name: 'session_id',
    keys,
    maxAge: 20*60*1000
}));

// 设置模板引擎
server.set('view engine', 'html');
server.set('views', './views');
server.engine('html', consolidate.ejs);

// 接受请求
server.use('/', (req, res) => {
    console.info('get请求参数：', req.query);
    console.info('post请求参数：', req.body);
    console.info('post文件上传：', req.files);
    console.info('无签名cookie：', req.cookies);
    console.info('签名cookie：', req.signedCookies);
    console.info('session：', req.session);

    // 上传文件加扩展名
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
        })
    }

    // 渲染ejs模板
    res.render('index.ejs', {
        name: '小明'
    })
});