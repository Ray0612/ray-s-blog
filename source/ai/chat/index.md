---
title: AI 聊天网关
date: 2026-05-25
comments: false
---

<style>
#chat-box{max-width:700px;margin:0 auto}
#chat-msgs{border:1px solid var(--border-color,#ddd);border-radius:12px;padding:16px;height:400px;overflow-y:auto;margin-bottom:12px;background:var(--card-bg,#fff)}
.msg{margin-bottom:12px;padding:10px 14px;border-radius:10px;max-width:85%;white-space:pre-wrap;font-size:.9rem;line-height:1.5}
.msg.user{margin-left:auto;background:var(--theme-color,#425aef);color:#fff;border-bottom-right-radius:4px}
.msg.ai{margin-right:auto;background:var(--second-bg,#f0f0f0);color:var(--text-color,#333);border-bottom-left-radius:4px}
.msg.error{margin-right:auto;background:#fff0f0;color:#e53935;border:1px solid #ffcdd2}
#chat-input-area{display:flex;gap:8px}
#chat-input{flex:1;padding:10px 14px;border:1px solid var(--border-color,#ddd);border-radius:8px;font-size:.9rem;outline:none;background:var(--card-bg,#fff);color:var(--text-color,#333);font-family:inherit}
#chat-input:focus{border-color:var(--theme-color,#425aef)}
#chat-send{padding:10px 20px;background:var(--theme-color,#425aef);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:.9rem}
#chat-send:disabled{opacity:.5}
#model-select{padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:8px;font-size:.85rem;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none;margin-bottom:12px}
</style>

<div id="chat-box">
  <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px">
    <select id="model-select">
      <option value="gpt">GPT-4o</option>
      <option value="grok">Grok 3（xAI）</option>
      <option value="deepseek">DeepSeek V4 Pro（NVIDIA 免费）</option>
      <option value="gemini">Gemini 2.5 Pro</option>
    </select>
  </div>
  <div id="chat-msgs">
    <div class="msg ai">你好！我是 AI 聊天网关。选择模型后即可开始对话。</div>
  </div>
  <div id="chat-input-area">
    <input id="chat-input" placeholder="输入消息..." onkeydown="if(event.key==='Enter')sendMsg()">
    <button id="chat-send" onclick="sendMsg()">发送</button>
  </div>
</div>

<script>
var API = 'https://ai-gateway.ray2.asia/v1/chat/completions';
var modelMap = {gpt:'gpt-4o', grok:'grok-3', deepseek:'deepseek-ai/deepseek-v4-pro', gemini:'gemini-2.5-pro'};
var history = [];

function addMsg(role, text) {
  var div = document.createElement('div');
  div.className = 'msg ' + role;
  div.textContent = text;
  document.getElementById('chat-msgs').appendChild(div);
  div.scrollIntoView({behavior:'smooth'});
}

function sendMsg() {
  var input = document.getElementById('chat-input');
  var text = input.value.trim();
  if (!text) return;
  input.value = '';
  var btn = document.getElementById('chat-send');
  btn.disabled = true;
  btn.textContent = '⏳';

  addMsg('user', text);
  history.push({role:'user', content:text});

  var modelKey = document.getElementById('model-select').value;
  var modelName = modelMap[modelKey] || 'gpt-4o';

  fetch(API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: modelName,
      messages: history.slice(-20),
      max_tokens: 4096
    })
  }).then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(function(d) {
    var reply = d.choices && d.choices[0] && d.choices[0].message ? d.choices[0].message.content : JSON.stringify(d);
    addMsg('ai', reply);
    history.push({role:'assistant', content:reply});
  }).catch(function(e) {
    addMsg('error', '请求失败：' + e.message);
  }).finally(function() {
    btn.disabled = false;
    btn.textContent = '发送';
  });
}
</script>
