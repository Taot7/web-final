<template>
  <div class="header-container">
      <h2>课件管理</h2>
  </div>
  <hr color="#a9d7df">
  <div class="upload-section">
      <h3>上传课件</h3>
      <div class="file-upload-container">
          <!-- 文件上传按钮 -->
          <label class="file-upload">
              <input type="file" multiple @change="handleFileUpload" />
              <span>{{ "选择文件" }}</span>
          </label>
          <!-- 课程选择下拉框 -->
          <select v-model="selectedCourse" class="course-select">
              <option disabled value="">选择课程</option>
              <option v-for="(course, index) in courses" :key="index" :value="course">
                  {{ course.title }}
              </option>
          </select>
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
      <h3>标签管理</h3>
      <div class="url-input">
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
              <ul class="sub-tag-list">
                  <li v-for="(subTag, subIndex) in tag.children" :key="subIndex" class="sub-tag-item">
                      <span>{{ subTag }}</span>
                      <button @click="removeSubTag(index, subIndex)" class="remove-btn">删除</button>
                  </li>
              </ul>
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
  <div class="button-container">
      <button class="confirm-upload-btn" @click="confirmUpload">确认上传</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import request from "../../../../config/axios.config";


// 已选课程

const selectedCourse = ref<{ title: string; id: number }>()
// 课程列表
const courses = ref<{ title: string; id: number }[]>([])

onMounted(async ()=>{
  const resp = await request.get('/course/list', {
    params: {
      current: 1, 
      pageSize: 100
    }
  })

  console.log(resp.data)
  resp.data.list.forEach((item)=>{
    courses.value.push({
      title: item.title,
      id: item.courseId
    })
  })
  selectedCourse.value = courses.value[0]
})


const pendingFiles = ref<{ name: string; type: string, url: string}[]>([]);
const remoteUrl = ref("");
const tags = ref<{ name: string; children: string[] }[]>([]);
const newTag = ref("");
const newSubTag = ref("");

const handleFileUpload = (event: Event) => {
  if (!selectedCourse.value) {
      alert("请选择课程后再上传文件！");
      return;
  }  
  // 获取文件列表
  const files = Array.from((event.target as HTMLInputElement).files || []);
  
  // 遍历文件，生成 URL 并加入 pendingFiles
  files.forEach((file) => {
    const fileUrl = URL.createObjectURL(file); // 创建文件的临时 URL

    // 将文件的基本信息和 URL 添加到 pendingFiles
    pendingFiles.value.push({
      name: file.name,
      type: file.type,
      url: fileUrl,
    });
  });
};

const addRemoteFile = () => {
  if (!selectedCourse.value) {
      alert("请选择课程后再添加文件！");
      return;
  }
  if (remoteUrl.value) {
      pendingFiles.value.push({ name: remoteUrl.value, type: "网络资源", url: remoteUrl.value});
      remoteUrl.value = "";
  }
};

const getFileType = (contentType: string): number => {
  if (contentType.includes("image")) return 3; // 图片
  if (contentType.includes("audio")) return 2; // 音频
  if (contentType.includes("video")) return 1; // 视频
  return 0; // 文档
};
const confirmUpload = () => {
  if (pendingFiles.value.length === 0) {
      alert("没有文件可以上传");
      return;
  }
  if (confirm(`确认上传课件吗？`)) {
      pendingFiles.value.forEach(async (item)=>{
        const resp = await request.post('/course-material/add',{

          "courseId": selectedCourse.value.id,
          "title": item.name,
          "type": getFileType(item.type),
          "contentUrl": item.url,
        })
       
        console.log(item.name, ' upload resp: ', resp)
      })  
      pendingFiles.value = [];
      tags.value = [];
      alert("上传成功！");
  }
};

const removeFile = (index: number) => {
  pendingFiles.value.splice(index, 1);
};

const addTag = () => {
  if (newTag.value) {
      tags.value.push({ name: newTag.value, children: [] });
      newTag.value = "";
  }
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};

const addSubTag = (index: number) => {
  if (newSubTag.value) {
      tags.value[index].children.push(newSubTag.value);
      newSubTag.value = "";
  }
};

const removeSubTag = (tagIndex: number, subTagIndex: number) => {
  tags.value[tagIndex].children.splice(subTagIndex, 1);
};
</script>

<style scoped>

/* 上传课件部分 */
.upload-section {
  margin: 40px 0;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 增加模糊半径以增强阴影效果 */
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.upload-section:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); /* 悬停时增加阴影效果 */
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

/* 文件列表样式 */
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
}

.remove-btn:hover {
  background-color: #d34b4b;
}

/* 标签管理部分 */
.tag-management {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 增加模糊半径以增强阴影效果 */
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.tag-management:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); /* 悬停时增加阴影效果 */
}


.add-sub-tag {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag-list {
  list-style: none;
  padding: 0;
}

.tag-item {
  background: #f5f5f5;
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

.header-container {
    display: flex;
    justify-content: space-between; /* 按钮和标题之间的间距 */
    align-items: center; /* 垂直居中对齐 */
    margin: 20px 30px; /* 添加边距 */
}

.upload-section, .tag-management {
    margin: 20px 0;
}

.button-container {
    margin-top:50px;
    display: flex;
    justify-content: flex-end; /* 将按钮对齐到右侧 */
    margin-right: 100px; /* 添加右边距 */
    margin-bottom: 30px; /* 添加底部间距 */
}

.confirm-upload-btn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #59bcf5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.confirm-upload-btn:hover {
    background-color: #48a4d7;
}

.course-select {
    padding: 3px;
    font-size: 14px;
    margin-left:35px;
    width: 150px;
}
</style>