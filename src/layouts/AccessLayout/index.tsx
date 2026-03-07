"use client";

import UserRoleEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";
import { findAllMenuByPath } from "@/config/menu";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}
export default function AccessLayout(props: Props) {
  const { children } = props;
  const path = usePathname();
  const userRole = useSelector(
    (state: RootState) => state.userLogin.user_role
  ) as number;
  console.log("path", path);

  const menu = findAllMenuByPath(path);
  console.log("menu", menu);

  const needAccess = menu?.access ?? UserRoleEnum.NOT_AUTH;
  const canAccess = checkAccess(userRole, needAccess);

  return canAccess ? children : <Forbidden />;
}
