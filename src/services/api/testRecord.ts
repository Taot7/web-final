// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加考试记录 POST /test-record/add */
export async function addTestRecord(
  body: API.TestRecord,
  options?: { [key: string]: any }
) {
  return request<boolean>("/test-record/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定考试记录 DELETE /test-record/delete/${param0} */
export async function deleteTestRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTestRecordParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/test-record/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定考试记录信息 GET /test-record/info/${param0} */
export async function getTestRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestRecordParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TestRecordVO>(`/test-record/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取考试记录列表 GET /test-record/list */
export async function getTestRecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestRecordsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultTestRecordVO>("/test-record/list", {
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

/** 获取我的考试记录列表 GET /test-record/list-self */
export async function getMyTestRecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyTestRecordsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultTestRecordVO>("/test-record/list-self", {
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

/** 学生提交考试答案 POST /test-record/submit */
export async function submitTestRecord(
  body: API.TestRecordCommitParam,
  options?: { [key: string]: any }
) {
  return request<API.TestRecordResultVO>("/test-record/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改指定考试记录信息 PUT /test-record/update/${param0} */
export async function updateTestRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateTestRecordParams,
  body: API.TestRecord,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/test-record/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
