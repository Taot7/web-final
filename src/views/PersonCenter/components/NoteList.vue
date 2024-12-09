<template>
  <div class="note-list list-container">
    <div class="list-header">
      <h2>学习笔记</h2>
      <button class="btn btn-primary" @click="addNote">
        <i class="iconfont icon-plus"></i>
        添加笔记
      </button>
    </div>

    <!-- 课程笔记列表 -->
    <div class="course-group" v-for="courseNote in courseNotes" :key="courseNote.course.courseId">
      <div class="course-title" @click="toggleCourse(courseNote.course.courseId)">
        <div class="course-title-left">
          <i class="icon-arrow" :class="{ 'icon-arrow-down': !isCollapsed(courseNote.course.courseId) }"></i>
          <h3>{{ courseNote.course.title }}</h3>
        </div>
        <span class="count-badge">{{ courseNote.notes.length }}条笔记</span>
      </div>
      
      <div class="notes-container" v-show="!isCollapsed(courseNote.course.courseId)">
        <div class="note-item" v-for="note in courseNote.notes" :key="note.noteId" @click="goToOnlineCourse(courseNote.course.courseId)">
          <div class="note-meta">
            <span class="note-date">
              <i class="iconfont icon-time"></i>
              {{ note.createTime }}
            </span>
            <div class="btn-group">
              <button class="btn btn-secondary btn-small" @click.stop="editNote(note)">
                <i class="iconfont icon-edit"></i>
                编辑
              </button>
              <button class="btn btn-danger btn-small" @click.stop="deleteNote(note.noteId)">
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
        <div class="modal-header">
          <h3>{{ isEditing ? '编辑笔记' : '添加笔记' }}</h3>
          <button class="btn btn-text btn-circle" @click="showAddNoteModal = false">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-item">
            <label>选择课程</label>
            <select v-model="currentNote.courseId" class="modal-select" :disabled="isEditing">
              <option value="" disabled selected>请选择课程</option>
              <option v-for="course in courses" :key="course.courseId" :value="course.courseId">
                {{ course.title }}
              </option>
            </select>
          </div>
          
          <div class="form-item">
            <label>笔记标题</label>
            <input v-model="currentNote.title" placeholder="请输入笔记标题" class="modal-input"/>
          </div>
          
          <div class="form-item">
            <label>笔记内容</label>
            <textarea v-model="currentNote.content" placeholder="请输入笔记内容" class="modal-textarea"></textarea>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-text" @click="showAddNoteModal = false">取消</button>
          <button class="btn btn-primary" @click="saveNote">保存</button>
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
    path: '/online-course',
    query: { 
      courseId
     }
  })
}
</script>

<style scoped>
@import '../styles/common.css';

/* 笔记列表特定样式 */
.note-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.note-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.note-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: #666;
}

.note-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.note-title {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.note-content {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

/* 模态框样式 */
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
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: modalSlideIn 0.3s ease;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #2c3e50;
}

.modal-body {
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

.modal-select,
.modal-input,
.modal-textarea {
  width: 95%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.modal-select:focus,
.modal-input:focus,
.modal-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-textarea {
  min-height: 150px;
  resize: vertical;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
