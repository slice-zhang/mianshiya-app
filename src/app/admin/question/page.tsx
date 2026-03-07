"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
} from "antd";
import { Button, TableProps } from "antd";
import DetailModal, { DetailModalRef } from "./components/DetailModal";
import {
  AdultStatus,
  adultStatusMap,
  adultStatusOptions,
  difficultyOptions,
  vipOptions,
} from "./config";
import AdultModal, { AdultModalRef } from "./components/AdultModal";
import AdultLogsModal, { AdultLogsModalRef } from "./components/AdultLogsModal";
import { Question } from "@/api/question/type";
import { deleteQuestionAPI, getQuestionByPageAPI } from "@/api/question";
const App: React.FC = () => {
  const [list, setListData] = useState<Question[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`,
    pageSizeOptions: ["10", "20", "50"],
  });
  const [formInstance] = Form.useForm();
  const detailModalRef = useRef<DetailModalRef | null>(null);
  const adultModalRef = useRef<AdultModalRef | null>(null);
  const adultLogsModalRef = useRef<AdultLogsModalRef | null>(null);
  const columns: TableProps<Question>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "创建者",
      dataIndex: "user_id",
      render: (_, record) => <div>{record.user?.username || "-"}</div>,
    },
    {
      title: "审核状态",
      dataIndex: "adult_status",
      render: (_, record) => <div>{adultStatusMap[record.adult_status]}</div>,
    },
    {
      title: "浏览量",
      dataIndex: "view_num",
    },
    {
      title: "点赞量",
      dataIndex: "thumb_num",
    },
    {
      title: "收藏量",
      dataIndex: "favour_num",
    },
    {
      title: "是否需要vip",
      dataIndex: "need_vip",
      render: (_, record) => (
        <div>{Number(record.need_vip) === 1 ? "是" : "否"}</div>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
    },
    {
      title: "备注",
      dataIndex: "updated_at",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => adultLogsModalRef.current?.open(record.id)}
        >
          备注
        </Button>
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          {Number(record.adult_status) !== AdultStatus.SUCCESS && (
            <Button type="link" onClick={() => handleAdult(record)}>
              审批
            </Button>
          )}
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>

          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Question) => {
    detailModalRef.current?.open("update", record.id);
  };

  const handleDelete = async (record: Question) => {
    await deleteQuestionAPI({ id: record.id });
    message.success("删除成功");
    getQuestionList();
  };

  const handleAdult = (record: Question) => {
    adultModalRef.current?.open(record.id);
  };

  const getQuestionList = useCallback(async () => {
    try {
      setTableLoading(true);
      const { title, adult_status, need_vip, difficulty } =
        formInstance.getFieldsValue();
      const { data } = await getQuestionByPageAPI({
        page_no: pagination.current,
        page_size: pagination.pageSize,
        title,
        adult_status,
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
  }, [pagination.current, pagination.pageSize, formInstance]);

  const pageChangeList = ({ current, pageSize }: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, current, pageSize }));
  };

  const resetForm = () => {
    formInstance.resetFields();
    getQuestionList();
  };

  const createQuestionBank = () => {
    detailModalRef.current?.open("create");
  };

  useEffect(() => {
    getQuestionList();
  }, [getQuestionList]);

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
            <Form.Item label="审核状态" name="adult_status">
              <Select
                placeholder="请选择审核状态"
                options={adultStatusOptions}
              />
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
                <Button type="primary" onClick={getQuestionList}>
                  搜索
                </Button>
                <Button onClick={resetForm}>重置</Button>
                <Button type="primary" onClick={createQuestionBank}>
                  创建题目
                </Button>
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
        scroll={{ x: "max-content", y: 450 }}
        dataSource={list}
        onChange={pageChangeList}
        loading={tableLoading}
      />
      <DetailModal ref={detailModalRef} onSubmit={getQuestionList} />
      <AdultModal ref={adultModalRef} onSubmit={getQuestionList} />
      <AdultLogsModal ref={adultLogsModalRef} />
    </>
  );
};

export default App;
