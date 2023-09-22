/**
 * 发出请求，返回 Promise
 * @param url 请求地址
 * @param maxCount 最大重试次数
 * @returns {Promise<T>}
 */
function request(url, maxCount = 5) {
    return fetch(url).catch(err => {
        maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1)
    })
}
