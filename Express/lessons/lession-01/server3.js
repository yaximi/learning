/**
 * 1、nodejs原生属性与方法：
 *      res.statusCode
 *      res.statusMessage
 *      res.write()
 *      res.end()
 * 2、express新增方法：
 *      res.status()
 *      res.send()
 *      res.sendStatus()
 */

const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'ok';
    res.write('{error: "0", data: "111"}');
    res.end();
});

server.get('/index1', (req, res) => {
    res.statusCode = 200;
    res.end('{error: "0", data: "222"}');
});

server.get('/index2', (req, res) => {
    res.status(200).end('{error: "0", data: "333"}');
});

server.get('/index3', (req, res) => {
    res.status(200).send({
        error: "0",
        data: {}
    })
});

server.get('/index4', (req, res) => {
    res.status(200).send('ok');
});

server.get('/index5', (req, res) => {
    res.sendStatus(200);
});

server.listen(8080, () => {
    console.log('http://localhost:8080');
});