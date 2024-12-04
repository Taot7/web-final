<template>
  <div class="color-background">
    <div class="teacher-page">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="navbar-left">
        <img src="@/assets/house.png" alt="首页图标" class="home-icon" @click="goToHome" />
      </div>
      <div class="change-page">
        <button
          :class="{'active': currentPage === 'CoursewareManagement'}"
          @click="currentPage = 'CoursewareManagement'"
        >
          课件管理
        </button>
        <button
          :class="{'active': currentPage === 'CourseRelease'}"
          @click="currentPage = 'CourseRelease'"
        >
          课程发布
        </button>
      </div>
    </div>
    

    <!-- 内容 -->
    <div class="content">
      <!-- 课件管理页面 -->
      <div v-if="currentPage === 'CoursewareManagement'">
        
        <h1>课件管理</h1>
        <div class="upload-section">
          <h2>上传课件</h2>
          <div class="file-upload-container">
            <label class="file-upload">
              <input type="file" multiple @change="handleFileUpload" />
              <span>{{ "选择文件" }}</span>
            </label>
          </div>

          <!-- 显示已添加的文件 -->
          <div class="url-input">
            <label>或粘贴网络地址：</label>
            <input type="text" v-model="remoteUrl" placeholder="输入网络资源 URL" />
            <button class="add-btn" @click="addRemoteFile">添加</button>
          </div>

          <div v-if="pendingFiles.length > 0" class="added-files">
            <p>已添加文件：</p>
            <ul class="file-list">
              <li v-for="(file, index) in pendingFiles" :key="index">
                {{ file.name }} ({{ file.type }})
                <button @click="removeFile(index)" class="remove-btn">删除</button>
              </li>
            </ul>
          </div>

        </div>

        <div class="tag-management">
          <h2>标签管理</h2>
          <div class="add-tag">
            <label>添加新标签：</label>
            <input type="text" v-model="newTag" placeholder="输入标签名" class="tag-input" />
            <button class="add-btn" @click="addTag">添加</button>
          </div>

          <ul class="tag-list">
            <li v-for="(tag, index) in tags" :key="index" class="tag-item">
              <div class="tag-header">
                <span>{{ tag.name }}</span>
                <button @click="removeTag(index)" class="remove-btn">删除</button>
              </div>

              <!-- 子标签列表 -->
              <ul class="sub-tag-list">
                <li v-for="(subTag, subIndex) in tag.children" :key="subIndex" class="sub-tag-item">
                  <span>{{ subTag }}</span>
                  <button @click="removeSubTag(index, subIndex)" class="remove-btn">删除</button>
                </li>
              </ul>

              <!-- 添加子标签 -->
              <div class="add-sub-tag">
                <input
                  type="text"
                  v-model="newSubTag"
                  placeholder="输入子标签名"
                  class="sub-tag-input"
                  @keyup.enter="addSubTag(index)"
                />
                <button class="add-btn" @click="addSubTag(index)">添加子标签</button>
              </div>
            </li>
          </ul>
        </div>

          <button class="confirm-upload-btn add-btn" @click="confirmUpload">确认上传</button>

      </div>

      <!-- 课程发布页面 -->
      <div v-if="currentPage === 'CourseRelease'">
        <h1>课程发布</h1>
        <p>此模块未实现，待补充。</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Teacher",
  data() {
    return {
      currentPage: "CoursewareManagement",
      uploadedFiles: [], // 存储已上传的课件
      pendingFiles: [], // 存储待上传的课件
      remoteUrl: "",
      tags: [],
      newTag: "",
      newSubTag: "",
    };
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      this.pendingFiles.push(...files); // 将文件添加到待上传列表
    },
    addRemoteFile() {
      if (this.remoteUrl) {
        this.pendingFiles.push({
          name: this.remoteUrl,
          type: "网络资源",
        });
        this.remoteUrl = "";
      }
    },
    confirmUpload() {
      if (this.pendingFiles.length > 0) {
        // 弹出确认框
        const isConfirmed = window.confirm("确认上传选中的课件吗？");

        if (isConfirmed) {
          // 确认上传
          this.uploadedFiles.push(...this.pendingFiles); // 将待上传的文件添加到已上传的课件列表
          this.pendingFiles = []; // 清空待上传的文件
          this.tags = []; // 清空标签列表
          alert("上传成功！");
        } else {
          // 取消上传，保持当前状态
          return;
        }
      } else {
        // 如果没有待上传的文件，显示提示
        alert("没有文件可以上传");
      }
    },

    removeFile(index) {
      this.pendingFiles.splice(index, 1);
    },
    addTag() {
      if (this.newTag) {
        this.tags.push({ name: this.newTag, children: [] });
        this.newTag = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    addSubTag(index) {
      if (this.newSubTag) {
        this.tags[index].children.push(this.newSubTag);
        this.newSubTag = "";
      }
    },
    removeSubTag(tagIndex, subTagIndex) {
      this.tags[tagIndex].children.splice(subTagIndex, 1);
    },
  },
};
</script>


<style scoped>
.teacher-page {
  font-family: Arial;
  text-align: center;
  color: #2c3e50;
  /*background-color: #c3dde0;*/
  background-color: #e9e9e9;

}

/* 导航栏样式 */
.navbar {
  background-color: #ffffff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin-top: -5px;
  border-bottom: 2px solid #f1f1f1;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.change-page {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 设置按钮之间的间隔 */
  flex-grow: 1; /* 确保按钮区域居中 */
}

.home-icon {
  width: 30px;
  height:30px;
  cursor: pointer;
}
.navbar button {
  font-size: 18px; /* 字体大小 */
  background: none;
  border: none;
  padding: 10px 20px; /* 调整内边距 */
  color: #333;
  cursor: pointer;
  position: relative;
  text-align: center; /* 确保文字居中 */
}

.navbar button:hover {
  color:#59bcf5;
}

.navbar button.active::after {
  content: "";
  position: absolute;
  bottom: -2px; /* 横线距离文字的间距 */
  left: 50%; /* 横线居中 */
  transform: translateX(-50%); /* 横线水平居中对齐 */
  width: 110%; /* 横线比文字稍宽 */
  height: 3px; /* 横线高度 */
  background-color: #59bcf5; /* 横线颜色 */
}

/* 内容样式 */
.content {
  margin-top: 40px;
  padding: 20px;
  text-align: left;
}
h1{
  margin-top: -10px;
  margin-left:30px;
  margin-bottom: 50px;
}

h2{
  margin-top:20px;
}
.upload-section {
  margin: 40px 0;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.file-upload-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.file-upload {
  display: inline-block;
  font-size: 16px;
  color: white;
  background-color: #59bcf5;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.file-upload input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.url-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.url-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #59bcf5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float:right;
}

.add-btn:hover {
  background-color: #48a4d7;
}

.confirm-upload-container {
  background-color: #e9e9e9; /* 设置与页面背景一致的颜色 */
  padding: 70px; /* 为容器提供一些内边距 */
  width:100%;
}

.confirm-upload-btn {
  position: relative; /* 固定在页面的右下角 */
  padding: 15px 30px; /* 增加按钮的内边距，使其变大 */
  font-size: 18px; /* 增大字体 */
  background-color: #59bcf5; /* 保留原来的背景色 */
  color: white; /* 保留原来的文字颜色 */
  border: none;
  border-radius: 8px; /* 增加圆角效果 */
  cursor: pointer;
}

.confirm-upload-btn:hover {
  background-color: #48a4d7; /* 鼠标悬停时，背景色稍微改变 */
}

.file-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-list li {
  margin: 5px 0;
  padding: 5px 10px;
  background: #f1f1f1;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag-management {
  margin: 20px 0;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

/* 添加标签部分 */
.add-tag {
  display: flex;
  align-items: center;
  gap: 10px; /* 控制输入框和按钮间距 */
}

.add-sub-tag {
  display: flex;
  align-items: center;
  gap: 10px; /* 输入框和按钮的间距 */
  margin-top: 15px; /* 增加与上方的间距 */
}

.sub-tag-input-container {
  display: flex;
  gap: 10px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #59bcf5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #48a4d7;
}

.remove-btn {
  padding: 5px 10px;
  background-color: #f75c5c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.remove-btn:hover {
  background-color: #d34b4b;
}

/* 标签列表样式 */
.tag-list {
  list-style: none;
  padding: 0;
}

.tag-item {
  background: #f1f1f1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.tag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.sub-tag-list {
  list-style: none;
  padding-left: 20px;
  margin-top: 10px;
}

.add-sub-tag {
  margin-top: 10px;
}

.sub-tag-input-container {
  display: flex;
  gap: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

.added-files {
  margin-top: 15px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
}

.file-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-list li {
  margin: 5px 0;
  padding: 5px 10px;
  background: #f1f1f1;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-btn {
  padding: 5px 10px;
  background-color: #f75c5c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.remove-btn:hover {
  background-color: #d34b4b;
}
.color-background {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
}
</style>
