<template>
  <div class="test-container">
    <!-- 试卷基本信息 -->
    <div class="test-header">
      <h2>{{ testData.title }}</h2>
      <div class="test-info">
        <span>创建时间：{{ testData.createTime }}</span>
        <span class="description">{{ testData.description }}</span>
      </div>
    </div>

    <!-- 题目列表 -->
    <div class="questions-list">
      <div v-for="(question, index) in testData.questions" :key="question.questionId" class="question-item">
        <div class="question-header">
          <span class="question-number">第{{ index + 1 }}题</span>
          <span class="question-type">{{ getQuestionType(question.type) }}</span>
        </div>
        
        <div class="question-content">
          <p class="question-text">{{ question.questionText }}</p>
          
          <!-- 单选题选项 -->
          <div v-if="question.type === 0" class="options">
            <div v-for="(option, key) in JSON.parse(question.options)" :key="key" class="option-item">
              <label>
                <input 
                  type="radio" 
                  :name="'question_' + question.questionId"
                  :value="key"
                  v-model="answers[question.questionId]"
                >
                {{ key }}. {{ option }}
              </label>
            </div>
          </div>

          <!-- 多选题选项 -->
          <div v-else-if="question.type === 1" class="options">
            <div v-for="(option, key) in JSON.parse(question.options)" :key="key" class="option-item">
              <label>
                <input 
                  type="checkbox"
                  :value="key"
                  v-model="answers[question.questionId]"
                >
                {{ key }}. {{ option }}
              </label>
            </div>
          </div>

          <!-- 其他题型的答题区域 -->
          <div v-else class="answer-area">
            <textarea 
              v-model="answers[question.questionId]"
              rows="4"
              placeholder="请输入你的答案"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-area">
      <button class="submit-btn" @click="submitTest">提交试卷</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    testId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      testData: {
        testId: 0,
        creatorId: 0,
        title: '',
        description: '',
        settings: '',
        createTime: '',
        questions: []
      },
      answers: {}
    }
  },
  methods: {
    // 获取题目类型文字说明
    getQuestionType(type) {
      const types = {
        0: '单选题',
        1: '多选题',
        2: '判断题',
        3: '填空题',
        4: '问答题'
      }
      return types[type] || '未知题型'
    },

    // 提交试卷
    submitTest() {
      console.log('提交的答案：', this.answers)
      // TODO: 调用API提交答案
    },

    // 初始化答案对象
    initializeAnswers() {
      this.testData.questions.forEach(question => {
        // 如果是多选题，初始化为空数组
        if (question.type === 1) {
          this.$set(this.answers, question.questionId, [])
        } else {
          this.$set(this.answers, question.questionId, '')
        }
      })
    },

    // 获取试卷数据
    async fetchTestData() {
      try {
        // 使用 props 中的 testId 获取试卷数据
        // this.testData = await getTestData(this.testId)
        this.initializeAnswers()
      } catch (error) {
        console.error('获取试卷数据失败：', error)
      }
    }
  },
  created() {
    this.fetchTestData()
  }
}
</script>

<style scoped>
.test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.test-header h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.test-info {
  color: #666;
  font-size: 14px;
}

.test-info .description {
  margin-left: 20px;
}

.question-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.question-header {
  margin-bottom: 15px;
}

.question-number {
  font-weight: bold;
  margin-right: 10px;
}

.question-type {
  color: #666;
  font-size: 14px;
}

.question-text {
  margin-bottom: 15px;
  line-height: 1.6;
}

.options .option-item {
  margin: 10px 0;
}

.answer-area textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.submit-area {
  text-align: center;
  margin-top: 30px;
}

.submit-btn {
  padding: 10px 40px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}

/* 添加多选框样式 */
.options .option-item input[type="checkbox"] {
  margin-right: 8px;
}
</style>
