/*!
 *  Bridge.js v4.2.0
 *  edit by adeline Wu
 *  2018/11/2
 *
 * 调用后台接口的写法：
 * Bridge.callByJS({
 *   callback: 回调函数，
 *   id:
 *   trancode:
 *   ...
 * })
 * 不需要再拼接jsToken
 *
 *
 * 调用客户端scheme码方式：
 * @param1  与客户端约定的scheme码规则
 * @param2  callback 回调函数
 * Bridge.callByJsUrl(param1,param2)
 * 任何地方都不需要拼接jsToken，已经封装
 *
 * 具体可以见相似K线的项目，xskx
 */
;(function (factory) {
  var define = window.define || {}
  if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    window.Bridge = factory()
  }
})(function () {
  var DEBUG = true
  var callbacks = {}
  var urlCallBacks = {}
  var guid = 0
  var ua = navigator.userAgent
  // TODO 精确性待改进
  var ANDROID = /android/i.test(ua)
  var IOS = /iphone|ipad/i.test(ua)
  var WP = /windows phone/i.test(ua)

  /**
   * 方便在各个平台中看到完整的 log
   */
  function log () {
    if (DEBUG) {
      console.log(console, Array.prototype.join.call(arguments, ' '))
    }
  }

  /**
   * 平台相关的 Web 与 Native 单向通信方法
   */
  function invoke (cmd) {
    log('invoke', cmd)

    if (ANDROID) {
      prompt('gtjayyznativetransmit://' + cmd)
    } else if (IOS) {
      var url = cmd
      window.location.hash = encodeURIComponent('gtjayyznativetransmit://' + url)
    } else if (WP) {
      // TODO ...
    }
  }

  /**
   * 平台相关的web 调用Native 的相关功能
   */
  function invokeUrl (url) {
    if (ANDROID) {
      prompt(url)
    } else if (IOS) {
      // 牛人牛股历史原因暂不能改成hash,如果要改需要原生配合一起修改
      window.location.href = encodeURIComponent(url)
    } else if (WP) {
      // TODO ...
    }
  }

  var Bridge = {
    callByJS: function (opt) {
      log('callByJS', JSON.stringify(opt))

      var input = {}
      input.id = opt.id
      input.tranCode = opt.tranCode
      input.type = opt.type
      input.jsToken = guid++
      input.isEncrypt = opt.isEncrypt
      input.transmitMode = opt.transmitMode
      input.publicParameter = opt.publicParameter
      input.publicParameterExtra = opt.publicParameterExtra
      input.touristParameter = opt.touristParameter
      input.param = opt.param || {}
      input.localParameter = opt.localParameter
      callbacks[input.jsToken] = opt.callback

      invoke(JSON.stringify(input))
    },
    callByNative: function (optStr) {
      log('callByNative', JSON.stringify(optStr))

      var opt = {}
      try {
        opt = JSON.parse(optStr)
      } catch (e) {
        console.error('[bridge]:客户端返回的JSON解析失败')
      }
      var callback = callbacks[opt.jsToken]
      var ret = opt.ret || {}
      var script = opt.script || ''

      /* Native 主动调用 Web  */
      if (script) {
        log('callByNative script', script)
        /* try {
          invoke(JSON.stringify({
            token: opt.jsToken,
            ret: eval(script)
          }))
        } catch (e) {
          console.error(e)
        } */
      } else if (callback) {
        /* Web 主动调用 Native，Native 被动的响应 */
        log('callByNative callback', script)
        /* ret中包含error,data两种信息，只有当error为0时，才调用回调方法 */
        if (ret.error === '0') {
          callback(ret)
        } else {
          /* 出错信息，1、未登录 2、已登录，但是有其他错误
             alert(JSON.stringify(ret.data))
             messageDialog为通用函数，为显示错误提示框的专用函数名
             callback("bridgeerror" + ret) */
          callback(ret)
        }

        try {
          /* delete callback */
          log(callbacks)
        } catch (e) {
          console.error(e)
        }
      }
    },
    callByJsUrl: function (url, callback) {
      var jstoken = guid++
      urlCallBacks[jstoken] = callback
      /* 1、如果有linkurl,就要拼在这之前2、如果是没有问号，是第一个参数3、直接在后面拼参数 */
      if (url.indexOf('linkurl') >= 0) {
        var urlData = url.split('linkurl')
        url = urlData[0] + 'jstoken=' + jstoken + '&linkurl' + urlData[1]
      } else if (url.indexOf('?') >= 0) {
        url = url + '&jstoken=' + jstoken
      } else {
        url = url + '?jstoken=' + jstoken
      }
      log('callByJSUrl', JSON.stringify(url))
      invokeUrl(url)
    },
    callByNativeUrl: function (optStr) {
      log('callByNativeUrl', JSON.stringify(optStr))
      var opt = {}
      try {
        opt = JSON.parse(optStr)
      } catch (e) {
        console.error('[bridge]:客户端返回的JSON解析失败')
      }
      var callback = urlCallBacks[opt.jsToken]
      var ret = opt.ret || {}
      if (ret.error === '0') {
        callback(ret)
      } else {
        callback(ret)
      }
    }
  }

  return Bridge
})
