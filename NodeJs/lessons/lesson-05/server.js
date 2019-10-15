/**
 * fs（file system）模块-文件系统模块
 */

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('./www' + req.url, (err, data) => {
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        }
        res.end();
    })
}).listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
})