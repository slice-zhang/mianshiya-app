"use server";

import { QuestionBank } from "@/api/questionBank/type";
import { questionBankDetailAPI } from "@/api/questionBank";
import { Avatar, Card, Divider } from "antd";
import QuestionTable from "@/components/QuestionTable";
import { Meta } from "antd/es/list/Item";

export default async function QuestionBankDetailPage({ params }: any) {
  const { questionBankId } = await params;
  let questionBank: QuestionBank | null = null;
  try {
    const { data } = await questionBankDetailAPI({
      id: questionBankId,
      need_question_list: true,
    });
    questionBank = data;
  } catch (error) {
    console.log("获取题目详情失败", error);
  }

  if (!questionBank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  return (
    <div id="question-bank-detail" className="max-width-container">
      <Card>
        <Meta
          style={{ display: "flex", gap: 10 }}
          avatar={<Avatar src={questionBank.picture} />}
          title={<h2>{questionBank.title}</h2>}
          description={questionBank.description}
        />
      </Card>
      <Divider />
      <QuestionTable
        questionList={questionBank?.questionList || []}
        total={questionBank?.questionList?.length || 0}
      ></QuestionTable>
    </div>
  );
}
