# 视频会议应用

一个基于 Next.js 的视频会议 Web 应用，支持多人视频通话和实时互动。

## 技术栈

- 前端框架: Next.js 14
- UI 组件: shadcn/ui
- 样式: Tailwind CSS
- 类型检查: TypeScript

## 功能特性

- 多人视频会议
- 响应式设计，适配移动端
- 主题切换支持
- 丰富的 UI 组件库

## 快速开始

1. 安装依赖:

```bash
pnpm install
# 或
yarn install
# 或
npm install
```

2. 运行开发服务器:

```bash
pnpm dev
# 或
yarn dev
# 或
npm run dev
```

3. 打开浏览器访问: [http://localhost:3000](http://localhost:3000)

## 项目结构

```
├── app/            # Next.js应用路由
├── components/     # 可复用组件
├── docs/           # 文档
│   └── c4/         # C4架构模型
├── hooks/          # 自定义Hook
├── lib/            # 工具函数
├── public/         # 静态资源
└── styles/         # 全局样式
```

## 架构文档

项目使用 C4 模型进行架构设计，文档位于`docs/c4/`目录下：

- `context.puml`: 系统上下文图
- `container.puml`: 容器图
- `component.puml`: 组件图
- `code.puml`: 代码图

使用[PlantUML](https://plantuml.com/)工具可查看和编辑这些图表。

## 贡献指南

See [CONTRIBUTING.md](CONTRIBUTING.md). 欢迎提交 Pull Request。请确保代码风格一致并通过所有测试。Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities as described in [SECURITY.md](SECURITY.md).

## License

[Apache-2.0](LICENSE) © 2026 Felix Zhu
