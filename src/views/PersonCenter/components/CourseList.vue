<template>
  <div class="course-list list-container">
    <div class="list-header">
      <h2>我的课程</h2>
      <div class="tab-group">
        <div 
          class="tab-item" 
          :class="{ active: currentTab === 'learning' }"
          @click="handleTabChange('learning')"
        >
          开课中
        </div>
        <div 
          class="tab-item" 
          :class="{ active: currentTab === 'upcoming' }"
          @click="handleTabChange('upcoming')"
        >
          即将开始
        </div>
        <div 
          class="tab-item" 
          :class="{ active: currentTab === 'completed' }"
          @click="handleTabChange('completed')"
        >
          已结束
        </div>
        <div 
          class="tab-item" 
          :class="{ active: currentTab === 'favorite' }"
          @click="handleTabChange('favorite')"
        >
          关注的课程
        </div>
      </div>
    </div>

    <div class="tab-content">
      <div class="course-container">
        <div
          v-for="enrollment in courseList"
          :key="enrollment.enrollmentId"
          class="course-item"
        >
          <div class="course-cover" @click="goToCourse(enrollment.courseId)">
            <img :src="enrollment.course.coverImage" alt="课程封面" />
          </div>
          <div class="course-info">
            <h3 class="course-title">{{ enrollment?.course?.title || "" }}</h3>
            <div class="progress-info">
              <div class="progress-text">
                <span v-if="currentTab !== 'upcoming'">待完成作业: {{ 0 }}</span>
                <span>已完成进度: {{ currentTab === 'upcoming' ? 0 : enrollment.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress"
                  :style="{ width: currentTab === 'upcoming' ? '0%' : enrollment.progress + '%' }"
                ></div>
              </div>
            </div>
            <div class="course-meta">
              <span class="course-date">
                <i class="iconfont icon-time"></i>
                {{ currentTab === 'upcoming' ? '发布时间: 2025-02-14' : '创建时间: ' + enrollment.createTime }}
              </span>
              <span class="course-status">
                <i class="iconfont icon-status"></i>
                状态:
                {{ COURSE_ENROLLMENT_STATUS[enrollment.status] }}
              </span>
            </div>
          </div>
          <div class="course-actions">
            <button
              class="continue-btn"
              @click="goToOnlineCourse(enrollment.courseId)"
            >
              继续学习
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COURSE_ENROLLMENT_STATUS } from "@/constant/course";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getMyCourseEnrollments } from "@/services/api/courseEnrollment";

const router = useRouter();

const goToCourse = (courseId: number) => {
  router.push("/course/" + courseId);
};
const goToOnlineCourse = (courseId: number) => {
  router.push({
    path: "/online-course",
    query: {
      courseId,
    },
  });
};


const tabs = [
  { label: "开课中", value: "learning" },
  { label: "即将开始", value: "upcoming" },
  { label: "已结束", value: "completed" },
  { label: "关注的课程", value: "favorite" },
];

const currentTab = ref<"learning" | "upcoming" | "completed" | "favorite">(
  "learning"
);
const courseList = ref<API.CourseEnrollmentVO[]>([]);

const loadCourseList = async () => {
  let status: "0" | "1" | "2" | "3" = undefined;

  switch (currentTab.value) {
    case "learning":
      status = "1";
      break;
    case "upcoming":
      status = "0";
      break;
    case "completed":
      status = "2";
      break;
    case "favorite":
      status = "3";
      break;
  }

  try {
    const response = await getMyCourseEnrollments({
      current: 1,
      pageSize: 100,
      param: { status },
    });
    courseList.value = response.data.list;
  } catch (error) {
    console.error("获取课程列表失败", error);
  }
};

const handleTabChange = (tab: string) => {
  currentTab.value = tab as typeof currentTab.value;
  loadCourseList();
};

onMounted(() => {
  loadCourseList();
});
</script>

<style scoped>
@import '../styles/common.css';

.course-list {
  padding: 20px;
}

.course-header {
  margin-bottom: 20px;
}

.course-header h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.course-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-item {
  display: flex;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  gap: 20px;
  background: #fff;
}

.course-cover {
  width: 200px;
  height: 120px;
  overflow: hidden;
  border-radius: 4px;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-info {
  flex: 1;
}

.course-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.progress-info {
  margin: 15px 0;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.progress-bar {
  height: 6px;
  background: #eee;
  border-radius: 3px;
}

.progress {
  height: 100%;
  background: #1976d2;
  border-radius: 3px;
  transition: width 0.3s;
}

.course-date {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
}

.continue-btn {
  align-self: center;
  padding: 8px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.continue-btn:hover {
  background: #1565c0;
}

.tab-header {
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 25px;
}

.tab-item {
  padding: 12px 25px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-item:hover {
  color: #667eea;
}

.tab-item.active {
  color: #667eea;
  border-bottom: 2px solid #667eea;
}
</style>
