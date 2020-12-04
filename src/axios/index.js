import axios from 'axios'
import store from "../store/index";
// 超时设置
axios.defaults.timeout = 15000
// 请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/'
// if (store.state.token != null) {
//     axios.defaults.headers.post['Authorization'] = store.state.token;
// }
// if (store.state.token != null) {
//     axios.defaults.headers.get['Authorization'] = store.state.token;
// }


/* 请求拦截器（请求之前的操作） */
axios.interceptors.request.use((req) => {
    if (store.state.token != "") {
        // req.headers.Authorization = store.state.token
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
    return Promise.reject(error);
});


export default axios;