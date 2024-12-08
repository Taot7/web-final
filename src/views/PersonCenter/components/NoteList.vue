<template>
  <div class="note-list">
    <div class="note-header">
      <h2>学习笔记</h2>
      <button class="add-note-btn" @click="showAddNoteModal = true">
        <i class="iconfont icon-plus"></i>
        添加笔记
      </button>
    </div>

    <!-- 课程笔记列表 -->
    <div class="course-notes" v-for="course in courseNotes" :key="course.id">
      <div class="course-title">
        <h3>{{ course.name }}</h3>
        <span class="note-count">{{ course.notes.length }}条笔记</span>
      </div>
      
      <div class="notes-container">
        <div class="note-item" v-for="note in course.notes" :key="note.id" @click="goToOnlineCourse(course.id)">
          <div class="note-meta">
            <span class="note-date">
              <i class="iconfont icon-time"></i>
              {{ note.createTime }}
            </span>
            <div class="note-actions">
              <button class="edit-btn" @click.stop="editNote(note)">
                <i class="iconfont icon-edit"></i>
                编辑
              </button>
              <button class="delete-btn" @click.stop="deleteNote(note.id)">
                <i class="iconfont icon-delete"></i>
                删除
              </button>
            </div>
          </div>
          <h4 class="note-title">{{ note.title }}</h4>
          <div class="note-content">{{ note.content }}</div>
        </div>
      </div>
    </div>

    <!-- 添加/编辑笔记弹窗 -->
    <div class="note-modal" v-if="showAddNoteModal" @click.self="showAddNoteModal = false">
      <div class="modal-content">
        <h3>{{ isEditing ? '编辑笔记' : '添加笔记' }}</h3>
        <select v-model="currentNote.courseId" class="modal-select">
          <option value="" disabled selected>请选择课程</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.name }}
          </option>
        </select>
        <input v-model="currentNote.title" placeholder="笔记标题" class="modal-input"/>
        <textarea v-model="currentNote.content" placeholder="笔记内容" class="modal-textarea"></textarea>
        <div class="modal-actions">
          <button class="save-btn" @click="saveNote">保存</button>
          <button class="cancel-btn" @click="showAddNoteModal = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Note {
  id: number
  courseId: number
  title: string
  content: string
  createTime: string
}

interface Course {
  id: number
  name: string
  notes: Note[]
}

const showAddNoteModal = ref(false)
const isEditing = ref(false)
const currentNote = reactive({
  id: 0,
  courseId: 0,
  title: '',
  content: ''
})

const courses = ref<Course[]>([
  { id: 1, name: '高等数学', notes: [] },
  { id: 2, name: '大学物理', notes: [] }
])

const courseNotes = ref<Course[]>([
  {
    id: 1,
    name: '高等数学',
    notes: [
      {
        id: 1,
        courseId: 1,
        title: '导数的概念与计算',
        content: '导数的基本概念和常见函数求导公式...',
        createTime: '2024-01-10 14:30'
      }
    ]
  }
])

const editNote = (note: Note) => {
  currentNote.id = note.id
  currentNote.courseId = note.courseId
  currentNote.title = note.title
  currentNote.content = note.content
  isEditing.value = true
  showAddNoteModal.value = true
}

const deleteNote = (noteId: number) => {
  // 实现删除笔记的逻辑
}

const saveNote = () => {
  // 实现保存笔记的逻辑
  showAddNoteModal.value = false
  isEditing.value = false
}

const goToOnlineCourse = (courseId: number) => {
  router.push({
    name: 'onlineCourse',
    params: { courseId: courseId }
  })
}
</script>

<style scoped>
.note-list {
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.note-header h2 {
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
}

.add-note-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}

.add-note-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.course-notes {
  margin-bottom: 30px;
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.course-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.course-title h3 {
  font-size: 20px;
  color: #2c3e50;
  font-weight: 600;
}

.note-count {
  color: #666;
  font-size: 14px;
  background: #f0f4ff;
  padding: 4px 12px;
  border-radius: 20px;
}

.note-item {
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

.note-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.note-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
}

.note-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.note-actions {
  display: flex;
  gap: 10px;
}

.note-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #f0f4ff;
  color: #667eea;
}

.edit-btn:hover {
  background: #667eea;
  color: white;
}

.delete-btn {
  background: #fff1f0;
  color: #ff4d4f;
}

.delete-btn:hover {
  background: #ff4d4f;
  color: white;
}

.note-title {
  font-size: 18px;
  margin-bottom: 12px;
  color: #2c3e50;
  font-weight: 600;
}

.note-content {
  color: #666;
  line-height: 1.6;
  font-size: 15px;
}

.note-modal {
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
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.modal-select,
.modal-input,
.modal-textarea {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.modal-select:focus,
.modal-input:focus,
.modal-textarea:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-textarea {
  height: 200px;
  resize: vertical;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.save-btn {
  background: #667eea;
  color: white;
}

.save-btn:hover {
  background: #5a6fd6;
  transform: translateY(-1px);
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}
</style>
