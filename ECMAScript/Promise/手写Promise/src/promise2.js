function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        reject(new TypeError('Chaining cycle detected for promise'));
    } else if (x instanceof Promise) {
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject);
        }, r => {
            reject(r);
        })
    } else if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        let called = false;
        try {
            const then = x.then;
            if (typeof then === 'function') {
                // then.call(x, resolvePromise, rejectPromise)
                then.call(x, y  => {
                    // 成功和失败只能调一个
                    if (called) return;
                    called = true;
                    // 成功则进一步解析（递归调用）
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    // 成功和失败只能调一个
                    if (called) return;
                    called = true;
                    // 失败直接reject据因
                    reject(r);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            // 如果resolvePromise或rejectPromise被调用了，则忽略这里的报错
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function`);
        }

        const resolve = (value) => {
            if (this.state !== 'pending') return;
            this.state = 'fulfilled';
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn => { fn() });
        };

        const reject = (reason) => {
            if (this.state !== 'pending') return;
            this.state = 'rejected';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => { fn() });
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (this.state === 'pending') {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        });
        return promise2;
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
