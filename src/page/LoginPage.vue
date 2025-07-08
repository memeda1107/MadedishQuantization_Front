<template>
  <!-- 遮罩层 -->
  <transition name="fade">
    <div v-if="visible" class="modal-mask" @click.self="close">
      <!-- 弹窗容器 -->
      <div class="modal-container">
        <div class="modal-header">
          <h3>用户登录</h3>
          <span class="close-btn" @click="close">×</span>
        </div>

        <!-- 登录表单 -->
        <a-form ref="formRef"
        :model="formState" >
          <a-form-item label="用户名" name="userName" :rules="[{ required: true, message: '请输入用户名！' }]">
                            <a-input v-model:value="formState.userName" size="large" style="width: 100%"
                                class="form-input" />
                        </a-form-item>
                        <a-form-item label="密    码" name="password" :rules="[{ required: true, pattern: /^[A-Za-z0-9]+$/, message: '仅支持字母和数字！'}]">
                             <a-input v-model:value="formState.password" size="large" style="width: 100%"
                                class="form-input" />
                        </a-form-item>
                        <p class="toggle-text" @click="switchToRegister">没有账号？立即注册</p>
                        <div style="margin: auto; width: 10%;">
                          <a-button  type="primary" html-type="submit" @click="submit" class="button">登录</a-button>
                        </div>
        </a-form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['visible'],
  data() {
    return {
      isShow:this.visible,
      formState: {
        userName: '',
        password: ''
      }
    }
  },
  watch()
  {


  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.formRef.validate().then(() => {
        console.log('验证通过');
        this.$emit('login', this.formState)
      }).catch(()=>{
        console.log('验证不通过');
      });
    },
    switchToRegister() {
      this.$emit('switch-to-register')
    }
  }
}
</script>

<style scoped>
/* 遮罩层样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 弹窗容器 */
.modal-container {
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* 弹窗头部 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  font-size: 24px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
}

/* 表单样式 */
form {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #40a9ff;
  }
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.center {
    margin: auto;
    padding: 10px;
}

.toggle-text {
  cursor: pointer;
  color: #1890ff;
  text-align: center;
  margin-top: 15px;
}
</style>