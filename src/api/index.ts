import axios, { AxiosError, type RawAxiosRequestHeaders } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

import router, { resetRoute } from "@/router";

function getSession(key: string) {
  return window.localStorage.getItem(key);
}

//读取 环境
export const PATH_URL: string = import.meta.env.VITE_GLOB_API_URL as string;
console.log(PATH_URL, "PATH_URLPATH_URLPATH_URL");
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json;charset=UTF-8" },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (getSession("token")) {
      (config.headers as RawAxiosRequestHeaders).Authorization =
        "Bearer " + getSession("token");
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code === undefined || res.code !== 200) {
      // `token` 过期或者账号已在别处登录
      if (res.code && res.code === 401) {
        window.localStorage.clear(); // 清除浏览器全部临时缓存
        router.push("/login"); // 去登录页面
        resetRoute(); // 删除/重置路由
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => {})
          .catch(() => {});
      }
      return Promise.reject(service.interceptors.response);
    } else {
      return response.data;
    }
  },
  (error: AxiosError) => {
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      ElMessage.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default service;
