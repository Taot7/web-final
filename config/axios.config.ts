import axios from "axios";

const request = axios.create({
  baseURL: "http://47.115.57.164:81/api",
  // baseURL: "http://localhost:8080",
  headers: {
  },
});

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 直接返回响应的 data 部分
    return response.data;
  },
  (error) => {
    // 处理错误情况
    return Promise.reject(error);
  }
);

export default request;

