---
title: 教学资料
date: 2026-05-14
---

<style>
.lock-wrap {
  max-width: 400px; margin: 80px auto; text-align: center; padding: 40px;
  background: var(--card-bg, #fff); border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.lock-wrap input {
  width: 100%; padding: 12px; font-size: 16px; border: 1px solid #ddd; border-radius: 8px;
  box-sizing: border-box; margin: 16px 0; outline: none;
}
.lock-wrap input:focus { border-color: #425aef; }
.lock-wrap button {
  width: 100%; padding: 12px; font-size: 16px; border: none; border-radius: 8px;
  background: #425aef; color: #fff; cursor: pointer;
}
.lock-wrap button:hover { opacity: 0.9; }
.lock-wrap .hint { color: #999; font-size: 14px; margin-top: 12px; }
#content { display: none; }
</style>

<div id="lock">
  <div class="lock-wrap">
    <div style="font-size: 48px; margin-bottom: 8px;">🔒</div>
    <h3>请输入口令</h3>
    <input type="password" id="pwd" placeholder="输入口令" onkeydown="if(event.key==='Enter')checkPwd()">
    <button onclick="checkPwd()">确认</button>
    <p id="err" style="color:red;display:none;font-size:14px;">口令错误</p>
    <p class="hint">仅限我的学生使用</p>
  </div>
</div>

<div id="content">

<!-- ===== 这里放资料内容 ===== -->
<h2>📂 教学资料</h2>
<p>口令验证通过，以下是资料列表：</p>
<ul>
  <li>资料一（待上传）</li>
  <li>资料二（待上传）</li>
</ul>

</div>

<script>
function checkPwd() {
  if (document.getElementById('pwd').value === 'Ray的学生') {
    document.getElementById('lock').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  } else {
    document.getElementById('err').style.display = 'block';
  }
}
</script>
