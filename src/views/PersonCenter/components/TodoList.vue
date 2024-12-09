<template>
  <div class="todo-list list-container">
    <div class="list-header">
      <h2>个人待办事项</h2>
      <div class="tab-group">
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
    <div v-if="currentTab === 'homework'" class="tab-content">
      <div 
        class="course-group" 
        v-for="courseHomework in courseHomeworks" 
        :key="courseHomework.course.courseId"
      >
        <div class="course-title" @click="toggleCourse(courseHomework.course.courseId)">
          <div class="course-title-left">
            <i class="icon-arrow" :class="{ 'icon-arrow-down': !isCollapsed(courseHomework.course.courseId) }"></i>
            <h3>{{ courseHomework.course.title }}</h3>
          </div>
          <span class="count-badge">{{ courseHomework.assignments.length }}个待完成作业</span>
        </div>

        <div class="assignments-container" v-show="!isCollapsed(courseHomework.course.courseId)">
          <div 
            class="todo-item" 
            v-for="item in courseHomework.assignments" 
            :key="item.submissionId"
          >
            <div class="item-header">
              <span :class="['status-badge', getStatusClass(item?.submissionStatus)]">
                {{ ASSIGNMENT_SUBMISSION_STATUS[item?.submissionStatus] || "" }}
              </span>
            </div>
            <div class="item-content">
              <h3>{{ item?.title || "" }}</h3>
              <p>{{ item?.description || "" }}</p>
              <div class="item-footer">
                <span class="deadline">截止日期: {{ item?.deadline || "" }}</span>
                <button
                  class="btn btn-primary btn-small"
                  v-if="item?.submissionStatus == '0'"
                  @click="goToOnlineCourse(item.courseId)"
                >
                  提交作业
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自测列表 -->
    <div v-if="currentTab === 'selfTest'" class="tab-content">
      <div 
        class="course-group" 
        v-for="courseTest in courseTests" 
        :key="courseTest.course.courseId"
      >
        <div class="course-title" @click="toggleCourse(courseTest.course.courseId)">
          <div class="course-title-left">
            <i class="icon-arrow" :class="{ 'icon-arrow-down': !isCollapsed(courseTest.course.courseId) }"></i>
            <h3>{{ courseTest.course.title }}</h3>
          </div>
          <span class="count-badge">{{ courseTest.tests.length }}个待完成测试</span>
        </div>

        <div class="tests-container" v-show="!isCollapsed(courseTest.course.courseId)">
          <div 
            class="todo-item" 
            v-for="item in courseTest.tests" 
            :key="item.recordId"
            @click="goToOnlineCourse(item.courseId)"
          >
            <div class="item-header">
              <span :class="['status-badge', getSelfTestStatusClass(item.status)]">
                {{ SELF_TEST_RECORD_STATUS[item.status] || "" }}
              </span>
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
                  <span class="deadline">截止日期: 2025-01-15 23:59:59</span>
                </div>
                <button
                  class="btn btn-primary btn-small"
                  v-if="item.status == '0'"
                  @click.stop="goToOnlineCourse(item.courseId)"
                >
                  开始测试
                </button>
              </div>
            </div>
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
import { SELF_TEST_RECORD_STATUS } from "@/constant/test";
import { getMyAssignmentDetails } from "@/services/api/assignment";
import { getMyTestRecords } from "@/services/api/testRecord";

const router = useRouter();
const currentTab = ref("homework");

interface CourseHomework {
  course: API.CourseVO;
  assignments: API.AssignmentDetailVO[];
}

interface CourseTest {
  course: API.CourseVO;
  tests: API.TestRecordVO[];
}

const courseHomeworks = ref<CourseHomework[]>([]);
const courseTests = ref<CourseTest[]>([]);

// 折叠状态管理
const collapsedCourses = ref<number[]>([]);

const toggleCourse = (courseId: number) => {
  const index = collapsedCourses.value.indexOf(courseId);
  if (index === -1) {
    collapsedCourses.value.push(courseId);
  } else {
    collapsedCourses.value.splice(index, 1);
  }
};

const isCollapsed = (courseId: number) => {
  return collapsedCourses.value.includes(courseId);
};

// 获取作业列表并按课程聚合
const fetchHomeworkList = async () => {
  try {
    const res = await getMyAssignmentDetails({
      current: 1,
      pageSize: 100000,
      //@ts-ignore
      param: {
        submissionStatus: "0",
      },
    });
    if (res.data) {
      // 使用reduce方法按课程id对作业进行聚合
      courseHomeworks.value = res.data.list.reduce((acc: CourseHomework[], assignment) => {
        const existingCourse = acc.find(
          item => item.course.courseId === assignment?.courseId
        );
        if (existingCourse) {
          existingCourse.assignments.push(assignment);
        } else {
          acc.push({
            course: assignment?.course,
            assignments: [assignment],
          });
        }
        return acc;
      }, []);
    }
  } catch (error) {
    console.error("获取作业列表失败:", error);
  }
};

// 获取自测列表并按课程聚合
const fetchSelfTestList = async () => {
  try {
    const res = await getMyTestRecords({
      current: 1,
      pageSize: 100000,
      param: {
        status: "0",
      },
    });
    if (res.data) {
      // 使用reduce方法按课程id对自测进行聚合
      courseTests.value = res.data.list.reduce((acc: CourseTest[], test) => {
        const existingCourse = acc.find(
          item => item.course.courseId === test.courseId
        );
        if (existingCourse) {
          existingCourse.tests.push(test);
        } else {
          acc.push({
            course: test.course,
            tests: [test],
          });
        }
        return acc;
      }, []);
    }
  } catch (error) {
    console.error("获取自测列表失败:", error);
  }
};

onMounted(() => {
  fetchHomeworkList();
  fetchSelfTestList();
});

const getStatusClass = (status: string) => {
  const classMap = {
    "0": "status-pending",
    "1": "status-submitted",
    "2": "status-completed",
  };
  return classMap[status] || status;
};

const getSelfTestStatusClass = (status: string) => {
  const classMap = {
    "0": "status-not-completed",
    "1": "status-completed",
  };
  return classMap[status] || status;
};

const goToOnlineCourse = (courseId: number) => {
  router.push({
    path: "/online-course",
    query: {
      courseId,
    },
  });
};
</script>

<style scoped>
@import '../styles/common.css';

/* 待办事项特定样式 */
.todo-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.item-header {
  margin-bottom: 12px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}

.status-pending {
  background: #fff7e6;
  color: #fa8c16;
}

.status-submitted {
  background: #e6f7ff;
  color: #1890ff;
}

.status-completed {
  background: #f6ffed;
  color: #52c41a;
}

.status-not-completed {
  background: #fff1f0;
  color: #f5222d;
}

.item-content h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.item-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.test-info {
  display: flex;
  gap: 20px;
  margin: 10px 0;
  color: #666;
  font-size: 14px;
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
.publish-time {
  color: #666;
  font-size: 14px;
}
</style>
