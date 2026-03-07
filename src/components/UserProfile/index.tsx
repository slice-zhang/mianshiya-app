"use client";
import styles from "./index.module.scss";
import { Dropdown, MenuProps, message } from "antd";
import Image from "next/image";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { SmileOutlined } from "@ant-design/icons";
import { userLogoutAPI } from "@/api/user";
import { DEFAULT_USER, setUserInfo } from "@/store/user";
import { useRouter } from "next/navigation";

interface Props {
  clickAvator?: () => void;
}

const items: MenuProps["items"] = [
  {
    key: 1,
    label: "退出登录",
    icon: <SmileOutlined />,
  },
];
const UserInfo: FC<Props> = ({ clickAvator }) => {
  const loginUser = useSelector((state: RootState) => state.userLogin);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleImageClick = () => {
    clickAvator && clickAvator();
  };

  const onMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (Number(key) === 1) {
      // 退出登录
      await userLogoutAPI();
      dispatch(setUserInfo(DEFAULT_USER));
      router.replace("/");
      message.success("退出登录成功");
    }
  };

  return loginUser.id ? (
    <Dropdown menu={{ items, onClick: onMenuClick }}>
      <div className={styles.userWrap}>
        <Image
          src={loginUser.user_avatar ?? ""}
          alt="logo"
          width={20}
          height={20}
          style={{ borderRadius: "50%" }}
        />
        <span>{loginUser.username}</span>
      </div>
    </Dropdown>
  ) : (
    <div className={styles.userWrap}>
      <Image
        src={loginUser.user_avatar ?? ""}
        alt="logo"
        width={20}
        height={20}
        onClick={handleImageClick}
        style={{ borderRadius: "50%" }}
      />
      <span>{loginUser.username}</span>
    </div>
  );
};

export default memo(UserInfo);
