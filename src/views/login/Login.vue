<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>用户登录</h2>

      <div class="form-item">
        <input
          v-model="form.username"
          type="text"
          placeholder="学号/教职工号"
          :class="{ error: errors.username }"
        />
        <div class="error-tip">{{ errors.username }}</div>
      </div>

      <div class="form-item">
        <div class="password-input">
          <input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :class="{ error: errors.password }"
          />
        </div>
        <div class="error-tip">{{ errors.password }}</div>
      </div>

      <div class="login-options">
        <label class="remember-me">
          <input type="checkbox" v-model="form.rememberMe" />
          <span>记住密码</span>
        </label>
        <a class="forgot-password" @click="router.push('/forgot-password')">
          忘记密码？
        </a>
      </div>

      <button class="submit-btn" :disabled="isSubmitting" @click="handleSubmit">
        {{ isSubmitting ? "登录中..." : "登录" }}
      </button>

      <div class="bottom-actions">
        <div class="privacy-policy">
          登录即表示同意
          <a @click="showPrivacyPolicy">《隐私政策》</a>
        </div>
        <div class="auth-link">
          还没有账号？<a @click="router.push('/register')">立即注册</a>
        </div>
      </div>
    </div>
    <PrivacyPolicyDialog v-model:visible="showPrivacyPolicyDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import PrivacyPolicyDialog from "@/components/PrivacyPolicyDialog.vue";
import { loginByPassword } from "@/services/api/user";

const router = useRouter();
const showPassword = ref(false);
const isSubmitting = ref(false);
const showPrivacyPolicyDialog = ref(false);

const form = reactive({
  username: "",
  password: "",
  rememberMe: false,
});

const errors = reactive({
  username: "",
  password: "",
});

const validateForm = () => {
  let isValid = true;
  errors.username = "";
  errors.password = "";

  if (!form.username) {
    errors.username = "请输入用户名或手机号";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "请输入密码";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    // 模拟登录请求
    const request = await loginByPassword({
      studentId: form.username,
      password: form.password,
    });
    console.log(request)
    if (request.status === 200) {
      localStorage.setItem("token", request.data.token);
      alert("登录成功！！！，即将跳转首页");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } else {
      alert(request);
      errors.username = "学号/学工号或密码错误";
    }
  } catch (error: any) {
    errors.username = "学号/学工号或密码错误";
  } finally {
    isSubmitting.value = false;
  }
};

const showPrivacyPolicy = () => {
  showPrivacyPolicyDialog.value = true;
};
</script>

<style scoped>
@import "./styles/auth.css";

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -10px 2px 20px;
  padding: 0 2px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  color: #606266;
  font-size: 13px;
}

.remember-me input[type="checkbox"] {
  margin: 0;
  width: 14px;
  height: 14px;
  cursor: pointer;
  accent-color: #409eff;
}

.remember-me span {
  position: relative;
  top: 1px;
}

.forgot-password {
  color: #909399;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  padding: 4px;
}

.forgot-password:hover {
  color: #409eff;
}

/* 覆盖一些 auth.css 中的样式 */
.form-item {
  margin-bottom: 25px;
}

.submit-btn {
  margin-top: 5px;
  font-weight: 500;
  height: 40px;
}

.bottom-actions {
  margin-top: 25px;
}

.password-input i {
  color: #c0c4cc;
}

.password-input i:hover {
  color: #909399;
}
</style>
