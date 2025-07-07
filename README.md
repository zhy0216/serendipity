# Serendipity - AI 知识探索工具

一个基于 AI 的智能知识探索平台，通过关键词搜索生成相关知识卡片，帮助用户发现和学习各个领域的深度内容。

## 🌟 核心功能

- **🤖 AI 驱动的知识生成**：基于关键词自动生成相关知识内容卡片
- **📊 实时流式渲染**：边生成边显示，提供流畅的内容加载体验
- **💾 智能缓存机制**：本地存储优化，快速访问历史探索内容
- **🔍 智能搜索建议**：基于历史记录的自动完成功能
- **📚 知识卡片展示**：结构化展示相关概念、定义和深度解析

## 🏗️ 技术架构

### 前端 (Frontend)

- **框架**：React 19 + TypeScript
- **构建工具**：Vite + Nx
- **状态管理**：Zustand
- **路由**：React Router v6
- **UI 框架**：Tailwind CSS

### 后端 (Backend)

- **运行时**：Node.js
- **框架**：Hono
- **数据库**：PostgreSQL + Kysely ORM
- **AI 服务**：OpenRouter
- **流式处理**：@streamparser/json

## 🚀 快速开始

### 环境要求

- Node.js 24+
- PostgreSQL 14+

### 本地开发

#### 1. 克隆项目

```bash
git clone https://github.com/zhy0216/serendipity
cd serendipity
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 环境配置

```bash
# 复制环境变量模板
cp .env.template .env

# 编辑环境变量
vim .env
```

**必需的环境变量：**

```bash
# AI 服务配置
export AI_API_KEY="your-api-key"           # OpenAI/OpenRouter API 密钥
export AI_MODEL="deepseek/deepseek-r1-0528" # AI 模型名称
export AI_HOST="https://openrouter.ai/api/v1" # AI API 端点

# 数据库配置
export DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# 开发环境配置
export NODE_ENV=development
export PORT=3000                    # 后端端口
export FRONTEND_PORT=4200           # 前端端口
export NX_NO_CLOUD=true            # 禁用 Nx Cloud
```

#### 4. 数据库初始化

```bash
# 运行数据库迁移
npm run migrate:db

# 生成类型定义 (可选)
npm run generateTypes
```

#### 5. 启动开发服务器

```bash
# 同时启动前后端服务
npm run serve

# 或者分别启动
nx serve backend   # 后端服务：http://localhost:3000
nx serve frontend  # 前端服务：http://localhost:4200
```
