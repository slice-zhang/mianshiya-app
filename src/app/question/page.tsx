"use server";
import { getQuestionByPageAPI } from "@/api/question";
import { Question } from "@/api/question/type";
import QuestionTable from "@/components/QuestionTable";

interface QuestionData {
  list: Question[];
  total: number;
  title: string;
}

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, any>>;
}) {
  const searchParamsData = await searchParams;
  const questionData: QuestionData = {
    list: [],
    total: 0,
    title: searchParamsData.q || "",
  };

  try {
    const { data } = await getQuestionByPageAPI({
      page_no: 1,
      page_size: 10,
      title: searchParamsData.q,
    });
    const { list, total } = data;
    Object.assign(questionData, {
      list,
      total,
    });
  } catch (error) {
    console.log("获取题目列表失败", error);
  }

  return (
    <div id="question-page" className="max-width-container">
      <QuestionTable
        questionList={questionData.list}
        total={questionData.total}
        title={searchParamsData.q}
      />
    </div>
  );
}
