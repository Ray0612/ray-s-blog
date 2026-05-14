---
title: 评论管理
date: 2026-05-14
comments: false
---

<style>
.admin-box{max-width:600px;margin:40px auto;text-align:center}
.admin-box input{width:100%;padding:12px;border:1px solid var(--border-color,#eee);border-radius:8px;margin:8px 0;outline:none;box-sizing:border-box}
.admin-box button{width:100%;padding:12px;background:var(--theme-color,#425aef);color:#fff;border:none;border-radius:8px;cursor:pointer}
.cmt-item{padding:16px;border:1px solid var(--border-color,#eee);border-radius:8px;margin-bottom:12px;text-align:left}
.cmt-meta{font-size:.85rem;color:var(--text-meta,#999);margin-bottom:6px}
.cmt-text{font-size:.9rem;margin-bottom:8px;white-space:pre-wrap}
.cmt-del{padding:4px 16px;border:1px solid #e53935;color:#e53935;border-radius:4px;cursor:pointer;font-size:.8rem;background:none}
.cmt-del:hover{background:#e53935;color:#fff}
#login-area,#admin-area{display:none}
</style>

<div id="login-area" class="admin-box">
  <h3>🔑 管理员登录</h3>
  <input type="password" id="pwd" placeholder="管理密码" onkeydown="if(event.key==='Enter')login()">
  <button onclick="login()">登录</button>
  <p id="err" style="color:#e53935;display:none;font-size:.85rem;margin-top:8px">密码错误</p>
</div>

<div id="admin-area">
  <h3>📋 评论管理</h3>
  <div id="cmt-list"></div>
</div>

<script>
var API = 'https://comment.ray2.asia';
document.getElementById('login-area').style.display = 'block';

function login() {
  var pwd = document.getElementById('pwd').value;
  fetch(API + '/api/admin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({action: 'list', password: pwd})
  }).then(function(r){
    if (!r.ok) throw new Error('密码错误');
    return r.json();
  }).then(function(list){
    document.getElementById('login-area').style.display = 'none';
    document.getElementById('admin-area').style.display = 'block';
    var html = '';
    list.forEach(function(c){
      var d = new Date(c.created_at);
      html += '<div class="cmt-item"><div class="cmt-meta">' + esc(c.nick) + ' · ' + d.toLocaleString() + ' · ' + c.url + '</div><div class="cmt-text">' + esc(c.content) + '</div><button class="cmt-del" onclick="delCmt(' + c.id + ')">🗑️ 删除</button></div>';
    });
    if (!list.length) html = '<p style="color:var(--text-meta,#999)">暂无评论</p>';
    document.getElementById('cmt-list').innerHTML = html;
    window._pwd = pwd;
  }).catch(function(e){
    document.getElementById('err').style.display = 'block';
  });
}

function delCmt(id) {
  if (!confirm('确定删除？')) return;
  fetch(API + '/api/admin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({action: 'delete', id: id, password: window._pwd})
  }).then(function(r){return r.json()}).then(function(d){
    if (d.success) { login(); }
    else { alert('删除失败'); }
  });
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
</script>
