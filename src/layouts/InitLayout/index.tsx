"use client";
import { getloginUserDetailAPI } from "@/api/user";
import { LoginKey } from "@/constant";
import { setUserInfo } from "@/store/user";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch();

  const initLoginUser = useCallback(() => {
    getloginUserDetailAPI().then(({ data }) => {
      data && dispatch(setUserInfo(data));
    });
  }, [dispatch]);

  useEffect(() => {
    const loginKey = localStorage.getItem(LoginKey);
    if (loginKey && loginKey === "1") {
      initLoginUser();
    }
  }, []);

  return children;
};

export default InitLayout;
