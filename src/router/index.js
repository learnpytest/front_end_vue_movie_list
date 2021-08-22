import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../views/Movies.vue'

Vue.use(VueRouter)

const routes = [
    {
    path: '/',
    name: 'root',
    redirect: '/movies',
  },
  {
    path:'/movies/favorites',
    name:'favorites',
    props:true,
    component: () => import('../views/Favorites.vue')
  },

  {
    path: '/movies',
    name: 'movies',
    component: Movies,
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
