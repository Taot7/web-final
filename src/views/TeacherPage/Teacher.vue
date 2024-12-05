<template>
  <div class="color-background">
    <!-- 顶部导航栏 -->
    <div class="topbar">
      <div class="logo">教师端</div>
      <div class="nav-links">
        <span class="nav-item" @click="$router.push({ name: 'home' })">首页</span>
        <span class="nav-item">课程中心</span>
      </div>
      <div class="user-section">
        <img class="user-avatar" src="https://via.placeholder.com/40" alt="用户头像" />
      </div>
    </div>

    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div
        class="sidebar-item"
        :class="{ active: currentPage === 'CoursewareManagement' }"
        @click="currentPage = 'CoursewareManagement'"
      >
        <span>课件管理</span>
      </div>
      <div
        class="sidebar-item"
        :class="{ active: currentPage === 'CourseRelease' }"
        @click="currentPage = 'CourseRelease'"
      >
        <span>课程发布</span>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <div class="content">
        <div v-if="currentPage === 'CoursewareManagement'">
          <CourseManage />
        </div>
        <div v-if="currentPage === 'CourseRelease'">
          <CourseRelease />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CourseManage from "@/views/TeacherPage/components/CourseManage.vue";
import CourseRelease from "@/views/TeacherPage/components/CourseRelease.vue";

const currentPage = ref<"CoursewareManagement" | "CourseRelease">(
  "CoursewareManagement"
);

</script>

<style>
/* 页面整体背景 */
.color-background {
  width: 100%;
  height: 100%;
  background-color: #f7faff; /* 可以根据需要调整 */
}

/* 主色调 */
:root {
  --primary-color: #7bd6f1;  /* 亮蓝色 */
  --secondary-color: #ffffff; /* 浅蓝色 */
}

/* 顶部导航栏样式 */
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--primary-color);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
/* 左侧导航栏样式 */
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
}

.sidebar-item {
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 15px 15px; 
  margin-bottom: 20px;  
  font-size: 16px;
  color: #333; 
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--secondary-color); /* 浅蓝色背景 */
  transition: all 0.3s ease;
  text-align: center;  /* 确保文本在居中时不被剪切 */
}

.sidebar-item:hover {
  background-color:  #ecfaff; /* 悬停时的背景色 */
}

.sidebar-item.active {
  background-color: var(--primary-color); /* 亮蓝色 */
  color: #ffffff; /* 亮蓝色时的字体颜色 */
}

/* 主内容区样式 */
.main-content {
  margin-left: 220px;
  margin-top: 60px;
  padding: 20px;
}

.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 图标字体 */
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-grid:before {
  content: "\e600";
}

.icon-task:before {
  content: "\e601";
}

.icon-exam:before {
  content: "\e602";
}

.icon-notes:before {
  content: "\e603";
}

.icon-message:before {
  content: "\e604";
}
</style>