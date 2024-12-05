<template>
  <div v-if="visible" class="privacy-dialog-overlay" @click="handleOverlayClick">
    <div class="privacy-dialog" @click.stop>
      <div class="privacy-dialog-header">
        <h3>隐私政策</h3>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="privacy-dialog-body">
        <div class="privacy-content">
          <h4>1. 信息收集</h4>
          <p>我们收集的信息包括但不限于：用户名、手机号码、登录信息等。</p>
          
          <h4>2. 信息使用</h4>
          <p>我们使用收集的信息来提供、维护和改进我们的服务。</p>
          
          <h4>3. 信息保护</h4>
          <p>我们采取适当的技术和组织措施来保护您的个人信息。</p>
          
          <h4>4. 信息共享</h4>
          <p>除非得到您的明确同意，我们不会与第三方分享您的个人信息。</p>
          
          <h4>5. Cookie使用</h4>
          <p>我们使用Cookie来改善用户体验和提供个性化服务。</p>
        </div>
      </div>
      <div class="privacy-dialog-footer">
        <button class="confirm-btn" @click="close">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const close = () => {
  emit('update:visible', false)
}

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    close()
  }
}
</script>

<style scoped>
.privacy-dialog-overlay {
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

.privacy-dialog {
  width: 90%;
  max-width: 520px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.privacy-dialog-header {
  padding: 20px 24px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.privacy-dialog-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
  font-weight: 500;
}

.close-btn {
  border: none;
  background: none;
  font-size: 22px;
  color: #909399;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #606266;
}

.privacy-dialog-body {
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
}

.privacy-content h4 {
  margin: 0 0 12px;
  color: #303133;
  font-size: 16px;
  font-weight: 500;
}

.privacy-content p {
  margin: 0 0 20px;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.privacy-dialog-footer {
  padding: 16px 24px;
  border-top: 1px solid #dcdfe6;
  text-align: right;
}

.confirm-btn {
  padding: 8px 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.confirm-btn:hover {
  background: #66b1ff;
}
</style> 