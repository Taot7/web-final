<template>
  <div class="todo-list">
    <div class="todo-header">
      <h2>个人待办事项</h2>
      <div class="tab-bar">
        <div class="tab-item" :class="{ active: currentTab === 'homework' }" @click="currentTab = 'homework'">
          作业列表
        </div>
        <div class="tab-item" :class="{ active: currentTab === 'selfTest' }" @click="currentTab = 'selfTest'">
          自测列表
        </div>
      </div>
    </div>

    <!-- 作业列表 -->
    <div v-if="currentTab === 'homework'" class="todo-content">
      <div v-for="item in homeworkList" :key="item.id" class="todo-item" @click="goToOnlineCourse(item)">
        <div class="item-header">
          <span class="course-name">{{ item.courseName }}</span>
          <span :class="['status', item.status]">{{ getStatusText(item.status) }}</span>
        </div>
        <div class="item-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="item-footer">
            <span class="deadline">截止日期: {{ item.deadline }}</span>
            <button class="submit-btn" v-if="item.status === 'pending'" @click.stop="goToOnlineCourse(item)">提交作业</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 自测列表 -->
    <div v-if="currentTab === 'selfTest'" class="todo-content">
      <div v-for="item in selfTestList" :key="item.id" class="todo-item" @click="goToOnlineCourse(item)">
        <div class="item-header">
          <span class="course-name">{{ item.courseName }}</span>
          <span :class="['status', item.status]">{{ getStatusText(item.status) }}</span>
        </div>
        <div class="item-content">
          <h3>{{ item.title }}</h3>
          <div class="test-info">
            <span>题目类型: {{ item.questionTypes.join('、') }}</span>
            <span>题目数量: {{ item.questionCount }}题</span>
            <span>时间限制: {{ item.duration }}分钟</span>
          </div>
          <div class="item-footer">
            <span class="deadline">截止日期: {{ item.deadline }}</span>
            <button class="submit-btn" v-if="item.status === 'pending'" @click.stop="goToOnlineCourse(item)">开始测试</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentTab = ref('homework')

interface TodoItem {
  id: number
  courseName: string
  title: string
  status: 'pending' | 'completed' | 'upcoming' | 'finished'
}

interface HomeworkItem extends TodoItem {
  description: string
  deadline: string
}

interface SelfTestItem extends TodoItem {
  questionTypes: string[]
  questionCount: number
  duration: number
  deadline: string
  allowViewAnswer: boolean
  allowGoBack: boolean
  isTeacherCreated: boolean
}

const homeworkList = ref<HomeworkItem[]>([
  {
    id: 1,
    courseName: '高等数学',
    title: '第三章习题',
    description: '完成课本P78-P80的所有习题',
    deadline: '2024-01-20 23:59',
    status: 'pending'
  },
  {
    id: 2,
    courseName: '计算机网络',
    title: '网络协议分析实验报告',
    description: '完成TCP/IP协议分析报告',
    deadline: '2024-01-25 23:59',
    status: 'completed'
  }
])

const selfTestList = ref<SelfTestItem[]>([
  {
    id: 1,
    courseName: '高等数学',
    title: '第三章自测',
    questionTypes: ['单选题', '多选题', '判断题'],
    questionCount: 20,
    duration: 40,
    deadline: '2024-01-30 23:59',
    status: 'pending',
    allowViewAnswer: true,
    allowGoBack: false,
    isTeacherCreated: true
  },
  {
    id: 2,
    courseName: '计算机网络',
    title: 'TCP/IP协议自测',
    questionTypes: ['单选题', '填空题', '简答题'],
    questionCount: 15,
    duration: 30,
    deadline: '2024-01-25 23:59',
    status: 'completed',
    allowViewAnswer: true,
    allowGoBack: true,
    isTeacherCreated: false
  }
])

const getStatusText = (status: string) => {
  const statusMap = {
    pending: '待完成',
    completed: '已完成',
    upcoming: '即将开始',
    finished: '已结束'
  }
  return statusMap[status] || status
}

const goToOnlineCourse = (item: HomeworkItem | SelfTestItem) => {
  router.push({
    name: 'onlineCourse',
    params: { id: item.id }
  })
}

</script>

<style scoped>
.todo-list {
  padding: 20px;
}

.todo-header {
  margin-bottom: 20px;
}

.todo-header h2 {
  margin-bottom: 15px;
}

.tab-bar {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #eee;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
}

.tab-item.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.todo-content {
  margin-top: 20px;
}

.todo-item {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.course-name {
  font-weight: bold;
  color: #666;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.status.completed, .status.finished {
  background: #f6ffed;
  color: #52c41a;
}

.status.upcoming {
  background: #e6f7ff;
  color: #1890ff;
}

.item-content h3 {
  margin-bottom: 10px;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.deadline, .test-info span {
  color: #666;
  font-size: 14px;
}

.test-info {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.submit-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 6px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #40a9ff;
}
</style>
