/**
 * fs.writeFile(file, data[, options], callback);
 * 注意：当file指定的文件不存在时，会新建file文件，并写入data数据
 */

const fs = require('fs');

fs.writeFile('./www/test.txt', 'Hello World!', (err) => {
    if (err) {
        console.log('写入失败-error：', err);
    } else {
        console.log('写入成功');
    }
})