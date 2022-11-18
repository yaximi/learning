export const hasProto = '__proto__' in {};

export const isArray = Array.isArray;

export function def(target, key, value, enumerable = false) {
    Object.defineProperty(target, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}

export function parsePath(path) {
    const segments = path.split('.');

    return function (obj) {
        segments.forEach(segment => {
            if (!obj) return;
            obj = obj[segment];
        })
        return obj;
    }
}