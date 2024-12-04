// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加讨论 POST /discussion/add/${param0} */
export async function addDiscussion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addDiscussionParams,
  body: API.Discussion,
  options?: { [key: string]: any }
) {
  const { courseId: param0, ...queryParams } = params;
  return request<boolean>(`/discussion/add/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定讨论 DELETE /discussion/delete/${param0} */
export async function deleteDiscussion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDiscussionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/discussion/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定讨论信息 GET /discussion/info/${param0} */
export async function getDiscussion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDiscussionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DiscussionVO>(`/discussion/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取讨论列表 GET /discussion/list */
export async function getDiscussions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDiscussionsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultDiscussionVO>("/discussion/list", {
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

/** 获取我的讨论列表 GET /discussion/list-self */
export async function getMyDiscussions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyDiscussionsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultDiscussionVO>("/discussion/list-self", {
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

/** 修改指定讨论区信息 PUT /discussion/update/${param0} */
export async function updateDiscussion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDiscussionParams,
  body: API.Discussion,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/discussion/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
