import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/-main',
        component: () => import('../layout/MainLayout.vue'),
        children: [{
            path: '/',
            alias: ['/index', '/home'],
            component: () => import('../pages/Home.vue'),
            meta: {
                title: '首页 - 信东交易系统'
            }
        },]
    }, {
        path: '/login',
        component: () => import('../pages/Login.vue'),
        meta: {
            title: '登陆 - 信东交易系统'
        }
    }, {
        path: '/logout',
        component: () => import('../pages/Logout.vue'),
        meta: {
            title: '退出登录 - 信东交易系统'
        }
    }
]

let router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// @ts-ignore
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()
})

export default router