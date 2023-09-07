/**
 * 手写 Promise.all
 * @param promises
 * @returns {Promise<unknown>}
 */
Promise.myAll = function (promises) {
    let _resolve, _reject;
    const promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });

    const result = [];

    let index = 0;
    let count = 0;
    let resolvedCount = 0;
    for (let p of promises) {
        const i = index;
        index++;
        count++;

        Promise.resolve(p)
            .then(res => {
                result[i] = res;
                resolvedCount++;
                if (resolvedCount === count) {
                    _resolve(result);
                }
            }, _reject)
    }
    if (count === 0) {
        _resolve(result);
    }

    return promise;
};

Promise.myAll([1, 2, 3, Promise.reject(4)])
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
