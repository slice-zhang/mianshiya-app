"use server";
import { questionDetailAPI } from "@/api/question";
import { Question } from "@/api/question/type";
import { QuestionCard } from "./components/QuestionCard";

export default async function QuestionPage({ params }: any) {
  const { questionId } = await params;
  let question: Question | null = null;
  try {
    const { data } = await questionDetailAPI({ id: questionId });
    question = data;
  } catch (error) {
    console.log("获取题目详情失败", error);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  return <QuestionCard question={question} />;
}
