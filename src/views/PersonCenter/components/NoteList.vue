<template>
  <div class="note-list">
    <div class="note-header">
      <h2>学习笔记</h2>
      <button class="add-note-btn" @click="addNote">
        <i class="iconfont icon-plus"></i>
        添加笔记
      </button>
    </div>

    <!-- 课程笔记列表 -->
    <div class="course-notes" v-for="courseNote in courseNotes" :key="courseNote.course.courseId">
      <div class="course-title" @click="toggleCourse(courseNote.course.courseId)">
        <div class="course-title-left">
          <i class="iconfont icon-arrow" :class="{ 'icon-arrow-down': !isCollapsed(courseNote.course.courseId) }"></i>
          <h3>{{ courseNote.course.title }}</h3>
        </div>
        <span class="note-count">{{ courseNote.notes.length }}条笔记</span>
      </div>
      
      <div class="notes-container" v-show="!isCollapsed(courseNote.course.courseId)">
        <div class="note-item" v-for="note in courseNote.notes" :key="note.noteId" @click="goToOnlineCourse(courseNote.course.courseId)">
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
              <button class="delete-btn" @click.stop="deleteNote(note.noteId)">
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
        <select v-model="currentNote.courseId" class="modal-select" :disabled="isEditing">
          <option value="" disabled selected>请选择课程</option>
          <option v-for="course in courses" :key="course.courseId" :value="course.courseId">
            {{ course.title }}
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyStudyNotes, addStudyNote, updateStudyNote, deleteStudyNote } from '@/services/api/studyNote'
import { getMyCourseEnrollments } from '@/services/api/courseEnrollment';

const router = useRouter()

interface Note {
  id: number
  courseId: number
  title: string
  content: string
  createTime: string
}

interface CourseStudyNote {
  course: API.CourseVO
  notes: API.StudyNoteVO[]
}

const showAddNoteModal = ref(false)
const isEditing = ref(false)
const currentNote = reactive({
  id: 0,
  courseId: 0,
  title: '',
  content: ''
})

// 折叠状态管理
const collapsedCourses = ref<number[]>([])

const toggleCourse = (courseId: number) => {
  const index = collapsedCourses.value.indexOf(courseId)
  if (index === -1) {
    collapsedCourses.value.push(courseId)
  } else {
    collapsedCourses.value.splice(index, 1)
  }
}

const isCollapsed = (courseId: number) => {
  return collapsedCourses.value.includes(courseId)
}

const courses = ref<API.CourseVO[]>([])
const courseNotes = ref<CourseStudyNote[]>([])
// 获取课程列表
const fetchCourses = async () => {
  try {
    const res = await getMyCourseEnrollments({
      current: 1,
      pageSize: 100000,
      param: {
        status: "1",
      },
    })
  if(res?.data?.list) {
      courses.value = res.data.list.map((item: API.CourseEnrollmentVO) => item.course);
    }else{
      courses.value = [];
    }
  } catch (error) {
    console.error('获取课程列表失败:', error)
  }
}
// 获取笔记列表
const fetchNotes = async () => {
  try {
    // 调用API获取所有笔记数据
    const res = await getMyStudyNotes({
      current: 1,
      pageSize: 100000,
      param: {
      },
    })
    const studyNotes = res.data.list || [];
    
    // 使用reduce方法按课程ID对笔记进行聚合
    const notesByCourse = studyNotes.reduce((acc: CourseStudyNote[], note) => {
      // 查找当前笔记所属的课程是否已存在于累加器中
      const existingCourse = acc.find(item => item.course.courseId === note.courseId);
      
      if (existingCourse) {
        // 如果课程已存在,将笔记添加到对应课程的notes数组中
        existingCourse.notes.push(note);
      } else {
        // 如果课程不存在,创建新的课程对象并添加到累加器中
        acc.push({
          course: {
            courseId: note.courseId,
            title: note?.course?.title|| '',
            // 其他课程信息...
          },
          notes: [note]
        });
      }
      return acc;
    }, []);

    // 更新状态
    courseNotes.value = notesByCourse;
  } catch (error) {
    console.error('获取笔记列表失败:', error)
  }
}

onMounted(() => {
  fetchNotes()
  fetchCourses()
})
const addNote = () => {
  isEditing.value = false
  showAddNoteModal.value = true
}

const editNote = (note: API.StudyNoteVO) => {
  currentNote.id = note.noteId
  currentNote.courseId = note.courseId
  currentNote.title = note.title
  currentNote.content = note.content
  isEditing.value = true
  showAddNoteModal.value = true
}

const deleteNote = async (noteId: number) => {
  try {
    await deleteStudyNote({ id: noteId })
    await fetchNotes()
  } catch (error) {
    console.error('删除笔记失败:', error)
  }
}

const saveNote = async () => {
  try {
    if (isEditing.value) {
      await updateStudyNote(
        { id: currentNote.id },
        {
          title: currentNote.title,
          content: currentNote.content
        }
      )
    } else {
      await addStudyNote(
        { courseId: currentNote.courseId },
        {
          title: currentNote.title,
          content: currentNote.content
        }
      )
    }
    await fetchNotes()
    showAddNoteModal.value = false
    isEditing.value = false
    currentNote.id = 0
    currentNote.courseId = 0
    currentNote.title = ''
    currentNote.content = ''
  } catch (error) {
    console.error('保存笔记失败:', error)
  }
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
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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

.course-title h3 {
  color: #2c3e50;
  font-size: 20px;
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

.icon-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>') no-repeat center;
  transform: rotate(0deg);
}

.icon-arrow-down {
  transform: rotate(90deg);
}

.notes-container {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
