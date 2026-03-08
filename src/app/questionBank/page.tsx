"use server";
import { getQuestionBankByPageAPI } from "@/api/questionBank";
import { QuestionBankList } from "@/components/QuestionBankList";
import { Card, Flex } from "antd";

export default async function QuestionBankPage() {
  const getQuestionBankList = async (params: Record<string, any> = {}) => {
    try {
      const questionBankRes = await getQuestionBankByPageAPI({
        page_no: 1,
        page_size: 200,
        ...params,
      });
      return questionBankRes.data.list || [];
    } catch (error) {
      console.log("获取题库列表失败", error);
      return [];
    }
  };

  const questionBankList = await getQuestionBankList();
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        <h2>题库大全</h2>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
    </>
  );
}
