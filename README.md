## 🌌 **daedalOS** 🌌

## _浏览器中的桌面环境_

![截图](https://raw.githubusercontent.com/DustinBrett/daedalOS/refs/heads/main/public/screenshot.png?raw=true)

> 本项目 Fork 自 [DustinBrett/daedalOS](https://github.com/DustinBrett/daedalOS) 并在其基础上修改而成:移除了重型应用与 AI 功能,换装 Win98 风格银色任务栏、斜角开始按钮与深蓝标题栏的经典皮肤。感谢原作者 [Dustin Brett](https://github.com/DustinBrett) 的开源贡献。

# 系统 🧠

### [文件系统](https://github.com/jvilk/BrowserFS)

- 文件资源管理器
  - 后退、前进、最近位置、上一级、地址栏、搜索
  - 缩略图与详细信息视图
- [拖放](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)文件支持(内部与外部)
  - 加载进度对话框
- ZIP([写入支持](https://www.npmjs.com/package/fflate)),[ZIP](https://github.com/jvilk/BrowserFS/blob/master/src/backends/ZipFS.ts)/[ISO](https://github.com/jvilk/BrowserFS/blob/master/src/backends/IsoFS.ts) 读取支持,[7Z/GZ/RAR/TAR 等解压](https://github.com/use-strict/7z-wasm)支持
- 写入 [IndexedDb](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
- 框选/批量操作,拖拽排序与整理
- 音乐、图片、视频的动态自动缓存图标
- 右键菜单
  - 剪切、复制、创建快捷方式、删除、重命名
  - [添加文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)、[映射目录](https://developer.mozilla.org/zh-CN/docs/Web/API/File_System_Access_API)
  - 打开方式选项/对话框、打开文件/文件夹位置、在新窗口打开、在此处打开终端
  - 下载、添加到压缩包、解压到此处、设为壁纸、转换音频/视频/图片/电子表格、属性(含详细信息)
  - 排序方式、新建文件夹、新建文本文档
  - 屏幕捕获
- 键盘快捷键
  - CTRL+C、CTRL+V、CTRL+X、CTRL+A、Delete
  - F2、F5、Backspace、方向键、Enter
  - SHIFT+CTRL+R、SHIFT+F10
  - 全屏时:Windows 键、Windows 键 + R
- 文件信息悬浮提示
- 支持按名称、大小、类型或日期排序
  - 图标位置/排序顺序持久化

### 窗口

- [可调整大小与拖动](https://github.com/bokuweb/react-rnd)
- 最小化、最大化与关闭
- 尺寸/位置/最大化状态持久化
- 打开与关闭[动画](https://www.framer.com/motion/)

### 开始菜单

- 可展开侧边栏
  - 应用列表、文档/图片/视频快捷方式、电源(清除会话)
- 聚光灯视觉效果
- 文件夹支持
- 键盘快捷键 **_SHIFT+ESC_** 打开
  - 全屏时也可用 Windows 键

### 任务栏

- 悬停 [预览](https://github.com/bubkoo/html-to-image)窗口内容
- 当前焦点窗口指示
- 搜索菜单(含最近文件)

### 时钟

- 在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers) 中运行
  - 绘制在 [OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas) 上
- NTP 服务器时间模式([ntp.js](http://www.ntpjs.org/))
- 加载时与系统时钟同步
- 日期悬浮提示
- 日历弹窗

### 壁纸与屏保

- 动态动画壁纸([OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas)/[Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers))
  - [波浪](https://www.vantajs.com/?effect=waves)
  - [Hexells](https://znah.net/hexells/)
  - [Matrix](https://rezmason.github.io/matrix/)
  - [海岸风景](https://www.shadertoy.com/view/fstyD4)
- 通过图片/视频设置(填充、适应、拉伸、平铺、居中)
- 图片幻灯片
- [每日天文图片](https://api.nasa.gov/#apod)
- [芝加哥艺术学院](https://api.artic.edu/docs/)
- [Lorem Picsum](https://picsum.photos/)
- 自定义屏保文件支持
  - [3D 花箱](https://github.com/kevin-shannon/3D-FlowerBox)
  - [3D 迷宫](https://github.com/ibid-11962/Windows-95-3D-Maze-Screensaver)
  - [3D 管道](https://github.com/1j01/pipes)
  - [Hackers](https://github.com/sindresorhus/hackers.scr)

### URL

- 查询参数加载
  - 示例:
    - `/?url=/CREDITS.md`
    - `/?app=Browser`

# 应用 🧪

### Browser(**_.htm, .html_**)

- 加载网站(_支持 CORS_)
- 书签栏
- 网站图标支持
- 后退/前进与重新加载
- 通过地址栏进行 Google 搜索
- IPFS 协议支持
- [chrome://dino](https://github.com/wayou/t-rex-runner) 恐龙小游戏

### [Marked](https://marked.js.org/)(**_.md_**)

- Markdown 查看器

### [OpenType](https://github.com/opentypejs/opentype.js)(**_.otf, .ttf, .woff_**)

- 字体预览与字形查看

### [PDF](https://mozilla.github.io/pdf.js/)(**_.pdf_**)

- 渲染/打印 PDF
- 当前页码/总页数与缩放

### Photos

- [支持的格式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#supported_image_formats)
  - [HEIF](https://github.com/catdad-experiments/libheif-js)(**_.heic, .heif_**)
  - [JPEG XL](https://github.com/niutech/jxl.js)(**_.jxl_**)
  - [QOI](https://gist.github.com/nicolaslegland/f0577cb49b1e56b729a2c0fc0aa151ba)(**_.qoi_**)
  - [TIFF](https://github.com/photopea/UTIF.js)(**_.tif, .tiff_**)
- 全屏与[缩放](https://github.com/anvaka/panzoom)

### Terminal([Xterm.js](https://xtermjs.org/))

- 文件系统支持
- 自动补全与历史记录
- 管道命令
- 通过 `help` 查看命令列表
- [Git 支持](https://isomorphic-git.org/)(checkout 与 clone)
- JavaScript 运行([QuickJS](https://github.com/justjake/quickjs-emscripten))
- [WebAssembly 包管理器](https://wapm.io/)
  - 示例:`wapm cowsay moo`([#](https://wapm.io/package/cowsay))
- [天气信息](https://wttr.in/)
- FFmpeg / ImageMagick / mediainfo / SheetJS 格式转换命令
- 从开始菜单或 **_SHIFT+F10_** 启动
- Neofetch

### [Video Player](https://videojs.com/)

- [支持的格式](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Video_codecs)
- 播放 [YouTube](https://github.com/videojs/videojs-youtube) 视频/快捷方式
- 键盘快捷键(音量、快进、缩放、全屏)
- 音频与播放列表文件(**_.mp3, .m3u, .asx, .pls_**)

### [Vim](https://github.com/coolwanglu/vim.js)

- 代码/文本编辑器
- 支持所有文件类型

# 试一试 🚀

##### 环境要求

- [Node.js](https://nodejs.org/zh-cn/download)
- [Yarn](https://yarnpkg.com/)

##### 开发

```
yarn install
yarn build:prebuild
yarn dev --webpack
```

> 注意:Next.js 16 默认使用 Turbopack,而本项目包含自定义 webpack 配置,开发时需要加 `--webpack` 参数。

##### 生产构建

```
yarn install
yarn build
yarn serve
```

##### Docker

```
docker build -t daedalos .
docker run -dp 3000:3000 --rm --name daedalos daedalos
```

# 致谢

参见 [CREDITS.md](public/CREDITS.md)。

##### 备注

- 如果在 `yarn install` 期间收到 `digital envelope routines::unsupported` 错误,需要将 `NODE_OPTIONS` 设置为 `--openssl-legacy-provider`([1](https://github.com/DustinBrett/daedalOS/blob/main/Dockerfile#L3),[2](https://github.com/DustinBrett/daedalOS/blob/main/.github/workflows/main.yml#L17),[3](https://stackoverflow.com/a/69699772/5895982))
