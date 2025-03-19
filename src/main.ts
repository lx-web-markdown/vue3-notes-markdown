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
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 注册element-plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(myI18n)

app.mount('#app')
