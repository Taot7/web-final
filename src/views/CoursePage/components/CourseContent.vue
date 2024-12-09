<template>
  <div class="course-content">
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
      
      <!-- 空状态展示 -->
      <div v-if="!courseMaterials.length" class="empty-state">
        暂无课程内容
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseMaterialsByCourseId } from '@/services/api/courseMaterial'

const route = useRoute()
const courseMaterials = ref([])

// 获取课程内容
const fetchCourseMaterials = async () => {
  try {
    // 从路由中获取courseId
    const courseId = route.query.courseId
    console.log('当前路由参数:', route.query.courseId)
    console.log('当前查询参数:', route.query) 
    
    if (!courseId) {
      console.error('未找到课程ID')
      return
    }

    // 直接使用response,因为axios配置了自动返回data
    const response = await getCourseMaterialsByCourseId({ courseId })
    if (response && response.data) {
      courseMaterials.value = response.data.sort((a, b) => a.sortOrder - b.sortOrder)
    } else if (Array.isArray(response)) {
      courseMaterials.value = response.sort((a, b) => a.sortOrder - b.sortOrder)
    } else {
      console.error('获取课程内容返回格式错误:', response)
      courseMaterials.value = []
    }
  } catch (error) {
    console.error('获取课程内容失败:', error)
  }
}

// 格式化文件类型图标
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
  if (material.contentUrl) {
    window.open(material.contentUrl, '_blank')
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchCourseMaterials()
})
</script>
<style scoped>
.course-content {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  transition: all 0.3s ease;
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
</style>
