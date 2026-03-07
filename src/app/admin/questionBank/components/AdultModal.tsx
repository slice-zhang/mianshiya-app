import {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Form, Input, message, Modal, Radio, RadioChangeEvent } from "antd";
import { questionBankAdultAPI } from "@/api/questionBank";

interface AdultModalProps {
  onSubmit: () => void;
}

export interface AdultModalRef {
  open: (id: number) => void;
}

const App = memo(
  forwardRef<AdultModalRef, AdultModalProps>((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questionBankId, setQuestionBankId] = useState<number>(0);
    const [form] = Form.useForm();
    const [isRequireRemark, setIsRequireRemark] = useState(false);

    useImperativeHandle(ref, () => ({
      open: (id: number) => {
        setQuestionBankId(id);
        setIsModalOpen(true);
      },
    }));

    const changeAdultStatus = (e: RadioChangeEvent) => {
      const value = e.target.value as number;
      setIsRequireRemark(value === 2);
    };

    const handleOk = async () => {
      await form.validateFields();
      const { adult_status, remark } = form.getFieldsValue();
      await questionBankAdultAPI({
        id: questionBankId,
        adult_status,
        remark,
      });
      message.success("提交审批成功");
      props?.onSubmit?.();
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      form.resetFields();
      setQuestionBankId(0);
      setIsModalOpen(false);
    };

    return (
      <Modal
        title="审批"
        open={isModalOpen}
        onOk={handleOk}
        okText="提交"
        cancelText="取消"
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="审批结果"
            name="adult_status"
            rules={[{ required: true, message: "请选择你的审批结果!" }]}
          >
            <Radio.Group onChange={changeAdultStatus}>
              <Radio value={1}>审核通过</Radio>
              <Radio value={2}>审核不通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            rules={[{ required: isRequireRemark, message: "请输入你的备注!" }]}
          >
            <Input.TextArea placeholder="请输入备注" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    );
  })
);

export default App;
