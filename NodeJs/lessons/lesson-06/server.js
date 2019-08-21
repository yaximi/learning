/**
 * get/post请求、接口请求、文件请求
 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const queryString = require('querystring');

let users = {}; // 存储用户信息，服务关闭会清空数据。key-用户名，value-密码。

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/favicon.ico') {
        return false;
    }

    const oUrl = url.parse(req.url, true);
    let pathName = oUrl.pathname;

    // get请求参数
    let getParams = oUrl.query;
    console.info('get请求参数:', getParams);

    // post请求参数
    let str = '';
    let postParams = {};
    req.on('data', (data) => {
        str += data;
    });
    req.on('end', () => {
        postParams = queryString.parse(str);
        console.info('post请求参数:', postParams);

        if (pathName === '/user') {
            // 接口请求
            let params = req.method === 'GET' ? getParams : postParams;
            switch (params.act) {
                case 'register' :
                    // 1、查询用户是否存在
                    if (users[params.user]) {
                        res.write('{"ok": false, "msg": "用户名已存在"}');
                    } else {
                        // 2、向数据库插入数据（暂时使用users模拟）
                        users[params.user] = params.pwd;
                        res.write('{"ok": true, "msg": "注册成功"}');
                    }
                    break;
                case 'login' :
                    // 1、查询用户是否存在
                    if (!users[params.user]) {
                        res.write('{"ok": false, "msg": "该用户未注册"}');
                        // 2、验证用户名密码是否正确
                    } else if (params.pwd !== users[params.user]) {
                        res.write('{"ok": false, "msg": "用户名或密码错误"}');
                    } else {
                        res.write('{"ok": true, "msg": "登录成功"}');
                    }
                    break;
                default :
                    res.write('{"ok": false, "msg": "未知的act"}');
                    break;
            }
            res.end();
        } else {
            // 文件请求
            let publicPath = './www';
            fs.readFile(publicPath + pathName, (err, data) => {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
                res.end();
            })
        }
    });
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});