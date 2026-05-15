// Ray 评论区 - 最终版
(function(){
console.log('rc: loading');
try {
  var API = 'https://comment.ray2.asia';
  var url = window.location.pathname;

  // 只在文章页显示
  if (!document.querySelector('.post') && !document.getElementById('article-container')) return;
  if (document.getElementById('rc-wrap')) return;

  // 插入容器
  var container = document.querySelector('article') || document.getElementById('article-container');
  if (!container) {
    document.body.insertAdjacentHTML('beforeend', '<div id="rc-wrap" style="padding:20px;border:2px solid red;margin:20px;text-align:center">rc: article not found</div>');
    return;
  }

  var wrap = document.createElement('div');
  wrap.id = 'rc-wrap';
  wrap.style.cssText = 'max-width:100%;overflow-wrap:break-word';
  container.after(wrap);
  wrap.innerHTML = '<div style="padding:20px;text-align:center;color:#999">⏳ 加载中...</div>';

  var saved = JSON.parse(localStorage.getItem('rc_user') || '{}');
  var EMOJIS = ['😀','😁','😂','😅','😊','😋','😎','😍','🥰','😘','🤔','😏','😒','😢','😭','😤','😱','👍','👎','❤️','💔','🔥','✨','🎉','🙏'];
  var DEFAULT_AVATAR = '/img/default-avatar.png';

  function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  fetch(API + '/api/comments?url=' + encodeURIComponent(url))
    .then(function(r){return r.json()})
    .then(function(list){
      var html = '<div style="font-size:1.1em;font-weight:600;padding-bottom:8px;margin-bottom:16px;border-bottom:1px solid var(--border-color,#e8e8e8)"><i class="fas fa-comments"></i> 评论</div>';
      // 表单
      html += '<div style="display:flex;gap:12px;margin-bottom:24px">';
      html += '<img style="width:44px;height:44px;border-radius:50%;flex-shrink:0;object-fit:cover;cursor:pointer" src="'+DEFAULT_AVATAR+'" id="rc-avatar">';
      html += '<div style="flex:1">';
      html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px"><input id="rc-nick" placeholder="昵称 *" style="flex:1;min-width:120px;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none"><input id="rc-email" placeholder="邮箱 *" style="flex:1;min-width:120px;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none"></div>';
      html += '<textarea id="rc-text" placeholder="说点什么..." style="width:100%;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;min-height:72px;resize:vertical;box-sizing:border-box;font-family:inherit;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none" rows="3"></textarea>';
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px"><button style="padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:1rem;background:var(--card-bg,#fff)" id="rc-emoji-btn">😊</button><button style="padding:6px 20px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer;font-size:.9rem" id="rc-submit">发表评论</button></div>';
      html += '<div style="display:none;flex-wrap:wrap;gap:4px;padding:8px;margin-top:4px;border:1px solid var(--border-color,#ddd);border-radius:6px;background:var(--card-bg,#fff);max-height:120px;overflow-y:auto" id="rc-emoji"></div>';
      html += '</div></div>';
      // 列表
      list.forEach(function(c){
        html += '<div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border-color,#f0f0f0)">';
        html += '<img style="width:40px;height:40px;border-radius:50%;flex-shrink:0;object-fit:cover" src="'+esc(c.avatar||DEFAULT_AVATAR)+'">';
        html += '<div style="flex:1"><div style="display:flex;align-items:center;gap:8px;font-size:.85rem;margin-bottom:4px">';
        html += '<span style="font-weight:600">'+esc(c.nick)+'</span>';
        if (c.is_admin) html += '<span style="font-size:.72rem;padding:1px 6px;border-radius:3px;background:var(--theme-color,#425aef);color:#fff">作者</span>';
        html += '<span style="color:var(--text-meta,#999);font-size:.8rem">'+new Date(c.created_at).toLocaleString()+'</span>';
        html += '<span style="position:relative;margin-left:auto;cursor:pointer;color:var(--text-meta,#999)" onclick="rcMenu(this)">⋯<div style="display:none;position:absolute;right:0;top:100%;background:var(--card-bg,#fff);border:1px solid #ddd;border-radius:6px;z-index:10;min-width:100px;padding:4px 0" class="rc-menu"><div style="padding:6px 16px;cursor:pointer;color:#e53935;font-size:.85rem" onclick="rcDel('+c.id+')">删除</div></div></span>';
        html += '</div><div style="font-size:.9rem;line-height:1.6;white-space:pre-wrap;word-break:break-word">'+esc(c.content)+'</div></div></div>';
      });
      if (!list.length) html += '<div style="text-align:center;padding:30px 0;color:var(--text-meta,#999);font-size:.9rem">暂无评论</div>';
      wrap.innerHTML = html;

      // Emoji
      var ep = document.getElementById('rc-emoji');
      EMOJIS.forEach(function(e){
        var s = document.createElement('span');
        s.textContent = e;
        s.style.cssText = 'width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border-radius:4px';
        s.onmouseover = function(){this.style.background='var(--border-color,#eee)'};
        s.onmouseout = function(){this.style.background='none'};
        s.onclick = function(){document.getElementById('rc-text').value += e; };
        ep.appendChild(s);
      });

      document.getElementById('rc-emoji-btn').onclick = function(){ ep.style.display = ep.style.display === 'none' ? 'flex' : 'none'; };
      document.getElementById('rc-submit').onclick = function(){ rcSubmit(wrap); };
      document.getElementById('rc-avatar').onclick = function(){
        var inp = document.createElement('input');
        inp.type = 'file'; inp.accept = 'image/*';
        inp.onchange = function(){
          var f = inp.files[0]; if (!f) return;
          var r = new FileReader();
          r.onload = function(e){ saved.avatar = e.target.result; localStorage.setItem('rc_user',JSON.stringify(saved)); document.getElementById('rc-avatar').src = saved.avatar; };
          r.readAsDataURL(f);
        };
        inp.click();
      };
    })
    .catch(function(e){
      wrap.innerHTML = '<div style="padding:20px;text-align:center;color:#e53935">加载失败</div>';
    });

  window.rcMenu = function(el){
    el.querySelector('.rc-menu').style.display = el.querySelector('.rc-menu').style.display === 'block' ? 'none' : 'block';
  };

  window.rcDel = function(id){
    var token = saved['token_'+id];
    if (token) {
      fetch(API+'/api/comments/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,token:token})})
        .then(function(r){return r.json()}).then(function(d){if(d.success) window.location.reload();});
    } else {
      var pwd = prompt('管理员密码：');
      if (pwd) fetch(API+'/api/comments/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,admin:pwd})})
        .then(function(r){return r.json()}).then(function(d){if(d.success) window.location.reload(); else alert('密码错误');});
    }
  };

  window.rcSubmit = function(wrap){
    var nick = document.getElementById('rc-nick').value.trim();
    var email = document.getElementById('rc-email').value.trim();
    var content = document.getElementById('rc-text').value.trim();
    if (!nick||!email||!content) { alert('请填写昵称、邮箱和内容'); return; }
    saved.nick=nick;saved.email=email;
    localStorage.setItem('rc_user',JSON.stringify(saved));
    var btn = document.getElementById('rc-submit'); btn.disabled=true; btn.textContent='提交中...';
    fetch(API+'/api/comments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nick:nick,email:email,content:content,avatar:saved.avatar||'',url:url})})
      .then(function(r){return r.json()}).then(function(d){
        if(d.id){saved['token_'+d.id]=d.user_token;localStorage.setItem('rc_user',JSON.stringify(saved));window.location.reload();}
        else alert(d.error||'提交失败');
      }).catch(function(){alert('网络错误')}).finally(function(){btn.disabled=false;btn.textContent='发表评论';});
  };

  console.log('rc: done');
} catch(e) { console.log('rc error:', e); }
})();
