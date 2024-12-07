<template>
    <div class="header-container">
        <h2>课程发布</h2>
    </div>
    <hr color="#a9d7df">
    <div class="course-release">
        <!-- 搜索栏 -->
        <div class="search-bar">
            <input v-model="searchQuery.courseId" type="text" placeholder="课程ID" class="input" />
            <input v-model="searchQuery.courseName" type="text" placeholder="课程名称" class="input" />
            <input v-model="searchQuery.teacherName" type="text" placeholder="讲师姓名" class="input" />
            <button class="button">搜索</button>
        </div>

        <!-- 课程表格 -->
        <div class="list-container">
            <!-- 表头 -->
            <div class="list-header">
            <div class="list-item id">课程编号</div>
            <div class="list-item">课程名称</div>
            <div class="list-item">类别名称</div>
            <div class="list-item">讲师姓名</div>
            <div class="list-item">发布状态</div>
            <div class="list-item action">操作</div>
            </div>
            <div v-for="(course, index) in filteredCourses" :key="course.id">
            <!-- 分割线 -->
            <div class="divider"></div>
            <!-- 行内容 -->
            <div class="list-row">
                <div class="list-item id">{{ course.id }}</div>
                <div class="list-item">{{ course.name }}</div>
                <div class="list-item">{{ course.category }}</div>
                <div class="list-item">{{ course.teacher }}</div>
                <div class="list-item">{{ course.status }}</div>
                <div class="list-item action">
                <button @click="searchCourse(course)" class="btn">查看</button>
                <button @click="editCourse(course)" class="btn">编辑</button>
                <button @click="deleteCourse(index)" class="btn btn-danger">删除</button>
                </div>
            </div>
            </div>
        </div>
 
        <div>首页轮播图次序：</div>
        <div class="gallery-container">
            <div 
                v-for="(course, index) in filteredCourses" 
                :key="course.id" 
                class="gallery-item"
                draggable="true"
                @dragstart="handleDragStart(index)"
                @dragover.prevent
                @drop="handleDrop(index)"
            >
                <img 
                    :src="course.cover || 'default-placeholder.png'" 
                    alt="课程封面" 
                    class="gallery-img" 
                />
                <div class="image-number">编号：{{ index + 1 }}</div>
            </div>
        </div>

        <!-- 发布新课程 -->
        <div class="new-course">
            <h3>发布新课程</h3>
            <input v-model="newCourse.name" type="text" placeholder="课程名称" class="input" />
            <input v-model="newCourse.category" type="text" placeholder="课程类别" class="input" />
            <input v-model="newCourse.teacher" type="text" placeholder="教师姓名" class="input" />
            <textarea v-model="newCourse.description" placeholder="课程简介" class="textarea"></textarea>
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model="newCourse.allowComments" /> 打开评论区
                </label>
                <label>
                    <input type="checkbox" v-model="newCourse.allowNotes" /> 打开笔记区
                </label>
            </div>
            <div>封面：</div>
            <input type="file" @change="handleImageUpload" multiple class="selectfile" />
            <button @click="showPreview" class="button">预览</button>

            <p>
                <button @click="publishCourse" class="button primary">发布课程</button>
            </p>
        </div>

        <hr color="#e9e9e9">

        <!-- 作业布置 -->
        <div class="assignment-section">
            <h3>布置作业</h3>
            <input v-model="assignment.title" type="text" placeholder="作业标题" class="input" />
            <!-- 添加下拉框选择课程 -->
            <select id="course-select" v-model="assignment.selectedCourse" class="course-select">
                <option disabled value="">选择课程</option>
                <option v-for="course in courses" :key="course.id" :value="course.id">
                    {{ course.name }}
                </option>
            </select>
            <textarea v-model="assignment.requirements" placeholder="作业要求" class="textarea"></textarea>
            <div class="ddl">截至日期：</div>
            <input v-model="assignment.dueDate" type="date" class="input" />
            <button @click="assignHomework" class="button primary">布置作业</button>
        </div>

        <!-- 查找结果模态框 -->
        <div v-if="isSearchModalVisible" class="modal-overlay">
        <div class="modal-content">
            <h2>课程详情</h2>
            <div class="course-preview">
                <div class="preview-image">
                    <img :src="searchResult?.images[0] || 'default-placeholder.png'" alt="课程封面" />
                </div>
                <div class="preview-info">
                    <h3>{{ searchResult?.name || "课程名称" }}</h3>
                    <p>课程编号：{{ searchResult?.id }}</p>
                    <p>类别名称：{{ searchResult?.category }}</p>
                    <p>讲师姓名：{{ searchResult?.teacher }}</p>
                    <p>课程简介：{{ searchResult?.description }}</p>
                    <p>发布状态：{{ searchResult?.status }}</p>
                </div>
            </div>
            <div class="modal-buttons">
                <button @click="closeSearchModal" class="button">关闭</button>
            </div>
        </div>
    </div>

    <div v-if="isEditModalVisible" class="modal-overlay">
        <div class="modal-content">
            <h2>编辑课程</h2>
            <div class="course-edit">
                <div class="edit-fields">
                    <label for="edit-name">课程名称：</label>
                    <input
                        id="edit-name"
                        type="text"
                        v-model="editTargetCourse.name"
                        placeholder="课程名称"
                        class="input"
                    />
                    <label for="edit-category">类别名称：</label>
                    <input
                        id="edit-category"
                        type="text"
                        v-model="editTargetCourse.category"
                        placeholder="类别名称"
                        class="input"
                    />
                    <label for="edit-teacher">讲师姓名：</label>
                    <input
                        id="edit-teacher"
                        type="text"
                        v-model="editTargetCourse.teacher"
                        placeholder="讲师姓名"
                        class="input"
                    />
                    <label for="edit-description">课程简介：</label>
                    <textarea
                        id="edit-description"
                        v-model="editTargetCourse.description"
                        placeholder="课程简介"
                        class="textarea"
                    ></textarea>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="editTargetCourse.allowComments" />
                        打开评论区
                    </label>
                    <label>
                        <input type="checkbox" v-model="editTargetCourse.allowNotes" />
                        打开笔记区
                    </label>
                </div>
                <div>封面图片：</div>
                <input type="file" @change="updateCourseImage" class="selectfile" />

                <div class="modal-buttons">
                    <button @click="saveEditedCourse" class="button primary">保存</button>
                    <button @click="closeEditModal" class="button">取消</button>
                </div>
            </div>
        </div>
    </div>

        <!-- 模态框部分 -->
        <div v-if="isModalVisible" class="modal-overlay">
            <div class="modal-content">
                <h2>预览课程内容</h2>
                <div class="course-preview">
                    <div class="preview-image">
                        <img :src="previewImage" alt="课程封面" />
                    </div>
                    <div class="preview-info">
                        <h3>{{ newCourse.name || "课程名称" }}</h3>
                        <p>创建时间：{{ new Date().toISOString().split('T')[0] }}</p>
                        <p>状态：进行中</p>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button @click="closeModal" class="button">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive} from "vue";

interface Course {
    id: number;
    name: string;
    category: string;
    teacher: string;
    description: string;
    status: string; // "已发布" 或 "未发布"
    allowComments: boolean;
    allowNotes: boolean;
    images: string[]; // 新增字段用于存储图片
    cover: string; 
}

interface Assignment {
    title: string;
    requirements: string;
    dueDate: string;
    selectedCourse: number | null; // 记录选中的课程ID
}

const courses = ref<Course[]>([
    { id: 1, name: "HTML基础", category: "Web前端", teacher: "王老师", description: "HTML入门课程", status: "已发布", allowComments: true, allowNotes: false, cover: "/src/assets/try1.png", images: ["/src/assets/try1.png"] },
    { id: 2, name: "JavaScript进阶", category: "Web前端", teacher: "李老师", description: "JS进阶知识", status: "未发布", allowComments: false, allowNotes: true, cover: "/src/assets/try2.png",images: ["/src/assets/try2.png"] },
    { id: 3, name: "CSS布局", category: "Web前端", teacher: "张老师", description: "CSS布局技巧", status: "已发布", allowComments: true, allowNotes: false, cover: "/src/assets/try3.png",images: ["/src/assets/try3.png"] },
    { id: 4, name: "Vue.js入门", category: "前端框架", teacher: "陈老师", description: "Vue.js基础知识", status: "未发布", allowComments: false, allowNotes: true, cover: "/src/assets/try4.png",images: ["/src/assets/try4.png"] },
    { id: 5, name: "React.js进阶", category: "前端框架", teacher: "刘老师", description: "深入理解React.js", status: "已发布", allowComments: true, allowNotes: false, cover: "/src/assets/try5.png",images: ["/src/assets/try5.png"] },
]);

const searchQuery = ref({
    courseId: "",
    courseName: "",
    teacherName: "",
});

const newCourse = ref<Course>({
    id: 0,
    name: "",
    category: "",
    teacher: "", 
    description: "",
    status: "已发布",
    allowComments: false,
    allowNotes: false,
    images: [],
    cover:""
});

const assignment = ref<Assignment>({
    title: "",
    requirements: "",
    dueDate: "",
    selectedCourse: null,
});


const filteredCourses = computed(() =>
    courses.value.filter((course) => {
        return (
            (!searchQuery.value.courseId || course.id.toString().includes(searchQuery.value.courseId)) &&
            (!searchQuery.value.courseName || course.name.includes(searchQuery.value.courseName)) &&
            (!searchQuery.value.teacherName || course.teacher.includes(searchQuery.value.teacherName))
        );
    })
);

const isSearchModalVisible = ref(false); // 控制查找模态框的显示
const searchResult = ref<Course | null>(null); // 当前查找到的课程


const closeSearchModal = () => {
    isSearchModalVisible.value = false;
    searchResult.value = null;
};

const searchCourse = (course: Course) => {
    searchResult.value = course; // 将当前点击的课程赋值给 searchResult
    isSearchModalVisible.value = true; // 打开模态框
};

const isEditModalVisible = ref(false); // 控制编辑模态框显示
const editTargetCourse = ref<Course | null>(null); // 当前编辑的课程

const editCourse = (course: Course) => {
    editTargetCourse.value = { ...course }; // 克隆课程数据，防止直接修改原始数据
    isEditModalVisible.value = true; // 显示编辑模态框
};

const closeEditModal = () => {
    isEditModalVisible.value = false;
    editTargetCourse.value = null; // 重置编辑目标
};

const saveEditedCourse = () => {
    if (editTargetCourse.value) {
        // 查找原课程并更新
        const targetIndex = courses.value.findIndex((c) => c.id === editTargetCourse.value?.id);
        if (targetIndex !== -1) {
            courses.value[targetIndex] = { ...editTargetCourse.value }; // 更新课程信息
        }
    }
    closeEditModal();
};

const updateCourseImage = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (typeof e.target?.result === "string" && editTargetCourse.value) {
                editTargetCourse.value.images = [e.target.result]; // 更新图片路径
            }
        };
        reader.readAsDataURL(files[0]);
    }
};


const deleteCourse = (index: number) => {
    if (confirm("确认删除该课程吗？")) {
        courses.value.splice(index, 1);
        updateCourseIds();
    }
};


const previewImage = ref<string>("");

const publishCourse = () => {
    if (!newCourse.value.name || !newCourse.value.category) {
        alert("请填写完整课程信息");
        return;
    }
    const nextId = courses.value.length > 0 ? Math.max(...courses.value.map(course => course.id)) + 1 : 1;
    courses.value.push({ ...newCourse.value, id: nextId });
    alert("课程发布成功！");
    resetNewCourse();
};

const handleImageUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (typeof e.target?.result === "string") {
                previewImage.value = e.target.result;
            }
        };
        reader.readAsDataURL(files[0]);
    }
};

let draggedIndex = -1;

// 拖拽开始事件
const handleDragStart = (index: number) => {
    draggedIndex = index;
};

// 放置事件
const handleDrop = (targetIndex: number) => {
    if (draggedIndex === -1 || draggedIndex === targetIndex) return;

    // 更新图片顺序
    const draggedItem = filteredCourses.value[draggedIndex];
    filteredCourses.value.splice(draggedIndex, 1); // 移除拖拽的图片
    filteredCourses.value.splice(targetIndex, 0, draggedItem); // 插入到目标位置

    // 更新课程顺序数据
    updateCourseIds();
    draggedIndex = -1; // 重置拖拽索引
};

const updateCourseIds = () => {
    courses.value.forEach((course, index) => {
        course.id = index + 1; // 更新课程ID为递增
    });
    filteredCourses.value.forEach((course, index) => {
        course.id = index + 1; // 更新课程编号为当前顺序
    });
};

const resetNewCourse = () => {
    newCourse.value = {
        id: 0,
        name: "",
        category: "",
        teacher: "默认教师",
        description: "",
        status: "未发布",
        allowComments: false,
        allowNotes: false,
        images: [],
        cover:""
    };
};

const assignHomework = () => {
    if (!assignment.value.title || !assignment.value.requirements || !assignment.value.dueDate || !assignment.value.selectedCourse) {
        alert("请填写完整作业信息并选择课程");
        return;
    }
    const selectedCourse = courses.value.find(course => course.id === assignment.value.selectedCourse);
    if (selectedCourse) {
        alert(`作业 "${assignment.value.title}" 已布置给课程 "${selectedCourse.name}"，截止日期为 ${assignment.value.dueDate}`);
        assignment.value = { title: "", requirements: "", dueDate: "", selectedCourse: null }; // 重置作业信息
    }
};


const isModalVisible = ref(false);

const showPreview = () => {
    if (!newCourse.value.name || !previewImage.value) {
        alert("请确保填写课程名称并上传封面！");
        return;
    }
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};
</script>

<style scoped>
.course-release {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    margin-right: 10px;
}

.textarea {
    margin-top: 10px;
    width: 100%;
    height: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}

.checkbox {
    margin-bottom: 10px;
}

.button {
    margin-right: 5px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button.primary {
    background-color: #4caf50;
    color: white;
}

.button.danger {
    background-color: #f44336;
    color: white;
}

.button.small {
    padding: 4px 8px;
}

.list-container {
  background-color: #fff;
  overflow: hidden;
  margin-top:40px;
  margin-bottom: 30px;
}

/* 表头样式 */
.list-header {
  display: flex;
  background-color: #f7f7f7;
  padding: 14px 15px;
  font-weight: bold;
  text-align: center;
  font-size: 15px;
}

/* 每行样式 */
.list-row {
  display: flex;
  padding: 10px 15px;
  font-size: 14px;
  text-align: center;
}

.list-row:hover {
  background-color: #fafafa;
}

/* 分割线 */
.divider {
  height: 1px;
  background-color: #eeeeee;
}

/* 列样式 */
.list-item {
  flex: 1;
  padding: 0 8px;
  word-break: break-word;
}

/* 对齐样式 */
.list-item.id {
  text-align: left;
  flex: 0.8; /* 略小于其他列 */
}

/* 操作列样式 */
.list-item.action {
  flex: 1.5; /* 加宽操作列 */
  display: flex;
  justify-content: center;
  gap: 8px;
}

/* 按钮样式 */
.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  background-color: #59bcf5;
  transition: all 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-danger {
  background-color: #f75c5c;
}

.btn-danger:hover {
  opacity: 0.9;
}

.btn:hover {
  opacity: 0.9;
}

.new-course {
    margin-top: 40px;
}

.header-container {
    display: flex;
    align-items: center;
    margin: 20px 30px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end; /* 使按钮靠右对齐 */
}

.ddl {
    font-size: 15px;
    margin-bottom: 5px;
    margin-left: 3px;
}

.selectfile {
    margin-right: 50px;
}

.course-preview {
    display: flex;
    gap: 20px;
}

.preview-image img {
    margin-bottom: 15px;
    width: 200px;
    height: auto;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.preview-info {
    flex: 1;
}

.course-gallery-container {
  margin-top: 20px;
}

.course-select {
    padding: 2px;
    font-size: 14px;
    width: 150px;
}

.image-container {
    display: inline-block;
    margin: 5px;
    cursor: move;
    width: 100px;
    height: 100px;
}

.gallery-container {
    display: flex;
    overflow-x: auto; /* 启用水平滚动 */
    white-space: nowrap;
    padding: 10px;
    gap: 15px; /* 图片间距 */
}

.gallery-container::-webkit-scrollbar {
    height: 10px; /* 滚动条高度 */
}

.gallery-container::-webkit-scrollbar-thumb {
    background-color: #b3b3b3; /* 滚动条颜色 */
    border-radius: 4px;
}

.gallery-container::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 滚动条轨道颜色 */
}

.gallery-item {
    flex: 0 0 auto; /* 图片不换行 */
    text-align: center;
}

.gallery-img {
    width: 230px;
    height: 150px;
    object-fit: cover;
    cursor: grab;
}

.image-number {
    margin-top: 5px;
    font-size: 14px;
    color: #555;
}
</style>