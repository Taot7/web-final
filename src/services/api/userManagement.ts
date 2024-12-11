// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 添加用户 POST /user-management/add */
export async function addUser(
  body: API.UserForm,
  options?: { [key: string]: any }
) {
  return request<boolean>("/user-management/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定用户 DELETE /user-management/delete/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/user-management/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 启用禁用用户 PUT /user-management/enable-disable/${param0} */
export async function enableDisableUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enableDisableUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/user-management/enable-disable/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定用户信息 GET /user-management/info/${param0} */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserVO>(`/user-management/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 是否启用用户自主注册 GET /user-management/is-enable-user-register */
export async function isEnableSelfRegister(options?: { [key: string]: any }) {
  return request<boolean>("/user-management/is-enable-user-register", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取所有用户列表 GET /user-management/list */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultUserVO>("/user-management/list", {
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

/** 获取学生列表 GET /user-management/list-students */
export async function getStudents(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultUserVO>("/user-management/list-students", {
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
/** 获取老师列表 GET /user-management/list-students/2 */
export async function getTeachers(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getStudentsParams,
    options?: { [key: string]: any }
) {
  return request<API.ListResultUserVO>("/user-management/list", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
      param: undefined,
      ...params["param"],
      roleIds:2
    },
    ...(options || {}),
  });
}
/** 重置密码 PUT /user-management/reset-password */
export async function resetPassword(
  body: API.UserResetPasswordParam,
  options?: { [key: string]: any }
) {
  return request<boolean>("/user-management/reset-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置是否启用用户自主注册 PUT /user-management/set-enable-user-register */
export async function setEnableUserRegister(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setEnableUserRegisterParams,
  options?: { [key: string]: any }
) {
  return request<boolean>("/user-management/set-enable-user-register", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改指定用户信息 PUT /user-management/update/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: API.UserForm,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/user-management/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
