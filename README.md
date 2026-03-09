# Mianshiya - 面试鸭

这是一个基于 Next.js 构建的现代化面试题库管理系统，旨在帮助开发者和求职者高效准备技术面试，同时为技术团队提供题库管理功能。

## 项目概述

Mianshiya（面试鸭）是一个功能完整的面试题库平台，提供：
- **题库浏览**：用户可以浏览不同分类的题库
- **题目查看**：支持 Markdown 格式的题目内容展示
- **管理员后台**：完整的 CRUD 管理功能（题目、题库、标签、用户）
- **权限控制**：基于角色的访问控制机制
- **用户系统**：登录、用户资料管理等功能

## 功能特性

### 用户端功能
- 首页展示热门题库和题目
- 题目详情页查看（支持 Markdown 渲染）
- 用户个人资料展示
- 响应式设计，适配不同设备

### 管理员功能
- **题目管理**：创建、编辑、删除、审核题目
- **题库管理**：组织和管理题库分类
- **标签管理**：为题目添加标签便于分类
- **用户管理**：查看和管理用户信息
- **操作日志**：记录管理员操作历史

### 技术特性
- **性能优化**：计划集成 Redis 缓存，减轻数据库压力
- **权限系统**：细粒度的路由级权限控制
- **模块化架构**：清晰的代码组织结构
- **类型安全**：完整的 TypeScript 类型定义

## 技术栈

- **框架**: Next.js 16 + React 19 (App Router)
- **语言**: TypeScript
- **状态管理**: Redux Toolkit + React Redux
- **UI 组件库**: Ant Design 6.3
- **样式**: Sass + CSS Modules
- **HTTP 客户端**: Axios
- **Markdown**: @bytemd/react / react-markdown-editor-lite
- **包管理**: pnpm

## 学习价值

通过这个项目，你可以学到：

### 1. **现代前端架构**
- Next.js App Router 最佳实践
- 模块化项目结构设计
- 多层布局系统（BasicLayout, AccessLayout, InitLayout）

### 2. **状态管理**
- Redux Toolkit 的实际应用
- 全局状态与局部状态的合理划分
- 异步操作处理（thunks）

### 3. **权限控制实现**
- 基于枚举的权限系统设计
- 路由级访问控制
- 角色权限验证逻辑

### 4. **API 设计与封装**
- RESTful API 接口组织
- 服务层抽象
- 请求拦截器和错误处理

### 5. **组件工程化**
- 可复用组件设计（Modal, Card, Table 等）
- 高阶组件模式
- Props 类型定义和验证

### 6. **性能优化策略**
- 缓存策略规划（Redis 集成）
- 数据库查询优化思路
- 前端加载性能考虑

### 7. **工程化实践**
- ESLint 代码规范
- TypeScript 严格类型检查
- 环境配置管理
- 部署最佳实践（Vercel）

## 快速开始

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```
访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本
```bash
pnpm build
pnpm start
```

## 项目结构

```
src/
├── access/           # 权限控制相关
├── api/             # API 接口封装
├── app/             # 页面路由 (Next.js App Router)
│   ├── admin/       # 管理员后台
│   └── ...          # 用户端页面
├── components/      # 公共组件
├── config/          # 配置文件
├── constant/        # 常量定义
├── layouts/         # 布局组件
├── service/         # 服务层
└── store/           # Redux 状态管理
```

## 后续优化点

- 主页的题库和题目从 Redis 获取，降低 MySQL 压力，同时取得排行榜前十的数据
- 完善测试覆盖率
- 添加更多交互功能（收藏、评论、搜索等）

## 部署

推荐部署到 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，这是 Next.js 官方推荐的部署方案。