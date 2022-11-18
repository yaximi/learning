import { Observer } from "./Observer";

export function observe(value) {
    if (!value || typeof value !== 'object') return;

    if (typeof value.__ob__ === 'undefined') {
        new Observer(value);
    }
    return value.__ob__;
}