# 翻墙后看什么 · 海外优质内容导航

- 站点名：翻墙后看什么
- 副标题：海外优质内容导航 / 翻墙后看什么·入门指南
- 域名：https://fanqianghou.asia

## 目录结构
- `index.html`：入口（跳转到 `cn/index.html`）
- `cn/index.html`：中文主页（6 类 × 48 条卡片，含 上手2步 / 语言 / 付费 / 标签）
- `assets/`：样式、脚本、图片
- `robots.txt`：已包含 `Disallow: /go/`
- `sitemap.xml`：已指向 `https://fanqianghou.asia`

## 部署（Cloudflare Pages）
1. 让域名使用 Cloudflare DNS（更换 Nameservers）。
2. Pages → Create project → Direct Upload → 上传本仓库 ZIP。
3. 绑定自定义域 `fanqianghou.asia`（`www` 做 301 到主域）。
4. SSL/TLS 设为 Full，开启 Always Use HTTPS。
5. 在 Search Console 提交站点与 `sitemap.xml`。

## 后续计划
- `/go/{slug}`：Cloudflare Workers 做联盟跳转（302），响应头 `X-Robots-Tag: noindex, nofollow`；页面商业链接统一 `rel="sponsored nofollow"`。
- 搜索/筛选：Fuse.js 前端搜索，按 语言/付费/标签 过滤。
- 数据抽离：将卡片转为 `assets/data/sites.json`，前端渲染，便于更新。
- 订阅中心：提供 OPML 包、YouTube/Newsletter/播客合集与导入指引。

## 合规声明
本项目仅做内容导航与入门指南，不提供或暗示任何网络访问手段。部分链接可能为赞助/联盟链接，均做 `sponsored`/`nofollow` 处理。
