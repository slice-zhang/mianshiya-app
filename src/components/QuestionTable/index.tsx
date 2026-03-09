"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import { Button, TableProps } from "antd";
import { Question } from "@/api/question/type";
import { getQuestionByPageAPI } from "@/api/question";
import { difficultyMap } from "@/components/QuestionList/config";
import { difficultyOptions, vipOptions } from "@/app/admin/question/config";

interface Props {
  questionList: Question[];
  total: number;
  title: string;
}

const App = (props: Props) => {
  const [list, setListData] = useState<Question[]>(props.questionList);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({
    title: props.title,
  });
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: props.total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`,
    pageSizeOptions: ["10", "20", "50"],
  });
  const [formInstance] = Form.useForm();

  const columns: TableProps<Question>["columns"] = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: (_, record) => (
        <Space>
          {record.need_vip === 1 && <Tag color="#efb141">会员</Tag>}
          <Tag color={difficultyMap[record.difficulty].color}>
            {difficultyMap[record.difficulty].text}
          </Tag>
          {record.tags.map((i) => (
            <Tag key={i} color="blue">
              {i}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  const getQuestionList = useCallback(
    async (page?: TablePaginationConfig) => {
      try {
        setTableLoading(true);
        const { title, need_vip, difficulty } = formInstance.getFieldsValue();
        const { data } = await getQuestionByPageAPI({
          page_no: page?.current || pagination.current,
          page_size: page?.pageSize || pagination.pageSize,
          title,
          need_vip,
          difficulty,
        });
        const { list, total } = data;
        setPagination((prev) => ({
          ...prev,
          total,
        }));
        setListData(list);
      } finally {
        setTableLoading(false);
      }
    },
    [pagination.current, pagination.pageSize, formInstance, tableLoading]
  );

  const pageChangeList = ({ current, pageSize }: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, current, pageSize }));
    getQuestionList({ current, pageSize });
  };

  const resetForm = () => {
    setSearchParams((prev) => ({
      ...prev,
      title: undefined,
    }));
    formInstance.resetFields();
    getQuestionList();
  };

  useEffect(() => {
    formInstance.setFieldValue("title", searchParams.title);
  }, [searchParams, formInstance]);

  return (
    <>
      <Form form={formInstance}>
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Form.Item label="标题" name="title">
              <Input placeholder="请输入标题" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="难度" name="difficulty">
              <Select placeholder="请选择难度" options={difficultyOptions} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="会员题目" name="need_vip">
              <Select placeholder="请选择是否需要会员" options={vipOptions} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={null}>
              <Space>
                <Button type="primary" onClick={() => getQuestionList()}>
                  搜索
                </Button>
                <Button onClick={resetForm}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table<Question>
        rowKey="id"
        pagination={pagination}
        locale={{ emptyText: "暂无题目数据" }}
        columns={columns}
        scroll={{ x: "max-content" }}
        dataSource={list}
        onChange={pageChangeList}
        loading={tableLoading}
      />
    </>
  );
};

export default App;
