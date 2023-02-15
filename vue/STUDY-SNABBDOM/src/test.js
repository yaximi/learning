import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
]);

const container = document.getElementById("container");

const vNode = h('ul', [
    h('li'),
    h('li', {}),

    h('li', '111'),
    h('li', {}, '111'),

    h('li', h('span', '222')),
    h('li', {}, h('span', '222')),

    h('li', [h('span', '333')]),
    h('li', {}, [h('span', '333')])
])

patch(container, vNode);