<template>
    <div class="student-management">
      <!-- 标题部分 -->
      <div class="header-container">
        <h2>学生用户管理</h2>
      </div>
      <hr color="#a9d7df" />

      <!-- 学生用户表格 -->
      <div class="table-container">
        <table class="student-table">
          <thead>
            <tr>
              <th>
                全选
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
              </th>
              <th>序号</th>
              <th>学生姓名</th>
              <th>学号</th>
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
                  :value="student.userId"
                />
              </td>
              <td>{{ student.userId }}</td>
              <td>{{ student.username }}</td>
              <td>{{ student.studentId }}</td>
              <td>{{ student.status === 1 ? "禁用" : "启用" }}</td>
              <td>
                <button @click="resetPasswordById(student.userId)" class="action-btn reset">
                  重置密码
                </button>
                <button
                  @click="toggleDisable(student.userId)"
                  class="action-btn disable"
                >
                  {{ student.status === 1 ? "启用" : "禁用" }}
                </button>
                <button @click="confirmDelete(student.userId)" class="action-btn delete">
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
          批量禁用/启用
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

  <script setup>
  import {onMounted, ref} from "vue";
  import {deleteUser, enableDisableUser, getStudents, resetPassword} from '@/services/api/userManagement'

  // 学生数据
  const students = ref([
    // { id: 1, name: "张三", number: "2022283748", isDisabled: false },
    // { id: 2, name: "李四", number: "2021484920", isDisabled: false },
    // { id: 3, name: "王五", number: "2022103845", isDisabled: true },
    // { id: 4, name: "吴六", number: "2022217465", isDisabled: true },
  ]);

  // 选中的学生
  const selectedStudents = ref([]);
  const selectAll = ref(false);

  const initStudents = async ()=>{
    const resp = await getStudents({})
    students.value = resp.data.list.sort((stu1, stu2)=>stu1.userId - stu2.userId)
    console.log(students.value)
  }

  onMounted(async ()=>{
    await initStudents()
  })

  // 全选切换
  const toggleSelectAll = () => {
    if (selectAll.value) {
      selectedStudents.value = students.value.map((student) => student.userId);
    } else {
      selectedStudents.value = [];
    }
  };

  // 重置密码
  const resetPasswordById = async (id) => {
    if (confirm("确认重置该学生的密码吗？")) {
      alert(`学生 ID 为 ${id} 的密码已重置！`);
    }
    const resp = await resetPassword({userId: id, newPassword: 'student'})
    console.log('resetPassword resp: ', resp.data)
  };

  // 启用/禁用
  const toggleDisable = async (id) => {
    const resp = await enableDisableUser({id: id})
    console.log('enable disable resp: ', resp)
    const student = students.value.find((s) => s.userId === id);
    if (student) {
      alert(`学生 ${student.name} 的状态已更新为 ${student.status === 1 ? "启用" : "禁用"}`);
    }
    await initStudents()
  };

  // 删除单个学生
  const confirmDelete = async (id) => {
    if (confirm("确认删除该学生账号吗？此操作不可恢复！")) {
      const resp = await deleteUser({id: id})
      console.log('delete student resp: ', resp)
      await initStudents()
      selectedStudents.value = selectedStudents.value.filter((sid) => sid !== id);
      alert(`学生 ID 为 ${id} 的账号已删除`);
    }
  };

  // 批量禁用
  const batchDisable = async () => {
    console.log(selectedStudents.value)
    if (selectedStudents.value.length === 0) return;
    for (const student of students.value) {
      if (selectedStudents.value.includes(student.userId)) {
        await enableDisableUser({id: student.userId})
      }
    }
    await initStudents()
    alert("选中的学生账号的禁用/启用状态已更新！");
  };

  // 批量删除
  const batchDelete = async () => {
    if (
      selectedStudents.value.length > 0 &&
      confirm("确认删除选中的学生账号吗？此操作不可恢复！")
    ) {
      for (const student of students.value) {
        if (selectedStudents.value.includes(student.userId)) {
          await deleteUser({id: student.userId})
        }
      }
      selectedStudents.value = [];
      initStudents()
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

  </style>
