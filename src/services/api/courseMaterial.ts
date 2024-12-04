// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加课件资料 POST /course-material/add */
export async function addCourseMaterial(
  body: API.CourseMaterial,
  options?: { [key: string]: any }
) {
  return request<boolean>("/course-material/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定课件资料 DELETE /course-material/delete/${param0} */
export async function deleteCourseMaterial(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCourseMaterialParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-material/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定课件资料信息 GET /course-material/info/${param0} */
export async function getCourseMaterial(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseMaterialParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CourseMaterialVO>(`/course-material/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取课件资料列表 GET /course-material/list */
export async function getCourseMaterials(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseMaterialsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultCourseMaterialVO>("/course-material/list", {
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

/** 修改指定课件资料信息 PUT /course-material/update/${param0} */
export async function updateCourseMaterial(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCourseMaterialParams,
  body: API.CourseMaterial,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-material/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
