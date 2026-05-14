// Ray 评论区
(function(){
var API = 'https://comment.ray2.asia';
var url = window.location.pathname;

if (document.querySelector('#recent-posts')) return;
if (document.getElementById('rc-wrap')) return;

// ===== 样式 =====
var style = document.createElement('style');
style.textContent = `
#rc-wrap{max-width:100%;margin-top:24px}
.rc-head{font-size:1.1em;font-weight:600;padding-bottom:8px;margin-bottom:16px;border-bottom:1px solid var(--border-color,#e8e8e8);display:flex;align-items:center;gap:6px}
.rc-form{display:flex;gap:12px;margin-bottom:24px}
.rc-form-avatar{width:44px;height:44px;border-radius:50%;flex-shrink:0;object-fit:cover}
.rc-form-body{flex:1}
.rc-form-row{display:flex;gap:8px;margin-bottom:8px}
.rc-form-row input{flex:1;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none}
.rc-form-row input:focus{border-color:var(--theme-color,#425aef)}
.rc-textarea-wrap{position:relative}
.rc-textarea-wrap textarea{width:100%;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;resize:vertical;min-height:72px;box-sizing:border-box;font-family:inherit;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none}
.rc-textarea-wrap textarea:focus{border-color:var(--theme-color,#425aef)}
.rc-toolbar{display:flex;align-items:center;justify-content:space-between;margin-top:6px}
.rc-toolbar-left{display:flex;gap:4px}
.rc-emoji-btn,.rc-toolbar-right button{padding:4px 12px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:.82rem;background:var(--card-bg,#fff);color:var(--text-color,#333);transition:.15s}
.rc-emoji-btn:hover,.rc-toolbar-right button:hover{background:var(--theme-color,#425aef);color:#fff;border-color:var(--theme-color,#425aef)}
.rc-emoji-btn{padding:4px 8px;font-size:1rem}
.rc-emoji-panel{display:none;flex-wrap:wrap;gap:4px;padding:8px;margin-top:4px;border:1px solid var(--border-color,#ddd);border-radius:6px;background:var(--card-bg,#fff);max-height:120px;overflow-y:auto}
.rc-emoji-panel.open{display:flex}
.rc-emoji-panel span{width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:4px;font-size:1.1rem}
.rc-emoji-panel span:hover{background:var(--theme-color,#425aef);color:#fff}
.rc-submit{padding:6px 20px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer;font-size:.9rem}
.rc-submit:disabled{opacity:.5;cursor:default}
.rc-item{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border-color,#f0f0f0)}
.rc-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;object-fit:cover;border:1px solid var(--border-color,#eee)}
.rc-body{flex:1;min-width:0}
.rc-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.85rem;margin-bottom:4px}
.rc-nick{font-weight:600;color:var(--text-color,#333)}
.rc-badge{font-size:.72rem;padding:1px 6px;border-radius:3px;background:var(--theme-color,#425aef);color:#fff}
.rc-time{color:var(--text-meta,#999);font-size:.8rem}
.rc-menu-wrap{position:relative;margin-left:auto;cursor:pointer;color:var(--text-meta,#999);font-size:1.1rem;line-height:1;padding:0 4px;border-radius:4px;user-select:none}
.rc-menu-wrap:hover{background:var(--border-color,#eee)}
.rc-menu{display:none;position:absolute;right:0;top:100%;background:var(--card-bg,#fff);border:1px solid var(--border-color,#ddd);border-radius:6px;box-shadow:0 2px 12px rgba(0,0,0,.1);z-index:10;min-width:100px;padding:4px 0}
.rc-menu.open{display:block}
.rc-menu-item{padding:6px 16px;font-size:.85rem;cursor:pointer;color:var(--text-color,#333)}
.rc-menu-item:hover{background:var(--border-color,#f0f0f0)}
.rc-menu-item.danger{color:#e53935}
.rc-text{font-size:.9rem;line-height:1.6;color:var(--text-color,#333);word-break:break-word;white-space:pre-wrap}
.rc-empty{text-align:center;padding:30px 0;color:var(--text-meta,#999);font-size:.9rem}
.rc-loading{text-align:center;padding:20px;color:var(--text-meta,#999);font-size:.9rem}
.rc-pwd-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:999;display:flex;align-items:center;justify-content:center}
.rc-pwd-box{background:var(--card-bg,#fff);padding:24px;border-radius:12px;max-width:300px;width:90%;text-align:center}
.rc-pwd-box h4{margin:0 0 12px}
.rc-pwd-box input{width:100%;padding:8px;border:1px solid var(--border-color,#ddd);border-radius:6px;margin-bottom:8px;outline:none;box-sizing:border-box}
.rc-pwd-box button{padding:6px 24px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer}
.rc-pwd-box .rc-err{color:#e53935;font-size:.82rem;display:none}
`;

// 常用 emoji
var EMOJIS = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🥰','😘','😜','😝','🤑','🤗','🤔','🤐','😐','😑','😶','🙄','😏','😒','😞','😟','😠','😡','😢','😭','😤','😱','😨','😰','😥','😪','😓','🤩','🥳','👏','👍','👎','💪','🤝','🖐️','✌️','🤟','👀','❤️','💔','🔥','⭐','✨','💡','📌','🎉','🎊','🙏','💀','☀️','🌈','🌙','⭐','🌸','🌺','🍀','🍉','🍕','🎵','🎶','⚡','💤','💯','✅','❌','❓','❗','🆗','🆒','🆕','🔝','💬','💭','📝','✏️','🔗','🖥️','📱','⌨️','🕐','🕑','🕒'];

// 默认头像
var DEFAULT_AVATAR = '/img/default-avatar.png';

// 从 localStorage 读取用户信息
var saved = JSON.parse(localStorage.getItem('rc_user') || '{}');

document.head.appendChild(style);

// 插入评论区
var inner = document.getElementById('content-inner');
if (!inner) return;
var wrap = document.createElement('div');
wrap.id = 'rc-wrap';
inner.appendChild(wrap);

// Emoji 面板切换
var emojiOpen = false;

function showCmt(comments) {
  wrap.innerHTML = '<div class="rc-head"><i class="fas fa-comments"></i> 评论</div>';
  var form = document.createElement('div');
  form.className = 'rc-form';
  form.innerHTML =
    '<img class="rc-form-avatar" src="' + (saved.avatar || DEFAULT_AVATAR) + '" id="rc-my-avatar">' +
    '<div class="rc-form-body">' +
      '<div class="rc-form-row">' +
        '<input id="rc-nick" placeholder="昵称 *" value="' + esc(saved.nick || '') + '">' +
        '<input id="rc-email" placeholder="邮箱 *" value="' + esc(saved.email || '') + '">' +
      '</div>' +
      '<div class="rc-textarea-wrap">' +
        '<textarea id="rc-text" placeholder="说点什么..." rows="3"></textarea>' +
      '</div>' +
      '<div class="rc-emoji-panel" id="rc-emoji-panel"></div>' +
      '<div class="rc-toolbar">' +
        '<div class="rc-toolbar-left">' +
          '<button class="rc-emoji-btn" id="rc-emoji-btn" title="表情">😊</button>' +
        '</div>' +
        '<div class="rc-toolbar-right">' +
          '<button class="rc-submit" id="rc-submit">发表评论</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  wrap.appendChild(form);

  // 评论列表
  var list = document.createElement('div');
  list.id = 'rc-list';
  wrap.appendChild(list);

  // 填充 emoji
  var ep = document.getElementById('rc-emoji-panel');
  EMOJIS.forEach(function(e){
    var s = document.createElement('span');
    s.textContent = e;
    s.onclick = function(){ document.getElementById('rc-text').value += e; ep.classList.remove('open'); emojiOpen = false; };
    ep.appendChild(s);
  });

  document.getElementById('rc-emoji-btn').onclick = function(){
    emojiOpen = !emojiOpen;
    ep.classList.toggle('open', emojiOpen);
  };

  // 头像上传
  document.getElementById('rc-my-avatar').onclick = function(){
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/png,image/jpeg,image/gif,image/webp';
    inp.onchange = function(){
      var f = inp.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function(e){
        var img = e.target.result;
        saved.avatar = img;
        localStorage.setItem('rc_user', JSON.stringify(saved));
        document.getElementById('rc-my-avatar').src = img;
      };
      r.readAsDataURL(f);
    };
    inp.click();
  };

  document.getElementById('rc-submit').onclick = submitCmt;

  renderList(comments);
}

function renderList(comments) {
  var list = document.getElementById('rc-list');
  if (!comments.length) {
    list.innerHTML = '<div class="rc-empty">暂无评论</div>';
    return;
  }
  var html = '';
  comments.forEach(function(c){
    var ava = esc(c.avatar || DEFAULT_AVATAR);
    var nick = esc(c.nick);
    var time = new Date(c.created_at).toLocaleString();
    var text = esc(c.content).replace(/\n/g,'<br>');
    var badge = c.is_admin ? '<span class="rc-badge">作者</span>' : '';
    var canDel = c.user_token && c.user_token === saved['token_' + c.id];
    html += '<div class="rc-item" data-id="' + c.id + '">' +
      '<img class="rc-avatar" src="' + ava + '">' +
      '<div class="rc-body">' +
        '<div class="rc-meta">' +
          '<span class="rc-nick">' + nick + '</span>' + badge +
          '<span class="rc-time">' + time + '</span>' +
          '<span class="rc-menu-wrap" onclick="toggleMenu(this)">⋯<div class="rc-menu"><div class="rc-menu-item danger" onclick="deleteCmt(' + c.id + ')">删除</div></div></span>' +
        '</div>' +
        '<div class="rc-text">' + text + '</div>' +
      '</div></div>';
  });
  list.innerHTML = html;
}

window.toggleMenu = function(el) {
  document.querySelectorAll('.rc-menu.open').forEach(function(m){if(m !== el.lastElementChild) m.classList.remove('open');});
  el.lastElementChild.classList.toggle('open');
};

window.deleteCmt = function(id) {
  var menu = event.target.closest('.rc-menu');
  if (menu) menu.classList.remove('open');
  var token = saved['token_' + id];
  if (token) {
    // 用户自有 token 删除
    fetch(API + '/api/comments/delete', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id, token:token})})
      .then(function(r){return r.json()}).then(function(d){if(d.success) loadCmt();});
  } else {
    // 管理员密码删除
    var overlay = document.createElement('div');
    overlay.className = 'rc-pwd-overlay';
    overlay.innerHTML = '<div class="rc-pwd-box"><h4>管理员验证</h4><input type="password" id="rc-admin-pwd" placeholder="输入管理密码"><p class="rc-err" id="rc-pwd-err">密码错误</p><button onclick="adminDel(' + id + ')">确认删除</button></div>';
    overlay.onclick = function(e){if(e.target === overlay) document.body.removeChild(overlay);};
    document.body.appendChild(overlay);
    setTimeout(function(){document.getElementById('rc-admin-pwd').focus();},100);
  }
};

window.adminDel = function(id) {
  var pwd = document.getElementById('rc-admin-pwd').value;
  fetch(API + '/api/comments/delete', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id, admin:pwd})})
    .then(function(r){return r.json()}).then(function(d){
      if(d.success){ document.body.removeChild(document.querySelector('.rc-pwd-overlay')); loadCmt(); }
      else { document.getElementById('rc-pwd-err').style.display = 'block'; }
    });
};

function submitCmt() {
  var nick = document.getElementById('rc-nick').value.trim();
  var email = document.getElementById('rc-email').value.trim();
  var content = document.getElementById('rc-text').value.trim();
  if (!nick || !email || !content) { alert('请填写昵称、邮箱和内容'); return; }
  saved.nick = nick; saved.email = email;
  localStorage.setItem('rc_user', JSON.stringify(saved));
  var btn = document.getElementById('rc-submit');
  btn.disabled = true; btn.textContent = '提交中...';
  fetch(API + '/api/comments', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nick:nick, email:email, content:content, avatar:saved.avatar || '', url:url, adminKey:saved.adminKey || ''})})
    .then(function(r){return r.json()}).then(function(d){
      if (d.id) {
        saved['token_' + d.id] = d.user_token;
        localStorage.setItem('rc_user', JSON.stringify(saved));
        document.getElementById('rc-text').value = '';
        loadCmt();
      } else { alert(d.error || '提交失败'); }
    }).catch(function(){alert('网络错误')})
    .finally(function(){btn.disabled = false; btn.textContent = '发表评论';});
}

function loadCmt() {
  wrap.innerHTML = '<div class="rc-loading">⏳ 加载中...</div>';
  fetch(API + '/api/comments?url=' + encodeURIComponent(url))
    .then(function(r){return r.json()}).then(function(list){
      showCmt(list);
    }).catch(function(){
      wrap.innerHTML = '<div class="rc-loading">加载失败</div>';
    });
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// 加载
loadCmt();
})();
