import { h } from './mySnabbdom/src/h'

const myVnode1 = h('div', '文字');
console.log(myVnode1);

const myVnode2 = h('ul', [
    h('li', '111'),
    h('li', '222'),
    h('li', '333')
]);
console.log(myVnode2);

const myVnode3 = h('ul', h('li', {}, '111'));
console.log(myVnode3);
