const utils = {};

/**
 * 判断指定的类名是否存在
 * @param e element
 * @param c class
 * @returns {boolean}
 */
utils.hasClass = (e, c) => e.classList.contains(c);

/**
 * 在元素中添加一个或多个类名
 * @param e element
 * @param c classes
 */
utils.addClass = (e, ...c) => {
    e.classList.add(...c);
};

/**
 * 移除元素中一个或多个类名
 * @param e element
 * @param c classes
 */
utils.removeClass = (e, ...c) => {
    e.classList.remove(...c)
};

/**
 * 在元素中切换类名
 * @param e element
 * @param c class
 * @param f flag
 */
utils.toggleClass = (e, c, f = false) => {
    e.classList.toggle(c, f)
};

/**
 * 判断数据类型
 * @param data
 * @returns {string}
 */
utils.getDataType = data => Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

export default utils;