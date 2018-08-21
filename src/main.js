import 'iview/dist/styles/iview.css';

import App from './app.vue';
import Routers from './router';
import Util from './libs/util';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import iView from 'iview';
import store from './store/store';
import vueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.use(vueAxios, axios);


//请求配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://127.0.0.1:5000';

//muma2018.com:25761


//

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers,
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.beforeEach((to, from, next) => {

    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (!localStorage.currenUser_token) {
            store.commit('setToken', localStorage.getItem('currentUser_token'));
        }
        if (!localStorage.currenUser_level) {
            store.commit('setLevel', localStorage.getItem('currentUser_level'));
        }
        if (!localStorage.currenUser) {
            store.commit('setUser', localStorage.getItem('currentUser'));
        }
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '',
                query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    }
    else {
        next();
    }
});




// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('logout');
                    router.replace({
                        path: '/',
                        query: { redirect: router.currentRoute.fullPath }
                    });
            }
        }
        return Promise.reject(error.response.data);   // 返回接口返回的错误信息
    });

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});





new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});