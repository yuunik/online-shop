import { createSSRApp } from 'vue'
import pinia from './stores'
// 引入网络请求拦截器
import '@/utils/http'

import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  return {
    app,
  }
}
