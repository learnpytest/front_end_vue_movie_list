import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../views/Movies.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/movies/favorites',
    name:'favorites',
    props:true,
    component: () => import('../views/Favorites.vue')
  },
  {
    path: '/movies/:display',
    name: 'movies',
    component: Movies,
  },
  {
    path: '/',
    name: 'root',
    redirect:'/movies/column'
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
