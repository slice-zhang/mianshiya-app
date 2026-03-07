"use client";
import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import "bytemd/dist/index.css"; // 引入样式文件

interface Props {
  mdContent: string;
}

export default function MarkdownViewer(props: Props) {
  const plugins = [gfm()];

  return <Viewer value={props.mdContent} plugins={plugins} />;
}
