import axios from 'axios'
import { Toast } from '@teambition/clarity-design'
// import queryString from 'query-string'

import storage from 'utils/storage'
import { LOGIN_INFO } from '@/constants'
import { store } from '@/store'

// export type IApiResponseType<T> = {
//   success: boolean
//   result: T
//   message: string
//   token: string
// }

let reqCount: number = 0

axios.defaults.timeout = 5000

const agent = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    common: {
      Accept: 'application/json',
      post: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  },
})

agent.interceptors.request.use(
  config => {
    if (reqCount === 0) {
      store.dispatch.loader.loaderStart()
    }
    const loginInfo = JSON.parse(storage.getItem(LOGIN_INFO) || '{}')
    const token = loginInfo.token
    if (token) {
      config.headers.token = `${token}`
    } else {
      delete config.headers.token
    }
    reqCount++
    return config
  },
  error => {
    reqCount--
    if (reqCount === 0) {
      store.dispatch.loader.loaderEnd()
    }
    return Promise.reject(error)
  },
)

agent.interceptors.response.use(
  response => {
    // const { code, msg } = response.data
    // if (code !== 0) {
    //   Toast.error({
    //     message: msg,
    //   })
    //   if (code === 5002) {
    //     window.location.href = '/login'
    //     return
    //   }
    //   return Promise.reject(response.data)
    // }

    reqCount--
    if (reqCount === 0) {
      store.dispatch.loader.loaderEnd()
    }

    return response
  },
  error => {
    reqCount--
    if (reqCount === 0) {
      store.dispatch.loader.loaderEnd()
    }
    if (error.response && error.request) {
      if (error.response.status === 504) {
        Toast.error({
          message: '连接超时',
        })
      }
    }
    return Promise.reject(error)
  },
)

export default agent
