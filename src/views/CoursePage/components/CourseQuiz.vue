<template>
  <div class="quiz-content">
    <div class="quiz-header">
      <h2>测验</h2>
    </div>
    <div class="quiz-list">
      <table>
        <thead>
          <tr>
            <th>章节</th>
            <th>名称</th>
            <th>状态</th>
            <th>分数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quiz, index) in quizzes" :key="index">
            <td>{{ quiz.chapter }}</td>
            <td>{{ quiz.name }}</td>
            <td>
              <span :class="['status-tag', quiz.status === '未提交' ? 'pending' : 'completed']">
                {{ quiz.status }}
              </span>
            </td>
            <td>{{ quiz.score }}</td>
            <td>
              <button 
                class="start-btn" 
                @click="startQuiz(quiz)"
                :disabled="quiz.status === '已完成'"
              >
                {{ quiz.status === '已完成' ? '已提交' : '前往' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getMyTestRecords } from '@/services/api/testRecord';

export default {
  name: 'CourseQuiz',
  data() {
    return {
      quizzes: [
       
      ],
      courseId: parseInt(this.$route.query.courseId),
    }
  },
  async created() {
    try {
      const response = await getMyTestRecords({
        param: {
          courseId: parseInt(this.$route.query.courseId)
        } 
      });
      if (response.status === 200 && response.data) {
        this.quizzes = response.data.list.map(item => ({
          courseId: parseInt(this.$route.query.courseId),
          testId: item.testId,
          name: item.title,
          status: item.status === 0 ? '未提交' : '已完成',
          score: item.score || '--',
          completeTime: item.completeTime
        }));
      }
    } catch (error) {
      console.error('获取测试记录失败:', error);
      // 显示错误提示
      this.$message.error('获取测试记录失败，请稍后重试');
    }
  },
  methods: {
    startQuiz(quiz) {
      console.log("你好");
      console.log(quiz);
      
      // 使用路由导航到测试页面，并传入测试ID
      this.$router.push({
        name: 'Test',
        params: { 
          testId: quiz.testId,
          courseId: quiz.courseId
        }
      })
    }
  }
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