// @ts-ignore
/* eslint-disable */
import request from "@/../config/axios.config";

/** 获取当前用户信息 GET /user/current */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.UserVO>("/user/current", {
    method: "GET",
    ...(options || {}),
  });
}

/** 用户登录 POST /user/login */
export async function loginByPassword(
  body: API.UserLoginPasswordParam,
  options?: { [key: string]: any }
) {
  return request<API.UserAuthVO>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 POST /user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<boolean>("/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 用户注册 POST /user/register */
export async function register(
  body: API.UserForm,
  options?: { [key: string]: any }
) {
  return request<API.UserAuthVO>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 PUT /user/update-password */
export async function updatePassword(
  body: API.UserPasswordParam,
  options?: { [key: string]: any }
) {
  return request<boolean>("/user/update-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
