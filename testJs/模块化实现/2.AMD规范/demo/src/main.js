require.config({
    baseUrl: './src',
    paths: {
        constant: 'assets/js/constant',
        utils: 'assets/js/utils'
    }
})

require(['utils'], function (utils) {
    utils.log()
})

console.info('我是最先打印的，因为AMD规范是异步模块加载机制')
