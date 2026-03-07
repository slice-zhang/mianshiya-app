"use client";
import { getloginUserDetailAPI } from "@/api/user";
import { setUserInfo } from "@/store/user";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch();
  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const { data } = await getloginUserDetailAPI();
    if (data) {
      // 更新全局用户状态
      dispatch(setUserInfo(data));
    }
  }, []);

  useEffect(() => {
    doInitLoginUser();
  }, []);

  return children;
};

export default InitLayout;
