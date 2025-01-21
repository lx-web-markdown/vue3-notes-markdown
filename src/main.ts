import { createApp } from 'vue'
import { createPinia } from 'pinia'
//
import App from './App.vue'
import router from './router'
// CSS
import '@/assets/styles/index.scss'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 国际化
import myI18n from './language'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(myI18n)

app.mount('#app')
