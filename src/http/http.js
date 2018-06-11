import Vue from 'vue'
import axios from 'axios'
//封装一个http方法
let instance = axios.create({
    baseURL:'http://localhost:8080',
    timeout:2000
})
// 添加请求拦截器
axios.interceptors.request.use((config)=>{
    if(process.env.NODE_ENV == 'production'){//生产模式
        config.baseURL = 'https://eip.btte.net'
    } else {
        config.baseURL = 'http://localhost:8080'
    }
    // 在发送请求之前做些什么
    return config
},(err)=>{
    // 对请求错误做些什么
    return Promise.reject(err)
})
// 添加响应拦截器
axios.interceptors.response.use((response)=>{
    // 对响应数据做点什么
    return response
},(err)=>{
    // 对响应错误做点什么
    return Promise.reject(err)
})
//插件
let httpPlugins = {
    install(Vue){//接收Vue
        Object.defineProperty(Vue.prototype,'$http',{
            value: instance
        })
    }
}
export { instance }
export default httpPlugins