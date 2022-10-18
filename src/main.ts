import { createApp } from 'vue'

import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import '@/assets/sass/index.scss' // 全局样式

import App from './App.vue'
import router from './router'
import pinia from './stores'

import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.use(pinia)
app.use(router)

app.mount('#app')
