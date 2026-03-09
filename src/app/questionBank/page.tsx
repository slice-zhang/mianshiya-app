"use server";
import { getQuestionBankByPageAPI } from "@/api/questionBank";
import { QuestionBank } from "@/api/questionBank/type";
import { QuestionBankList } from "@/components/QuestionBankList";
import { Flex } from "antd";

export default async function QuestionBankPage() {
  let questionBankList: QuestionBank[] = [];
  try {
    const questionBankRes = await getQuestionBankByPageAPI({
      page_no: 1,
      page_size: 200,
    });
    questionBankList = questionBankRes.data.list || [];
  } catch (error) {
    console.log("获取题库列表失败", error);
  }

  return (
    <div id="question-bank-page" className="max-width-container">
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        <h2>题库大全</h2>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
