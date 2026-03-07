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

import { deleteTagAPI, getTagListByPage } from "@/api/tag";
import { Tag } from "@/api/tag/type";
const App: React.FC = () => {
  const [list, setListData] = useState<Tag[]>([]);
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
  const columns: TableProps<Tag>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
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
      title: "操作",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>

          <Popconfirm
            title="确定要删除该标签吗？"
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

  const handleEdit = (record: Tag) => {
    detailModalRef.current?.open("update", record.id);
  };

  const handleDelete = async (record: Tag) => {
    await deleteTagAPI({ id: record.id });
    message.success("删除成功");
    getTagList();
  };

  const getTagList = useCallback(async () => {
    try {
      setTableLoading(true);
      const { name } = formInstance.getFieldsValue();
      const { data } = await getTagListByPage({
        page_no: pagination.current,
        page_size: pagination.pageSize,
        name,
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
    getTagList();
  };

  const createQuestionBank = () => {
    detailModalRef.current?.open("create");
  };

  useEffect(() => {
    getTagList();
  }, [getTagList]);

  return (
    <>
      <Form form={formInstance}>
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Form.Item label="名称" name="name">
              <Input placeholder="请输入名称" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={null}>
              <Space>
                <Button type="primary" onClick={getTagList}>
                  搜索
                </Button>
                <Button onClick={resetForm}>重置</Button>
                <Button type="primary" onClick={createQuestionBank}>
                  创建标签
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table<Tag>
        rowKey="id"
        pagination={pagination}
        locale={{ emptyText: "暂无标签数据" }}
        columns={columns}
        scroll={{ x: "max-content", y: 450 }}
        dataSource={list}
        onChange={pageChangeList}
        loading={tableLoading}
      />
      <DetailModal ref={detailModalRef} onSubmit={getTagList} />
    </>
  );
};

export default App;
