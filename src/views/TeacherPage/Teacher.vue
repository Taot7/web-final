<template>
  <div class="color-background">
    <!-- 顶部导航栏 -->
    <div class="topbar">
      <div class="logo">教师端</div>
      <div class="nav-links">
        <span class="nav-item" @click="$router.push({ name: 'home' })">首页</span>
      </div>
      <div class="user-section">
      </div>
    </div>

    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div
        class="sidebar-item"
        :class="{ active: currentPage === 'CourseManage' }"
        @click="currentPage = 'CourseManage'"
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
      <div
        class="sidebar-item"
        :class="{ active: currentPage === 'ReleaseTest' }"
        @click="currentPage = 'ReleaseTest'"
      >
        <span>发布测试</span>
      </div>
      <div
        class="sidebar-item"
        :class="{ active: currentPage === 'StudentManage' }"
        @click="currentPage = 'StudentManage'"
      >
        <span>学生用户管理</span>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <div class="content">
        <div v-if="currentPage === 'CourseManage'">
          <CourseManage />
        </div>
        <div v-if="currentPage === 'CourseRelease'">
          <CourseRelease />
        </div>
        <div v-if="currentPage === 'StudentManage'">
          <StudentManage/>
        </div>
        <div v-if="currentPage === 'ReleaseTest'">
          <ReleaseTest/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CourseManage from "@/views/TeacherPage/components/CourseManage.vue";
import CourseRelease from "@/views/TeacherPage/components/CourseRelease.vue";
import StudentManage from "@/views/TeacherPage/components/StudentManage.vue";
import ReleaseTest from "@/views/TeacherPage/components/ReleaseTest.vue";

const currentPage = ref<"CourseManage" | "CourseRelease" | "StudentManage" | "ReleaseTest">(
  "CourseManage"
);
</script>

<style scoped>
/* 页面整体背景 */
.color-background {
  width: 100%;
  height: 100%;
  background-color: #f7faff; /* 浅蓝色背景 */
}

/* 主色调 */
:root {
  --primary-color: #007bff; /* 蓝色 */
  --hover-background: #eaf4ff; /* 浅蓝色悬停背景 */
  --active-background: #f0f8ff; /* 浅蓝色激活背景 */
  --text-color: #333; /* 默认字体颜色 */
  --active-text-color: #007bff; /* 激活字体颜色 */
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
  color: var(--text-color);
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

/* 左侧导航栏样式修改 */
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 200px;
  background-color: #ffffff; 
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  border-radius: 8px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  font-size: 16px;
  color: #333333; 
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-item:hover {
  background-color: #f6fcff; 
  color:#4cadee;
}

.sidebar-item.active {
  background-color: #ecf8ff;
  border-right: 4px solid #66adff; 
  color:#1b8cd8;
}

/* 主内容区样式 */
.main-content {
  margin-left: 210px;
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
</style>