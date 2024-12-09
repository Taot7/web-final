<template>
  <div class="account-page">
    <!-- 返回首页按钮 -->
    <div class="back-home" @click="$router.push({ name: 'home' })">
      <i class="iconfont icon-home"></i>
      返回首页
    </div>

    <!-- 顶部背景和个人信息 -->
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar" @click="triggerFileInput">
          <img :src="userInfo.avatarUrl ||'/src/assets/default-avatar.png'" alt="用户头像" />
          <input
            type="file"
            ref="fileInput"
            class="file-input"
            accept="image/*"
            @change="handleAvatarChange"
          />
          <div class="avatar-overlay">
            <i class="iconfont icon-camera"></i>
            <span>更换头像</span>
          </div>
        </div>
        <div class="info-content">
          <h2>{{ userInfo.nickname }}</h2>
          <div class="user-id">[ ID: {{ userInfo.userId }} ]</div>
          <div class="school-info">
            {{ userInfo.signature || "这个人很懒,什么都没写" }}
          </div>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="stats">
        <div class="stat-item">
          <div class="number">{{ stats.studying ||3 }}</div>
          <div class="label">正在学习课程</div>
        </div>
        <div class="stat-item">
          <div class="number">{{ stats.total ||12 }}</div>
          <div class="label">累计学习课程</div>
        </div>
        <div class="stat-item">
          <div class="number">{{ stats.posts ||25 }}</div>
          <div class="label">发布的讨论</div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧菜单 -->
      <div class="left-menu">
        <div
          class="menu-item"
          :class="{ active: currentTab === 'courses' }"
          @click="currentTab = 'courses'"
        >
          <i class="iconfont icon-book"></i>
          我的课程
        </div>
        <div
          class="menu-item"
          :class="{ active: currentTab === 'todos' }"
          @click="currentTab = 'todos'"
        >
          <i class="iconfont icon-todo"></i>
          个人待办事项
        </div>
        <div
          class="menu-item"
          :class="{ active: currentTab === 'notes' }"
          @click="currentTab = 'notes'"
        >
          <i class="iconfont icon-notes"></i>
          学习笔记
        </div>
        <div
          class="menu-item"
          :class="{ active: currentTab === 'discussions' }"
          @click="currentTab = 'discussions'"
        >
          <i class="iconfont icon-discussion"></i>
          我的讨论
        </div>
        <div
          class="menu-item"
          :class="{ active: currentTab === 'settings' }"
          @click="currentTab = 'settings'"
        >
          <i class="iconfont icon-settings"></i>
          信息设置
        </div>
      </div>

      <!-- 右侧内容区 -->
      <div class="right-content">
        <!-- 我的课程模块 -->
        <div v-if="currentTab === 'courses'" class="content-section">
          <CourseList />
        </div>

        <!-- 个人待办事项模块 -->
        <div v-if="currentTab === 'todos'" class="content-section">
          <TodoList />
        </div>

        <!-- 学习笔记模块 -->
        <div v-if="currentTab === 'notes'" class="content-section">
          <NoteList />
        </div>

        <!-- 我的讨论模块 -->
        <div v-if="currentTab === 'discussions'" class="content-section">
          <DiscussionList />
        </div>

        <!-- 信息设置模块 -->
        <div v-if="currentTab === 'settings'" class="content-section">
          <UserSettings 
            ref="userSettingsRef"
            :initial-user-info="userInfo"
            @save-info="handleSaveUserInfo"
            @update-user-data="handleSaveUserInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CourseList from "@/views/PersonCenter/components/CourseList.vue";
import TodoList from "@/views/PersonCenter/components/TodoList.vue";
import NoteList from "@/views/PersonCenter/components/NoteList.vue";
import DiscussionList from "@/views/PersonCenter/components/DiscussionList.vue";
import UserSettings from "@/views/PersonCenter/components/UserSettings.vue";
import { uploadImage } from "@/services/api/commonController";
import { updateUser } from "@/services/api/userManagement";
import { useUser } from "@/utils/userAuth";
import { getMyCourseEnrollments } from "@/services/api/courseEnrollment";
import { getCurrentUser } from '@/services/api/user'
import type { ComponentPublicInstance } from 'vue'
import { getMyDiscussions } from "@/services/api/discussion";
const { isTeacher,getCurrentUserInfo} = useUser();
const currentTab = ref("courses");
const fileInput = ref<HTMLInputElement | null>(null);

// 定义 UserSettings 组件的 ref
const userSettingsRef = ref<InstanceType<typeof UserSettings> | null>(null)

const userInfo = ref<API.UserVO>({
  nickname: "Jscomet",
  username: "20240011211",
  avatarUrl:
    "http://47.115.57.164:81/api/common/view/image?filename=20241204.697b4a9a952b438cbd4d571c44811ded.avtar.jpg",
  signature: "深圳大学 - 计算机科学与技术学院 - 计算机科学与计算专业",
  email: "liming@szu.edu.cn",
});


const reloadUserInfo=async()=>{

  const request = await getCurrentUserInfo()
  userInfo.value = request;
  console.log('userInfo',userInfo.value)
}
const stats = ref({
  studying: 3,
  total: 12,
  posts: 25,
});
//获取统计数据
const reloadStats=async ()=>{
  const studyingCourese=await getMyCourseEnrollments(
    {
      current:1,
      pageSize:1,
      param:{
        status:"1"
      }
    }
  )
  //进行中的课程
  stats.value.studying=studyingCourese.data.total
  const totalCoures= await getMyCourseEnrollments({
    current:1,
    pageSize:1,
    param:{
    }
  }) 
  stats.value.total=totalCoures.data.total
  //发起的讨论
  const discussionPosts=await getMyDiscussions({
    current:1,
    pageSize:1,
    param:{}
  })
  stats.value.posts=discussionPosts.data.total
}
//进入页面时获取用户信息
onMounted(async () => {
  userInfo.value = await getCurrentUserInfo()
  await reloadStats()
  
  console.log('isTeacher',isTeacher)
});

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 处理头像更改
const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    userInfo.value.avatarUrl = response.data;

    // 更新用户信息
    const request = await updateUser({
      id: userInfo.value.userId
    },{
      avatarUrl: response.data
    })
    console.log('request',request)
    reloadUserInfo()
  } catch (error) {
    alert("上传失败,请重试");
  }
};

// 加载用户信息
const loadUserInfo = async () => {
  try {
    const response = await getCurrentUser()
    userInfo.value = response.data
    // 更新子组件的用户信息
    if (userSettingsRef.value) {
      userSettingsRef.value.updateUserData(response.data)
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// 处理保存用户信息
const handleSaveUserInfo = async () => {
  if (userSettingsRef.value) {
    console.log('PersonCenter,刷新用户信息')
    await loadUserInfo()
    await reloadStats() 
  }
}

onMounted(async () => {
  await loadUserInfo()
  await reloadStats()
})

</script>

<style scoped>
.account-page {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
}

/* 返回首页按钮样式 */
.back-home {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  color: #667eea;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.back-home:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 150px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover img {
  transform: scale(1.1);
}

.avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-overlay i {
  font-size: 20px;
  margin-bottom: 2px;
}

.avatar-overlay span {
  font-size: 10px;
}

.file-input {
  display: none;
}

.info-content h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.user-id {
  color: rgba(255, 255, 255, 0.9);
  margin: 4px 0;
  font-size: 14px;
}

.school-info {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.stat-item .number {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 3px;
}

.stat-item .label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.main-content {
  display: flex;
  padding: 30px 80px;
  gap: 30px;
}

.left-menu {
  width: 220px;
  background: #fff;
  border-radius: 12px;
  padding: 15px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.menu-item {
  padding: 15px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #666;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: #f8f9fa;
  color: #667eea;
}

.menu-item.active {
  background: #f0f4ff;
  color: #667eea;
  border-right: 3px solid #667eea;
}

.menu-item i {
  margin-right: 12px;
  font-size: 20px;
}

.right-content {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.content-section {
  animation: fadeIn 0.3s ease;
}

.tab-header {
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 25px;
}

.tab-item {
  padding: 12px 25px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-item:hover {
  color: #667eea;
}

.tab-item.active {
  color: #667eea;
  border-bottom: 2px solid #667eea;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
