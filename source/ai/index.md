---
title: AI 工具箱
date: 2026-05-25
comments: false
---

<style>
.ai-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:20px}
.ai-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#eee);border-radius:12px;padding:24px;transition:transform .2s,box-shadow .2s;text-decoration:none;display:block;color:var(--text-color,#333)}
.ai-card:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.ai-card h3{margin:0 0 8px;font-size:1.05rem;color:var(--theme-color,#425aef)}
.ai-card p{margin:0;font-size:.85rem;color:var(--text-meta,#999);line-height:1.5}
</style>

<div class="ai-grid">
  <a class="ai-card" href="/ai/chat/">
    <h3>💬 AI聊天网关</h3>
    <p>统一接入多个 AI 模型，支持 GPT、DeepSeek、Grok。可在国内直接使用。</p>
  </a>
  <a class="ai-card" href="javascript:void(0)">
    <h3>🧠 Ray 数字分身</h3>
    <p>基于博客文章和个人设定打造的 AI 分身，可以和"我"对话。（开发中）</p>
  </a>
  <a class="ai-card" href="/daily/">
    <h3>📰 每日日报</h3>
    <p>每天 6:00 自动采集 Hacker News、GitHub 趋势、arXiv AI 论文，AI 汇总生成简讯并发送邮件。</p>
  </a>
  <a class="ai-card" href="javascript:void(0)">
    <h3>👥 AI 圆桌会议</h3>
    <p>多个 AI 模型同时讨论同一个问题，Ray 分身担任主持人。（开发中）</p>
  </a>
</div>
