// 参数归一化
function _formatterNormalize(formatter) {
    if (typeof formatter === 'function') {
        return formatter;
    }
    if (typeof formatter !== 'string') {
        throw new TypeError('formatter must be a string');
    }
    if (formatter === 'date') {
        formatter = 'yyyy-MM-dd';
    }
    if (formatter === 'datetime') {
        formatter = 'yyyy-MM-dd HH:mm:ss';
    }
    const formatterFunction = (dateInfo) => {
        const {
            yyyy,
            MM,
            dd,
            HH,
            mm,
            ss,
            ms
        } = dateInfo;
        return formatter
            .replace('yyyy', yyyy)
            .replace('MM', MM)
            .replace('dd', dd)
            .replace('HH', HH)
            .replace('mm', mm)
            .replace('ss', ss)
            .replace('ms', ms);
    };
    return formatterFunction;
}

function format(date, formatter, isPad = false) {
    formatter = _formatterNormalize(formatter);

    const dateInfo = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        miniSecond: date.getMilliseconds()
    };
    dateInfo.yyyy = dateInfo.year.toString();
    dateInfo.MM = dateInfo.month.toString();
    dateInfo.dd = dateInfo.date.toString();
    dateInfo.HH = dateInfo.hour.toString();
    dateInfo.mm = dateInfo.minute.toString();
    dateInfo.ss = dateInfo.second.toString();
    dateInfo.ms = dateInfo.miniSecond.toString();

    function _pad(prop, len) {
        dateInfo[prop] = dateInfo[prop].padStart(len, '0');
    }

    if (isPad) {
        _pad('yyyy', 4);
        _pad('MM', 2);
        _pad('dd', 2);
        _pad('HH', 2);
        _pad('mm', 2);
        _pad('ss', 2);
        _pad('ms', 2);
    }

    const result = formatter(dateInfo);
    return result;
}

// 2023-6-8
console.log(format(new Date(), 'date'));

// 2023-06-08
console.log(format(new Date(), 'date', true));

// 2023-6-8 8:5:5
console.log(format(new Date(), 'datetime'));

// 2023-06-08 08:05:05
console.log(format(new Date(), 'datetime', true));

// 2023年6月8日 8:5:5.100
console.log(format(new Date(), 'yyyy年MM月dd日 HH:mm:ss.ms'));

// 2023年06月08日 08:05:05.100
console.log(format(new Date(), 'yyyy年MM月dd日 HH:mm:ss.ms', true));

console.log(format(new Date('2022/1/1'), (dateInfo) => {
    const {year} = dateInfo;
    const thisYear = new Date().getFullYear()
    if (year < thisYear) {
        return `${thisYear - year}年前`
    } else if (year > thisYear) {
        return `${year - thisYear}年后`
    } else {
        return '今年'
    }
}));
