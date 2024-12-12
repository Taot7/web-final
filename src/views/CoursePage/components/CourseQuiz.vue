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
            <th style="width: 15%">题目类型</th>
            <th style="width: 15%">说明</th>
            <th style="width: 8%">题目数</th>
            <th style="width: 20%">发布时间</th>
            <th style="width: 10%">状态</th>
            <th style="width: 10%">分数</th>
            <th style="width: 20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quiz, index) in quizzes" :key="index">
            <td>{{ quiz.title }}</td>
            <td>{{ quiz?.questionTypes.join("、") || "--" }}</td>
            <td>{{ quiz?.description || "--" }}</td>
            <td>{{ quiz?.questionCount || 0 }}</td>
            <td>
              {{ quiz?.createTime ? formatDateTime(quiz.createTime) : "--" }}
            </td>
            <td>
              <span
                :class="[
                  'status-tag',
                  quiz.recordStatus == '0' ? 'pending' : 'completed',
                ]"
              >
                {{ SELF_TEST_RECORD_STATUS[quiz.recordStatus] }}
              </span>
            </td>
            <td>{{  quiz.recordStatus=='0'? '--': quiz?.record?.score  }}</td>
            <td>
              <button
                v-if="quiz.recordStatus == '0'"
                class="start-btn"
                @click="startQuiz(quiz)"
              >
                提交
              </button>
              <button v-else class="view-btn" @click="viewRecord(quiz)">
                查看记录
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMyTestRecords } from "@/services/api/testRecord";
import { ElMessage } from "element-plus";
import { SELF_TEST_RECORD_STATUS } from "@/constant/test";
import { getMySelfTestsWithRecords } from "@/services/api/selfTest";
interface Props {
  courseId: number;
}

const props = defineProps<Props>();

const route = useRoute();
const router = useRouter();

const quizzes = ref<API.SelfTestWithRecordVO[]>([]);
const courseId = props.courseId;

const formatDateTime = (dateTimeStr: string) => {
  return dateTimeStr.replace("T", " ");
};

onMounted(async () => {
  try {
    const response = await getMySelfTestsWithRecords({
      current: 1,
      pageSize: 1000,
      //@ts-ignore
      param: {
        courseId: courseId,
        status: 1,
      },
    });
    quizzes.value = response.data.list;
  } catch (error) {
    console.error("获取测试记录失败:", error);
    ElMessage.error("获取测试记录失败，请稍后重试");
  }
});

const startQuiz = (quiz: API.SelfTestWithRecordVO) => {
  router.push({
    name: "Test",
    params: {
      testId: quiz.testId,
      courseId: quiz.courseId
    },
  });
};

const viewRecord = (quiz: API.SelfTestWithRecordVO) => {
  console.log("quiz", quiz);
  console.log("quiz.recordId", quiz?.recordId);
  router.push({
    name: "Test",
    params: {
      testId: quiz.testId,
      courseId: quiz.courseId,
      recordId: quiz.recordId,
    },
  });
};
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

.start-btn,
.view-btn {
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-btn {
  background-color: #4caf50;
}

.start-btn:hover {
  background-color: #45a049;
}

.view-btn {
  background-color: #2196f3;
}

.view-btn:hover {
  background-color: #1976d2;
}
</style>
