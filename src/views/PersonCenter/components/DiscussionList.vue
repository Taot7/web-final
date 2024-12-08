<template>
  <div class="discussion-list">
    <div class="discussion-header">
      <h2>我的讨论</h2>
    </div>

    <!-- 课程讨论列表 -->
    <div class="course-discussions" v-for="course in courseDiscussions" :key="course.id">
      <div class="course-title">
        <h3>{{ course.name }}</h3>
        <span class="discussion-count">{{ course.discussions.length }}条讨论</span>
      </div>

      <div class="discussions-container">
        <div class="discussion-item" v-for="discussion in course.discussions" :key="discussion.id" @click="goToDiscussion(course.id, discussion.id)">
          <div class="discussion-meta">
            <span class="discussion-date">{{ discussion.createTime }}</span>
            <div class="discussion-actions">
              <button class="delete-btn" @click.stop="deleteDiscussion(discussion.id)">
                <i class="icon-delete"></i>
                删除
              </button>
            </div>
          </div>
          <h4 class="discussion-title">{{ discussion.title }}</h4>
          <div class="discussion-content">{{ discussion.content }}</div>
          
          <!-- 回复列表 -->
          <div class="replies-section">
            <div class="reply-count">
              <i class="icon-chat"></i>
              {{ discussion.replies.length }}条回复
            </div>
            <div class="reply-list">
              <div class="reply-item" v-for="reply in discussion.replies" :key="reply.id">
                <div class="reply-header">
                  <div class="reply-user">
                    <img :src="reply.userAvatar" class="reply-avatar">
                    {{ reply.userName }}
                  </div>
                  <div class="reply-time">{{ reply.createTime }}</div>
                </div>
                <div class="reply-content">{{ reply.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Reply {
  id: number
  userName: string
  userAvatar: string
  content: string
  createTime: string
}

interface Discussion {
  id: number
  title: string
  content: string
  createTime: string
  replies: Reply[]
}

interface CourseDiscussion {
  id: number
  name: string
  discussions: Discussion[]
}

const courseDiscussions = ref<CourseDiscussion[]>([])

// 模拟数据
onMounted(() => {
  courseDiscussions.value = [
    {
      id: 1,
      name: "Web前端开发实战",
      discussions: [
        {
          id: 1,
          title: "Vue3 组件通信问题",
          content: "在使用Vue3的组件通信时遇到了一些问题，props传值不成功，请问有遇到类似情况的同学吗？",
          createTime: "2023-10-15 14:30",
          replies: [
            {
              id: 1,
              userName: "张老师",
              userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
              content: "建议检查一下props的类型定义是否正确，另外可以使用vue devtools查看组件状态。",
              createTime: "2023-10-15 15:00"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Java程序设计",
      discussions: [
        {
          id: 2,
          title: "Spring Boot配置问题",
          content: "application.yml中的配置不生效，求解答",
          createTime: "2023-10-14 10:20",
          replies: [
            {
              id: 2,
              userName: "李助教",
              userAvatar: "https://randomuser.me/api/portraits/women/1.jpg", 
              content: "请检查配置文件的位置是否正确，建议放在resources目录下",
              createTime: "2023-10-14 10:30"
            }
          ]
        }
      ]
    }
  ]
})

const deleteDiscussion = (id: number) => {
  alert('删除成功')
  courseDiscussions.value = courseDiscussions.value.map(course => ({
    ...course,
    discussions: course.discussions.filter(d => d.id !== id)
  }))
}

const goToDiscussion = (courseId: number, discussionId: number) => {
  router.push({
    name: 'onlineCourse',
    params: { courseId },
    query: { 
      tab: 'discussion',
      discussionId
    }
  })
}
</script>

<style scoped>
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
}

.discussion-header h2 {
  color: #333;
  font-size: 24px;
}

.course-discussions {
  margin-bottom: 40px;
}

.course-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.course-title h3 {
  color: #2c3e50;
  font-size: 20px;
}

.discussion-count {
  color: #666;
  background: #f0f2f5;
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

.delete-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.delete-btn:hover {
  background: #ff7875;
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

.replies-section {
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 15px;
}

.reply-count {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.reply-count i {
  margin-right: 5px;
}

.reply-item {
  padding: 15px;
  background: #f9f9f9;
  margin-bottom: 12px;
  border-radius: 8px;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.reply-user {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #2c3e50;
}

.reply-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.reply-content {
  color: #333;
  line-height: 1.6;
}

.reply-time {
  font-size: 12px;
  color: #999;
}
</style>
