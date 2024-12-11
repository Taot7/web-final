<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <div class="nav-links">
        <router-link to="/" class="nav-item" style="text-decoration: none; color: #333; font-size: 18px; font-weight: 600; padding: 10px 20px; border-radius: 6px; transition: all 0.3s ease; background: linear-gradient(to right, #fff, #f5f5f5); box-shadow: 0 2px 4px rgba(0,0,0,0.1); hover:background: linear-gradient(to right, #f5f5f5, #eee);">首页</router-link>
      </div>
    </div>
    <div class="nav-right">
      <router-link 
        v-if="useUser().isLoggedIn"
        to="/personCenter"  
        class="user-profile"
      >
        <img :src="useUser().currentUser?.value?.avatarUrl || '/src/assets/default-avatar.png'" alt="用户头像" class="avatar">
        <!-- <span class="notification">14</span> -->
      </router-link>
      <router-link 
        v-else
        to="/login" 
        class="nav-item"
      >
        登录
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/utils/userAuth'
import { onMounted } from 'vue'

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
  margin-left:100px;
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