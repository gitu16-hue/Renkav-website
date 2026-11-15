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
