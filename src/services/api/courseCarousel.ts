// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加课程轮播图 POST /course-carousel/add */
export async function addCourseCarousel(
  body: API.CourseCarousel,
  options?: { [key: string]: any }
) {
  return request<boolean>("/course-carousel/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定课程轮播图 DELETE /course-carousel/delete/${param0} */
export async function deleteCourseCarousel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCourseCarouselParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-carousel/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定课程轮播图信息 GET /course-carousel/info/${param0} */
export async function getCourseCarousel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseCarouselParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CourseCarouselVO>(`/course-carousel/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取课程轮播图列表 GET /course-carousel/list */
export async function getCourseCarousels(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseCarouselsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultCourseCarouselVO>("/course-carousel/list", {
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

/** 修改指定课程轮播图信息 PUT /course-carousel/update/${param0} */
export async function updateCourseCarousel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCourseCarouselParams,
  body: API.CourseCarousel,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-carousel/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
