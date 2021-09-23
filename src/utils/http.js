import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet } from './index'
import config from '~/config'

axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl

const http = {
  request({
    url,
    data = {},
    method = 'GET',
    responseType
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, responseType);
    });
  },
  _request(url, resolve, reject, data = {}, method = 'GET', responseType) {
    const format = method.toLocaleLowerCase() == 'get' ? 'params' : 'data';
    axios({
      url: url,
      method: method,
      [format]: data,
      header: {
        'content-type': 'application/json'
      },
      responseType
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data);
      } else if (res.code == -1) {
        resolve(res);
      }
    }).catch(error => {
      reject(error);
    })
  }
}

export {
  http
};