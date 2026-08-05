// Ray 评论区 - 最终版
(function(){
try {
var API = 'https://comment.ray2.asia';

// 图片加载失败显示纯色背景
document.addEventListener('error', function(e){
  if (e.target.tagName === 'IMG') e.target.style.background = '#e8e8e8';
}, true);

// PJAX 导航后清理旧评论区
function cleanRC() {
  var el = document.getElementById('rc-wrap');
  if (el && !/^\/\d{4}\/\d{2}\/\d{2}\//.test(window.location.pathname)) el.remove();
}

// 监听 PJAX 完成事件
document.addEventListener('pjax:complete', cleanRC);
document.addEventListener('DOMContentLoaded', cleanRC);

// 只在文章页显示
if (!/^\/\d{4}\/\d{2}\/\d{2}\//.test(window.location.pathname)) return;
var url = window.location.pathname;

  // 移除旧的评论区容器（PJAX 导航时）
  var oldWrap = document.getElementById('rc-wrap');
  if (oldWrap) oldWrap.remove();
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
      var render = function(lu) {
        var html = '<div style="font-size:1.1em;font-weight:600;padding-bottom:8px;margin-bottom:16px;border-bottom:1px solid var(--border-color,#e8e8e8)"><i class="fas fa-comments"></i> 评论</div>';
        // 表单
        html += '<div style="display:flex;gap:12px;margin-bottom:24px">';
        if (lu) {
          var unick = lu.nickname || (lu.email || '').split('@')[0] || '用户';
          var uavatar = lu.avatar || DEFAULT_AVATAR;
          html += '<img style="width:44px;height:44px;border-radius:50%;flex-shrink:0;object-fit:cover;cursor:pointer" src="' + uavatar + '" id="rc-avatar" onclick="location.href=\'/account/\'" title="个人中心">';
          html += '<div style="flex:1">';
          html += '<div style="font-size:.85rem;color:var(--text-meta,#999);margin-bottom:8px">以 <b>' + esc(unick) + '</b> 的身份评论</div>';
          html += '<textarea id="rc-text" placeholder="说点什么..." style="width:100%;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;min-height:72px;resize:vertical;box-sizing:border-box;font-family:inherit;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none" rows="3"></textarea>';
          html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px"><button style="padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:1rem;background:var(--card-bg,#fff)" id="rc-emoji-btn">😊</button><button style="padding:6px 20px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer;font-size:.9rem" id="rc-submit">发表评论</button></div>';
          html += '<div style="display:none;flex-wrap:wrap;gap:4px;padding:8px;margin-top:4px;border:1px solid var(--border-color,#ddd);border-radius:6px;background:var(--card-bg,#fff);max-height:120px;overflow-y:auto" id="rc-emoji"></div>';
        } else {
          html += '<div style="width:44px;height:44px;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">匿名</div>';
          html += '<div style="flex:1">';
          html += '<input id="rc-nick" placeholder="昵称（可选，默认匿名）" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;margin-bottom:8px;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none">';
          html += '<textarea id="rc-text" placeholder="说点什么..." style="width:100%;padding:8px 12px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:.9rem;min-height:72px;resize:vertical;box-sizing:border-box;font-family:inherit;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none" rows="3"></textarea>';
          html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px"><button style="padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:1rem;background:var(--card-bg,#fff)" id="rc-emoji-btn">😊</button><button style="padding:6px 20px;border:none;border-radius:6px;background:var(--theme-color,#425aef);color:#fff;cursor:pointer;font-size:.9rem" id="rc-submit">发表评论</button></div>';
          html += '<div style="display:none;flex-wrap:wrap;gap:4px;padding:8px;margin-top:4px;border:1px solid var(--border-color,#ddd);border-radius:6px;background:var(--card-bg,#fff);max-height:120px;overflow-y:auto" id="rc-emoji"></div>';
        }
        html += '</div></div>';
        // 列表
        list.forEach(function(c){
          html += '<div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border-color,#f0f0f0)">';
          html += c.avatar
            ? '<img style="width:40px;height:40px;border-radius:50%;flex-shrink:0;object-fit:cover" src="' + esc(c.avatar) + '">'
            : '<div style="width:40px;height:40px;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0">匿名</div>';
          html += '<div style="flex:1"><div style="display:flex;align-items:center;gap:8px;font-size:.85rem;margin-bottom:4px">';
          html += '<span style="font-weight:600">'+esc(c.nick)+'</span>';
          if (c.is_admin) html += '<span style="font-size:.72rem;padding:1px 6px;border-radius:3px;background:var(--theme-color,#425aef);color:#fff">作者</span>';
          html += '<span style="color:var(--text-meta,#999);font-size:.8rem">'+new Date(c.created_at).toLocaleString()+'</span>';
          html += '<span style="position:relative;margin-left:auto;cursor:pointer;color:var(--text-meta,#999)" onclick="rcMenu(this)">⋯<div style="display:none;position:absolute;right:0;top:100%;background:var(--card-bg,#fff);border:1px solid #ddd;border-radius:6px;z-index:10;min-width:100px;padding:4px 0" class="rc-menu"><div style="padding:6px 16px;cursor:pointer;color:#e53935;font-size:.85rem" onclick="rcDel('+c.id+')">删除</div></div></span>';
          html += '</div><div style="font-size:.9rem;line-height:1.6;white-space:pre-wrap;word-break:break-word">'+esc(c.content)+'</div></div></div>';
        });
        if (!list.length) html += '<div style="text-align:center;padding:30px 0;color:var(--text-meta,#999);font-size:.9rem">暂无评论</div>';
        wrap.innerHTML = html;

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
      };
      // 等待登录态就绪（auth.js restore 是异步的）
      if (typeof window.__rayUser === 'undefined') {
        var t = 0;
        var iv = setInterval(function() {
          t++;
          if (typeof window.__rayUser !== 'undefined' || t >= 8) {
            clearInterval(iv);
            render(window.__rayUser || null);
          }
        }, 400);
      } else {
        render(window.__rayUser);
      }
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
    var lu = window.__rayUser || null;
    var content = document.getElementById('rc-text').value.trim();
    var nick, email, avatar;
    if (lu) {
      nick = lu.nickname || (lu.email || '').split('@')[0] || '用户';
      email = lu.email || '';
      avatar = lu.avatar || '';
    } else {
      var ni = document.getElementById('rc-nick');
      nick = (ni ? ni.value.trim() : '') || '匿名';
      email = '';
      avatar = '';
    }
    if (!content) { alert('请填写评论内容'); return; }
    var btn = document.getElementById('rc-submit'); btn.disabled=true; btn.textContent='提交中...';
    fetch(API+'/api/comments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nick:nick,email:email,content:content,avatar:avatar,url:url})})
      .then(function(r){return r.json()}).then(function(d){
        if(d.id){saved['token_'+d.id]=d.user_token;localStorage.setItem('rc_user',JSON.stringify(saved));window.location.reload();}
        else alert(d.error||'提交失败');
      }).catch(function(){alert('网络错误')}).finally(function(){btn.disabled=false;btn.textContent='发表评论';});
  };

  console.log('rc: done');
} catch(e) { console.log('rc error:', e); }
})();
