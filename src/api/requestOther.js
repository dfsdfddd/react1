import axios from 'axios'
import { message } from 'antd';
// import router from '../router'

const baseUrl = "http://10.213.50.13:8086"
const token = sessionStorage.getItem('theToken')
console.log('token',token)

const instance = axios.create({
  withCredentials:true,
  crossdomain: true,
  baseURL: baseUrl,
  timeout: 50000, // 请求超时时间
  headers:{
    'Content-Type':'application/json',
    'token':token || ''
  }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// 返回拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 请求错误时做些事
  if (error.message.indexOf('timeout') >= 0) {
    message.error('请求超时');
  }else if (error.response.status) {
    message.error("错误码:"+error.response.status)
  }else{
    message.error("系统错误")
  }
  return Promise.reject(error)
})

export default instance
