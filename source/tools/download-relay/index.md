---
title: GitHub 高速下载助手
date: 2026-06-03
comments: false
---

<style>
.dr-wrap{max-width:600px;margin:0 auto}
.dr-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:12px;padding:24px;margin-bottom:16px}
.dr-card h2{font-size:16px;margin:0 0 12px;color:var(--text-color,#1f2937)}
.dr-label{font-size:13px;color:var(--text-meta,#6b7280);margin-bottom:4px}
.dr-input{width:100%;padding:10px 12px;border:1px solid var(--border-color,#d1d5db);border-radius:8px;font-size:14px;outline:none;background:var(--card-bg,#fff);color:var(--text-color,#1f2937);box-sizing:border-box}
.dr-input:focus{border-color:var(--theme-color,#425aef)}
[data-theme="dark"] .dr-input{background:#1f2937;border-color:#374151;color:#e5e7eb}
.dr-btn{padding:10px 24px;background:var(--theme-color,#425aef);color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;margin-top:10px}
.dr-btn:disabled{opacity:.5;cursor:not-allowed}
.dr-btn:hover:not(:disabled){opacity:.85}
.dr-status{padding:12px;border-radius:8px;margin-top:12px;font-size:13px;line-height:1.6;display:none}
.dr-status.ok{display:block;background:#d1fae5;color:#065f46}
.dr-status.err{display:block;background:#fee2e2;color:#991b1b}
.dr-status.info{display:block;background:#dbeafe;color:#1e40af}
.dr-bar{height:6px;background:#e5e7eb;border-radius:3px;margin-top:10px;overflow:hidden;display:none}
.dr-bar-inner{height:100%;background:var(--theme-color,#425aef);border-radius:3px;width:0%;transition:width .5s}
.dr-info{font-size:12px;color:var(--text-meta,#9ca3af);margin-top:8px}
.dr-hr{border:none;border-top:1px solid var(--border-color,#e5e7eb);margin:16px 0}
.dr-admin-btn{font-size:12px;color:var(--text-meta,#9ca3af);cursor:pointer;text-decoration:underline;padding:0;border:none;background:none}
.dr-admin-btn:hover{color:var(--theme-color,#425aef)}
.dr-admin-panel{display:none;margin-top:12px}
.dr-footer{text-align:center;font-size:12px;color:var(--text-meta,#9ca3af);padding:16px}
</style>

<div class="dr-wrap">
  <div class="dr-card">
    <h2>⚡ GitHub 高速下载</h2>
    <div class="dr-label">GitHub 文件链接</div>
    <input class="dr-input" id="drUrl" placeholder="https://github.com/.../releases/download/.../file.zip">
    <br>
    <button class="dr-btn" id="drBtn" onclick="startDownload()">开始加速下载</button>
    <div class="dr-bar" id="drBar"><div class="dr-bar-inner" id="drBarInner"></div></div>
    <div class="dr-status" id="drStatus"></div>
    <div class="dr-info">支持 GitHub 域名 · 单文件 ≤200MB · 全站月流量 5GB</div>
  </div>

  <!-- 配额进度条 -->
  <div class="dr-card" id="quotaCard">
    <h2>📊 本月已用流量</h2>
    <div class="dr-bar" id="quotaBar" style="display:block;height:10px;border-radius:5px;margin-bottom:6px">
      <div class="dr-bar-inner" id="quotaBarInner" style="height:10px;border-radius:5px"></div>
    </div>
    <div class="dr-info" id="quotaText" style="font-size:13px">加载中...</div>
  </div>

  <div class="dr-card" style="text-align:center">
    <button class="dr-admin-btn" onclick="toggleAdmin()">⚙ 管理员</button>
    <div class="dr-admin-panel" id="adminPanel">
      <input class="dr-input" id="adminPwd" type="password" placeholder="管理员密码" style="margin-bottom:8px">
      <label style="font-size:13px;display:flex;align-items:center;gap:6px;margin-bottom:8px;color:var(--text-color,#374151)">
        <input type="checkbox" id="adminMode"> 管理员模式（任意链接 + 不限大小）
      </label>
      <button class="dr-btn" onclick="adminStatus()" style="font-size:12px;padding:6px 16px">查看配额</button>
      <div class="dr-status" id="adminStatus"></div>
    </div>
  </div>

  <div class="dr-footer">
    Worker 直下 + R2 中转 · 共享 5GB/月 · 管理员额外 3GB
  </div>
</div>

<script>
var API = 'https://dl.ray2.asia';
var POLL_INTERVAL = 2000;
var pollTimer = null;

// 加载配额信息
(function loadQuota() {
  fetch(API + '/api/quota').then(function(r) { return r.json(); }).then(function(d) {
    if (!d.quota) return;
    var q = d.quota;
    var pct = Math.min(100, (q.poolUsed / q.poolTotal * 100));
    document.getElementById('quotaBarInner').style.width = pct + '%';
    if (pct > 85) document.getElementById('quotaBarInner').style.background = '#ef4444';
    else if (pct > 60) document.getElementById('quotaBarInner').style.background = '#f59e0b';
    document.getElementById('quotaText').innerHTML = '共享池已用 ' + formatBytes(q.poolUsed) + ' / ' + formatBytes(q.poolTotal)
      + '（' + pct.toFixed(1) + '%）<br>管理员已用 ' + formatBytes(q.adminUsed) + ' / ' + formatBytes(q.adminTotal);
  }).catch(function() {
    document.getElementById('quotaText').textContent = '配额信息暂时不可用';
  });
})();

function startDownload() {
  var url = document.getElementById('drUrl').value.trim();
  if (!url) return;

  var btn = document.getElementById('drBtn');
  var status = document.getElementById('drStatus');
  var bar = document.getElementById('drBar');
  var barInner = document.getElementById('drBarInner');

  btn.disabled = true;
  btn.textContent = '提交中...';
  status.className = 'dr-status';
  bar.style.display = 'none';

  var submitData = {url: url};
  if (document.getElementById('adminMode').checked) {
    submitData.password = document.getElementById('adminPwd').value;
  }
  fetch(API + '/api/submit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(submitData)
  }).then(function(r) { return r.json(); }).then(function(d) {
    if (d.error) {
      showStatus('err', '❌ ' + d.error);
      btn.disabled = false;
      btn.textContent = '开始加速下载';
      return;
    }
    showStatus('info', '⏳ 任务已提交，正在下载...');
    btn.textContent = '下载中...';
    bar.style.display = 'block';
    barInner.style.width = '30%';
    // 开始轮询
    pollTask(d.taskId);
  }).catch(function(e) {
    showStatus('err', '❌ 请求失败: ' + e.message);
    btn.disabled = false;
    btn.textContent = '开始加速下载';
  });
}

function pollTask(taskId) {
  if (pollTimer) clearTimeout(pollTimer);

  fetch(API + '/api/status?task=' + taskId)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var barInner = document.getElementById('drBarInner');
      if (d.status === 'downloading') {
        showStatus('info', '⏳ 正在从 GitHub 下载中...');
        barInner.style.width = '50%';
        pollTimer = setTimeout(function() { pollTask(taskId); }, POLL_INTERVAL);
      } else if (d.status === 'done') {
        barInner.style.width = '100%';
        showStatus('ok', '✅ 下载完成！<br><a href="' + API + '/api/dl?task=' + taskId + '" class="dr-btn" style="display:inline-block;margin-top:8px;text-decoration:none">📥 点击下载</a>');
        var btn = document.getElementById('drBtn');
        btn.disabled = false;
        btn.textContent = '开始加速下载';
      } else if (d.status === 'error') {
        showStatus('err', '❌ 下载失败: ' + (d.error || '未知错误'));
        var btn = document.getElementById('drBtn');
        btn.disabled = false;
        btn.textContent = '开始加速下载';
        barInner.style.width = '0%';
      } else {
        showStatus('err', '❌ 任务不存在');
        var btn = document.getElementById('drBtn');
        btn.disabled = false;
        btn.textContent = '开始加速下载';
      }
    }).catch(function(e) {
      showStatus('err', '❌ 状态查询失败: ' + e.message);
      var btn = document.getElementById('drBtn');
      btn.disabled = false;
      btn.textContent = '开始加速下载';
    });
}

function showStatus(type, msg) {
  var el = document.getElementById('drStatus');
  el.className = 'dr-status ' + type;
  el.innerHTML = msg;
}

function toggleAdmin() {
  var p = document.getElementById('adminPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

function adminStatus() {
  var pwd = document.getElementById('adminPwd').value;
  fetch(API + '/api/admin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({password: pwd, action: 'status'})
  }).then(function(r) { return r.json(); }).then(function(d) {
    var s = document.getElementById('adminStatus');
    if (d.error) {
      s.className = 'dr-status err'; s.style.display = 'block';
      s.textContent = '❌ ' + d.error;
    } else if (d.quota) {
      var q = d.quota;
      s.className = 'dr-status info'; s.style.display = 'block';
      s.innerHTML = '共享池: ' + formatBytes(q.poolUsed) + ' / ' + formatBytes(q.poolTotal)
        + '<br>管理员池: ' + formatBytes(q.adminUsed) + ' / ' + formatBytes(q.adminTotal);
    }
  });
}

function formatBytes(b) {
  if (b >= 1073741824) return (b/1073741824).toFixed(1) + 'GB';
  if (b >= 1048576) return (b/1048576).toFixed(1) + 'MB';
  return (b/1024).toFixed(0) + 'KB';
}
</script>
