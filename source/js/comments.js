// 自定义评论系统
(function(){
var API = 'https://comment.ray2.asia';
var url = window.location.pathname;
var wrap = document.getElementById('my-comments');
if (!wrap) return;

function load() {
  fetch(API + '/api/comments?url=' + encodeURIComponent(url))
    .then(function(r){return r.json()})
    .then(function(list){
      var html = '';
      list.forEach(function(c){
        var d = new Date(c.created_at);
        html += '<div class="my-cmt"><div class="my-cmt-nick">' + esc(c.nick) + '</div><div class="my-cmt-time">' + d.toLocaleString() + '</div><div class="my-cmt-text">' + esc(c.content).replace(/\n/g,'<br>') + '</div></div>';
      });
      if (!html) html = '<p style="text-align:center;color:var(--text-meta,#999);padding:20px 0;font-size:.9rem">暂无评论</p>';
      wrap.innerHTML = '<div class="my-cmt-list">' + html + '</div><div class="my-cmt-form" style="margin-top:16px"><input id="my-cmt-nick" placeholder="昵称" maxlength="20"><textarea id="my-cmt-input" placeholder="说点什么..." rows="3" maxlength="2000"></textarea><button id="my-cmt-btn" onclick="submitCmt()">发表评论</button></div>';
    }).catch(function(){
      wrap.innerHTML = '<p style="text-align:center;color:var(--text-meta,#999);padding:20px 0;font-size:.9rem">加载失败</p>';
    });
}

window.submitCmt = function() {
  var nick, content, btn;
  nick = document.getElementById('my-cmt-nick');
  content = document.getElementById('my-cmt-input');
  btn = document.getElementById('my-cmt-btn');
  if (!nick || !content) return;
  nick = nick.value.trim();
  content = content.value.trim();
  if (!nick) { alert('请输入昵称'); return; }
  if (!content) { alert('请输入内容'); return; }
  btn.disabled = true; btn.textContent = '提交中...';
  fetch(API + '/api/comments', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nick: nick, content: content, url: url})
  }).then(function(r){return r.json()}).then(function(d){
    if (d.success) load();
    else alert(d.error || '提交失败');
  }).catch(function(){alert('网络错误')})
  .finally(function(){btn.disabled = false; btn.textContent = '发表评论';});
};

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

load();
})();
