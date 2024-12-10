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
            <th>
              全选
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            </th>
            <th>题目类型</th>
            <th>题目内容</th>
            <th>选项</th>
            <th>答案</th>
<!--            <th>操作</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in questions" :key="index">
            <td>
              <input
                  type="checkbox"
                  @change="selectQuestion($event, question.questionId)"
                  :value="question.questionId"
              />
            </td>
            <td>{{ questionType(question.type) }}</td>
            <td>{{ question.questionText }}</td>
            <!-- 选项部分 -->
            <td v-if="question.type === 0 || question.type === 1">
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
<!--            <td>-->
<!--              <div class="action-buttons">-->
<!--                <button @click="editQuestion(index)">编辑</button>-->
<!--                <button @click="deleteQuestion(index)">删除</button>-->
<!--              </div>-->
<!--            </td>-->
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
          <input type="text" v-model="testPaper.title" required />
        </label>
        <label>
          选择题目生成方式：
          <select v-model="testPaper.selectionMode">
            <option value="random">随机选择题目</option>
            <option value="manual">手动选择题目</option>
          </select>
        </label>
<!--        <div v-if="testPaper.selectionMode === 'manual'">-->
<!--          <label>-->
<!--            选择题目：-->
<!--            <select v-model="testPaper.questions" multiple>-->
<!--              <option-->
<!--                v-for="(question, index) in questions"-->
<!--                :key="index"-->
<!--                :value="index"-->
<!--              >-->
<!--                {{ question.questionText }} ({{ question.type }})-->
<!--              </option>-->
<!--            </select>-->
<!--          </label>-->
<!--        </div>-->
<!--        <label>-->
<!--          <input type="checkbox" v-model="testPaper.allowReview" />-->
<!--          答题后查看答案-->
<!--        </label>-->
<!--        <label>-->
<!--          <input type="checkbox" v-model="testPaper.allowBacktrack" />-->
<!--          允许回退答题-->
<!--        </label>-->

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
          <tr v-for="(test, index) in tests" :key="index">
            <td>{{ test.title }}</td>
            <td>{{ test.status === 1 ? '已发布': '未发布' }}</td>
            <td>
              <button @click="publishTest(index)">发布</button>
<!--              <button @click="viewResults(index)">查看结果</button>-->
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
import {addSelfTest, deleteSelfTest, getSelfTests, updateSelfTest} from "@/services/api/selfTest";
const questions = ref([])

const courses = ref([])
const selectedCourse = ref()

// 选中的题目
let selectedQuestions = []
const selectAll = ref(false)
// 测试
const tests = ref([])

const initCourses = async () => {
  const resp = await getCourses({})
  console.log('courses', resp)
  courses.value = resp.data.list
  selectedCourse.value = courses[0]
}
const initQuestionBank = async (courseId) => {
  const resp = await getQuestionBanks({courseId: courseId})
  console.log('question bank', resp)
  questions.value = resp.data.list
  selectAll.value = false
  selectedQuestions = []
}
const initTests = async () => {
  const resp = await getSelfTests({})
  console.log('selftest list', resp.data.list)
  tests.value = resp.data.list
}
onMounted(async ()=>{
  await initCourses()
  // await initQuestionBank()
  await initTests()
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedQuestions = questions.value.map((question) => question.questionId);
  } else {
    selectedQuestions = [];
  }
  console.log('toggle selectAll: ', selectedQuestions)
}
const selectQuestion = (event, questionId) => {
  if (event.target.checked) {
    // 如果是勾选状态，则添加到 selectedQuestions 中
    if (!selectedQuestions.includes(questionId)) {
      selectedQuestions.push(questionId);
    }
  } else {
    // 如果是取消勾选状态，则从 selectedQuestions 中移除
    const index = selectedQuestions.indexOf(questionId);
    if (index !== -1) {
      selectedQuestions.splice(index, 1);
    }
  }
  console.log('selectedQuestions: ', selectedQuestions);
}


const testPaper = ref({
    title: "",
    selectionMode: "random",
    // randomizeOptions: false,
    // allowReview: false,
    // allowBacktrack: false,
  })

const questionType = (type) => {
  switch (type) {
    case 0: return '单选'
    case 1: return '多选'
    case 2: return '判断'
    case 3: return '填空'
    case 4: return '问答'
  }
}

const generateTest = async () => {
  console.log('selected questions: ', selectedQuestions)
  if (testPaper.value.selectionMode === "random") {
    selectedQuestions = questions.value.map((question)=>question.questionId)
    selectedQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
  }


  const newTest = {
    courseId: selectedCourse.value.courseId,
    status: 0,  // 未发布
    title: testPaper.value.title,
    questionIds: selectedQuestions,
    description: testPaper.value.title,
  }
  console.log('newtest: ', newTest)
  const resp = await addSelfTest(newTest)
  console.log(resp.data)
  resetTestPaper();
  await initTests()
  alert("试卷生成成功！");
}
const resetTestPaper = () => {
  testPaper.value = {
    name: "",
    selectionMode: "random",
  };
}

const publishTest = async (index) => {
  const payload = {
    status: 1
  }
  await updateSelfTest({id: tests.value[index].testId}, payload)
  initTests()
  alert("试卷已发布！");
}
const viewResults = (index) => {
  alert(`查看试卷 "${tests.value[index].title}" 的答题情况`);
}
const deleteTest = async (index)=>{
  await deleteSelfTest(tests.value[index].testId);
  initTests()
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
