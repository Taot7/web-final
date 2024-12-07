<template>
  <!-- 添加导航栏 -->
  <NavBar />
  
  <!-- 为了防止内容被导航栏遮挡，添加顶部间距 -->
  <div class="class-page" style="padding-top: 60px;">
    <!-- 顶部背景区域 -->
    <div class="profile-header">
      <div class="header-content">
        <!-- 添加课程封面图 -->
        <div class="course-cover">
          <img 
            src="@/assets/try2.png" 
            alt="课程封面"
            class="cover-image"
          >
        </div>
        
        <!-- 课程信息部分 -->
        <div class="course-info">
          <h1>云计算基础及应用</h1>
          <div class="meta-info">
            <span>本课程分: 70分</span>
            <span>课程时长: 1小时30分钟</span>
          </div>
          <div class="join-course">
            <button class="join-button orange-button" @click="showJoinDialog = true">
              加入课程
            </button>
            <div class="course-stats">
              <span class="stats-item"><i class="heart-icon">❤️</i> 90人关注</span>
              <span class="stats-item"><i class="share-icon">📤</i> 分享课程</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加入课程确认弹窗 -->
    <div class="dialog-overlay" v-if="showJoinDialog" @click="showJoinDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h3>确认提示</h3>
          <span class="close-btn" @click="showJoinDialog = false">×</span>
        </div>
        <div class="dialog-body">
          <p>请确认您选择的课程:</p>
          <h4>2024秋季学期</h4>
          <p class="target-audience">适用人群: 计算机及相关专业学生</p>
        </div>
        <div class="dialog-footer">
          <button class="confirm-btn" @click="handleConfirmJoin">确定</button>
          <button class="cancel-btn" @click="showJoinDialog = false">取消</button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧主要内容区域 -->
      <div class="content-left">
        <!-- 课程导航 -->
        <div class="course-nav">
          <ul>
            <li 
              v-for="tab in tabs" 
              :key="tab.key"
              :class="{ active: currentTab === tab.key }"
              @click="currentTab = tab.key"
            >
              {{ tab.name }}
            </li>
          </ul>
        </div>

        <!-- 课程内容区域 -->
        <div class="course-content">
          <!-- 课程介绍 -->
          <div v-if="currentTab === 'intro'" class="intro-section">
            <h2>课程简介</h2>
            <p>本课程主要介绍房地产经纪人的基本工作内容、工作流程及相关法律法规等内容。通过本课程的学习，学员可以掌握房地产经纪人的基本工作技能和专业知识。</p>
            
            <h3>课程目标</h3>
            <ul>
              <li>了解房地产经纪行业的基本概况</li>
              <li>掌握房地产交易流程</li>
              <li>熟悉相关法律法规</li>
              <li>提升专业服务能力</li>
            </ul>
          </div>

          <!-- 课程内容 -->
          <div v-if="currentTab === 'content'" class="content-section">
            <h2>课程内容</h2>
            <!-- 这里添加课程内容的具体展示 -->
          </div>

          <!-- 考核内容 -->
          <div v-if="currentTab === 'exam'" class="exam-section">
            <h2>考核内容</h2>
            <!-- 这里添加考核内容的具体展示 -->
          </div>

          <!-- 技能认证 -->
          <div v-if="currentTab === 'cert'" class="cert-section">
            <h2>技能认证</h2>
            <!-- 这里添加技能认证的具体展示 -->
          </div>

          <!-- 认证流程 -->
          <div v-if="currentTab === 'process'" class="process-section">
            <h2>认证流程</h2>
            <!-- 这里添加认证流程的具体展示 -->
          </div>
        </div>
      </div>

      <!-- 右侧课程信息和教师团队 -->
      <div class="content-right">
        <!-- 课程基本信息 -->
        <div class="course-info-card">
          <h3>2024秋季学期</h3>
          <div class="info-item">
            <span class="label">开课时间:</span>
            <span>2024.09.01 - 2024.12.18</span>
          </div>
          <div class="info-item">
            <span class="label">建议学分:</span>
            <span>2.0分</span>
          </div>
          <div class="info-item">
            <span class="label">建议学时:</span>
            <span>36学时</span>
          </div>
          <div class="info-item">
            <span class="label">教学模式:</span>
            <span>阅兴模式</span>
          </div>
        </div>

        <!-- 教师团队 -->
        <div class="teachers-card">
          <h3>教学团队</h3>
          <div class="teacher-list">
            <div class="teacher-item" v-for="teacher in teachers" :key="teacher.id">
              <img :src="teacher.avatar" :alt="teacher.name">
              <div class="teacher-info">
                <div class="teacher-name">{{ teacher.name }}</div>
                <div class="teacher-title">{{ teacher.title }}</div>
                <div class="teacher-school">{{ teacher.school }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'

// 获取路由实例
const router = useRouter()

// 定义标签页数据
const tabs = [
  { key: 'intro', name: '课程介绍' },
  { key: 'content', name: '课程内容' },
  { key: 'exam', name: '考核内容' },
  { key: 'cert', name: '技能认证' },
  { key: 'process', name: '认证流程' }
]

// 当前激活的标签页
const currentTab = ref('intro')

// 教师数据
const teachers = [
  {
    id: 1,
    name: '明仲',
    title: '教授',
    school: '深圳大学',
    avatar: '/path/to/teacher1.jpg'
  },
  {
    id: 2,
    name: '李坚强',
    title: '教授',
    school: '深圳大学',
    avatar: '/path/to/teacher2.jpg'
  }
]

// 控制弹窗显示
const showJoinDialog = ref(false)

// 处理确认加入
const handleConfirmJoin = () => {
  showJoinDialog.value = false
  // 携带参数跳转
  router.push({
    path: '/online-course',
    query: {
      courseId: 'xxx', // 课程ID
      courseName: '云计算基础及应用' // 课程名称
    }
  })
}
</script>

<style scoped>
.class-page {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
}

.profile-header {
  margin-top: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 150px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  gap: 40px;
  align-items: center;
}

.course-cover {
  flex-shrink: 0;
  width: 280px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cover-image:hover {
  transform: scale(1.05);
}

.course-info {
  flex: 1;
}

.course-info h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.meta-info {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.meta-info span {
  margin-right: 20px;
  font-size: 14px;
}

.course-nav {
  background: #fff;
  padding: 0 150px;
  border-bottom: 1px solid #eee;
}

.course-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
}

.course-nav li {
  padding: 15px 30px;
  cursor: pointer;
  position: relative;
  color: #666;
  transition: all 0.3s ease;
}

.course-nav li.active {
  color: #667eea;
}

.course-nav li.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #667eea;
}

.course-nav li:hover {
  color: #667eea;
}

.course-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 150px;
  background: #fff;
}

.intro-section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

/* 添加内容切换动画 */
.intro-section,
.content-section,
.exam-section,
.cert-section,
.process-section {
  animation: fadeIn 0.3s ease;
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

.main-content {
  display: flex;
  gap: 30px;
  padding: 0 150px;
  margin-top: 20px;
}

.content-left {
  flex: 1;
  min-width: 0;
}

.content-right {
  width: 300px;
  flex-shrink: 0;
}

.course-info-card,
.teachers-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.course-info-card h3,
.teachers-card h3 {
  font-size: 18px;
  color: #333;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.info-item {
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.info-item .label {
  color: #999;
  margin-right: 8px;
}

.teacher-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.teacher-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.teacher-item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.teacher-info {
  flex: 1;
}

.teacher-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.teacher-title,
.teacher-school {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

/* 弹窗遮罩层 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 弹窗内容 */
.dialog-content {
  background: white;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: dialogFadeIn 0.3s ease;
}

/* 弹窗头部 */
.dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-btn {
  font-size: 24px;
  color: #999;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: #666;
}

/* 弹窗主体 */
.dialog-body {
  padding: 24px;
}

.dialog-body p {
  margin: 0 0 12px 0;
  color: #666;
}

.dialog-body h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
}

.target-audience {
  color: #ff6b35 !important;
  font-size: 14px;
}

/* 弹窗底部 */
.dialog-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.confirm-btn,
.cancel-btn {
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.confirm-btn {
  background: #ff6b35;
  color: white;
}

.confirm-btn:hover {
  background: #ff5722;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e8e8e8;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.join-course {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.join-button {
  background-color: #ff6b35;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.join-button:hover {
  background-color: #ff5722;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
}

.course-stats {
  display: flex;
  align-items: center;
  gap: 15px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.course-stats span {
  cursor: pointer;
  transition: color 0.3s ease;
}

.course-stats span:hover {
  color: white;
}

/* 可以添加一个橙色按钮的通用类 */
.orange-button {
  background-color: #ff6b35;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.orange-button:hover {
  background-color: #ff5722;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
}
</style>


