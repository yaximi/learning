/**
 * 前端优化策略
 * 
 * 1、请求队列
 * 
 * 2、请求去重
 * 
 * 3、请求合并
 * 
 * 4、防抖节流
 *  （1）、debounce
 *  （2）、throttle
 * 
 * 5、缓存
 *  （1）、浏览器缓存（强缓存、协商缓存）
 *  （2）、本地缓存（localStorage、sessionStorage）
 * 
 * 6、分页、滚动加载
 */

// 1、请求队列
class RequestQueue {
  constructor(maxConcurrent = 6) {
    this.maxConcurrent = maxConcurrent // 最大并发请求数
    this.curConcurrent = 0 // 当前并发请求数
    this.queue = [] // 请求队列
  }

  add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        request,
        resolve,
        reject
      })
      this.processQueue()
    })
  }

  processQueue() {
    if (this.queue.length && this.curConcurrent < this.maxConcurrent) {
      const { request, resolve, reject } = this.queue.shift()
      this.curConcurrent++
      request()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.curConcurrent--
          this.processQueue()
        })
    }
  }
}

function fetchData(url) {
  return fetch(url).then(res => res.json())
}

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  // ... 其他 URL
]

const requests = urls.map(url => () => fetchData(url))

const requestQueue = new RequestQueue()

Promise.all(requests.map(request => requestQueue.add(request)))
  .then(res => {
    console.log('所有请求完成', res)
  })
  .catch(err => {
    console.error('请求失败', err)
  })


// 2、请求去重
const requestMap = new Map();

function request(url, params) {
    const key = `${url}-${JSON.stringify(params)}`;
    if (requestMap.has(key)) return requestMap.get(key);

    const promise = fetch(url, { method: 'POST', body: JSON.stringify(params) })
        .finally(() => requestMap.delete(key));

    requestMap.set(key, promise);
    return promise;
}

/**
 * 后端优化策略
 * 
 * 1、负载均衡
 *  （1）、硬件负载均衡
 *  （2）、软件负载均衡
 * 
 * 2、接口合并，将多个接口合并成一个接口，减少并发请求数量
 * 
 * 3、CDN 内容分发，通过不同的域名进行请求，从而突破浏览器单个域名并发请求限制
 * 
 * 4、缓存
 */