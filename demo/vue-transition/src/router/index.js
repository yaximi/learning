import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "List" */ '../views/List.vue')
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: () => import(/* webpackChunkName: "Exercise" */ '../views/Exercise.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import(/* webpackChunkName: "Game" */ '../views/Game.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
