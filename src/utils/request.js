import axios from 'axios'

const request = axios.create({
  // API 请求的默认前缀
  baseURL: 'https://image.news36524.com/api/',
  timeout: 6000 // 请求超时时间
})

export default request
