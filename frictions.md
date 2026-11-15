# Frictions

> append-only：本文档 friction 条目只追加到文档末尾，每 friction 内段落只追加到段落末尾。
> 查看/修改 此文档 前请 invoke [[friction-lifecycle]]。

## GitHub CLI OAuth Workflow Push Scope — resolved

触发：在将 CI 工作流（`.github/workflows/`）推送到远程仓库 `gitu16-hue/Renkav-website` 时，GitHub 报错：`refusing to allow an OAuth App to create or update workflow without workflow scope`。

调查：当前 GitHub CLI 认证令牌仅包含 `repo, gist, read:org` 权限，缺少写入 `.github/workflows/` 所需的 `workflow` 范围。

解决：通过软回滚重置暂存，保留应用层代码与 Flags SDK 逻辑单独提交推送；工作流文件保留在本地工作区，待用户通过 `gh auth refresh -s workflow` 增补授权后推送。

结论：主分支核心代码提交保持干净，阻断已解除。

## Three.js Canvas Alpha 与 EffectComposer 黑框遮挡 — resolved

触发：用户指出 3D 全息球周围存在明显的黑框方块背景，遮挡了 Hero 区域的暗色渐变与网格背景。

调查：深入源码分析发现 Three.js 中 `scene.fog` 设置了不透明的黑色雾气；同时 `UnrealBloomPass` 内部用于向屏幕合成全屏四边形的 `_basic` 材质默认 `transparent: false`，导致无粒子覆盖的像素全部输出 `alpha = 1.0` 的实心黑色。

解决：移除 `scene.fog`，配置 `renderer.setClearColor(0x000000, 0)`，并将 `bloomPass._basic.transparent` 与 `compositeMaterial.transparent` 显式设为 `true`。

结论：WebGL Canvas 实现真正 100% 透明背景，54,000 粒子与 4 组陀螺环完全融入网页背景。

## 3D 全息球自动认知阶段切换停滞 — resolved

触发：在移除外部模拟器状态切换按钮（Resting / Listening / Planning / Verifying）后，ELEVEN 全息球无法自动随时间切换认知阶段。

调查：状态按钮被移除后，组件外层硬编码了 `state="IDLE"`，导致内部着色器与粒子参数无法随认知阶段驱动。

解决：在 `components/network-art.tsx` 中建立自主 5.5 秒阶段轮转器（IDLE -> LISTENING -> THINKING -> VERIFYING -> EXECUTING），并通过 `IntersectionObserver` 与 `visibilitychange` 保持视口与标签页感知，仅在用户可见时驱动轮转。

结论：全息球在完全无边框、无按钮的状态下，平滑自主轮转颜色、频率与波形震荡。

## PostCSS 匿名导出引发 ESLint 告警 — resolved

触发：运行 `npm run lint` 时报出警告：`Assign object to a variable before exporting as module default (import/no-anonymous-default-export)`。

调查：`postcss.config.mjs` 中采用了直接匿名导出 `export default { plugins: { ... } }`。

解决：将其重构为命名变量赋值：`const config = { ... }; export default config;`。

结论：`npm run lint` 退出码为 0，实现 0 error 0 warning 彻底零噪音。

## 字体缩放、间距层级与动效质感提升 — resolved

触发：全站排版在大屏与移动端存在 clamp 计算不够精确、段落末行孤字（orphan）、入场动画含 filter: blur 导致重绘抗锯齿模糊以及按钮缺少物理按压反馈的问题。

调查：依据引入的 `better-typography`（Jakub Krehel）与 `improve-animations`（Emil Kowalski）设计工程规范，识别出四大优化项：
1. 入场动画 `@keyframes el-rise` 移除 `filter: blur()`，改用纯 GPU 硬件加速的 `translate3d(0, 14px, 0)` 与 `opacity`；
2. 按钮增加 `:active { transform: scale(0.982) translateY(0); }` 实现瞬时触觉反馈；卡片 `:hover` 提供微抬升与多层柔光阴影；
3. 标题与副标题引入 `text-wrap: balance`，长正文与卡片描述引入 `text-wrap: pretty` 彻底消除孤字；
4. 步骤序号、统计指标应用 `tabular-nums`，主容器与垂直节段间距采用响应式流体 clamp。

解决：在 `app/globals.css`、`app/page.tsx`、`app/ventures/page.tsx`、`app/about/page.tsx`、`app/leadership/page.tsx`、`app/contact/page.tsx`、`components/section-heading.tsx` 与 `components/cta-banner.tsx` 中全面落地上述微动效与排版规约。

结论：Typecheck、ESLint（0 告警）、Production Build、Smoke Tests（7/7 PASS）与浏览器子 Agent 视觉巡检全部 100% 通过。全站动效顺滑无卡顿，排版沉稳极简。


## 暗色模式 (Dark Mode) 对比度缺陷与主题水合闪烁 — resolved

触发：用户反馈暗色模式下存在严重对比度错误（提供 `CtaBanner` 截图：浅薄荷色背景 `#eaf2ee` 上渲染纯白色文字 `#ffffff`，对比度趋近 0:1 致全然无法阅读），并要求排查全站其他暗色模式缺陷并从 GitHub 获取官方 UI/UX 与网站构建技能。

调查：
1. 借助 `npx skills add vercel-labs/agent-skills@web-design-guidelines` 与 `nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max` 引入官方 Web Design Guidelines 与 UI/UX Pro Max 对比度规范；
2. `CtaBanner` 使用了 `bg-[#eaf2ee]`，而 CSS 内部 `.text-[#0d141e]` 被翻转为白色 `#f8faf7`，但背景缺少暗色配对，导致白字浅底；
3. 经全面排查，识别出其他潜在对比度缺陷：
   - `/privacy` 中的副标题 `text-[#12243d]`（深蓝黑）在暗色背景下对比度极低；
   - `/leadership` 中创始人姓名缩写头像圆圈 `bg-[#d9eae4]`（浅海泡绿）在暗色下文字翻转为白色导致白字浅底；
   - `/about` 中 "Our vision" 卡片 `bg-[#eef4f0]` 缺少暗色适配；
   - `/contact` 中的警示框 `bg-[#edf5f0]`、`border-[#d4e3dc]` 与 `text-[#334e59]` 未进行暗色转换；
   - `components/theme-toggle.tsx` 在 SSR 时缺少 client storage 同步，并且缺少 head 阻塞脚本，刷新时存在 FOUC（水合闪烁）。

解决：
1. 在 `app/globals.css` 中将 `.cta-banner`、`.bg-[#eaf2ee]`、`.bg-[#eef4f0]`、`.bg-[#edf5f0]` 及 `.bg-[#f8faf7]` 统一映射为 `#0c131c` / `#111823`；
2. 将 `.text-[#0d141e]`、`.text-[#12243d]` 统一映射为 `#f8faf7`；
3. 将副文本 `.text-[#566978]`、`.text-[#425a66]`、`.text-[#526477]`、`.text-[#334e59]` 统一映射为 `#9eb3be`；
4. 将细节框与头像圆圈 `.founder-avatar`、`.bg-[#d9eae4]`、`.bg-[#eef7f3]` 映射为 `#162230`；
5. 将全站 Lucide SVG 图标 `svg[stroke="#08766c"]` 与 `.text-[#08766c]` 动态翻转为 `#a2e5d0` 发光薄荷绿；
6. 在 `app/layout.tsx` 配合 CSP Nonce 注入 head 同步脚本，并在 `components/theme-toggle.tsx` 增加 `renkav-theme-change` 事件同步，彻底消除 FOUC。

结论：TypeScript Typecheck (0 error)、ESLint (0 error 0 warning)、Next.js Production Build、Smoke Suite (7/7 PASS) 与子 Agent 浏览器审查全部 100% 通过。暗色与亮色模式均满足 WCAG AA 对比度要求。
