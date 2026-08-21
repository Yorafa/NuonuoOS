# 致谢

本项目 Fork 自 [DustinBrett/daedalOS](https://github.com/DustinBrett/daedalOS) 并在其基础上修改而成。

本项目得益于开源社区的诸多代码。感谢所有为这些项目做出贡献的开发者!

## 框架

- [Next.js](https://github.com/vercel/next.js) — React 全栈框架,提供路由、SSR/SSG、Turbopack 构建等
- [TypeScript](https://github.com/microsoft/TypeScript) — JavaScript 的静态类型超集,提供编译时类型检查
- [React](https://github.com/facebook/react) — UI 组件库,构建声明式用户界面
- [styled-components](https://github.com/styled-components/styled-components) — CSS-in-JS 样式方案,用标签模板字符串写组件样式

## 核心库

- [BrowserFS](https://github.com/jvilk/BrowserFS) — 浏览器端文件系统,在内存/IndexedDB 中模拟 Node.js fs API
- [Framer Motion](https://github.com/framer/motion) — React 动画库,提供声明式过渡和手势支持
- [react-rnd](https://github.com/bokuweb/react-rnd) — 可拖拽、可调整大小的 React 窗口组件

## 工具

- [Jest](https://github.com/facebook/jest) — JavaScript 测试框架,提供单元测试和快照测试
- [Playwright](https://github.com/microsoft/playwright) — 跨浏览器端到端测试框架,自动化页面交互验证
- [ESLint](https://github.com/eslint/eslint) — JavaScript/TypeScript 代码静态分析和风格检查
- [Stylelint](https://github.com/stylelint/stylelint) — CSS/SCSS 样式表静态分析和风格检查
- [Prettier](https://github.com/prettier/prettier) — 代码格式化工具,统一代码风格
- [Husky](https://github.com/typicode/husky) — Git hooks 管理工具,在 commit 前自动运行检查

## 系统库

- [7z-wasm](https://github.com/use-strict/7z-wasm) — WebAssembly 版 7z 压缩/解压库
- [ani-cursor](https://github.com/captbaritone/webamp/tree/master/packages/ani-cursor) — 解析和渲染 ANI 动画光标文件
- [codecbox.js](https://github.com/duanyao/codecbox.js) — 音视频编解码库,支持多种格式转换
- [decode-ico](https://github.com/LinusU/decode-ico) — 解析 ICO 图标文件格式
- [exif-js](https://github.com/exif-js/exif-js) — 读取图片 EXIF 元数据(相机型号、GPS 等)
- [fflate](https://github.com/101arrowz/fflate) — 高性能 zlib 压缩/解压库(gzip/zip/deflate)
- [FFmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm) — WebAssembly 版 FFmpeg,浏览器内音视频转码
- [file-type](https://github.com/sindresorhus/file-type) — 通过文件魔数检测文件 MIME 类型
- [fix-webm-duration](https://github.com/yusitnikov/fix-webm-duration) — 修复 WebM 录制文件的 duration 元数据
- [gif.js](https://github.com/jnordberg/gif.js) — 浏览器端 GIF 动画编码生成库
- [html-to-image](https://github.com/bubkoo/html-to-image) — 将 DOM 节点截图为 PNG/SVG/JPEG 图像
- [idb](https://github.com/jakearchibald/idb) — IndexedDB 的 Promise 封装库,简化数据库操作
- [ImageMagick](https://github.com/KnicKnic/WASM-ImageMagick) — WebAssembly 版图像处理工具(转换/缩放/滤镜)
- [ini](https://github.com/npm/ini) — INI 配置文件解析和序列化
- [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git) — 纯 JavaScript Git 实现,浏览器内运行 git 命令
- [jxl.js](https://github.com/niutech/jxl.js) — JPEG XL 图像格式解码器
- [libheif-js](https://github.com/catdad-experiments/libheif-js) — HEIF/HEIC 图像解码库
- [Lunr](https://github.com/olivernn/lunr.js) — 轻量级全文搜索引擎,支持中文分词和搜索
- [mediainfo.js](https://github.com/buzz/mediainfo.js) — 提取媒体文件技术信息(编码、码率、分辨率等)
- [multiformats](https://github.com/multiformats/multiformats) — 多格式编解码库(CID、multibase、multihash 等)
- [music-metadata-browser](https://github.com/Borewit/music-metadata-browser) — 解析音频文件元数据(标题、艺术家、专辑封面)
- [Panzoom](https://github.com/timmywil/panzoom) — 元素平移和缩放库,支持触摸和鼠标手势
- [playlist-parser](https://github.com/nickdesaulniers/javascript-playlist-parser) — 解析 M3U/PLS 等播放列表格式
- [QOI Decoder](https://gist.github.com/nicolaslegland/f0577cb49b1e56b729a2c0fc0aa151ba) — QOI 图像格式解码器
- [resedit](https://github.com/jet2jet/resedit-js) — 编辑 Windows PE 可执行文件的资源(图标、版本信息)
- [SheetJS](https://github.com/SheetJS/sheetjs) — Excel/CSV 电子表格文件解析和生成
- [UAParser.js](https://github.com/faisalvr/ua-parser-js) — 解析 User-Agent 字符串,识别浏览器/OS/设备
- [UTIF.js](https://github.com/photopea/UTIF.js) — TIFF 图像格式解码库
- [Wasmer](https://github.com/wasmerio/wasmer) — WebAssembly 运行时,在浏览器中执行 WASM 二进制

## 应用库

- [Marked](https://github.com/markedjs/marked) — Markdown 解析器,将 Markdown 转为 HTML
  - [DOMPurify](https://github.com/cure53/DOMPurify) — XSS 过滤库,净化 HTML 防止脚本注入
- [opentype.js](https://github.com/opentypejs/opentype.js) — OpenType/TrueType 字体解析和渲染
- [PDF.js](https://github.com/mozilla/pdf.js) — PDF 文档渲染引擎
- [Print.js](https://github.com/crabbly/print.js) — 浏览器端打印 HTML/PDF/图片
- [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten) — WebAssembly 版 QuickJS 引擎,浏览器内执行 JS 沙箱
- [t-rex-runner](https://github.com/wayou/t-rex-runner) — Chrome 离线恐龙跑酷小游戏
- [Video.js](https://github.com/videojs/video.js) — HTML5 视频播放器框架
- [CodeMirror](https://codemirror.net/) — 浏览器端代码编辑器框架
- [CodeMirror Vim](https://github.com/replit/codemirror-vim) — CodeMirror 的 Vim 键位与编辑模式支持
- [Xterm.js](https://github.com/xtermjs/xterm.js) — 终端模拟器前端组件

## 服务

- [ntp.js](http://www.ntpjs.org/) — 网络时间协议,获取服务器时间
- [allOrigins](https://allorigins.win/) — CORS 代理服务,绕过跨域限制
- [Cloudflare DoH](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/) — Cloudflare DNS-over-HTTPS 查询服务
- [Google DoH](https://developers.google.com/speed/public-dns/docs/doh) — Google DNS-over-HTTPS 查询服务
- [isomorphic-git Cors Proxy](https://github.com/isomorphic-git/cors-proxy) — Git 操作的 CORS 代理
- [IPFS Public Gateways](https://ipfs.github.io/public-gateway-checker/) — IPFS 去中心化文件系统公共网关列表
- [The Old Net](https://theoldnet.com/) — 旧版网站存档访问服务
- [Wayback Machine](https://web.archive.org/) — 互联网档案馆网页快照服务
- [Wasmer Registry](https://docs.wasmer.io/registry) — Wasmer WASM 包注册表
- [Weather Report](https://github.com/chubin/wttr.in) — wttr.in 天气预报服务