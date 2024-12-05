<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>注册账号</h2>
      
      <div class="form-item">
        <input
          v-model="form.username"
          type="text"
          placeholder="请输入用户名"
          :class="{ error: errors.username }"
        >
        <div class="error-tip">{{ errors.username }}</div>
      </div>

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
        <div class="password-input">
          <input
            v-model="form.password"
            type="password"
            placeholder="设置密码"
            :class="{ error: errors.password }"
          >
        </div>
        <div class="error-tip">{{ errors.password }}</div>
      </div>

      <div class="form-item">
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="确认密码"
          :class="{ error: errors.confirmPassword }"
        >
        <div class="error-tip">{{ errors.confirmPassword }}</div>
      </div>

      <button 
        class="submit-btn"
        :disabled="isSubmitting"
        @click="handleSubmit"
      >
        {{ isSubmitting ? '注册中...' : '注册' }}
      </button>

      <div class="bottom-actions">
        <div class="privacy-policy">
          注册即表示同意
          <a @click="showPrivacyPolicy">《隐私政策》</a>
        </div>
        <div class="auth-link">
          已有账号？<a @click="router.push('/login')">立即登录</a>
        </div>
      </div>
    </div>
    <PrivacyPolicyDialog v-model:visible="showPrivacyPolicyDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import PrivacyPolicyDialog from '@/components/PrivacyPolicyDialog.vue'

const router = useRouter()
const showPassword = ref(false)
const isSubmitting = ref(false)
const countdown = ref(0)
const showPrivacyPolicyDialog = ref(false)

const form = reactive({
  username: '',
  mobile: '',
  verificationCode: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  username: '',
  mobile: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.mobile = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.username) {
    errors.username = '请输入用户名'
    isValid = false
  } else if (form.username.length < 4) {
    errors.username = '用户名长度不能少于4位'
    isValid = false
  }

  if (!/^1[3-9]\d{9}$/.test(form.mobile)) {
    errors.mobile = '请输入正确的手机号'
    isValid = false
  }

  if (!form.verificationCode) {
    errors.mobile = '请输入验证码'
    isValid = false
  }

  if (!form.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    isValid = false
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/login?registered=true')
  } catch (error: any) {
    errors.username = '注册失败，请重试'
  } finally {
    isSubmitting.value = false
  }
}

const sendVerificationCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(form.mobile)) {
    errors.mobile = '请输入正确的手机号'
    return
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    startCountdown()
  } catch (error: any) {
    errors.mobile = '发送验证码失败'
  }
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const showPrivacyPolicy = () => {
  showPrivacyPolicyDialog.value = true
}
</script>

<style scoped>
@import './styles/auth.css';

/* Register 特有的样式 */
.password-input {
  position: relative;
}

.verification-code {
  display: flex;
  gap: 12px;
}

.verification-code input {
  flex: 1;
}

.send-code-btn {
  padding: 0 20px;
  white-space: nowrap;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.send-code-btn:hover:not(:disabled) {
  background: #2980b9;
}

.send-code-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
</style>