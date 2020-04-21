import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    direction: 'forward'
  },
  mutations: {
    SET_DIRECTION (state, direction) {
      state.direction = direction
    }
  },
  actions: {
    setDirection ({ commit }, direction) {
      commit('SET_DIRECTION', direction)
    }
  },
  getters: {
    getDirection (state) {
      return state.direction
    }
  },
  modules: {
  }
})
