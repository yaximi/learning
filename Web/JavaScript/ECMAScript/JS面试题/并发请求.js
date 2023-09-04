/**
 * 并发请求
 * @param urls 待请求的 url 数组
 * @param maxNum 最大并发数
 */
function concurrentRequest(urls, maxNum) {
    return new Promise((resolve) => {
        const result = [];
        if (urls.length === 0) {
            resolve(result);
            return;
        }

        let index = 0; // 请求下标
        let count = 0; // 完成数量
        async function request() {
            if (index === urls.length) {
                return;
            }
            const i = index;
            const url = urls[index];
            index++;
            try {
                const res = await fetch(url);
                result[i] = res;
            } catch (e) {
                result[i] = e;
            } finally {
                count++;
                if (count === urls.length) {
                    resolve(result);
                }
                request();
            }
        }

        const times = Math.min(urls.length, maxNum);
        for (let i = 0; i < times; i++) {
            request();
        }
    })
}
