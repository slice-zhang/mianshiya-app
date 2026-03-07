"use client";
import { Question } from "@/api/question/type";
import { Flex, List, Space, Tag } from "antd";
import { difficultyMap } from "./config";
import "./index.scss";
import Link from "next/link";
interface Props {
  questionList: Question[];
}

export function QuestionList(props: Props) {
  const { questionList } = props;

  const questionView = (question: Question) => (
    <div className="list-item-wrap">
      <Flex justify="space-between" align="center">
        <Link href={`/question/${question.id}`}>{question.title}</Link>
        <div>
          <Space>
            {question.need_vip === 1 && <Tag color="#efb141">会员</Tag>}
            <Tag color={difficultyMap[question.difficulty].color}>
              {difficultyMap[question.difficulty].text}
            </Tag>
            {question.tags.map((i) => (
              <Tag key={i} color="blue">
                {i}
              </Tag>
            ))}
          </Space>
        </div>
      </Flex>
    </div>
  );
  return (
    <div id="question-list-wrap">
      <List
        dataSource={questionList}
        renderItem={(item) => <List.Item>{questionView(item)}</List.Item>}
      />
    </div>
  );
}
