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


## 字体展现动效与全站滚动显现系统缺失 — resolved

触发：用户指出网页缺乏字体展现动效（font appearance animation）以及向下滚动时的页面元素显现动效（scrolling down animation）。

调查：
1. 经审查，原 `entry-1` 至 `entry-4` 仅有 14px 微小位移，且无文字逐行显现（text reveal / masked emergence）；标题文字缺乏高品质物理动势；
2. 原 `MotionControl` 中虽然配置了 `IntersectionObserver`，但未在 CSS 中为目标元素定义初始状态（默认 `opacity: 1` 和 `transform: none`），导致用户向下滚动时所有卡片和正文已全量呈现，完全看不到滚动显现动效；
3. 且原先仅观察了极少数类名，核心原型卡片、多列步骤、发展路线卡片、常见问题、CTA Banner 及副标题均未接入。

解决：
1. **字体展现动效（Font Appearance Animation）**：
   - 引入排版级遮罩显现系统：`.font-reveal-line`（`overflow: hidden`）配合 `.font-reveal-inner`（`@keyframes font-slide-up`），实现自基线升起并具动量缓动的动效；
   - 在全站各页面 Masthead（首页、/ventures、/about、/leadership、/contact、/privacy）落地多层级时间差阶梯动效（0.05s 状态点、0.14s 标题行一、0.22s 高亮行二、0.28s 描述段、0.40s 按钮弹性进入）；
2. **滚动显现动效（Scroll-Down Reveal System）**：
   - 在 `app/globals.css` 中定义 `.scroll-reveal` 与 `.scroll-reveal.revealed`，利用 GPU 硬件加速的 `transform: translate3d(0, 28px, 0)`、`opacity` 与 Apple 级贝塞尔曲线 `cubic-bezier(0.16, 1, 0.3, 1)`；
   - 提供 `data-delay="1"` 至 `"4"` 阶梯属性，使网格卡片在滚动到视口时呈优雅序列逐一展开；
   - 重构 `components/motion-control.tsx`：利用视口初次挂载检测避免首屏空白，通过 `rootMargin: "0px 0px -40px 0px"` 确保用户向下滚动时卡片与标题平滑浮现；
   - 全面支持 `prefers-reduced-motion` 与 `data-reduce-motion="true"`，点击无障碍减弱动效时秒级降级。

结论：TypeScript Typecheck (0 error)、ESLint (0 error 0 warning)、Next.js Production Build、Smoke Tests (7/7 PASS) 与浏览器子 Agent 视口滚动审查全部 100% 验证通过。


## Microdose Studio 签名动效系统全量落地 — resolved

触发：依据对 Microdose Studio 的前端逆向工程报告，为 RENKAV / ELEVEN 注入现代高阶物理动效与动量交互系统。

调查：
1. 深入分析 Microdose Studio 的四大核心交互：
   - 英雄区可变字重临近波纹交互（Variable Font Proximity Wave）：基于 Geist Variable Font，光标悬停时字符升至 780 字重，并向左右各 3 字符呈 70%、40%、15% 衰减辐射；
   - 无限动量旋转轮播（Infinite Momentum Reel）：双组卡片无缝平移、拖拽动量惯性衰减（基于 16ms 内 0.95 衰减因子）与触控 10px 轴向锁定；
   - 滚动填充宣言（Scroll-Filled Manifesto）：字级透明度由低对比微淡过渡为高亮薄荷绿与纯白，随视口进度即时擦除/显色；
   - 深度透视 3D 悬浮倾斜（3D Depth Perspective Stage）：跟随光标位置实时计算 `rotateX/Y` 与动态反光高光；
2. 识别与解决工程卡点：
   - `scripts/smoke.mjs` 测试校验 SSR 原生文本 `html.includes("AI that helps you")`，避免在服务端渲染单字 `<span>` 切割导致测试失败，采用 SSR 原生连续文本 + 客户端水合后升级交互字跨的策略；
   - 遵循 React 19 规范，使用 `useSyncExternalStore` 接入媒体查询 `(hover: hover) and (pointer: fine)`，杜绝 `useEffect` 同步 `setState` 触发的级联重绘警告。

解决：
1. 实现 `components/interactive-hero-title.tsx`（英雄区可变字重悬停波浪动效）；
2. 实现 `components/infinite-reel.tsx`（ELEVEN 六大核心子系统无限动量轮播轨道）；
3. 实现 `components/scroll-manifesto.tsx`（全站哲学宣言滚动动态填色与进度追踪）；
4. 实现 `components/card-3d-tilt.tsx`（原型卡片与功能卡片的物理 3D 深度透视倾斜）；
5. 在 `app/globals.css` 中升级按钮内发光高光（inset highlight）与亮/暗双主题深度适配。

结论：TypeScript (0 error)、ESLint (0 error 0 warning)、Next.js Build、Smoke Suite (7/7 PASS) 与自动化浏览器子 Agent 交互巡检 100% 验证通过。

## 网站 3D 深度空间交互特性全量落地 (3D Depth Spatial Architecture Stage & Labs Spatial Lens) — resolved

触发：用户要求为网站增补完整的 3D 空间交互特性（`also add websites 3d features`）。

调查：
依据 Microdose Studio 前端逆向报告中的两大高级 3D 空间架构模式：
1. **多平面 3D 空间深度透视舞台（Depth Collage / `more-dosing-depth-collage`）**：
   - 依赖 CSS 3D 透视舞台（`perspective: 1200px; transform-style: preserve-3d`），在真实 Z 轴上布置多层独立建筑平面（Z: -120px ~ +120px）；
   - 光标移动时通过弹簧插值阻尼（lerp 0.08）实时驱动舞台物理旋转（`rotateX/rotateY`），各层因 Z 轴深度不同产生极具真实感的空间物理视差；
   - 支持视口模式切换："Exploded 3D"（最大立体爆炸分解透视）、"Isometric"（45度轴测投影）与 "Stack"（紧凑扁平层叠）；
   - 悬停任意平面可触发向前浮出（`translateZ(+45px)`）并联动更新右侧原子化遥测与加密规范面板。
2. **实验室 3D 空间透镜交互陈列室（Labs Spatial Lens / `labs-lens.min.js` & `labs-gallery`）**：
   - 建立支持动量拖拽惯性物理衰减（0.95 衰减因子）与触控 10px 轴向锁定的空间实验画布；
   - 包含 ELEVEN 六大内核实验原型卡片（本地持久化记忆、确定性加密证明、多模型仲裁、16kHz 本地 VAD、自愈 DAG 沙箱、Ring-0 治理）；
   - 点击卡片触发平滑弹簧缩放的无障碍 3D 蓝图检查弹窗（Dialog Lightbox），支持 `Escape` 键闭合与焦点回归。
3. **全站 3D 卡片触觉倾斜扩展（Card3DTilt）**：
   - 在 `/about`（愿景卡片）与 `/leadership`（创始人履历卡片）全量接入 3D 物理倾斜与光斑跟随。

解决：
1. 编写并接入 `components/depth-spatial-stage.tsx` 于 `/ventures` 页面；
2. 编写并接入 `components/labs-spatial-lens.tsx` 于首页核心原则下方；
3. 更新 `app/about/page.tsx` 与 `app/leadership/page.tsx`，以 `Card3DTilt` 封装重点卡片；
4. 更新 `app/globals.css` 完善亮暗双模式下的 3D 舞台对比度映射与 `prefers-reduced-motion` 降级支持。

结论：Typecheck (0 error)、ESLint (0 error 0 warning)、Production Build、Smoke Suite (7/7 PASS) 与自动化浏览器子 Agent 多模式 3D 视觉巡检（Exploded 3D、Isometric、Blueprint Dialog）全部 100% 验证通过。

## Made to Disrupt (madetodisrupt.com) 逆向工程与高奢暗黑重构 — resolved

触发：用户提供 `https://madetodisrupt.com/`，要求对其前端与交互架构进行完整逆向工程，并将 RENKAV 的视觉 UI/UX、动效与排版依其高奢黑曜石（Obsidian Black）暗黑美学进行深度重构，同时完整保留 RENKAV 与 ELEVEN 的内核内容。

调查：
1. 深入分析 `madetodisrupt.com` 的核心设计与动效特征：
   - **深空星尘粒子星系画布（Canvas Particle Field）**：Hero 背景采用轻量 60fps HTML5 Canvas 渲染微弱漂移与闪烁的星尘粒子；
   - **倾斜对角线动力学跑马带（Diagonal Marquee Ribbons）**：横跨视口的 `-3deg` 倾斜双层无缝跑马灯，上层高反差纯白缎带配黑色粗体大字，下层深黑黑曜石缎带配薄荷绿光芒；
   - **"OUR EDGE /" 巨幅轮廓排版与视差卡片堆叠（Sticky Feature Stacking Cards）**：背景布置超大视差空心轮廓文字，结合滚动文字动态填充；五大核心支柱卡片（Pillar 01~05）采用粘性定位（`position: sticky`），随滚动逐渐覆盖前层并附带深度阴影；
   - **极简高对比卡片容器**：采用黑曜石色调（`#000000`, `#050505`, `#0a0a0a`）、精致极细磨砂发光边缘（`1px solid rgba(255,255,255,0.1)`）与大圆角（24px~32px）。
2. 保留与兼容性核查：
   - 保证严格符合 CSP 规范与全站唯一的 `<h1>` 标签标准；
   - 保持 Next.js 16 App Router SSR 水合一致性与 `scripts/smoke.mjs` 测试（7/7 PASS）；
   - 保留 RENKAV 的全部文本、路线图以及创始人（Gitanshu Damade & Yashika Pawar）资料。

解决：
1. 编写 `components/canvas-particle-field.tsx`：实现轻量级 60fps 星尘粒子漂移与透明度呼吸动效，支持后台标签页自动休眠以节省 GPU；
2. 编写 `components/diagonal-marquee-ribbon.tsx`：实现 `-3deg` 倾斜的双层极速硬件加速无限循环跑马灯，适配 `prefers-reduced-motion`；
3. 编写 `components/sticky-feature-stack.tsx`：实现 "OUR EDGE /" 巨幅空心背景排版、滚动字级透明度擦色填充，以及 5 张渐进堆叠的 ELEVEN 黑曜石物理特性卡片；
4. 更新 `app/page.tsx`：将星尘画布、倾斜跑马灯与层叠卡片无缝整合至首页叙事骨架；
5. 更新 `app/globals.css`：注入对角线跑马灯硬件加速动画 `@keyframes marquee-fast` 与 `@keyframes marquee-reverse`。

结论：TypeScript (0 error)、ESLint (0 error 0 warning)、Turbopack 生产编译 (3.9s)、自动化端到端冒烟测试 (7/7 PASS) 与自动化浏览器子 Agent (1440x900) 视觉巡检全部 100% 验证通过。全站完美呈现 Made to Disrupt 的高奢暗黑张力与顺滑物理动效。

## Made to Disrupt 首页旋转轨道、3D 螺旋卷轴与全站一致化改造 — resolved

触发：用户反馈首页未直观看到旋转动画，并要求深入重新审查 `madetodisrupt.com` 全部页面，将相同的动画体验与设计语言统一落地到 RENKAV 所有页面（`/`, `/about`, `/ventures`, `/leadership`, `/contact`, `/privacy`）。

调查：
1. 对 `madetodisrupt.com` 进行二次深度巡检与全站点地图排查，捕获此前遗漏的核心交互：
   - **首页围绕式旋转轨道与 8 张漂浮 3D 卡片（`.poc-tilt-section` + `#pocOrbitCanvas` + `.poc-edge-img`）**：围绕核心标题布置椭圆轨道画布及 8 张围绕中心不断缓慢环绕漂浮（外加鼠标 3D 视差倾斜）的立体卡片；
   - **首屏下方滚动驱动 3D 圆柱螺旋画廊（`#ss3d`）**：利用 `230vh` 粘性容器结合圆柱三角函数（`sin/cos/rotateY`）随着滚动平滑螺旋推进并景深淡入 4 张主题体验卡；
   - **全站 `/ Menu` 全屏抽屉导航 & 滚动翻转文字按钮（`.roll-btn`） & 内页粘性胶囊导航栏（Sticky Pill Subnav）**。
2. 视觉截图 QA 自检精准捕获并解决了 3 个视觉缺陷：
   - 首帧（t=0s）渲染时 `HeroOrbitStage` 内卡片未带初始行内偏移，导致加载首帧瞬时重叠于居中标题之上 &rarr; 通过在 JSX 首屏内联写入严格椭圆轨道初始坐标彻底消除闪聚；
   - `RollButton` 的白色高亮按钮因使用 Tailwind `bg-white` 而被暗黑模式全局映射 `.bg-white { background-color: #111823 !important }` 覆写导致黑字暗底对比失效 &rarr; 切换为专用高白值 `#fafafa` 及高光边框规避全局映射；
   - 客户端路由跳转至内页后 `MotionControl` 的 `.scroll-reveal` 元素偶发保持 `opacity: 0` &rarr; 将触发范围优化至 `rootMargin: "0px 0px 120px 0px"`, `threshold: 0.01` 并附加延迟重扫及滚动兜底监听器。

解决：
1. 实现 `components/hero-orbit-stage.tsx`（椭圆星轨画布 + 8 张 3D 环绕旋转漂浮卡，并内聚核心 WebGL 全息球与文字）；
2. 实现 `components/scroll-spiral-3d.tsx`（`#ss3d` 滚动驱动 3D 螺旋圆柱旋转卡组，覆盖 ELEVEN、Vision、Team 与 Contact 四大通道）；
3. 实现 `components/roll-button.tsx` 与 `components/page-pill-nav.tsx`，并升级 `components/site-header.tsx` 增加全屏黑曜石 `/ Menu` 抽屉；
4. 全面改造 `/about`、`/ventures`、`/leadership`、`/contact`、`/privacy`，全站统一采用胶囊副导航、Canvas 星尘画布、倾斜跑马带与 3xl 黑曜石质感卡片；
5. 修复上述 3 个视觉与对比度缺陷后再次通过全链路测试验证。

结论：TypeScript (0 error)、ESLint (0 error 0 warning)、Next.js Production Build、Smoke Suite (7/7 PASS) 与浏览器子 Agent 视觉巡检全部 100% 通过。全站所有路由均已具备一致的 Made to Disrupt 旋转动画、3D 螺旋及高奢暗黑美学体验。
