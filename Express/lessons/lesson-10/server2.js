/**
 * ejs的三种写法：
 * 1、<% 逻辑代码 %>
 * 2、<%= 转义输出 %>
 * 3、<%- 非转义输出 %>
 */

const ejs = require('ejs');

ejs.renderFile('./template/index2.ejs', {
    showTitle: true,
    title: '111',
    content: '<div>222</div>'
}, (err, data) => {
    if (err) {
        console.info('出错了：', err);
    } else {
        console.info('成功了：', data)
    }
});