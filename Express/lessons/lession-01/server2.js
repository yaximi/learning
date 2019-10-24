/**
 * use([path,]function[,function...])
 * 1、use方法是挂载中间件方法到指定的路径上，如果路径未指定，默认为'/'
 * 2、在一个路径上挂载一个中间件之后，每当请求路径的前缀部分匹配了这个路劲，那么这个中间件就会被执行
 * 3、由于默认的路径为'/'，中间件挂载没有指定路径时，那么对于每一个请求，这个中间件都会被执行
 * 4、中间件方法是顺序处理的，所以中间件包含的顺序很重要
 */

const express = require('express');
const server = express();

// server.use('/', (req, res, next) => {
//     res.write('111');
//     next();
// });

// use([path,]function[,function...])
// path未指定默认为'/'，所以可以省略
server.use((req, res, next) => {
    res.write('111');
    next();
});

// 在一个路径上挂载一个中间件之后，每当请求路径的前缀部分匹配了这个路劲，那么这个中间件就会被执行
// 由于默认的路径为'/'，中间件挂载没有指定路径，那么对于每一个请求，这个中间件都会被执行
// 所以在请求'http://localhost:8080/user'时，会先输出出'111'，再输出'222'
server.get('/user', (req, res) => {
    res.end('222');
});

server.listen(8080, () => {
    console.log('http://localhost:8080/user');
});