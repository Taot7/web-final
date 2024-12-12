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
      </div>
    </div>

    <div class="tab-content">
      <div class="course-container">
        <div
          v-for="course in courseList"
          :key="course.courseId"
          class="course-item"
        >
          <div class="course-cover" @click="goToCourse(course.courseId)">
            <img :src="course?.coverImage || '/src/assets/try1.png'" alt="课程封面" />
          </div>
          <div class="course-info">
            <h3 class="course-title">{{ course?.title || "" }}</h3>
            <div class="progress-info">
              <div class="progress-text">
                <span v-if="currentTab !== 'upcoming'">待完成作业: {{ course.unCommittedCount }}</span>
                <span>已完成进度: {{ currentTab === 'upcoming' ? 0 : course.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress"
                  :style="{ width: currentTab === 'upcoming' ? '0%' : course.progress + '%' }"
                ></div>
              </div>
            </div>
            <div class="course-meta">
              <span class="course-date">
                <i class="iconfont icon-time"></i>
                {{ currentTab === 'upcoming' ? '发布时间: 2025-02-14' : '创建时间: ' + course.createTime }}
              </span>
              <span class="course-status">
                <i class="iconfont icon-status"></i>
                状态:
                {{ COURSE_STATUS[course.status] }}
              </span>
            </div>
          </div>
          <div class="course-actions">
            <button
              class="continue-btn"
              @click="goToOnlineCourse(course.courseId)"
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
import { COURSE_ENROLLMENT_STATUS, COURSE_STATUS } from "@/constant/course";
import { getAssignmentStatInfo } from "@/services/api/assignment";
import { getMyCoursesWithEnroll } from "@/services/api/course";
import { useUser } from "@/utils/userAuth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToCourse = (courseId: number) => {
  router.push("/course/" + courseId).then(()=>{
    location.reload()
  })
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
interface CourseWithStat extends API.CourseWithEnrollVO{
  unCommittedCount:number
}
const courseList = ref<CourseWithStat[]>([]);



const loadCourseList = async () => {
  let statusGroup:{
    status: "0" | "1" | "2" |undefined,
    enrollStatus: "0" | "1" | "2" |undefined
  }

  switch (currentTab.value) {
    // 开课中
    case "learning":
      statusGroup = {
        status: "1",
        enrollStatus: "0",
      };
      break;
    case "upcoming":
      statusGroup = {
        status: "0",
        enrollStatus: "0",
      };
      break;
    case "completed":
      statusGroup = {
        status: "2",
        enrollStatus: "0",
      };
      break;
    case "favorite":
      statusGroup = {
        status: undefined,
        enrollStatus: "1",
      };
      break;
  }

  try {
    const response = await getMyCoursesWithEnroll({
      current: 1,
      pageSize: 100,
      param: { 
        status: statusGroup.status,
        enrollStatus: statusGroup.enrollStatus,
      },
    });
    courseList.value = response?.data?.list as CourseWithStat[] || []

    for(const course of courseList.value){
      try{
        const statsRes = await getAssignmentStatInfo({
          //@ts-ignore
        param: {
          courseId: course.courseId,
          studentId: useUser().currentUser.value.userId
        } 
        }) 
        course.unCommittedCount = statsRes?.data?.unCommittedCount || 0
      }catch(error){
        course.unCommittedCount = 0
      }
    }
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
