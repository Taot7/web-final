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
              <button class="start-btn" @click="startQuiz(quiz)">
                前往
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseQuiz',
  data() {
    return {
      quizzes: [
        { chapter: '第2章', name: '第一章节测试', status: '未提交', score: '--' },
        { chapter: '第3章', name: '第二章节测试', status: '未提交', score: '--' },
        { chapter: '第5章', name: '第三章节测试', status: '未提交', score: '--' },
        { chapter: '第6章', name: '第四章节测试', status: '未提交', score: '--' },
        { chapter: '第7章', name: '第五章节测试', status: '未提交', score: '--' },
        { chapter: '第9章', name: '第六章节测试', status: '未提交', score: '--' },
        { chapter: '第10章', name: '第七章节测试', status: '未提交', score: '--' },
        { chapter: '第11章', name: '第八章节测试', status: '未提交', score: '--' },
        { chapter: '第12章', name: '第九章节测试', status: '未提交', score: '--' }
      ]
    }
  },
  methods: {
    startQuiz(quiz) {
      // 处理开始测验的逻辑
      console.log('开始测验:', quiz.name)
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