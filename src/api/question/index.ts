import { GET, POST } from "@/service/request";
import { Question, QuestionAdultLog } from "./type";
/**
 * 分页获取题目列表
 * @param params
 * @returns
 */
export const getQuestionByPageAPI = (params: Record<string, any>) => {
  return GET<{ list: Question[]; [k: string]: any }>("/question/list", params);
};

/**
 * 删除题目
 * @param params
 * @returns
 */
export const deleteQuestionAPI = (params: { id: number }) => {
  return GET(`/question/delete`, params);
};

/**
 * 题目审批
 * @param params
 * @returns
 */
export const questionAdultAPI = (params: Record<string, any>) => {
  return POST(`/question/adult`, params);
};

/**
 * 获取题目审批日志
 * @param params
 * @returns
 */
export const getQuestionAdultLogsAPI = (params: Record<string, any>) => {
  return GET<QuestionAdultLog[]>(`/question/adultLogs`, params);
};

/**
 * 获取题目详情
 * @param params
 * @returns
 */
export const questionDetailAPI = (params: { id: number }) => {
  console.log("params", params);

  return GET<Question>(`/question/detail`, params);
};

/**
 * 创建题目
 * @param params
 * @returns
 */
export const createQuestionAPI = (params: Record<string, any>) => {
  return POST(`/question/create`, params);
};

/**
 * 修改题目
 * @param params
 * @returns
 */
export const updateQuestionAPI = (params: Record<string, any>) => {
  return POST(`/question/update`, params);
};
