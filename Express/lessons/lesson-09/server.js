const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const server = express();

const keys = [];
for(let i = 0; i <10000; i++) {
    keys.push('sig_' + Math.random())
}

server.use(cookieParser());
server.use(cookieSession({
    name: 'session_id',
    keys,
    maxAge: 20*60*1000
}));

server.use('/', (req, res) => {
    if (!req.session['count']) {
        req.session['count'] = 1;
    } else {
        req.session['count']++;
    }
    console.log(req.session['count']);
    res.end();
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});