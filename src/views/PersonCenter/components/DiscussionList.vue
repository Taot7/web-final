<template>
  <div class="discussion-list list-container">
    <div class="list-header">
      <h2>我的讨论</h2>
      <button class="btn btn-primary" @click="openDiscussionDialog()">
        <i class="icon-plus"></i>
        新增讨论
      </button>
    </div>

    <!-- 课程讨论列表 -->
    <div
      class="course-group"
      v-for="courseDiscussion in courseDiscussions"
      :key="courseDiscussion?.course?.courseId || 0"
    >
      <div
        class="course-title"
        @click="toggleCourse(courseDiscussion.course.courseId)"
      >
        <div class="course-title-left">
          <i
            :class="[
              'icon-arrow',
              {
                'icon-arrow-down': !isCollapsed(
                  courseDiscussion.course.courseId
                ),
              },
            ]"
          ></i>
          <h3>{{ courseDiscussion?.course?.title || "" }}</h3>
        </div>
        <span class="discussion-count"
          >{{ courseDiscussion?.discussions.length || 0 }}条讨论</span
        >
      </div>

      <div
        class="discussions-container"
        v-show="!isCollapsed(courseDiscussion.course.courseId)"
      >
        <div
          class="discussion-item"
          v-for="discussion in courseDiscussion?.discussions || []"
          :key="discussion.discussionId"
          @click="
            goToDiscussion(
              courseDiscussion.course.courseId,
              discussion.discussionId
            )
          "
        >
          <div class="discussion-meta">
            <span class="discussion-date">{{ discussion.createTime }}</span>
            <div class="discussion-actions">
              <button
                class="btn btn-secondary btn-small"
                @click.stop="openDiscussionDialog(discussion)"
              >
                <i class="icon-edit"></i>
                编辑
              </button>
              <button
                class="btn btn-danger btn-small"
                @click.stop="removeDiscussion(discussion.discussionId)"
              >
                <i class="icon-delete"></i>
                删除
              </button>
            </div>
          </div>
          <h4 class="discussion-title">{{ discussion?.title }}</h4>
          <div class="discussion-content">{{ discussion?.content }}</div>

          <!-- 回复列表 -->
          <div class="replies-section">
            <div class="reply-count">
              <i class="icon-chat"></i>
              {{ discussion?.replyCount || 0 }}条回复
            </div>
            <div class="reply-list">
              <div
                class="reply-item"
                v-for="reply in discussion.replyList"
                :key="reply.replyId"
              >
                <div class="reply-header">
                  <div class="reply-user">
                    <img
                      :src="
                        reply.user.avatarUrl ||
                        '/src/assets/images/default-avatar.png'
                      "
                      class="reply-avatar"
                    />
                    {{ reply.user.username || "" }}
                  </div>
                  <div class="reply-time">{{ reply.createTime || "" }}</div>
                </div>
                <div class="reply-content">{{ reply.content || "" }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增/编辑讨论对话框 -->
    <div v-if="dialogVisible" class="dialog-overlay">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>{{ dialogTitle }}</h3>
          <button class="close-btn" @click="handleClose">×</button>
        </div>

        <div class="dialog-body">
          <div class="form-item">
            <label>课程</label>
            <select
              v-model="discussionForm.courseId"
              :disabled="!!discussionForm.id"
            >
              <option value="">请选择课程</option>
              <option
                v-for="course in courseList"
                :key="course.courseId"
                :value="course.courseId"
              >
                {{ course.title }}
              </option>
            </select>
          </div>

          <div class="form-item">
            <label>标题</label>
            <input
              type="text"
              v-model="discussionForm.title"
              placeholder="请输入讨论标题"
            />
          </div>

          <div class="form-item">
            <label>内容</label>
            <textarea
              v-model="discussionForm.content"
              rows="4"
              placeholder="请输入讨论内容"
            ></textarea>
          </div>
        </div>

        <div class="dialog-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="submit-btn" @click="handleSubmit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  deleteDiscussion,
  getMyDiscussions,
  addDiscussion,
  updateDiscussion,
} from "@/services/api/discussion";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMyCourseEnrollments } from "@/services/api/courseEnrollment";

const router = useRouter();

interface Reply {
  id: number;
  userName: string;
  userAvatar: string;
  content: string;
  createTime: string;
}

interface Discussion {
  id: number;
  title: string;
  content: string;
  createTime: string;
  replies: Reply[];
}

interface CourseDiscussion {
  course: API.CourseVO;
  discussions: API.DiscussionWithReplyVO[];
}

const courseDiscussions = ref<CourseDiscussion[]>([]);
const discussions = ref<API.DiscussionWithReplyVO[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref("新增讨论");
const courseList = ref<API.CourseVO[]>([]);
const discussionForm = ref({
  id: undefined,
  title: "",
  content: "",
  courseId: undefined,
});

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

// 获取讨论列表
const fetchDiscussions = async () => {
  try {
    const res = await getMyDiscussions({
      current: 1,
      pageSize: 100000,
      param: {},
    });
    if (res.status === 200) {
      discussions.value = res.data.list || [];
      //使用reduce方法按课程id对讨论进行聚合
      courseDiscussions.value = discussions.value.reduce(
        (acc: CourseDiscussion[], discussion) => {
          const existingCourse = acc.find(
            (item) => item.course.courseId === discussion?.course?.courseId
          );
          if (existingCourse) {
            existingCourse.discussions.push(discussion);
          } else {
            acc.push({
              course: discussion.course,
              discussions: [discussion],
            });
          }
          return acc;
        },
        []
      );
      console.log(courseDiscussions.value);
    }
  } catch (error) {
    console.error("获取讨论列表失败:", error);
  }
};

// 模拟数据
onMounted(() => {
  fetchDiscussions();
  loadCourseList();
});

const removeDiscussion = async (id: number) => {
  try {
    //使用接口删除
    const res = await deleteDiscussion({
      id,
    });
    if (res.status === 200) {
      alert("删除成功");
      await fetchDiscussions();
    }
  } catch (error) {
    console.error("删除讨论失败:", error);
  }
};

const goToDiscussion = (courseId: number, discussionId: number) => {
  router.push({
    path: "/online-course",
    query: {
      courseId,
    },
  });
};

// 加载课程列表
const loadCourseList = async () => {
  try {
    const res = await getMyCourseEnrollments({
      current: 1,
      pageSize: 1000,
      param: {},
    });
    courseList.value = res.data.list.map((item) => item.course);
  } catch (error) {
    console.error("获取课程列表失败:", error);
  }
};

// 打开对话框
const openDiscussionDialog = (discussion?: API.DiscussionWithReplyVO) => {
  dialogVisible.value = true;
  dialogTitle.value = discussion ? "编辑讨论" : "新增讨论";

  if (discussion) {
    // 编辑时，设置表单数据并禁用课程选择
    discussionForm.value = {
      id: discussion.discussionId,
      title: discussion.title,
      content: discussion.content,
      courseId: discussion.course.courseId,
    };
  } else {
    // 新增时，重置表单
    discussionForm.value = {
      id: undefined,
      title: "",
      content: "",
      courseId: undefined,
    };
  }
};

// 处理提交
const handleSubmit = async () => {
  try {
    if (discussionForm.value.id) {
      // 编辑
      await updateDiscussion(
        {
          id: discussionForm.value.id,
        },
        {
          title: discussionForm.value.title,
          content: discussionForm.value.content,
        }
      );
      alert("编辑成功");
    } else {
      // 新增
      await addDiscussion({
        title: discussionForm.value.title,
        content: discussionForm.value.content,
        courseId: discussionForm.value.courseId,
      });
      alert("新增成功");
    }
    dialogVisible.value = false;
    fetchDiscussions(); // 刷新列表
  } catch (error) {
    console.error("操作失败:", error);
    alert("操作失败，请重试");
  }
};

// 处理关闭
const handleClose = () => {
  dialogVisible.value = false;
  discussionForm.value = {
    id: undefined,
    title: "",
    content: "",
    courseId: undefined,
  };
};
</script>

<style scoped>
@import '../styles/common.css';

.discussion-list {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.discussion-header {
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.discussion-header h2 {
  color: #333;
  font-size: 24px;
}

.add-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #1565c0;
  transform: translateY(-2px);
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.dialog-content {
  background: white;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: dialogSlideIn 0.3s ease;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h3 {
  margin: 0;
  font-size: 20px;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.dialog-body {
  padding: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-item input,
.form-item textarea,
.form-item select {
  width: 95%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-item input:focus,
.form-item textarea:focus,
.form-item select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-item textarea {
  resize: vertical;
  min-height: 100px;
}

.dialog-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn,
.submit-btn {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
}

.cancel-btn:hover {
  background: #e8e8e8;
  border-color: #ccc;
}

.submit-btn {
  background: #1976d2;
  border: none;
  color: white;
}

.submit-btn:hover {
  background: #1565c0;
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);
}

/* 讨论列表样式 */
.course-discussions {
  margin-bottom: 40px;
}

.course-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background: #f5f7fa;
  cursor: pointer;
  transition: all 0.3s ease;
}

.course-title:hover {
  background: #e8eaed;
}

.course-title-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>')
    no-repeat center;
  transform: rotate(0deg);
}

.icon-arrow-down {
  transform: rotate(90deg);
}

.course-title h3 {
  color: #2c3e50;
  font-size: 20px;
  margin: 0;
}

.discussion-count {
  color: #666;
  background: #fff;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 14px;
}

.discussion-item {
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.discussion-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.discussion-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
}

.discussion-actions {
  display: flex;
  gap: 8px;
}

.discussion-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.discussion-content {
  color: #333;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* 添加禁用状态的样式 */
.form-item select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 回复区域样式 */
.reply-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reply-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.reply-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.reply-time {
  color: #999;
  font-size: 12px;
}

.reply-content {
  color: #333;
  line-height: 1.6;
  margin-left: 46px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.reply-item {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.reply-item:hover {
  background-color: #f5f7fa;
}

.reply-count {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  margin-bottom: 12px;
}

.icon-chat {
  font-size: 16px;
}
</style>
