<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <img src="@/assets/try1.png" alt="优课联盟" class="logo">
      <div class="nav-links">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/course" class="nav-item">课程</router-link>
        <router-link to="/about" class="nav-item">关于我们</router-link>
      </div>
    </div>
    <div class="nav-right">
      <router-link to="/personCenter" class="user-profile">
        <img src="@/assets/account_photo.jpg" alt="用户头像" class="avatar">
        <span class="notification">14</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const userAvatar = ref('/path/to/default-avatar.png') // 替换为实际的默认头像路径
</script>

<style scoped>
.nav-bar {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  height: 40px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: #667eea;
  background: #f5f7ff;
}

.nav-right {
  display: flex;
  align-items: center;
}

.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.notification {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff5722;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  border: 2px solid white;
}
</style> 