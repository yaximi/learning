/**
 * 获取get请求数据
 * 注意：get请求数据量较小，最大只有32k
 */

const http = require('http');
const url = require('url');
const queryString = require('querystring');

http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    // console.log(req.url);
    // console.log(req.url.split('?')[1]);
    // console.log(queryString.parse(req.url.split('?')[1]));
    //
    // console.log(url.parse(req.url));
    // console.log(url.parse(req.url).query);
    // console.log(url.parse(req.url, true).query);

    let GET = url.parse(req.url, true).query;
    console.log('get请求数据：', GET);

    res.end();
}).listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});