// import Vue from 'vue';
// import Router from 'vue-router';
import CalendarStock from '../components/CalendarStock.vue'
import HelloWorld from "@/components/HelloWorld.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import ReviewDiary from '../page/ReviewDiary.vue'
import LoginPage from '../page/LoginPage.vue'
// Vue.use(Router);
import store from '../store';

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
            requiresAuth: true,  
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
           requiresAuth: false , 
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
            requiresAuth: true, 
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


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters['user/isAuthenticated'];
  if (requiresAuth && !isAuthenticated) {
   store.commit('SET_LOGIN_MODAL', true)
    next(
        // { path: '/LoginPage', query: { redirect: to.fullPath, visible:true} }
        false
        );
  } else {
    next();
  }
});
export default router;


