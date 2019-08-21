/**
 * 解析cookie
 * @param cookie
 */
const cookieParser = (cookie) => {
    let cookies = {};
    if (!cookie) {
        return cookies;
    }
    let list = cookie.split(';');
    list.forEach(item => {
        let pair = item.split('=');
        cookies[pair[0].trim()] = pair[1];
    });
    return cookies;
};

/**
 * 连续cookie字段
 * @param key
 * @param val
 * @param opt
 * @returns {string}
 */
const serialize = (key, val, opt) => {
    let cookies = [`${key}=${val}`];
    opt = opt || {};

    if (opt.path) {
        cookies.push(`Path=${opt.path}`);
    }
    if (opt.maxAge) {
        cookies.push(`Max-Age=${opt.maxAge}`);
    }
    if (opt.expires) {
        cookies.push(`Expires=${opt.expires.toUTCString()}`);
    }
    if (opt.domain) {
        cookies.push(`Domain=${opt.domain}`);
    }
    if (opt.httpOnly) {
        cookies.push(`HttpOnly`);
    }
    if (opt.secure) {
        cookies.push(`Secure`);
    }

    return cookies.join('; ');
};

module.exports = {
    cookieParser,
    serialize
};