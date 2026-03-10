"use server";
import { Card, Divider } from "antd";
import { questionDetailAPI } from "@/api/question";
import { Question } from "@/api/question/type";
import { Meta } from "antd/es/list/Item";
export default async function QuestionDetailPage({ params }: any) {
  const { questionId } = await params;
  let question: Question | null = null;
  try {
    const { data } = await questionDetailAPI({
      id: questionId,
    });
    question = data;
  } catch (error) {
    console.log("获取题目详情失败", error);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  return (
    <div id="question-detail" className="max-width-container">
      <Card>
        <Meta
          title={<h2>{question.title}</h2>}
          description={question.content}
        />
      </Card>
      <Divider />
      <Card>
        <Meta title="推荐答案" description={question.answer} />
      </Card>
    </div>
  );
}
