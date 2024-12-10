<template>
  <div class="course-content-layout">
    <!-- 左侧视频播放区域 -->
    <div class="video-section">
      <div v-if="isLoading" class="loading-state">
        加载中...
      </div>
      <div v-else-if="currentVideo" class="video-player-container">
        <video
          ref="videoPlayer"
          controls
          class="video-player"
          :key="currentVideo.materialId"
        >
          <source :src="currentVideo.contentUrl" type="video/mp4">
          您的浏览器不支持视频播放
        </video>
        <div class="video-title">{{ currentVideo.title }}</div>
      </div>
      <div v-else class="empty-player">
        请选择要播放的视频
      </div>
    </div>

    <!-- 右侧课程目录 -->
    <div class="course-catalog">
      <div class="catalog-header">课程目录</div>
      <div class="materials-list">
        <div 
          v-for="material in courseMaterials" 
          :key="material.materialId"
          class="material-item"
          :class="{ 
            'active': currentVideo?.materialId === material.materialId,
            'is-video': material.type === 2
          }"
          @click="handleFileClick(material)"
        >
          <div class="material-icon">
            {{ getFileTypeIcon(material.type) }}
          </div>
          <div class="material-info">
            <div class="material-title">
              {{ material.title }}
              <span class="file-type-hint" v-if="material.type === 2">
                [视频播放]
              </span>
            </div>
            <div class="material-meta">
              <span class="material-time">{{ material.createTime }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="!courseMaterials.length && !isLoading" class="empty-state">
          暂无课程内容
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseMaterialsByCourseId } from '@/services/api/courseMaterial'
import { ElMessage } from 'element-plus'

const route = useRoute()
const courseMaterials = ref([])
const currentVideo = ref(null)
const isLoading = ref(false)

// 获取课程内容
const fetchCourseMaterials = async () => {
  isLoading.value = true
  try {
    const courseId = route.query.courseId
    console.log('正在���取课程内容，课程ID:', courseId)
    
    if (!courseId) {
      console.error('未找到课程ID')
      return
    }

    // 重置当前播放的视频
    currentVideo.value = null
    courseMaterials.value = []

    const response = await getCourseMaterialsByCourseId({ courseId })
    console.log('获取到的课程内容:', response)

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
    ElMessage.error('获取课程内容失败')
  } finally {
    isLoading.value = false
  }
}

// 处理文件点击
const handleFileClick = (material) => {
  console.log('点击的文件:', material)
  
  if (!material.contentUrl) {
    ElMessage.warning('文件链接不存在')
    return
  }

  const isVideo = material.type === 2 || 
    /\.(mp4|webm|ogg|mov)$/i.test(material.contentUrl)

  if (isVideo) {
    currentVideo.value = null // 先清空当前视频
    setTimeout(() => {  // 使用 setTimeout 确保 DOM 更新
      currentVideo.value = material
      console.log('设置当前视频:', currentVideo.value)
    }, 100)
  } else {
    const link = document.createElement('a')
    link.href = material.contentUrl
    link.target = '_blank'
    
    const shouldDownload = material.type === 1 || 
      /\.(doc|docx|pdf|ppt|pptx|xls|xlsx)$/i.test(material.contentUrl)
    
    if (shouldDownload) {
      link.download = material.title || '文件下载'
    }
    
    link.click()
  }
}

// 监听路由参数变化
watch(
  () => route.query.courseId,
  (newCourseId, oldCourseId) => {
    console.log('路由参数变化:', oldCourseId, '->', newCourseId)
    if (newCourseId && newCourseId !== oldCourseId) {
      fetchCourseMaterials()
    }
  },
  { immediate: true }
)

// 格式化文件类型图标
const getFileTypeIcon = (type) => {
  switch (type) {
    case 1: return '📄'
    case 2: return '🎥'
    case 3: return '📊'
    default: return '📁'
  }
}

onMounted(() => {
  if (route.query.courseId) {
    fetchCourseMaterials()
  }
})
</script>

<style scoped>
.course-content-layout {
  display: flex;
  height: calc(100vh - 60px);
  background: #f5f7fa;
}

.video-section {
  flex: 1;
  background: #f5f7fa;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.video-player-container {
  width: 100%;
  max-width: 800px;
  height: auto;
  max-height: 70vh;
  aspect-ratio: 16 / 9;
  background: #fff;
  margin: 0 auto;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
}

.video-title {
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  border-top: 1px solid #eee;
}

.empty-player {
  color: #666;
  font-size: 16px;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.course-catalog {
  width: 300px;
  background: #fff;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.catalog-header {
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
}

.materials-list {
  flex: 1;
  overflow-y: auto;
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

.material-item.active {
  background-color: #e6f7ff;
  border-right: 3px solid #1890ff;
}

.material-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  border-radius: 4px;
}

.material-info {
  flex: 1;
  overflow: hidden;
}

.material-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.material-meta {
  font-size: 12px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}

.file-type-hint {
  font-size: 12px;
  color: #1890ff;
  margin-left: 8px;
}

.material-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 16px;
}

.is-video {
  cursor: pointer;
}

.is-video:hover {
  background-color: #f0f7ff;
}

@media screen and (max-width: 1366px) {
  .video-player-container {
    max-width: 640px;
  }
}

@media screen and (max-width: 1024px) {
  .video-player-container {
    max-width: 540px;
  }
}
</style>
