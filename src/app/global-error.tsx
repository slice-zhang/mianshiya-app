"use client";
import { Result } from "antd";
export default function errorPage() {
  return (
    <html>
      <body>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      </body>
    </html>
  );
}
