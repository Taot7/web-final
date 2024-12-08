<script setup lang="ts">
import { UploadUtils } from '@/utils/uploadUtils';
import { ref } from 'vue';

const uploadProgress = ref(0);

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  try {
    const imageUrl = await UploadUtils.uploadImage(file, (percent) => {
      uploadProgress.value = percent;
    });
    console.log('图片上传成功，URL:', imageUrl);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};

// 处理文件上传
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  try {
    const fileUrl = await UploadUtils.uploadFile(file);
    console.log('文件上传成功，URL:', fileUrl);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
</script>

<template>
  <div>
    <!-- 图片上传 -->
    <input 
      type="file" 
      accept="image/*"
      @change="handleImageUpload"
    >
    
    <!-- 文件上传 -->
    <input 
      type="file" 
      @change="handleFileUpload"
    >
    
    <!-- 上传进度 -->
    <div v-if="uploadProgress > 0 && uploadProgress < 100">
      上传进度: {{ uploadProgress }}%
    </div>
  </div>
</template> 