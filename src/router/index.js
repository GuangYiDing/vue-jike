import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Trends',
        component: () => import('../views/Trends.vue'),
        meta: { title: "推荐" }
    },
    {
        path: '/Friends',
        name: 'Friends',
        component: () => import('../views/Friends.vue'),
        meta: { title: "朋友" }
    },
    {
        path: '/Post',
        name: 'Post',
        component: () => import('../views/Post.vue'),
        meta: { title: "发布动态" }
    },
    {
        path: '/Messages',
        name: 'Messages',
        component: () => import('../views/Messages.vue'),
        meta: { title: "通知" }
    },
    {
        path: '/Mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue'),
        meta: { title: "我的" }
    },
    {
        path: '/Others/:userId',
        name: 'Others',
        component: () => import('../views/Mine.vue'),
        meta: { title: "名片" }
    },
    {
        path: '/TrendsDetial/:id',
        name: 'TrendsDetial',
        component: () => import('../views/TrendsDetial.vue'),
        meta: { title: "即刻动态" }
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { title: "登录/注册" }
    },
    {
        path: '/Personal',
        name: 'Personal',
        component: () => import('../components/Mine/Personal.vue'),
        meta: { title: "编辑个人信息" }
    },
    {
        path: '/Following/:userId',
        name: 'Following',
        component: () => import('../components/Follow/Follow.vue'),
        meta: { title: "正在关注" }
    },
    {
        path: '/Followed/:userId',
        name: 'Followed',
        component: () => import('../components/Follow/Follow.vue'),
        meta: { title: "正被关注" }
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }

})

// 根据路由设置标题
router.beforeEach((to, from, next) => {
    /*路由发生改变修改页面的title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})

router.afterEach(() => {
})

export default router
