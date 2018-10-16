import axios from 'axios'
import { createSign } from './utils'
const qs = require('qs')

const fetch = axios.create({
    timeout: 10000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    baseURL: 'https://xfsapi.aiju.com/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Token':localStorage.getItem('token'),
    },
    transformRequest: [function (data, headers) {
      return data;
    }],

})
// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
  config.headers['Token'] = localStorage.getItem('token')
  console.log('config',config)
  config.headers['Sign'] = createSign(config.data)
  config.data=qs.stringify(config.data)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
fetch.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (!response.data || response.data==undefined){
      return response
    }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default fetch
