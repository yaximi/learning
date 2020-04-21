import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.min'

Vue.config.productionTip = false

const sessionStorage = window.sessionStorage
sessionStorage.clear()
let historyCount = sessionStorage.getItem('historyCount') * 1 || 0
sessionStorage.setItem('/', '0')
router.beforeEach((to, from, next) => {
  const toIndex = sessionStorage.getItem(to.path)
  const fromIndex = sessionStorage.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('SET_DIRECTION', 'forward')
    } else {
      store.commit('SET_DIRECTION', 'reverse')
    }
  } else {
    historyCount++
    sessionStorage.setItem('historyCount', historyCount + '')
    to.path !== '/' && sessionStorage.setItem(to.path, historyCount + '')
    store.commit('SET_DIRECTION', 'forward')
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
