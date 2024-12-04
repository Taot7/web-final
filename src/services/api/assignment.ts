// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 删除指定作业 DELETE /assignment/delete/${param0} */
export async function deleteAssignment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAssignmentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/assignment/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定作业信息 GET /assignment/info/${param0} */
export async function getAssignment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssignmentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AssignmentVO>(`/assignment/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取作业列表 GET /assignment/list */
export async function getAssignments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssignmentsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultAssignmentVO>("/assignment/list", {
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

/** 发布作业,并为每个选课的学生生成作业提交记录 POST /assignment/publish */
export async function publishAssignment(
  body: API.Assignment,
  options?: { [key: string]: any }
) {
  return request<boolean>("/assignment/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改指定作业信息 PUT /assignment/update/${param0} */
export async function updateAssignment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAssignmentParams,
  body: API.Assignment,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/assignment/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
