---
title: Ray 数字分身
date: 2026-06-11
comments: false
aside: false
---

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0d0d0d; color: #e0e0e0; font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; }

  #chat-container {
    max-width: 800px; margin: 0 auto; height: 100vh;
    display: flex; flex-direction: column;
  }

  #chat-header {
    text-align: center; padding: 20px 16px 12px;
    border-bottom: 1px solid #222; flex-shrink: 0;
  }
  #chat-header h1 { font-size: 18px; color: #fff; font-weight: 600; }
  #chat-header p { font-size: 13px; color: #888; margin-top: 4px; }

  #messages {
    flex: 1; overflow-y: auto; padding: 16px;
    display: flex; flex-direction: column; gap: 16px;
  }
  #messages:empty::after {
    content: "试着问我哲学、存在、孤独……任何你想和 Ray 讨论的问题";
    display: block; text-align: center; color: #555;
    margin-top: 60px; font-size: 14px;
    line-height: 1.8;
  }

  .msg { display: flex; gap: 12px; max-width: 85%; }
  .msg.user { align-self: flex-end; flex-direction: row-reverse; }
  .msg.assistant { align-self: flex-start; }

  .msg .avatar {
    width: 36px; height: 36px; border-radius: 50%;
    flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 600;
  }
  .msg.user .avatar { background: #425aef; color: #fff; }
  .msg.assistant .avatar { background: #2a2a2a; color: #888; }

  .msg .bubble {
    padding: 10px 14px; border-radius: 12px;
    font-size: 14px; line-height: 1.7; white-space: pre-wrap;
  }
  .msg.user .bubble { background: #425aef; color: #fff; border-bottom-right-radius: 4px; }
  .msg.assistant .bubble { background: #1a1a1a; color: #d0d0d0; border-bottom-left-radius: 4px; }

  .msg .bubble p { margin: 0; }
  .msg .bubble .typing { display: flex; gap: 4px; padding: 4px 0; }
  .msg .bubble .typing span {
    width: 6px; height: 6px; background: #666; border-radius: 50%;
    animation: typing 1.2s infinite;
  }
  .msg .bubble .typing span:nth-child(2) { animation-delay: 0.2s; }
  .msg .bubble .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing { 0%,60%,100% { opacity: 0.3; } 30% { opacity: 1; } }

  #input-area {
    padding: 12px 16px; border-top: 1px solid #222;
    display: flex; gap: 8px; flex-shrink: 0;
  }
  #input-area textarea {
    flex: 1; background: #1a1a1a; border: 1px solid #333; border-radius: 8px;
    padding: 10px 14px; color: #e0e0e0; font-size: 14px; resize: none;
    outline: none; font-family: inherit; min-height: 44px; max-height: 120px;
  }
  #input-area textarea:focus { border-color: #425aef; }
  #input-area button {
    background: #425aef; color: #fff; border: none; border-radius: 8px;
    width: 44px; height: 44px; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  #input-area button:hover { background: #3348d1; }
  #input-area button:disabled { opacity: 0.5; cursor: not-allowed; }
  #input-area button svg { width: 18px; height: 18px; fill: currentColor; }
</style>

<div id="chat-container">
  <div id="chat-header">
    <h1>Ray</h1>
    <p>数字分身 · 以他的方式思考</p>
  </div>
  <div id="messages"></div>
  <div id="input-area">
    <textarea id="input" rows="1" placeholder="说点什么…"></textarea>
    <button id="send" onclick="send()">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
  </div>
</div>

<script>
const API = 'https://me.ray2.asia';
const messagesEl = document.getElementById('messages');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
let history = [];
let loading = false;

// Auto-resize textarea
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 120) + 'px';
});

// Enter to send (Shift+Enter for newline)
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
});

async function send() {
  const msg = input.value.trim();
  if (!msg || loading) return;

  input.value = '';
  input.style.height = '44px';
  addMessage('user', msg);
  history.push({ role: 'user', content: msg });

  loading = true;
  sendBtn.disabled = true;
  const typingId = showTyping();

  try {
    const resp = await fetch(API + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, history: history.slice(-10) })
    });
    const data = await resp.json();
    removeTyping(typingId);

    if (data.error) {
      addMessage('assistant', '抱歉，我现在无法思考：' + data.error);
    } else {
      const reply = data.choices?.[0]?.message?.content || '……';
      addMessage('assistant', reply);
      history.push({ role: 'assistant', content: reply });
    }
  } catch (e) {
    removeTyping(typingId);
    addMessage('assistant', '连接失败，请稍后再试。');
  }

  loading = false;
  sendBtn.disabled = false;
}

function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.id = 'msg-' + Date.now();
  div.innerHTML = role === 'user'
    ? '<div class="bubble">' + escapeHtml(text) + '</div><div class="avatar">R</div>'
    : '<div class="avatar">R</div><div class="bubble">' + escapeHtml(text) + '</div>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'msg assistant';
  div.id = id;
  div.innerHTML = '<div class="avatar">R</div><div class="bubble"><div class="typing"><span></span><span></span><span></span></div></div>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
</script>
