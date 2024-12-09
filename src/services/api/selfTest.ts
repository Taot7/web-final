// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加自测试卷 POST /self-test/add */
export async function addSelfTest(
  body: API.SelfTestCreateParam,
  options?: { [key: string]: any }
) {
  return request<boolean>("/self-test/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定自测试卷 DELETE /self-test/delete/${param0} */
export async function deleteSelfTest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSelfTestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/self-test/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 生成自测试卷 POST /self-test/generate */
export async function generateSelfTest(
  body: API.SelfTest,
  options?: { [key: string]: any }
) {
  return request<number>("/self-test/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取该课程对应得题目 GET /self-test/getQuestion/${param0} */
export async function getQuestion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.QuestionBank[]>(`/self-test/getQuestion/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定自测试卷信息 GET /self-test/info/${param0} */
export async function getSelfTest(id) {
  if (!id || isNaN(Number(id))) {
    return Promise.reject(new Error('无效的试卷ID'))
  }
  return request({
    url: `/self-test/info/${id}`,
    method: 'get'
  })
}

/** 获取自测试卷列表 GET /self-test/list */
export async function getSelfTests(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSelfTestsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultSelfTestVO>("/self-test/list", {
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

/** 发布测试试卷到指定课程的学生 POST /self-test/publish/${param0}/${param1} */
export async function publishSelfTest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publishSelfTestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, courseId: param1, ...queryParams } = params;
  return request<boolean>(`/self-test/publish/${param0}/${param1}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改指定自测试卷信息 PUT /self-test/update/${param0} */
export async function updateSelfTest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateSelfTestParams,
  body: API.SelfTest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/self-test/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
