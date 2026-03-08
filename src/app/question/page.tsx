"use server";
import { getQuestionByPageAPI } from "@/api/question";
import { Question } from "@/api/question/type";
import QuestionTable from "./components/QuestionTable";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, any>>;
}) {
  // console.log("searchParams", val);
  const searchParamsData = await searchParams;
  const questionData: {
    list: Question[];
    total: number;
  } = {
    list: [],
    total: 0,
  };

  const getQuestionList = async (params: Record<string, any> = {}) => {
    try {
      const { data } = await getQuestionByPageAPI({
        page_no: 1,
        page_size: 10,
        ...params,
      });
      const { list, total } = data;
      return {
        list,
        total,
      };
    } catch (error) {
      console.log("获取题目列表失败", error);
      return questionData;
    }
  };

  const { list, total } = await getQuestionList({
    title: searchParamsData.q,
  });
  questionData.list = list;
  questionData.total = total;
  return (
    <QuestionTable
      questionList={questionData.list}
      total={questionData.total}
      title={searchParamsData.q}
    />
  );
}
