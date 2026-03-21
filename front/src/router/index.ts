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

const PRODUCTION_HOST = 'idontknowwhattowatch.com'
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi

if (window.location.hostname === PRODUCTION_HOST) {
  const script = document.createElement('script')
  script.async = true
  script.dataset.goatcounter = 'https://idontknowwhattowatch.goatcounter.com/count'
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true })
  script.src = '//gc.zgo.at/count.js'
  document.body.appendChild(script)
}

router.afterEach((to) => {
  const path = to.path.replace(UUID_RE, ':uuid')
  window.goatcounter?.count({ path })
})

export default router
