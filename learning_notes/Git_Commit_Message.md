# Writing Good Git Commit Messages
# Git Commit Message 写作

## 1. Basic Commands: What You Need to Know First / 基础命令：你首先需要掌握的

Before discussing how to write a good message, there are two fundamental commands that every Git user must have under their fingers. The first is the everyday workhorse:

在讨论怎么写好 message 之前，有两个基础命令是每个 Git 用户必须烂熟于心的。第一个是日常主力：

```bash
git commit -m "Commit message"
```

This creates a new commit with the message you provide in quotes. It's fast, it's direct, and it's probably what you've been using all along. But the second command is equally important, especially when you realize — seconds or minutes after pressing Enter — that your message contains a typo, a wrong type prefix, or a description that doesn't accurately capture what you did:

这个命令用引号内的信息创建一次新提交。它快速、直接，大概也是你一直在用的方式。但第二个命令同样重要，尤其是当你按下回车后几秒或几分钟，突然意识到 message 里有拼写错误、类型前缀写错了、或者描述不够准确的时候：

```bash
git commit --amend -m "New commit message"
```

This replaces the most recent commit's message with the corrected version. A critical safety note: only do this if you haven't pushed the commit to a remote repository yet. Once a commit is pushed and others might have pulled it, amending becomes destructive — you'd be rewriting shared history, which leads to confusion and broken branches for your collaborators. Think of `--amend` as your grace period for local commits only.

这个命令会用修正后的 message 替换最近一次提交的信息。一个关键的安全提醒：只在还没有推送到远程仓库时这样做。一旦 commit 已经 push 出去、别人可能已经拉取了，amend 就变成了破坏性操作——你在改写共享的历史，会让协作者的分支乱套。把 `--amend` 理解为仅限本地提交的“反悔窗口”。

## 2. Conventional Commits: A Naming Convention You Need to Internalize / Conventional Commits：一套你需要记住的命名规范

I'll be honest — at my current stage, I can only reliably recall `feat` and `fix`. When a commit doesn't fit neatly into either bucket, I get stuck. This is exactly the problem that the Conventional Commits specification was designed to solve. The core format looks like this:

坦白说，以我目前的阶段，我只记得住 `feat` 和 `fix` 两个前缀。当某次提交没法干净地塞进这两个桶里时，我就卡住了。而这恰恰是 Conventional Commits 规范要解决的问题。它的核心格式如下：

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

The `type` field is where most of my confusion lives. Here are the commonly used types and when to apply them — written as a reference table I wish I had memorized earlier:

`type` 字段正是我困惑的集中地。以下是常用的类型及其使用场景——写成一个我但愿自己能早点背下来的参考表：
| Type       | English Description & Examples | 中文说明与示例 |
|------------|--------------------------------|----------------|
| `feat`     | A new feature — something the user can now do that they couldn't before. Examples: adding a dark mode toggle, implementing a search bar, creating a new API endpoint. If you're introducing new capability, it's a feat. | 新功能——用户现在能做之前做不了的事。例子：增加暗色模式切换、实现搜索栏、创建新的 API 端点。凡是引入了新能力，就是 feat。 |
| `fix`      | A bug fix — something that was broken and is now repaired. Examples: fixing a 404 error on a valid route, correcting a miscalculation in a billing function, repairing a broken CSS layout on mobile. The key distinction from `feat` is that nothing new is added; existing broken behavior is corrected. | 修 bug —— 之前坏了、现在修好了。例子：修了一个有效路由却返回 404 的问题、纠正了计费函数里的计算错误、修复了移动端上坏掉的 CSS 布局。和 `feat` 的关键区别在于：没有新增任何东西，只是把已有的错误行为改正了。 |
| `docs`     | Documentation changes only — README updates, code comments, API docs. If you're not touching production code, it's `docs`. | 仅文档变更——README 更新、代码注释、API 文档。没碰生产代码的，就是 docs。 |
| `style`    | Changes that don't affect the meaning of the code — formatting, missing semicolons, whitespace, linting fixes. No logic changes. | 不影响代码含义的改动——格式化、补分号、空白调整、lint 修复。不涉及逻辑变更。 |
| `refactor` | A code change that neither fixes a bug nor adds a feature — restructuring existing code without changing its external behavior. Renaming variables, extracting helper functions, simplifying control flow. If the user won't notice the difference but the code is cleaner, it's a refactor. | 既不是修 bug 也不是加功能的代码改动——在不变更外部行为的前提下重构已有代码。重命名变量、提取辅助函数、简化控制流。用户感觉不到差异但代码更干净了，就是 refactor。 |
| `perf`     | A performance improvement. Making something faster or more memory-efficient without changing its behavior. | 性能优化。让东西变快或更省内存，不改行为。 |
| `test`     | Adding or updating tests. No production code changes. | 添加或更新测试。不碰生产代码。 |
| `chore`    | Everything else that doesn't fit — updating dependencies, changing build configuration, tweaking CI/CD pipelines. If it's maintenance work that users won't perceive directly, it's a chore. | 放不进其他类型的所有杂项——更新依赖、修改构建配置、调整 CI/CD 管道。用户直接感知不到的维护工作，就是 chore。 |
| `ci`       | Changes to continuous integration configuration files and scripts — GitHub Actions workflows, Travis CI configs, etc. | 持续集成配置文件和脚本的变更——GitHub Actions 工作流、Travis CI 配置等。 |
| `build`    | Changes that affect the build system or external dependencies — Webpack config, `package.json` dependency versions, Dockerfile tweaks. | 影响构建系统或外部依赖的变更——Webpack 配置、`package.json` 中的依赖版本、Dockerfile 调整。 |

When I'm unsure whether to choose `feat` or `fix`, I now ask myself one question: "Did this change introduce something new, or did it repair something that was already supposed to work?" New capability is `feat`; repaired behavior is `fix`. When a commit does both, that's a sign the commit is too large — which brings us to the next section.

当我拿不准该用 `feat` 还是 `fix` 时，现在我会问自己一个问题：“这个改动是引入了新东西，还是修好了一个本就应该能用的功能？”新能力是 `feat`，修复已有功能是 `fix`。当一次提交两者都有，那说明这次提交太大了——这正是下一节要解决的问题。

## 3. Splitting Commits: Stop Using `git add .` as Your Only Move / 拆分提交：告别 `git add .` 一锅端

This is my most confession-worthy Git sin. My habit has been to make a bunch of unrelated changes, run `git add .`, and then stare at the staging area wondering how to summarize the mess in one message. The result is a commit that reads something like `feat: add search and fix navbar bug and update README`, which is essentially useless for anyone trying to understand the project's history — including future me.

这是我最值得忏悔的 Git 罪行。我的习惯是做了一堆互不相关的改动，跑一条 `git add .`，然后盯着暂存区发愁该怎么把这一团乱麻塞进一条 message。结果提交信息大概长这样：`feat: add search and fix navbar bug and update README`，对任何想理解项目历史的人——包括未来的我——都毫无用处。

The principle is simple and universally agreed upon: one commit should do exactly one thing. If you fixed a bug, that's one commit. If you added a feature, that's another. If you updated documentation, that's a third. The challenge is not the principle — it's knowing the commands to actually *split* your changes.

原则很简单也无可争议：一次提交只做一件事。你修了一个 bug，就是一次提交。你加了一个功能，就是另一次提交。你更新了文档，就是第三次提交。挑战不在于原则本身，而在于真正*拆分*改动的命令。

### 3.1 How to `git add` with Precision: Beyond `git add .` / 如何精准地 `git add`：不止是 `git add .`

The `git add` command is not a blunt instrument — it can be as surgical as you need it to be. Here are the patterns I'm now training myself to use. Note one key fact upfront: `git add` does not distinguish between files and directories. A path is a path. The same syntax stages a single file, a single folder, or any mix of the two.

`git add` 不是一个钝器——你可以把它用得精准如手术刀。以下是我正在训练自己使用的几种模式。先明确一个关键事实：`git add` 不区分文件和文件夹。路径就是路径，暂存单个文件、单个文件夹或者两者混搭，语法完全一样。

**Staging a single target.** When all the changes you want to commit are contained in one file or one folder, stage just that path:

**暂存单个目标。** 当你想提交的改动全部在一个文件或一个文件夹里时，只暂存那个路径：

```bash
git add src/components/Navbar.jsx
git add src/components/Lightbox/
```

**Staging multiple targets.** When your change spans several files, several folders, or a mix of both — and they all belong to the same logical commit — list them all in one command:

**暂存多个目标。** 当改动跨越几个文件、几个文件夹、或者两者混杂——并且它们都属于同一个逻辑提交——在一条命令里全部列出：

```bash
git add src/components/Navbar.jsx src/utils/authFetch.js src/styles/
```

The order doesn't matter, and mixing files with folders is completely fine. `git add` treats every argument the same way: it stages all changes found at that path, recursively for directories.

顺序无关紧要，文件与文件夹混搭也完全没问题。`git add` 对每个参数一视同仁：将该路径下的所有改动暂存，对目录则递归进行。

**Adding all changes in the current directory and its subdirectories.** Note the dot — this is the `git add .` we already know, but used deliberately:

**添加当前目录及子目录中的所有更改。** 注意那个点——这就是我们已经知道的 `git add .`，但可以有意识地使用：

```bash
git add .
```

Use this last one only when you're absolutely certain that every modification in the current directory belongs to the same logical commit. In practice, this is rare.

这最后一条只有在百分之百确定当前目录下每一个修改都属于同一个逻辑提交时才用。实际中这种情况很少见。

### 3.2 A More Advanced Splitting Technique: `git add -p` / 更专业的拆分技巧：`git add -p`

There's an even finer-grained tool that deserves mention, even if I haven't made it part of my daily habit yet. `git add -p` (patch mode) walks you through each *hunk* of changes within a file, one at a time, and asks whether you want to stage it. This means you can commit *part* of a file's changes now, and the rest in a separate commit later. For the situation where you accidentally fixed a bug and added a feature in the same file, this is the escape hatch. The command is:

还有一个更细粒度的工具值得一提，虽然我自己还没把它变成日常习惯。`git add -p`（patch 模式）会带着你逐块审查一个文件里的每一个 *hunk* 变更，并询问你是否暂存。这意味着你可以把一个文件里的*部分*改动先提交，剩下的放在另一个 commit 里。万一你不小心在同一个文件里既修了 bug 又加了功能，这就是你的逃生出口。命令如下：

```bash
git add -p
```

Git will present each hunk and offer a menu of choices: `y` to stage this hunk, `n` to skip it, `s` to split it further, and more. It takes practice, but it's the definitive answer to "how do I un-mix my changes?"

Git 会展示每个 hunk 并提供一个选择菜单：`y` 暂存当前块，`n` 跳过，`s` 继续拆分，等等。需要练习，但它是“怎么把搅在一起的改动分开”的终极答案。

### 3.3 A Recommended Workflow: Split First, Then Write, Then Commit / 推荐的工作流：先拆，再写，再提交

Instead of my old pattern — code wildly, `git add .`, struggle with the message — the disciplined workflow looks like this:

替换掉我之前的旧模式——疯狂写代码、`git add .`、跟 message 搏斗——有纪律的工作流是这样的：

1. Make your changes freely, without worrying about commit boundaries yet.
   自由地做你的改动，先不用考虑提交边界。

2. Before committing, run `git status` and `git diff` to review everything you've changed.
   提交前，运行 `git status` 和 `git diff` 审阅你改过的所有内容。

3. Mentally group the changes by logical unit: "this is the bug fix," "this is the new feature," "this is the documentation update."
   在脑子里按逻辑单元把改动分组：“这是 bug 修复”，“这是新功能”，“这是文档更新”。

4. For each group, stage precisely what belongs — using the file/directory `git add` patterns above — and commit it with a clear, single-purpose message.
   对每一组，用上面介绍的文件/目录 `git add` 模式精准暂存——然后带着一条清晰的、单一目的的信息提交。

5. Repeat until all changes are committed.
   重复直到所有改动都被提交。

This is slower than `git add .` in the moment, but it saves enormous time later when you need to understand your own history, revert a specific change, or bisect to find where a bug was introduced. The time invested in clean commits is paid back with interest during debugging and code review.

这在当下比 `git add .` 慢，但日后需要理解自己的历史、回滚特定改动、或者用 bisect 定位 bug 引入点时，会节省大量时间。为干净提交投入的时间，在调试和代码审查时会连本带利还给你。

## 4. Idiomatic Word Choice: Common Pitfalls for Native Chinese Speakers / 用词地道性：中文母语者的常见陷阱

When I don't know how to phrase a commit message, I've often resorted to translation tools or asking an LLM to write it for me. While this works in the short term, it means I never actually learn *why* one phrasing is better than another. Below is a curated table of high-frequency Chinese terms that tend to produce awkward English when translated directly, along with their more natural Git-commit equivalents. These are words I expect to encounter regularly and want to get right.

当我不知道怎么写 commit message 时，常常求助于翻译工具或者让 LLM 代劳。短期来看这能解决问题，但代价是我从未真正学会*为什么*一种表达比另一种更好。下面是一张我整理的高频中文词汇表——这些词直译成英文往往很别扭——以及它们在 Git 提交语境中更自然的对应表达。这些都是我预料自己会频繁遇到、并想用对的词。

| 中文（直译思维） | 不地道的英文（Avoid） | 地道的英文（Use Instead） | 使用场景说明 |
|---|---|---|---|
| 更新（了） | `update` | `update` 在多数语境下其实是对的，但需要注意搭配。如果说“更新了功能逻辑”，直接 `update logic` 太模糊。 | `update` is fine for docs, deps, and configs. For code behavior, be more specific: `refactor`, `fix`, `adjust`. |
| 机制 | `mechanism` | `mechanism` 在英语中偏物理/机械，写代码时用 `logic`, `system`, `handler`, `workflow` 代替。例如“重写鉴权机制” → `refactor: rewrite auth logic` | 描述一整套工作方式时用 `logic` 或 `workflow`；描述一个处理模块时用 `handler`。 |
| 逻辑 | `logic` | `logic` 本身没问题，但中文习惯说“修改某某逻辑”，直译 `modify xxx logic` 太泛。建议具体化：`simplify`, `extract`, `rework`, `fix edge case in` | 说清楚你*对逻辑做了什么*，而不只是说“改了逻辑”。 |
| 改善 / 优化 | `improve / optimize` | 这两个词本身可用，但 `optimize` 在英语里暗示做了性能提升。如果没有 benchmark 支持，谨慎使用。一般性改进用 `improve`, `refine`, `clean up`。 | `perf:` 类型的 commit 才适合用 `optimize`；代码整理用 `refactor` 或 `clean up`。 |
| 实现 / 完成 | `implement / complete` | `implement` 适合 `feat:` 类型，描述从头写一个功能。但如果只是“实现了剩下的部分”，用 `finish`, `add support for` 更自然。 | `complete` 一般不用在 message 里，因为它不传达*什么*被完成。 |
| 修改 | `modify` | `modify` 可用但过于笼统。Git 的 diff 本身就在展示修改了什么，message 应该说明*改了什么、为什么*。 | 尽量用更具体的动词：`adjust`, `rework`, `rewrite`, `fix`, `remove`, `relocate`。 |
| 新增 / 添加 | `add new` | 冗余！`add` 本身就意味着新增。`add new feature` → `feat: add feature` | “Add new” is a tautology. Just “add.” |
| 删除 / 移除 | `delete` | `delete` 偏数据库操作（DELETE），代码中更常用 `remove`。例如“移除废弃的 API” → `remove deprecated API` | 只有真的在说删除数据时才用 `delete`；否则用 `remove` 或 `drop`。 |
| 修复了一个...的 bug | `fixed a bug where...` | 这个结构可以用，但更简洁的写法是直接描述问题：`fix: crash on empty search input`，不需要 "fixed a bug where..." 的套话。 | 让 message 本身说明问题是什么，而不是声明“这是个 bug fix”。类型前缀 `fix:` 已经表明它是个修复。 |
| 调整 | `adjust` | `adjust` 可以用，但同样的原则：说明调整了*什么*以及*为什么*。`adjust navbar styling for mobile` 比 `adjust UI` 好得多。 | 适合微调（参数、样式、阈值）；大改动用 `rework` 或 `refactor`。 |
| 重构 | `refactor` | `refactor` 本身就是类型前缀，不需要在描述里再写一遍。`refactor: refactor auth module` 是冗余的。正确写法：`refactor: simplify auth module structure` | 在描述部分说清楚重构的具体动作和效果。 |
| 依赖 | `dependencies` | 更新依赖时，英文明白人习惯说 `bump` 或 `update`。`chore: bump react to 19.0.0` 或 `chore: update dependencies`。 | `bump` 是升级版本号的惯用动词，非常地道。 |

A few overarching principles I'm taking away from this table:

从这张表里我提炼出几个首要原则：

**Principle 1: Verbs should be specific.** A commit message is already a summary of change — don't make it more generic with filler verbs like "modify" or "adjust." Say what you actually did: "extract," "rewrite," "remove," "simplify," "fix crash in."

原则一：动词要具体。Commit message 本身就是改动的摘要——不要用“修改”“调整”这类填充词让它更模糊。说清你实际做了什么：“提取”“重写”“移除”“简化”“修复某某崩溃”。

**Principle 2: The prefix already signals the category.** If you write `fix:`, you don't need to also say "fixed a bug where..." in the description. The `fix:` prefix has already done that job. Let the description focus on the *what* and the *why*.

原则二：前缀已经表明类别。如果你写了 `fix:`，就不需要在描述里再说“修复了一个...的 bug”。`fix:` 前缀已经干了这活。让描述专注于*改了什么*和*为什么改*。

**Principle 3: When in doubt, make the message complete the sentence "This commit will..."** If your message reads naturally after that stem — "This commit will add search functionality to the navbar" — you're on the right track. If it doesn't, rewrite it.

原则三：不确定的时候，让 message 能够完整地接在 "This commit will..." 这个开头后面。如果你的 message 接上去很自然——“This commit will add search functionality to the navbar”——就对了。如果接不上去，重写。

## 5. Format Choices: How Detailed Should Subject, Body, and Footer Be? / 格式选择：Subject, Body, Footer 该写多细？

Not all commits need a body and footer. In fact, for small, focused changes, a single-line message using the `<type>: <description>` format is perfectly adequate. For example:

不是所有提交都需要 body 和 footer。事实上，对于小而聚焦的改动，一行 `<type>: <description>` 格式完全足够。例如：

```
feat: add image lightbox to PhotographyPage
fix: prevent navbar overlap on mobile screens
docs: update README with Docker setup instructions
```

However, when a commit is significant — introducing a complex feature, touching many files, or implementing something whose *reasoning* isn't obvious from the diff alone — you should expand the message into three parts:

然而，当一次提交比较重大——引入复杂功能、触及大量文件、或者实现的*原因*单看 diff 并不明显——就应该把 message 扩展成三部分：

```
<type>(<scope>): <short summary>

<body>
- Explain what changed and why
- Mention any side effects or important context
- Keep each line under 72 characters for readability
</body>

<footer>
- References to issues (e.g., Closes #42)
- Breaking change notes (e.g., BREAKING CHANGE: auth API now requires token in header)
</footer>
```

The `(scope)` part is optional but useful in larger projects — it tells you immediately which module or component was affected. For example: `feat(auth): add token refresh logic`, `fix(layout): resolve sidebar overflow`. In a personal project like my blog, scopes like `(auth)`, `(ui)`, `(api)` can help organize commits by area. In a monorepo or a team project, scope becomes essential.

`(scope)` 部分可选，但在较大的项目中很实用——它直接告诉你哪个模块或组件受到了影响。比如：`feat(auth): add token refresh logic`，`fix(layout): resolve sidebar overflow`。在我博客这样的个人项目中，`(auth)`、`(ui)`、`(api)` 这样的 scope 可以帮助按区域组织提交。在 monorepo 或团队项目中，scope 就变得不可或缺。

The footer is where you reference issues (`Closes #42`, `Refs #15`) and flag breaking changes. A breaking change footer looks like:

Footer 是用来引用 issue（`Closes #42`、`Refs #15`）和标记破坏性变更的地方。破坏性变更的 footer 长这样：

```
BREAKING CHANGE: the `getUser()` function now returns a Promise instead of a plain object
```

For my current stage — working primarily on solo projects — I'm aiming to consistently use the `<type>: <description>` format first. As my projects grow or when I start collaborating with others, I'll introduce body and footer where needed.

以我目前的阶段——主要在独立项目中工作——我首先追求的是统一使用 `<type>: <description>` 格式。当项目扩展或开始与别人协作时，我会在必要时引入 body 和 footer。

## 6. The Full Use of `git commit --amend`: Beyond Fixing Messages / `git commit --amend` 的完整用法：不止改 message

My understanding of `--amend` was initially limited to "fix the commit message when I typo'd it." That is indeed its most common use case, but there are two other scenarios worth knowing:

我对 `--amend` 的理解最初仅限于“message 写错了就改一下”。这确实是最常用的场景，但还有另外两个用法值得了解：

**Scenario 1: You forgot to include a file.** After committing, you realize you left out a related change — maybe a config file that should have been part of the same logical unit. Instead of creating a new commit, you can:

场景一：忘记包含某个文件。提交完才发现落下了相关改动——比如某个配置文件应该属于同一个逻辑单元。与其新建一次提交，你可以：

```bash
git add forgotten-file.js
git commit --amend --no-edit
```

The `--no-edit` flag tells Git to reuse the existing commit message without opening the editor. The file gets folded into the previous commit as if it had been there all along. Again, the same safety rule applies: only do this on local commits that haven't been pushed.

`--no-edit` 选项告诉 Git 沿用现有 message，不打开编辑器。文件就被合入了上一次提交，好像一开始就在那里一样。同样的安全规则依然适用：只对未 push 的本地提交这样做。

**Scenario 2: You want to make a small tweak to the code you just committed.** Perhaps you spotted a typo in a comment or a variable name immediately after committing. Stage the fix and amend:

场景二：刚提交完就想对代码做个小修补。也许你刚按下提交就发现注释里的一个拼写错误或者变量名问题。暂存修补内容然后 amend：

```bash
git add fixed-file.js
git commit --amend -m "feat: add search bar with debounce"
```

This replaces the entire previous commit — message and code — with the new version. The old commit is gone, replaced by the amended one. This is powerful but dangerous if misused on shared history. The golden rule: once it's pushed, don't amend it.

这会用新版本替换掉上一次提交的全部内容——message 和代码。旧的提交消失，被修正后的版本取代。这很强大，但在共享历史上滥用就会出问题。黄金法则：一旦 push 出去了，就别 amend。

## 7. Summary: The Rules I'm Setting for Myself / 总结：我给自己定下的规则

After organizing all of this, I'm walking away with a personal checklist that I intend to follow from now on. It is not about perfection — it's about being incrementally better than the `git add .` + vague message habit I'm trying to break.

整理完这些，我给自己梳理了一张从此打算遵守的清单。重点不是完美，而是比之前的 `git add .` 加模糊 message 的习惯好一点点。

1. **Before I start staging, I will run `git status` and `git diff` to review everything.** I can't split my changes if I don't know what they are.
   暂存之前，先跑 `git status` 和 `git diff` 审阅所有改动。不知道改了啥就没法拆分。

2. **I will stage selectively using file-level and directory-level `git add` commands**, not the nuclear `git add .` option.
   我会用文件和目录级别的 `git add` 命令精准暂存，而不是核武器 `git add .`。

3. **Each commit will be a single logical unit.** If I'm struggling to write the message, that's a signal the commit is too big.
   每次提交只包含一个逻辑单元。如果我写 message 写得很挣扎，那说明这次提交太大了。

4. **I will use the Conventional Commits `type:` prefix on every commit**, with the reference table in Section 2 as my guide until the types become muscle memory.
   我会在每次提交时使用 Conventional Commits 的 `type:` 前缀，以上文第二节的参考表为指南，直到这些类型成为肌肉记忆。

5. **I will check my word choice against the pitfalls table in Section 4**, especially for the high-frequency offenders like "mechanism," "modify," and "optimize."
   我会对照第四节的地道用词表检查自己的措辞，尤其是“机制”“修改”“优化”这些高频踩坑词。

6. **For significant features, I will write a body explaining the *why*.** The diff shows *what* changed; the message should explain the reasoning.
   对重要的功能，我会写 body 解释*为什么*这么做。Diff 展示了*什么*变了，message 应该解释背后的原因。

7. **I will treat `--amend` as a local-only tool and never amend pushed commits.**
   我会把 `--amend` 当作仅限本地的工具，绝不 amend 已 push 的提交。

The goal is not to write poetry in my commit history. The goal is to make sure that six months from now, when I look at a commit, I don't have to read the diff to understand what it did. The message should tell me — and tell anyone else reading the history — everything they need to know.

目标不是在提交历史里写诗。目标是确保六个月后，当我回看某次提交时，不用去读 diff 才能理解它做了什么。Message 应该告诉我——也告诉任何读历史的人——他们需要知道的一切。