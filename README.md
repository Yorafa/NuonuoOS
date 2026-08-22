## Nuonuo OS

## _浏览器中的桌面环境_

![截图](./screenshot.png)

> 本项目 Fork 自 [DustinBrett/daedalOS](https://github.com/DustinBrett/daedalOS) 并在其基础上修改而成:移除了重型应用与 AI 功能,换装 Win98 风格银色任务栏、斜角开始按钮与深蓝标题栏的经典皮肤。感谢原作者 [Dustin Brett](https://github.com/DustinBrett) 的开源贡献。
>
> 📖 如何使用与自定义本项目(例如:如何添加文件使其显示在桌面/文件管理器、创建快捷方式、更换图标、添加新应用等),参见 [USAGE.md](USAGE.md)。
>
> 🧩 完整的系统能力与应用列表参见 [FEATURES.md](FEATURES.md)。

# 架构 🏗️

## 运行时分层

- **应用外壳**：Next.js Pages Router 入口在 `pages/_app.tsx` 中按顺序挂载 Viewport、Language、Process、FileSystem、Session 和 Menu Provider；`pages/index.tsx` 组合桌面、任务栏与应用加载器。
- **进程模型**：`contexts/process/directory.ts` 是应用注册表，声明动态导入的组件、默认尺寸、图标、运行库和标题；Process Context 负责启动、关闭、焦点和窗口生命周期。
- **文件系统**：ZenFS 提供浏览器端文件抽象，静态站点内容来自构建期生成的 fs 索引，用户写入与挂载目录保存在 IndexedDB 或 File System Access 后端。
- **会话与 UI**：Session Context 持久化壁纸、主题、窗口位置、排序、视图、最近文件等状态；Desktop、Window、FileManager 和 Taskbar 在其上组合出桌面体验。
- **性能观测**：`RenderCostTracker` 基于 React Profiler 记录渲染耗时，默认只在开发环境启用，可用 Alt+Shift+P 输出最近样本。

## Project Structure

| 路径                             | 职责                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/apps/`               | 独立应用实现，如 Terminal、Browser、FileManager 前台界面和应用专属逻辑。                                                                    |
| `components/system/`             | 桌面外壳：`Desktop` 与壁纸、`Files` 文件模型与视图、`Taskbar` / `StartMenu`、`Window` 窗口装饰、`Dialogs` 以及按需渲染应用的 `AppsLoader`。 |
| `contexts/`                      | 全局状态 Provider。重点包括进程生命周期、ZenFS 封装、会话持久化、视口尺寸、语言和菜单。                                                     |
| `hooks/`                         | 跨组件行为，例如全局键盘快捷键、URL 启动参数、iframe 焦点和全局错误处理。                                                                   |
| `pages/`                         | Next.js Pages Router 入口与路由。                                                                                                           |
| `public/`                        | 静态资源和虚拟文件系统的源根目录；`Users/Public/Desktop/` 是桌面图标来源，`.index/` 由构建生成，不要手动编辑。                              |
| `scripts/`                       | 预构建代码生成：搜索索引、RSS、图标缓存、快捷方式缓存和 fs 索引。                                                                           |
| `styles/`                        | styled-components 样式、全局样式和主题基础样式。                                                                                            |
| `test/jest/`、`test/playwright/` | 单元测试与端到端测试。                                                                                                                      |
| `utils/`、`types/`、`locales/`   | 共享工具函数与常量、类型声明和多语言文案。                                                                                                  |

## 构建与资源

- `yarn build:prebuild` 生成搜索索引、RSS、robots、图标缓存、快捷方式缓存和 public 文件系统索引。
- `yarn build` 使用 Next.js Turbopack 进行静态导出，产物位于 `out/`。
- 应用按需通过 dynamic import 和 `loadFiles` 加载，避免把所有应用代码与大型第三方库放进首屏。

# 试一试 🚀

##### 环境要求

- [Node.js](https://nodejs.org/zh-cn/download)
- [Yarn 4 (Berry)](https://yarnpkg.com/)（通过 Corepack 启用：corepack enable）

##### 开发

```
yarn install
yarn build:prebuild
yarn dev --turbopack
```

> 本项目统一使用 Next.js Turbopack 开发与生产构建。

##### 生产构建

```
yarn install
yarn build
yarn serve
```

##### Docker

```
docker build -t nuonuoos.
docker run -dp 3000:3000 --rm --name daedalos daedalos
```

# 致谢

参见 [CREDITS.md](public/Users/Public/Desktop/CREDITS.md)。

##### 备注

- 项目使用 [Yarn 4 (Berry)](https://yarnpkg.com/)，通过 Corepack 管理。运行 `corepack enable` 后即可使用 `yarn` 命令。
