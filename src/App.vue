<template>
  <a-layout >
      <a-layout-header class="sticky-header">
        <!-- <a-space size="large" :style="{ width: '100%' }" > -->
          <div class="flex-container" style="vertical-align: bottom;">
            <div>
              <h1>拼盘量化</h1>
            </div>
            <div>
              <!-- <UserOutlined @click="showModal = true"></UserOutlined> -->
               <div v-if="isAuthenticated">
                <a  @click="shouLogout">你好，{{currentUserName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a style="font-style: italic;" @click="handleLogout">注销</a>
                
               </div>
               <div v-else>
                <button style="color: aliceblue;font-size: large;" @click="showLoginModal=true" >登录</button>
               </div>
              <LoginModal :visible="showLoginModal" @close="showLoginModal = false" @login="handleLogin" @switch-to-register="showRegister"/>
              <RegisterModal :visible="showRegisterModal" @close="showRegisterModal = false" @register="handleRegister" @switch-to-login="showLogin"/>
            </div>
          </div>
        <!-- </a-space> -->
      </a-layout-header>
      <a-layout>

      <a-layout-sider :style="{ left: 0, top: 0, bottom: 0 ,background:'#030303',}">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" style="background-color: #030303;">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">行情</span>
        </a-menu-item>
        <a-menu-item key="2" @click="changeRoute('CalendarStock', 2)">
          <user-outlined />
          <span class="nav-text">复盘</span>
        </a-menu-item>
        <!-- <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <bar-chart-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <cloud-outlined />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <appstore-outlined />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <team-outlined />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '64px', background: '#fff', }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
      </a-layout>
    </a-layout >
  </a-layout>
</template>
<script>
import LoginModal from './page/LoginPage.vue';
import RegisterModal from './page/RegisterPage.vue'
import api from './api/request';
import { message } from 'ant-design-vue';
export default {
  name: 'App',
  components: {
     LoginModal,
     RegisterModal,
  },
 data() {
    return {
      showModal: false ,
      showLoginModal: false,
      showRegisterModal: false,
    }
  },
  watch:{
    showLoginModal(newVal,oldVal)
    {
      console.log(newVal,oldVal);
    }

  },
computed: {
  isAuthenticated() {
   let isAuthenticated= this.$store.getters['user/isAuthenticated']
    console.log('isAuthenticated',isAuthenticated)
    return isAuthenticated ;
  },
  currentUserName() {
    console.log('currentUserName',this.$store.getters['user/currentUserName'])
    return this.$store.getters['user/currentUserName'];
  }
},
  methods: {
    changeRoute(routeName) {
      const vm = this;
      return vm.$router.push({ name: routeName });
    },
    showLogin() {
       this.showLoginModal = true
       this.showRegisterModal = false
    },
    showRegister() {
      this.showRegisterModal = true
      this.showLoginModal = false
    },
    handleLogin(credentials) {
    this.$store.dispatch('user/login', {
      userName: credentials.userName,
      password: credentials.password
    }).then(() => {
      this.showLoginModal=false;
      this.$router.push(this.$route.query.redirect || '/CalendarStock');
    });
    },
    handleRegister(userData) {
       api.post('api/addUser', userData)
            .then(response => {
                console.log('..........response', response)
                message.success('注册成功');
                this.showLogin()  
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },
    handleLogout()
    {
      this.$store.dispatch('user/logout').then(() => {
        this.showLogin() 
      this.$router.push('');
    });
    }
  }
}

</script>
<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background:#dd8c8c;
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #dd8c8c;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 998;
  background: #030303;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 10%;
}

.flex-container {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

h1
{
  
	text-shadow: 5px 5px 5px #dfe2d6;
  color: #faf5f5;
  font-size: 30px;
}

/* 覆盖 Ant Design 默认样式 */
.ant-layout-header {
  padding: 0 24px !important;
  line-height: 64px !important;
}

.ant-layout-content {
  margin: 0 !important;
}
</style>