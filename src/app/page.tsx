"use server";

import { getQuestionByPageAPI } from "@/api/question";
import { Question } from "@/api/question/type";
import { getQuestionBankByPageAPI } from "@/api/questionBank";
import { QuestionBank } from "@/api/questionBank/type";
import { QuestionBankList } from "@/components/QuestionBankList";
import { QuestionList } from "@/components/QuestionList";
import { Divider, Flex } from "antd";
import Link from "next/link";

export default async function Home() {
  let questionBankList: QuestionBank[] = [];
  let questionList: Question[] = [];
  try {
    const questionBankRes = await getQuestionBankByPageAPI({
      page_no: 1,
      page_size: 10,
    });
    questionBankList = questionBankRes.data.list || [];
  } catch (error) {
    console.log("获取题库列表失败", error);
  }

  try {
    const questionRes = await getQuestionByPageAPI({
      page_no: 1,
      page_size: 100,
    });
    questionList = questionRes.data.list || [];
  } catch (error) {
    console.log("获取题目列表失败", error);
  }

  return (
    <div className="max-width-container" id="home-page">
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        <h2>热门题库</h2>
        <Link href="/questionBank">查看全部</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />

      <Divider />
      <Flex
        style={{ marginBottom: "20px" }}
        justify="space-between"
        align="center"
      >
        <h2>热门题目</h2>
        <Link href="/question">查看全部</Link>
      </Flex>
      <QuestionList questionList={questionList} />
    </div>
  );
}
