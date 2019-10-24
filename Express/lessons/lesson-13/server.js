const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const mysql = require('mysql');
const server = express();
const { formatDate } = require('./www/js/utils');

// 创建数据库连接池
const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog'
});

// 托管静态资源
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
for(let i = 0; i < 10000; i++) {
    keys.push('sig_' + Math.random());
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

// 接收请求
server.get('/', (req, res, next) => {
    db.query('SELECT * FROM `banner_table`;', (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        res.banners = data;
        next();
    });
});
server.get('/', (req, res, next) => {
    db.query('SELECT `ID`,`title`,`abstract` FROM `article_table`;', (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        res.articles = data;
        next();
    });
});
server.get('/', (req, res) => {
    res.render('index.ejs', {
        banners: res.banners,
        articles: res.articles
    });
});

server.get('/article', (req, res) => {
    if (!req.query.id) {
        res.sendStatus(404);
    }
    if (req.query.act === 'like') {
        db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, (err, data) => {
            if (err) {
                res.sendStatus(500);
            }
            db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
                if (err) {
                    res.sendStatus(500);
                }
                if (data.length === 0) {
                    res.sendStatus(404);
                }
                let article = data[0];
                article.formatDate = formatDate(article.release_time);
                article.content = article.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                res.render('article.ejs', {
                    article
                });
            })
        })
    } else {
        db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
            if (err) {
                res.sendStatus(500);
            }
            if (data.length === 0) {
                res.sendStatus(404);
            }
            let article = data[0];
            article.formatDate = formatDate(article.release_time);
            article.content = article.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
            res.render('article.ejs', {
                article
            });
        });
    }
});

// 监听8080端口
server.listen(8080, () => {
    console.log('http://localhost:8080');
});