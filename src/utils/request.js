import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet } from './index'
import config from '~/config'

const service = axios.create({
  timeout: 120000,
  baseURL: config[import.meta.env.MODE].baseUrl
  // withCredentials: true, // 跨域时携带cookies
})

service.interceptors.request.use(
  async config => {
    // 防止缓存，给get请求加上时间戳
    if (config.method === 'get') {
      const url = config.url
      url.indexOf('?') === -1 ? config.url = url + '?_=' + (new Date().getTime()) : config.url = url + '&_=' + (new Date().getTime())
    }

    const token = localGet('token') 
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
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
        console.log('跳转登录页');
        break
      default:
        console.log('err' + error)
    }
    return Promise.reject(error)
  }
)
export default service