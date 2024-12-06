<template>
    <div class="header-container">
      <h1>课程发布</h1>
    </div>
    <hr color="#a9d7df">
    <div class="course-release">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <input v-model="searchQuery.courseId" type="text" placeholder="课程ID" class="input" />
        <input v-model="searchQuery.courseName" type="text" placeholder="课程名称" class="input" />
        <input v-model="searchQuery.teacherName" type="text" placeholder="讲师姓名" class="input" />
        <button @click="search" class="button">搜索</button>
      </div>
  
      <!-- 课程表格 -->
      <div class="course-table">
        <div class="table-header">
          <div class="table-cell">课程编号</div>
          <div class="table-cell">课程名称</div>
          <div class="table-cell">类别名称</div>
          <div class="table-cell">讲师姓名</div>
          <div class="table-cell">发布状态</div>
          <div class="table-cell">操作</div>
        </div>
        <div v-for="(course, index) in filteredCourses" :key="course.id" class="table-row">
          <div class="table-cell">{{ course.id }}</div>
          <div class="table-cell">{{ course.name }}</div>
          <div class="table-cell">{{ course.category }}</div>
          <div class="table-cell">{{ course.teacher }}</div>
          <div class="table-cell">{{ course.status }}</div>
          <div class="table-cell">
            <button @click="previewCourse(course)" class="button">查看</button>
            <button @click="editCourse(course)" class="button">编辑</button>
            <button @click="deleteCourse(index)" class="button danger">删除</button>
          </div>
        </div>
      </div>
  
      <!-- 发布新课程 -->
      <div class="new-course">
        <h2>发布新课程</h2>
        <input v-model="newCourse.name" type="text" placeholder="课程名称" class="input" />
        <input v-model="newCourse.category" type="text" placeholder="课程类别" class="input" />
        <textarea v-model="newCourse.description" placeholder="课程简介" class="textarea"></textarea>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="newCourse.allowComments" /> 打开评论区
          </label>
          <label>
            <input type="checkbox" v-model="newCourse.allowNotes" /> 打开笔记区
          </label>
        </div>
        <input type="file" @change="handleImageUpload" multiple />
        <button @click="showPreview" class="button">预览</button>
        
        <p>
            <button @click="publishCourse" class="button primary">发布课程</button>
        </p>
        
      </div>
  
      <hr color="#ccc">
  
      <!-- 作业布置 -->
      <div class="assignment-section">
        <h2>布置作业</h2>
        <input v-model="assignment.title" type="text" placeholder="作业标题" class="input" />
        <textarea v-model="assignment.requirements" placeholder="作业要求" class="textarea"></textarea>
        <div class="ddl">截至日期：</div>
        <input v-model="assignment.dueDate" type="date" class="input" />
        <button @click="assignHomework" class="button primary">布置作业</button>
      </div>
  
      <!-- 模态框 -->
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal-content">
          <h2>预览内容</h2>
          <!-- 这里可以添加预览的内容 -->
          <button @click="closeModal" class="button">关闭</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  
  interface Course {
    id: number;
    name: string;
    category: string;
    teacher: string;
    description: string;
    status: string; // "已发布" 或 "未发布"
    allowComments: boolean;
    allowNotes: boolean;
    images: string[]; // 新增字段用于存储图片
  }
  
  interface Assignment {
    title: string;
    requirements: string;
    dueDate: string;
  }
  
  const courses = ref<Course[]>([
    { id: 1, name: "HTML基础", category: "Web前端", teacher: "王老师", description: "HTML入门课程", status: "已发布", allowComments: true, allowNotes: false, images: [] },
    { id: 2, name: "JavaScript进阶", category: "Web前端", teacher: "李老师", description: "JS进阶知识", status: "未发布", allowComments: false, allowNotes: true, images: [] },
    { id: 3, name: "CSS布局", category: "Web前端", teacher: "张老师", description: "CSS布局技巧", status: "已发布", allowComments: true, allowNotes: false, images: [] },
    { id: 4, name: "Vue.js入门", category: "前端框架", teacher: "陈老师", description: "Vue.js基础知识", status: "未发布", allowComments: false, allowNotes: true, images: [] },
    { id: 5, name: "React.js进阶", category: "前端框架", teacher: "刘老师", description: "深入理解React.js", status: "已发布", allowComments: true, allowNotes: false, images: [] },
  ]);
  
  const searchQuery = ref({
    courseId: "",
    courseName: "",
    teacherName: "",
  });
  
  const newCourse = ref<Course>({
    id: 0,
    name: "",
    category: "",
    teacher: "默认教师",
    description: "",
    status: "未发布",
    allowComments: false,
    allowNotes: false,
    images: [],
  });
  
  const assignment = ref<Assignment>({
    title: "",
    requirements: "",
    dueDate: "",
  });
  
  const filteredCourses = computed(() =>
    courses.value.filter((course) => {
      return (
        (!searchQuery.value.courseId || course.id.toString().includes(searchQuery.value.courseId)) &&
        (!searchQuery.value.courseName || course.name.includes(searchQuery.value.courseName)) &&
        (!searchQuery.value.teacherName || course.teacher.includes(searchQuery.value.teacherName))
      );
    })
  );
  
  const search = () => {
    console.log("搜索条件：", searchQuery.value);
  };
  
  const previewCourse = (course: Course) => {
    alert(`预览课程: ${course.name}`);
  };
  
  const editCourse = (course: Course) => {
    alert(`编辑课程: ${course.name}`);
  };
  
  const deleteCourse = (index: number) => {
    if (confirm("确认删除该课程吗？")) {
      courses.value.splice(index, 1);
      updateCourseIds();
    }
  };
  
  const publishCourse = () => {
    if (!newCourse.value.name || !newCourse.value.category) {
      alert("请填写完整课程信息");
      return;
    }
    const nextId = courses.value.length > 0 ? Math.max(...courses.value.map(course => course.id)) + 1 : 1;
    courses.value.push({ ...newCourse.value, id: nextId });
    alert("课程发布成功！");
    resetNewCourse();
  };
  
  const handleImageUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            newCourse.value.images.push(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const updateCourseIds = () => {
    courses.value.forEach((course, index) => {
      course.id = index + 1; // 更新课程ID为递增
    });
  };
  
  const resetNewCourse = () => {
    newCourse.value = {
      id: 0,
      name: "",
      category: "",
      teacher: "默认教师",
      description: "",
      status: "未发布",
      allowComments: false,
      allowNotes: false,
      images: [],
    };
  };
  
  const assignHomework = () => {
    if (!assignment.value.title || !assignment.value.requirements || !assignment.value.dueDate) {
      alert("请填写完整作业信息");
      return;
    }
    alert(`作业 "${assignment.value.title}" 已布置，截止日期为 ${assignment.value.dueDate}`);
    assignment.value = { title: "", requirements: "", dueDate: "" }; // 重置作业信息
  };

  const isModalVisible = ref(false);

  const showPreview = () => {
  isModalVisible.value = true;
  };

  const closeModal = () => {
  isModalVisible.value = false;
  };

  </script>
  
  <style scoped>
  .course-release {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    margin-right:10px;
  }
  
  .textarea {
    margin-top:10px;
    width: 100%;
    height: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .checkbox {
    margin-bottom: 10px;
  }
  
  .button {
    margin-right: 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button.primary {
    background-color: #4caf50;
    color: white;
  }
  
  .button.danger {
    background-color: #f44336;
    color: white;
  }
  
  .button.small {
    padding: 4px 8px;
  }
  
  .table-header,
  .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  
  .table-cell {
    flex: 1;
    text-align: center;
  }
  
  .new-course {
    margin-top: 40px;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 30px;
  }
  
  h1 {
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 30px;
  }
  
  h2 {
    margin-top: 20px;
  }

  .button-delete{
    width:60px;
    margin-top:10px;
    background-color:#f44336;
    color:white;
    padding:6px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
}

.ddl{
    font-size: 15px;
    margin-bottom: 5px;
    margin-left:3px;
}
  </style>