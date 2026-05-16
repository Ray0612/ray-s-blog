---
title: 文件传输
date: 2026-05-16
comments: false
---

<link rel="stylesheet" href="/css/tools.css">

{% raw %}
<div id="file-share-app">
  <div class="fs-tabs">
    <button class="fs-tab active" onclick="switchTab('email')">📧 邮箱发送</button>
    <button class="tab" onclick="switchTab('code')">🔑 提取码</button>
  </div>

  <div id="panel-email" class="panel active">
    <div class="field">
      <label>选择文件</label>
      <input type="file" id="email-file" multiple>
      <div class="file-info" id="email-file-info"></div>
    </div>
    <div class="field">
      <label>收件人邮箱</label>
      <input type="email" id="email-addr" placeholder="请输入对方邮箱地址">
    </div>
    <button class="ts-btn" id="email-btn" onclick="sendEmail()">📤 发送到邮箱</button>
    <div class="result" id="email-result"></div>
  </div>

  <div id="panel-code" class="panel">
    <div class="fs-subtabs">
      <button class="fs-subtab active" onclick="switchSubTab('up')">📤 上传</button>
      <button class="fs-subtab" onclick="switchSubTab('down')">📥 下载</button>
    </div>

    <div id="sub-up" class="fs-subpanel active">
      <div class="field">
        <label>选择文件</label>
        <input type="file" id="code-file" multiple>
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

    <div id="sub-down" class="fs-subpanel">
      <div class="field">
        <label>6位提取码</label>
        <input id="code-inp" maxlength="6" placeholder="输入6位提取码" oninput="this.value=this.value.replace(/\D/g,'')">
      </div>
      <button class="ts-btn" id="info-btn" onclick="check()">🔍 查询文件</button>
      <div class="result" id="info-result"></div>
      <div id="down-area" style="display:none">
        <div id="file-list"></div>
        <div style="margin-top:12px;text-align:center;font-size:.8rem;color:var(--text-meta,#999)" id="remain-hint"></div>
      </div>
    </div>
  <div class="admin-bar">
    <span class="limit-hint">🔒 文件上限50MB | 邮件每小时5次</span>
    <span>
      <span class="admin-badge" id="admin-badge">👑 管理员模式</span>
      <a class="admin-toggle" href="javascript:tryAdmin()">🔑 管理员</a>
    </span>
  </div>
</div>

<script>
const API = 'https://file.ray2.asia';
let _dc = 3;
var _admin = false;
var _adminPwd = sessionStorage.getItem('fs_admin_pwd') || '';
if (_adminPwd) {
  (async function() {
    try {
      var r = await fetch(API + '/api/check-admin', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({admin_pwd: _adminPwd}),
      });
      var d = await r.json();
      if (d.admin) {
        _admin = true;
        document.getElementById('admin-badge').style.display = 'inline';
        document.querySelector('.limit-hint').textContent = '👑 管理员模式 | 文件上限200MB | 频率无限制';
      } else {
        _adminPwd = '';
        sessionStorage.removeItem('fs_admin_pwd');
      }
    } catch(e) {}
  })();
}

// 管理员模式
async function tryAdmin() {
  var pwd = prompt('🔑 管理员密码：');
  if (!pwd) return;
  try {
    var r = await fetch(API + '/api/check-admin', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({admin_pwd: pwd}),
    });
    var d = await r.json();
    if (d.admin) {
      _admin = true;
      _adminPwd = pwd;
      sessionStorage.setItem('fs_admin_pwd', pwd);
      document.getElementById('admin-badge').style.display = 'inline';
      document.querySelector('.limit-hint').textContent = '👑 管理员模式 | 文件上限200MB | 频率无限制';
      alert('✅ 管理员模式已开启，限制已解除');
    } else {
      alert('❌ 密码错误');
    }
  } catch(e) { alert('验证失败'); }
}

function adminPwdField() { return _adminPwd ? _adminPwd : ''; }

function switchTab(t) {
  var tabs = document.querySelectorAll('#file-share-app > .fs-tabs > .fs-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.toggle('active', tabs[i].textContent.indexOf(t === 'email' ? '邮箱' : '提取') >= 0);
  }
  var panels = document.querySelectorAll('#file-share-app > .panel');
  for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
  document.getElementById('panel-' + t).classList.add('active');
}

function switchSubTab(t) {
  var tabs = document.querySelectorAll('.fs-subtab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.toggle('active', tabs[i].textContent.indexOf(t === 'up' ? '上传' : '下载') >= 0);
  }
  var panels = document.querySelectorAll('.fs-subpanel');
  for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
  document.getElementById('sub-' + t).classList.add('active');
}

function chg(d) {
  _dc = Math.max(1, Math.min(10, _dc + d));
  document.getElementById('dcnt').textContent = _dc;
}

document.getElementById('email-file').onchange = function() { fi(this, 'email-file-info'); };
document.getElementById('code-file').onchange = function() { fi(this, 'code-file-info'); };

function fi(inp, id) {
  var el = document.getElementById(id);
  if (!inp.files || !inp.files[0]) { el.textContent = ''; return; }
  var total = 0, names = [];
  for (var i = 0; i < inp.files.length; i++) {
    total += inp.files[i].size;
    names.push(inp.files[i].name);
  }
  if (total > 50 * 1024 * 1024) { el.innerHTML = '<span style="color:#e53935">文件总大小超过50MB限制</span>'; inp.value = ''; return; }
  el.innerHTML = '<strong>' + inp.files.length + ' 个文件</strong>，共 ' + sz(total) + '<br>' + names.join('、');
}

async function sendEmail() {
  var files = document.getElementById('email-file').files;
  var e = document.getElementById('email-addr').value.trim();
  if (!files || files.length === 0) return sr('email', '请选择文件', 'e');
  if (!e) return sr('email', '请填写收件人邮箱', 'e');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return sr('email', '邮箱格式不正确', 'e');
  btn('email-btn', 1, '⏳ 上传发送中...');
  var fd = new FormData();
  for (var fi = 0; fi < files.length; fi++) fd.append('file', files[fi]);
  fd.append('email', e);
  if (_adminPwd) fd.append('admin_pwd', _adminPwd);
  try {
    var r = await fetch(API + '/api/send-email', { method: 'POST', body: fd });
    var d = await r.json();
    if (d.success) sr('email', '✅ ' + d.message, 's');
    else sr('email', '❌ ' + (d.error || '发送失败'), 'e');
  } catch (err) { sr('email', '❌ 网络错误', 'e'); }
  btn('email-btn', 0, '📤 发送到邮箱');
}

async function upFile() {
  var files = document.getElementById('code-file').files;
  if (!files || files.length === 0) return sr('up', '请选择文件', 'e');
  btn('up-btn', 1, '⏳ 上传中...');
  var fd = new FormData();
  for (var fi = 0; fi < files.length; fi++) fd.append('file', files[fi]);
  fd.append('maxDownloads', _dc);
  if (_adminPwd) fd.append('admin_pwd', _adminPwd);
  try {
    var r = await fetch(API + '/api/upload', { method: 'POST', body: fd });
    var d = await r.json();
    if (d.code) {
      var fileCount = d.files ? d.files.length : 1;
      var totalSize = 0;
      if (d.files) for (var fi = 0; fi < d.files.length; fi++) totalSize += d.files[fi].size;
      sr('up', '<div style="font-size:.9rem;margin-bottom:4px">提取码</div><div style="font-size:2.5rem;font-weight:bold;letter-spacing:8px;margin:4px 0">' + d.code + '</div><div style="font-size:.8rem;opacity:.7">' + fileCount + ' 个文件，共 ' + sz(totalSize) + '<br>可下载 ' + _dc + ' 次</div>', 's');
    } else {
      sr('up', '❌ ' + (d.error || '上传失败'), 'e');
    }
  } catch (err) { sr('up', '❌ 网络错误', 'e'); }
  btn('up-btn', 0, '📤 上传获取提取码');
}

async function check() {
  var code = document.getElementById('code-inp').value;
  if (code.length !== 6) return sr('info', '请输入6位提取码', 'e');
  btn('info-btn', 1, '⏳ 查询中...');
  try {
    var r = await fetch(API + '/api/info?code=' + code);
    var d = await r.json();
    if (d.files && d.files.length > 0) {
      sr('info', '📊 剩余下载次数: ' + d.remaining, 's');
      var listHtml = '';
      for (var fi = 0; fi < d.files.length; fi++) {
        listHtml += '<div class="file-item"><span class="file-item-name">📄 ' + d.files[fi].name + '</span><span class="file-item-size">' + sz(d.files[fi].size) + '</span><button class="file-dl-btn" data-code="' + code + '" data-idx="' + fi + '" data-remaining="' + d.remaining + '" data-total="' + d.files.length + '">下载</button></div>';
      }
      document.getElementById('file-list').innerHTML = listHtml;
      document.getElementById('down-area').style.display = 'block';
      document.getElementById('remain-hint').textContent = '剩余下载次数: ' + d.remaining + '，下载全部文件后自动扣减';

      // 绑定下载按钮事件
      var btns = document.querySelectorAll('.file-dl-btn');
      for (var fi = 0; fi < btns.length; fi++) {
        btns[fi].onclick = function() {
          var code = this.dataset.code;
          var idx = this.dataset.idx;
          var remaining = parseInt(this.dataset.remaining);
          var total = parseInt(this.dataset.total);
          downFile(code, idx, remaining, total);
        };
      }
    } else {
      sr('info', '❌ ' + (d.error || '无效'), 'e');
      document.getElementById('down-area').style.display = 'none';
    }
  } catch (err) { sr('info', '❌ 网络错误', 'e'); }
  btn('info-btn', 0, '🔍 查询文件');
}

async function downFile(code, idx, remaining, total) {
  try {
    var r = await fetch(API + '/api/download?code=' + code + '&idx=' + idx);
    if (!r.ok) { var d = await r.json(); alert('❌ ' + (d.error || '下载失败')); return; }
    var blob = await r.blob();
    var dispo = r.headers.get('Content-Disposition') || '';
    var m = dispo.match(/filename="?([^";\n]+)"?/);
    var fn = m ? decodeURIComponent(m[1]) : 'download';
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fn;
    a.click();
    URL.revokeObjectURL(a.href);

    // 所有文件都下载完毕后才扣减次数
    var doneBtns = document.querySelectorAll('.file-dl-btn[style*="opacity:0.4"]');
    var totalBtns = document.querySelectorAll('.file-dl-btn');
    var downloaded = 0;
    for (var i = 0; i < totalBtns.length; i++) {
      if (totalBtns[i].style.opacity === '0.4') downloaded++;
    }

    // 标记当前文件已下载
    for (var i = 0; i < totalBtns.length; i++) {
      if (totalBtns[i].dataset.idx === idx) {
        totalBtns[i].style.opacity = '0.4';
        totalBtns[i].textContent = '✅';
        totalBtns[i].disabled = true;
      }
    }

    downloaded++;

    if (downloaded >= total) {
      // 全部下载完成，扣减次数
      var r2 = await fetch(API + '/api/complete-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code }),
      });
      var d2 = await r2.json();
      if (d2.success) {
        if (d2.remaining > 0) {
          document.getElementById('remain-hint').textContent = '✅ 已扣减1次，剩余 ' + d2.remaining + ' 次';
        } else {
          document.getElementById('remain-hint').textContent = '✅ 下载次数已用完，文件已销毁';
        }
      }
    }
  } catch (err) { alert('❌ 下载失败'); }
}

function sr(p, m, t) {
  var el = document.getElementById(p + '-result');
  if (el) { el.className = 'result ' + (t === 's' ? 'success' : 'error'); el.innerHTML = m; }
}

function btn(id, d, t) {
  var b = document.getElementById(id);
  if (b) { b.disabled = d; b.textContent = t; }
}

function sz(b) {
  if (b < 1024) return b + 'B';
  if (b < 1048576) return (b / 1024).toFixed(1) + 'KB';
  return (b / 1048576).toFixed(1) + 'MB';
}
</script>

<style>
#file-share-app .fs-subtabs { display:flex; gap:0; margin-bottom:16px; }
#file-share-app .fs-subtab { flex:1; padding:10px; border:1px solid var(--border-color,#ddd); background:var(--card-bg,#f9f9f9); cursor:pointer; font-size:.9rem; color:var(--text-meta,#999); transition:all .2s; text-align:center; }
#file-share-app .fs-subtab:first-child { border-radius:6px 0 0 6px; }
#file-share-app .fs-subtab:last-child { border-radius:0 6px 6px 0; }
#file-share-app .fs-subtab.active { background:var(--theme-color,#425aef); color:#fff; border-color:var(--theme-color,#425aef); }
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
.file-item { display:flex; align-items:center; padding:10px 12px; border:1px solid var(--border-color,#eee); border-radius:6px; margin-bottom:6px; gap:8px; }
.file-item-name { flex:1; font-size:.85rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--text-color,#333); }
.file-item-size { font-size:.8rem; color:var(--text-meta,#999); white-space:nowrap; }
.file-dl-btn { padding:4px 14px; border:none; border-radius:4px; background:var(--theme-color,#425aef); color:#fff; cursor:pointer; font-size:.82rem; white-space:nowrap; }
.file-dl-btn:hover { opacity:.85; }
.admin-bar { margin-top:24px; padding-top:12px; border-top:1px solid var(--border-color,#eee); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; }
.admin-bar .limit-hint { font-size:.78rem; color:var(--text-meta,#999); }
.admin-bar .admin-toggle { font-size:.78rem; color:var(--text-meta,#999); cursor:pointer; text-decoration:none; }
.admin-bar .admin-toggle:hover { color:var(--theme-color,#425aef); }
.admin-badge { display:none; font-size:.78rem; color:var(--theme-color,#425aef); font-weight:600; }
.fs-subpanel { display:none; }
.fs-subpanel.active { display:block; }
#sub-up.fs-subpanel.active { display:block; }
#sub-down.fs-subpanel.active { display:block; }
</style>
{% endraw %}
