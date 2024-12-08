// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 用户添加讨论 POST /discussion/add-discussion */
export async function addDiscussion(
  body: API.DiscussionForm,
  options?: { [key: string]: any }
) {
  return request<boolean>("/discussion/add-discussion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加回复 POST /discussion/add-reply */
export async function addReply(
  body: API.DiscussionReplyForm,
  options?: { [key: string]: any }
) {
  return request<boolean>("/discussion/add-reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

/** 获取我的讨论预览列表 GET /discussion/list-my-detail */
export async function getMyDiscussions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyDiscussionsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultDiscussionWithReplyVO>(
    "/discussion/list-my-detail",
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

/** 根据讨论ID查询讨论回复，一级评论加上其子评论 GET /discussion/list-replies */
export async function getDiscussionReplies(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDiscussionRepliesParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultDiscussionReplyWithSubVO>(
    "/discussion/list-replies",
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
