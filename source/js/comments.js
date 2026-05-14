// Ray 评论区 v2 - 完整版
(function(){
console.log('rc: loading...');
var API = 'https://comment.ray2.asia';
var url = window.location.pathname;

// 首页不显示
if (document.getElementById('recent-posts')) { console.log('rc: homepage, skip'); return; }
if (document.getElementById('rc-wrap')) { console.log('rc: already loaded'); return; }

var EMOJIS = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🥰','😘','😜','😝','🤗','🤔','😐','😶','🙄','😏','😒','😞','😟','😠','😡','😢','😭','😤','😱','😨','😰','😥','😪','😓','🤩','🥳','👏','👍','👎','💪','🤝','✌️','👀','❤️','💔','🔥','⭐','✨','💡','📌','🎉','🎊','🙏','💀','☀️','🌈','🌙','🌸','🌺','🍀','🎵','🎶','⚡','💯','✅','❌','❓','❗','💬','💭','📝','🔗'];var DEFAULT_AVATAR = '/img/default-avatar.png';var saved = JSON.parse(localStorage.getItem('rc_user') || '{}');

var style = document.createElement('style');
style.textContent = '#rc-wrap{max-width:100%;margin-top:24px}.rc-head{font-size:1.1em;font-weight:600;padding-bottom:8px;margin-bottom:16px;border-bottom:1px solid var(--border-color,#e8e8e8);display:flex;align-items:center;gap:6px}.rc-form{display:flex;gap:12px;margin-bottom:24px}.rc-form-avatar{width:44px;height:44px;border-radius:50%;flex-shrink:0;object-fit:cover;cursor:pointer}.rc-form-body{flex:1}.rc-form-row{display:flex;gap:8px;margin-bottom:8px}.rc-form-row input{flex:1;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none}.rc-form-row input:focus{border-color:var(--theme-color,#425aef)}.rc-textarea-wrap textarea{width:100%;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;resize:vertical;min-height:72px;box-sizing:border-box;font-family:inherit;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none}.rc-textarea-wrap textarea:focus{border-color:var(--theme-color,#425aef)}.rc-toolbar{display:flex;align-items:center;justify-content:space-between;margin-top:6px}.rc-toolbar-left{display:flex;gap:4px}.rc-emoji-btn{padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:1rem;background:var(--card-bg,#fff)}.rc-emoji-btn:hover{background:var(--theme-color,#425aef);color:#fff;border-color:var(--theme-color,#425aef)}.rc-emoji-panel{display:none;flex-wrap:wrap;gap:4px;padding:8px;margin-top:4px;border:1px solid var(--border-color,#ddd);border-radius:6px;background:var(--card-bg,#fff);max-height:120px;overflow-y:auto}.rc-emoji-panel.open{display:flex}.rc-emoji-panel span{width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:4px;font-size:1.1rem}.rc-emoji-panel span:hover{background:var(--theme-color,#425aef)}.rc-submit{padding:6px 20px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer;font-size:.9rem}.rc-submit:disabled{opacity:.5}.rc-item{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border-color,#f0f0f0)}.rc-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;object-fit:cover;border:1px solid var(--border-color,#eee)}.rc-body{flex:1;min-width:0}.rc-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.85rem;margin-bottom:4px}.rc-nick{font-weight:600;color:var(--text-color,#333)}.rc-badge{font-size:.72rem;padding:1px 6px;border-radius:3px;background:var(--theme-color,#425aef);color:#fff}.rc-time{color:var(--text-meta,#999);font-size:.8rem}.rc-menu-wrap{position:relative;margin-left:auto;cursor:pointer;color:var(--text-meta,#999);font-size:1.1rem;padding:0 4px;border-radius:4px;user-select:none}.rc-menu-wrap:hover{background:var(--border-color,#eee)}.rc-menu{display:none;position:absolute;right:0;top:100%;background:var(--card-bg,#fff);border:1px solid var(--border-color,#ddd);border-radius:6px;box-shadow:0 2px 12px rgba(0,0,0,.1);z-index:10;min-width:100px;padding:4px 0}.rc-menu.open{display:block}.rc-menu-item{padding:6px 16px;font-size:.85rem;cursor:pointer;color:var(--text-color,#333)}.rc-menu-item:hover{background:var(--border-color,#f0f0f0)}.rc-menu-item.danger{color:#e53935}.rc-text{font-size:.9rem;line-height:1.6;color:var(--text-color,#333);word-break:break-word;white-space:pre-wrap}.rc-empty{text-align:center;padding:30px 0;color:var(--text-meta,#999);font-size:.9rem}.rc-loading{text-align:center;padding:20px;color:var(--text-meta,#999);font-size:.9rem}.rc-pwd-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:999;display:flex;align-items:center;justify-content:center}.rc-pwd-box{background:var(--card-bg,#fff);padding:24px;border-radius:12px;max-width:300px;width:90%;text-align:center}.rc-pwd-box h4{margin:0 0 12px}.rc-pwd-box input{width:100%;padding:8px;border:1px solid var(--border-color,#ddd);border-radius:6px;margin-bottom:8px;outline:none;box-sizing:border-box}.rc-pwd-box button{padding:6px 24px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer}';
document.head.appendChild(style);

// 找到文章并插入评论区
function init() {
  var article = document.querySelector('article');
  if (!article) { console.log('rc: article not found, retrying...'); setTimeout(init, 500); return; }
  console.log('rc: article found, creating comments');

  var wrap = document.createElement('div');
  wrap.id = 'rc-wrap';
  article.parentNode.insertBefore(wrap, article.nextSibling);
  wrap.innerHTML = '<div class="rc-loading">⏳ 加载评论区...</div>';

  loadComments(wrap);
}

function loadComments(wrap) {
  fetch(API + '/api/comments?url=' + encodeURIComponent(url))
    .then(function(r){return r.json()})
    .then(function(list){
      renderComments(wrap, list);
    })
    .catch(function(){ wrap.innerHTML = '<div class="rc-loading">加载失败</div>'; });
}

function renderComments(wrap, list) {
  var html = '<div class="rc-head"><i class="fas fa-comments"></i> 评论</div>';
  html += '<div class="rc-form"><img class="rc-form-avatar" src="' + (saved.avatar || DEFAULT_AVATAR) + '" id="rc-my-avatar"><div class="rc-form-body">';
  html += '<div class="rc-form-row"><input id="rc-nick" placeholder="昵称 *" value="' + esc(saved.nick||'') + '"><input id="rc-email" placeholder="邮箱 *" value="' + esc(saved.email||'') + '"></div>';
  html += '<div class="rc-textarea-wrap"><textarea id="rc-text" placeholder="说点什么..." rows="3"></textarea></div>';
  html += '<div class="rc-emoji-panel" id="rc-emoji-panel"></div>';
  html += '<div class="rc-toolbar"><div class="rc-toolbar-left"><button class="rc-emoji-btn" id="rc-emoji-btn">😊</button></div><div class="rc-toolbar-right"><button class="rc-submit" id="rc-submit">发表评论</button></div></div>';
  html += '</div></div>';

  html += '<div id="rc-list">';
  if (!list.length) {
    html += '<div class="rc-empty">暂无评论</div>';
  } else {
    list.forEach(function(c){
      html += '<div class="rc-item" data-id="' + c.id + '">';
      html += '<img class="rc-avatar" src="' + esc(c.avatar||DEFAULT_AVATAR) + '">';
      html += '<div class="rc-body"><div class="rc-meta">';
      html += '<span class="rc-nick">' + esc(c.nick) + '</span>';
      if (c.is_admin) html += '<span class="rc-badge">作者</span>';
      html += '<span class="rc-time">' + new Date(c.created_at).toLocaleString() + '</span>';
      html += '<span class="rc-menu-wrap" onclick="rcToggleMenu(this)">⋯<div class="rc-menu"><div class="rc-menu-item danger" onclick="rcDelete(' + c.id + ')">删除</div></div></span>';
      html += '</div><div class="rc-text">' + esc(c.content).replace(/\n/g,'<br>') + '</div>';
      html += '</div></div>';
    });
  }
  html += '</div>';

  wrap.innerHTML = html;
  setupEvents(wrap);
}

function setupEvents(wrap) {
  document.getElementById('rc-my-avatar').onclick = function(){
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/png,image/jpeg,image/gif,image/webp';
    inp.onchange = function(){
      var f = inp.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function(e){
        saved.avatar = e.target.result;
        localStorage.setItem('rc_user', JSON.stringify(saved));
        document.getElementById('rc-my-avatar').src = saved.avatar;
      };
      r.readAsDataURL(f);
    };
    inp.click();
  };

  // 填充 emoji
  var ep = document.getElementById('rc-emoji-panel');
  EMOJIS.forEach(function(e){
    var s = document.createElement('span');
    s.textContent = e;
    s.onclick = function(){ document.getElementById('rc-text').value += e; ep.classList.remove('open'); };
    ep.appendChild(s);
  });
  document.getElementById('rc-emoji-btn').onclick = function(){
    ep.classList.toggle('open');
  };

  document.getElementById('rc-submit').onclick = function(){
    submitCmt(wrap);
  };
}

function submitCmt(wrap) {
  var nick = document.getElementById('rc-nick').value.trim();
  var email = document.getElementById('rc-email').value.trim();
  var content = document.getElementById('rc-text').value.trim();
  if (!nick || !email || !content) { alert('请填写昵称、邮箱和内容'); return; }
  saved.nick = nick; saved.email = email;
  localStorage.setItem('rc_user', JSON.stringify(saved));
  var btn = document.getElementById('rc-submit');
  btn.disabled = true; btn.textContent = '提交中...';
  fetch(API + '/api/comments', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nick:nick, email:email, content:content, avatar:saved.avatar||'', url:url, adminKey:saved.adminKey||''})})
    .then(function(r){return r.json()}).then(function(d){
      if (d.id) {
        saved['token_'+d.id] = d.user_token;
        localStorage.setItem('rc_user', JSON.stringify(saved));
        document.getElementById('rc-text').value = '';
        loadComments(wrap);
      } else { alert(d.error || '提交失败'); }
    }).catch(function(){alert('网络错误')})
    .finally(function(){btn.disabled = false; btn.textContent = '发表评论';});
}

window.rcToggleMenu = function(el) {
  document.querySelectorAll('.rc-menu.open').forEach(function(m){if(m !== el.lastElementChild) m.classList.remove('open');});
  el.lastElementChild.classList.toggle('open');
};

window.rcDelete = function(id) {
  var token = saved['token_'+id];
  if (token) {
    fetch(API+'/api/comments/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,token:token})})
      .then(function(r){return r.json()}).then(function(d){if(d.success) loadComments(document.getElementById('rc-wrap'));});
  } else {
    var overlay = document.createElement('div');
    overlay.className = 'rc-pwd-overlay';
    overlay.innerHTML = '<div class="rc-pwd-box"><h4>管理员验证</h4><input type="password" id="rc-admin-pwd" placeholder="管理密码"><p style="color:#e53935;font-size:.82rem;display:none" id="rc-pwd-err">密码错误</p><button onclick="rcAdminDel('+id+')">确认删除</button></div>';
    overlay.onclick = function(e){if(e.target===overlay) document.body.removeChild(overlay);};
    document.body.appendChild(overlay);
    setTimeout(function(){document.getElementById('rc-admin-pwd').focus();},100);
  }
};

window.rcAdminDel = function(id) {
  var pwd = document.getElementById('rc-admin-pwd').value;
  fetch(API+'/api/comments/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,admin:pwd})})
    .then(function(r){return r.json()}).then(function(d){
      if(d.success){ document.body.removeChild(document.querySelector('.rc-pwd-overlay')); loadComments(document.getElementById('rc-wrap')); }
      else { document.getElementById('rc-pwd-err').style.display='block'; }
    });
};

function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// 启动
console.log('rc: starting...');
init();
})();
