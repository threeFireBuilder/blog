# ThreeFire · 三火的博客

基于 Astro 的中文静态博客，使用 Markdown 写作，使用 GitHub Actions 发布到 GitHub Pages。

**配置的发布地址：<https://threefirebuilder.github.io/blog/>**（首次推送并开启 Pages 后生效）

## 本地运行

安装 Node.js 24，然后执行：

```bash
npm ci
npm run dev
```

打开终端打印的地址，通常是 <http://localhost:4321/blog/>。

```bash
npm run check   # 检查 Astro 和 TypeScript
npm run build   # 生成 dist/ 静态网站
npm run preview # 预览构建结果
```

## 首次发布

1. 把本项目文件提交并推送到 `threeFireBuilder/blog` 的 `main` 分支。
2. 打开 [仓库 Settings → Pages](https://github.com/threeFireBuilder/blog/settings/pages)，在 **Build and deployment → Source** 选择 **GitHub Actions**。
3. 打开 [Actions](https://github.com/threeFireBuilder/blog/actions)，如果第一次部署失败（通常因为尚未启用 Pages），重新运行 **Build and deploy blog**，或选择 **Run workflow**。
4. 等待 build、deploy 两个任务成功，访问博客地址。

此后推送到 `main` 会自动发布。Pull Request 只做检查和构建，不部署。无需添加个人 Token 或其他 Secret；工作流使用 GitHub 自动提供的 `GITHUB_TOKEN`。

如果 Actions 提示 `Get Pages site failed` 或 `Not Found`，先确认仓库中已经有 `main` 分支，再刷新 Settings → Pages 并重新选择 GitHub Actions。仅看到 Source 下拉框显示 GitHub Actions，并不能证明站点已成功创建；以工作流 deploy 成功为准。启用后重新运行失败任务即可。

如果本地尚未初始化 Git，可先执行：

```bash
git init
git symbolic-ref HEAD refs/heads/main
git remote add origin https://github.com/threeFireBuilder/blog.git
git add .
git commit -m "feat(blog): 初始化个人博客与 GitHub Pages 自动部署"
git push -u origin main
```

如果已经初始化或配置了 `origin`，跳过对应命令。推送需要你自己的 GitHub 登录权限，不要把 Token 写入仓库。

## 写一篇文章

```bash
npm run new -- my-first-post "我的第一篇文章"
```

命令会创建 `src/content/posts/my-first-post.md`，同名文件存在时不会覆盖。

```yaml
---
title: '我的第一篇文章'
description: '一两句话介绍这篇文章'
date: 2026-11-04
tags: ['Java', '学习笔记']
draft: false
---
```

在以上信息下方用 Markdown 写正文。文章页面、归档、标签和 RSS 会自动生成。

- `draft: true`：草稿，不出现在网站、RSS 和 sitemap 中（包括本地预览）。准备发布时改为 `false`。
- 日期决定文章排序，不作定时发布；未来日期且 `draft: false` 的文章也会发布。
- 文件名决定网址，建议使用英文小写和短横线，例如 `java-thread-pool.md`。
- 图片放在 `public/images/` 中，在 Markdown 使用 `![说明](/blog/images/example.png)`。
- 搜索位于归档页，匹配标题、摘要和标签。
- 默认的 `hello-world.md` 是开站示例，可以修改或删除。

## 定制博客

| 内容 | 文件 |
| --- | --- |
| 网站标题、作者、描述、GitHub 地址 | `src/config.ts` |
| 首页文案 | `src/pages/index.astro` |
| 关于页面 | `src/pages/about.astro` |
| 文章 | `src/content/posts/*.md` |
| 字体、颜色、布局 | `src/styles/global.css` |
| 站点图标 | `public/favicon.svg` |
| 域名、仓库子路径 | `astro.config.mjs` |
| 自动部署 | `.github/workflows/deploy.yml` |

当前仓库名为 `blog`，所以 `base` 必须为 `/blog`。不要直接删除这个配置，否则 GitHub Pages 上的样式和链接会失效。如果未来使用 `threeFireBuilder.github.io` 根站点仓库，需将 `base` 改为 `/`。绑定自定义域名时，需同时修改 `site`、`base` 和 GitHub Pages 的域名配置。

字体可选地从 Google Fonts 加载；网络不可用时会回退到系统中文字体。没有评论服务、访客追踪或后台数据库。

## 参考

- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [Astro 部署到 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
