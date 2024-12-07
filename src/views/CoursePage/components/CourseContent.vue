<template>
  <div class="course-content-view">
    <div class="chapters-list">
      <div v-for="(chapter, index) in chapters" 
           :key="index" 
           class="chapter-item">
        <div class="chapter-header" @click="toggleChapter(index)">
          <span class="chapter-title">第{{ index + 1 }}章: {{ chapter.title }}</span>
          <span class="expand-icon">{{ chapter.isExpanded ? '▼' : '▶' }}</span>
        </div>
        
        <div v-show="chapter.isExpanded" class="chapter-content">
          <div v-for="(lesson, lIndex) in chapter.lessons" 
               :key="lIndex"
               class="lesson-item"
               @click="openLesson(lesson)">
            <i :class="getLessonIcon(lesson.type)"></i>
            <span class="lesson-title">{{ lesson.title }}</span>
            <span class="lesson-status" :class="lesson.status">
              {{ lesson.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-display">
      <div v-if="selectedLesson" class="lesson-detail">
        <h2>{{ selectedLesson.title }}</h2>
        <div class="lesson-media">
          <video v-if="selectedLesson.type === 'video'" 
                 :src="selectedLesson.content" 
                 controls></video>
          <div v-else-if="selectedLesson.type === 'document'" 
               class="document-viewer">
            {{ selectedLesson.content }}
          </div>
        </div>
      </div>
      <div v-else class="placeholder">
        请选择要学习的课程内容
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseContent',
  data() {
    return {
      chapters: [
        {
          title: '软件工程导论',
          isExpanded: true,
          lessons: [
            {
              title: '1.1 软件工程概述',
              type: 'video',
              content: 'video-url-1',
              status: '已完成'
            },
            {
              title: '1.2 软件生命周期',
              type: 'document',
              content: '软件生命周期文档内容...',
              status: '未开始'
            }
          ]
        },
        {
          title: '软件过程',
          isExpanded: false,
          lessons: [
            {
              title: '2.1 软件过程模型',
              type: 'video',
              content: 'video-url-2',
              status: '未开始'
            }
          ]
        }
      ],
      selectedLesson: null
    }
  },
  methods: {
    toggleChapter(index) {
      this.chapters[index].isExpanded = !this.chapters[index].isExpanded;
    },
    openLesson(lesson) {
      this.selectedLesson = lesson;
    },
    getLessonIcon(type) {
      return {
        'video': 'icon-video',
        'document': 'icon-document'
      }[type] || 'icon-default';
    }
  }
}
</script>

<style scoped>
.course-content-view {
  display: flex;
  gap: 20px;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chapters-list {
  width: 300px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chapter-header:hover {
  background: #f0f7ff;
}

.chapter-content {
  padding-left: 15px;
}

.lesson-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lesson-item:hover {
  background: #f0f7ff;
}

.lesson-status {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.lesson-status.已完成 {
  background: #e6f7e6;
  color: #4CAF50;
}

.lesson-status.未开始 {
  background: #f5f5f5;
  color: #999;
}

.content-display {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 140px);
}

.lesson-detail h2 {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.lesson-media {
  margin-top: 20px;
}

.lesson-media video {
  width: 100%;
  border-radius: 8px;
}

.document-viewer {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  min-height: 400px;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #999;
  font-size: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.icon-video::before { content: '📹'; margin-right: 8px; }
.icon-document::before { content: '📄'; margin-right: 8px; }

@media (max-width: 768px) {
  .course-content-view {
    flex-direction: column;
  }
  
  .chapters-list {
    width: 100%;
    max-height: 300px;
  }
  
  .content-display {
    margin-top: 20px;
  }
}
</style>