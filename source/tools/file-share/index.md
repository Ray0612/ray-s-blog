---
title: 文件传输
date: 2026-05-16
comments: false
---

<link rel="stylesheet" href="/css/tools.css">

<div id="file-share-app">
  <div class="tabs">
    <button class="tab active" onclick="switchTab('email')">📧 邮箱发送</button>
    <button class="tab" onclick="switchTab('code')">🔑 提取码</button>
  </div>

  <!-- Tab 1: 邮箱发送 -->
  <div id="panel-email" class="panel active">
    <div class="field">
      <label>选择文件</label>
      <input type="file" id="email-file">
      <div class="file-info" id="email-file-info"></div>
    </div>
    <div class="field">
      <label>收件人邮箱</label>
      <input type="email" id="email-addr" placeholder="请输入对方邮箱地址">
    </div>
    <button class="ts-btn" id="email-btn" onclick="sendEmail()">📤 发送到邮箱</button>
    <div class="result" id="email-result"></div>
  </div>

  <!-- Tab 2: 提取码 -->
  <div id="panel-code" class="panel">
    <div class="sub-tabs">
      <button class="sub-tab active" onclick="switchSubTab('up')">📤 上传</button>
      <button class="sub-tab" onclick="switchSubTab('down')">📥 下载</button>
    </div>

    <div id="sub-up" class="sub-panel active">
      <div class="field">
        <label>选择文件</label>
        <input type="file" id="code-file">
        <div class="file-info" id="code-file-info"></div>
      </div>
      <div class="field">
        <label>可下载次数</label>
        <div class="num-picker">
          <button onclick="chg(-1)">−</button>
          <span id="dcnt">3</span>
          <button onclick="chg(1)">+</button>
          <span class="num-hint">人</span>
        </div>
      </div>
      <button class="ts-btn" id="up-btn" onclick="upFile()">📤 上传获取提取码</button>
      <div class="result" id="up-result"></div>
    </div>

    <div id="sub-down" class="sub-panel">
      <div class="field">
        <label>6位提取码</label>
        <input id="code-inp" maxlength="6" placeholder="输入6位提取码" oninput="this.value=this.value.replace(/\D/g,'')">
      </div>
      <button class="ts-btn" id="info-btn" onclick="check()">🔍 查询文件</button>
      <div class="result" id="info-result"></div>
      <div id="down-area" style="display:none">
        <button class="ts-btn" onclick="downFile()">📥 下载文件</button>
        <div class="result" id="down-result"></div>
      </div>
    </div>
  </div>
</div>

<script>
const API = 'https://file.ray2.asia';
let _dc = 3;

function switchTab(t) {
  document.querySelectorAll('#file-share-app > .tabs > .tab').forEach(el => {
    el.classList.toggle('active', el.textContent.includes(t === 'email' ? '邮箱' : '提取'));
  });
  document.querySelectorAll('#file-share-app > .panel').forEach(el => el.classList.remove('active'));
  document.getElementById('panel-' + t).classList.add('active');
}

function switchSubTab(t) {
  document.querySelectorAll('.sub-tab').forEach(el => el.classList.toggle('active', el.textContent.includes(t === 'up' ? '上传' : '下载')));
  document.querySelectorAll('.sub-panel').forEach(el => el.classList.remove('active'));
  document.getElementById('sub-' + t).classList.add('active');
}

function chg(d) { _dc = Math.max(1, Math.min(10, _dc + d)); document.getElementById('dcnt').textContent = _dc; }

document.getElementById('email-file').onchange = function() { fi(this, 'email-file-info'); };
document.getElementById('code-file').onchange = function() { fi(this, 'code-file-info'); };

function fi(inp, id) {
  const el = document.getElementById(id);
  if (!inp.files || !inp.files[0]) { el.textContent = ''; return; }
  const f = inp.files[0];
  if (f.size > 50 * 1024 * 1024) { el.innerHTML = '<span style="color:#e53935">文件超过50MB限制</span>'; inp.value = ''; return; }
  el.textContent = f.name + ' (' + sz(f.size) + ')';
}

async function sendEmail() {
  const f = document.getElementById('email-file').files[0];
  const e = document.getElementById('email-addr').value.trim();
  if (!f) return sr('email', '请选择文件', 'e');
  if (!e) return sr('email', '请填写收件人邮箱', 'e');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return sr('email', '邮箱格式不正确', 'e');
  btn('email-btn', 1, '⏳ 上传发送中...');
  const fd = new FormData(); fd.append('file', f); fd.append('email', e);
  try {
    const r = await fetch(API + '/api/send-email', { method: 'POST', body: fd });
    const d = await r.json();
    sr('email', d.success ? '✅ ' + d.message : '❌ ' + (d.error || '发送失败'), d.success ? 's' : 'e');
  } catch (_) { sr('email', '❌ 网络错误', 'e'); }
  btn('email-btn', 0, '📤 发送到邮箱');
}

async function upFile() {
  const f = document.getElementById('code-file').files[0];
  if (!f) return sr('up', '请选择文件', 'e');
  btn('up-btn', 1, '⏳ 上传中...');
  const fd = new FormData(); fd.append('file', f); fd.append('maxDownloads', _dc);
  try {
    const r = await fetch(API + '/api/upload', { method: 'POST', body: fd });
    const d = await r.json();
    if (d.code) sr('up', '<div style="font-size:.9rem;margin-bottom:4px">提取码</div><div style="font-size:2.5rem;font-weight:bold;letter-spacing:8px;margin:4px 0">' + d.code + '</div><div style="font-size:.8rem;opacity:.7">可下载 ' + _dc + ' 次</div>', 's');
    else sr('up', '❌ ' + (d.error || '上传失败'), 'e');
  } catch (_) { sr('up', '❌ 网络错误', 'e'); }
  btn('up-btn', 0, '📤 上传获取提取码');
}

async function check() {
  const code = document.getElementById('code-inp').value;
  if (code.length !== 6) return sr('info', '请输入6位提取码', 'e');
  btn('info-btn', 1, '⏳ 查询中...');
  try {
    const r = await fetch(API + '/api/info?code=' + code);
    const d = await r.json();
    if (d.fileName) {
      sr('info', '📄 ' + d.fileName + '<br>📦 ' + sz(parseInt(d.fileSize)) + '<br>📊 剩余次数: ' + d.remaining, 's');
      document.getElementById('down-area').style.display = 'block';
      document.getElementById('down-area').dataset.code = code;
    } else { sr('info', '❌ ' + (d.error || '无效'), 'e'); document.getElementById('down-area').style.display = 'none'; }
  } catch (_) { sr('info', '❌ 网络错误', 'e'); }
  btn('info-btn', 0, '🔍 查询文件');
}

async function downFile() {
  const code = document.getElementById('down-area').dataset.code;
  if (!code) return;
  const btn = document.querySelector('#down-area .ts-btn');
  btn.disabled = 1; btn.textContent = '⏳ 下载中...';
  try {
    const r = await fetch(API + '/api/download?code=' + code);
    if (!r.ok) { const d = await r.json(); sr('down', '❌ ' + (d.error || '下载失败'), 'e'); return; }
    const blob = await r.blob();
    const dispo = r.headers.get('Content-Disposition') || '';
    const m = dispo.match(/filename="?([^";\n]+)"?/);
    const fn = m ? decodeURIComponent(m[1]) : 'download';
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fn; a.click();
    URL.revokeObjectURL(a.href);
    sr('down', '✅ 下载成功！', 's');
    document.getElementById('down-area').style.display = 'none';
  } catch (_) { sr('down', '❌ 下载失败', 'e'); }
  btn.disabled = 0; btn.textContent = '📥 下载文件';
}

function sr(p, m, t) { const el = document.getElementById(p + '-result'); if (el) { el.className = 'result ' + (t === 's' ? 'success' : 'error'); el.innerHTML = m; } }
function btn(id, d, t) { const b = document.getElementById(id); if (b) { b.disabled = d; b.textContent = t; } }
function sz(b) { if (b < 1024) return b + 'B'; if (b < 1048576) return (b / 1024).toFixed(1) + 'KB'; return (b / 1048576).toFixed(1) + 'MB'; }
</script>

<style>
#file-share-app .sub-tabs { display:flex; gap:0; margin-bottom:16px; }
#file-share-app .sub-tab { flex:1; padding:10px; border:1px solid var(--border-color,#ddd); background:var(--card-bg,#f9f9f9); cursor:pointer; font-size:.9rem; color:var(--text-meta,#999); transition:all .2s; text-align:center; }
#file-share-app .sub-tab:first-child { border-radius:6px 0 0 6px; }
#file-share-app .sub-tab:last-child { border-radius:0 6px 6px 0; }
#file-share-app .sub-tab.active { background:var(--theme-color,#425aef); color:#fff; border-color:var(--theme-color,#425aef); }
.field { margin-bottom:14px; }
.field label { display:block; font-size:.85rem; font-weight:600; margin-bottom:4px; color:var(--text-color,#333); }
.field input[type="file"] { font-size:.85rem; }
.field input[type="email"], .field input[type="text"] { width:100%; padding:10px 12px; border:1px solid var(--border-color,#ddd); border-radius:6px; font-size:.9rem; background:var(--card-bg,#fff); color:var(--text-color,#333); outline:none; box-sizing:border-box; }
.file-info { font-size:.82rem; color:var(--text-meta,#666); margin-top:4px; }
.num-picker { display:flex; align-items:center; gap:8px; }
.num-picker button { width:36px; height:36px; border-radius:50%; border:1px solid var(--border-color,#ddd); background:var(--card-bg,#fff); font-size:1.2rem; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--text-color,#333); }
.num-picker button:hover { background:var(--border-color,#eee); }
.num-picker span { font-size:1.2rem; font-weight:600; min-width:24px; text-align:center; color:var(--text-color,#333); }
.num-hint { font-size:.85rem !important; font-weight:400 !important; color:var(--text-meta,#999) !important; }
</style>
