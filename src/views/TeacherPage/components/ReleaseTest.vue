<template>
    <!-- 标题部分 -->
    <div class="header-container">
      <h2>测试题库与试卷生成</h2>
    </div>
    <hr color="#a9d7df" />
  
    <!-- 自测题库管理 -->
    <div class="question-bank">
      <h3>自测题库</h3>
      <select v-model="selectedCourse" class="course-select" @change="initQuestionBank(selectedCourse.courseId)" >
            <option disabled value="">选择课程</option>
            <option v-for="(course, index) in courses" :key="course.courseId" :value="course">
              {{ course.title }}
            </option>
          </select>
      <table class="question-table">
        <thead>
          <tr>
            <th>题目类型</th>
            <th>题目内容</th>
            <th>选项</th>
            <th>答案</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in questions" :key="index">
            <td>{{ questionType(question.type) }}</td>
            <td>{{ question.questionText }}</td>
            <!-- 选项部分 -->
            <td v-if="question.type !== '简答题'">
              <div v-for="(val, key) in JSON.parse(question.options)" :key="key">
                {{ key }}: {{ val }}
              </div>
            </td>
            <td v-else>无选项</td>
            <!-- 答案部分 -->
            <td>{{ question.correctAnswer }}</td>
            <!-- <td v-if="question.type === '单选' || question.type === '多选'">
              {{ question.correctAnswer }}
            </td>
            <td v-else>空</td> -->
            <!-- 操作部分 -->
            <td>
              <div class="action-buttons">
                <button @click="editQuestion(index)">编辑</button>
                <button @click="deleteQuestion(index)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <!-- 试卷生成 -->
    <div class="test-paper">
      <h3>生成试卷</h3>
      <form @submit.prevent="generateTest">
        <label>
          试卷名称：
          <input type="text" v-model="testPaper.name" required />
        </label>
        <label>
          选择题目生成方式：
          <select v-model="testPaper.selectionMode">
            <option value="random">随机选择题目</option>
            <option value="manual">手动选择题目</option>
          </select>
        </label>
        <div v-if="testPaper.selectionMode === 'manual'">
          <label>
            选择题目：
            <select v-model="testPaper.questions" multiple>
              <option
                v-for="(question, index) in questions"
                :key="index"
                :value="index"
              >
                {{ question.content }} ({{ question.type }})
              </option>
            </select>
          </label>
        </div>
        <label>
          <input type="checkbox" v-model="testPaper.allowReview" />
          答题后查看答案
        </label>
        <label>
          <input type="checkbox" v-model="testPaper.allowBacktrack" />
          允许回退答题
        </label>
  
        <button type="submit">生成试卷</button>
      </form>
    </div>
  
    <!-- 发布试卷 -->
    <div class="publish-test">
      <h3>发布试卷</h3>
      <table class="publish-table">
        <thead>
          <tr>
            <th>试卷名称</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(test, index) in publishedTests" :key="index">
            <td>{{ test.name }}</td>
            <td>{{ test.status }}</td>
            <td>
              <button @click="publishTest(index)">发布</button>
              <button @click="viewResults(index)">查看结果</button>
              <button @click="deleteTest(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script setup>
import { onMounted, ref } from 'vue';
import { getQuestionBanks } from '@/services/api/questionBank';
import { getCourses } from '@/services/api/course';
const questions = ref([])

const courses = ref([])
const selectedCourse = ref()
const initCourses = async () => {
  const resp = await getCourses({})
  console.log(resp)
  courses.value = resp.data.list
  selectedCourse.value = courses[0]
}
const initQuestionBank = async (courseId) => {
  const resp = await getQuestionBanks({courseId: courseId})
  console.log(resp)
  questions.value = resp.data.list
}
onMounted(async ()=>{
  await initCourses()
  // await initQuestionBank()

})

// const questions = [
//     {
//       type: "单选",
//       content: "Vue是什么框架？",
//       options: ["前端框架", "后端框架", "数据库", "操作系统"],
//       answer: "A",
//     },
//     {
//       type: "多选",
//       content: "JavaScript的特性有哪些？",
//       options: ["动态类型", "面向对象", "跨平台", "编译执行"],
//       answer: "A,B,C",
//     },
//     {
//       type: "简答题",
//       content: "请简述Vue的核心概念。",
//       options: [],
//       answer: "",
//     },
//   ]
// const courses = [
//     "计算机科学基础",
//     "数据结构与算法",
//     "前端开发",
//     "数据库管理系统",
//     "操作系统原理",
//   ]
// const selectedCourse = ""
const testPaper = {
    name: "",
    questions: [],
    selectionMode: "random",
    randomizeOptions: false,
    allowReview: false,
    allowBacktrack: false,
  }
const publishedTests = []

const questionType = (type) => {
  switch (type) {
    case 0: return '单选'
    case 1: return '多选'
    case 2: return '判断'
    case 3: return '填空'
    case 4: return '问答'
  }
}

const createQuestion = () => {
      alert("新增题目功能");
}
const editQuestion = (index) => {
  alert(`编辑题目：${this.questions[index].content}`);
}
const deleteQuestion = (index) => {
  this.questions.splice(index, 1);
  alert("题目已删除");
}
const generateTest = () => {
  let selectedQuestions;
  if (this.testPaper.selectionMode === "random") {
    selectedQuestions = this.questions.sort(() => 0.5 - Math.random()).slice(0, 5);
  } else {
    selectedQuestions = this.testPaper.questions.map((index) => this.questions[index]);
  }

  if (this.testPaper.randomizeOptions) {
    selectedQuestions = selectedQuestions.map((q) => {
      if (q.type === "单选" || q.type === "多选") {
        return {
          ...q,
          options: q.options.sort(() => 0.5 - Math.random()),
        };
      }
      return q;
    });
  }

  const newTest = {
    ...this.testPaper,
    questions: selectedQuestions,
    status: "未发布",
  };
  this.publishedTests.push(newTest);
  this.resetTestPaper();
  alert("试卷生成成功！");
}
const resetTestPaper = () => {
  this.testPaper = {
    name: "",
    questions: [],
    selectionMode: "random",
    randomizeOptions: false,
    allowReview: false,
    allowBacktrack: false,
  };
}
const publishTest = (index) => {
  this.publishedTests[index].status = "已发布";
  alert("试卷已发布！");
}
const viewResults = (index) => {
  alert(`查看试卷 "${this.publishedTests[index].name}" 的答题情况`);
}
const deleteTest = (index)=>{
  this.publishedTests.splice(index, 1);
  alert("试卷已删除");
}
</script>

  
  <style scoped>
  .teacher-module {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    margin: 20px 30px;
  }
  
  .question-bank,
  .test-paper,
  .publish-test {
    margin-bottom: 30px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  
  .add-question {
    margin-left: -6px;
  }
  
  .action-buttons button {
    margin-right: 10px;
  }
  
  .course-select {
    padding: 3px;
    font-size: 14px;
    width: 150px;
  }
  </style>
  