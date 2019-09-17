import axios from 'axios'
import {
  Toast,
} from '@teambition/clarity-design'
import queryString from 'query-string'

import storage from './storage'
import { LOGIN_INFO } from '../constants'

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

function normalizeContentyType(headers: { 'Content-Type': string }) {
  const contentType = headers && headers['Content-Type']
  return contentType || 'application/x-www-form-urlencoded'
}

axios.interceptors.request.use(
  config => {
    const loginInfo = JSON.parse(storage.getItem(LOGIN_INFO)) || {}
    const token = loginInfo.token
    if (token) {
      config.headers.token = `${token}`
    } else {
      delete config.headers.token
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code !== 0) {
      Toast.error({
        message: msg
      })
      if (code === 5002) {
        window.location.href = '/login'
        return
      }
      return Promise.reject(response.data)
    }

    return response.data
  },
  error => {
    if (error.response && error.request) {
      if (error.response.status === 504) {
        Toast.error({
          message: '连接超时'
        })
      }
      Promise.reject(error)
    }
  }
)

export function get(url: string, params?: object) {
  return axios.get(url, { params })
}

export function post(
  params: {},
  url: string,
  config?: { headers: { 'Content-Type': string } }
) {
  config = Object.assign({}, config)
  const contentType = normalizeContentyType(config.headers)
  let p = ''
  // const u: string = ''
  switch (contentType) {
    case 'application/x-www-form-urlencoded':
      p = queryString.stringify(params)
      break
    case 'application/json':
      p = JSON.stringify(params)
      break
    default:
      break
  }

  return axios.post(url, p, config)
}

export function put(
  params: {},
  url: string,
  config?: { headers: { 'Content-Type': string } }
) {
  config = Object.assign({}, config)
  return axios.put(url, queryString.stringify(params), config)
}
