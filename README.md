# Serendipity - 智能思维导图生成器

一个基于 AI 的智能思维导图生成平台，帮助用户探索知识之间的潜在联系，构建结构化的思维图谱。

## 🌟 核心功能

- **🤖 AI 驱动的思维导图生成**：基于关键词自动生成深度思维导图
- **📊 实时流式渲染**：边生成边显示，提供流畅的用户体验
- **💾 智能缓存机制**：本地存储优化，提升访问速度
- **🔍 智能搜索建议**：基于历史记录的自动完成功能

## 🏗️ 技术架构

### 前端 (Frontend)

- **框架**：React 19 + TypeScript
- **构建工具**：Vite + Nx
- **状态管理**：Zustand
- **路由**：React Router v6
- **UI 框架**：Tailwind CSS

### 后端 (Backend)

- **运行时**：Node.js
- **框架**：Hono (轻量级 Web 框架)
- **数据库**：PostgreSQL + Kysely ORM
- **AI 服务**：OpenAI API / OpenRouter
- **流式处理**：@streamparser/json

### 基础设施

- **容器化**：Docker + Multi-stage builds
- **代码质量**：Prettier + ESLint + Pre-commit hooks
- **测试框架**：Jest + Vitest
- **构建系统**：Nx Monorepo

## 🚀 快速开始

### 环境要求

- Node.js 24+
- PostgreSQL 14+

### 本地开发

#### 1. 克隆项目

```bash
git clone <repository-url>
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
nano .env
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
# 创建数据库
createdb serendipity

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

### 开发工作流

#### 代码格式化

项目配置了自动代码格式化：

```bash
# 手动格式化所有文件
npm run format

# Git 提交时自动格式化 (pre-commit hook)
git commit -m "your message"  # 自动触发格式化
```

#### 类型检查

```bash
# 运行 TypeScript 类型检查
npm run typecheck
```

#### 测试

```bash
# 运行所有测试
npm test

# 运行 CI 检查 (测试 + 类型检查)
npm run ci
```

#### 数据库操作

```bash
# 生成数据库类型定义
npm run generateTypes

# 运行数据库迁移
npm run migrate:db
```
