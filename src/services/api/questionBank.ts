// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加题库题目 POST /question-bank/add */
export async function addQuestionBank(
  body: API.QuestionBank,
  options?: { [key: string]: any }
) {
  return request<boolean>("/question-bank/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定题库题目 DELETE /question-bank/delete/${param0} */
export async function deleteQuestionBank(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionBankParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/question-bank/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定题库题目信息 GET /question-bank/info/${param0} */
export async function getQuestionBank(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.QuestionBankVO>(`/question-bank/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取题库题目列表 GET /question-bank/list */
export async function getQuestionBanks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBanksParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultQuestionBankVO>("/question-bank/list", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
      param: undefined,
      ...params["param"],
    },
    ...(options || {}),
  });
}

/** 修改指定题库信息 PUT /question-bank/update/${param0} */
export async function updateQuestionBank(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateQuestionBankParams,
  body: API.QuestionBank,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/question-bank/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
