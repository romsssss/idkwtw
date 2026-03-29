import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'
import { routes } from './router'
import { en } from './i18n/en'

const PRODUCTION_HOST = 'idontknowwhattowatch.com'
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  const pinia = createPinia()
  const i18n = createI18n({ locale: 'en', messages: { en } })
  app.use(pinia).use(i18n)

  if (isClient) {
    if (window.location.hostname === PRODUCTION_HOST) {
      const script = document.createElement('script')
      script.async = true
      script.dataset.goatcounter = 'https://idontknowwhattowatch.goatcounter.com/count'
      script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true })
      script.src = '//gc.zgo.at/count.js'
      script.onload = () => {
        const path = router.currentRoute.value.path.replace(UUID_RE, ':uuid')
        window.goatcounter?.count({ path })
      }
      document.body.appendChild(script)
    }

    router.afterEach((to) => {
      const path = to.path.replace(UUID_RE, ':uuid')
      window.goatcounter?.count({ path })
    })
  }
})
