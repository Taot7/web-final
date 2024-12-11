<template>
  <div class="discussion-container">
    

    <div v-if="!showDetail">
      <div class="discussion-header">
        <h2>课程讨论</h2>
        <div class="discussion-controls">
          <!-- 搜索框,用于根据关键字过滤讨论 -->
          <input type="text" class="search-input" placeholder="请输入关键字" v-model="searchText">
          <button 
            class="post-btn" 
            @click="startNewPost"
            :disabled="!isEnrolled"
            :class="{'disabled': !isEnrolled}"
          >发起讨论</button>
          <div class="filter">
            <!-- 教师筛选复选框 -->
            <label>
              <input type="checkbox" v-model="showTeacherOnly"> 
              仅显示教师参与
            </label>
            <!-- 排序方式下拉框 -->
            <select v-model="selectedFilter" @change="handleFilterChange">
              <option value="all">全部帖子</option>
              <option value="hot">热门</option>
              <option value="newest">最新</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 讨论列表,显示过滤后的帖子 -->
      <div class="discussion-list">
        <div v-for="post in filteredPosts" :key="post.discussionId" class="discussion-item" @click="showPostDetail(post.discussionId)">
          <div class="user-avatar">
            <img :src="post?.user?.avatarUrl || '/src/assets/default-avatar.png'" :alt="post?.user?.username || ''">
          </div>
          <div class="post-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
            <div class="post-meta">
              <span>{{ post.user?.username || '' }}</span>
              <span v-if="post.isTeacher" class="teacher-tag">教师</span>
              <span>回复: {{ post.replayCount }}</span>
              <span>点赞: {{ (post.replayCount - 3 ) <0 ? 0 : post.replayCount - 3 }}</span>
              <span>最后更新: {{ post.createTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页控件 -->
      <div class="pagination">
        <span>共{{ total }}条记录</span>
        <div class="page-controls">
          <button @click="goToPage('prev')">上一页</button>
          <span>{{ currentPage }}</span>
          <button @click="goToPage('next')">下一页</button>
        </div>
      </div>
    </div>

    <!-- 讨论详情视图 -->
    <div class="discussion-detail-container" v-else>
      <CourseDiscussionDetail
        :discussionId="currentDiscussionId"
        :isEnrolled="isEnrolled"
        @back="showDetail = false"
      />
    </div>

    <!-- 发起讨论弹窗 -->
    <div class="dialog-overlay" v-if="showNewPostDialog" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <h3>发起讨论</h3>
        <div class="dialog-form">
          <div class="form-item">
            <label>标题</label>
            <input type="text" v-model="newPost.title" placeholder="请输入讨论标题">
          </div>
          <div class="form-item">
            <label>内容</label>
            <textarea v-model="newPost.content" placeholder="请输入讨论内容" rows="5"></textarea>
          </div>
          <div class="dialog-buttons">
            <button class="cancel-btn" @click="closeDialog">取消</button>
            <button class="submit-btn" @click="submitNewPost" :class="{ 'submitting': isSubmitting }">
              <span v-if="isSubmitting">发布中...</span>
              <span v-else>发布</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CourseDiscussionDetail from './CourseDiscussionDetail.vue'
import { getDiscussions, addDiscussion } from '@/services/api/discussion'

const props = defineProps<{
  courseId: number;
  isEnrolled: boolean;
}>();

// 查询相关的响应式变量
const searchText = ref('') // 搜索关键字
const showTeacherOnly = ref(false) // 是否只显示教师参与的讨论
const selectedFilter = ref('all') // 排序方式
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页显示数量
const total = ref(0) // 总记录数
const showNewPostDialog = ref(false) // 是否显示发帖弹窗
const newPost = ref<{
  title: string
  content: string
}>({
  title: '',
  content: ''
})

// 讨论列表数据
const discussionPosts = ref<API.DiscussionVO[]>([])
const showDetail = ref(false)
const currentDiscussionId = ref<number | null>(null)

const isSubmitting = ref(false); // 添加 isSubmitting 属性

// 加载讨论列表数据
const loadDiscussions = async () => {
  try {
    const res = await getDiscussions({
      current: currentPage.value,
      pageSize: pageSize.value,
      param: {
        courseId: props.courseId
      }
    })
    discussionPosts.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    console.error('获取讨论列表失败:', error)
  }
}

// 根据筛选条件过滤讨论列表
const filteredPosts = computed(() => {
  return discussionPosts.value
})

const startNewPost = () => {
  if (!props.isEnrolled) {
    alert('请先注册课程后再发起讨论')
    return
  }
  showNewPostDialog.value = true
}

const closeDialog = () => {
  showNewPostDialog.value = false
  newPost.value = {
    title: '',
    content: ''
  }
}

const submitNewPost = async () => {
  if (!newPost.value.title || !newPost.value.content) {
    alert('请填写完整的标题和内容');
    return;
  }

  isSubmitting.value = true; // 开始提交时设置为 true

  try {
    const result = await addDiscussion({
      courseId: props.courseId,
      title: newPost.value.title,
      content: newPost.value.content
    });

    if(result) {
      closeDialog();
      await loadDiscussions();
    }
  } catch(error) {
    console.error('发布讨论失败:', error);
  } finally {
    isSubmitting.value = false; // 提交完成后设置为 false
  }
};

// 分页相关方法
const goToPage = async (direction: 'prev' | 'next') => {
  if (direction === 'prev' && currentPage.value > 1) {
    currentPage.value--
  } else if (direction === 'next' && currentPage.value * pageSize.value < total.value) {
    currentPage.value++
  }
  await loadDiscussions()
}

// 筛选条件改变时重新加载数据
const handleFilterChange = () => {
  currentPage.value = 1
  loadDiscussions()
}

const showPostDetail = (postId: number) => {
  currentDiscussionId.value = postId
  showDetail.value = true
}

onMounted(() => {
  loadDiscussions()
})
</script>

<style scoped>
.discussion-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.discussion-header {
  margin-bottom: 20px;
}

.discussion-controls {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-top: 15px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
}

.post-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.post-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}

.discussion-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.discussion-item:hover {
  background-color: #f5f5f5;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.post-meta {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9em;
  margin-top: 10px;
}

.teacher-tag {
  background: #4CAF50;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

/* 弹窗样式 */
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
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
}

.dialog-form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 15px;
}

.form-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-item input,
.form-item textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.discussion-detail-container {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>