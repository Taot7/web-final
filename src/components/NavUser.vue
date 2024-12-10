<template>
  <!-- 导航用户组件 -->
  <div class="nav-user">
    <!-- 未登录时显示登录按钮 -->
    <div
      v-if="!isLoggedIn"
      class="nav-item login-btn"
      @click="$router.push({ name: 'login' })"
    >
      <i class="fas fa-sign-in-alt"></i>
      登录
    </div>

    <!-- 登录后显示用户信息和下拉菜单 -->
    <div v-else class="user-profile">
      <div class="profile-container" @mouseenter="showDropdown = true">
        <div class="avatar-wrapper" @click="goToPersonalCenter">
          <img
            :src="userInfo.avatarUrl || '/src/assets/default-avatar.png'"
            alt="用户头像"
            class="user-avatar"
          />
        </div>
      </div>

      <!-- 下拉菜单 -->
      <div
        class="dropdown-menu"
        v-show="showDropdown"
        @mouseenter="showDropdown = true"
        @mouseleave="showDropdown = false"
      >
        <div class="user-info">
          <img
            :src="userInfo.avatarUrl || '/src/assets/default-avatar.png'"
            alt="用户头像"
            class="menu-avatar"
          />
          <div class="user-details">
            <div class="user-name">{{ userInfo.nickname || "用户" }}</div>
            <div class="user-role">
              <span v-for="(role, index) in userInfo.roles" :key="index" class="role-tag">
                {{ role.cname }}
              </span>
            </div>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" @click="goToPersonalCenter">
          <i class="fas fa-user"></i> 个人中心
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i> 退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const {userInfo,isLoggedIn} = defineProps<{
  userInfo: API.UserVO;
  isLoggedIn: boolean;
}>();

const emit = defineEmits<{
  (e: "personal-center"): void;
  (e: "logout"): void;
}>();

const showDropdown = ref(false);

const goToPersonalCenter = () => {
  emit("personal-center");
};

const handleLogout = () => {
  emit("logout");
};
</script>

<style scoped>
.nav-user {
  display: inline-block;
}

.login-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-btn:hover {
  background-color: #0056b3;
}

.user-profile {
  position: relative;
}

.profile-container {
  cursor: pointer;
  padding: 4px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 200px;
  z-index: 1000;
}

.dropdown-menu::before {
  content: "";
  position: absolute;
  top: -8px;
  right: 16px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}

.user-info {
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

.menu-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.user-role {
  color: #666;
  font-size: 12px;
  margin-top: 2px;
}

.dropdown-item {
  padding: 10px 16px;
  color: #333;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.dropdown-item i {
  margin-right: 8px;
  font-size: 14px;
  width: 16px;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.dropdown-divider {
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
}
</style>
