"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  memo,
  useCallback,
} from "react";
import { Button, Form, Input, message, Modal } from "antd";
import Image from "next/image";
import styles from "./index.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userLoginAPI, userRegisterAPI } from "@/api/user";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/user";
export interface ModalRef {
  open: () => void;
}

export interface Props {}

const App = memo(
  forwardRef<ModalRef, Props>((_, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useImperativeHandle(ref, () => {
      return {
        open: () => {
          if (isModalOpen) return;
          setIsModalOpen(true);
        },
      };
    });

    const [formInstance] = Form.useForm();
    const [loading, setLoading] = useState({
      login: false,
      register: false,
    });
    const dispatch = useDispatch();

    const handleCloseModal = () => {
      setIsModalOpen(false);
      formInstance.resetFields();
    };

    const handleLogin = async () => {
      try {
        if (loading.login) return;
        setLoading((prev) => ({ ...prev, login: true }));
        await formInstance.validateFields();
        const params = formInstance.getFieldsValue();
        const { data } = await userLoginAPI(params);
        dispatch(setUserInfo(data));
        message.success("登录成功");
        handleCloseModal();
      } finally {
        setLoading((prev) => ({ ...prev, login: false }));
      }
    };

    const handleRegister = async () => {
      try {
        if (loading.register) return;
        setLoading((prev) => ({ ...prev, register: true }));
        await formInstance.validateFields();
        const params = formInstance.getFieldsValue();
        await userRegisterAPI(params);
        message.success("注册成功");
      } finally {
        formInstance.resetFields();
        setLoading((prev) => ({ ...prev, register: false }));
      }
    };

    return (
      <Modal open={isModalOpen} footer={false} onCancel={handleCloseModal}>
        <div>
          <div className={styles.titleWrap}>
            <Image
              src="https://github.githubassets.com/favicons/favicon.png"
              width={30}
              height={30}
              alt="logo"
            />
            <h2>面试鸭</h2>
          </div>
          <div className={styles.subTitle}>
            面试鸭是一个面试小助手，用于帮助用户快速了解面试中的常见问题，并给出相应的答案。
          </div>
          <Form form={formInstance}>
            <Form.Item
              label={null}
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
            >
              <Input
                autoComplete="off"
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={null}
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
            >
              <Input
                size="large"
                autoComplete="off"
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </Form>
          <div className={styles.btnWrap}>
            <Button
              type="primary"
              loading={loading.login}
              onClick={handleLogin}
            >
              登录
            </Button>
            <Button onClick={handleRegister} loading={loading.register}>
              注册
            </Button>
          </div>
        </div>
      </Modal>
    );
  })
);

export default App;
