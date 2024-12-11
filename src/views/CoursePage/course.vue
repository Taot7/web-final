<template>
  <!-- 添加导航栏 -->
  <NavBar />

  <!-- 为了防止内容被导航栏遮挡，添加顶部间距 -->
  <div class="class-page" style="padding-top: 60px;">
    <!-- 使用v-if确保数据加载后再显示内容 -->
    <template v-if="course">
      <!-- 顶部背景区域 -->
      <div class="profile-header">
        <div class="header-content">
          <!-- 添加课程封面图 -->
          <div class="course-cover">
            <img 
              :src="course.coverImage"
              :alt="course.title"
              class="cover-image"
            >
          </div>
          
          <!-- 课程信息部分 -->
          <div class="course-info">
            <h1>{{ course.title }}</h1>
            <div class="meta-info">
              <span>浏览量: {{ course.viewCount }}</span>
              <span>学生数: {{ course.studentCount }}</span>
              <span>点赞数: {{ course.likeCount }}</span>
            </div>
            <div class="join-course">
              <button class="join-button orange-button" @click="handleViewDetails">
                查看详情
              </button>
              <button 
                v-if="useUser().isStudent && !isEnrolled" 
                class="join-button orange-button" 
                @click="showJoinDialog = true"
              >
                加入课程
              </button>
              <button 
                v-if="useUser().isStudent && isEnrolled && course.status != '2'"
                class="join-button danger-button"
                @click="handleCancelCourse"
              >
                退出课程
              </button>
              <button 
                v-if="useUser().isStudent && isEnrolled && course.status == '2'"
                class="join-button enrolled-button" 
                disabled
              >
                已归档，不能退出
              </button>
              <div class="course-stats">
                <span class="stats-item">
                  <i class="heart-icon">❤️</i> {{ course.likeCount }}人关注
                </span>
                <span class="stats-item" v-if="course.allowComment">
                  <i class="share-icon">📤</i> 分享课程
                </span>
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
          <button class="confirm-btn" @click="handleConfirmJoin(course.courseId)">确定</button>
          <button class="cancel-btn" @click="showJoinDialog = false">取消</button>
        </div>
      </div>
    </div>

      <div class="main-content">
        <!-- 左侧主要内容区域 -->
        <div class="content-left">
          <!-- 课程导航 -->
          <!-- <div class="course-nav">
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
          </div> -->

          <!-- 课程内容区域 -->
          <div class="course-content">
            <!-- 课程介绍 -->
            <div v-if="currentTab === 'intro'" class="intro-section">
              <h2>课程简介</h2>
              <p style="white-space: pre-wrap">{{ course.description }}</p>
              
              <h3>课程分类</h3>
              <p>{{ course.category?.name }}</p>
            </div>

            <!-- 课程内容 -->
            <div v-if="currentTab === 'content'" class="content-section">
              <h2>课程内容</h2>
              <div class="materials-list">
                <div 
                  v-for="material in courseMaterials" 
                  :key="material.materialId"
                  class="material-item"
                  @click="handleFileClick(material)"
                >
                  <div class="material-icon">
                    {{ getFileTypeIcon(material.type) }}
                  </div>
                  <div class="material-info">
                    <div class="material-title">{{ material.title }}</div>
                    <div class="material-meta">
                      <span class="material-time">{{ material.createTime }}</span>
                    </div>
                  </div>
                </div>
                
                <div v-if="courseMaterials.length === 0" class="empty-state">
                  暂无课程内容
                </div>
              </div>
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
            <h3>课程信息</h3>
            <div class="info-item">
              <span class="label">创建时间:</span>
              <span>{{ course?.createTime || '--' }}</span>
            </div>
            <div class="info-item">
              <span class="label">更新时间:</span>
              <span>{{ course?.updateTime || '--' }}</span>
            </div>
            <div class="info-item">
              <span class="label">课程状态:</span>
              <span>{{ COURSE_STATUS[course?.status] }}</span>
            </div>
            <div class="info-item">
              <span class="label">是否推荐:</span>
              <span>{{ course.isRecommended ? '是' : '否' }}</span>
            </div>
          </div>

          <!-- 教师信息 -->
          <div class="teachers-card">
            <h3>授课教师</h3>
            <div class="teacher-list">
              <div class="teacher-item">
                <img :src="course.teacher.avatarUrl || defaultAvatar" :alt="course.teacher.nickname">
                <div class="teacher-info">
                  <div class="teacher-name">{{ course.teacher.nickname }}</div>
                  <div class="teacher-title">{{ course.teacher.roles[0]?.cname }}</div>
                  <div class="teacher-school">{{ course.teacher.signature || '暂无简介' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 添加加载状态显示 -->
    <div v-else class="loading-state">
      加载中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter, useRoute } from 'vue-router'
import { getCourse } from '@/services/api/course'
import { getCourseMaterialsByCourseId } from '@/services/api/courseMaterial'
import { addCourseEnrollment, getCourseEnrollment, getMyCourseEnrollments, quitCourseEnrollment } from '@/services/api/courseEnrollment'
import { useUser } from '@/utils/userAuth'
import { COURSE_STATUS } from '@/constant/course'

const router = useRouter()
const route = useRoute()
const course = ref<API.CourseVO>(null)
const showJoinDialog = ref(false)
const currentTab = ref('intro')
const defaultAvatar = '@/assets/default-avatar.png' // 确保你有默认头像图片
const courseMaterials = ref([])
const isEnrolled = ref(false)

// 格式化日期的函数
const formatDate = (dateArray) => {
  if (!dateArray || dateArray.length < 6) return '暂无'
  return `${dateArray[0]}-${String(dateArray[1]).padStart(2, '0')}-${String(dateArray[2]).padStart(2, '0')}`
}

// 检查学生是否已注册课程
const checkEnrollmentStatus = async (courseId) => {
  if (!useUser().isStudent) return
  
  try {
    const response = await getMyCourseEnrollments({ 
      param: {
        courseId: courseId
      }
    })
    isEnrolled.value = response?.data?.list?.[0].status == '0' || false
  } catch (error) {
    console.error('获取课程注册状态失败:', error)
  }
}

// 获取课程数据
const fetchCourseData = async () => {
  try {
    const courseId = route.params.courseId 
    if (!courseId) {
      console.error('未找到课程ID')
      return
    }
    // @ts-ignore
    const response = await getCourse({ id: courseId })
    if (response.status === 200) {
      course.value = response.data
      await checkEnrollmentStatus(courseId)
    }
  } catch (error) {
    console.error('获取课程信息失败:', error)
  }finally{
    console.log('isStudent',useUser().isStudent)
    console.log('isEnrolled',isEnrolled.value)
  }
}

// 处理查看详情
const handleViewDetails = () => {
  // 跳转到课程详情页面
  router.push({
        path: '/online-course', 
        query: { courseId: 
          course.value?.courseId 
        }
      })
}

// 处理确认加入课程
const handleConfirmJoin = async (courseId) => {
  showJoinDialog.value = false
  
  try {
    // 调用加入课程的API
    const response = await addCourseEnrollment({ courseId })
    if (response.data) {
      isEnrolled.value = true

      alert('加入课程成功')
      // 加入成功后跳转到课程页面
      router.push({
        path: '/online-course', 
        query: { courseId }
      })
    }
  } catch (error) {
    console.error('加入课程失败:', error)

    //使用原生弹窗提醒
    alert('加入课程失败'+ error.response.data.message)
  }
}
const handleCancelCourse = async () => {
  try {
    const response = await quitCourseEnrollment(
      { courseId: course.value?.courseId }
    )
    if (response.data) {
      isEnrolled.value = false
      alert('退出课程成功')
    }
  } catch (error) {
    console.error('退出课程失败:', error)
    //使用原生弹窗提醒
    alert('退出课程失败'+ error.response.data.message)
  }
}
// 获取课程内容
const fetchCourseMaterials = async (courseId) => {
  try {
    const response = await getCourseMaterialsByCourseId({ courseId })
    if (response.data) {
      courseMaterials.value = response.data.sort((a, b) => a.sortOrder - b.sortOrder)
    }
  } catch (error) {
    console.error('获取课程内容失败:', error)
  }
}

// 在课程数据加载后获取课程内容
watch(() => course.value, (newCourse) => {
  if (newCourse?.courseId) {
    fetchCourseMaterials(newCourse.courseId)
  }
})

// 格式化文件类型
const getFileTypeIcon = (type) => {
  switch (type) {
    case 1: return '📄' // 文档
    case 2: return '🎥' // 视频
    case 3: return '📊' // PPT
    default: return '📁'
  }
}

// 处理文件点击
const handleFileClick = (material) => {
  window.open(material.contentUrl, '_blank')
}

onMounted(async () => {
  await useUser().refreshUserInfo()
  await fetchCourseData()
})
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

.enrolled-button {
  background-color: #8e8e8e;
  cursor: not-allowed;
}

.enrolled-button:hover {
  background-color: #8e8e8e;
  transform: none;
  box-shadow: none;
}

.danger-button {
  background-color: #dc3545;
  color: white;
}

.danger-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
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

.materials-list {
  margin-top: 20px;
}

.material-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.material-item:hover {
  background-color: #f5f7fa;
}

.material-icon {
  font-size: 24px;
  margin-right: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  border-radius: 8px;
}

.material-info {
  flex: 1;
}

.material-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.material-meta {
  font-size: 12px;
  color: #999;
}

.material-time {
  margin-right: 15px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}

.content-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-section h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
</style>
