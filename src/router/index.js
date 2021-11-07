import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../views/Movies.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/movies',
    name: 'movies',
    component: Movies,
  },
  {
    path: '/',
    name: 'root',
    redirect: '/movies'
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router