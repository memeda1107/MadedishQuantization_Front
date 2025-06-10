// import Vue from 'vue';
// import Router from 'vue-router';
import CalendarStock from '../components/CalendarStock.vue'
import HelloWorld from "@/components/HelloWorld.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import ReviewDiary from '../page/ReviewDiary.vue'
import LoginPage from '../page/LoginPage.vue'
// Vue.use(Router);


const routes = [

     {
        path: '/LoginPage',
        name: 'LoginPage',
        component: LoginPage,
        meta: {
            breadcrumb: [
                { name: '登录' }
            ]
        }
    },
    {
        path: '/CalendarStock',
        name: 'CalendarStock',
        component: CalendarStock,
        meta: {
            breadcrumb: [
                { name: '日记' }
            ]
        }
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
            breadcrumb: [
                { name: '欢迎' }
            ]
        }
    },

    {
        path: '/ReviewDiary',
        name: 'ReviewDiary',
        component: ReviewDiary,
        meta: {
            breadcrumb: [
                { name: '复盘' }
            ]
        }
    },
    // 更多路由...
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;


