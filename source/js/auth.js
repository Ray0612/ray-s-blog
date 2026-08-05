// 全站统一登录：左上角登录按钮 + 弹窗 + Cloudflare Turnstile
(function () {
  if (window.__rayAuthLoaded) return;
  window.__rayAuthLoaded = true;

  var SITEKEY = '0x4AAAAAAEGDC89_lYzhJoB4';
  var AUTH = 'https://ai-gateway.ray2.asia';
  var token = localStorage.getItem('ray_auth_token') || '';
  var user = null;
  var widgets = {};
  var cfResp = { login: '', reg: '' };

  // ===== 注入 CSS =====
  var css = document.createElement('style');
  css.textContent = [
    '.rayfab{display:inline-flex;align-items:center;margin-left:12px;font-family:inherit;vertical-align:middle}',
    '.rayfab-btn{padding:6px 16px;border-radius:20px;border:1px solid #d1d5db;background:rgba(255,255,255,.94);color:#374151;font-size:13px;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(0,0,0,.1)}',
    '[data-theme="dark"] .rayfab-btn{background:rgba(31,41,55,.94);border-color:#374151;color:#e5e7eb}',
    '.rayfab-u{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.94);border:1px solid #e5e7eb;border-radius:20px;padding:5px 12px;box-shadow:0 2px 8px rgba(0,0,0,.1);font-size:12px}',
    '[data-theme="dark"] .rayfab-u{background:rgba(31,41,55,.94);border-color:#374151}',
    '.rayfab-u b{color:#425aef;font-weight:600;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.rayfab-u .bal{color:#6b7280}',
    '[data-theme="dark"] .rayfab-u .bal{color:#9ca3af}',
    '.rayfab-u .out{border:none;background:none;color:#9ca3af;cursor:pointer;font-size:12px;font-family:inherit}',
    '.rayfab-u .out:hover{color:#ef4444}',
    '.rayfab-u{position:relative}',
    '.ray-avatar{width:28px;height:28px;border-radius:50%;object-fit:cover;cursor:pointer;display:block}',
    '.ray-bal-tip2{display:none;position:fixed;background:#111827;color:#fff;padding:4px 10px;border-radius:6px;font-size:12px;white-space:nowrap;z-index:3000;pointer-events:none}',
    '.raymask{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px}',
    '.raymask.show{display:flex}',
    '.raymodal{background:#fff;border-radius:14px;padding:24px;width:100%;max-width:380px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.25)}',
    '[data-theme="dark"] .raymodal{background:#1f2937}',
    '.raymodal .close{position:absolute;top:12px;right:14px;border:none;background:none;font-size:22px;cursor:pointer;color:#9ca3af;line-height:1}',
    '.raymodal .tabs{display:flex;gap:12px;margin-bottom:18px;border-bottom:2px solid #e5e7eb}',
    '[data-theme="dark"] .raymodal .tabs{border-color:#374151}',
    '.raymodal .tabs button{flex:1;padding:10px;border:none;background:none;cursor:pointer;font-size:14px;color:#9ca3af;border-bottom:2px solid transparent;margin-bottom:-2px;font-family:inherit}',
    '.raymodal .tabs button.active{color:#425aef;border-bottom-color:#425aef;font-weight:600}',
    '[data-theme="dark"] .raymodal .tabs button.active{color:#fff}',
    '.raymodal label{display:block;font-size:13px;color:#6b7280;margin:12px 0 6px}',
    '[data-theme="dark"] .raymodal label{color:#9ca3af}',
    '.raymodal input[type=email],.raymodal input[type=password],.raymodal input[type=text]{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;outline:none;background:#fff;color:#1f2937}',
    '[data-theme="dark"] .raymodal input{background:#0d1117;border-color:#374151;color:#e5e7eb}',
    '.raycode-row{display:flex;gap:8px}',
    '.raycode-row input{flex:1}',
    '.raycode-btn{padding:10px 12px;border-radius:8px;border:1px solid #d1d5db;background:#f3f4f6;font-size:13px;cursor:pointer;white-space:nowrap;color:#374151;font-family:inherit}',
    '[data-theme="dark"] .raycode-btn{background:#1f2937;border-color:#374151;color:#e5e7eb}',
    '.raycode-btn:disabled{opacity:.5;cursor:not-allowed}',
    '.ray-ok{width:100%;margin-top:14px;padding:11px;border:none;border-radius:8px;background:#425aef;color:#fff;font-size:14px;cursor:pointer;font-family:inherit}',
    '.ray-ok:hover:not(:disabled){opacity:.85}',
    '.ray-err{font-size:12px;color:#ef4444;margin-top:10px;min-height:16px}',
    '.ray-tips{font-size:12px;color:#9ca3af;margin:4px 0 0}',
    '.ray-cf{margin-top:12px}',
    '.ray-cf iframe{width:100%!important}',
    '.ray-link{display:block;text-align:center;font-size:13px;color:#9ca3af;margin-top:10px;cursor:pointer;text-decoration:none;font-family:inherit}',
    '.ray-link:hover{color:#425aef}',
    '.ray-favbar{display:flex;justify-content:center;padding:20px 0}',
    '.ray-favbtn{padding:9px 24px;border:1px solid var(--border-color,#e5e7eb);border-radius:20px;background:#f3f4f6;color:#6b7280;font-size:14px;cursor:pointer;font-family:inherit}',
    '.ray-favbtn:hover{border-color:#425aef;color:#425aef}',
  ].join('');
  document.head.appendChild(css);

  // ===== 注入 HTML =====
  var el = document.createElement('div');
  el.innerHTML = '' +
    '<div class="raymask" id="rayMask">' +
      '<div class="raymodal">' +
        '<button class="close" id="rayClose">×</button>' +
        '<div class="tabs">' +
          '<button id="rayTabLogin" class="active">登录</button>' +
          '<button id="rayTabReg">注册</button>' +
        '</div>' +
        '<div id="rayLoginPane">' +
          '<label>邮箱</label><input type="email" id="rayLE" placeholder="you@example.com">' +
          '<label>密码</label><input type="password" id="rayLP" placeholder="密码">' +
          '<div class="ray-cf" id="rayCfLogin"></div>' +
          '<button class="ray-ok" id="rayLoginBtn">登录</button>' +
          '<div class="ray-err" id="rayLErr"></div>' +
          '<a id="rayForgotLink" class="ray-link">忘记密码？</a>' +
        '</div>' +
        '<div id="rayRegPane" style="display:none">' +
          '<label>邮箱</label><input type="email" id="rayRE" placeholder="you@example.com">' +
          '<label>验证码</label>' +
          '<div class="raycode-row">' +
            '<input type="text" id="rayRC" maxlength="6" placeholder="6 位验证码">' +
            '<button class="raycode-btn" id="rayRSend">发送验证码</button>' +
          '</div>' +
          '<label>密码</label><input type="password" id="rayRP1" placeholder="至少 8 位，含数字和字母">' +
          '<label>确认密码</label><input type="password" id="rayRP2" placeholder="再次输入密码">' +
          '<div class="ray-cf" id="rayCfReg"></div>' +
          '<button class="ray-ok" id="rayRegBtn">注册并登录</button>' +
          '<div class="ray-err" id="rayRErr"></div>' +
        '</div>' +
        '<div id="rayForgotPane" style="display:none">' +
          '<label>邮箱</label><input type="email" id="rayFE" placeholder="you@example.com">' +
          '<label>验证码</label>' +
          '<div class="raycode-row">' +
            '<input type="text" id="rayFC" maxlength="6" placeholder="6 位验证码">' +
            '<button class="raycode-btn" id="rayFSend">发送验证码</button>' +
          '</div>' +
          '<label>新密码</label><input type="password" id="rayFP1" placeholder="至少 8 位，含数字和字母">' +
          '<label>确认密码</label><input type="password" id="rayFP2" placeholder="再次输入密码">' +
          '<div class="ray-cf" id="rayCfForgot"></div>' +
          '<button class="ray-ok" id="rayFReset">重置密码</button>' +
          '<div class="ray-err" id="rayFErr"></div>' +
          '<a id="rayBackLogin" class="ray-link">返回登录</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(el);
  var tipEl = document.createElement('div');
  tipEl.id = 'rayBalTip';
  tipEl.className = 'ray-bal-tip2';
  document.body.appendChild(tipEl);

  // ===== Turnstile =====
  function ensureTurnstile(cb) {
    if (window.turnstile) { renderCf(); cb(); return; }
    window.__rayCfLoaded = function () { renderCf(); cb(); };
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__rayCfLoaded&render=explicit';
    s.async = true;
    document.head.appendChild(s);
  }
  function renderCf() {
    if (!window.turnstile) return;
    var l = document.getElementById('rayCfLogin');
    var r = document.getElementById('rayCfReg');
    var f = document.getElementById('rayCfForgot');
    if (l && !l.dataset.rendered) {
      l.dataset.rendered = '1';
      try {
        widgets.login = turnstile.render(l, {
          sitekey: SITEKEY,
          callback: function (t) { cfResp.login = t; },
          'error-callback': function () { cfResp.login = ''; }
        });
      } catch (e) {}
    }
    if (r && !r.dataset.rendered) {
      r.dataset.rendered = '1';
      try {
        widgets.reg = turnstile.render(r, {
          sitekey: SITEKEY,
          callback: function (t) { cfResp.reg = t; },
          'error-callback': function () { cfResp.reg = ''; }
        });
      } catch (e) {}
    }
    if (f && !f.dataset.rendered) {
      f.dataset.rendered = '1';
      try {
        widgets.forgot = turnstile.render(f, {
          sitekey: SITEKEY,
          callback: function (t) { cfResp.forgot = t; },
          'error-callback': function () { cfResp.forgot = ''; }
        });
      } catch (e) {}
    }
  }
  function resetCf(which) {
    cfResp[which] = '';
    if (window.turnstile && widgets[which] != null) {
      try { turnstile.reset(widgets[which]); } catch (e) {}
    }
  }

  // ===== 工具 =====
  function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function toast(msg) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:10px 20px;border-radius:8px;font-size:13px;z-index:2000';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }
  function apiErr(d) { return (d && d.error) ? d.error : '网络错误，请重试'; }
  function isStrong(p) { return p.length >= 8 && /[a-zA-Z]/.test(p) && /[0-9]/.test(p); }
  function post(path, body) {
    return fetch(AUTH + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); });
  }

  // ===== 顶栏用户状态 =====
  function mountFab() {
    if (document.getElementById('rayFab')) return;
    var holder = document.createElement('div');
    holder.id = 'rayFab';
    holder.className = 'rayfab';
    var title = document.querySelector('.nav-site-title');
    if (title && title.parentNode) {
      title.parentNode.insertBefore(holder, title.nextSibling);
    } else {
      document.body.appendChild(holder);
    }
  }
  function showFab() {
    mountFab();
    window.__rayUser = user;
    window.__rayToken = token;
    var fab = document.getElementById('rayFab');
    if (!fab) return;
    if (user) {
      fab.innerHTML = '<div class="rayfab-u">' +
        '<img class="ray-avatar" src="' + (user.avatar || '/img/avatar.jpg') + '" alt="头像">' +
        '<button class="out">退出</button>' +
        '</div>';
      var avatarEl = fab.querySelector('.ray-avatar');
      avatarEl.addEventListener('click', function () { location.href = '/account/'; });
      avatarEl.addEventListener('mouseenter', function (e) {
        var tip = document.getElementById('rayBalTip');
        var r = e.currentTarget.getBoundingClientRect();
        tip.textContent = '余额 ' + (user.balance || 0) + ' 点';
        tip.style.display = 'block';
        tip.style.left = Math.max(4, r.left + r.width / 2 - tip.offsetWidth / 2) + 'px';
        tip.style.top = (r.bottom + 8) + 'px';
      });
      avatarEl.addEventListener('mouseleave', function () {
        document.getElementById('rayBalTip').style.display = 'none';
      });
      fab.querySelector('.out').addEventListener('click', doLogout);
    } else {
      fab.innerHTML = '<button class="rayfab-btn">登录 / 注册</button>';
      fab.querySelector('.rayfab-btn').addEventListener('click', openModal);
    }
  }

  // ===== 弹窗 =====
  function openModal() {
    document.getElementById('rayMask').classList.add('show');
    resetCf('login'); resetCf('reg');
    ensureTurnstile(function () {});
    switchTab('login');
  }
  function closeModal() {
    document.getElementById('rayMask').classList.remove('show');
  }
  function switchTab(t) {
    document.getElementById('rayTabLogin').classList.toggle('active', t === 'login');
    document.getElementById('rayTabReg').classList.toggle('active', t === 'register');
    document.getElementById('rayLoginPane').style.display = t === 'login' ? '' : 'none';
    document.getElementById('rayRegPane').style.display = t === 'register' ? '' : 'none';
    document.getElementById('rayLErr').textContent = '';
    document.getElementById('rayRErr').textContent = '';
  }

  // ===== 发送验证码 =====
  function sendCode() {
    var email = document.getElementById('rayRE').value.trim();
    var err = document.getElementById('rayRErr');
    var btn = document.getElementById('rayRSend');
    if (!email) { err.textContent = '请输入邮箱'; return; }
    if (!cfResp.reg) { err.textContent = '请先完成人机验证'; return; }
    btn.disabled = true; err.textContent = '';
    post('/auth/send-code', { email: email, purpose: 'register', turnstile: cfResp.reg })
      .then(function (d) {
        if (!d.ok) { btn.disabled = false; err.textContent = apiErr(d); resetCf('reg'); return; }
        resetCf('reg');
        var t = 60;
        btn.textContent = t + 's';
        var iv = setInterval(function () {
          t--; btn.textContent = t + 's';
          if (t <= 0) { clearInterval(iv); btn.disabled = false; btn.textContent = '重新发送'; }
        }, 1000);
      })
      .catch(function () { btn.disabled = false; err.textContent = '发送失败，请重试'; resetCf('reg'); });
  }

  // ===== 注册 =====
  function doRegister() {
    var email = document.getElementById('rayRE').value.trim();
    var code = document.getElementById('rayRC').value.trim();
    var p1 = document.getElementById('rayRP1').value;
    var p2 = document.getElementById('rayRP2').value;
    var err = document.getElementById('rayRErr');
    if (!email || !code || !p1 || !p2) { err.textContent = '请填写完整'; return; }
    if (!isStrong(p1)) { err.textContent = '密码需至少 8 位，且包含数字和字母'; return; }
    if (p1 !== p2) { err.textContent = '两次密码不一致'; return; }
    if (!cfResp.reg) { err.textContent = '请先完成人机验证'; return; }
    post('/auth/register', { email: email, code: code, password: p1, confirm: p2, turnstile: cfResp.reg })
      .then(function (d) {
        if (!d.ok) { err.textContent = apiErr(d); resetCf('reg'); return; }
        token = d.token; localStorage.setItem('ray_auth_token', token);
        user = { email: d.email, balance: 0, role: d.role };
        closeModal(); showFab(); toast('注册成功');
      })
      .catch(function () { err.textContent = '网络错误，请重试'; resetCf('reg'); });
  }

  // ===== 登录 =====
  function doLogin() {
    var email = document.getElementById('rayLE').value.trim();
    var pass = document.getElementById('rayLP').value;
    var err = document.getElementById('rayLErr');
    if (!email || !pass) { err.textContent = '请填写完整'; return; }
    if (!cfResp.login) { err.textContent = '请先完成人机验证'; return; }
    post('/auth/login', { email: email, password: pass, turnstile: cfResp.login })
      .then(function (d) {
        if (!d.ok) {
          err.textContent = apiErr(d);
          resetCf('login');
          var nb = document.getElementById('rayNotifyBtn');
          if (d.locked) {
            if (!nb) {
              nb = document.createElement('button');
              nb.id = 'rayNotifyBtn';
              nb.className = 'ray-ok';
              nb.textContent = '点击此处告知管理员';
              nb.style.background = '#ef4444';
              nb.style.marginTop = '8px';
              nb.addEventListener('click', notifyAdmin);
              err.parentNode.appendChild(nb);
            }
          } else if (nb) {
            nb.remove();
          }
          return;
        }
        token = d.token; localStorage.setItem('ray_auth_token', token);
        user = { email: d.email, balance: 0, role: d.role };
        closeModal(); showFab(); toast('登录成功');
      })
      .catch(function () { err.textContent = '网络错误，请重试'; resetCf('login'); });
  }

  // ===== 登出 =====
  function doLogout() {
    post('/auth/logout', { token: token }).catch(function () {});
    token = ''; localStorage.removeItem('ray_auth_token'); user = null;
    showFab(); toast('已退出');
  }

  // ===== 忘记密码 =====
  function showForgot() {
    document.querySelector('.raymodal .tabs').style.display = 'none';
    document.getElementById('rayLoginPane').style.display = 'none';
    document.getElementById('rayRegPane').style.display = 'none';
    document.getElementById('rayForgotPane').style.display = '';
    document.getElementById('rayFErr').textContent = '';
    resetCf('forgot');
    ensureTurnstile(function () {});
  }
  function backToLogin() {
    document.querySelector('.raymodal .tabs').style.display = '';
    document.getElementById('rayForgotPane').style.display = 'none';
    switchTab('login');
  }
  function sendForgotCode() {
    var email = document.getElementById('rayFE').value.trim();
    var err = document.getElementById('rayFErr');
    var btn = document.getElementById('rayFSend');
    if (!email) { err.textContent = '请输入邮箱'; return; }
    if (!cfResp.forgot) { err.textContent = '请先完成人机验证'; return; }
    btn.disabled = true; err.textContent = '';
    post('/auth/send-code', { email: email, purpose: 'forgot', turnstile: cfResp.forgot })
      .then(function (d) {
        if (!d.ok) { btn.disabled = false; err.textContent = apiErr(d); resetCf('forgot'); return; }
        resetCf('forgot');
        var t = 60;
        btn.textContent = t + 's';
        var iv = setInterval(function () {
          t--; btn.textContent = t + 's';
          if (t <= 0) { clearInterval(iv); btn.disabled = false; btn.textContent = '重新发送'; }
        }, 1000);
      })
      .catch(function () { btn.disabled = false; err.textContent = '发送失败，请重试'; resetCf('forgot'); });
  }
  function doResetPassword() {
    var email = document.getElementById('rayFE').value.trim();
    var code = document.getElementById('rayFC').value.trim();
    var p1 = document.getElementById('rayFP1').value;
    var p2 = document.getElementById('rayFP2').value;
    var err = document.getElementById('rayFErr');
    if (!email || !code || !p1 || !p2) { err.textContent = '请填写完整'; return; }
    if (!isStrong(p1)) { err.textContent = '密码需至少 8 位，且包含数字和字母'; return; }
    if (p1 !== p2) { err.textContent = '两次密码不一致'; return; }
    if (!cfResp.forgot) { err.textContent = '请先完成人机验证'; return; }
    post('/auth/reset-password', { email: email, code: code, password: p1, confirm: p2, turnstile: cfResp.forgot })
      .then(function (d) {
        if (!d.ok) { err.textContent = apiErr(d); resetCf('forgot'); return; }
        err.textContent = '';
        toast(d.msg || '密码已重置');
        backToLogin();
      })
      .catch(function () { err.textContent = '网络错误，请重试'; resetCf('forgot'); });
  }

  // ===== 文章页收藏 =====
  function initFavorite() {
    if (!/^\/(20\d{2})\/\d{2}\/\d{2}\//.test(location.pathname)) return;
    var title = (document.title || '').replace(/\s*\|\s*.*$/, '').trim();
    var path = location.pathname;
    var target = document.querySelector('.post-content');
    if (!target) return;
    var bar = document.createElement('div');
    bar.className = 'ray-favbar';
    bar.innerHTML = '<button class="ray-favbtn" id="rayFavBtn">☆ 收藏</button>';
    target.appendChild(bar);
    var btn = document.getElementById('rayFavBtn');
    function refresh() {
      if (!window.__rayUser) {
        btn.textContent = '☆ 登录后可收藏';
        btn.style.background = '#f3f4f6'; btn.style.color = '#6b7280';
        return;
      }
      fetch(AUTH + '/auth/fav-status?path=' + encodeURIComponent(path), { headers: { 'Authorization': 'Bearer ' + (window.__rayToken || '') } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          btn.textContent = d.fav ? '★ 已收藏' : '☆ 收藏';
          btn.style.background = d.fav ? '#fef3c7' : '#f3f4f6';
          btn.style.color = d.fav ? '#d97706' : '#6b7280';
        });
    }
    btn.addEventListener('click', function () {
      if (!window.__rayUser) { openModal(); return; }
      fetch(AUTH + '/auth/favorite', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (window.__rayToken || '') }, body: JSON.stringify({ path: path, title: title }) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (d.ok) { toast(d.fav ? '已收藏' : '已取消收藏'); refresh(); } });
    });
    refresh();
  }

  // ===== 封号告知管理员 =====
  function notifyAdmin() {
    var email = document.getElementById('rayLE').value.trim();
    var err = document.getElementById('rayLErr');
    var btn = document.getElementById('rayNotifyBtn');
    if (!email) { err.textContent = '请输入邮箱'; return; }
    post('/auth/notify-admin', { email: email })
      .then(function (d) {
        if (d.ok) { err.textContent = d.msg; if (btn) btn.remove(); }
        else err.textContent = apiErr(d);
      })
      .catch(function () { err.textContent = '网络错误，请重试'; });
  }

  // ===== 恢复登录态 =====
  function restore() {
    if (!token) { showFab(); return; }
    fetch(AUTH + '/auth/me', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.ok && d.user) { user = d.user; }
        else { token = ''; localStorage.removeItem('ray_auth_token'); }
        showFab();
      })
      .catch(function () { showFab(); });
  }

  // ===== 绑定事件 =====
  document.getElementById('rayClose').addEventListener('click', closeModal);
  document.getElementById('rayMask').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.getElementById('rayTabLogin').addEventListener('click', function () { switchTab('login'); });
  document.getElementById('rayTabReg').addEventListener('click', function () { switchTab('register'); });
  document.getElementById('rayRSend').addEventListener('click', sendCode);
  document.getElementById('rayRegBtn').addEventListener('click', doRegister);
  document.getElementById('rayLoginBtn').addEventListener('click', doLogin);
  document.getElementById('rayLE').addEventListener('keydown', function (e) { if (e.key === 'Enter') doLogin(); });
  document.getElementById('rayLP').addEventListener('keydown', function (e) { if (e.key === 'Enter') doLogin(); });
  document.getElementById('rayRP2').addEventListener('keydown', function (e) { if (e.key === 'Enter') doRegister(); });
  document.getElementById('rayForgotLink').addEventListener('click', showForgot);
  document.getElementById('rayBackLogin').addEventListener('click', backToLogin);
  document.getElementById('rayFSend').addEventListener('click', sendForgotCode);
  document.getElementById('rayFReset').addEventListener('click', doResetPassword);

  window.__rayRefreshAuth = function () { restore(); };
  restore();
  setTimeout(initFavorite, 1200);
})();
