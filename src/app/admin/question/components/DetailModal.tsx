import {
  forwardRef,
  memo,
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImageAPI } from "@/api/oss";
import MDEditor from "@uiw/react-md-editor";

import {
  createQuestionAPI,
  questionDetailAPI,
  updateQuestionAPI,
} from "@/api/question";
import { Tag } from "@/api/tag/type";
import { getTagListByPage } from "@/api/tag";
import { difficultyOptions, vipOptions } from "../config";
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
    const [tagList, setTagList] = useState<Tag[]>([]);
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
            const { data } = await questionDetailAPI({ id });
            const {
              title,
              content,
              answer,
              need_vip,
              priority,
              difficulty,
              tags,
            } = data;
            formInstance.setFieldsValue({
              title,
              content,
              answer,
              need_vip,
              priority,
              difficulty,
              tags,
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
        const { title, priority, difficulty, need_vip, content, answer, tags } =
          formInstance.getFieldsValue();
        const fetchApi = isUpdated ? updateQuestionAPI : createQuestionAPI;
        const params: Record<string, any> = {
          title,
          priority,
          difficulty,
          need_vip,
          content,
          tags,
          answer,
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

    useEffect(() => {
      getTagListByPage({
        page_no: 1,
        page_size: 100,
      }).then((res) => {
        setTagList(res.data.list);
      });
    }, []);

    return (
      <Modal
        title={isUpdated ? "编辑题目" : "创建题目"}
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
              label="标题:"
              name="title"
              rules={[{ required: true, message: "请输入标题!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="排序:"
              name="priority"
              rules={[{ required: true, message: "请输入排序值!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="题目描述:"
              name="content"
              rules={[{ required: true, message: "请输入题目描述!" }]}
            >
              <MDEditor height={200} />
            </Form.Item>
            <Form.Item
              label="题目答案:"
              name="answer"
              rules={[{ required: true, message: "请输入题目答案!" }]}
            >
              <MDEditor height={200} />
            </Form.Item>
            <Form.Item label="标签:" name="tags">
              <Select
                mode="multiple"
                placeholder="请选择标签"
                options={tagList.map((tag) => ({
                  value: tag.name,
                  label: tag.name,
                }))}
              ></Select>
            </Form.Item>
            <Form.Item
              label="难度:"
              name="difficulty"
              rules={[{ required: true, message: "请选择难度!" }]}
            >
              <Radio.Group options={difficultyOptions}></Radio.Group>
            </Form.Item>
            <Form.Item
              label="查看权限:"
              name="need_vip"
              rules={[{ required: true, message: "请选择阅读权限!" }]}
            >
              <Radio.Group options={vipOptions}></Radio.Group>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default App;
