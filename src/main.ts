import { createApp } from 'vue'
import 'normalize.css'
import './index.css'
import '@/assets/styles/common.scss'
import App from './App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { store } from '@/store'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).mount('#app')