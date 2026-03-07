import { POST } from "@/service/request";

/**
 * 上传图片
 */
export const uploadImageAPI = (params: any) => {
  return POST<any>("/file/upload", params);
};
