"use client";
import React, { useCallback, useMemo, useRef } from "react";
import { Input, Layout, Menu, ConfigProvider } from "antd";
import Image from "next/image";
import "./index.scss";
import globe from "../../../public/globe.svg";
import { SearchOutlined } from "@ant-design/icons";
import { filterMenuListByRole } from "@/config/menu";
import { usePathname } from "next/navigation";
import { antdTheme } from "@/config/theme";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LoginModal, { ModalRef } from "@/components/LoginModal";
import UserProfile from "../../components/UserProfile";

interface Props {
  children: React.ReactNode;
}

const { Header, Content, Footer } = Layout;

const App = (props: Props) => {
  const { children } = props;
  const path = usePathname();
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.userLogin.user_role);
  const accountModalRef = useRef<ModalRef | null>(null);

  const menuItems = useMemo(() => filterMenuListByRole(userRole), [userRole]);
  const handleClickAvator = useCallback(() => {
    accountModalRef.current?.open();
  }, []);

  const handleClickMenu = useCallback(
    (item: any) => {
      if (item.key === path) return;
      router.push(item.key);
    },
    [path, router],
  );

  return (
    <div id="basic-layout">
      <ConfigProvider theme={antdTheme}>
        <Layout>
          <Header className="header-wrap">
            <div className="left-box">
              <Image src={globe} alt="logo" width={20} height={20} />
              <h2 className="title">面试鸭</h2>
              <div className="menu-wrap">
                <Menu
                  theme="light"
                  mode="horizontal"
                  selectedKeys={[path]}
                  items={menuItems}
                  onClick={handleClickMenu}
                />
              </div>
            </div>
            <div className="right-box">
              <div className="search-wrap">
                <Input
                  className="search-input"
                  prefix={<SearchOutlined />}
                  placeholder="Basic usage"
                />
                <SearchOutlined className="search-icon" />
              </div>
              <UserProfile clickAvator={handleClickAvator} />
            </div>
          </Header>
          <Content>
            <div className="max-width-container">{children}</div>
          </Content>
          <Footer className="footer">
            Ant Design ©2026 Created by Ant UED
          </Footer>
        </Layout>
        <LoginModal ref={accountModalRef} />
      </ConfigProvider>
    </div>
  );
};

export default App;
