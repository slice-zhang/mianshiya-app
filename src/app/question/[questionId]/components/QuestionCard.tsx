"use client";

import { Question } from "@/api/question/type";
import { EyeOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Flex, Space, Tabs, TabsProps, Tag } from "antd";
import { memo } from "react";
import { difficultyMap } from "../config";
import MarkdownViewer from "@/components/MdView";

interface Props {
  question: Question;
}

export const QuestionCard = memo((props: Props) => {
  const { question } = props;

  const RecommandAnswerFc = () => {
    return <MarkdownViewer mdContent={question.answer} />;
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "推荐答案",
      children: <RecommandAnswerFc />,
    },
  ];
  return (
    <>
      <Card variant="borderless">
        <MarkdownViewer mdContent={question.title} />
        <div style={{ margin: "10px 0" }}>
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
        <Flex gap="large" align="center">
          <div>
            <StarOutlined />
            <span style={{ marginLeft: 10 }}>{question.favour_num}</span>
          </div>
          <div>
            <EyeOutlined />
            <span style={{ marginLeft: 10 }}>{question.view_num}</span>
          </div>
        </Flex>
      </Card>
      <Card variant="borderless" style={{ marginTop: 20 }}>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </>
  );
});
