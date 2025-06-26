const state = {
  userInfo: null,      // 用户信息
  token: null,         // 认证令牌
  isAuthenticated: false, // 登录状态
  showLoginModal: false //登录弹窗
};

const mutations = {
  SET_USER(state, payload) {
    state.userInfo = payload.userData;
    state.token = payload.token;
    state.isAuthenticated = true;
    localStorage.setItem('token', payload.token);
    localStorage.setItem('userinfo', JSON.stringify(payload.userData));
    console.log('payload',payload)
    // 持久化存储

    if(Object.keys(payload).length === 0)
      return;
     sessionStorage.setItem("userId", payload.userData.id);
     sessionStorage.setItem("userName", payload.userData.userName);
     sessionStorage.setItem("isAuthenticated", true);
     console.log('sessionStorage',sessionStorage)
    
   
  },
  LOGOUT(state) {
    state.userInfo = null;
    state.token = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem("userId");
     sessionStorage.removeItem("userName");
     sessionStorage.setItem("isAuthenticated", false);
  },
  SET_LOGIN_MODAL(state, value) {
      state.showLoginModal = value
    }
};
import api from '../../api/request';

 const actions = {
  login({ commit }, credentials) {
    // 必须 return Promise
    return api.post('/api/login', credentials).then(res => {
        commit('SET_USER', res);
        return res; 
      })
      .catch(error => {
        throw error; // 触发 .catch()
      });
  },

  logout({ commit })
  {
    commit('LOGOUT');
  },

  setLoginModel({ commit },isShow)
  {
    commit('SET_LOGIN_MODAL', isShow);
  },



  initialize({ commit }) {
    const token = localStorage.getItem('token');
    const userName =sessionStorage.getItem('userName')
    const id=sessionStorage.getItem('userId')
    const isAuthenticated= sessionStorage.getItem("isAuthenticated");
    const userData={
      id:id,
      userName:userName,
      isAuthenticated:isAuthenticated,
    }
    if (token && id) {
      commit('SET_USER', {userData, token });
    }
  }
};

const getters = {
   isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.userInfo,
  currentUserId:() => {
   return sessionStorage.getItem('userId')},
   currentUserName:() => {
   return sessionStorage.getItem('userName')}

};

export default { state, mutations, actions, getters,namespaced: true, };