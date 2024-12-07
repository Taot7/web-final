// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加学习笔记 POST /study-note/add/${param0} */
export async function addStudyNote(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addStudyNoteParams,
  body: API.StudyNote,
  options?: { [key: string]: any }
) {
  const { courseId: param0, ...queryParams } = params;
  return request<boolean>(`/study-note/add/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定学习笔记 DELETE /study-note/delete/${param0} */
export async function deleteStudyNote(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStudyNoteParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/study-note/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定学习笔记信息 GET /study-note/info/${param0} */
export async function getStudyNote(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudyNoteParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.StudyNoteVO>(`/study-note/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取学习笔记列表 GET /study-note/list */
export async function getStudyNotes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudyNotesParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultStudyNoteVO>("/study-note/list", {
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

/** 获取我的学习笔记列表 GET /study-note/list-self */
export async function getMyStudyNotes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyStudyNotesParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultStudyNoteVO>("/study-note/list-self", {
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

/** 修改指定学习笔记信息 PUT /study-note/update/${param0} */
export async function updateStudyNote(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateStudyNoteParams,
  body: API.StudyNote,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/study-note/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
