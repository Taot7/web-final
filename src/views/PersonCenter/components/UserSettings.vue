<template>
  <div class="user-settings">
    <h2 class="settings-title">用户设置</h2>

    <!-- 顶部标签栏 -->
    <div class="tab-bar">
      <div class="tab-item" :class="{ active: currentTab === 'basic' }" @click="currentTab = 'basic'">
        <i class="iconfont icon-user"></i>
        基本信息
      </div>
      <div class="tab-item" :class="{ active: currentTab === 'password' }" @click="currentTab = 'password'">
        <i class="iconfont icon-lock"></i>
        密码修改
      </div>
    </div>

    <!-- 基本信息设置 -->
    <div v-if="currentTab === 'basic'" class="settings-section">
      <div class="form-item">
        <label>昵称 <span class="required">*</span></label>
        <div class="input-wrapper">
          <input v-model="userInfo.nickname" type="text" placeholder="请输入昵称" />
          <span class="error-msg" v-if="errors.nickname">{{ errors.nickname }}</span>
        </div>
      </div>
      
      <div class="form-item">
        <label>姓名 <span class="required">*</span></label>
        <div class="input-wrapper">
          <input v-model="userInfo.realName" type="text" placeholder="请输入姓名" />
          <span class="error-msg" v-if="errors.realName">{{ errors.realName }}</span>
        </div>
      </div>

      <div class="form-item">
        <label>性别 <span class="required">*</span></label>
        <div class="input-wrapper radio-group">
          <label class="radio-label">
            <input type="radio" v-model="userInfo.gender" value="male" />
            男
          </label>
          <label class="radio-label">
            <input type="radio" v-model="userInfo.gender" value="female" />
            女
          </label>
          <label class="radio-label">
            <input type="radio" v-model="userInfo.gender" value="private" />
            不公开
          </label>
          <span class="error-msg" v-if="errors.gender">{{ errors.gender }}</span>
        </div>
      </div>

      <div class="form-item">
        <label>邮箱</label>
        <div class="input-wrapper">
          <input v-model="userInfo.email" type="email" placeholder="请输入邮箱（选填）" />
          <span class="error-msg" v-if="errors.email">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-item">
        <label>手机号</label>
        <div class="input-wrapper">
          <input v-model="userInfo.phone" type="tel" placeholder="请输入手机号（选填）" />
          <span class="error-msg" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="form-item">
        <label>生日</label>
        <div class="input-wrapper">
          <input v-model="userInfo.birthday" type="date" />
          <span class="error-msg" v-if="errors.birthday">{{ errors.birthday }}</span>
        </div>
      </div>

      <div class="form-item">
        <label>地区</label>
        <div class="input-wrapper location-group">
          <select v-model="userInfo.province" @change="onProvinceChange">
            <option value="">请选择省份（选填）</option>
            <option v-for="province in provinces" :key="province.code" :value="province.code">
              {{ province.name }}
            </option>
          </select>
          <select v-model="userInfo.city">
            <option value="">请选择城市（选填）</option>
            <option v-for="city in cities" :key="city.code" :value="city.code">
              {{ city.name }}
            </option>
          </select>
          <span class="error-msg" v-if="errors.location">{{ errors.location }}</span>
        </div>
      </div>

      <div class="form-item">
        <label>兴趣爱好</label>
        <div class="input-wrapper checkbox-group">
          <label class="checkbox-label" v-for="interest in interests" :key="interest.value">
            <input type="checkbox" 
                   :value="interest.value" 
                   v-model="userInfo.selectedInterests" />
            {{ interest.label }}
          </label>
          <span class="error-msg" v-if="errors.interests">{{ errors.interests }}</span>
        </div>
      </div>

      <button class="save-btn" @click="saveUserInfo">
        <i class="iconfont icon-save"></i>
        保存修改
      </button>
    </div>

    <!-- 密码修改 -->
    <div v-if="currentTab === 'password'" class="settings-section">
      <div class="form-item">
        <label>原密码 <span class="required">*</span></label>
        <div class="input-wrapper">
          <input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码" />
          <span class="error-msg" v-if="errors.oldPassword">{{ errors.oldPassword }}</span>
        </div>
      </div>
      <div class="form-item">
        <label>新密码 <span class="required">*</span></label>
        <div class="input-wrapper">
          <input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" />
          <span class="error-msg" v-if="errors.newPassword">{{ errors.newPassword }}</span>
        </div>
      </div>
      <div class="form-item">
        <label>确认新密码 <span class="required">*</span></label>
        <div class="input-wrapper">
          <input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" />
          <span class="error-msg" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>
      </div>
      <button class="save-btn" @click="changePassword">
        <i class="iconfont icon-save"></i>
        修改密码
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const currentTab = ref('basic')

const interests = [
  { label: '运动', value: 'sports' },
  { label: '音乐', value: 'music' },
  { label: '阅读', value: 'reading' },
  { label: '游戏', value: 'games' },
  { label: '电影', value: 'movies' },
  { label: '其他', value: 'others' }
]

// 省份数据
const provinces = ref([
  { code: 'GD', name: '广东省' },
  { code: 'BJ', name: '北京市' },
  { code: 'SH', name: '上海市' },
  { code: 'JS', name: '江苏省' },
  { code: 'ZJ', name: '浙江省' },
  { code: 'SC', name: '四川省' }
])

// 城市数据映射
const cityMap = {
  'GD': [
    { code: 'SZ', name: '深圳市' },
    { code: 'GZ', name: '广州市' },
    { code: 'DG', name: '东莞市' }
  ],
  'BJ': [
    { code: 'BJ', name: '北京市' }
  ],
  'SH': [
    { code: 'SH', name: '上海市' }
  ],
  'JS': [
    { code: 'NJ', name: '南京市' },
    { code: 'SZ', name: '苏州市' },
    { code: 'WX', name: '无锡市' }
  ],
  'ZJ': [
    { code: 'HZ', name: '杭州市' },
    { code: 'NB', name: '宁波市' },
    { code: 'WZ', name: '温州市' }
  ],
  'SC': [
    { code: 'CD', name: '成都市' },
    { code: 'MY', name: '绵阳市' },
    { code: 'LS', name: '乐山市' }
  ]
}

const cities = ref([])

// 初始化用户信息
const userInfo = ref({
  nickname: 'Jscomet',
  realName: '黄静嘉',
  gender: 'male',
  email: 'liming@szu.edu.cn',
  phone: '13800138000',
  birthday: '2022-01-01',
  province: 'GD',
  city: 'SZ',
  selectedInterests: ['sports', 'reading']
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  nickname: '',
  realName: '',
  gender: '',
  email: '',
  phone: '',
  birthday: '',
  location: '',
  interests: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 根据选择的省份更新城市列表
const onProvinceChange = () => {
  userInfo.value.city = ''
  cities.value = cityMap[userInfo.value.province as keyof typeof cityMap] || []
}

// 组件挂载时初始化城市列表
onMounted(() => {
  if (userInfo.value.province) {
    cities.value = cityMap[userInfo.value.province as keyof typeof cityMap] || []
  }
})

const validateUserInfo = () => {
  let isValid = true
  
  // 只验证必填字段
  errors.nickname = !userInfo.value.nickname ? '昵称不能为空' : ''
  errors.realName = !userInfo.value.realName ? '姓名不能为空' : ''
  errors.gender = !userInfo.value.gender ? '请选择性别' : ''
  
  // 可选字段仅在填写时验证格式
  if (userInfo.value.email) {
    errors.email = !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(userInfo.value.email) ? '邮箱格式不正确' : ''
  }
  
  if (userInfo.value.phone) {
    errors.phone = !/^1[3-9]\d{9}$/.test(userInfo.value.phone) ? '手机号格式不正确' : ''
  }

  return !Object.values(errors).some(error => error)
}

const validatePassword = () => {
  errors.oldPassword = !passwordForm.value.oldPassword ? '原密码不能为空' : ''
  errors.newPassword = !passwordForm.value.newPassword ? '新密码不能为空' :
                      passwordForm.value.newPassword.length < 6 ? '新密码长度不能小于6位' : ''
  errors.confirmPassword = !passwordForm.value.confirmPassword ? '请确认新密码' :
                         passwordForm.value.newPassword !== passwordForm.value.confirmPassword ? '两次输入的密码不一致' : ''

  return !Object.values(errors).some(error => error)
}

const saveUserInfo = () => {
  if (validateUserInfo()) {
    // TODO: 实现保存用户信息的逻辑
  }
}

const changePassword = () => {
  if (validatePassword()) {
    // TODO: 实现修改密码的逻辑
  }
}
</script>

<style scoped>
.user-settings {
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.settings-title {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

.tab-bar {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
}

.tab-item {
  padding: 12px 24px;
  cursor: pointer;
  margin-right: 30px;
  font-size: 16px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-item i {
  font-size: 18px;
}

.tab-item.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
  font-weight: 500;
}

.settings-section {
  padding: 30px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background: #fafafa;
}

.form-item {
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
}

.form-item label {
  width: 120px;
  text-align: right;
  margin-right: 20px;
  margin-top: 8px;
  color: #606266;
  font-weight: 500;
}

.required {
  color: #f56c6c;
  margin-left: 4px;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.form-item input[type="text"],
.form-item input[type="email"],
.form-item input[type="tel"],
.form-item input[type="password"],
.form-item input[type="date"],
.form-item select {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 14px;
}

.form-item input:focus,
.form-item select:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
  outline: none;
}

.radio-group,
.checkbox-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.location-group {
  display: flex;
  gap: 10px;
}

.location-group select {
  flex: 1;
}

.error-msg {
  position: absolute;
  left: 0;
  bottom: -20px;
  color: #f56c6c;
  font-size: 12px;
}

.save-btn {
  margin-left: 140px;
  padding: 10px 30px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.save-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(24,144,255,0.3);
}

.save-btn:active {
  transform: translateY(0);
}
</style>
