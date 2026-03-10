"use server";

import { QuestionBank } from "@/api/questionBank/type";
import { questionBankDetailAPI } from "@/api/questionBank";

export default async function QuestionBankDetailPage({ params }: any) {
  const { questionBankId } = await params;
  let questionBank: QuestionBank | null = null;
  try {
    const { data } = await questionBankDetailAPI({
      id: questionBankId,
    });
    questionBank = data;
  } catch (error) {
    console.log("获取题目详情失败", error);
  }
  if (!questionBank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  return <div>{JSON.stringify(questionBank)}</div>;
}
