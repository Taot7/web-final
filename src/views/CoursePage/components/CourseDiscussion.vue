<template>
  <div class="discussion-container">
    <div class="discussion-header">
      <h2>课程讨论</h2>
      <div class="discussion-controls">
        <input type="text" class="search-input" placeholder="请输入关键字" v-model="searchText">
        <button class="post-btn" @click="startNewPost">发起讨论</button>
        <div class="filter">
          <label>
            <input type="checkbox" v-model="showTeacherOnly"> 
            仅显示教师参与
          </label>
          <select v-model="selectedFilter" @change="handleFilterChange">
            <option value="all">全部帖子</option>
            <option value="hot">热门</option>
            <option value="newest">最新</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="!showDetail">
      <div class="discussion-list">
        <div v-for="post in filteredPosts" :key="post.id" class="discussion-item" @click="showPostDetail(post.id)">
          <div class="user-avatar">
            <img :src="post.userAvatar" :alt="post.userName">
          </div>
          <div class="post-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
            <div class="post-meta">
              <span>{{ post.userName }}</span>
              <span v-if="post.isTeacher" class="teacher-tag">教师</span>
              <span>回复: {{ post.replyCount }}</span>
              <span>浏览: {{ post.viewCount }}</span>
              <span>最后更新: {{ post.lastUpdateTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <span>共{{ totalPosts }}条记录</span>
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
        :postId="currentPostId"
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
            <button class="submit-btn" @click="submitNewPost">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseDiscussionDetail from './CourseDiscussionDetail.vue'

export default {
  name: 'CourseDiscussion',
  components: {
    CourseDiscussionDetail
  },
  data() {
    return {
      searchText: '',
      showTeacherOnly: false,
      selectedFilter: 'all',
      currentPage: 1,
      totalPosts: 102,
      showNewPostDialog: false,
      newPost: {
        title: '',
        content: ''
      },
      discussionPosts: [
        {
          id: 1,
          title: '常见的软件开发方法',
          content: '结构化方法、面向数据结构方法、面向对象方法、形式化方法等都是软件开发中常用的方法。让我们一起探讨这些方法的优缺点及适用场景。',
          userName: '王教授',
          userAvatar: 'http://47.115.57.164:81/api/common/view/image?filename=20241208.b5bd6fddbb464e45a80a8a8aefd70727.%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240912152837.png',
          replyCount: 45,
          viewCount: 120,
          lastUpdateTime: '2024-11-29 10:30',
          isTeacher: true
        },
        {
          id: 2,
          title: '敏捷开发实践经验分享',
          content: '敏捷开发强调迭代、增量和适应性,如何在实际项目中有效实施敏捷方法?分享一下我在项目中的实践经验和心得体会。',
          userName: '张工',
          userAvatar: 'http://47.115.57.164:81/api/common/view/image?filename=20241208.b5bd6fddbb464e45a80a8a8aefd70727.%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240912152837.png',
          replyCount: 35,
          viewCount: 89,
          lastUpdateTime: '2024-11-28 15:20',
          isTeacher: false
        },
        {
          id: 3,
          title: '软件架构设计原则',
          content: '良好的软件架构是项目成功的关键。从高内聚低耦合到SOLID原则,探讨软件架构设计中应该遵循的重要原则。',
          userName: '李教授',
          userAvatar: 'http://47.115.57.164:81/api/common/view/image?filename=20241208.b5bd6fddbb464e45a80a8a8aefd70727.%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240912152837.png',
          replyCount: 28,
          viewCount: 76,
          lastUpdateTime: '2024-11-27 14:30',
          isTeacher: true
        },
        {
          id: 4,
          title: '代码重构的艺术',
          content: '如何识别和重构糟糕的代码?通过实际案例分享代码重构的技巧和经验,提高代码的可维护性和可读性。',
          userName: '刘程',
          userAvatar: 'http://47.115.57.164:81/api/common/view/image?filename=20241208.b5bd6fddbb464e45a80a8a8aefd70727.%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240912152837.png',
          replyCount: 52,
          viewCount: 95,
          lastUpdateTime: '2024-11-26 16:15',
          isTeacher: false
        },
        {
          id: 5,
          title: '软件测试策略与方法',
          content: '全面的软件测试对保证产品质量至关重要。从单元测试到集成测试,从自动化测试到性能测试,探讨如何制定有效的测试策略。',
          userName: '陈测',
          userAvatar: 'http://47.115.57.164:81/api/common/view/image?filename=20241208.b5bd6fddbb464e45a80a8a8aefd70727.%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240912152837.png',
          replyCount: 68,
          viewCount: 150,
          lastUpdateTime: '2024-11-25 09:45',
          isTeacher: false
        }
      ],
      showDetail: false,
      currentPostId: null
    }
  },
  computed: {
    filteredPosts() {
      let posts = [...this.discussionPosts];
      
      // 先根据是否只显示教师参与的帖子进行筛选
      if (this.showTeacherOnly) {
        posts = posts.filter(post => post.isTeacher);
      }
      
      // 再根据排序方式进行排序
      if (this.selectedFilter === 'hot') {
        posts.sort((a, b) => b.replyCount - a.replyCount);
      } else if (this.selectedFilter === 'newest') {
        posts.sort((a, b) => new Date(b.lastUpdateTime) - new Date(a.lastUpdateTime));
      }
      
      return posts;
    }
  },
  methods: {
    startNewPost() {
      this.showNewPostDialog = true;
    },
    closeDialog() {
      this.showNewPostDialog = false;
      this.newPost = {
        title: '',
        content: ''
      };
    },
    submitNewPost() {
      if (!this.newPost.title || !this.newPost.content) {
        alert('请填写完整的标题和内容');
        return;
      }
      
      // 这里添加发布新帖子的逻辑
      const post = {
        id: this.discussionPosts.length + 1,
        title: this.newPost.title,
        content: this.newPost.content,
        userName: '当前用户',
        userAvatar: 'http://47.115.57.164:81/api/common/view/image?filename=20241208.b5bd6fddbb464e45a80a8a8aefd70727.%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240912152837.png',
        replyCount: 0,
        viewCount: 0,
        lastUpdateTime: new Date().toLocaleString(),
        isTeacher: false // 默认发帖用户不是教师
      };
      
      this.discussionPosts.unshift(post);
      this.closeDialog();
    },
    goToPage(direction) {
      if (direction === 'prev' && this.currentPage > 1) {
        this.currentPage--
      } else if (direction === 'next') {
        this.currentPage++
      }
    },
    handleFilterChange() {
      this.currentPage = 1; // 切换筛选时重置页码
    },
    showPostDetail(postId) {
      this.currentPostId = postId;
      this.showDetail = true;
    }
  }
}
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