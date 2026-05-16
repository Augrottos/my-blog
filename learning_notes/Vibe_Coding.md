# Learning Notes on Vibe Coding
# Vibe Coding 学习笔记

## 1. A Short Definition / 简短的定义

Vibe coding is a development paradigm coined by Andrej Karpathy in February 2025. The core idea is straightforward: you describe what you want to build in natural language, and an AI agent generates, executes, and refines the code on your behalf. As Karpathy put it, you "fully give in to the vibes, embrace exponentials, and forget that the code even exists." The developer shifts from writing every line to steering the outcome through conversation and feedback loops.

Vibe coding 这个概念由 Andrej Karpathy 于 2025 年 2 月提出。它的核心非常简单：你用自然语言描述你想要什么，AI 代理替你生成、运行、迭代代码。用 Karpathy 的原话说就是"完全交给感觉，拥抱指数曲线，甚至忘记代码的存在"。开发者的角色从亲自写每一行代码，转变为通过对话和反馈来引导最终结果。

A critical nuance here — one that distinguishes *real* vibe coding from everyday AI-assisted development — is that in its purest form, you don't read the diffs. You don't review every generated line. You just copy-paste error messages back into the chat without comment and let the model fix itself.Whether this extreme is a good idea depends heavily on context, which is exactly what we'll discuss in Section 3.

这里有一个关键的区分点——真正的 vibe coding 和你日常看到的 AI 辅助开发不一样——在纯粹形态下，你不会去读 diff，不会逐行审查生成出来的代码。你只是把报错信息原样粘贴回对话框，不加任何评论，让模型自己去修。这个极端做法好不好，完全取决于具体场景，这恰恰是本文第三节要深入讨论的问题。

## 2. Why Vibe Coding? / 为什么要 Vibe Coding？

I came into this debate with a pretty clear position already formed by my own experience. Here's how I think about it.

我在接触这个概念之前，其实已经用行动投过票了。以下是我的真实想法。

**Point 1: For productivity work, the equation is simple — productivity comes first.**

**第一点：日常开发中，生产力高于一切。**

Let me be brutally honest here: nobody gains deep computer science enlightenment from hand-crafting five hundred lines of frontend boilerplate. When I was building my personal blog (a project that involved Python backend wiring, frontend template stitching, and SQLite3 operations), I wasn't thinking "wow, I'm really learning something profound here." I was thinking "I want this thing to work so I can move on to the next feature." In scenarios like this — rapid prototyping, glue code, configuration scaffolding — vibe coding is not a compromise; it's the rational choice. The time you save by letting an agent generate the framework is time you can reinvest into design thinking, debugging edge cases, or studying the parts that actually need your brain.

坦率地讲：没有人会因为手搓了五百行前端样板代码而获得什么深刻的计算机科学顿悟。我在开发个人博客的时候——那个项目涉及 Python 后端的各种对接、前端模板的拼接、SQLite3 各种操作——脑子里想的从来不是"哇我学到了多么深刻的东西"，而是"快点让这个东西跑起来，我好做下一个 feature。"在这种场景下——快速原型、胶水代码、配置脚手架——vibe coding 不是一种妥协，而是理性的选择。省下来的时间，你可以投入到架构设计、边界情况调试，或者去啃那些真正需要动脑子的部分。

The blunt truth: I refuse to romanticize the act of typing thousands of lines of plumbing code. Productivity tools exist precisely so we don't have to.

说白了：我拒绝给几千行管线的键盘劳作赋予任何浪漫意义。生产力工具存在的意义，就是让你不用干这些活。

**Point 2: For fundamental learning, vibe coding is a dangerous shortcut if you let it become one.**

**第二点：在学习基础时，vibe coding 可能是个危险的捷径。**

This is where I draw a hard line. In my university coursework — data structures and algorithms, taught entirely in C — I have a strict personal policy shaped by academic integrity rules as well as common sense: I might ask an LLM to *design* an algorithm, or to explain *why* a particular data structure works the way it does, but the actual implementation and the deep understanding? Those are mine to build, line by line, with my own hands and my own brain.

这是我画下的硬边界。在学校的数据结构与算法课程（全程用 C 语言）中，受学术诚信条款和我自己的判断约束，我有一个严格的个人准则：我可以让大模型帮我 *设计* 一个算法，或者解释某个数据结构*为什么*这样工作，但真正的代码实现和深层理解，必须由我自己一行一行地写，用我自己的手和脑子来完成。

Why? Because data structures and algorithms are not boilerplate. They demand a solid mathematical foundation, genuine computer science literacy, and the kind of mental muscle that only develops through struggle. The biggest fear I have with vibe coding is not that it produces bad code — it's that it produces *working* code that I *think* I understand but actually don't. Researchers have already flagged this: students who rely too heavily on AI-generated code can demonstrate a working product but struggle to explain how it works — a gap that gets brutally exposed in technical interviews.Employers are noticing the same thing: they want engineers who can prototype fast with AI but can also repair and optimize manually when needed.

为什么？因为数据结构和算法不是样板代码。它们需要比较扎实的数学基础和计算机科学素养，以及那种只有在亲手挣扎中才能练出来的脑力肌肉。我对 vibe coding 最大的恐惧，不是它产生糟糕的代码，而是它产生*能跑通*的代码，而我*以为*自己看懂了、实际上完全没吃透。已经有人警告过这种风险：过度依赖 AI 生成代码的学生，能展示一个能跑的产品，却很难解释它怎么工作——这个差距在技术面试中会被无情地暴露出来。企业的反馈也一样：他们想要的是能用 AI 快速原型、同时也能手动修复和优化的工程师。

**Point 3: The middle path — "agent first, then understand and polish by hand."**

**第三点：中间路线——"先用 agent 搭骨架，再亲自理解并打磨。"**

If Point 1 represents my pragmatic side and Point 2 represents my cautious side, then here is the synthesis — the approach I've actually settled into. When starting a side project, I'll let the agent (in my case, deepseek-v4-pro via DeepSeek TUI) generate the entire codebase to establish a working skeleton. This gives me a running framework without hours of scaffolding drudgery. Then, I go through the parts that inevitably aren't perfect — understanding the logic, tracing the data flow, and manually refactoring where needed. The agent writes the first draft; I'm the editor who understands every sentence before publishing.

如果说第一点代表了我的务实面，第二点代表了我的审慎面，那么我实际落地的方式就是这个合题：在启动一个业余项目时，我会先让 agent（我的主力是 deepseek-v4-pro，通过 DeepSeek TUI 调用 API）把整个代码库生成出来，形成一个能跑的骨架，然后再亲自去看那些必然不够完美的部分——理解其中的逻辑，追踪数据流向，该手改的手改。Agent 写的是第一稿，但我是那个在出版前认真理解每一个句子的编辑。

This isn't a novel idea — Karpathy himself has described a layered structure where Cursor handles the frequent, local edits (his estimated ~75% of coding tasks), while Claude Code or Codex handles larger feature implementation, and a more powerful model like GPT-5 Pro is reserved for the hardest bugs and deep conceptual work.The principle is the same: match the tool to the task, and never confuse *code that runs* with *code you own*.

这个思路其实并不新鲜——Karpathy 本人也总结过一套三层结构：Cursor 负责最频繁的局部补全和修改（据他估计占编程任务的 ~75%），Claude Code/Codex 负责较大的功能块实现，GPT-5 Pro 则保留给最难啃的 bug 和深度概念性工作。背后的原则是一致的：让工具匹配任务，永远不要把"能跑的代码"和"你真正拥有的代码"混为一谈。

## 3. How to Vibe Code the Right Way? / 怎么合适地 Vibe Coding？

This section draws from both my own trial-and-error experience and the best practices emerging from the wider community. These are not abstract theories — they are rules I have arrived at after watching agents generate things that worked, things that failed, and things that looked like they worked but hid subtle problems.

这一节既来自我自己的踩坑经验，也参考了社区正在形成的最佳实践。这些不是空洞的理论——都是我在亲眼看过 agent 生成的代码如何跑通、如何翻车、如何看起来跑通了其实埋着深坑之后，真正认同的规则。

**Principle 1: Intent first. Describe the outcome, not the implementation.**

**原则一：意图先行。描述你要的结果，而不是实现方式。**

When vibe coding, you should express *what* you want, not *how* to do it. Tell the AI "I need a numbered delete flow with confirmation," not "add a for loop that iterates over the array and calls the remove function." The whole point of vibe coding is that the AI handles the how — your job is to define the what and then evaluate whether the result meets your intent.

Vibe coding 时，你应该表达*要什么*，而不是*怎么做*。告诉 AI"我需要一个带编号的删除流程，删除前有确认步骤"，而不是"加一个 for 循环遍历数组然后调用 remove 函数"。让 AI 处理"怎么做"，你的工作是定义"要什么"，然后判断结果是否符合你的意图。

A practical technique that works well: ask for a plan first, then ask for implementation. For example: "Outline the structure for a Python CLI tool that manages a SQLite database of vocabulary entries. Propose file layout and function signatures." Once you've reviewed and agreed on the plan, then say: "Great — now generate the implementation using the plan." This two-step approach surfaces assumptions and design decisions before any code is written, which saves enormous debugging time later.

一个很实用的技巧：先让 AI 出方案，再让它出代码。比如："先设计一个 Python CLI 工具的架构，功能是管理 SQLite 词汇数据库。给出文件布局和函数签名。"等你审阅并认同这个方案后，再让它照着方案生成实现。两步走的好处是，在代码被写出来之前就让设计假设浮出水面，避免后期花大量时间返工。

**Principle 2: Build in small, verifiable chunks. Never ask for the whole application at once.**

**原则二：小块验证，步步为营。不要一次要求整个应用。**

One of the most common failure modes — and I've experienced this firsthand — is dumping a massive requirement on the agent and receiving a massive, brittle codebase in return. The better approach: ask for one feature at a time. Constrain the diff. Instead of "add a bunch of features," say "implement the search function — keep the rest of the file unchanged and only return the new functions plus any changes needed in main()."

最常见的翻车方式——我亲身体验过——就是把一大坨需求一股脑扔给 agent，然后收到一大坨脆弱的代码。更好的做法是：一次只要求一个特性。限制 diff 的范围。不要说"加一堆功能"，而是说"实现搜索功能——保持文件其余部分不变，只返回新增函数和 main() 中必要的修改。"

This is what the more thoughtful practitioners call the "tight loop": ask → get → verify → refine, in rapid cycles. It's fast, but it's also structured. Each cycle produces something you can test immediately.

这就是更有经验的实践者所说的"紧密循环"：提要求 → 拿结果 → 验证 → 精化，在快速迭代中推进。它快，但它也有结构。每个循环都产生一个你能立刻测试的东西。

**Principle 3: Let errors speak for themselves. Don't interpret — just feed them back.**

**原则三：让报错自己说话。不要翻译，直接喂回去。**

When the agent's code throws an error, resist the temptation to diagnose and explain the problem in your own words. Just copy the error message and paste it back into the conversation — verbatim, without commentary. This might feel lazy, but it's actually the most reliable approach: the error message is an objective signal. Any interpretation you add risks introducing your own misunderstanding and sending the agent down the wrong debugging path.

当 agent 生成的代码报错时，不要自己去诊断然后用你自己的话解释问题。直接把报错信息复制粘贴回对话里——原样，不加评论。这个做法看起来很懒，但恰恰是最可靠的方式：报错信息是一个客观信号。你加的任何主观解释都可能引入你自己的误解，把 agent 引向错误的调试方向。

**Principle 4: Own the judgment. AI generates — you decide.**

**原则四：判断力必须握在自己手里。AI 生成，你拍板。**

This is the principle that ties everything together. Vibe coding accelerates code production, but it does not — and cannot — replace human judgment on architecture, security, maintainability, and correctness. Security researchers have identified a recurring set of anti-patterns in AI-generated code: over-specification that produces single-use solutions instead of reusable components, reinventing functionality that established libraries already handle, and a lack of deployment awareness that creates code only running on the local machine.The AI doesn't care about these things. It responds to your prompt and stops when the code appears to work. You are the one who needs to ask: will this still make sense six months from now? Will it break if the input size doubles? Is this actually secure?

这条原则是统摄一切的。Vibe coding 加速了代码产出，但它没有——也不可能——替代人在架构、安全性、可维护性和正确性上的判断力。安全研究人员已经识别出 AI 生成代码中一系列反复出现的反模式：过度指定导致一次性解决方案而非可复用组件，重复发明已有成熟库的功能，缺乏部署意识导致代码只能在本地机器上运行。AI 不在乎这些。它只响应你的 prompt，代码看起来能跑就算完事。而你，需要问的是：这段代码半年后还能被理解吗？输入量翻倍会不会崩？它真的安全吗？

This is why I insist on understanding the code my agent produces, even in productivity-focused projects. I don't need to cherish every line, but I need to know what each module does and why the data flows the way it does. Without that layer of understanding, I'm not vibing — I'm just guessing.

这也就是为什么我坚持理解 agent 产出的代码，哪怕是在生产力导向的项目里。我不需要珍惜每一行，但我需要知道每个模块在做什么、数据为什么这样流转。没有这一层理解，我就不叫 vibe coding——我只是在瞎猜。

## 4. Recommended Vibe Coding Tools / Vibe Coding 工具推荐

These recommendations reflect tools I have actually used, tools trusted by experienced developers I follow, and a few I'm keeping my eye on. They are organized roughly by the role they play in a workflow rather than in a ranked list.

以下推荐包含我实际用过的工具、我信任的资深开发者所推崇的工具，以及几个我正在观察的选手。它们按工作流中的角色来组织，不是排名。

### 4.1 Cursor — The AI-First Editor / Cursor：AI 优先的编辑器

Cursor is built on a VS Code foundation but reimagined with AI deeply integrated into every surface — inline suggestions, a context-aware chat panel, and the ability to generate or refactor files across your project. What makes it particularly suited for vibe coding is its multi-file context awareness: it doesn't just read the current file; it indexes your entire codebase so its suggestions follow your naming conventions and project structure.

Cursor 基于 VS Code 构建，但把 AI 深度融入编辑器的每一个层面——内联建议、上下文感知的聊天面板、跨文件生成和重构能力。它特别适合 vibe coding 的一个关键点是多文件上下文感知：它不止读当前文件，而是索引整个代码库，让补全建议遵循你的命名规范和项目结构。

Karpathy describes Cursor as handling roughly 75% of his coding tasks — the frequent, local edits where you highlight a block of code and request a specific modification. You signal intent through code fragments and comments, which serve as a high-bandwidth channel for communicating with the model.

Karpathy 描述 Cursor 处理了他大约 75% 的编程任务——那些最频繁、最局部的修改：高亮一段代码，请求一项具体改动。你通过代码片段和注释传达意图，这构成了和模型之间的高带宽沟通渠道。

Best for: rapid prototyping, greenfield projects, independent builders who want speed without leaving the editor.

最适合：快速原型、全新项目、想在编辑器里一站式搞定一切的独立开发者。

### 4.2 Claude Code — The Heavy-Lifting Agent / Claude Code：扛大活的主力 Agent

Claude Code is Anthropic's dedicated coding tool, launched in 2025 and rapidly gaining traction as one of the most capable AI coding agents available. Unlike Cursor, which lives inside the editor and excels at quick, local edits, Claude Code operates more like an autonomous engineering collaborator. You describe a feature or a problem in natural language, and it plans, generates, and iterates across multiple files and terminal commands — handling the kind of work that would otherwise require sustained focus across many hours.

Claude Code 是 Anthropic 推出的专用编程工具，2025 年发布后迅速成为最受关注的 AI 编程代理之一。和活在编辑器里、擅长快速局部改动的 Cursor 不同，Claude Code 更像一个自主的工程协作者。你用自然语言描述一个功能或问题，它会跨多个文件和终端命令去规划、生成、迭代——处理的正是那种原本需要数小时持续专注才能完成的工作。

Where Claude Code particularly shines is with larger functional blocks. For developers who need an entire feature — say, a REST API endpoint with database integration and error handling — this is the kind of tool that can take a well-described prompt and turn it into a working implementation across multiple files. Karpathy positions Claude Code (alongside OpenAI's Codex) as his "second layer" for implementing bigger features that are easy to specify via prompt but time-consuming to write by hand, especially in domains where the developer has less expertise (his examples include Rust and complex SQL). This is also where the "vibe" aspect feels most genuine: you operate in a "code post-scarcity" mode where code can be freely generated and discarded without the preciousness attached to handwritten work.

Claude Code 最突出的优势在于处理较大的功能块。对于需要一整个 feature 的开发者——比如一个带数据库集成和错误处理的 REST API 端点——这类工具能够把一个描述清晰的 prompt 变成跨多个文件的可运行实现。Karpathy 将 Claude Code（以及 OpenAI 的 Codex）定位为他的"第二层"，专门用于实现那些通过 prompt 容易描述但手写极其耗时的大功能，尤其是在开发者不太熟悉的领域（他举的例子包括 Rust 和复杂 SQL）。这也是"vibe"感最真实的地方：你处在一种"代码后稀缺时代"的模式，代码可以随意生成和丢弃，不再像手写代码那样珍贵。

However, Claude Code is not a silver bullet. A recurring criticism from experienced users is that, without disciplined oversight, it can generate messy, bloated code — nested if-else chains where a more elegant construct would suffice, duplicated logic instead of properly extracted helper functions. This makes it a powerful accelerator, but not a replacement for code review and refactoring. The tool gets you from idea to a running prototype remarkably fast; keeping the codebase clean and maintainable remains a human responsibility.

不过，Claude Code 也不是万能药。有经验的用户反复指出一个缺点：在缺乏严格监督的情况下，它很容易生成臃肿、凌乱的代码——用层层嵌套的 if-else 替代更优雅的结构，复制粘贴逻辑而不是抽出清晰的辅助函数。这让它成为一个强大的加速器，但绝不是代码审查和重构的替代品。这个工具能让你以惊人的速度从想法走到可运行的原型；而保持代码库的整洁和可维护，依然是人的责任。

Best suited for: implementing larger features that are easy to describe but tedious to code, working in unfamiliar languages or frameworks where the AI can fill knowledge gaps, and the "build a skeleton fast" phase of new projects — provided someone is prepared to clean up afterward.

最适合：实现那些描述起来简单但手写起来繁琐的大功能，在不熟悉的语言或框架中让 AI 填补知识空白，以及新项目的"快速搭骨架"阶段——前提是有人准备好了在之后做清理工作。

### 4.3 DeepSeek TUI + API — The Self-Hosted Agent (My Daily Driver) / DeepSeek TUI + API：自托管 Agent（我的日常主力）

This one is personal. My setup uses DeepSeek TUI (an open-source terminal UI) as the frontend interface, connected to the DeepSeek API, with deepseek-v4-pro as the model driving the agent. Unlike the polished, all-in-one commercial tools above, this approach is more hands-on and configurable — but it gives me something I value: full control over the interaction loop and no lock-in to a particular editor ecosystem.

这一条很个人化。我的配置是使用 DeepSeek TUI（一个开源的终端 UI）作为前端界面，连接 DeepSeek 官方 API，底层模型是 deepseek-v4-pro。和上面那些精致的商业一体化工具不同，这个方案更手动、更可配置——但它给了我一样我很看重的东西：对交互循环的完全掌控，而且不会绑定到某个特定的编辑器生态。

Best for: developers who are comfortable with the terminal, want direct API-level control, and prefer to assemble their own workflow rather than adopting a packaged solution.

最适合：习惯终端、希望直接控制 API 层面、倾向于自己组装工作流而不是采用打包方案的开发者。

### 4.4 GitHub Copilot — The Inline Suggestion Workhorse / GitHub Copilot：内联补全的可靠老将

I use Copilot inside VS Code and Cursor for one specific purpose: inline code suggestions. Not for agent mode, not for planning — just the tab-to-accept autocomplete that reads your context and suggests the next few lines. When your function names and comments are clear, Copilot reads those signals and often predicts exactly what you need. For quick boilerplate, repetitive patterns, or finishing a function body you've already designed, it's a reliable companion that doesn't get in your way.

我在 VS Code 和 Cursor 里使用 Copilot，用途很专一：内联代码建议。不做 agent 模式，不做规划——只用 tab 接受自动补全。当你的函数名和注释写得足够清晰时，Copilot 能读取这些信号，往往精准预测你接下来要写什么。对于快速样板代码、重复模式、或者完成你已经设计好的函数体，它是一个不碍事的可靠搭档。

Best for: polyglot codebases, the "finish this function I already planned" moments, and developers who want lightweight AI assistance without handing over the driver's seat.

最适合：多语言项目、"帮我把已经设计好的函数写完"的时刻，以及想要轻量级 AI 辅助但不愿交出方向盘主导权的开发者。

### 4.5 The Karpathy Three-Layer Framework — A Tool Selection Philosophy / Karpathy 三层工具架构——一种工具选择哲学

To close this section, I want to highlight a mental model that has influenced how I think about tool selection. Karpathy organizes his AI coding tools into three layers, each mapped to a different type of task:  
在本节的结尾，我想强调一个影响我思考工具选择的原则。Karpathy将他的AI编码工具分为三层，每一层对应不同类型的任务：

    - **Layer 1 (~75% of tasks): Cursor** — tab autocomplete and small, local code modifications. The highest-frequency, lowest-friction layer.
    - **Layer 2 (~20% of tasks): Claude Code / Codex** — larger functional blocks that are easy to specify via prompt. This is where the heavy lifting happens.
    - **Layer 3 (~5% of tasks): GPT-5 Pro** — the hardest bugs, complex abstractions, and deep research/documentation support. Reserved for problems that the first two layers can't solve.

The brilliance of this framework is that it's not really about which specific tools you use — it's about recognizing that different problems demand different levels of AI involvement, and that throwing your most powerful tool at every problem is wasteful (and sometimes counterproductive). Match the tool to the task. Let the frequent, simple work flow through the fastest channel. Save the heavy artillery for the moments that truly need it.

这个框架的精妙之处在于，重点不是你具体用哪个工具——而是认识到不同的问题需要不同层级的 AI 介入，把最强的工具用在每一个问题上既浪费，有时还适得其反。让高频的简单工作走最快通道。把重武器留给真正需要它的时刻。

## Afterword / 后记

If there's one thing I want you to take away, it's this: vibe coding is a spectrum, not a binary switch. You don't have to choose between "AI writes everything and I understand nothing" and "I type every character by hand like it's 1995." The sweet spot, at least for me, is somewhere in the middle: let AI handle the scaffolding so you can focus your brain on the parts that actually grow your skills.

如果这篇笔记只能让读到这里的人带走一句话，我希望是：vibe coding 是一个光谱，不是一个开关。你不需要在"AI 包办一切而我什么都不懂"和"像 1995 年一样手敲每一个字符"之间二选一。对我来说，甜点区在中间：让 AI 处理脚手架，把你的脑子留给那些真正能让你成长的部分。

The goal isn't to type less. The goal is to think about the right things.

少打字不是目的。把思考放在正确的事情上，才是目的。