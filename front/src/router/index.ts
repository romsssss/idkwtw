import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search_sessions/:uuid',
      name: 'search_session',
      component: () => import('../views/SearchSessionView.vue')
    },
    {
      path: '/proposals/:uuid',
      name: 'proposal',
      component: () => import('../views/ProposalView.vue')
    }
  ]
})

export default router
