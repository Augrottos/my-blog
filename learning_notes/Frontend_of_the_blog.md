# Frontend Learning Notes: Starting from My Personal Blog Project

# 前端学习笔记：从我的博客项目说起

### Project Origins and First Impressions

### 项目缘起与第一印象

My journey into modern frontend development began with a classmate's static blog, which used a Bulma 3-6-3 column layout. The clean, responsive design immediately caught my eye. When I later joined XLab that required building a blog, I decided to adopt React as the core framework — not because I deeply understood it at the time, but because it was a project requirement that pushed me out of the raw HTML-CSS-JS comfort zone. What struck me most was the joy of working with abstractions: for the first time, I wasn't writing endless boilerplate just to make a navigation bar look decent. Bulma's utility classes and React's component model wrapped away the complexity, letting me focus on the actual features. The feeling of going from "hand-crafting every div" to "composing black boxes that just work" was genuinely exhilarating — and it convinced me that modern tooling exists precisely to remove pointless friction.

我接触现代前端开发的起点，是一位同学用 Bulma 的 3-6-3 纵列布局搭建的静态博客，那个干净的响应式设计一下子吸引了我。后来我加入了XLab，项目要求搭建博客，于是选了 React 作为核心框架——并非我当时就深刻理解了它，而是项目需求把我推出了 HTML-CSS-JS 三件套的舒适区。让我最震惊的是抽象带来的快乐：我第一次不用为了一个像样的导航栏手写无数样板代码。Bulma 的工具类和 React 的组件模型把复杂性封装了起来，让我能专注于真正的功能。从“手动雕刻每一个 div”到“组装现成的黑盒”，那种顺畅感让我由衷地觉得，现代工具存在的意义就是消除毫无意义的摩擦。

### React Core: Function Components and the Single-Root Rule

### React 核心：函数组件与那条“唯一根元素”规则

All thirty components in this blog are function components. I never wrote a class component, and honestly, I never felt the need to. But the real lesson came early, in the form of a cryptic error message. I had written what I thought was perfectly fine JSX — multiple sibling elements returned from a component — and React refused to compile. The error was baffling until I asked an LLM and discovered the single-root rule: a component must return exactly one parent element. Wrapping everything in an empty fragment `<>...</>` immediately solved the problem. This was my first encounter with React's declarative constraints, and it taught me that the framework has opinions — learning them upfront saves hours of head-scratching.

博客的全部 30 个组件都是函数组件，我从未写过 class 组件，也从未觉得有必要。但真正的第一课，是以一个晦涩的报错开始的。我写了一段自以为完全正确的 JSX —— 从一个组件里返回了多个并列的元素 —— React 直接拒绝编译。那个报错让我百思不得其解，直到我问了大模型，才发现“唯一根元素”这条铁律：每个组件必须返回恰好一个父级元素。用空标签 `<></>` 把所有内容包起来，问题即刻消失。这是我第一次撞上 React 的声明式约束，它教会我一件事：框架是有脾气的，尽早了解它的规则能省下无数挠头的时间。

### Hooks in Practice: Managing State, Side Effects, and Performance

### Hooks 实战：管理状态、副作用与性能

If function components are the bones, hooks are the muscles. Almost every component in my blog leans on them.

如果说函数组件是骨架，那么 hooks 就是肌肉。博客里几乎每个组件都依赖它们。

**`useState`** is the most straightforward workhorse. I used it for toggling modals, storing form inputs, holding fetched data, and tracking loading flags. Its simplicity is deceptive: the real discipline is knowing what _deserves_ to be state and what can remain a derived variable. Early on, I tended to over-store things; over time, I learned to ask "can I compute this from existing state?" before adding another `useState`.

`useState` 是最直白的主力。我用它来开关模态框、存储表单输入、保存请求回来的数据、标记加载状态。它的简单性容易让人掉以轻心：真正的功夫在于判断什么*值得*成为状态，什么只是一个可推导的变量。早期我什么都想存进去，后来慢慢学会在加下一个 `useState` 之前问自己：“这个值能不能从已有的状态算出来？”

**`useEffect`** brought me into the world of side effects — data fetching, event listeners, timers. In the `Lightbox` component, I used it to bind and unbind keyboard listeners; in `Header`, for a 30-second polling interval to check unread messages. The most valuable pattern I picked up was the mounted flag: `let mounted = true; return () => mounted = false;`. Before learning that, I occasionally tried to update state on an unmounted component and got burned. The cleanup function in `useEffect` is not optional — it's a contract.

`useEffect` 把我带入了副作用的世界——数据请求、事件监听、定时器。在 `Lightbox` 组件里，我用它来绑定和解绑键盘监听；在 `Header` 中，用它做 30 秒轮询检查未读消息。我学到的最有价值的模式是 mounted flag：`let mounted = true; return () => mounted = false;`。在掌握这个之前，我偶尔会在已卸载的组件上更新状态，结果自然是一片狼藉。`useEffect` 的清理函数不是可选项，而是一份契约。

**`useMemo` and `useCallback`** were optimizations I reached for only when I felt the friction. In `ProfilePage`, I used `useMemo` to compute cooldown information so that the O(n) calculation wouldn't rerun on every render. In `Lightbox`, `useCallback` ensured the keyboard handler reference stayed stable, preventing unnecessary listener rebinding. These are not tools you need everywhere — they're tools you need when your UI starts to feel sluggish, or when reference stability matters for child component equality checks.

`useMemo` 和 `useCallback` 是我在真正感到卡顿后才去碰的优化手段。在 `ProfilePage` 里，我用 `useMemo` 计算冷却期信息，让 O(n) 的运算不会在每次渲染时重复执行。在 `Lightbox` 里，`useCallback` 保证键盘处理函数的引用稳定，避免无意义的监听器重新绑定。这些不是到处都需要的工具——它们是你觉得页面开始发滞、或者引用稳定性确实影响子组件比较时，才搬出来的武器。

**`useRef`** served a different purpose: reaching into the DOM when React's declarative model wasn't enough. In the `CliChatBot` terminal simulator, I used refs to focus the input field programmatically and to control scroll behavior. It's a small escape hatch, but when you need it, you're grateful it exists.

`useRef` 扮演了不同的角色：当 React 的声明式模型不够用的时候，伸手直接触碰 DOM。在 `CliChatBot` 终端模拟器里，我用 ref 来程序化地聚焦输入框、控制滚动行为。这是一个小小的逃生口，但当你真的需要它时，你会庆幸它的存在。

**`useContext`** tied everything together for the dark mode feature. I created a `ThemeContext`, wrapped the app, and exposed a `useTheme()` custom hook that any component could call. This felt like my first real architectural decision — lifting state out of the component tree and making it globally accessible without threading props through every intermediate layer.

`useContext` 把暗色模式功能串了起来。我创建了 `ThemeContext`，包裹整个应用，并暴露了一个 `useTheme()` 自定义 Hook，任何组件都能直接调用。这让我感觉像是第一次真正做了架构决策——把状态从组件树中提出来，让它全局可访问，而不用通过每一层中间组件逐级传递 props。

### Routing: The Lesson of Forgetting `Link`

### 路由设计：忘记 `Link` 的教训

The blog uses `react-router-dom` v7 with over twenty routes, including dynamic ones like `/post/:id` and `/study-notes/:id`. The pattern itself is clean: `BrowserRouter` wrapping `Routes` and `Route`, `useParams` for extracting IDs, `useNavigate` for redirecting unauthenticated users from the Profile page. But my sharpest memory from this layer is not about architecture — it's about the tiny, maddening moment when I kept getting import errors because I forgot to import `Link` from `react-router-dom`. You write `<Link to="/">Home</Link>`, it doesn't work, you stare at the screen, and then you realize you imported everything except the one component you're actually using. This happened more than once. The takeaway: when a library has a dozen named exports, don't trust your memory — check the import statement before debugging the logic.

博客使用了 `react-router-dom` v7，拥有二十多条路由，包括 `/post/:id` 和 `/study-notes/:id` 这样的动态路由。整体模式很清晰：`BrowserRouter` 套 `Routes` 和 `Route`，`useParams` 提取 ID，`useNavigate` 在用户未登录时从 Profile 页面重定向。但我关于路由层最鲜活的记忆，不是架构，而是那个微小又恼人的瞬间——我反复因为忘记从 `react-router-dom` 导入 `Link` 而报错。你写下 `<Link to="/">Home</Link>`，它不工作，你盯着屏幕，然后发现你导入了所有东西，唯独漏了正在用的那个组件。这种事不止一次发生。教训很简单：当一个库有十几个命名导出时，别信自己的记性——在调试逻辑之前，先检查 import 语句。

### State Management Strategy: Context Is Enough, but the Road Ahead Is Visible

### 状态管理策略：Context 够用，但知道远方还有路

I managed global state exclusively through React's Context API — specifically for the dark mode toggle. For everything else, local `useState` sufficed. At the time of building this blog, I didn't even know what Redux or React Query were, and honestly, I still don't feel their absence in a project of this scale. The theme context works, the components re-render appropriately, and I haven't encountered the kind of prop-drilling nightmares that would justify a heavier solution. That said, I've since become aware that tools like Zustand and Jotai offer more granular re-render control, and React Query (or SWR) could elegantly handle caching, automatic refetching, and loading states for my data-fetching components — replacing the manual `loading` / `error` / `data` tri-state pattern I wrote by hand in nearly every list component. I'm not rushing to refactor a working system, but I'm mentally bookmarking these as natural next steps when the app's complexity outgrows the simplicity of raw `useEffect` plus `useState`.

我的全局状态管理完全依靠 React 的 Context API——具体来说就是暗色模式切换。其余部分，本地 `useState` 就足够了。搭建博客那会儿，我甚至不知道 Redux 和 React Query 是什么；直到现在，在这样一个规模的项目里，我也没觉得缺了它们。主题上下文工作正常，组件重渲染的粒度也合理，我没有遭遇过那种需要 heavier 方案来拯救的 prop-drilling 地狱。不过，我已经意识到 Zustand 和 Jotai 这类库能提供更细粒度的重渲染控制，而 React Query（或 SWR）可以优雅地处理缓存、自动重刷和加载状态——取代我在几乎每个列表组件里手写的 `loading` / `error` / `data` 三态模式。我不会急于重构一个运行良好的系统，但我在心里已经把它们标记为自然的下一个台阶，等应用的复杂度确实超出手动 `useEffect` + `useState` 的能力时，随时可以登上去。

### CSS Approach: Bulma, Conflicts, and Establishing a Standard

### CSS 方案：Bulma，冲突，与统一标准

The visual foundation is Bulma, supplemented by Font Awesome icons and a good amount of custom CSS in `index.css`. Early on, however, I made a mess. I was sprinkling inline `<style>` blocks and `style={{}}` objects directly into JSX files to force-override styles — especially for dark mode. This resulted in multiple conflicting sources of truth: a global CSS variable here, an inline override there, a component-level `<style>` tag somewhere else. Debugging why a particular element stubbornly refused to turn dark was a game of CSS specificity whac-a-mole. The eventual fix was a rule I imposed on myself: no component-level CSS unless absolutely necessary; all theme-related overrides go through the `.dark-mode` class toggle in `index.css`, which works in harmony with Bulma's structure rather than fighting it. The lesson? Freedom without discipline in CSS is a fast track to chaos. A small project forgives you; a growing one won't.

视觉底层是 Bulma，辅以 Font Awesome 图标和 `index.css` 中大量自定义样式。然而早期我搞得一团糟：我在 JSX 文件里到处撒入内联 `<style>` 块和 `style={{}}` 对象，来强制覆盖样式——特别是为暗色模式。这导致了多股互相冲突的样式源头：全局 CSS 变量在这里，内联覆盖在那里，组件级 `<style>` 标签又在另一个地方。调试某个元素为什么死活不变暗，变成了一场 CSS 优先级打地鼠的游戏。最终的解决方案是我给自己立下的规矩：除非绝对必要，不在组件内写样式；所有主题相关的覆盖统一走 `index.css` 里的 `.dark-mode` class 切换，与 Bulma 的结构协同，而不是对抗。教训是什么？CSS 中不加约束的自由是通往混乱的快车道。小项目能原谅你，成长中的项目不会。

### Networking and Authentication: authFetch and the CSRF Pitfall

### 网络请求与鉴权：authFetch 和 CSRF 的坑

I wrapped the native `fetch` API into an `authFetch` utility that automatically attaches an `X-CSRF-Token` header read from a non-httponly cookie and sets `credentials: 'include'` so the httponly `access_token` cookie travels with every request. The design was solid, but the implementation had a painful chapter. After adding CSRF protection, I started seeing mysterious `Network Error` responses on several `PUT`, `POST`, and `DELETE` endpoints. The root cause was simple in hindsight: I had forgotten to add `_=Depends(verify_csrf)` to those routes in the backend. I didn't initially know which HTTP methods required CSRF protection (the safe ones, like `GET`, don't) and which didn't. After consulting documentation and an LLM, I systematically added the dependency to all mutating endpoints, and the errors vanished. This taught me something crucial about security: the frontend's CSRF token header is only half the story — the backend must explicitly enforce validation, or the token is just decorative.

我把原生 `fetch` 封装成了一个 `authFetch` 工具函数，自动从非 httponly 的 cookie 中读取 `X-CSRF-Token` 并附加到请求头，同时设置 `credentials: 'include'`，让 httponly 的 `access_token` cookie 随每个请求自动携带。设计是合理的，但落地过程有一段痛苦的插曲。加上 CSRF 防护之后，好几个 `PUT`、`POST`、`DELETE` 端点开始报神秘的 `Network Error`。事后看原因很简单：我在后端那些路由上忘了加 `_=Depends(verify_csrf)`。起初我根本不知道哪些 HTTP 方法需要 CSRF 保护（安全方法如 `GET` 不需要），哪些必须加。查了文档、问了大模型之后，我系统性地给所有改变状态的端点补上了依赖，错误才彻底消失。这件事教给我关于安全的重要一课：前端的 CSRF token 头部只是半程，后端必须显式执行校验，否则这个 token 纯粹是装饰品。

### Security Practices: XSS, CSRF, and External Links

### 安全实践：XSS、CSRF 与外部链接

Beyond the CSRF mechanism, I applied `DOMPurify.sanitize()` to any user-generated HTML content (like article bodies) to prevent XSS attacks, and all external links carry `target="_blank" rel="noopener noreferrer"` to avoid tab-napping vulnerabilities. These are standard measures, but the CSRF debugging experience above made them feel less like checklist items and more like earned paranoia.

除了 CSRF 机制，我对任何用户生成的 HTML 内容（比如文章正文）都使用了 `DOMPurify.sanitize()` 来防 XSS，所有外部链接都带 `target="_blank" rel="noopener noreferrer"` 来防止 tab-napping。这些都属于常规操作，但经历过 CSRF 调试的洗礼之后，它们不再是清单上的待办项，而更像是用亲身疼痛换来的警觉。

### Component Design Patterns: Extracting the Lightbox and Making Peace with Mess

### 组件设计模式：灯箱的抽离与屎山的默许

One of my proudest moments was the `Lightbox` component. Initially, the image preview logic lived inside `PhotographyPage.jsx` — it worked, but it was tangled. When I needed the same lightbox behavior on other pages, an LLM suggested extracting it into a standalone `Lightbox.jsx`. That suggestion clicked something in my brain: a component isn't just about reuse — it's about _separation of concerns_. The page should care about which images to display; the lightbox should care about how to display them in fullscreen, handle keyboard navigation, and close itself. Extracting it felt like my first real act of software design.

我最得意的时刻之一是 `Lightbox` 组件。最初，图片预览逻辑是写在 `PhotographyPage.jsx` 里的——能跑，但缠在一起。当其他页面也需要同样的灯箱行为时，大模型建议我把它抽成一个独立的 `Lightbox.jsx`。这个建议在我脑子里点亮了某种东西：组件不只是为了复用，更是为了*关注点分离*。页面应该关心展示哪些图片，灯箱应该关心如何全屏展示、如何处理键盘导航、如何关闭自己。这次抽离让我感觉自己第一次真正做了软件设计。

On the opposite end, I admit there are corners of my codebase where components are defined haphazardly — some inside `return`, some outside, with no consistent logic other than "it felt convenient at the time." I know this is technically a mess, but I have zero intention of refactoring it. Why? Because it works. Frontend code has a special talent for growing into a functional but ugly tangle, and I've made peace with that. Stability matters more than aesthetic purity. If opening that black box to reorganize it risks introducing days of debugging for a cosmetic gain, I'll keep the box closed and move on to building something new. This isn't laziness — it's a calculated decision to protect my own productivity.

而在另一端，我承认代码库里有些角落的组件定义相当随意——有的嵌在 `return` 里面，有的在外面，没有一致的逻辑，纯粹是“当时写着顺手”。我知道这从工程角度看是一团乱麻，但我完全没有重构它们的打算。为什么？因为它能跑。前端代码有一种特殊的才能，会把自己长成一团能跑但丑陋的乱麻，而我已经与这件事和解了。稳定比美学上的纯净更重要。如果打开那个黑箱重新整理，有可能换来好几天的调试，换来的只是好看一点，那我宁愿把箱子关好，转去做新的东西。这不是懒惰，而是一种保护自己生产力的理性决策。

### Engineering Practices: The "One-Click Deployment" Moment with Docker and Nginx

### 工程化：Docker 与 Nginx 带来的“一键部署”时刻

My first real encounter with Docker happened not on this blog, but on my other project, LexiMind, which is a simple tool built by myself just about a week before my blog is started. The promise was simple: package the entire application — frontend, backend, database — into a containerized unit that could be spun up with a single command on any machine, regardless of OS. The reality delivered even more than the promise. No more starting the frontend dev server and the backend server in separate terminals; no more "it works on my machine" conversations. The Nginx configuration for SPA routing (`try_files $uri /index.html`) ensured that React's client-side routes worked correctly in production. This experience fundamentally reshaped my understanding of what "shipping software" means. It's not just about writing code that runs — it's about making sure it runs _anywhere_, with minimal ceremony. Docker and Nginx are not just devops accessories; they're part of the professional standard.

我第一次真正接触 Docker 其实不是在博客项目上，而是在 LexiMind（一个在我的博客开始搭建的一周之前搓好的一个小工具）。它的承诺很简单：把整个应用——前端、后端、数据库——打包成一个容器化单元，在任何机器、任何操作系统上一条命令就能启动。实际体验比承诺更好。不用再在不同终端里分别启动前后端，不用再解释“我这机器上是能跑的”。为 SPA 路由配置的 Nginx（`try_files $uri /index.html`）保证了 React 的客户端路由在生产环境中也能正确工作。这段经历从根本上重塑了我对“交付软件”这件事的理解。不只是写出能跑的代码，而是确保它*到处*都能跑，且启动的仪式感越少越好。Docker 和 Nginx 不只是运维的附属品，它们是专业生产的标配。

### Reflection and Outlook: TypeScript Beckons, but Why Rush to Refactor?

### 反思与展望：TypeScript 在召唤，但何必急于重构？

Looking back, this blog taught me far more than a stack of React concepts. It taught me that frameworks exist to remove drudgery, that bugs are often just gaps in my understanding of a tool's opinions, and that "good enough" is a legitimate engineering decision. Looking forward, there are several clear improvement directions on my radar. TypeScript is at the top of the list — I want the safety of static types catching shape mismatches before they become runtime errors. Introducing a lightweight state management library like Zustand could clean up some of my more tangled context usage. React Query would elegantly replace the manual loading-error-data tri-state boilerplate scattered across my list components. Adding unit tests with Vitest and React Testing Library would give me the confidence to refactor without fear. And performance optimizations like Suspense-based code splitting could make the initial load snappier. These are all real, valuable steps — but they are steps I'll take when the project demands them, not out of a compulsive need to chase "best practices" on a system that already serves its purpose well.

回头来看，这个博客教会我的远不止一摞 React 概念。它让我明白框架的存在是为了消灭枯燥劳动，bug 往往只是我对工具内在规则的理解盲区，而“足够好”本身就是一个合法的工程决策。向前看，我的雷达上已经有了几个明确的改进方向。TypeScript 排在首位——我希望静态类型能在 shape 不匹配变成运行时错误之前就抓住它们。引入一个轻量的状态管理库如 Zustand，可以清理掉我那些纠结的 context 用法。React Query 将优雅地替换我散布在各个列表组件里的手动 loading-error-data 三态样板。用 Vitest 和 React Testing Library 加上单元测试，能给我无畏重构的底气。基于 Suspense 的代码分割等性能优化，可以让首屏加载更快。这些都是真实的、有价值的进阶——但它们是我在项目真正需要时才会去迈的步子，而不是出于一种追逐“最佳实践”的强迫冲动，去动一个已经很好履行了职责的系统。
