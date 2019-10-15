/**
 * req.url 会返回求情路劲与'/favicon.ico'
 * 注意：返回的路径都是以'/'开头的
 */

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);   // 返回'/'与'/favicon.ico'
    if (req.url === '/favicon.ico') {
        return;
    }
    res.end();
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});
