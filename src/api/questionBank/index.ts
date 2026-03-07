import { GET, POST } from "@/service/request";
import { QuestionBank, QuestionBankAdultLog } from "./type";
/**
 * 分页获取题库列表
 * @param params
 * @returns
 */
export const getQuestionBankByPageAPI = (params: Record<string, any>) => {
  return GET<{ list: QuestionBank[]; [k: string]: any }>(
    "/questionBank/list",
    params
  );
};

/**
 * 删除题库
 * @param params
 * @returns
 */
export const deleteQuestionBankAPI = (params: { id: number }) => {
  return GET(`/questionBank/delete`, params);
};

/**
 * 题库审批
 * @param params
 * @returns
 */
export const questionBankAdultAPI = (params: Record<string, any>) => {
  return POST(`/questionBank/adult`, params);
};

/**
 * 获取题库审批日志
 * @param params
 * @returns
 */
export const getQuestionBankAdultLogsAPI = (params: Record<string, any>) => {
  return GET<QuestionBankAdultLog[]>(`/questionBank/adultLogs`, params);
};

/**
 * 获取题库详情
 * @param params
 * @returns
 */
export const questionBankDetailAPI = (params: { id: number }) => {
  return GET<QuestionBank>(`/questionBank/detail`, params);
};

/**
 * 创建题库
 * @param params
 * @returns
 */
export const createQuestionBankAPI = (params: Record<string, any>) => {
  return POST(`/questionBank/create`, params);
};

/**
 * 修改题库
 * @param params
 * @returns
 */
export const updateQuestionBankAPI = (params: Record<string, any>) => {
  return POST(`/questionBank/update`, params);
};
