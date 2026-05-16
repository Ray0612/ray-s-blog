---
title: 文字传输
date: 2026-05-14
comments: false
aside: false
---

<link rel="stylesheet" href="/css/tools.css">

<div id="text-share-app">
  <div class="tabs">
    <button class="tab active" onclick="switchTab('upload')">📤 上传</button>
    <button class="tab" onclick="switchTab('download')">📥 提取</button>
  </div>

  <div id="panel-upload" class="panel active">
    <textarea id="text-input" placeholder="粘贴或输入文字（最多2万字）" oninput="updateCount()"></textarea>
    <div class="char-count"><span id="char-count">0</span> / 20000</div>
    <div class="warning" id="warning">文字超出2万字限制</div>
    <button class="ts-btn" id="upload-btn" onclick="upload()">📤 上传获取提取码</button>
    <div class="result" id="upload-result"></div>
  </div>

  <div id="panel-download" class="panel">
    <input id="code-input" maxlength="4" placeholder="输入4位提取码" oninput="this.value=this.value.replace(/\D/g,'')">
    <button class="ts-btn" id="download-btn" onclick="download()">📥 提取文字</button>
    <div class="result" id="download-result"></div>
  </div>

  <div class="ts-footer">🔒 文字存储5分钟后自动销毁，提取后立即删除</div>
</div>

<script>
const API = 'https://tools.ray2.asia';

function switchTab(t) {
  document.querySelectorAll('.tab').forEach(el => el.classList.toggle('active', el.textContent.includes(t === 'upload' ? '上传' : '提取')));
  document.querySelectorAll('.panel').forEach(el => el.classList.remove('active'));
  document.getElementById('panel-' + t).classList.add('active');
}

function updateCount() {
  const n = document.getElementById('text-input').value.length;
  document.getElementById('char-count').textContent = n;
  document.getElementById('warning').style.display = n > 20000 ? 'block' : 'none';
  document.getElementById('upload-btn').disabled = n > 20000;
}

async function upload() {
  const text = document.getElementById('text-input').value;
  if (!text.trim()) return showResult('upload', '请先输入文字', 'error');
  if (text.length > 20000) return;
  setBtn('upload-btn', true, '⏳ 上传中...');
  try {
    const r = await fetch(API + '/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
    const d = await r.json();
    d.code ? showResult('upload', '<div style="font-size:.9rem;margin-bottom:4px">提取码</div><div style="font-size:2.5rem;font-weight:bold;letter-spacing:8px;margin:4px 0">' + d.code + '</div><div style="font-size:.8rem;opacity:.7">⏱ 5分钟内有效，提取后自动销毁</div>', 'success')
      : showResult('upload', '上传失败，请重试', 'error');
  } catch (e) { showResult('upload', '网络错误，请确认 Worker 已部署', 'error'); }
  setBtn('upload-btn', false, '📤 上传获取提取码');
}

async function download() {
  const code = document.getElementById('code-input').value;
  if (code.length !== 4) return showResult('download', '请输入4位提取码', 'error');
  setBtn('download-btn', true, '⏳ 提取中...');
  try {
    const r = await fetch(API + '/api/retrieve?code=' + code);
    const d = await r.json();
    if (d.text) {
      const text = d.text;
      showResult('download', '<div class="out-text">' + escHtml(text) + '</div><button class="copy-btn" onclick="copyText()">📋 复制文字</button>', 'success');
    } else showResult('download', '提取码无效或已过期', 'error');
  } catch (e) { showResult('download', '网络错误', 'error'); }
  setBtn('download-btn', false, '📥 提取文字');
}

function showResult(panel, msg, type) {
  const el = document.getElementById(panel + '-result');
  el.className = 'result ' + type;
  el.innerHTML = msg;
}

function setBtn(id, disabled, text) {
  const btn = document.getElementById(id);
  btn.disabled = disabled;
  btn.textContent = text;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function copyText() {
  const text = document.querySelector('.out-text').textContent;
  try { await navigator.clipboard.writeText(text); alert('✅ 已复制到剪贴板'); }
  catch (e) { prompt('复制失败，请手动复制：', text); }
}
</script>
