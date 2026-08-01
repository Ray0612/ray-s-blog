---
title: 小工具集
date: 2026-05-14
comments: false
---

<div class="tool-grid">

<a href="/tools/text-share/" class="tool-card">
  <div class="tool-icon">📝</div>
  <div class="tool-name">文本传输助手</div>
  <div class="tool-desc">上传文字生成提取码，5分钟有效，端对端传输</div>
</a>

<a href="/tools/file-share/" class="tool-card">
  <div class="tool-icon">📁</div>
  <div class="tool-name">文件传输助手</div>
  <div class="tool-desc">邮箱发送或提取码下载，最大50MB，支持多人提取</div>
</a>

<a href="/tools/vocab/" class="tool-card">
  <div class="tool-icon">📖</div>
  <div class="tool-name">词汇记忆助手</div>
  <div class="tool-desc">四级/六级词汇记忆计划生成，三种筛词模式，导出PDF</div>
</a>

<a href="https://go.ray2.asia" target="_blank" class="tool-card">
  <div class="tool-icon">⚫</div>
  <div class="tool-name">围棋对弈</div>
  <div class="tool-desc">TinyGo 对弈 · 业余二段左右水平 · HTTPS 直连</div>
</a>

<a href="/tools/download-relay/" class="tool-card">
  <div class="tool-icon">⚡</div>
  <div class="tool-name">GitHub高速下载</div>
  <div class="tool-desc">通过 R2 中转加速 GitHub 文件下载，突破国内限速</div>
</a>

<a href="/tools/md-convert/" class="tool-card">
  <div class="tool-icon">📄</div>
  <div class="tool-name">Markdown 转换器</div>
  <div class="tool-desc">Markdown 转 Word / PDF，支持数学公式、代码块、表格</div>
</a>

</div>

<style>
.tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-top:20px}
.tool-card{display:block;padding:28px 20px;border-radius:12px;border:1px solid var(--border-color,#eee);text-align:center;text-decoration:none;transition:all .25s ease;background:var(--card-bg,#fff)}
.tool-card:hover{transform:translateY(-6px);border-color:var(--theme-color,#425aef);box-shadow:0 8px 24px rgba(66,90,239,.12)}
.tool-icon{font-size:2.2rem;margin-bottom:10px}
.tool-name{font-weight:600;color:var(--font-color,#333);font-size:1.05rem}
.tool-desc{font-size:.82rem;color:var(--card-meta,#999);margin-top:6px;line-height:1.5}
/* 暗色模式 */
[data-theme="dark"] .tool-name{color:#e5e7eb}
[data-theme="dark"] .tool-desc{color:#9ca3af}
[data-theme="dark"] .tool-card{background:var(--card-bg,#1f2937);border-color:#374151}
</style>
