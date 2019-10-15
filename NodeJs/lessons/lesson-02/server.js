/**
 * 1、response.write(data[, encoding][, callback])
 *      data <string>|<Buffer>
 *      encoding <string>默认值：'utf8'
 *      callback <Function>
 *      返回值：<boolean>
 *
 * 2、response.end([data[, encoding]][, callback])
 *      data <string>|<Buffer>
 *      encoding <string>
 *      callback <Function>
 *      返回值：<this>
 *
 * 3、注意：response.write()、response.end()参数的数据类型只能是字符串或Buffer，返回其他类型的值会报错
 */

const http = require('http');

const server = http.createServer((req, res) => {
    res.write('200');
    res.write('{"ok": true, "msg": ""}');
    res.end('response success');
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});
