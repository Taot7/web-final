<template>
  <div class="discussion-detail">
    <!-- 返回按钮 -->
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <i class="back-icon">←</i> 返回讨论列表
      </button>
    </div>

    <!-- 主贴内容 -->
    <div class="main-post">
      <div class="post-header">
        <h2 class="post-title">{{ discussion.title }}</h2>
        <div class="post-info">
          <div class="user-info">
            <img
              :src="
                discussion?.user?.avatarUrl || defaultAvatar
              "
              :alt="discussion?.user?.username || '用户'"
              class="avatar"
            />
            <span class="username">{{
              discussion?.user?.username || "用户"
            }}</span>
            <span v-if="discussion?.isTeacher || false" class="teacher-tag"
              >教师</span
            >
          </div>
          <span class="post-time">发布于 {{ discussion?.createTime }}</span>
        </div>
      </div>
      <div class="post-content">
        {{ discussion?.content }}
      </div>
      <div class="post-actions">
        <div class="action-buttons">
          <button class="action-btn like-btn" @click="handleLike">
            <i class="like-icon">👍</i> {{ (discussion?.replayCount -2 ) <0?0: discussion?.replayCount -2 }}
          </button>
          <button class="action-btn reply-btn" @click="focusReply" v-if="props.isEnrolled">
            <i class="reply-icon">💬</i> 回复
          </button>
        </div>
      </div>
    </div>

    <!-- 回复列表 -->
    <div class="replies-section">
      <h3 class="replies-title">全部回复 ({{ totalReplies }})</h3>
      <div class="reply-list">
        <div
          v-for="reply in paginatedReplies"
          :key="reply.replyId"
          class="reply-item"
        >
          <div class="reply-header">
            <div class="user-info">
              <img
                :src="reply.user?.avatarUrl || defaultAvatar"
                :alt="reply.user?.username || '用户'"
                class="avatar"
              />
              <span class="username">{{ reply.user?.username || '用户' }}</span>
              <span v-if="reply.isTeacher" class="teacher-tag">教师</span>
            </div>
            <span class="reply-time">{{ reply.createTime }}</span>
          </div>
          <div class="reply-content">
            {{ reply.content }}
          </div>
          <div class="reply-actions">
            <div class="action-buttons">
              <button
                class="action-btn like-btn"
                @click="handleReplyLike(reply)"
              >
                <i class="like-icon">👍</i> {{ reply.likeCount }}
              </button>
              <button
                class="action-btn reply-btn"
                @click="handleReplyToReply(reply)"
                v-if="props.isEnrolled"
              >
                回复
              </button>
            </div>
          </div>

          <!-- 子回复列表 -->
          <div
            v-if="reply.subReplies && reply.subReplies.length > 0"
            class="sub-replies-container"
          >
            <div class="sub-replies-header" @click="toggleSubReplies(reply)">
              <span
                >{{ reply.showSubReplies ? "收起" : "展开"
                }}{{ reply.subReplies.length }}条回复</span
              >
              <i class="toggle-icon" :class="{ rotated: reply.showSubReplies }"
                >▼</i
              >
            </div>
            <div class="sub-replies" v-show="reply.showSubReplies">
              <div
                v-for="subReply in reply.subReplies"
                :key="subReply.replyId"
                class="sub-reply-item"
              >
                <div class="sub-reply-header">
                  <div class="user-info">
                    <img
                      :src="subReply.user?.avatarUrl || defaultAvatar"
                      :alt="subReply.user?.username || '用户'"
                      class="sub-avatar"
                    />
                    <span class="sub-username">{{ subReply.user?.username || '用户' }}</span>
                    <span v-if="subReply.isTeacher" class="teacher-tag"
                      >教师</span
                    >
                  </div>
                  <span class="sub-reply-time">{{ subReply.createTime }}</span>
                </div>
                <div class="sub-reply-content">
                  <span class="reply-to">回复 @{{ subReply.replyTo?.username || '用户' }}:</span>
                  {{ subReply.content }}
                </div>
                <div class="reply-actions">
                  <div class="action-buttons">
                    <button
                      class="action-btn like-btn"
                      @click="handleSubReplyLike(subReply as BaseReply)"
                    >
                      <i class="like-icon">👍</i> {{ subReply.likeCount }}
                    </button>
                    <button
                      class="action-btn reply-btn"
                      @click="handleReplyToSubReply(reply, subReply as BaseReply)"
                      v-if="props.isEnrolled"
                    >
                      回复
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页控件 -->
      <div class="pagination">
        <button
          class="page-btn"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          上一页
        </button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 回复输入框 -->
    <div class="reply-input-section" ref="replySection" v-if="props.isEnrolled">
      <textarea
        v-model="newReply"
        placeholder="写下你的回复..."
        class="reply-input"
        rows="4"
      ></textarea>
      <button class="submit-btn" @click="submitReply" :disabled="isSubmitting">
        <span v-if="isSubmitting">
          <i class="fas fa-spinner fa-spin"></i> 发表中...
        </span>
        <span v-else>发表回复</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addReply,
  getDiscussion,
  getDiscussionReplies,
} from "@/services/api/discussion";
import { ref, computed, onMounted } from "vue";
import defaultAvatar from '@/assets/default-avatar.png';

interface Props {
  discussionId: string | number;
  isEnrolled: boolean;
}
interface BaseReply extends API.DiscussionReplyWithSubVO {
  showSubReplies: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["back"]);

const discussion = ref<API.DiscussionVO>({});
const replies = ref<BaseReply[]>([]);
const newReply = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const replyingTo = ref<{ reply: BaseReply; type: "main" | "sub" } | null>(null);
const totalReplies = ref(0);
const replySection = ref<HTMLElement | null>(null);
const isSubmitting = ref(false);

const totalPages = computed(() =>
  Math.ceil(totalReplies.value / pageSize.value)
);

const paginatedReplies = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return replies.value.slice(start, end);
});

// 获取评论详情和评论列表
const fetchData = async () => {
  // 获取讨论详情
  const discussionData = await getDiscussion({
    id: Number(props.discussionId),
  });
  discussion.value = discussionData.data;

  // 获取回复列表
  const repliesData = await getDiscussionReplies({
    current: currentPage.value,
    pageSize: pageSize.value,
    param: {
      discussionId: Number(props.discussionId),
      //@ts-ignore
      'sorter.column': "createTime",
      //@ts-ignore
      'sorter.mode': "asc",
    },
  });
  replies.value =
    repliesData.data?.list.map((reply) => ({
      ...reply,
      showSubReplies: false,
    })) || [];
  totalReplies.value = repliesData.data.total;
};

// 获取讨论详情
onMounted(async () => {
  await fetchData();
});

const goBack = () => {
  emit("back");
};

const handleLike = () => {
  // discussion.value.likeCount++
};

const handleReplyLike = (reply: BaseReply) => {
  if(props.isEnrolled){
    reply.likeCount++;
  }
};

const handleSubReplyLike = (subReply: BaseReply) => {
  subReply.likeCount++;
};

const focusReply = () => {
  replySection.value?.scrollIntoView({ behavior: "smooth" });
};

const handleReplyToReply = (reply: BaseReply) => {
  replyingTo.value = { reply: reply, type: "main" };
  newReply.value = `@${reply.user?.username || "用户"} `;
  focusReply();
};

const handleReplyToSubReply = (mainReply: BaseReply, subReply: BaseReply) => {
  replyingTo.value = { reply: mainReply, type: "sub" };
  newReply.value = `@${subReply.user?.username || "用户"} `;
  focusReply();
};

const toggleSubReplies = (reply: BaseReply) => {
  reply.showSubReplies = !reply.showSubReplies;
};

const submitReply = async () => {
  if (!newReply.value.trim()) {
    alert("请输入回复内容");
    return;
  }

  isSubmitting.value = true;

  try {
    if (replyingTo.value) {
      // 添加子回复
      const subReplyData = await addReply({
        discussionId: Number(props.discussionId),
        replyId: replyingTo.value.reply.replyId,
        content: newReply.value,
      });

      replyingTo.value.reply.showSubReplies = true;
    } else {
      // 添加主回复
      const replyData = await addReply({
        discussionId: Number(props.discussionId),
        content: newReply.value,
      });
    }

    newReply.value = "";
    replyingTo.value = null;

    // 添加新回复后跳转到最后一页
    currentPage.value = totalPages.value;
    await fetchData();
  } catch (error) {
    console.error("提交回复失败:", error);
    alert("提交回复失败,请重试");
  } finally {
    isSubmitting.value = false;
  }
};

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
.discussion-detail {
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 100%;
}

.detail-header {
  margin-bottom: 35px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border: none;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  border-radius: 8px;
  cursor: pointer;
  color: #343a40;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 6px #d1d9e6, -3px -3px 6px #ffffff;
}

.back-btn:hover {
  background: linear-gradient(145deg, #e9ecef, #dee2e6);
  transform: translateX(-3px);
}

.main-post {
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 35px;
  margin-bottom: 35px;
}

.post-title {
  font-size: 2em;
  color: #1a1a1a;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  color: #6c757d;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.username {
  font-weight: 600;
  color: #343a40;
  font-size: 1.1em;
}

.teacher-tag {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
}

.post-content {
  font-size: 1.2em;
  line-height: 1.9;
  margin: 30px 0;
  color: #343a40;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.like-btn {
  background: linear-gradient(145deg, #e7f5ff, #d0ebff);
  color: #228be6;
}

.like-btn:hover {
  background: linear-gradient(145deg, #d0ebff, #a5d8ff);
  transform: translateY(-2px);
}

.reply-btn {
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  color: #343a40;
}

.reply-btn:hover {
  background: linear-gradient(145deg, #e9ecef, #dee2e6);
  transform: translateY(-2px);
}

.replies-title {
  font-size: 1.6em;
  color: #1a1a1a;
  margin-bottom: 25px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.reply-item {
  padding: 25px;
  border-bottom: 1px solid #e9ecef;
  transition: all 0.3s ease;
  border-radius: 12px;
  margin-bottom: 15px;
}

.reply-item:hover {
  background: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.reply-content {
  margin: 20px 0;
  line-height: 1.7;
  color: #343a40;
  font-size: 1.1em;
}

/* 子回复样式 */
.sub-replies-container {
  margin-top: 15px;
}

.sub-replies-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  cursor: pointer;
  color: #228be6;
  font-weight: 500;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.sub-replies {
  margin-left: 50px;
  margin-top: 15px;
  border-left: 3px solid #e9ecef;
  padding-left: 20px;
}

.sub-reply-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
}

.sub-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.sub-username {
  font-size: 0.95em;
  font-weight: 500;
}

.sub-reply-content {
  margin: 10px 0;
  font-size: 0.95em;
  color: #495057;
}

.reply-to {
  color: #228be6;
  font-weight: 500;
  margin-right: 8px;
}

.sub-reply-time {
  font-size: 0.85em;
  color: #868e96;
}

.reply-input-section {
  margin-top: 45px;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.reply-input {
  width: 100%;
  padding: 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  resize: vertical;
  margin-bottom: 20px;
  font-size: 1.1em;
  transition: all 0.3s ease;
  background: #ffffff;
}

.reply-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.submit-btn {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(76, 175, 80, 0.4);
}

.post-time,
.reply-time {
  color: #868e96;
  font-size: 0.95em;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.page-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  color: #343a40;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background: linear-gradient(145deg, #e9ecef, #dee2e6);
  transform: translateY(-2px);
}

.page-info {
  font-size: 1.1em;
  color: #343a40;
  font-weight: 600;
}
</style>
