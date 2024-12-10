<template>
  <div class="homework-content">
    <div class="homework-header">
      <h2>作业</h2>
    </div>
    <div class="homework-list">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
      <table v-else>
        <thead>
          <tr>
            <th style="width: 15%">名称</th>
            <th style="width: 35%">内容</th>
            <th style="width: 15%">截止时间</th>
            <th style="width: 12%">状态</th>
            <th style="width: 8%">分数</th>
            <th style="width: 15%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(homework, index) in homeworks" :key="index" class="homework-row">
            <td class="table-cell">{{ homework.title }}</td>
            <td class="table-cell description-cell">
              <div class="cell-content" @mousemove="updateHoverPosition($event, index)">
                <span class="truncated-text">{{ homework?.description || '暂无描述' }}</span>
                <div class="hover-box" :class="{ 'show-above': showAbove && index > 0 }">
                  {{ homework?.description || '暂无描述' }}
                </div>
              </div>
            </td>
            <td class="table-cell">
              <div class="cell-content">
                <div class="deadline-wrapper">
                  <i class="far fa-clock"></i>
                  <span>{{ homework.deadline }}</span>
                </div>
              </div>
            </td>
            <td class="table-cell">
              <div class="cell-content">
                <span
                  :class="[
                    'status-tag',
                    homework?.submissionStatus == '0' ? 'pending' : 'completed',
                  ]"
                >
                  {{ ASSIGNMENT_SUBMISSION_STATUS[homework.submissionStatus] }}
                </span>
              </div>
            </td>
            <td class="table-cell">
              <div class="cell-content">
                {{ homework?.submission?.score || '-' }}
              </div>
            </td>
            <td class="table-cell">
              <div class="cell-content">
                <div class="btn-group">
                  <!-- 未提交状态 -->
                  <button v-if="homework.submissionStatus == '0'" 
                          class="action-btn submit-btn" 
                          @click="openSubmitModal(homework)">
                    <i class="fas fa-upload"></i>
                    提交
                  </button>
                  <!-- 已提交状态 -->
                  <template v-else>
                    <button class="action-btn view-btn" 
                            @click="openViewModal(homework)">
                      <i class="fas fa-eye"></i>
                      查看
                    </button>
                    <button class="action-btn resubmit-btn" 
                            @click="openSubmitModal(homework)">
                      <i class="fas fa-redo"></i>
                      重新提交
                    </button>
                  </template>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 提交作业弹窗 -->
  <div class="homework-modal" v-if="showSubmitModal" @click.self="closeSubmitModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ currentHomework?.submissionStatus == '1' ? '重新提交作业' : '提交作业' }}</h3>
        <button class="btn-close" @click="closeSubmitModal">×</button>
      </div>
      
      <div class="modal-body">
        <div class="form-item">
          <label class="form-label">作业内容</label>
          <textarea 
            v-model="submissionContent" 
            placeholder="请输入作业内容"
            class="modal-textarea"
          ></textarea>
        </div>
        
        <div class="form-item">
          <label class="form-label">或上传文件</label>
          <div class="file-upload">
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileChange"
              class="file-input"
            >
            <div class="upload-area">
              <i class="fas fa-cloud-upload-alt"></i>
              <p>点击或拖拽文件到此处上传</p>
              <p class="file-tip">支持 .doc, .docx, .pdf, .txt 格式文件</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-text" @click="closeSubmitModal">取消</button>
        <button class="btn btn-primary" @click="submitHomework">提交</button>
      </div>
    </div>
  </div>

  <!-- 查看作业弹窗 -->
  <div class="homework-modal" v-if="showViewModal" @click.self="closeViewModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>查看作业</h3>
        <button class="btn-close" @click="closeViewModal">×</button>
      </div>
      
      <div class="modal-body">
        <div class="submission-content">
          {{ currentHomework?.submission?.content || '暂无内容' }}
        </div>
        <div v-if="currentHomework?.submission?.fileUrl" class="attachment">
          <a :href="currentHomework.submission?.fileUrl" target="_blank">
            <i class="fas fa-file"></i>
            下载附件
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyAssignmentDetails, submitAssignment } from "@/services/api/assignment"
import { ASSIGNMENT_SUBMISSION_STATUS } from "@/constant/assignment"
import { UploadUtils } from "@/utils/uploadUtils"

interface Props {
  courseId:  number
}

const props = defineProps<Props>()

const router = useRouter()

const homeworks = ref<API.AssignmentDetailVO[]>([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10
})
const showAbove = ref(true)
const showSubmitModal = ref(false)
const showViewModal = ref(false)
const currentHomework = ref<API.AssignmentDetailVO>(null)
const submissionContent = ref('')
const submissionFileUrl = ref(null)
const fileInput = ref(null)

const fetchHomeworks = async () => {
  try {
    loading.value = true
    const { current, pageSize } = pagination.value
    const response = await getMyAssignmentDetails({
      current: current,
      pageSize: pageSize,
      //@ts-ignore
      param: {
        courseId: props.courseId,
      },
    })

    homeworks.value = response?.data?.list || []
  } catch (error) {
    console.error("获取作业列表失败:", error)
  } finally {
    loading.value = false
  }
}

const updateHoverPosition = (event: MouseEvent, index: number) => {
  if (index === 0) {
    showAbove.value = false
  } else {
    const threshold = 200
    showAbove.value = event.clientY > threshold
  }
}

const openSubmitModal = (homework: any) => {
  currentHomework.value = homework
  submissionContent.value = homework?.submission?.content || ''
  showSubmitModal.value = true
}

const openViewModal = (homework: any) => {
  currentHomework.value = homework
  showViewModal.value = true
}

const closeSubmitModal = () => {
  showSubmitModal.value = false
  currentHomework.value = null
  submissionContent.value = ''
  submissionFileUrl.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  currentHomework.value = null
}

const handleFileChange =async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    submissionFileUrl.value =await UploadUtils.uploadFile(file)
  }
}

const submitHomework = async () => {

  try {
    await submitAssignment({
      assignmentId: currentHomework.value.assignmentId,
      content: submissionContent.value,
      fileUrl: submissionFileUrl.value
    })
    
    closeSubmitModal()
    await fetchHomeworks()
  } catch (error) {
    console.error('提交作业失败:', error)
  }
}

onMounted(() => {
  fetchHomeworks()
})
</script>

<style scoped>
.homework-content {
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.homework-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f2f5;
}

.homework-header h2 {
  margin: 0;
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 600;
}

.homework-list table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  table-layout: fixed;
}

.homework-list th,
.homework-list td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #f0f2f5;
  transition: all 0.3s;
}

.homework-list th {
  background-color: #fafafa;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
}

.homework-row:hover {
  background-color: #f5f7fa;
}

.table-cell {
  position: relative;
}

.cell-content {
  position: relative;
}

.description-cell .cell-content {
  cursor: pointer;
}

.truncated-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.hover-box {
  display: none;
  position: absolute;
  left: 0;
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,0.12), 
              0 6px 16px 0 rgba(0,0,0,0.08), 
              0 9px 28px 8px rgba(0,0,0,0.05);
  color: #333;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 显示在上方时的样式 */
.hover-box.show-above {
  bottom: 100%;
  top: auto;
  margin-bottom: 8px;
}

/* 显示在下方时的样式 */
.hover-box:not(.show-above) {
  top: 100%;
  bottom: auto;
  margin-top: 8px;
}

/* 上方显示时的小三角形 */
.hover-box.show-above::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 20px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fff;
}

/* 下方显示时的小三角形 */
.hover-box:not(.show-above)::after {
  content: '';
  position: absolute;
  top: -8px;
  left: 20px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
}

.deadline-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.status-tag.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.status-tag.completed {
  background: #f6ffed;
  color: #52c41a;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.start-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: #666;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 添加这个样式来显示悬停框 */
.cell-content:hover .hover-box {
  display: block;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn {
  background-color: #1890ff;
  color: white;
}

.view-btn {
  background-color: #52c41a;
  color: white;
}

.resubmit-btn {
  background-color: #faad14;
  color: white;
}

.homework-modal {
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

.modal-content {
  background: white;
  border-radius: 12px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1a1a1a;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-item {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #1a1a1a;
  font-size: 15px;
  font-weight: 500;
}

.modal-textarea {
  width: 100%;
  min-height: 200px;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  line-height: 1.6;
  transition: all 0.3s;
}

.modal-textarea:focus {
  outline: none;
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
}

.file-upload {
  position: relative;
  margin-top: 8px;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.upload-area {
  padding: 32px 20px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
  background: #fafafa;
}

.upload-area:hover {
  border-color: #40a9ff;
  background: #f0f7ff;
}

.upload-area i {
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 16px;
}

.upload-area p {
  margin: 8px 0;
  color: #666;
}

.file-tip {
  color: #8c8c8c;
  font-size: 13px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-text {
  border: 1px solid #d9d9d9;
  background: white;
  color: #666;
}

.btn-text:hover {
  color: #40a9ff;
  border-color: #40a9ff;
}

.btn-primary {
  border: none;
  background: #1890ff;
  color: white;
}

.btn-primary:hover {
  background: #40a9ff;
}

.submission-content {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  white-space: pre-wrap;
  line-height: 1.6;
  color: #333;
}

.attachment {
  margin-top: 20px;
  padding: 16px;
  background: #f0f7ff;
  border-radius: 8px;
  transition: all 0.3s;
}

.attachment:hover {
  background: #e6f4ff;
}

.attachment a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1890ff;
  text-decoration: none;
  font-weight: 500;
}

.attachment a:hover {
  color: #40a9ff;
}

.btn-close {
  border: none;
  background: transparent;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-close:hover {
  color: #666;
}
</style>
