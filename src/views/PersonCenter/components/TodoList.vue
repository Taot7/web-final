<template>
  <div class="todo-list">
    <div class="todo-header">
      <h2>个人待办事项</h2>
      <div class="tab-bar">
        <div
          class="tab-item"
          :class="{ active: currentTab === 'homework' }"
          @click="currentTab = 'homework'"
        >
          作业列表
        </div>
        <div
          class="tab-item"
          :class="{ active: currentTab === 'selfTest' }"
          @click="currentTab = 'selfTest'"
        >
          自测列表
        </div>
      </div>
    </div>

    <!-- 作业列表 -->
    <div v-if="currentTab === 'homework'" class="todo-content">
      <div
        v-for="item in homeworkList"
        :key="item.submissionId"
        class="todo-item"
      >
        <div class="item-header">
          <span class="course-name">{{
            item?.assignment?.course?.title || ""
          }}</span>
          <span :class="['status', getStatusClass(item.status)]">{{
            ASSIGNMENT_SUBMISSION_STATUS[item.status] || ""
          }}</span>
        </div>
        <div class="item-content">
          <h3>{{ item?.assignment?.title || "" }}</h3>
          <p>{{ item?.assignment?.description || "" }}</p>
          <div class="item-footer">
            <span class="deadline"
              >截止日期: {{ item?.assignment?.deadline || "" }}</span
            >
            <button
              class="submit-btn"
              v-if="item.status == '0'"
              @click="goToOnlineCourse(item)"
            >
              提交作业
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 自测列表 -->
    <div v-if="currentTab === 'selfTest'" class="todo-content">
      <div
        v-for="item in selfTestList"
        :key="item.recordId"
        class="todo-item"
        @click="goToOnlineCourse(item)"
      >
        <div class="item-header">
          <span class="course-name">{{ item?.course?.title || "" }}</span>
          <span :class="['status', getSelfTestStatusClass(item.status)]">{{
            SELF_TEST_RECORD_STATUS[item.status] || ""
          }}</span>
        </div>
        <div class="item-content">
          <h3>{{ item.test.title }}</h3>
          <div class="test-info">
            <span>题目类型: {{ item.test.questionTypes.join("、") }}</span>
            <span>题目数量: {{ item.test.questionCount }}题</span>
            <span>时间限制: 120 分钟</span>
          </div>
          <div class="item-footer">
            <div class="time-info">
              <span class="publish-time">发布时间: {{ item.test.createTime }}</span>
              <span class="deadline">截止日期: 2025-01-15 23:59:59 </span>
            </div>
            <button
              class="submit-btn"
              v-if="item.status === '0'"
              @click.stop="goToOnlineCourse(item)"
            >
              开始测试
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ASSIGNMENT_SUBMISSION_STATUS } from "@/constant/assignment";
import { SELF_TEST_QUESTION_TYPE, SELF_TEST_RECORD_STATUS } from "@/constant/test";
import { getCourse } from "@/services/api/course";
import { getMyAssignmentSubmissions } from "@/services/api/assignmentSubmission";
import { getMyTestRecords } from "@/services/api/testRecord";

const router = useRouter();
const currentTab = ref("homework");

interface SelfTestItem extends API.TestRecordVO {
  selfTest: API.SelfTestVO;
  course: API.CourseVO;
  questionTypes: string[];
  questionCount: number;
  createTime: string;
}

const defauthomeworkList = ref<API.AssignmentSubmissionVO[]>([
  {
    submissionId: 1,
    assignment: {
      assignmentId: 1,
      courseId: 1,
      title: "第三章习题",
      description: "完成课本P78-P80的所有习题",
      deadline: "2024-01-20 23:59",
      course: {
        courseId: 1,
        title: "高等数学",
      },
    },
    status: "0",
  },
]);
const homeworkList = ref<API.AssignmentSubmissionVO[]>([]);
const selfTestList = ref<API.TestRecordVO[]>([]);

// 获取作业列表
const fetchHomeworkList = async () => {
  try {
    const res = await getMyAssignmentSubmissions({
      current: 1,
      pageSize: 100000,
      param: {
        status: "0",
      },
    });
    if(res.data) {
      homeworkList.value = res.data.list;
    }
  } catch (error) {
    console.error('获取作业列表失败:', error);
  }
};

// 获取自测列表
const fetchSelfTestList = async () => {
  try {
    const res = await getMyTestRecords({
      current: 1,
      pageSize: 100000,
      param: {
        status: "0",
      },
    });
    if(res.data) {
        selfTestList.value = res.data.list;
      }
  } catch (error) {
    console.error('获取自测列表失败:', error);
  }
};

onMounted(() => {
  fetchHomeworkList();
  fetchSelfTestList();
});
const defaultselfTestList = ref<SelfTestItem[]>([
  {
    recordId: 1,
    selfTest: {
      title: "第三章自测",
      description: "有点难度",
      questions: [
        {
          questionId: 1,
          type: 0,
        },
      ],
    },
    course: {
      courseId: 1,
      title: "高等数学",
    },
    questionTypes: ["单选题", "多选题", "判断题"],
    questionCount: 20,
    status: "0",
    createTime: "2024-01-20 23:59:59",
  },
  {
    recordId: 2,
    selfTest: {
      title: "第四章自测", 
      description: "期中考试重点",
      questions: [
        {
          questionId: 2,
          type: 0,
        },
      ],
    },
    course: {
      courseId: 1,
      title: "高等数学",
    },
    questionTypes: ["单选题", "多选题"],
    questionCount: 15,
    status: "1",
    createTime: "2024-01-18 23:59:59",
  },
]);

const getStatusClass = (status: string) => {
  const classMap = {
    "0": "pending",
    "1": "submitted", 
    "2": "completed",
  };
  return classMap[status] || status;
};

const getSelfTestStatusClass = (status: string) => {
  const classMap = {
    "0": "not-completed",
    "1": "completed",
  };
  return classMap[status] || status;
};

const goToOnlineCourse = (item: any) => {
  router.push({
    name: "onlineCourse",
    params: { id: item.id },
  });
};
</script>

<style scoped>
.todo-list {
  padding: 20px;
}

.todo-header {
  margin-bottom: 20px;
}

.todo-header h2 {
  margin-bottom: 15px;
}

.tab-bar {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #eee;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
}

.tab-item.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.todo-content {
  margin-top: 20px;
}

.todo-item {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.course-name {
  font-weight: bold;
  color: #666;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.status.submitted {
  background: #e6f7ff;
  color: #1890ff;
}

.status.completed,
.status.finished {
  background: #f6ffed;
  color: #52c41a;
}

.status.upcoming {
  background: #e6f7ff;
  color: #1890ff;
}

.status.not-completed {
  background: #fff1f0;
  color: #f5222d;
}

.item-content h3 {
  margin-bottom: 10px;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.deadline,
.publish-time,
.test-info span {
  color: #666;
  font-size: 14px;
}

.test-info {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.submit-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 6px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #40a9ff;
}
</style>
