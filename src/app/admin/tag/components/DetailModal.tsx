import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Form, Input, message, Modal, Spin } from "antd";

import { createTagAPI, tagDetailAPI, updateTagAPI } from "@/api/tag";

export interface DetailModalRef {
  open: (type: string, id?: number) => void;
}

interface ModalProps {
  onSubmit: () => void;
}

const App = memo(
  forwardRef<DetailModalRef, ModalProps>((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formInstance] = Form.useForm();
    const [id, setId] = useState<number>(0);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [spinning, setSpinning] = useState(false);

    useImperativeHandle(ref, () => ({
      open: async (type: string, id?: number) => {
        if (isModalOpen) return;
        formInstance.resetFields();
        setIsModalOpen(true);
        if (type === "update" && id) {
          id && setId(id);
          setIsUpdated(true);
          try {
            setSpinning(true);
            const { data } = await tagDetailAPI({ id });
            const { name } = data;
            formInstance.setFieldsValue({
              name,
            });
          } finally {
            setSpinning(false);
          }
        }
      },
    }));

    const handleOk = useCallback(async () => {
      try {
        await formInstance.validateFields();
        setConfirmLoading(true);
        const { name } = formInstance.getFieldsValue();
        const fetchApi = isUpdated ? updateTagAPI : createTagAPI;
        const params: Record<string, any> = {
          name,
        };
        if (isUpdated) {
          params.id = id;
        }
        await fetchApi(params);
        message.success(`${isUpdated ? "更新" : "创建"}成功`);
        props?.onSubmit?.();
        setIsModalOpen(false);
      } finally {
        setConfirmLoading(false);
      }
    }, [formInstance, isUpdated, id, props?.onSubmit]);

    const handleCancel = useCallback(() => {
      formInstance.resetFields();
      setId(0);
      setIsUpdated(false);
      setConfirmLoading(false);
      setIsModalOpen(false);
    }, [formInstance, id, isUpdated, confirmLoading, isModalOpen]);

    return (
      <Modal
        title={isUpdated ? "编辑标签" : "创建标签"}
        open={isModalOpen}
        onOk={handleOk}
        okText="确认"
        confirmLoading={confirmLoading}
        cancelText="取消"
        onCancel={handleCancel}
      >
        <Spin spinning={spinning}>
          <Form form={formInstance} layout="vertical">
            <Form.Item
              label="名称:"
              name="name"
              rules={[{ required: true, message: "请输入名称!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default App;
