import axios from 'axios'
import { Notify } from 'vant';
import Vue from 'vue'
Vue.use(Notify)
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
    console.log(error)
    if (error.response.data.message == '403') {
        Notify({ type: 'warning', message: '登录已失效' });
        store.commit('setToken', null)
    }
    return Promise.reject(error);
});


export default axios;