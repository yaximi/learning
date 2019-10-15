/**
 * fs.readFile(path[, options], callback);
 */

const fs = require('fs');

fs.readFile('./www/index.html', (err, data) => {
    if (err) {
        console.log('读取失败-error：' + err);
    } else {
        console.log(data.toString());
    }
})