<template>
  <div class="course-page">
    <!-- 导航栏 -->
    <NavBar />

    <div class="main-content">
      <!-- 左侧导航和信息 -->
      <div class="sidebar">
        <!-- 课程封面和信息 -->
        <div class="course-cover">
          <img :src="course?.coverImage" alt="课程封面" class="cover-image">
          <div class="course-details">
            <h2>{{ course?.title }}</h2>
            <p>教师: {{ course?.teacher?.nickname }} / 深圳大学 </p>
            <p>进度: 课程已进行 15/18 周</p>
            <button @click="startLearning">开始学习</button>
          </div>
        </div>

        <!-- 导航菜单 -->
        <ul class="menu">
          <li v-for="(item, index) in menuItems" 
              :key="index"
              :class="{ active: currentMenuItem === index }"
              @click="handleMenuClick(item, index)">
            <span>{{ item.name }}</span>
            <i :class="item.icon" class="menu-icon"></i>
          </li>
          
          <!-- 子菜单 -->
          <transition name="submenu">
            <ul class="submenu" v-if="showSubMenu && currentMenuItem === 5"> <!-- 5是考核选项的索引 -->
              <li v-for="(subItem, subIndex) in examSubMenu" 
                  :key="subIndex"
                  @click="handleSubMenuClick(subItem)">
                <span>{{ subItem.name }}</span>
                <i :class="subItem.icon" class="menu-icon"></i>
              </li>
            </ul>
          </transition>
        </ul>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content-right">
        <!-- 根据当前选中的菜单项显示不同内容 -->
        <template v-if="currentMenuItem === 3">
          <CourseContent />
        </template>
        <template v-else-if="currentMenuItem === 5">
          <CourseQuiz />
        </template>
        <template v-else-if="currentMenuItem === 6">
          <CourseHomework />
        </template>
        <template v-else-if="currentMenuItem === 4">
          <CourseDiscussion />
        </template>
        <template v-else>
          <!-- 原有的成绩进度内容 -->
          <div class="course-announcement">
            <div class="announcement-header">
              <h3>最新课程公告</h3>
              <div class="more-options" @click="toggleMoreOptions" ref="moreBtn">
                <i class="more-icon" style="color: #4CAF50">更多></i>
                <!-- 弹出菜单 -->
                <div class="popup-menu" v-if="showMoreOptions">
                  <div class="menu-item" @click="handleViewAll">查看全部</div>
                  <div class="menu-item" @click="handleMarkRead">标记已读</div>
                  <div class="menu-item" @click="handleShare">分享</div>
                </div>
              </div>
            </div>
            <p>{{ announcement }}</p>
          </div>
          <div class="course-progress">
            <h3>线上成绩进度</h3>
            <table>
              <thead>
                <tr>
                  <th>考核项</th>
                  <th>权重</th>
                  <th>任务数</th>
                  <th>完成数</th>
                  <th>平均分数</th>
                  <th>完成进度</th>
                  <th>加权得分</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in progressItems" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.weight }}</td>
                  <td>{{ item.tasks }}</td>
                  <td>{{ item.completed }}</td>
                  <td>{{ item.averageScore }}</td>
                  <td>{{ item.progress }}</td>
                  <td>{{ item.weightedScore }}</td>
                </tr>
              </tbody>
            </table>
            <p>当前得分: {{ currentScore }}</p>
          </div>
          <div class="score-explanation">
            <div class="explanation-tabs">
              <div class="tab active">计算规则说明</div>
            </div>
            <div class="explanation-content">
              <div class="rule-item">
                <span class="rule-label">平均分数</span>
                <span class="rule-equals">=</span>
                <span class="rule-formula">每次完成该项任务的分数之和 / 完成该项任务次数，若视频每次均满分</span>
              </div>
              <div class="rule-item">
                <span class="rule-label">进度</span>
                <span class="rule-equals">=</span>
                <span class="rule-formula">完成该项任务数 / 该项任务总数，讨论不进度概念</span>
              </div>
              <div class="rule-item">
                <span class="rule-label">加权得分</span>
                <span class="rule-equals">=</span>
                <span class="rule-formula">平均分数 × 完成进度 × 权重</span>
              </div>
              <div class="rule-item conditions">
                <span class="rule-label">参加考试的条件：</span>
                <span class="condition-item">视频达名数，满足任务数）/视测验任务总数 > 50.0%，</span>
                <span class="condition-item highlight">【您已完成：91%】</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CourseContent from './components/CourseContent.vue';
import CourseQuiz from './components/CourseQuiz.vue';
import CourseHomework from './components/CourseHomework.vue';
import CourseDiscussion from './components/CourseDiscussion.vue';
import { getCourse } from '@/services/api/course';

export default {
  components: {
    NavBar,
    CourseContent,
    CourseQuiz,
    CourseHomework,
    CourseDiscussion
  },
  data() {
    return {
      course: null,
      progressItems: [
        { name: '签到', weight: 0, tasks: 0, completed: 0, averageScore: 100, progress: '0%', weightedScore: 0.00 },
        { name: '视频', weight: 30, tasks: 178, completed: 174, averageScore: '--', progress: '98%', weightedScore: 29.33 },
        { name: '作业', weight: 0, tasks: 0, completed: 0, averageScore: 0, progress: '0%', weightedScore: 0.00 },
        { name: '测验', weight: 10, tasks: 13, completed: 0, averageScore: 0, progress: '0%', weightedScore: 0.00 },
        { name: '讨论', weight: 30, tasks: 0, completed: 16, averageScore: 32, progress: '--', weightedScore: 9.60 },
        { name: '考试', weight: 30, tasks: 0, completed: 0, averageScore: 0, progress: '--', weightedScore: 0.00 },
      ],
      currentScore: 38.93,
      announcement: '暂无公告',
      showMoreOptions: false,
      currentMenuItem: null,
      showSubMenu: false,
      menuItems: [
        { name: '线上成绩进度', icon: 'icon-progress' },
        { name: '课程公告', icon: 'icon-announcement' },
        { name: '直播', icon: 'icon-live' },
        { name: '课程内容', icon: 'icon-content' },
        { name: '课程讨论', icon: 'icon-discussion' },
        { name: '考核', icon: 'icon-exam', hasSubMenu: true }
      ],
      examSubMenu: [
      { name: '测验', icon: 'icon-quiz' },
        { name: '作业', icon: 'icon-homework' },
      ],
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
    };
  },
  async created() {
    const courseId = this.$route.query.courseId;
    if (courseId) {
      try {
        const response = await getCourse({ id: courseId });
        if (response.status === 200) {
          this.course = response.data;
        }
      } catch (error) {
        console.error('获取课程信息失败:', error);
      }
    }
  },
  methods: {
    startLearning() {
      // 将当前菜单项设置为课程内容(索引为3)
      this.currentMenuItem = 3;
      // 关闭子菜单
      this.showSubMenu = false;
    },
    toggleMoreOptions() {
      this.showMoreOptions = !this.showMoreOptions;
    },
    handleViewAll() {
      // 处理查看全部
      this.showMoreOptions = false;
    },
    handleMarkRead() {
      // 处理标记已读
      this.showMoreOptions = false;
    },
    handleShare() {
      // 处理分享
      this.showMoreOptions = false;
    },
    handleMenuClick(item, index) {
      if (item.hasSubMenu) {
        this.currentMenuItem = index;
        this.showSubMenu = !this.showSubMenu;
      } else {
        this.showSubMenu = false;
        this.currentMenuItem = index;
      }
    },
    handleSubMenuClick(subItem) {
      if (subItem.name === '作业') {
        this.currentMenuItem = 6;
      } else if (subItem.name === '测验') {
        this.currentMenuItem = 5;
      }
    },
    toggleChapter(index) {
      this.chapters[index].isExpanded = !this.chapters[index].isExpanded;
    },
    openLesson(lesson) {
      this.selectedLesson = lesson;
    },
    getLessonIcon(type) {
      switch (type) {
        case 'video':
          return 'icon-video';
        case 'document':
          return 'icon-document';
        default:
          return '';
      }
    }
  },
  mounted() {
    // 点击其他地方关闭弹出菜单
    document.addEventListener('click', (e) => {
      if (!this.$refs.moreBtn?.contains(e.target)) {
        this.showMoreOptions = false;
      }
    });
  },
  beforeUnmount() {
    // 清理事件监听
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.course-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f9;
}

.main-content {
  display: flex;
  gap: 20px;
  margin-top: 50px;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.cover-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-details {
  text-align: center;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu li:hover {
  background-color: #e0e0e0;
}

.menu-icon {
  font-size: 16px;
  color: #666;
}

.content-right {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-info, .course-progress, .course-announcement {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 0px;
}

.more-options {
  position: relative;
  cursor: pointer;
  padding: 5px;
}

.more-icon {
  font-size: 20px;
  color: #666;
  transition: color 0.3s;
}

.more-icon:hover {
  color: #333;
}

.popup-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.menu-item {
  padding: 10px 15px;
  color: #333;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.course-announcement {
  margin-top: 60px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-announcement h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.score-explanation {
  margin-top: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.explanation-tabs {
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
}

.tab {
  display: inline-block;
  padding: 12px 20px;
  color: #4CAF50;
  font-weight: 500;
  position: relative;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4CAF50;
}

.explanation-content {
  padding: 20px;
  background: #fff;
}

.rule-item {
  margin-bottom: 12px;
  line-height: 1.6;
  color: #666;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}

.rule-label {
  font-weight: 500;
  color: #333;
  margin-right: 8px;
  min-width: 70px;
}

.rule-equals {
  margin: 0 8px;
  color: #999;
}

.rule-formula {
  color: #666;
}

.conditions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #eee;
}

.condition-item {
  margin-right: 8px;
}

.highlight {
  color: #4CAF50;
  font-weight: 500;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f8f9fa;
}

.submenu li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  font-size: 13px;
  color: #666;
}

.submenu li:hover {
  background-color: #f1f8f1;
  color: #4CAF50;
  border-left-color: #4CAF50;
}

/* 子菜单图标 */
.icon-quiz::after { content: '📝'; }
.icon-homework::after { content: '📚'; }
.icon-exam::after { content: '✍️'; }

/* 子菜单展开/收起动画 */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

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
  max-height: calc(100vh - 200px);
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
</style>
