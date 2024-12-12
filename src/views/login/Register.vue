<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>注册账号</h2>

      <!-- 添加注册类型切换tabs -->
      <div class="register-tabs">
        <div
          class="tab-item"
          :class="{ active: registerType === 'student' }"
          @click="registerType = 'student'"
        >
          学生注册
        </div>
        <div
          class="tab-item"
          :class="{ active: registerType === 'teacher' }"
          @click="registerType = 'teacher'"
        >
          教师注册
        </div>
      </div>

      <div class="form-item">
        <input
          v-model="form.userId"
          type="text"
          :placeholder="registerType === 'student' ? '请输入学号' : '请输入教职工号'"
          :class="{ error: errors.userId }"
        >
        <div class="error-tip">{{ errors.userId }}</div>
      </div>

      <div class="form-item">
        <input
          v-model="form.name"
          type="text"
          placeholder="请输入姓名"
          :class="{ error: errors.name }"
        >
        <div class="error-tip">{{ errors.name }}</div>
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
import { request } from 'http';
import { registerForStudent, registerForTeacher } from '@/services/api/user';

const router = useRouter()
const showPassword = ref(false)
const isSubmitting = ref(false)
const countdown = ref(0)
const showPrivacyPolicyDialog = ref(false)
const registerType = ref<'student' | 'teacher'>('student')

const form = reactive({
  userId: '', // 学号或教职工号
  name: '', // 姓名
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  userId: '',
  name: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  let isValid = true
  errors.userId = ''
  errors.name = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.userId) {
    errors.userId = registerType.value === 'student' ? '请输入学号' : '请输入教职工号'
    isValid = false
  }

  if (!form.name) {
    errors.name = '请输入姓名'
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
    let request = null
    if(registerType.value === 'student'){
      request = await registerForStudent({
        studentId: form.userId,
        username: form.name,
        password: form.password
      });
    }else{
      request = await registerForTeacher({
        studentId: form.userId,
        username: form.name,
        password: form.password
      });
    }
    // 注册成功
    if(request.status === 200){
      localStorage.setItem('token', request.data.token)
      alert('注册成功！！！即将跳转登录页面')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
    // 注册失败
    else{
      alert(request.data.message)
      errors.userId = '注册失败，请重试'
    }
  } catch (error: any) {
    alert(error?.response?.data?.message || '注册失败，请重试')
    errors.userId = '注册失败，请重试'
  } finally {
    isSubmitting.value = false
  }
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

/* 注册类型切换tabs样式 */
.register-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-item.active {
  color: #3498db;
  border-bottom: 2px solid #3498db;
}

.tab-item:hover {
  color: #3498db;
}
</style>