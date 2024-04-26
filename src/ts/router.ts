import {createRouter, createWebHistory,} from "vue-router";

const routes = [
    {
        path: '/-main',
        component: () => import('../layout/MainLayout.vue'),
        children: [{
            path: '/',
            alias: ['/index', '/home'],
            component: () => import('../pages/Home.vue'),
            meta: {
                title: '首页 - 信东XAct证券业务综合服务平台'
            }
        }, {
            path: '/accept',
            component: () => import('../pages/Accept.vue'),
            meta: {
                title: '受理 - 信东XAct证券业务综合服务平台'
            },
            name: 'acceptRoot',
            children: [
                {
                    path: '/accept/register',
                    component: () => import('../pages/accept/Register.vue'),
                    meta: {
                        title: '客户开户 - 受理 - 信东XAct证券业务综合服务平台'
                    },
                }, //404 Handler
                {
                    path: '/accept/:pathMatch(.*)*',
                    component: () => import('../pages/error/ComingSoon.vue'),
                    meta: {
                        title: "开发中 - 信东XAct证券业务综合服务平台"
                    }
                }]
        }, {
            path: '/transact',
            component: () => import('../pages/Transact.vue'),
            meta: {
                title: '办理 - 信东XAct证券业务综合服务平台'
            }
        }, {
            path: '/nonCounter',
            name: 'nonCounterRoot',
            component: () => import('../pages/NonCounter.vue'),
            meta: {
                title: '非临柜 - 信东XAct证券业务综合服务平台'
            }, children: [
                {
                    path: '/nonCounter/transactCommission',
                    component: () => import('../pages/nonCounter/TransactCommission.vue'),
                    meta: {
                        title: "委托登记 - 信东XAct证券业务综合服务平台"
                    }
                },
                {
                    path: '/nonCounter/withdraw',
                    component: () => import('../pages/nonCounter/Withdraw.vue'),
                    meta: {
                        title: "委托撤单 - 信东XAct证券业务综合服务平台"
                    }
                },
                //404 Handler
                {
                    path: '/nonCounter/:pathMatch(.*)*',
                    component: () => import('../pages/error/ComingSoon.vue'),
                    meta: {
                        title: "开发中 - 信东XAct证券业务综合服务平台"
                    }
                }
            ]
        }, {
            path: '/search',
            component: () => import('../pages/Search.vue'),
            meta: {
                title: '办理 - 信东XAct证券业务综合服务平台'
            }
        }, {
            path: '/manage',
            component: () => import('../pages/Manage.vue'),
            meta: {
                title: '办理 - 信东XAct证券业务综合服务平台'
            }
        }, {
            path: '/liquidation',
            component: () => import('../pages/Liquidation.vue'),
            meta: {
                title: '清算 - 信东XAct证券业务综合服务平台'
            }
        }, //404 Handler
            {
                path: '/:pathMatch(.*)*',
                component: () => import('../pages/error/ComingSoon.vue'),
                meta: {
                    title: "开发中 - 信东XAct证券业务综合服务平台"
                }
            }]
    }, {
        path: '/login',
        component: () => import('../pages/Login.vue'),
        meta: {
            title: '登陆 - 信东XAct证券业务综合服务平台'
        }
    }, {
        path: '/logout',
        component: () => import('../pages/Logout.vue'),
        meta: {
            title: '退出登录 - 信东XAct证券业务综合服务平台'
        }
    }, {
        path: '/e/msg',
        component: () => import('../pages/experimental/MessageSender.vue'),
        meta: {
            title: '信息服务 - 信东XAct证券业务综合服务平台'
        }
    }, //404 Handler
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/error/ComingSoon.vue'),
        meta: {
            title: "开发中 - 信东XAct证券业务综合服务平台"
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