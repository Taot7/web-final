// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加课程分类 POST /course-category/add */
export async function addCourseCategory(
  body: API.CourseCategory,
  options?: { [key: string]: any }
) {
  return request<boolean>("/course-category/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定课程分类 DELETE /course-category/delete/${param0} */
export async function deleteCourseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCourseCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-category/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定课程分类信息 GET /course-category/info/${param0} */
export async function getCourseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CourseCategoryVO>(`/course-category/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取课程分类列表 GET /course-category/list */
export async function getCourseCategorys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseCategorysParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultCourseCategoryVO>("/course-category/list", {
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

/** 修改指定课程分类信息 PUT /course-category/update/${param0} */
export async function updateCourseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCourseCategoryParams,
  body: API.CourseCategory,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-category/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
