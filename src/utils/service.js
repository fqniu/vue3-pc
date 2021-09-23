import axios from 'axios'
import store from '@/store'
import { goLoginPage, getAccessToken, getRefreshToken, getAccessTokenTTL } from '@/utils/auth'
import { isNoNeedTokenUrl } from '@/utils/validate'

const SYSTEM_APPID = process.env.VUE_APP_SYSTEM_APPID
let isRefreshing = false // 是否正在刷新token
let requests = []

const service = axios.create({
  timeout: 120000,
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 跨域时携带cookies
})

service.interceptors.request.use(
  async config => {
    // 防止缓存，给get请求加上时间戳
    if (config.method === 'get') {
      const url = config.url
      url.indexOf('?') === -1 ? config.url = url + '?_=' + (new Date().getTime()) : config.url = url + '&_=' + (new Date().getTime())
    }

    // 不需要验证token的接口
    if (isNoNeedTokenUrl(config.url)) {
      return config
    }
    // token数据丢失
    if (!getAccessToken() || !getRefreshToken() || !getAccessTokenTTL()) {
      goLoginPage()
    }

    if (new Date().getTime() >= getAccessTokenTTL()) {
      // accessToken失效，接口放入队列，并刷新token
      if (!isRefreshing) {
        isRefreshing = true
        const sData = {
          appID: SYSTEM_APPID,
          refreshToken: getRefreshToken(),
          timestamp: new Date().getTime(),
          version: '1.0'
        }
        store.dispatch('user/refreshToken', sData).then(res => {
          isRefreshing = false
          return res.item.accessToken
        }).then(token => {
          requests.forEach(cb => cb(token))
          requests = []
        }).catch(err => {
          isRefreshing = false
          console.error('refresh token error: ', err)
        })
      }
      const retryOriginalRequest = new Promise((resolve) => {
        requests.push((token) => {
          config.headers['Authorization'] = token
          resolve(config)
        })
      })
      return retryOriginalRequest
    } else {
      // accessToken有效
      const token = getAccessToken()
      if (token) {
        config.headers['Authorization'] = token
      }
      return config
    }
  },
  err => Promise.reject(err)
)

service.interceptors.response.use(
  response => response.data,
  async error => {
    switch (error.response.data.code) {
      case 910005: // 返回910005 缺失accessToken
      case 910006: // 返回910006 获取SESSIONID失败
      case 910007: // 返回910007 accessToken过期
      case 910008: // 返回910008 找不到ONEID用户信息
      case 910009: // 返回910007 refreshToken过期
        goLoginPage()
        break
      default:
        console.log('err' + error)
    }
    return Promise.reject(error)
  }
)

export default service