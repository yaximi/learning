/**
 * Cookie
 * 1、HTTP是一个无状态的协议，无法区分用户之间的身份，因此提出来Cookie方案
 * 2、Cookie的处理分为如下几步：
 *  服务器向客户端发送Cookie
 *  浏览器将Cookie保存
 *  之后每一次请求浏览器都会将Cookie发向服务器
 * 3、HTTP_Parser会将所有的报文字段解析到req.headers上，服务端通过req.headers.cookie接收Cookie
 * 4、Cookie的格式是 key1=value1;key2=value2 形式的，需要解析
 * 5、服务端通过res.setHeader('Set-Cookie', 'key=value; path=xxx; Expires=xxx; Domain=xxx')设置或修改Cookie
 */

const http = require('http');
const server = http.createServer();
const { cookieParser, serialize } = require('./common/utils');

server.on('request', (req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }
    let cookie = req.headers.cookie;
    req.cookies = cookieParser(cookie);
    if (!req.cookies.isVisit) {
        res.setHeader('Set-Cookie', [serialize('isVisit', '1'), serialize('isLogin', '0'), serialize('isVIP', '0', { httpOnly: true })]);
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.writeHead(200);
        res.end('欢迎第一次来动物园');
    } else {
        console.log(req.cookies);
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8',
        });
        res.end('动物园再次欢迎你');
    }
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});