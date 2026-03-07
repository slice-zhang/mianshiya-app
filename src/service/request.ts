import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "./index";

interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}
export const GET = <T>(
  url: string,
  params: Record<string, any> = {},
  options: AxiosRequestConfig = {}
): Promise<ResponseData<T>> => {
  return request.get(url, { ...options, params });
};

export const POST = <T = any>(
  url: string,
  data: Record<string, any> = {},
  options: AxiosRequestConfig = {}
): Promise<ResponseData<T>> => {
  return request.post(url, data, options);
};
