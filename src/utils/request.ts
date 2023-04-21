import axios, { AxiosError } from 'axios'
const _request = axios.create({
  baseURL: 'http://fz.hthuandian.cn/analyse',
  timeout: 5000
})

// 添加请求拦截器
_request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_request.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data
    if(code === 200) return data
  },
  (error: AxiosError<any>) => {
    // 网络超时
    if(!error.response) {
      console.log(`网络超时 + ::>>`, )
    }else {
      console.log(`error.response.data.message + ::>>`, error.response.data.message)
    }
    return Promise.reject(error)
  }
)
export default _request