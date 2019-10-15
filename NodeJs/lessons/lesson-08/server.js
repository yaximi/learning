/**
 * get/post请求、文件请求
 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    let str = '';
    req.on('data', (data) => {
        str += data
    });
    req.on('end', () => {
        let obj = url.parse(req.url, true);
        let pathname = obj.pathname;
        const GET = obj.query;
        const POST = queryString.parse(str);
        console.info(pathname, GET, POST);

        if (pathname === '/') {
            pathname = '/index.html'
        }
        fs.readFile('./www' + pathname, (err, data) => {
            if (err) {
                res.write('404')
            } else {
                res.write(data)
            }
            res.end()
        })

    });
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});