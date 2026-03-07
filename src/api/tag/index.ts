import { GET } from "@/service/request";
import { Tag } from "./type";

/**
 * 分页获取标签
 * @param params
 * @returns
 */
export const getTagListByPage = (params: Record<string, any>) => {
  return GET<{ list: Tag[]; [k: string]: any }>("/tag/list", params);
};

export const createTagAPI = (params: Record<string, any>) => {
  return GET<Tag>("/tag/create", params);
};

export const updateTagAPI = (params: Record<string, any>) => {
  return GET<Tag>("/tag/update", params);
};

export const deleteTagAPI = (params: Record<string, any>) => {
  return GET<Tag>("/tag/delete", params);
};

export const tagDetailAPI = (params: { id: number }) => {
  return GET<Tag>("/tag/detail", params);
};
