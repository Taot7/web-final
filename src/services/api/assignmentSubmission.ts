// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 学生提交作业 POST /assignment-submission/commit/${param0} */
export async function commitAssignmentSubmission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.commitAssignmentSubmissionParams,
  body: API.AssignmentSubmissionCommitParam,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/assignment-submission/commit/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 老师修改给作业提交评分和反馈 PUT /assignment-submission/correct/${param0} */
export async function correctAssignmentSubmission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.correctAssignmentSubmissionParams,
  body: API.AssignmentFeedbackParam,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/assignment-submission/correct/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定作业提交 DELETE /assignment-submission/delete/${param0} */
export async function deleteAssignmentSubmission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAssignmentSubmissionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/assignment-submission/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定作业提交信息 GET /assignment-submission/info/${param0} */
export async function getAssignmentSubmission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssignmentSubmissionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AssignmentSubmissionVO>(
    `/assignment-submission/info/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取作业提交列表 GET /assignment-submission/list */
export async function getAssignmentSubmissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssignmentSubmissionsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultAssignmentSubmissionVO>(
    "/assignment-submission/list",
    {
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
    }
  );
}

/** 获取我的作业提交列表 GET /assignment-submission/list-self */
export async function getMyAssignmentSubmissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyAssignmentSubmissionsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultAssignmentSubmissionVO>(
    "/assignment-submission/list-self",
    {
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
    }
  );
}

/** 根据条件获取学生作业提交情况 GET /assignment-submission/statistic */
export async function getAssignmentSubmitStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssignmentSubmitStatParams,
  options?: { [key: string]: any }
) {
  return request<API.AssignmentSubmitStatVO>(
    "/assignment-submission/statistic",
    {
      method: "GET",
      params: {
        ...params,
        param: undefined,
        ...params["param"],
      },
      ...(options || {}),
    }
  );
}
