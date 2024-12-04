// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 学生添加课程注册 POST /course-enrollment/add/${param0} */
export async function addCourseEnrollment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addCourseEnrollmentParams,
  options?: { [key: string]: any }
) {
  const { courseId: param0, ...queryParams } = params;
  return request<boolean>(`/course-enrollment/add/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除指定课程注册 DELETE /course-enrollment/delete/${param0} */
export async function deleteCourseEnrollment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCourseEnrollmentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-enrollment/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定课程注册信息 GET /course-enrollment/info/${param0} */
export async function getCourseEnrollment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseEnrollmentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CourseEnrollmentVO>(`/course-enrollment/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取课程注册列表 GET /course-enrollment/list */
export async function getCourseEnrollments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseEnrollmentsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultCourseEnrollmentVO>("/course-enrollment/list", {
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

/** 学生取消课程注册 PUT /course-enrollment/quit/${param0} */
export async function quitCourseEnrollment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.quitCourseEnrollmentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/course-enrollment/quit/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}
