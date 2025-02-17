import { useMemberStore } from '@/stores'
import type { ResType } from '@/types/common'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const interceptor: UniNamespace.InterceptorOptions = {
  invoke: (options: UniNamespace.RequestOptions) => {
    // 请求地址检验
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求头设置
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 请求延时
    options.timeout = 10000
    // 获取 token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      // 将 token 添加到 Authorization 请求头
      options.header.Authorization = `Bearer ${token}`
    }
  },
}

// 注册拦截器
uni.addInterceptor('request', interceptor)
uni.addInterceptor('uploadFile', interceptor)

const http = <T>(config: UniNamespace.RequestOptions) => {
  return new Promise<ResType<T>>((resolve, reject) => {
    uni.request({
      ...config,
      success: (res) => {
        const { statusCode, data } = res
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data as ResType<T>)
        } else if (statusCode === 401) {
          // token 失效
          uni.showToast({
            icon: 'none',
            title: (data as ResType<T>).message || '数据获取失败',
          })
          const memberStore = useMemberStore()
          // 清除用户信息
          memberStore.clearProfile()
          // 跳转登录页面
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: '请求失败，请稍后再试',
          })
          reject(res)
        }
      },
      fail: (res) => {
        // 错误提示
        uni.showToast({
          icon: 'error',
          title: '网络错误, 请稍后再试...',
        })
        reject(res)
      },
    })
  })
}

export default http
