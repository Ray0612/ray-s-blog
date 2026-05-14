---
title: 评论管理
date: 2026-05-14
---

<link rel="stylesheet" href="/css/tools.css">

<style>
.cmt-item { padding: 16px; border: 1px solid var(--border-color,#eee); border-radius: 8px; margin-bottom: 12px; }
.cmt-meta { font-size: .85rem; color: var(--text-meta,#999); margin-bottom: 8px; }
.cmt-content { font-size: .9rem; margin-bottom: 8px; }
.cmt-del { padding: 4px 16px; border: 1px solid #e53935; color: #e53935; border-radius: 4px; cursor: pointer; font-size: .8rem; }
.cmt-del:hover { background: #e53935; color: #fff; }
.login-box { max-width: 320px; margin: 60px auto; text-align: center; }
.login-box input { width: 100%; padding: 12px; border: 1px solid var(--border-color,#eee); border-radius: 8px; margin: 8px 0; outline: none; box-sizing: border-box; }
.login-box button { width: 100%; padding: 12px; background: var(--theme-color,#425aef); color: #fff; border: none; border-radius: 8px; cursor: pointer; }
#cmt-area { display: none; }
</style>

<div id="login-box" class="login-box">
  <h3>🔑 管理员登录</h3>
  <input type="password" id="admin-pwd" placeholder="输入管理密码" onkeydown="if(event.key==='Enter')login()">
  <button onclick="login()">登录</button>
  <p id="login-err" style="color:#e53935;display:none;font-size:.85rem;margin-top:8px">密码错误</p>
</div>

<div id="cmt-area">
  <h3>📋 评论管理</h3>
  <div id="cmt-list"></div>
</div>

<script>
const API = 'https://comment.ray2.asia';
let token = '';

async function login() {
  const pwd = document.getElementById('admin-pwd').value;
  try {
    const r = await fetch(API + '/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({event: 'LOGIN', password: pwd})
    });
    const d = await r.json();
    if (d.code === 0 && d.accessToken) {
      token = d.accessToken;
      document.getElementById('login-box').style.display = 'none';
      document.getElementById('cmt-area').style.display = 'block';
      loadComments();
    } else {
      document.getElementById('login-err').style.display = 'block';
    }
  } catch(e) {
    document.getElementById('login-err').textContent = '网络错误';
    document.getElementById('login-err').style.display = 'block';
  }
}

async function loadComments() {
  try {
    const r = await fetch(API + '/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({event: 'COMMENT_GET_FOR_ADMIN', url: '/', per: 50, page: 1, accessToken: token})
    });
    const d = await r.json();
    if (d.code === 0) {
      const list = document.getElementById('cmt-list');
      list.innerHTML = '';
      (d.data || []).forEach(cmt => {
        list.innerHTML += '<div class="cmt-item"><div class="cmt-meta">' + escapeHtml(cmt.nick) + ' · ' + new Date(cmt.created).toLocaleString() + ' · <a href="' + cmt.href + '" target="_blank">查看文章</a></div><div class="cmt-content">' + cmt.comment + '</div><button class="cmt-del" onclick="delComment(\'' + cmt._id + '\')">🗑️ 删除</button></div>';
      });
      if (!d.data || d.data.length === 0) list.innerHTML = '<p style="color:var(--text-meta,#999)">暂无评论</p>';
    } else {
      document.getElementById('cmt-list').innerHTML = '<p style="color:#e53935">加载失败：' + d.message + '</p>';
    }
  } catch(e) {
    document.getElementById('cmt-list').innerHTML = '<p style="color:#e53935">网络错误</p>';
  }
}

async function delComment(id) {
  if (!confirm('确定删除这条评论？')) return;
  try {
    const r = await fetch(API + '/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({event: 'COMMENT_DELETE_FOR_ADMIN', _id: id, accessToken: token})
    });
    const d = await r.json();
    if (d.code === 0) { alert('已删除'); loadComments(); }
    else { alert('删除失败：' + d.message); }
  } catch(e) { alert('网络错误'); }
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
</script>
