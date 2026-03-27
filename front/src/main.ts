import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { en } from './i18n/en'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({ locale: 'en', messages: { en } })

app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')
