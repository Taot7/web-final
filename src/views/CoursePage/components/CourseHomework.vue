<template>
  <div class="homework-content">
    <div class="homework-header">
      <h2>作业</h2>
    </div>
    <div class="homework-list">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>状态</th>
            <th>分数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(homework, index) in homeworks" :key="index">
            <td>{{ homework.name }}</td>
            <td>
              <span :class="['status-tag', homework.status === '未提交' ? 'pending' : 'completed']">
                {{ homework.status }}
              </span>
            </td>
            <td>{{ homework.score }}</td>
            <td>
              <button class="start-btn" @click="startHomework(homework)">
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
  name: 'CourseHomework',
  data() {
    return {
      homeworks: [
        { name: '第一次作业', status: '未提交', score: '--' },
        { name: '第二次作业', status: '未提交', score: '--' },
        { name: '第三次作业', status: '未提交', score: '--' },
        { name: '第四次作业', status: '未提交', score: '--' },
        { name: '第五次作业', status: '未提交', score: '--' },
        { name: '第六次作业', status: '未提交', score: '--' },
        { name: '第七次作业', status: '未提交', score: '--' },
        { name: '第八次作业', status: '未提交', score: '--' },
        { name: '第九次作业', status: '未提交', score: '--' }
      ]
    }
  },
  methods: {
    startHomework(homework) {
      // 处理开始作业的逻辑
      console.log('开始作业:', homework.name)
    }
  }
}
</script>

<style scoped>
.homework-content {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.homework-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.homework-header h2 {
  margin: 0;
  color: #333;
}

.homework-list table {
  width: 100%;
  border-collapse: collapse;
}

.homework-list th,
.homework-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.homework-list th {
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