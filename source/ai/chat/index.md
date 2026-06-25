---
title: AI 聊天网关
date: 2026-05-25
comments: false
---

<style>
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

/* 消息区 */
.chat-msgs {
  flex: 1; overflow-y: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 4px;
}
.chat-msgs::-webkit-scrollbar { width: 5px; }
.chat-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

/* 消息 */
.m-row { display: flex; gap: 10px; max-width: 88%; margin-bottom: 8px; }
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
  white-space: pre-wrap; word-break: break-word;
}
.m-row.mu .m-b { background: #425aef; color: #fff; border-bottom-right-radius: 4px; }
.m-row.ma .m-b { background: #f0f0f0; color: #1f2937; border-bottom-left-radius: 4px; }
[data-theme="dark"] .m-row.ma .m-b { background: #1f2937; color: #e5e7eb; }
.m-row.me .m-b { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; font-size: 13px; }
[data-theme="dark"] .m-row.me .m-b { background: #2d1a1a; color: #f87171; border-color: #7f1d1d; }

/* MD in bubble */
.m-b p { margin: 4px 0; }
.m-b code {
  font-size: 13px; background: rgba(0,0,0,0.07); padding: 1px 4px; border-radius: 3px;
}
[data-theme="dark"] .m-b code { background: rgba(255,255,255,0.1); }
.m-b pre {
  margin: 8px 0; background: #1e293b; color: #e2e8f0;
  border-radius: 8px; padding: 12px; overflow-x: auto; font-size: 13px;
}
.m-b pre code { background: none; padding: 0; color: inherit; }
.m-b ul, .m-b ol { padding-left: 18px; margin: 4px 0; }
.m-b h1, .m-b h2, .m-b h3 { margin: 8px 0 4px; font-weight: 600; }
.m-b h1 { font-size: 16px; } .m-b h2 { font-size: 15px; } .m-b h3 { font-size: 14px; }
.m-tag { font-size: 11px; color: #9ca3af; margin-top: 6px; padding-top: 6px; border-top: 1px solid #e5e7eb; }
[data-theme="dark"] .m-tag { border-color: #374151; color: #6b7280; }

/* 输入区 */
.chat-ft { padding: 12px 16px 14px; border-top: 1px solid #e5e7eb; flex-shrink: 0; }
[data-theme="dark"] .chat-ft { border-color: #374151; }
.chat-iw {
  display: flex; gap: 8px; align-items: flex-end;
  padding: 8px 8px 8px 14px; border-radius: 10px;
  background: #f3f4f6; border: 1px solid #d1d5db;
}
[data-theme="dark"] .chat-iw { background: #1f2937; border-color: #374151; }
.chat-iw:focus-within { border-color: #425aef; }
.chat-i {
  flex: 1; border: none; outline: none; resize: none; font-size: 14px; line-height: 1.5;
  max-height: 100px; background: transparent; color: #1f2937; padding: 2px 0; font-family: inherit;
}
[data-theme="dark"] .chat-i { color: #e5e7eb; }
.chat-i::placeholder { color: #9ca3af; }
.chat-s {
  width: 34px; height: 34px; border-radius: 8px; border: none;
  background: #425aef; color: #fff; cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.chat-s:hover:not(:disabled) { opacity: 0.85; }
.chat-s:disabled { opacity: 0.3; cursor: not-allowed; }
.chat-s svg { width: 16px; height: 16px; }

/* 打字动画 */
.typing { display: flex; gap: 4px; padding: 4px 0; }
.typing span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: t 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.2s; }
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
</style>

<div class="chat-wrap">
<div class="chat-box">
  <div class="chat-hd">
    <div class="chat-hd-l">
      <b>AI 聊天</b>
      <select id="mSel">
        <option value="gpt">GPT-5.4-mini</option>
        <option value="qwen">Qwen 3.5-122B</option>
        <option value="deepseek">DeepSeek V4 Pro</option>
        <option value="grok">Grok 3</option>
      </select>
    </div>
    <button class="chat-new" onclick="newChat()">新对话</button>
  </div>
  <div class="chat-msgs" id="msgBox"></div>
  <div class="chat-ft">
    <div class="chat-iw">
      <textarea class="chat-i" id="chatIn" rows="1" placeholder="输入消息..." onkeydown="onKey(event)" oninput="resizeIn(this)"></textarea>
      <button class="chat-s" id="sendBtn" onclick="sendMsg()" disabled>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </button>
    </div>
  </div>
</div>
</div>

<script>
var API = 'https://ai-gateway.ray2.asia/v1/chat/completions';
var MM = {gpt:'gpt-5.4-mini', qwen:'qwen/qwen3.5-122b-a10b', deepseek:'deepseek-v4-pro', grok:'grok-4-1-fast-reasoning'};
var ML = {gpt:'GPT-5.4-mini', qwen:'Qwen 3.5-122B', deepseek:'DeepSeek V4 Pro', grok:'Grok 3'};
var messages = [];
var busy = false;

var msgBox = document.getElementById('msgBox');
var chatIn = document.getElementById('chatIn');
var sendBtn = document.getElementById('sendBtn');
var mSel = document.getElementById('mSel');

function resizeIn(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  sendBtn.disabled = !el.value.trim() || busy;
}
function onKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
}

function addMsg(role, text, mk) {
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
    if (role === 'ai' && mk && ML[mk]) {
      var tag = document.createElement('div');
      tag.className = 'm-tag';
      tag.textContent = ML[mk];
      b.appendChild(tag);
    }
  }
  row.appendChild(av);
  row.appendChild(b);
  msgBox.appendChild(row);
  row.scrollIntoView({behavior:'smooth'});
}

function showTyping() {
  var row = document.createElement('div');
  row.className = 'm-row ma';
  row.id = '_typing';
  var av = document.createElement('div');
  av.className = 'm-av';
  av.textContent = 'A';
  var b = document.createElement('div');
  b.className = 'm-b';
  b.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  row.appendChild(av);
  row.appendChild(b);
  msgBox.appendChild(row);
  row.scrollIntoView({behavior:'smooth'});
}
function hideTyping() {
  var el = document.getElementById('_typing');
  if (el) el.remove();
}

function sendMsg() {
  var text = chatIn.value.trim();
  if (!text || busy) return;
  chatIn.value = '';
  resizeIn(chatIn);
  busy = true;
  sendBtn.disabled = true;

  addMsg('user', text);
  messages.push({role:'user', content:text});
  showTyping();

  var mk = mSel.value;
  var mn = MM[mk] || 'gpt-5.4-mini';

  fetch(API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: mn,
      messages: messages.slice(-20),
      max_tokens: 4096
    })
  }).then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(function(d) {
    var reply = d.choices && d.choices[0] && d.choices[0].message ? d.choices[0].message.content : JSON.stringify(d);
    hideTyping();
    addMsg('ai', reply, mk);
    messages.push({role:'assistant', content:reply});
  }).catch(function(e) {
    hideTyping();
    addMsg('error', '请求失败：' + e.message);
  }).finally(function() {
    busy = false;
    sendBtn.disabled = true;
  });
}

function newChat() {
  if (busy) return;
  messages = [];
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
    blocks.push('<pre>' + (lang ? '<span style="position:absolute;top:5px;right:10px;font-size:11px;color:#94a3b8">'+lang+'</span>' : '') + '<code>' + c.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</code></pre>');
    return '%%B' + (blocks.length - 1) + '%%';
  });
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/_([^_]+)_/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  var lines = s.split('\n');
  var html = '', inList = false;
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    if (l.includes('%%B')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += l.replace(/%%B(\d+)%%/g, function(m, idx) { return blocks[parseInt(idx)]; });
      continue;
    }
    var h = l.match(/^(#{1,3})\s+(.+)/);
    if (h) {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<h' + h[1].length + '>' + h[2] + '</h' + h[1].length + '>';
      continue;
    }
    var ul = l.match(/^[-*+]\s+(.+)/);
    if (ul) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += '<li>' + ul[1] + '</li>'; continue;
    }
    var ol = l.match(/^\d+\.\s+(.+)/);
    if (ol) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += '<li>' + ol[1] + '</li>'; continue;
    }
    if (!l.trim()) { if (inList) { html += '</ul>'; inList = false; } continue; }
    if (inList) { html += '</ul>'; inList = false; }
    html += '<p>' + l + '</p>';
  }
  if (inList) html += '</ul>';
  return html;
}
</script>
