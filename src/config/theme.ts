// 定义全局主题，覆盖 antd 默认样式
export const antdTheme = {
  components: {
    // 覆盖 Header 样式
    Layout: {
      headerBg: "#ffffff", // 背景改为白色
      headerHeight: 64,
      headerPadding: "0 24px",
    },
    // 覆盖 Menu 样式
    Menu: {
      horizontalBorderBottom: "none", // 去掉底部边框
      itemColor: "#667085",
      itemHoverColor: "#165dff",
      itemSelectedColor: "#165dff",
    },
  },
  token: {
    colorPrimary: "#165dff", // 全局主色
  },
};
