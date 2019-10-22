/**
 * 使用ejs模板引擎编译.ejs文件
 */

const ejs = require('ejs');

ejs.renderFile('./template/index1.ejs', {
    name: '小明'
}, (err, data) => {
    if (err) {
        console.info('出错了：', err);
    } else {
        console.info('成功了：', data)
    }
});