import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fruit/:id',
    name: 'Fruit',
    component: () => import('../views/Fruit.vue')
  },
  {
    path: '/add_fruit',
    name: 'Add a Fruit',
    component: () => import('../views/AddAFruit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
