/**
 * 1、response.write()、response.end()返回的字符串数据包含中文时会出现乱码，需要设置响应头
 *
 * 2、响应头增删改查的方法：
 *  增/改：
 *      response.setHeader(name, value)
 *          name <string>
 *          value <any>
 *      为隐式响应头设置单个响应头的值，如果此响应头已存在于待发送的响应头中，则其值将被替换
 *      在这里可以使用字符串数组来发送具有相同名称的多个响应头，例：
 *          response.setHeader('Content-Type', 'text/plain;charset=utf-8')
 *          response.setHeader('Set-Cookie', ['isVisit=1', 'isVIP=0', 'userCode=000000', 'nickname=小明'])
 *      当使用response.setHeader()设置响应头时，它们将与response.writeHead()中设置的响应头合并，但response.writeHead()中设置的响应头优先级更高
 *
 *      response.writeHead(statusCode[, statusMessage][, headers])
 *          statusCode <number>
 *          statusMessage <string>
 *          headers <Object>
 *          返回值：<http.ServerResponse>
 *      向请求发送响应头，此方法只能调用一次，且只能在response.write()、response.end()之前调用
 *      如果在调用response.write()、response.end()之前未调用response.writeHead()，则将计算隐式或可变的响应头并调用此函数
 *
 *  删：
 *      response.removeHeader(name)
 *  查：
 *      response.getHeader(name)
 *      response.getHeaderNames()
 *      response.getHeaders()
 *      response.hasHeader(name)
 */

const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    // res.writeHead(200, {
    //     'Content-Type': 'text/plain;charset=utf-8'
    // });
    res.write('中文会出现乱码，');
    res.end('需要设置响应头');
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});