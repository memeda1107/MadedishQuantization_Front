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
        <form @submit.prevent="submit">
          <div class="form-group">
            <input 
              v-model="form.username" 
              type="text" 
              placeholder="用户名"
              required
              autofocus
            >
          </div>
          <div class="form-group">
            <input 
              v-model="form.password" 
              type="password" 
              placeholder="密码"
              required
            >
          </div>
          <button type="submit" class="submit-btn">登录</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: Boolean // 父组件控制显示[1,3](@ref)
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('close'); // 通知父组件关闭[1,3](@ref)
    },
    
    // 提交登录
    submit() {
      // 这里替换为实际登录API调用
      console.log('登录信息:', this.form);
      
      // 登录成功后关闭弹窗
      this.$emit('login-success');
      this.close();
    }
  },
  
  // 监听visible变化自动聚焦
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$el.querySelector('input')?.focus();
        });
      }
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
</style>