<template>
    <div class="user-management">
      <!-- 顶部导航 -->
      <header class="header">
        <button @click="$router.push({ name: 'home' })"class="home-button">回首页</button>
        <h1>用户管理系统</h1>
      </header>
  
      <!-- 主内容 -->
      <main class="content">
        <div class="content-box">
          <!-- 左侧菜单栏 -->
          <aside class="sidebar">
            <ul>
              <li @click="toggleUserType('student')" :class="{ active: userType === 'student' }">
                学生账户
              </li>
              <li @click="toggleUserType('teacher')" :class="{ active: userType === 'teacher' }">
                教师账户
              </li>
            </ul>
          </aside>
  
          <!-- 右侧主表格 -->
          <div class="main-area">
            <!-- 搜索和操作 -->
            <div class="search-and-actions">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="请输入姓名、学号/工号或学院/部门"
              />
              <button @click="search">查询</button>
              <button @click="addUser">新增用户</button>
            </div>
  
            <!-- 用户表格 -->
            <table class="user-table">
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header">{{ header }}</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in filteredUsers" :key="index">
                  <td v-for="field in userFields" :key="field">{{ user[field] }}</td>
                  <td>
                    <button class="edit-button" @click="editUser(user)">编辑</button>
                    <button class="password-button" @click="setPassword(user)">设置密码</button>
                    <button class="delete-button" @click="deleteUser(user)">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- 分页 -->
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
                <span>第 {{ currentPage }} 页</span>
                <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
            </div>
          </div>     
        </div> 
      </main>
    </div>
  </template>

  <script>
  import { getStudents, getTeachers } from "@/services/api/userManagement";
  import { ref, computed } from "vue";

  const students = ref([]);
  const teachers = ref([]);

  const processUserData = (user) => {
    return {
      ...user,
      gender: user.gender === 1 ? "男" : "女",
      role: user.roles.length > 0 ? user.roles[0].cname : "未知角色",
    };
  };

  const initStudents = async () => {
    try {
      const resp = await getStudents({});
      students.value = resp.data.list
          .map(processUserData)
          .sort((stu1, stu2) => stu1.userId - stu2.userId);
      console.log("学生数据初始化完成", students.value);
    } catch (error) {
      console.error("获取学生数据失败", error);
    }
  };

  const initTeachers = async () => {
    try {
      const resp = await getTeachers({});
      teachers.value = resp.data.list
          .map(processUserData)
          .sort((tea1, tea2) => tea1.userId - tea2.userId);
      console.log("教师数据初始化完成", teachers.value);
    } catch (error) {
      console.error("获取教师数据失败", error);
    }
  };

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  }
  export default {
    data() {
      return {
        userType: "student",
        searchQuery: "",
        currentPage: 1,
        usersPerPage: 10,
        users: {
          student: [
            { id: 1, studentId: "2021001", name: "张三", department: "计算机学院", gender: "男", role: "学生", password: "******" },
            { id: 2, studentId: "2021002", name: "李四", department: "信息工程学院", gender: "女", role: "学生", password: "******" },
            { id: 3, studentId: "2021003", name: "王五", department: "自动化学院", gender: "男", role: "学生", password: "******" },
            { id: 4, studentId: "2021004", name: "赵六", department: "软件学院", gender: "女", role: "学生", password: "******" },
            { id: 5, studentId: "2021005", name: "孙七", department: "土木工程学院", gender: "男", role: "学生", password: "******" },
          ],
          teacher: [
            { id: 1, teacherId: "T2021-001", name: "王老师", department: "机械工程学院", gender: "男", role: "教师", password: "******" },
            { id: 2, teacherId: "T2021-002", name: "李老师", department: "土木工程学院", gender: "女", role: "教师", password: "******" },
            { id: 3, teacherId: "T2021-003", name: "赵老师", department: "信息学院", gender: "男", role: "教师", password: "******" },
          ],
        },
        headers: [],
        userFields: [],
      };
    },
    computed: {
      filteredUsers() {
        const allUsers = this.users[this.userType];
        const filtered = allUsers.filter(user =>
            this.userFields.some(field => {
              const value = getNestedValue(user, field);
              return value && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
            })
        );
        const startIndex = (this.currentPage - 1) * this.usersPerPage;
        const endIndex = startIndex + this.usersPerPage;
        return filtered.slice(startIndex, endIndex);
      },
      totalPages() {
        const allUsers = this.users[this.userType].filter(user =>
            this.userFields.some(field => {
              const value = getNestedValue(user, field);
              return value && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
            })
        );
        return Math.ceil(allUsers.length / this.usersPerPage);
      },
    },
    methods: {
      goHome() {
        alert("回首页");
      },
      toggleUserType(type) {
        this.userType = type;
        this.updateHeaders();
      },
      updateHeaders() {
        if (this.userType === "student") {
          this.headers = ["学号", "姓名", "学院/部门", "性别", "角色", "密码"];
          this.userFields = ["studentId", "username", "department", "gender", "role", "password"];
        } else {
          this.headers = ["工号", "姓名", "学院/部门", "性别", "角色", "密码"];
          this.userFields = ["userId", "username", "department", "gender", "role", "password"];
        }
      },
      addUser() {
        const newUser = prompt("请输入新用户信息，格式：姓名,学号/工号,部门,性别,角色,密码");
        if (newUser) {
          const [name, id, department, gender, role, password] = newUser.split(",");
          const idField = this.userType === "student" ? "studentId" : "teacherId";
          this.users[this.userType].push({
            id: this.users[this.userType].length + 1,
            [idField]: id.trim(),
            name: name.trim(),
            department: department.trim(),
            gender: gender.trim(),
            role: role.trim(),
            password: password.trim(),
          });
          alert("新增用户成功！");
        }
      },
      editUser(user) {
        const updatedInfo = prompt(
          `编辑用户信息（原格式：姓名,学号/工号,部门,性别,角色,密码）\n当前信息：${Object.values(user).slice(1).join(",")}`
        );
        if (updatedInfo) {
          const [name, id, department, gender, role, password] = updatedInfo.split(",");
          Object.assign(user, {
            name: name.trim(),
            [this.userType === "student" ? "studentId" : "teacherId"]: id.trim(),
            department: department.trim(),
            gender: gender.trim(),
            role: role.trim(),
            password: password.trim(),
          });
          alert("用户信息已更新！");
        }
      },
      setPassword(user) {
        const newPassword = prompt(`为用户 ${user.name} 设置新密码：`);
        if (newPassword) {
          user.password = newPassword;
          alert("密码设置成功！");
        }
      },
      deleteUser(user) {
        if (confirm(`确认删除用户 ${user.name} 吗？`)) {
          const index = this.users[this.userType].indexOf(user);
          this.users[this.userType].splice(index, 1);
          alert("用户已删除！");
        }
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      search() {
        this.currentPage = 1; // 搜索时回到第一页
      },
    },
    created() {
      this.updateHeaders();
      initStudents();
      initTeachers();
      this.users.student=students
      this.users.teacher=teachers
    },
  };
  </script>
  
  <style scoped>
  .user-management {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f9f9f9;
  }
  
  .header {
    background-color: #8dc8eb;
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .header .home-button {
        margin-left: 30px;
        background-color: white;
        color: #000000;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    }

    .header .home-button:hover {
        background-color: #effbff; /* 改变背景色 */
        color: rgb(3, 112, 255); /* 改变文字颜色 */
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2); /* 添加阴影效果 */
    }
  
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 20px;
  }
  
  .content-box {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 80%;
    height: 80%;
  }
  
  .sidebar {
    background-color: #f8f9fa;
    width: 200px;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 8px;
    text-align: center;
  }
  
  .sidebar li.active {
    background-color: #82aedd;
    color: white;
  }
  
  .main-area {
    flex-grow: 1;
    padding: 20px;
  }
  
  .search-and-actions {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .search-and-actions input{
    width:20%;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .user-table th,
  .user-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  </style>