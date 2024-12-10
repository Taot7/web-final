<template>
  <div class="quiz-content">
    <div class="quiz-header">
      <h2>测验</h2>
    </div>
    <div class="quiz-list">
      <table>
        <thead>
          <tr>
            <th style="width: 12%">名称</th>
            <th style="width: 15%">类型</th>
            <th style="width: 20%">说明</th>
            <th style="width: 10%">题目数</th>
            <th style="width: 12%">发布时间</th>
            <th style="width: 8%">状态</th>
            <th style="width: 7%">分数</th>
            <th style="width: 8%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quiz, index) in quizzes" :key="index">
            <td>{{ quiz.title }}</td>
            <td>{{ quiz?.questionTypes.join('、') ||  '--' }}</td>
            <td>{{ quiz?.description ||  '--' }}</td>
            <td>{{ quiz?.questionCount || 0 }}</td>
            <td>{{ quiz?.createTime ? formatDateTime(quiz.createTime) : '--' }}</td>
            <td>
              <span :class="['status-tag', quiz.recordStatus == '0' ? 'pending' : 'completed']">
                {{ SELF_TEST_RECORD_STATUS[quiz.recordStatus] }}
              </span>
            </td>
            <td>{{ quiz.record?.score || '--' }}</td>
            <td>
              <button 
                class="start-btn" 
                @click="startQuiz(quiz)"
                v-if="quiz?.recordStatus == '0'"
              >
                前往
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMyTestRecords } from '@/services/api/testRecord'
import { ElMessage } from 'element-plus'
import { getMySelfTestsWithRecords } from '@/services/api/selfTest';
import { SELF_TEST_RECORD_STATUS } from '@/constant/test';
interface Props {
  courseId:  number
}

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const quizzes = ref<API.SelfTestWithRecordVO[]>([])
const courseId = props.courseId

const formatDateTime = (dateTimeStr: string) => {
  return dateTimeStr.replace('T', ' ');
}

onMounted(async () => {
  try {
    const response = await getMySelfTestsWithRecords({
      current: 1,
      pageSize: 1000,
      //@ts-ignore
      param: {
        courseId:courseId
      }
    })
    quizzes.value = response.data.list

  } catch (error) {
    console.error('获取测试记录失败:', error)
    ElMessage.error('获取测试记录失败，请稍后重试')
  }
})

const startQuiz = (quiz: API.SelfTestWithRecordVO) => {
  console.log("你好")
  console.log(quiz)

  router.push({
    name: 'Test',
    params: {
      testId: quiz.testId,
      courseId: quiz.courseId
    }
  })
}
</script>

<style scoped>
.quiz-content {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quiz-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.quiz-header h2 {
  margin: 0;
  color: #333;
}

.quiz-list table {
  width: 100%;
  border-collapse: collapse;
}

.quiz-list th,
.quiz-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.quiz-list th {
  background-color: #f8f9fa;
  font-weight: 500;
  color: #666;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status-tag.pending {
  background: #fff3e0;
  color: #ff9800;
}

.status-tag.completed {
  background: #e8f5e9;
  color: #4caf50;
}

.start-btn {
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-btn:hover {
  background-color: #45a049;
}
</style> 