// 自测题目类型 0-单选、1-多选、2-判断、3-填空、4-问答
export const SELF_TEST_QUESTION_TYPE: Record<number, string> = {
  0: "单选题",
  1: "多选题",
  2: "判断题",
  3: "填空题",
  4: "问答题",
};
//测试记录状态 0-未开始、1-已完成
export const SELF_TEST_RECORD_STATUS: Record<number, string> = {
  0: "未完成",
  1: "已完成",
};


//试卷状态 0-未发布、1-已发布
export const SELF_TEST_STATUS: Record<number, string> = {
  0: "未发布",
  1: "已发布",
};
