---
title: 使用指南
date: 2026-08-06
comments: false
---

<style>
/* 本页删除旁栏，正文居中 */
#aside-content { display: none !important; }
#content-inner { justify-content: center; }

.g-wrap { max-width: 760px; margin: 0 auto; }
.g-card { border: 1px solid #e5e7eb; border-radius: 14px; padding: 20px 24px; margin-bottom: 16px; background: #fff; }
[data-theme="dark"] .g-card { border-color: #374151; background: #1f2937; }
.g-card h2 { font-size: 18px; margin: 0 0 14px; color: #1f2937; display: flex; align-items: center; gap: 8px; }
[data-theme="dark"] .g-card h2 { color: #e5e7eb; }
.g-card h3 { font-size: 15px; margin: 16px 0 8px; color: #374151; }
[data-theme="dark"] .g-card h3 { color: #e5e7eb; }
.g-card p, .g-card li { font-size: 14px; color: #4b5563; line-height: 1.8; }
[data-theme="dark"] .g-card p, [data-theme="dark"] .g-card li { color: #d1d5db; }
.g-card ul { padding-left: 20px; margin: 6px 0; }
.g-hl { color: #425aef; font-weight: 600; }
.g-free { color: #059669; font-weight: 600; }
.g-note { background: #eef2ff; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #4b5563; margin-top: 12px; }
[data-theme="dark"] .g-note { background: #1e293b; color: #cbd5e1; }
.g-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px; }
.g-table th, .g-table td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
[data-theme="dark"] .g-table th, [data-theme="dark"] .g-table td { border-color: #374151; }
.g-table th { background: #f3f4f6; }
[data-theme="dark"] .g-table th { background: #374151; }
</style>

<div class="g-wrap">

<div class="g-card">
  <h2>💳 计费规则</h2>
  <p>本站采用「点数」计费：<span class="g-hl">1 元 = 1 点</span>，充值后点数进入你的账户余额。</p>

  <h3>哪些模型收费？</h3>
  <table class="g-table">
    <tr><th>模型</th><th>是否收费</th><th>说明</th></tr>
    <tr><td>GPT 系列（Sol / Terra / Luna / 5.5 / 5.4 / mini / nano）</td><td class="g-hl">按 token 扣费</td><td>按实际消耗的 token 数量实时扣除，用多少扣多少</td></tr>
    <tr><td>Grok 系列</td><td class="g-hl">按 token 扣费</td><td>同上，实时扣费</td></tr>
    <tr><td>DeepSeek / MiniMax / GLM / Qwen</td><td class="g-free">完全免费</td><td>不消耗点数</td></tr>
  </table>

  <h3>注意事项</h3>
  <ul>
    <li>使用付费模型（GPT / Grok）需要<span class="g-hl">登录账号</span>，且账户有余额</li>
    <li>每次对话的扣费金额 = 输入 token × 单价 + 输出 token × 单价，精确到 0.001 点</li>
    <li>对话过程中可看到本次累计消耗的 token 数（顶部「token：XX」）</li>
    <li>扣费明细可在 <a href="/account/" target="_blank">个人中心 → 扣费记录</a> 查看</li>
  </ul>

  <div class="g-note">💡 用量很小的对话可能只扣零点零零几，不会四舍五入多扣，按实际计算。</div>
</div>

<div class="g-card">
  <h2>💰 如何充值</h2>
  <ul>
    <li>进入 <a href="/account/" target="_blank">个人中心 → 点数充值</a></li>
    <li><span class="g-hl">支付宝</span>：实时到账，推荐使用</li>
    <li><span class="g-hl">微信</span>：扫码支付后需管理员人工确认，到账有延迟</li>
    <li><span class="g-hl">兑换码</span>：使用购买或获得的兑换码兑换点数</li>
  </ul>
</div>

<div class="g-card">
  <h2>🚀 AI 聊天能做什么</h2>
  <ul>
    <li><span class="g-hl">多模型对话</span>：GPT / Grok 系列（付费）+ DeepSeek / MiniMax / GLM / Qwen（免费），在顶部切换模型</li>
    <li><span class="g-hl">文件上传</span>：代码/文本直接发给 AI，PDF/Word/PPT/Excel 自动转换，图片支持多模态分析</li>
    <li><span class="g-hl">对话保存与历史</span>：登录后点「保存」，下次从「历史」中继续之前的对话</li>
    <li><span class="g-hl">导出 Markdown</span>：一键把整个对话导出为 .md 文件</li>
    <li><span class="g-hl">Token 用量显示</span>：顶部实时显示本次对话累计消耗的 token 数</li>
    <li><span class="g-hl">模型定价参考</span>：旁栏「模型定价」卡片展示各模型输入/输出的点数</li>
  </ul>
</div>

<div class="g-card">
  <h2>❓ 常见问题</h2>
  <ul>
    <li><b>为什么 GPT / Grok 需要登录？</b> 这两个模型按 token 计费，需要登录你的账户才能扣费</li>
    <li><b>余额不足怎么办？</b> 到个人中心充值后即可继续；免费模型（DeepSeek 等）不受影响，可以一直用</li>
    <li><b>怎么查看扣了多少点？</b> 顶部「token：XX」看本次用量；每笔扣费明细在个人中心 → 扣费记录</li>
    <li><b>文件上传支持哪些格式？</b> 代码/文本（.c/.py/.js 等）、文档（.pdf/.docx/.pptx/.xlsx）、图片（.png/.jpg 等）</li>
    <li><b>对话会保存吗？</b> 登录后手动点「保存」即可保存，之后可在「历史」里随时继续</li>
  </ul>
</div>

</div>
