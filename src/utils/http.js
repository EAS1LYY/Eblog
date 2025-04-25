import axios from 'axios';
// 用户可以根据自身后台系统进行修改
// export interface HttpResponse<T = unknown> {
//  status: number;
//  msg: string;
//  code: number;
//  data: T;
// }

const http = axios.create({
  timeout: 5000,
  baseURL: 'http://back.toolr.cn/',
  //baseURL: 'http://localhost:8080/',
  headers: {
    //'Content-Type': 'application/json', // 设置请求的内容类型为JSON
  }
})
http.interceptors.request.use((config) => {
  if(localStorage.getItem('token')){
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})

http.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  console.log(err)
})


export default http;