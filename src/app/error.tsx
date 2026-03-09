"use client";
import { Result } from "antd";
export default function errorPage() {
  return <Result status="500" title="500" subTitle="系统错误，请联系管理员" />;
}
