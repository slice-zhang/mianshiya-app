"use client";
import { QuestionBank } from "@/api/questionBank/type";
import { Avatar, Card, List, Typography } from "antd";
import Link from "next/link";

interface Props {
  questionBankList: QuestionBank[];
}

export function QuestionBankList(props: Props) {
  const { questionBankList } = props;

  const questionBankView = (questionBank: QuestionBank) => (
    <Card size="small">
      <Card.Meta
        title={
          <Link href={`/questionBank/${questionBank.id}`}>
            {questionBank.title}
          </Link>
        }
        avatar={<Avatar src={questionBank.picture} />}
        description={
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 1 }}
            style={{ marginBottom: 0 }}
          >
            {questionBank.description}
          </Typography.Paragraph>
        }
      />
    </Card>
  );
  return (
    <div id="question-bank-list-wrap">
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
        }}
        dataSource={questionBankList}
        renderItem={(item) => <List.Item>{questionBankView(item)}</List.Item>}
      />
    </div>
  );
}
