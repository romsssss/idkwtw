import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies/:slug',
    name: 'collection',
    component: () => import('../views/CollectionView.vue')
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
