---
title: AI 聊天网关
date: 2026-05-25
comments: false
---

<style>
/* 压缩页头，页面更短 */
#page-header { height: 150px !important; }
#page-header > div:not(nav) { top: 80px !important; }
#page-header #site-title { font-size: 24px !important; }

/* 容器 */
.chat-wrap { max-width: 740px; margin: 0 auto; }
.chat-box {
  border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden;
  display: flex; flex-direction: column; height: calc(100vh - 280px); min-height: 480px;
}
[data-theme="dark"] .chat-box { border-color: #374151; }

/* 顶栏 */
.chat-hd {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid #e5e7eb; flex-shrink: 0;
}
[data-theme="dark"] .chat-hd { border-color: #374151; }
.chat-hd-l { display: flex; align-items: center; gap: 10px; }
.chat-hd-l b { font-size: 15px; color: #1f2937; }
[data-theme="dark"] .chat-hd-l b { color: #e5e7eb; }
.chat-hd select {
  padding: 5px 22px 5px 8px; border-radius: 6px; border: 1px solid #d1d5db;
  font-size: 13px; background: #f3f4f6; color: #374151; outline: none;
  appearance: auto; cursor: pointer;
}
[data-theme="dark"] .chat-hd select { background: #1f2937; border-color: #374151; color: #e5e7eb; }
.chat-new {
  padding: 5px 12px; border-radius: 6px; border: 1px solid #d1d5db;
  font-size: 13px; background: #f3f4f6; color: #374151; cursor: pointer;
}
[data-theme="dark"] .chat-new { background: #1f2937; border-color: #374151; color: #e5e7eb; }
.chat-new:hover { background: #e5e7eb; }
[data-theme="dark"] .chat-new:hover { background: #374151; }
.chat-hd { gap: 8px; flex-wrap: wrap; }
.chat-hd-r { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.hist-wrap { position: relative; }
.hist-panel {
  position: absolute; right: 0; top: calc(100% + 6px); z-index: 20;
  width: 300px; max-height: 320px; overflow-y: auto;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}
[data-theme="dark"] .hist-panel { background: #1f2937; border-color: #374151; }
.hist-item { display: flex; align-items: center; gap: 8px; padding: 9px 12px; cursor: pointer; font-size: 13px; color: #374151; }
[data-theme="dark"] .hist-item { color: #e5e7eb; }
.hist-item:hover { background: #f3f4f6; }
[data-theme="dark"] .hist-item:hover { background: #374151; }
.hist-t { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hist-meta { color: #9ca3af; font-size: 11px; flex-shrink: 0; }
.hist-del { border: none; background: none; color: #ef4444; cursor: pointer; padding: 0 2px; font-size: 13px; flex-shrink: 0; }
.hist-del:hover { color: #b91c1c; }
.hist-empty { padding: 14px; text-align: center; color: #9ca3af; font-size: 13px; }
.tok-count {
  font-size: 12px; color: #9ca3af; background: #f3f4f6; border: 1px solid #e5e7eb;
  padding: 3px 8px; border-radius: 6px; font-variant-numeric: tabular-nums; white-space: nowrap;
}
[data-theme="dark"] .tok-count { background: #1f2937; border-color: #374151; color: #e5e7eb; }
#chatToast {
  position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%) translateY(10px);
  background: rgba(30,41,59,.92); color: #fff; padding: 8px 16px; border-radius: 8px;
  font-size: 13px; opacity: 0; transition: all .25s; z-index: 999; pointer-events: none;
}
#chatToast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* 消息区 */
.chat-msgs {
  flex: 1; overflow-y: auto; overflow-x: hidden; padding: 16px;
  display: flex; flex-direction: column; gap: 4px;
}
.chat-msgs::-webkit-scrollbar { width: 5px; }
.chat-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

/* 消息 */
.m-row { display: flex; gap: 10px; max-width: 88%; min-width: 0; margin-bottom: 8px; }
.m-row.mu { align-self: flex-end; flex-direction: row-reverse; }
.m-row.ma { align-self: flex-start; }

.m-av {
  width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: #fff; margin-top: 2px;
}
.m-row.mu .m-av { background: #425aef; }
.m-row.ma .m-av { background: #10b981; }
.m-row.me .m-av { background: #ef4444; }

.m-b {
  padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.6;
  white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;
  min-width: 0; max-width: 100%;
}
.m-row.mu .m-b { background: #425aef; color: #fff; border-bottom-right-radius: 4px; }
.m-row.ma .m-b { background: #f0f0f0; color: #1f2937; border-bottom-left-radius: 4px; }
[data-theme="dark"] .m-row.ma .m-b { background: #1f2937; color: #e5e7eb; }
.m-row.me .m-b { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; font-size: 13px; }
[data-theme="dark"] .m-row.me .m-b { background: #2d1a1a; color: #f87171; border-color: #7f1d1d; }
.stream-wait { color: #9ca3af; }
.stream-empty { color: #9ca3af; font-style: italic; }
.err-retry { margin-top: 8px; padding: 4px 14px; border: none; border-radius: 6px; background: #425aef; color: #fff; font-size: 12.5px; cursor: pointer; }
.err-retry:hover { opacity: 0.85; }

/* MD in bubble */
.m-b p { margin: 4px 0; }
.m-b code {
  font-size: 13px; background: rgba(0,0,0,0.07); padding: 1px 4px; border-radius: 3px;
}
[data-theme="dark"] .m-b code { background: rgba(255,255,255,0.1); }
.m-b pre {
  margin: 8px 0; background: #1e293b; color: #e2e8f0;
  border-radius: 8px; padding: 34px 12px 12px; overflow-x: auto; font-size: 13px;
  max-width: 100%;
}
.m-b pre code { background: none; padding: 0; color: inherit; }
.m-b ul, .m-b ol { padding-left: 18px; margin: 4px 0; }
.m-b h1, .m-b h2, .m-b h3 { margin: 8px 0 4px; font-weight: 600; }
.m-b h1 { font-size: 16px; } .m-b h2 { font-size: 15px; } .m-b h3 { font-size: 14px; }
.m-tag { font-size: 11px; color: #9ca3af; margin-top: 6px; padding-top: 6px; border-top: 1px solid #e5e7eb; }
[data-theme="dark"] .m-tag { border-color: #374151; color: #6b7280; }
.m-b pre { position: relative; }
.cp-btn {
  position: absolute; top: 6px; right: 8px; border: none;
  background: rgba(255,255,255,0.12); color: #cbd5e1; font-size: 11px;
  padding: 2px 8px; border-radius: 4px; cursor: pointer;
}
.cp-btn:hover { background: rgba(255,255,255,0.24); color: #fff; }
.cp-lang { position: absolute; top: 7px; left: 12px; font-size: 11px; color: #64748b; }
.m-b table { border-collapse: collapse; margin: 8px 0; font-size: 13px; width: 100%; }
.m-b th, .m-b td { border: 1px solid #d1d5db; padding: 4px 8px; text-align: left; }
[data-theme="dark"] .m-b th, [data-theme="dark"] .m-b td { border-color: #4b5563; }
.m-b th { background: #f3f4f6; font-weight: 600; }
[data-theme="dark"] .m-b th { background: #374151; }
.m-b blockquote { margin: 8px 0; padding: 4px 12px; border-left: 3px solid #425aef; color: #6b7280; }
[data-theme="dark"] .m-b blockquote { color: #9ca3af; }
.m-b hr { border: none; border-top: 1px solid #e5e7eb; margin: 10px 0; }
[data-theme="dark"] .m-b hr { border-color: #374151; }
.m-copy { display: block; margin-top: 8px; border: none; background: none; color: #9ca3af; font-size: 12px; cursor: pointer; padding: 0; }
.m-copy:hover { color: #425aef; }
.chat-guide {
  font-size: 12px; color: #9ca3af; text-decoration: none; white-space: nowrap;
  padding: 3px 0;
}
.chat-guide:hover { color: #425aef; }
.chat-topup {
  padding: 4px 12px; border-radius: 6px; font-size: 13px; text-decoration: none;
  background: #425aef; color: #fff; white-space: nowrap;
}
.chat-topup:hover { opacity: 0.85; color: #fff; }

/* 输入区 */
.chat-ft { padding: 12px 16px 14px; border-top: 1px solid #e5e7eb; flex-shrink: 0; }
[data-theme="dark"] .chat-ft { border-color: #374151; }
.chat-iw {
  display: flex; gap: 8px; align-items: flex-start;
  padding: 8px 8px 8px 14px; border-radius: 10px;
  background: #f3f4f6; border: 1px solid #d1d5db;
}
[data-theme="dark"] .chat-iw { background: #1f2937; border-color: #374151; }
.chat-iw:focus-within { border-color: #425aef; }
.chat-i {
  flex: 1; border: none; outline: none; resize: none; font-size: 14px; line-height: 1.5;
  max-height: 150px; background: transparent; color: #1f2937; padding: 2px 0; font-family: inherit;
}
[data-theme="dark"] .chat-i { color: #e5e7eb; }
.chat-i::placeholder { color: #9ca3af; }
.chat-s {
  width: 34px; height: 34px; border-radius: 8px; border: none;
  background: #425aef; color: #fff; cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  align-self: flex-end;
}
.chat-s:hover:not(:disabled) { opacity: 0.85; }
.chat-s:disabled { opacity: 0.3; cursor: not-allowed; }
.chat-s svg { width: 16px; height: 16px; }
.chat-paper{width:34px;height:34px;border-radius:8px;border:none;background:transparent;color:#9ca3af;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.chat-paper:hover{color:#425aef}
.chat-paper svg{width:17px;height:17px}
.chat-filebar{display:flex;align-items:center;gap:8px;padding:6px 10px;margin-top:8px;border-radius:8px;background:#f3f4f6;border:1px solid #e5e7eb;font-size:12px;color:#374151}
[data-theme="dark"] .chat-filebar{background:#1f2937;border-color:#374151;color:#e5e7eb}
.chat-filebar .fname{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.chat-filebar .frm{flex-shrink:0;color:#9ca3af}
.chat-filebar .fdel{cursor:pointer;color:#ef4444;flex-shrink:0;border:none;background:none;font-size:14px;padding:0}
.chat-filebar .warn{color:#d97706}
/* 打字动画 */
.typing { display: flex; gap: 4px; padding: 4px 0; }
.typing span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: t 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing-hint { margin-top: 6px; font-size: 12px; color: #9ca3af; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes t { 0%,60%,100%{opacity:.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-4px)} }

/* 空状态 */
.cempty {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; color: #9ca3af; padding: 40px; text-align: center;
}
.cempty svg { width: 44px; height: 44px; opacity: 0.4; margin-bottom: 10px; }
.cempty h3 { margin: 0 0 4px; font-size: 16px; color: #6b7280; }
.cempty p { margin: 0; font-size: 13px; }

/* 旁栏：本页只保留定价卡 */
#aside-content .card-widget { display: none !important; }
#aside-content .sticky_layout { display: none !important; }
#aside-content .card-widget.card-pricing { display: block !important; }
.card-pricing .card-content { padding: 14px 16px; }
.card-pricing .item-headline { margin-bottom: 10px; }
.card-pricing .price-note { font-size: 12px; color: #9ca3af; margin-bottom: 10px; }
.card-pricing .price-group { margin-bottom: 12px; }
.card-pricing .price-group:last-child { margin-bottom: 0; }
.card-pricing .price-fam { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.card-pricing .price-tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
.card-pricing .price-tbl th, .card-pricing .price-tbl td {
  text-align: left; padding: 4px 6px; border-bottom: 1px solid #f0f0f0;
}
[data-theme="dark"] .card-pricing .price-tbl th, [data-theme="dark"] .card-pricing .price-tbl td { border-color: #374151; }
.card-pricing .price-tbl th { color: #9ca3af; font-weight: 500; font-size: 11px; }
.card-pricing .price-tbl td { color: #374151; }
[data-theme="dark"] .card-pricing .price-tbl td { color: #e5e7eb; }
.card-pricing .price-tbl tr:last-child td { border-bottom: none; }
.card-pricing .price-tbl .num { font-variant-numeric: tabular-nums; color: #425aef; }
.card-pricing .price-tbl tr.price-hl { background: #e0e7ff; }
[data-theme="dark"] .card-pricing .price-tbl tr.price-hl { background: #1e3a5f; }
.price-guide {
  display: block; margin: 2px 0 8px; font-size: 12px; color: #425aef; text-decoration: none;
}
.price-guide:hover { text-decoration: underline; }

</style>

<div class="chat-wrap">
<div class="chat-box">
  <div class="chat-hd">
    <div class="chat-hd-l">
      <b>AI 聊天</b>
      <select id="mSel" onchange="updateSubSelect()">
        <option value="gpt">GPT · 点数</option>
        <option value="grok">Grok · 点数</option>
        <option value="deepseek">DeepSeek · 免费</option>
        <option value="minimax">MiniMax · 免费</option>
        <option value="glm">GLM · 免费</option>
        <option value="qwen">Qwen · 免费</option>
      </select>
      <select id="mSel2" style="display:none" onchange="curModel=this.value;highlightModel(curModel)"></select>
      <a class="chat-topup" href="/account/?tab=recharge" target="_blank">去充值</a>
    </div>
    <div class="chat-hd-r">
      <span id="tokCount" class="tok-count" title="本次对话 Token 消耗">token：0k</span>
      <button class="chat-new" id="exportBtn" onclick="exportMd()" title="导出当前对话为 Markdown">📄 导出</button>
      <button class="chat-new" id="saveBtn" onclick="saveConversation()" title="保存当前对话">💾 保存</button>
      <div class="hist-wrap">
        <button class="chat-new" id="histBtn" onclick="toggleHistory()" title="历史对话">📂 历史</button>
        <div class="hist-panel" id="histPanel" style="display:none"></div>
      </div>
      <button class="chat-new" onclick="newChat()">新对话</button>
      <a class="chat-guide" href="/guide/" target="_blank">第一次来这里？</a>
    </div>
  </div>
  <div class="chat-msgs" id="msgBox"></div>
  <div class="chat-ft">
    <div class="chat-filebar" id="fileBar" style="display:none"></div>
    <div class="chat-iw">
      <button class="chat-paper" id="fileBtn" onclick="document.getElementById('fileInput').click()" type="button" title="上传文件">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </button>
      <textarea class="chat-i" id="chatIn" rows="3" placeholder="输入消息..." onkeydown="onKey(event)" oninput="resizeIn(this)"></textarea>
      <button class="chat-s" id="sendBtn" onclick="sendMsg(event)" type="button" disabled>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </button>
      <input type="file" id="fileInput" style="display:none" onchange="handleFileSelect(event)">
    </div>
  </div>
</div>
</div>

<script>
var API = 'https://ai-gateway.ray2.asia/v1/chat/completions';
var MM = {gpt:'gpt-5.4-mini', deepseek:'deepseek-v4-pro', grok:'grok-4-1-fast-reasoning', minimax:'minimax-m4', glm:'glm-5.1', qwen:'qwen-3.7'};
var NAMES = {
  'gpt-5.6-sol':'GPT-5.6 Sol', 'gpt-5.6-terra':'GPT-5.6 Terra', 'gpt-5.6-luna':'GPT-5.6 Luna',
  'gpt-5.5':'GPT-5.5', 'gpt-5.4':'GPT-5.4', 'gpt-5.4-mini':'GPT-5.4 mini', 'gpt-5.4-nano':'GPT-5.4 nano',
  'deepseek-v4-pro':'DeepSeek V4 Pro', 'minimax-m4':'MiniMax M4', 'glm-5.1':'GLM 5.1', 'qwen-3.7':'Qwen 3.7',
  'grok-4-1-fast-reasoning':'Grok 4.1 Fast Reasoning', 'grok-4-1-fast':'Grok 4.1 Fast', 'grok-4-1-fast-non-reasoning':'Grok 4.1 Fast 非推理', 'grok-4-0709':'Grok-4'
};
// 各型号官方 API 成本（美元 / 1M token）
var BASE = {
  'gpt-5.6-sol': [5, 30], 'gpt-5.6-terra': [2, 12], 'gpt-5.6-luna': [0.2, 1.2],
  'gpt-5.5': [5, 30], 'gpt-5.4': [2.5, 15], 'gpt-5.4-mini': [0.75, 4.5], 'gpt-5.4-nano': [0.2, 1.25],
  'grok-4-1-fast-reasoning': [0.2, 0.5], 'grok-4-1-fast': [0.2, 0.5], 'grok-4-1-fast-non-reasoning': [0.2, 0.5], 'grok-4-0709': [3, 15]
};
var FAM = {
  gpt: ['gpt-5.6-sol','gpt-5.6-terra','gpt-5.6-luna','gpt-5.5','gpt-5.4','gpt-5.4-mini','gpt-5.4-nano'],
  grok: ['grok-4-1-fast-reasoning','grok-4-1-fast','grok-4-1-fast-non-reasoning','grok-4-0709']
};
var curModel = 'gpt-5.4-mini';
function updateSubSelect() {
  var mk = mSel.value;
  var sub = document.getElementById('mSel2');
  if (FAM[mk]) {
    sub.style.display = '';
    sub.innerHTML = FAM[mk].map(function(id){ return '<option value="'+id+'">'+(NAMES[id]||id)+'</option>'; }).join('');
    sub.value = MM[mk] || FAM[mk][0];
    curModel = sub.value;
    highlightModel(curModel);
  } else {
    sub.style.display = 'none';
    curModel = MM[mk];
    highlightModel(curModel);
  }
}

// 旁栏定价卡：价格 = BASE(美元) × 汇率 × 倍率
function fmtPt(v) { return v >= 0.001 ? String(Math.round(v * 1000) / 1000) : String(Math.round(v * 100000) / 100000); }
function renderPriceCard(rate, mul) {
  var aside = document.querySelector('#aside-content');
  if (!aside || aside.querySelector('.card-pricing')) return;
  var html = '<div class="card-widget card-pricing"><div class="card-content"><div class="item-headline"><i class="fas fa-coins"></i><span>模型定价</span></div>' +
    '<a class="price-guide" href="/ai/model-guide/" target="_blank">🤔 模型选择困难症？</a>' +
    '<div class="price-note">输入 / 输出（点数 · 1k token）</div>';
  Object.keys(FAM).forEach(function (fam) {
    html += '<div class="price-group"><div class="price-fam">' + (fam === 'gpt' ? 'GPT' : 'Grok') + '</div><table class="price-tbl"><thead><tr><th>模型</th><th>输入</th><th>输出</th></tr></thead><tbody>';
    FAM[fam].forEach(function (id) {
      var p = BASE[id];
      html += '<tr data-model="' + id + '" class="' + (id === curModel ? 'price-hl' : '') + '"><td>' + (NAMES[id] || id) + '</td><td class="num">' + fmtPt(p[0] * rate * mul / 1000) + '</td><td class="num">' + fmtPt(p[1] * rate * mul / 1000) + '</td></tr>';
    });
    html += '</tbody></table></div>';
  });
  html += '</div></div>';
  aside.insertAdjacentHTML('afterbegin', html);
  // 让聊天框高度与右侧旁栏对齐
  var box = document.querySelector('.chat-box');
  if (box) {
    var ab = aside.getBoundingClientRect().bottom;
    var bt = box.getBoundingClientRect().top;
    var target = Math.round(ab - bt - 12);
    if (target > 480) box.style.height = target + 'px';
  }
}
function highlightModel(id) {
  var rows = document.querySelectorAll('#aside-content .card-pricing .price-tbl tr[data-model]');
  if (!rows.length) return;
  rows.forEach(function(r){ r.classList.toggle('price-hl', r.getAttribute('data-model') === id); });
}
fetch('https://ai-gateway.ray2.asia/config').then(function(r){ return r.json(); }).then(function(d){
  if (d && d.ok) renderPriceCard(parseFloat(d.rate) || 7, parseFloat(d.multiplier) || 1.4);
}).catch(function(){ renderPriceCard(7, 1.4); });

var messages = [];
var busy = false;

var msgBox = document.getElementById('msgBox');
var chatIn = document.getElementById('chatIn');
var sendBtn = document.getElementById('sendBtn');
var mSel = document.getElementById('mSel');
updateSubSelect();

// ===== 对话保存 / 历史 =====
var API_BASE = 'https://ai-gateway.ray2.asia';
var convId = null;
var usedTokens = 0;
function updateTokDisplay() {
  var el = document.getElementById('tokCount');
  if (!el) return;
  var v = usedTokens === 0 ? '0k' : (Math.round(usedTokens / 1000 * 10) / 10 || 0.1) + 'k';
  el.textContent = 'token：' + v;
}
function getToken() { return localStorage.getItem('ray_auth_token') || ''; }
function msgText(m) {
  if (m && m.display) return m.display;
  var content = (m && m.content !== undefined) ? m.content : m;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    var t = content.filter(function (c) { return c.type === 'text'; }).map(function (c) { return c.text; }).join(' ');
    return t || '[图片内容]';
  }
  return String(content || '');
}
function convTime(ms) {
  if (!ms) return '';
  var d = new Date(ms), now = new Date();
  var hm = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  return d.toDateString() === now.toDateString() ? hm : (d.getMonth() + 1) + '/' + d.getDate() + ' ' + hm;
}
var toastTimer = null;
function showToast(msg) {
  var t = document.getElementById('chatToast');
  if (!t) { t = document.createElement('div'); t.id = 'chatToast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
}
function buildExportMd() {
  if (!messages.length) return '';
  var mk = mSel.value;
  var modelName = (FAM[mk] ? NAMES[curModel] : NAMES[MM[mk]]) || MM[mk] || 'AI';
  var lines = [];
  lines.push('# AI 对话导出');
  lines.push('');
  lines.push('- 模型：' + modelName);
  lines.push('- 时间：' + new Date().toLocaleString('zh-CN'));
  lines.push('- 消息数：' + messages.length);
  lines.push('');
  lines.push('---');
  lines.push('');
  messages.forEach(function (m) {
    lines.push((m.role === 'user' ? '## 👤 你' : m.role === 'error' ? '## ⚠️ 错误' : '## 🤖 ' + modelName));
    lines.push('');
    lines.push(msgText(m));
    lines.push('');
    lines.push('---');
    lines.push('');
  });
  return lines.join('\n');
}
function exportMd() {
  if (!messages.length) { alert('当前没有可导出的对话'); return; }
  var md = buildExportMd();
  var blob = new Blob(['﻿' + md], { type: 'text/markdown;charset=utf-8' });
  var a = document.createElement('a');
  var ts = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
  a.href = URL.createObjectURL(blob);
  a.download = '对话导出_' + ts + '.md';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
}
function saveConversation() {
  if (!getToken()) { alert('请先登录后再保存对话'); return; }
  if (busy) { alert('请等待当前回复完成后再保存'); return; }
  if (!messages.length) { alert('当前没有可保存的消息'); return; }
  var title = msgText(messages[0]).slice(0, 30) || '未命名对话';
  var mk = mSel.value;
  var model = (FAM[mk] ? curModel : null) || MM[mk];
  fetch(API_BASE + '/chat/save', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }, body: JSON.stringify({ conv_id: convId, title: title, model: model, tokens: usedTokens, messages: messages }) })
    .then(function (r) { return r.json(); })
    .then(function (d) { if (d.ok) { convId = d.id; showToast('对话已保存'); } else alert(d.error || '保存失败'); })
    .catch(function () { alert('网络错误'); });
}
function toggleHistory(force) {
  var panel = document.getElementById('histPanel');
  if (!panel) return;
  if (force === false) { panel.style.display = 'none'; return; }
  if (panel.style.display === 'block') { panel.style.display = 'none'; return; }
  if (!getToken()) { alert('请先登录后查看历史对话'); return; }
  loadHistory();
}
function loadHistory() {
  fetch(API_BASE + '/chat/conversations', { headers: { 'Authorization': 'Bearer ' + getToken() } })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var panel = document.getElementById('histPanel');
      if (!panel) return;
      if (!d.ok) { panel.innerHTML = '<div class="hist-empty">' + escHtml(d.error || '加载失败') + '</div>'; panel.style.display = 'block'; return; }
      var list = d.list || [];
      if (!list.length) { panel.innerHTML = '<div class="hist-empty">暂无历史对话</div>'; panel.style.display = 'block'; return; }
      panel.innerHTML = list.map(function (c) {
        return '<div class="hist-item" onclick="openConversation(' + c.id + ')">' +
          '<span class="hist-t">' + escHtml(c.title) + '</span>' +
          '<span class="hist-meta">' + convTime(c.updated_at) + '</span>' +
          '<button class="hist-del" title="删除" onclick="event.stopPropagation();deleteConversation(' + c.id + ')">✕</button>' +
          '</div>';
      }).join('');
      panel.style.display = 'block';
    })
    .catch(function () { alert('网络错误'); });
}
function openConversation(id) {
  fetch(API_BASE + '/chat/conversations?id=' + id, { headers: { 'Authorization': 'Bearer ' + getToken() } })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d.ok) { alert(d.error || '加载失败'); return; }
      convId = d.id;
      messages = d.messages || [];
      usedTokens = d.tokens || 0;
      updateTokDisplay();
      var mdl = d.model;
      var fam = Object.keys(FAM).find(function (f) { return FAM[f].indexOf(mdl) >= 0; });
      if (fam) { mSel.value = fam; updateSubSelect(); document.getElementById('mSel2').value = mdl; curModel = mdl; highlightModel(curModel); }
      else if (mdl) {
        var f2 = Object.keys(MM).find(function (k) { return MM[k] === mdl; });
        if (f2) { mSel.value = f2; updateSubSelect(); }
        curModel = mdl;
      } else { updateSubSelect(); }
      renderAll(mdl);
      toggleHistory(false);
    })
    .catch(function () { alert('网络错误'); });
}
function deleteConversation(id) {
  if (!confirm('删除该历史对话？')) return;
  fetch(API_BASE + '/chat/conversations?id=' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + getToken() } })
    .then(function (r) { return r.json(); })
    .then(function (d) { if (d.ok) { if (convId === id) convId = null; loadHistory(); } else alert(d.error || '删除失败'); })
    .catch(function () { alert('网络错误'); });
}
function renderAll(model) {
  msgBox.innerHTML = '';
  if (!messages.length) { newChat(); return; }
  messages.forEach(function (m) { addMsg(m.role === 'assistant' ? 'ai' : m.role, msgText(m), model); });
}
if (!getToken()) {
  var sb = document.getElementById('saveBtn'), hb = document.getElementById('histBtn');
  if (sb) sb.style.display = 'none';
  if (hb) hb.style.display = 'none';
}

function resizeIn(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 150) + 'px';
  sendBtn.disabled = !el.value.trim() || busy;
}
function onKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
}

function addMsg(role, text, mk, onRetry) {
  // 移除空状态
  var empty = msgBox.querySelector('.cempty');
  if (empty) empty.remove();

  var row = document.createElement('div');
  row.className = 'm-row ' + (role === 'user' ? 'mu' : role === 'error' ? 'me' : 'ma');

  var av = document.createElement('div');
  av.className = 'm-av';
  av.textContent = role === 'user' ? 'U' : role === 'error' ? '!' : 'A';

  var b = document.createElement('div');
  b.className = 'm-b';
  if (role === 'user') {
    b.textContent = text;
  } else {
    b.innerHTML = mdRender(text);
    if (role === 'error' && onRetry) {
      var rb = document.createElement('button');
      rb.className = 'err-retry';
      rb.textContent = '重试';
      rb.onclick = function() { onRetry(); };
      b.appendChild(rb);
    }
    if (role === 'ai') {
      if (mk && (NAMES[mk] || mk)) {
        var tag = document.createElement('div');
        tag.className = 'm-tag';
        tag.textContent = NAMES[mk] || mk;
        b.appendChild(tag);
      }
      var cp = document.createElement('button');
      cp.className = 'm-copy';
      cp.textContent = '复制';
      cp.onclick = function() { copyToClipboard(text); showToast('已复制'); };
      b.appendChild(cp);
    }
  }
  row.appendChild(av);
  row.appendChild(b);
  msgBox.appendChild(row);
  msgBox.scrollTop = msgBox.scrollHeight;
}

function showTyping(mn) {
  var row = document.createElement('div');
  row.className = 'm-row ma';
  row.id = '_typing';
  var av = document.createElement('div');
  av.className = 'm-av';
  av.textContent = 'A';
  var b = document.createElement('div');
  b.className = 'm-b';
  var heavy = mn && /gpt-5\.6|deepseek-v4-pro|grok-4-1-fast-reasoning/.test(mn);
  b.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>' + (heavy ? '<div class="typing-hint">正在深度思考，推理模型可能需要 1-2 分钟…</div>' : '');
  row.appendChild(av);
  row.appendChild(b);
  msgBox.appendChild(row);
  msgBox.scrollTop = msgBox.scrollHeight;
}

// 流式：创建可增量更新的 AI 气泡
function streamAdd(mn) {
  var row = document.createElement('div');
  row.className = 'm-row ma';
  var av = document.createElement('div');
  av.className = 'm-av';
  av.textContent = 'A';
  var b = document.createElement('div');
  b.className = 'm-b';
  var md = document.createElement('div');
  md.className = 'md';
  b.appendChild(md);
  if (mn && (NAMES[mn] || mn)) {
    var tag = document.createElement('div');
    tag.className = 'm-tag';
    tag.textContent = NAMES[mn] || mn;
    b.appendChild(tag);
  }
  var cp = document.createElement('button');
  cp.className = 'm-copy';
  cp.textContent = '复制';
  b.appendChild(cp);
  row.appendChild(av);
  row.appendChild(b);
  msgBox.appendChild(row);
  msgBox.scrollTop = msgBox.scrollHeight;
  return { md: md, row: row };
}

// 流式：读取 SSE 流并逐字渲染，结束后记 token 并入库
function handleStream(r, mn) {
  var bub = streamAdd(mn);
  var md = bub.md;
  bub.row.querySelector('.m-copy').onclick = function() { copyToClipboard(full); showToast('已复制'); };
  hideTyping();
  var full = '';
  var usage = null;
  var lastRender = 0;
  var finished = false;

  function render() {
    var now = Date.now();
    if (now - lastRender < 80 && full) return;
    lastRender = now;
    md.innerHTML = full ? mdRender(full) : '<span class="stream-wait">正在生成…</span>';
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  function done() {
    if (finished) return;
    finished = true;
    md.innerHTML = full ? mdRender(full) : '<div class="stream-empty">模型未返回内容，请重试。</div>';
    msgBox.scrollTop = msgBox.scrollHeight;
    var total = usage ? (usage.total_tokens || ((usage.prompt_tokens || 0) + (usage.completion_tokens || 0))) : 0;
    if (total) { usedTokens += total; updateTokDisplay(); }
    messages.push({ role: 'assistant', content: full });
    busy = false;
    sendBtn.disabled = true;
  }

  var reader = r.body.getReader();
  var decoder = new TextDecoder();
  var buf = '';
  function pump() {
    return reader.read().then(function(res) {
      if (res.done) { done(); return; }
      buf += decoder.decode(res.value, { stream: true });
      var lines = buf.split('\n');
      buf = lines.pop();
      for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        if (s.indexOf('data:') !== 0) continue;
        var j = s.slice(5).trim();
        if (!j || j === '[DONE]') continue;
        var d;
        try { d = JSON.parse(j); } catch (e) { continue; }
        if (d.usage) usage = d.usage;
        var delta = d.choices && d.choices[0] && d.choices[0].delta;
        if (delta && delta.content) full += delta.content;
        render();
      }
      return pump();
    }).catch(function(e) {
      if (finished) return;
      finished = true;
      hideTyping();
      if (full) { md.innerHTML = mdRender(full); messages.push({ role: 'assistant', content: full }); }
      addMsg('error', '流式响应中断：' + e.message);
      busy = false;
      sendBtn.disabled = true;
    });
  }
  return pump();
}
function hideTyping() {
  var el = document.getElementById('_typing');
  if (el) el.remove();
}

var pendingFile = null;

function handleFileSelect(e) {
  var f = e.target.files[0];
  if (!f) return;
  if (f.size > 10 * 1024 * 1024) { alert('文件超过 10MB 上限，请压缩后重新上传'); return; }
  var ext = (f.name.split('.').pop() || '').toLowerCase();
  var imgExts = ['png','jpg','jpeg','gif','webp','bmp'];
  var docExts = ['pdf','docx','doc','pptx','ppt','xlsx','xls'];
  var codeExts = ['c','cpp','cc','h','hpp','py','java','js','ts','jsx','tsx','go','rs','rb','php','cs','swift','kt','html','css','json','sql','sh','bash','yaml','yml','xml','ini','toml','md','txt','vue','scss','dart','lua','r','m','pl'];
  if (imgExts.includes(ext)) {
    if (mSel.value !== 'gpt') { alert('图片分析仅支持 GPT-5.4-mini，请先在顶部切换到 GPT 模型'); return; }
    var r1 = new FileReader();
    r1.onload = function(ev) { pendingFile = { type: 'image', content: ev.target.result, name: f.name }; updateFileBar(); };
    r1.readAsDataURL(f);
  } else if (docExts.includes(ext)) {
    fetch('https://md-extract.ray2.asia/?' + encodeURIComponent(f.name), { method: 'POST', body: f })
      .then(function(r) { return r.text(); })
      .then(function(md) { pendingFile = { type: 'text', content: md, name: f.name }; updateFileBar(); })
      .catch(function() { /* 静默失败 */ });
  } else {
    var r2 = new FileReader();
    r2.onload = function(ev) { pendingFile = { type: 'text', content: ev.target.result, name: f.name }; updateFileBar(); };
    r2.readAsText(f);
  }
  e.target.value = '';
}

function updateFileBar() {
  var bar = document.getElementById('fileBar');
  if (!pendingFile) { bar.style.display = 'none'; return; }
  var label = pendingFile.type === 'image' ? '🖼️ 图片' : '📄 文件';
  var tip = '';
  if (pendingFile.type === 'text' && pendingFile.content.length > 200000) tip = '<span class="frm warn">仅发送前 200KB</span>';
  bar.innerHTML = '<span class="fname">' + escHtml(pendingFile.name) + '</span><span class="frm">' + label + '</span>' + tip + '<button class="fdel" onclick="clearFile()">✕</button>';
  bar.style.display = 'flex';
}
function clearFile() { pendingFile = null; updateFileBar(); }
function escHtml(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

var lastRetry = null;

// 执行一次流式请求（sendMsg 和超时重试共用）
function runChat(apiMessages, mn) {
  lastRetry = null;
  var hdrs = { 'Content-Type': 'application/json' };
  if (getToken()) hdrs['Authorization'] = 'Bearer ' + getToken();
  fetch(API, {
    method: 'POST',
    headers: hdrs,
    body: JSON.stringify({ model: mn, messages: apiMessages, max_tokens: 16384, stream: true })
  }).then(function(r) {
    if (!r.ok) {
      return r.json().then(function(d) {
        var e = new Error(d && d.error ? d.error : ('HTTP ' + r.status));
        e.status = r.status;
        e.data = d || {};
        throw e;
      });
    }
    return handleStream(r, mn);
  }).catch(function(e) {
    hideTyping();
    if (e.status === 401) {
      addMsg('error', '使用 GPT / Grok 需登录，请先点击右上角「登录」');
    } else if (e.status === 402) {
      addMsg('error', '点数不足，无法使用付费模型。请到个人中心充值：[去充值](/account/)');
    } else if (e.status === 524) {
      lastRetry = { apiMessages: apiMessages, mn: mn };
      addMsg('error', '上游响应超时（推理模型耗时过长，超出上游限制）。可重试，或换用 gpt-5.4-mini / DeepSeek 等更快模型。', null, function() { retryLast(); });
    } else {
      addMsg('error', '请求失败：' + e.message);
    }
  }).finally(function() {
    busy = false;
    sendBtn.disabled = true;
  });
}

// 超时后一键重试上一条
function retryLast() {
  if (!lastRetry || busy) return;
  var r = lastRetry;
  lastRetry = null;
  busy = true;
  sendBtn.disabled = true;
  showTyping(r.mn);
  runChat(r.apiMessages, r.mn);
}

function sendMsg(e) {
  if (e) e.preventDefault();
  var text = chatIn.value.trim();
  if ((!text && !pendingFile) || busy) return;
  chatIn.value = '';
  resizeIn(chatIn);
  busy = true;
  sendBtn.disabled = true;

  var userContent, displayText;
  if (pendingFile) {
    var fileLabel = pendingFile.type === 'image' ? '🖼️ ' + pendingFile.name : '📎 ' + pendingFile.name;
    if (pendingFile.type === 'image') {
      userContent = [{ type: 'text', text: text || '请分析这张图片' }, { type: 'image_url', image_url: { url: pendingFile.content } }];
    } else {
      userContent = (text ? text + '\n\n' : '') + '【文件：' + pendingFile.name + '】\n' + pendingFile.content.slice(0, 200000);
    }
    displayText = fileLabel + (text ? '\n' + text : '');
    pendingFile = null; updateFileBar();
  } else {
    userContent = text;
    displayText = text;
  }
  addMsg('user', displayText);
  messages.push({role:'user', content:userContent, display:displayText});
  var mk = mSel.value;
  var mn = (FAM[mk] ? curModel : null) || MM[mk];
  showTyping(mn);

  // 付费模型（GPT/Grok）需要登录
  if (FAM[mk] && !getToken()) {
    busy = false;
    sendBtn.disabled = false;
    addMsg('error', 'GPT / Grok 为付费模型，请先点击右上角「登录」后再使用');
    return;
  }

  runChat(buildContext(messages), mn);
}

// 构建发给模型的上下文：最近 recent 条保留全文，更早的长内容/文件截断，降低 token 消耗
function buildContext(messages) {
  var recent = 6;
  var arr = messages.slice(-20);
  return arr.map(function (m, i) {
    if (i >= arr.length - recent) return { role: m.role, content: m.content };
    return { role: m.role, content: truncateCtx(m.content) };
  });
}
function truncateCtx(content) {
  if (typeof content !== 'string') return content;
  if (content.length <= 600) return content;
  var fi = content.indexOf('【文件：');
  if (fi >= 0) {
    var nl = content.indexOf('\n', fi);
    var head = content.slice(0, Math.min(fi, 200));
    var mark = nl > 0 ? content.slice(fi, nl) : '【文件】';
    return (head + ' ' + mark + '（文件内容省略）').trim();
  }
  return content.slice(0, 600) + '\n…（历史内容省略）';
}

function newChat() {
  if (busy) return;
  convId = null;
  messages = [];
  usedTokens = 0;
  updateTokDisplay();
  msgBox.innerHTML = '<div class="cempty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><h3>开始对话</h3><p>选择模型，输入你的问题</p></div>';
}

// 轻量 Markdown 渲染
function mdRender(t) {
  var s = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var blocks = [];
  s = s.replace(/```([\s\S]*?)```/g, function(m, c) {
    var lang = '';
    var fl = c.trim().split('\n')[0];
    if (fl && !fl.includes(' ') && fl.length < 20) { lang = fl; c = c.slice(fl.length).trim(); }
    blocks.push('<pre><span class="cp-btn" onclick="copyCode(this)">复制</span>' + (lang ? '<span class="cp-lang">'+lang+'</span>' : '') + '<code>' + c + '</code></pre>');
    return '%%B' + (blocks.length - 1) + '%%';
  });
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/_([^_]+)_/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  var lines = s.split('\n');
  var out = [], listTag = null, tbl = [];
  function flushList() { if (listTag) { out.push('</'+listTag+'>'); listTag = null; } }
  function flushTbl() {
    if (!tbl.length) return;
    var head = '<thead><tr>' + tbl[0].map(function(c){ return '<th>'+c+'</th>'; }).join('') + '</tr></thead>';
    var body = '';
    for (var i = 1; i < tbl.length; i++) body += '<tr>' + tbl[i].map(function(c){ return '<td>'+c+'</td>'; }).join('') + '</tr>';
    out.push('<table>' + head + '<tbody>' + body + '</tbody></table>');
    tbl = [];
  }
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    if (l.indexOf('%%B') >= 0) {
      flushList(); flushTbl();
      out.push(l.replace(/%%B(\d+)%%/g, function(m, idx) { return blocks[parseInt(idx)]; }));
      continue;
    }
    // 表格
    if (/^\s*\|/.test(l) && /\|\s*$/.test(l)) {
      var cells = l.split('|').slice(1, -1).map(function(c){ return c.trim(); });
      if (cells.every(function(c){ return /^:?-{2,}:?$/.test(c); })) continue; // 分隔行
      flushList();
      tbl.push(cells);
      continue;
    }
    flushTbl();
    var q = l.match(/^&gt;\s?(.+)/);
    if (q) { flushList(); out.push('<blockquote>'+q[1]+'</blockquote>'); continue; }
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l)) { flushList(); out.push('<hr>'); continue; }
    var h = l.match(/^(#{1,6})\s+(.+)/);
    if (h) { flushList(); out.push('<h'+h[1].length+'>'+h[2]+'</h'+h[1].length+'>'); continue; }
    var ul = l.match(/^[-*+]\s+(.+)/);
    var ol = l.match(/^\d+\.\s+(.+)/);
    if (ul || ol) {
      var tag = ul ? 'ul' : 'ol';
      if (listTag !== tag) { flushList(); out.push('<'+tag+'>'); listTag = tag; }
      out.push('<li>' + (ul ? ul[1] : ol[1]) + '</li>');
      continue;
    }
    if (!l.trim()) { flushList(); continue; }
    flushList();
    out.push('<p>' + l + '</p>');
  }
  flushList(); flushTbl();
  return out.join('');
}

function copyToClipboard(txt) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).catch(function(){});
  } else {
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    ta.remove();
  }
}
function copyCode(btn) {
  var code = btn.parentNode.querySelector('code');
  copyToClipboard(code ? code.textContent : '');
  showToast('已复制代码');
}

</script>
