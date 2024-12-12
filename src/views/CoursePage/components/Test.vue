<template>
  <div class="test-container">
    <!-- 试卷基本信息 -->
    <div class="test-header">
      <h2>{{ testData.title }}</h2>
      <div class="test-info">
        <span>创建时间：{{ testData.createTime }}</span>
        <span class="description">{{ testData.description }}</span>
      </div>
      <!-- 提交按钮区域 -->
      <div class="submit-area">
        <button
          v-if="!showResult && !isViewMode"
          class="submit-btn"
          @click="submitTest"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "提交中..." : "提交试卷" }}
        </button>
        <div v-if="showResult" class="result-summary">
          <h3 :class="getScoreClass">总分: {{ totalScore }}/100</h3>
        </div>
        <button class="back-btn" @click="$router.back()" :disabled="isSubmitting">
          返回
        </button>
      </div>
    </div>

    <!-- 题目列表 -->
    <div class="questions-list">
      <div
        v-for="(question, index) in testData.questions"
        :key="question.questionId"
        class="question-item"
      >
        <div class="question-header">
          <span class="question-number">第{{ index + 1 }}题</span>
          <span class="question-type">{{
            getQuestionType(question.type)
          }}</span>
          <span v-if="showResult" class="question-score" :class="getQuestionScoreClass(questionScores[question.questionId])">
            得分: {{ questionScores[question.questionId] || 0 }}/{{
              perQuestionScore
            }}
          </span>
        </div>

        <div class="question-content">
          <p class="question-text">{{ question.questionText }}</p>

          <!-- 单选题选项 -->
          <div v-if="question.type === 0" class="options">
            <div
              v-for="(option, key) in JSON.parse(question.options)"
              :key="key"
              class="option-item"
            >
              <label>
                <input
                  type="radio"
                  :name="'question_' + question.questionId"
                  :value="key"
                  v-model="answers[question.questionId]"
                  :disabled="showResult || isViewMode"
                />
                {{ key }}. {{ option }}
              </label>
            </div>
            <div v-if="showResult" class="correct-answer">
              <p>正确答案: {{ correctAnswers[question.questionId] }}</p>
            </div>
          </div>

          <!-- 多选题选项 -->
          <div v-else-if="question.type === 1" class="options">
            <div
              v-for="(option, key) in JSON.parse(question.options)"
              :key="key"
              class="option-item"
            >
              <label>
                <input
                  type="checkbox"
                  :value="key"
                  v-model="answers[question.questionId]"
                  :disabled="showResult || isViewMode"
                />
                {{ key }}. {{ option }}
              </label>
            </div>
            <div v-if="showResult" class="correct-answer">
              <p>正确答案: {{ correctAnswers[question.questionId] }}</p>
            </div>
          </div>

          <!-- 判断题选项 -->
          <div v-else-if="question.type === 2" class="options">
            <div class="option-item">
              <label>
                <input
                  type="radio"
                  :name="'question_' + question.questionId"
                  value="是"
                  v-model="answers[question.questionId]"
                  :disabled="showResult || isViewMode"
                />
                是
              </label>
            </div>
            <div class="option-item">
              <label>
                <input
                  type="radio"
                  :name="'question_' + question.questionId"
                  value="否"
                  v-model="answers[question.questionId]"
                  :disabled="showResult || isViewMode"
                />
                否
              </label>
            </div>
            <div v-if="showResult" class="correct-answer">
              <p>正确答案: {{ correctAnswers[question.questionId] }}</p>
            </div>
          </div>

          <!-- 其他题型的答题区域 -->
          <div v-else class="answer-area">
            <textarea
              v-model="answers[question.questionId]"
              rows="4"
              placeholder="请输入你的答案"
              :disabled="showResult || isViewMode"
            ></textarea>
            <div v-if="showResult" class="correct-answer">
              <p>你的答案:</p>
              <p>{{ answers[question.questionId] }}</p>
              <p>正确答案:</p>
              <p>{{ correctAnswers[question.questionId] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { getSelfTest } from "@/services/api/selfTest";
import { submitTestRecord, getTestRecord } from "@/services/api/testRecord";

export default {
  name: "Test",
  props: {
    testId: {
      type: [String, Number],
      required: true,
    },
    courseId: {
      type: [String, Number],
      required: true,
    },
    recordId: {
      type: [String, Number],
      required: false,
    }
  },
  data() {
    return {
      testData: {
        testId: 0,
        creatorId: 0,
        title: "",
        description: "",
        settings: "",
        createTime: "",
        questions: [],
      } as API.SelfTestVO,
      answers: reactive({} as Record<number, string | string[]>),
      isSubmitting: false,
      showResult: false,
      totalScore: 0,
      questionScores: {} as Record<number, number>,
      correctAnswers: {} as Record<number, string>,
      perQuestionScore: 0,
      isViewMode: false
    };
  },
  computed: {
    getScoreClass() {
      if (this.totalScore === 0) return 'score-red';
      if (this.totalScore === 100) return 'score-green';
      return 'score-yellow';
    }
  },
  methods: {
    // 获取题目类型文字说明
    getQuestionType(type: number) {
      const types = {
        0: "单选题",
        1: "多选题",
        2: "判断题",
        3: "填空题",
        4: "问答题",
      };
      return types[type] || "未知题型";
    },

    // 获取题目分数的样式类
    getQuestionScoreClass(score: number) {
      if (score === 0) return 'score-red';
      if (score === this.perQuestionScore) return 'score-green';
      return 'score-yellow';
    },

    // 获取试卷数据
    async fetchTestData() {
      try {
        const response = await getSelfTest({
          id: this.testId,
        });
        if (response.status === 200 && response.data) {
          this.testData = response.data;
          // 格式化创建时间
          this.testData.createTime = new Date(
            this.testData.createTime
          ).toLocaleString();
          // 计算每题分数
          this.perQuestionScore = Math.floor(
            100 / this.testData.questions.length
          );
          this.initializeAnswers();
          
          // 如果有recordId,加载记录
          if(this.recordId) {
            this.isViewMode = true;
            this.loadTestRecord();
          }
        }
      } catch (error) {
        console.error("获取试卷数据失败：", error);
        alert("获取试卷数据失败，请稍后重试");
      }
    },

    // 加载测试记录
    async loadTestRecord() {
      try {
        const response = await getTestRecord({
          id: this.recordId
        });
        if(response.data) {
          console.log('response.data',response.data)
          const record = response.data;
          // 设置答案和分数
          record.answers.forEach(answer => {
            this.answers[answer.questionId] = answer.answer.includes(',') ? 
              answer.answer.split(',') : 
              answer.answer;
          });
          this.totalScore = record.score;
          this.questionScores = record.questionScore;
          this.correctAnswers = record.correctAnswers;
          this.showResult = true;
        }
      } catch(error) {
        console.error("获取记录失败:", error);
        alert("获取记录失败，请稍后重试");
      }
    },

    // 修改提交试卷方法
    async submitTest() {
      if (this.isSubmitting) return;

      // 验证所有题目是否已答
      const unansweredQuestions = this.testData.questions.filter((question) => {
        const answer = this.answers[question.questionId];
        return !answer || (Array.isArray(answer) && answer.length === 0);
      });

      if (unansweredQuestions.length > 0) {
        alert(`还有 ${unansweredQuestions.length} 道题目未完成，请完成所有题目后再提交`);
        return;
      }

      this.isSubmitting = true;
      try {
        // 构造提交数据
        const submitData = {
          testId: this.testData.testId,
          courseId: this.$route.params.courseId,
          answers: Object.entries(this.answers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId),
            answer: Array.isArray(answer)
              ? answer.join(",")
              : answer.toString(),
          })),
        };

        // 调用提交API
        const response = await submitTestRecord(submitData);

        if (response.data) {
          const result = response.data;
          // 显示结果
          this.showResult = true;
          this.totalScore = result.totalScore;
          this.questionScores = result.questionScore;
          this.correctAnswers = result.correctAnswers;
        } else {
          alert("提交失败，请重试");
        }
      } catch (error) {
        console.error("提交试卷失败：", error);
        alert("提交试卷失败，请稍后重试");
      } finally {
        this.isSubmitting = false;
      }
    },

    // 初始化答案对象
    initializeAnswers() {
      this.testData.questions.forEach((question) => {
        if (question.type === 1) {
          // 多选题
          this.answers[question.questionId] = [];
        } else {
          // 单选题、判断题和其他题型
          this.answers[question.questionId] = "";
        }
      });
    },

    // 添加重置数据的方法
    resetData() {
      this.testData = {
        testId: 0,
        creatorId: 0,
        title: "",
        description: "",
        settings: "",
        createTime: "",
        questions: [],
      };
      this.answers = {};
      this.isSubmitting = false;
      this.showResult = false;
      this.totalScore = 0;
      this.questionScores = {};
      this.correctAnswers = {};
      this.perQuestionScore = 0;
      this.isViewMode = false;
    },
  },
  watch: {
    '$route': {
      handler(to, from = {}) {
        const fromParams = from.params || {};
        const toParams = to.params || {};
        
        if (toParams.testId !== fromParams.testId || 
            toParams.courseId !== fromParams.courseId || 
            toParams.recordId !== fromParams.recordId) {
          this.resetData();
          this.fetchTestData();
        }
      },
      immediate: true
    }
  },
};
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
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  margin-bottom: 30px;
  padding: 15px;
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
  margin-top: 15px;
  padding: 10px 0;
}

.submit-btn {
  padding: 10px 40px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.back-btn {
  padding: 10px 40px;
  font-size: 16px;
  color: #666;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
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

/* 添加答案反馈样式 */
.correct-answer {
  margin-top: 15px;
  padding: 10px;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
}

.correct-answer p {
  margin: 5px 0;
  color: #52c41a;
}

.question-score {
  float: right;
  font-weight: bold;
}

.result-summary {
  display: inline-block;
  margin-right: 20px;
}

.result-summary h3 {
  margin: 0;
}

/* 分数颜色样式 */
.score-red {
  color: #ff4d4f;
}

.score-yellow {
  color: #faad14;
}

.score-green {
  color: #52c41a;
}
</style>
