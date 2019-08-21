const http = require('http');
const server = http.createServer();
const { cookieParser, serialize  } = require('./common/utils');

let sessions = {}; // 存放在服务器的session数据，通常保存在数据库中
const SESSION_ID = 'session_id'; // 约定的口令key
const EXPIRES = 20 * 60 * 1000; // session过期时间，通常设置20分钟

/**
 * 生成session，并保存到sessions中
 */
const generate = () => {
    let session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expires: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session
};

server.on('request', (req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    // 解析cookie
    let cookie = req.headers.cookie;
    req.cookies = cookieParser(cookie);

    // if (!req.cookies.isVisit) {
    //     res.setHeader('Set-Cookie', serialize('isVisit', '1'));
    //     res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    //     res.write(200);
    //     res.end('欢迎第一次来动物园');
    // } else {
    //     res.writeHead(200, {
    //         'Content-Type': 'text/plain;charset=utf-8'
    //     });
    //     res.end('动物园再次欢迎你');
    // }

    let id = req.cookies[SESSION_ID]; // 获取保存在Cookie中的session_id
    if (!id) {
        // Cookie中没有session_id，则生成一个session
        req.session = generate();
    } else {
        let session = sessions[id];
        if (session) {
            if (session.cookie.expires > (new Date()).getTime()) {
                // 更新过期时间
                session.cookie.expires = (new Date()).getTime() + EXPIRES;
                req.session = session
            } else {
                // 超时了
                delete sessions[id];
                req.session = generate();
            }
        } else {
            // session过期或口令不对，重新生成session
            req.session = generate();
        }
    }

    let writeHead = res.writeHead;
    res.writeHead = () => {
        let cookies = res.getHeader('Set-Cookie');
        let session = serialize(SESSION_ID, req.session.id);
        cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
        res.setHeader('Set-Cookie', cookies);
        return writeHead.apply(this, arguments);
    };

    if (!req.session.isVisit) {
        req.session.isVisit = '1';
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.end('欢迎第一次来动物园');
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.end('动物园再次欢迎你');
    }
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080')
});