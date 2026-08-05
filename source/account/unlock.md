---
title: 账号解封
date: 2026-08-05
comments: false
aside: false
---

<style>
.unlock-wrap{max-width:460px;margin:0 auto;text-align:center;padding:40px 20px}
.unlock-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:36px 24px}
.unlock-card h3{font-size:18px;margin:0 0 12px;color:#1f2937}
[data-theme="dark"] .unlock-card h3{color:#e5e7eb}
.unlock-card p{font-size:14px;color:#6b7280;margin:8px 0}
.unlock-card .ok-btn{display:inline-block;margin-top:16px;padding:10px 24px;border-radius:8px;background:#425aef;color:#fff;text-decoration:none;font-size:14px}
.unlock-load{font-size:14px;color:#9ca3af}
</style>

<div class="unlock-wrap">
  <div class="unlock-card" id="unlockBox">
    <div class="unlock-load">正在处理解封请求…</div>
  </div>
</div>

<script>
(function () {
  var AUTH = 'https://ai-gateway.ray2.asia';
  var params = new URLSearchParams(location.search);
  var email = params.get('email') || '';
  var code = params.get('code') || '';
  var box = document.getElementById('unlockBox');
  if (!email || !code) {
    box.innerHTML = '<h3>链接不完整</h3><p>解封链接缺少必要参数。</p>';
    return;
  }
  fetch(AUTH + '/auth/unlock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, code: code })
  }).then(function (r) { return r.json(); }).then(function (d) {
    if (d.ok) {
      box.innerHTML = '<h3>账号已解封</h3><p>' + (d.msg || '可以重新登录了') + '</p><a class="ok-btn" href="/">返回首页登录</a>';
    } else {
      box.innerHTML = '<h3>解封失败</h3><p>' + (d.error || '链接无效') + '</p>';
    }
  }).catch(function () {
    box.innerHTML = '<h3>解封失败</h3><p>网络错误，请重试。</p>';
  });
})();
</script>
