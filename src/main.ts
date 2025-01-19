import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 国际化
import myI18n from './language'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(myI18n)

app.mount('#app')
