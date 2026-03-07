import { GET, POST } from "@/service/request";
import { UserData } from "./type";

/**
 * 用户登录
 * @param params
 * @returns
 */
export const userLoginAPI = (params: Record<string, any>) => {
  return POST<UserData>("/user/login", params);
};

/**
 * 用户注册
 * @param params
 * @returns
 */
export const userRegisterAPI = (params: Record<string, any>) => {
  return POST("/user/register", params);
};

/**
 * 用户登出
 * @param params
 * @returns
 */
export const userLogoutAPI = () => {
  return GET("/user/logout");
};

/**
 * 获取登录用户信息
 * @param params
 * @returns
 */
export const getloginUserDetailAPI = () => {
  return GET<UserData>("/user/loginUser/detail");
};

/**
 * 根据id用户信息
 * @param params
 * @returns
 */
export const getUserDetailByIdAPI = (params: Record<string, any>) => {
  return GET<UserData>("/user/detail", params);
};

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export const getuserListByPageAPI = (params: Record<string, any>) => {
  return GET<{ list: UserData[]; [k: string]: any }>("/user/list", params);
};

/**
 * 删除用户
 * @param params
 * @returns
 */
export const deleteUserAPI = (params: Record<string, any>) => {
  return GET(`/user/delete`, params);
};

/**
 * 修改用户
 * @param params
 * @returns
 */
export const updateUserAPI = (params: Record<string, any>) => {
  return POST(`/user/update`, params);
};
