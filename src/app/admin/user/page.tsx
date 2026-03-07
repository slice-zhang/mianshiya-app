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
import { UserData } from "@/api/user/type";
import { deleteUserAPI, getuserListByPageAPI } from "@/api/user";
import DetailModal, { DetailModalRef } from "./components/DetailModal";
import { roleMap, roleOptions } from "./config";
const App: React.FC = () => {
  const [list, setListData] = useState<UserData[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [formInstance] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`,
    pageSizeOptions: ["10", "20", "50"],
  });
  const detailModalRef = useRef<DetailModalRef | null>(null);
  const columns: TableProps<UserData>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "邀请人ID",
      dataIndex: "invite_user",
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户简介",
      dataIndex: "user_profile",
    },
    {
      title: "会员编号",
      dataIndex: "vip_number",
    },
    {
      title: "会员过期时间",
      dataIndex: "vip_expire_time",
    },
    {
      title: "分享码",
      dataIndex: "share_code",
    },
    {
      title: "角色",
      dataIndex: "user_role",
      render: (text) => <div>{roleMap[text as number]}</div>,
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
      render: (text, record) => (
        <Space>
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

  const handleEdit = (record: UserData) => {
    detailModalRef.current?.open(record.id);
  };

  const handleDelete = async (record: UserData) => {
    await deleteUserAPI({ id: record.id });
    message.success("删除成功");
    getUserList();
  };

  const getUserList = async () => {
    try {
      setTableLoading(true);
      const { data } = await getuserListByPageAPI({
        page_no: pagination.current,
        page_size: pagination.pageSize,
        ...formInstance.getFieldsValue(),
      });
      const { list, total } = data;
      setPagination((prev) => ({ ...prev, total }));
      setListData(list);
    } finally {
      setTableLoading(false);
    }
  };

  const pageChangeList = ({ current, pageSize }: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, current, pageSize }));
  };

  const resetForm = () => {
    formInstance.resetFields();
    getUserList();
  };

  useEffect(() => {
    getUserList();
  }, [pagination.current, pagination.pageSize]);

  return (
    <>
      <Form form={formInstance}>
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Form.Item label="用户名" name="username">
              <Input placeholder="请输入用户名" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="角色" name="user_role">
              <Select placeholder="请选择角色身份" options={roleOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={null}>
              <Space>
                <Button type="primary" onClick={getUserList}>
                  搜索
                </Button>
                <Button onClick={resetForm}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table<UserData>
        rowKey="id"
        scroll={{ x: "max-content", y: 430 }}
        pagination={pagination}
        locale={{ emptyText: "暂无用户数据" }}
        columns={columns}
        dataSource={list}
        onChange={pageChangeList}
        loading={tableLoading}
      />
      <DetailModal ref={detailModalRef} onSubmit={getUserList} />
    </>
  );
};

export default App;
