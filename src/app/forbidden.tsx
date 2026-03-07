"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function Forbidden() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="你小子，没权限还想访问？洗洗早点睡吧！！！！！！！"
      extra={
        <Button type="primary" onClick={goBack}>
          返回
        </Button>
      }
    />
  );
}
