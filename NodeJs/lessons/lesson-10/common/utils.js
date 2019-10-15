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
    let pairs = [`${key}=${val}`];
    opt = opt || {};

    if (opt.path) {
        pairs.push(`Path=${opt.path}`);
    }
    if (opt.maxAge) {
        pairs.push(`Max-Age=${opt.maxAge}`);
    }
    if (opt.expires) {
        pairs.push(`Expires=${opt.expires.toUTCString()}`);
    }
    if (opt.domain) {
        pairs.push(`Domain=${opt.domain}`);
    }
    if (opt.httpOnly) {
        pairs.push(`HttpOnly`);
    }
    if (opt.secure) {
        pairs.push(`Secure`);
    }

    return pairs.join('; ');
}

module.exports = {
    cookieParser,
    serialize
};