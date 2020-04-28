import axios from 'axios'
import myCookie from '../CookieUtil'

axios.interceptors.request.use(
  config => {
    const token = myCookie.get('token')
    if (token) {
      // Bearer是JWT的认证头部信息
      config.headers.common.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => {
    // 在这里对返回的数据进行处理
    console.log('网络正常')
    return res.data
  },
  err => {
    console.log('网络开了小差！请重试...')
    return Promise.reject(err)
  }
)

export default axios
