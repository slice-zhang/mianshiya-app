import { forwardRef, memo, useImperativeHandle, useState } from "react";
import {
  Form,
  Input,
  message,
  Modal,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImageAPI } from "@/api/oss";
import { getUserDetailByIdAPI, updateUserAPI } from "@/api/user";

export interface DetailModalRef {
  open: (id: number) => void;
}

interface ModalProps {
  onSubmit: () => void;
}

const App = memo(
  forwardRef<DetailModalRef, ModalProps>((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formInstance] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [id, setId] = useState<number>(0);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    useImperativeHandle(ref, () => ({
      open: async (id: number) => {
        if (isModalOpen) return;
        setId(id);
        setIsModalOpen(true);
        try {
          setSpinLoading(true);
          const { data } = await getUserDetailByIdAPI({ id });
          formInstance.setFieldsValue({
            username: data.username,
            user_profile: data.user_profile,
            user_avatar: data.user_avatar,
          });
          const fileName = data.user_avatar || "".split("/").pop();
          setFileList([
            {
              uid: "-1",
              name: fileName,
              status: "done",
              url: data.user_avatar,
            },
          ]);
        } finally {
          setSpinLoading(false);
        }
      },
    }));

    const handleOk = async () => {
      try {
        await formInstance.validateFields();
        setConfirmLoading(true);
        let urls: string[] = [];
        if (fileList && fileList.length) {
          const ossResult = await Promise.allSettled(
            fileList.map(async (file: UploadFile<any>) => {
              if (file.url) {
                return Promise.resolve({
                  status: "fulfilled",
                  value: {
                    data: file.url,
                  },
                } as any);
              }
              const fd = new FormData();
              fd.append("avatar", file.originFileObj as File);
              return uploadImageAPI(fd);
            })
          );
          urls = ossResult.map((i) => {
            if (i.status === "fulfilled") {
              return i.value.data;
            }
          });
        }
        await updateUserAPI({
          id,
          username: formInstance.getFieldValue("username"),
          user_profile: formInstance.getFieldValue("user_profile"),
          user_avatar: urls[0],
        });
        message.success("更新成功");
        props?.onSubmit?.();
        setIsModalOpen(false);
      } finally {
        setConfirmLoading(false);
      }
    };

    const handleCancel = () => {
      setFileList([]);
      formInstance.resetFields();
      setId(0);
      setConfirmLoading(false);
      setSpinLoading(false);
      setIsModalOpen(false);
    };

    const uploadImageChange: UploadProps["onChange"] = (info) => {
      const newFileList = [...info.fileList];
      for (let i = 0; i < newFileList.length; i++) {
        const file = newFileList[i];
        if (file.originFileObj && !file.url) {
          const reader = new FileReader();
          reader.onload = (e) => {
            file.url = e.target?.result as string;
            setFileList(newFileList);
          };
          reader.onerror = () => {
            newFileList.splice(i, 1);
            setFileList(newFileList);
          };
          reader.readAsDataURL(file.originFileObj);
        }
      }
    };

    const uploadImageRemove: UploadProps["onRemove"] = (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    };

    return (
      <Modal
        title="编辑"
        open={isModalOpen}
        onOk={handleOk}
        okText="确认"
        confirmLoading={confirmLoading}
        cancelText="取消"
        onCancel={handleCancel}
      >
        <Spin spinning={spinLoading}>
          <Form form={formInstance} layout="vertical">
            <Form.Item
              label="用户名:"
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="简介:"
              name="user_profile"
              rules={[{ required: true, message: "请输入你的简介!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="user_avatar" label="头像:">
              <Upload
                fileList={fileList}
                name="avatar"
                listType="picture-card"
                showUploadList={true}
                maxCount={1}
                multiple={true}
                beforeUpload={() => false}
                onChange={uploadImageChange}
                onRemove={uploadImageRemove}
              >
                <PlusOutlined />
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default App;
