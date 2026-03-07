import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";

const isServer = typeof window === "undefined";

const instance = axios.create({
  baseURL: isServer ? "http:localhost:3002/api" : "/api",
  timeout: 30000,
  withCredentials: true,
});

type AxiosCustomRequestConfig = AxiosRequestConfig & {
  showError?: boolean;
};

instance.interceptors.request.use(
  (config) => {
    return { showError: true, ...config };
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    if (data.code === 200) {
      return Promise.resolve(data);
    } else {
      if ((config as AxiosCustomRequestConfig).showError) {
        message?.error?.(data.message ?? "系统错误，请联系管理员");
      }
      return Promise.reject(data);
    }
  },
  (error) => {
    message?.error?.(error?.message ?? "系统错误，请联系管理员");
    return Promise.reject(error);
  }
);

export default instance;
