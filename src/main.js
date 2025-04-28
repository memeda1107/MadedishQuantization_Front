// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')


import { createApp } from "vue";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
import router from './router/index';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

// 添加需要的图标到库中
library.add(faEdit)

// Components


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        sets: {
            fa: {
                component: FontAwesomeIcon
            }
        },
        iconfont: "mdi",
    }
});

// createApp(App).use(vuetify).mount("#app");

const app = createApp(App);
app.use(router); // 使用 router 实例
app.use(vuetify);
app.use(Antd)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');