class Promise {
    constructor(executor) {
        this.PromiseState = 'pending'; // promise状态
        this.PromiseResult = undefined; // promise结果

        this._onResolvedCallbacks = []; // 存储成功状态响应函数
        this._onRejectedCallbacks = []; // 存储失败状态响应函数

        if (typeof executor !== 'function') { // 实例化Promise时，需要传递一个参数，这个参数必须是一个函数，否则报错
            throw new TypeError(`Promise resolver ${executor} is not a function`);
        }

        const resolve = (value) => { // 成功函数
            if (this.PromiseState !== 'pending') return; // 一旦promise状态发生了改变，将不能再次修改
            this.PromiseState = 'fulfilled'; // 将promise状态从等待态（pending）改为成功态（fulfilled）
            this.PromiseResult = value; // 将成功的值保存到promise结果中
            this._onResolvedCallbacks.forEach(fn => { fn() });
        };

        const reject = (reason) => { // 失败函数
            if (this.PromiseState !== 'pending') return; // 一旦promise的状态发生了改变，将不能再次修改
            this.PromiseState = 'rejected'; // 将promise状态从等待态（pending）改为失败态（rejected）
            this.PromiseResult = reason; // 将失败的原因保存到promise结果中
            this._onRejectedCallbacks.forEach(fn => { fn() });
        };

        /**
         * 1、executor执行器函数，接收两个参数（resolve，reject），这两个参数也都是函数
         * 2、executor执行器函数，在实例化Promise时，会立即执行
         * 3、executor执行器函数，在执行时可能会发生错误，需要使用try...catch语句包裹并抛出错误
         */
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onResolved, onRejected) {
        if (typeof onResolved !== 'function') { // 实现终值穿透
            onResolved = value => value
        }
        if (typeof onRejected !== 'function') { // 实现异常穿透
            onRejected = reason => { throw reason }
        }

        return new Promise((resolve, reject) => {
            const callback = (fn) => {
                setTimeout(() => {
                    try {
                        const result = fn(this.PromiseResult);
                        if (result instanceof Promise) {
                            result.then(v => {
                                resolve(v);
                            }, r => {
                                reject(r);
                            })
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e);
                    }
                })
            };

            if (this.PromiseState === 'fulfilled') {
                callback(onResolved);
            }
            if (this.PromiseState === 'rejected') {
                callback(onRejected);
            }
            if (this.PromiseState === 'pending') {
                this._onResolvedCallbacks.push(() => {
                    callback(onResolved);
                });
                this._onRejectedCallbacks.push(() => {
                    callback(onRejected);
                });
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        return this.then(onFinally, onFinally);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                })
            } else {
                resolve(value);
            }
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let count = 0;
            const result = [];
            promises.forEach((promise, index) => {
                promise.then(v => {
                    count++;
                    result[index] = v;
                    if (count >= promises.length) {
                        resolve(result);
                    }
                }, r => {
                    reject(r);
                })
            })
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                });
            })
        })
    }
}

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;
