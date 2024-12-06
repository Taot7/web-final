<template>
    <div class="student-management">
      <!-- 标题部分 -->
      <div class="header-container">
        <h1>学生用户管理</h1>
      </div>
      <hr color="#a9d7df" />
  
      <!-- 学生用户表格 -->
      <div class="table-container">
        <table class="student-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
              </th>
              <th>序号</th>
              <th>学生姓名</th>
              <th>账号</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" :key="student.id">
              <td>
                <input
                  type="checkbox"
                  v-model="selectedStudents"
                  :value="student.id"
                />
              </td>
              <td>{{ index + 1 }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.isDisabled ? "禁用" : "正常" }}</td>
              <td>
                <button @click="resetPassword(student.id)" class="action-btn reset">
                  重置密码
                </button>
                <button
                  @click="toggleDisable(student.id)"
                  class="action-btn disable"
                >
                  {{ student.isDisabled ? "启用" : "禁用" }}
                </button>
                <button @click="confirmDelete(student.id)" class="action-btn delete">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- 批量操作 -->
      <div class="button-container">
        <button
          class="action-btn disable"
          :disabled="selectedStudents.length === 0"
          @click="batchDisable"
        >
          批量禁用
        </button>
        <button
          class="action-btn delete"
          :disabled="selectedStudents.length === 0"
          @click="batchDelete"
        >
          批量删除
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // 学生数据
  const students = ref([
    { id: 1, name: "张三", email: "zhangsan@example.com", isDisabled: false },
    { id: 2, name: "李四", email: "lisi@example.com", isDisabled: false },
    { id: 3, name: "王五", email: "wangwu@example.com", isDisabled: true },
    { id: 4, name: "吴六", email: "wuliu@example.com", isDisabled: true },
  ]);
  
  // 选中的学生
  const selectedStudents = ref<number[]>([]);
  const selectAll = ref(false);
  
  // 全选切换
  const toggleSelectAll = () => {
    if (selectAll.value) {
      selectedStudents.value = students.value.map((student) => student.id);
    } else {
      selectedStudents.value = [];
    }
  };
  
  // 重置密码
  const resetPassword = (id: number) => {
    if (confirm("确认重置该学生的密码吗？")) {
      alert(`学生 ID 为 ${id} 的密码已重置！`);
    }
  };
  
  // 启用/禁用
  const toggleDisable = (id: number) => {
    const student = students.value.find((s) => s.id === id);
    if (student) {
      student.isDisabled = !student.isDisabled;
      alert(`学生 ${student.name} 的状态已更新为 ${student.isDisabled ? "禁用" : "启用"}`);
    }
  };
  
  // 删除单个学生
  const confirmDelete = (id: number) => {
    if (confirm("确认删除该学生账号吗？此操作不可恢复！")) {
      students.value = students.value.filter((s) => s.id !== id);
      selectedStudents.value = selectedStudents.value.filter((sid) => sid !== id);
      alert(`学生 ID 为 ${id} 的账号已删除`);
    }
  };
  
  // 批量禁用
  const batchDisable = () => {
    if (selectedStudents.value.length === 0) return;
    students.value.forEach((student) => {
      if (selectedStudents.value.includes(student.id)) {
        student.isDisabled = true;
      }
    });
    alert("选中的学生账号已全部禁用！");
  };
  
  // 批量删除
  const batchDelete = () => {
    if (
      selectedStudents.value.length > 0 &&
      confirm("确认删除选中的学生账号吗？此操作不可恢复！")
    ) {
      students.value = students.value.filter(
        (student) => !selectedStudents.value.includes(student.id)
      );
      selectedStudents.value = [];
      alert("选中的学生账号已全部删除！");
    }
  };
  </script>
  
  <style scoped>
  /* 表格样式 */
  .table-container {
    margin: 20px;
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .student-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  
  .student-table th,
  .student-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }
  
  .student-table th {
    background-color: #f7f7f7;
    font-weight: bold;
  }
  
  .student-table tr:hover {
    background-color: #f5f5f5;
  }
  
  .action-btn {
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    margin-right: 5px;
  }
  
  .action-btn.reset {
    background-color: #59bcf5;
    color: white;
  }
  
  .action-btn.disable {
    background-color: #ffc458;
    color: white;
  }
  
  .action-btn.delete {
    background-color: #f75c5c;
    color: white;
  }
  
  .action-btn:hover {
    opacity: 0.8;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 30px;
  }

  h1 {
  margin-top:30px;
  margin-bottom: 30px;
  margin-left: 30px;
  }

  </style>
  