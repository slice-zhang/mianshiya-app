import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
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
import MDEditor from "@uiw/react-md-editor";
import {
  createQuestionBankAPI,
  questionBankDetailAPI,
  updateQuestionBankAPI,
} from "@/api/questionBank";
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

    const fileList = useMemo(() => {
      const { file_list } = formInstance.getFieldsValue();
      return file_list;
    }, [formInstance.getFieldValue("file_list")]);

    useImperativeHandle(ref, () => ({
      open: async (type: string, id?: number) => {
        if (isModalOpen) return;
        setIsModalOpen(true);
        if (type === "update") {
          setIsUpdated(true);
          if (id) {
            setId(id);
            try {
              setSpinning(true);
              const { data } = await questionBankDetailAPI({ id });
              const { title, description, picture, priority } = data;
              formInstance.setFieldsValue({
                title,
                description,
                file_list: picture
                  ? [
                      {
                        uid: "-1",
                        name: picture.split("/").pop(),
                        status: "done",
                        url: picture,
                      },
                    ]
                  : [],
                priority,
              });
            } finally {
              setSpinning(false);
            }
          }
        }
      },
    }));

    const handleOk = useCallback(async () => {
      try {
        await formInstance.validateFields();
        setConfirmLoading(true);
        let urls: string[] = [];
        const {
          title,
          priority,
          description,
          file_list: fileList,
        } = formInstance.getFieldsValue();
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
        const fetchApi = isUpdated
          ? updateQuestionBankAPI
          : createQuestionBankAPI;
        const params: Record<string, any> = {
          title,
          priority,
          description,
          picture: urls[0],
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

    const uploadImageChange: UploadProps["onChange"] = (info) => {
      const newFileList = [...info.fileList];
      for (let i = 0; i < newFileList.length; i++) {
        const file = newFileList[i];
        if (file.originFileObj && !file.url) {
          const reader = new FileReader();
          reader.onload = (e) => {
            file.url = e.target?.result as string;
            formInstance.setFieldValue("file_list", newFileList);
          };
          reader.onerror = () => {
            newFileList.splice(i, 1);
            formInstance.setFieldValue("file_list", newFileList);
          };
          reader.readAsDataURL(file.originFileObj);
        }
      }
    };

    const uploadImageRemove: UploadProps["onRemove"] = (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      formInstance.setFieldValue("file_list", newFileList);
    };

    return (
      <Modal
        title={isUpdated ? "编辑题库" : "创建题库"}
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
              label="描述:"
              name="description"
              rules={[{ required: true, message: "请输入你的描述!" }]}
            >
              <MDEditor height={200} />
            </Form.Item>

            <Form.Item
              name="file_list"
              label="图片:"
              rules={[
                {
                  required: true,
                  type: "array",
                  min: 1,
                  message: "请上传图片!",
                },
              ]}
            >
              <Upload
                fileList={formInstance.getFieldValue("file_list")}
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
