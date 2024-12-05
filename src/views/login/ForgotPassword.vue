<template>
  <div class="forgot-password-container">
    <div class="forgot-password-box">
      <h2 class="title">找回密码</h2>
      
      <div class="form-item">
        <input
          v-model="form.mobile"
          type="text"
          placeholder="请输入手机号"
          :class="{ error: errors.mobile }"
        >
        <div class="error-tip">{{ errors.mobile }}</div>
      </div>

      <div class="form-item verification-code">
        <input
          v-model="form.verificationCode"
          type="text"
          placeholder="验证码"
        >
        <button 
          class="send-code-btn"
          :disabled="countdown > 0"
          @click="sendVerificationCode"
        >
          {{ countdown > 0 ? `${countdown}s后重新发送` : '发送验证码' }}
        </button>
      </div>

      <div class="form-item">
        <input
          v-model="form.newPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="新密码"
          :class="{ error: errors.newPassword }"
        >
        <div class="error-tip">{{ errors.newPassword }}</div>
      </div>

      <div class="form-item">
        <input
          v-model="form.confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="确认新密码"
          :class="{ error: errors.confirmPassword }"
        >
        <div class="error-tip">{{ errors.confirmPassword }}</div>
      </div>

      <button 
        class="submit-btn"
        :disabled="isSubmitting"
        @click="handleSubmit"
      >
        {{ isSubmitting ? '提交中...' : '重置密码' }}
      </button>

      <div class="back-to-login">
        <a @click="router.push('/login')">返回登录</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)
const isSubmitting = ref(false)
const countdown = ref(0)

const form = reactive({
  mobile: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  mobile: '',
  newPassword: '',
  confirmPassword: ''
})

const validateForm = () => {
  let isValid = true
  errors.mobile = ''
  errors.newPassword = ''
  errors.confirmPassword = ''

  if (!/^1[3-9]\d{9}$/.test(form.mobile)) {
    errors.mobile = '请输入正确的手机号'
    isValid = false
  }
  
  if (!form.verificationCode) {
    errors.mobile = '请输入验证码'
    isValid = false
  }

  if (!form.newPassword) {
    errors.newPassword = '请输入新密码'
    isValid = false
  } else if (form.newPassword.length < 6) {
    errors.newPassword = '密码长度不能少于6位'
    isValid = false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = '请输入确认新密码'
    isValid = false
  } else if (form.confirmPassword !== form.newPassword) {
    errors.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  // 在这里可以添加提交表单的逻辑
  isSubmitting.value = false
}

const sendVerificationCode = () => {
  // 在这里可以添加发送验证码的逻辑
}
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.forgot-password-box {
  width: 400px;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.form-item {
  margin-bottom: 20px;
  position: relative;
}

.form-item input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-item input:focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.form-item input.error {
  border-color: #f56c6c;
}

.error-tip {
  position: absolute;
  left: 0;
  bottom: -20px;
  color: #f56c6c;
  font-size: 12px;
}

.verification-code {
  display: flex;
  gap: 10px;
}

.verification-code input {
  flex: 1;
}

.send-code-btn {
  padding: 0 15px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.send-code-btn:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #66b1ff;
}

.submit-btn:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.back-to-login {
  text-align: center;
  margin-top: 20px;
}

.back-to-login a {
  color: #409eff;
  text-decoration: none;
  cursor: pointer;
}

.back-to-login a:hover {
  color: #66b1ff;
}
</style>