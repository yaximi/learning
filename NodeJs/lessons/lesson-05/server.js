const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    // get请求数据
    const obj = url.parse(req.url, true);
    const GET = obj.query;

    // post请求数据
    let str = '';
    req.on('data', (data) => {
        str += data
    });
    req.on('end', () => {
        const POST = queryString.parse(str);

        console.info(GET, POST);
    });

    // 文件请求
    fs.readFile('./www' + obj.pathname, (err, data) => {
        if (err) {
            res.write('404')
        } else {
            res.write(data)
        }
        res.end()
    })

});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});