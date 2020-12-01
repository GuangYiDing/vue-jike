import axios from 'axios'
// import qs from 'qs'
// import Iurl from './constants'
import store from "../store/index";
// 超时设置
axios.defaults.timeout = 15000
// 请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/'


/* 请求拦截器（请求之前的操作） */
axios.interceptors.request.use((req) => {
    if (store.state.token != "") {
        req.headers.Authorization = store.state.token
    }
    console.log(req)
    return req;
}, err => {
    console.log(err)
    Promise.reject(err)
});

/* 请求之后的操作 */
axios.interceptors.response.use((res) => {
    console.log(res)
    return res;
}, (error) => {
    console.log(error);
    switch (error.response.status) {
        case 400:
            error.message = '错误请求';
            break;
        case 401:
            error.message = '未授权，请重新登录';
            break;
        case 403:
            error.message = '拒绝访问';
            break;
        case 404:
            error.message = '请求错误,未找到该资源';
            break;
        case 405:
            error.message = '请求方法未允许';
            break;
        case 408:
            error.message = '请求超时';
            break;
        case 500:
            error.message = '服务器端出错';
            break;
        case 501:
            error.message = '网络未实现';
            break;
        case 502:
            error.message = '网络错误';
            break;
        case 503:
            error.message = '服务不可用';
            break;
        case 504:
            error.message = '网络超时';
            break;
        case 505:
            error.message = 'http版本不支持该请求';
            break;
        default:
            error.message = `连接错误${error.response.status}`;
    }
    return Promise.reject(error);
});


export default axios;