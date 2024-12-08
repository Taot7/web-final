<template>
  <div class="course-list">
    <div class="course-header">
      <h2>我的课程</h2>
    </div>

    <div class="course-container">
      <div v-for="course in courseList" :key="course.id" class="course-item">
        <div class="course-cover" @click="goToCourse(course.id)">
          <img :src="course.coverImage" alt="课程封面">
        </div>
        <div class="course-info">
          <h3 class="course-title">{{ course.name }}</h3>
          <div class="progress-info">
            <div class="progress-text">
              <span>待完成作业: {{ course.assignments || 0 }}</span>
              <span>已完成进度: {{ course.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: course.progress + '%' }"></div>
            </div>
          </div>
          <div class="course-meta">
            <span class="course-date">
              <i class="iconfont icon-time"></i>
              创建时间: {{ course.createTime }}
            </span>
            <span class="course-status">
              <i class="iconfont icon-status"></i>
              状态: {{ course.status === 1 ? '进行中' : course.status === 2 ? '已完成' : '未开始' }}
            </span>
          </div>
        </div>
        <div class="course-actions">
          <button class="continue-btn" @click="goToOnlineCourse(course.id)">继续学习</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCourse = (courseId) => {
  router.push('/course',{
    query: {
      courseId: courseId
    }
  })
}
const goToOnlineCourse = (courseId) => {
  router.push('/online-course',{
    query: {
      courseId: courseId
    }
  })
}

const courseList = ref([
  {
    id: 1,
    name: '大学生心理健康',
    coverImage: 'http://47.115.57.164:81/api/common/view/image?filename=20241204.f4a658b24a1d4c78bf2fcc5fcc603fca.course1.png',
    progress: 75,
    createTime: "2024-01-01",
    status: 1,
    assignments: 2
  },
  {
    id: 2, 
    name: '软件工程',
    coverImage: 'http://47.115.57.164:81/api/common/view/image?filename=20241204.176a8c98198643cea4021f2cf41e1412.coures2.png',
    progress: 30,
    createTime: "2024-01-15", 
    status: 1,
    assignments: 1
  },
  {
    id: 3,
    name: '计算机网络',
    coverImage: 'http://47.115.57.164:81/api/common/view/image?filename=20241204.3670ef8f8e584ca7a155aa45d531098e.coures3.png',
    progress: 0,
    createTime: "2024-02-01",
    status: 0,
    assignments: 0
  }
])
</script>

<style scoped>
.course-list {
  padding: 20px;
}

.course-header {
  margin-bottom: 20px;
}

.course-header h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.course-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-item {
  display: flex;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  gap: 20px;
  background: #fff;
}

.course-cover {
  width: 200px;
  height: 120px;
  overflow: hidden;
  border-radius: 4px;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-info {
  flex: 1;
}

.course-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.progress-info {
  margin: 15px 0;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.progress-bar {
  height: 6px;
  background: #eee;
  border-radius: 3px;
}

.progress {
  height: 100%;
  background: #1976d2;
  border-radius: 3px;
  transition: width 0.3s;
}

.course-date {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
}

.continue-btn {
  align-self: center;
  padding: 8px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.continue-btn:hover {
  background: #1565c0;
}
</style> 