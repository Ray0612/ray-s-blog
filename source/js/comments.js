// 自定义评论系统
(function(){
var API = 'https://comment.ray2.asia';
var wrap = document.getElementById('twikoo-wrap');
if (!wrap) return;

// 替换 Twikoo 内容为我们的评论系统
var url = window.location.pathname;

function load() {
  fetch(API + '/api/comments?url=' + encodeURIComponent(url))
    .then(function(r){return r.json()})
    .then(function(list){
      var html = '<div class="my-cmt-list">';
      if (!list.length) {
        html += '<p style="color:var(--text-meta,#999);font-size:.9rem;text-align:center;padding:20px 0">暂无评论，来说两句吧</p>';
      } else {
        list.forEach(function(c){
          var d = new Date(c.created_at);
          html += '<div class="my-cmt"><div class="my-cmt-nick">' + esc(c.nick) + '</div><div class="my-cmt-time">' + d.toLocaleString() + '</div><div class="my-cmt-text">' + esc(c.content).replace(/\n/g,'<br>') + '</div></div>';
        });
      }
      html += '</div>';
      html += '<div class="my-cmt-form"><input id="my-cmt-nick" placeholder="昵称" maxlength="20"><textarea id="my-cmt-input" placeholder="说点什么..." rows="3" maxlength="2000"></textarea><button id="my-cmt-btn" onclick="_submitCmt()">发表评论</button></div>';
      wrap.innerHTML = html;
    });
}

window._submitCmt = function() {
  var nick = document.getElementById('my-cmt-nick').value.trim();
  var content = document.getElementById('my-cmt-input').value.trim();
  if (!nick) { alert('请输入昵称'); return; }
  if (!content) { alert('请输入内容'); return; }
  var btn = document.getElementById('my-cmt-btn');
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
