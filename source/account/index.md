---
title: 个人中心
date: 2026-08-05
comments: false
aside: false
---

<style>
.acc-wrap{max-width:520px;margin:0 auto}
.acc-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:28px}
.acc-top{display:flex;align-items:center;gap:18px;margin-bottom:24px}
.acc-avatar-box{position:relative;flex-shrink:0}
.acc-avatar-box img{width:84px;height:84px;border-radius:50%;object-fit:cover;border:3px solid var(--border-color,#e5e7eb);display:block}
.acc-avatar-box .up{position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);font-size:11px;background:#425aef;color:#fff;border:none;border-radius:12px;padding:3px 10px;cursor:pointer;white-space:nowrap}
.acc-name{font-size:16px;color:#1f2937;font-weight:700;display:flex;align-items:center;gap:6px}
.acc-name .acc-edit{cursor:pointer;opacity:.55;display:inline-flex;align-items:center}
.acc-name .acc-edit:hover{opacity:1}
.acc-name .acc-edit-ico{width:15px;height:15px;transform:scaleX(-1);vertical-align:middle}
.acc-name .acc-nick-input{font-size:14px;padding:4px 8px;border-radius:6px;border:1px solid #d1d5db;outline:none;background:#fff;color:#1f2937;width:140px}
[data-theme="dark"] .acc-name .acc-nick-input{background:#0d1117;border-color:#374151;color:#e5e7eb}
.acc-mail-sm{font-size:12px;color:#9ca3af;word-break:break-all;margin-top:2px}
.acc-bal{font-size:13px;color:#6b7280;margin-top:6px}
[data-theme="dark"] .acc-name{color:#e5e7eb}
[data-theme="dark"] .acc-mail-sm{color:#6b7280}
[data-theme="dark"] .acc-bal{color:#9ca3af}
.acc-tabs{display:flex;gap:8px;border-bottom:2px solid var(--border-color,#e5e7eb);margin-bottom:16px}
.acc-tab{padding:9px 14px;border:none;background:none;font-size:14px;color:#6b7280;border-bottom:2px solid transparent;margin-bottom:-2px;cursor:pointer;font-family:inherit}
.acc-tab.active{color:#425aef;border-bottom-color:#425aef;font-weight:600}
[data-theme="dark"] .acc-tab{color:#9ca3af}
[data-theme="dark"] .acc-tab.active{color:#fff}
.acc-plan{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.acc-plan button{padding:13px 18px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--card-bg,#fff);font-size:14px;cursor:pointer;color:#1f2937;font-family:inherit}
[data-theme="dark"] .acc-plan button{background:#1f2937;color:#e5e7eb}
.acc-plan button.active{border-color:#425aef;color:#425aef;font-weight:600;box-shadow:0 0 0 1px #425aef}
.acc-qr{text-align:center;padding:20px 0}
.acc-qr img{width:220px;height:220px;border:1px solid var(--border-color,#e5e7eb);border-radius:12px;padding:8px;background:#fff}
.acc-qr p{font-size:13px;color:#6b7280;margin-top:10px}
[data-theme="dark"] .acc-qr img{background:#fff}
.acc-list a{display:block;padding:10px 12px;border-radius:8px;color:#425aef;text-decoration:none;font-size:14px;word-break:break-all}
.acc-list a:hover{background:rgba(66,90,239,.08)}
.acc-hint{font-size:13px;color:#9ca3af;padding:10px 0}
.acc-paytype{display:flex;gap:8px;margin-bottom:14px}
.acc-pay{padding:9px 16px;border:1px solid var(--border-color,#e5e7eb);border-radius:8px;background:var(--card-bg,#fff);font-size:13.5px;cursor:pointer;color:#6b7280;font-family:inherit;display:inline-flex;align-items:center;gap:5px}
.acc-pay img{flex-shrink:0}
[data-theme="dark"] .acc-pay{background:#1f2937;color:#9ca3af}
.acc-pay.active{border-color:#425aef;color:#425aef;font-weight:600}
.acc-pay .rec{font-size:11px;color:#10b981;font-weight:700}
.acc-wx-tip{font-size:12.5px;color:#ef4444;background:rgba(239,68,68,.08);border:1px solid #fecaca;border-radius:8px;padding:10px 12px;margin-bottom:14px;line-height:1.7}
.svc-card{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;margin-bottom:10px}
.svc-main{flex:1;min-width:0}
.svc-name{font-size:14px;font-weight:600;color:#1f2937}
[data-theme="dark"] .svc-name{color:#e5e7eb}
.svc-desc{font-size:12.5px;color:#9ca3af;margin-top:3px}
.svc-price{font-size:12.5px;color:#425aef;margin-top:3px}
.svc-exp{font-size:12px;color:#6b7280;margin-top:3px}
[data-theme="dark"] .svc-exp{color:#9ca3af}
.svc-status{flex-shrink:0}
.svc-form{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:10px;padding:16px;margin-top:14px}
.svc-form h3{font-size:15px;margin:0 0 10px;color:#1f2937}
[data-theme="dark"] .svc-form h3{color:#e5e7eb}
.acc-field label{display:block;font-size:13px;color:#6b7280;margin-bottom:6px}
[data-theme="dark"] .acc-field label{color:#9ca3af}
.acc-field input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;outline:none;background:#fff;color:#1f2937}
[data-theme="dark"] .acc-field input{background:#0d1117;border-color:#374151;color:#e5e7eb}
.acc-save{width:100%;margin-top:18px;padding:11px;border:none;border-radius:8px;background:#425aef;color:#fff;font-size:14px;cursor:pointer;font-family:inherit}
.acc-save:hover:not(:disabled){opacity:.85}
.acc-err{font-size:12px;color:#ef4444;margin-top:10px;min-height:16px}
.acc-login-msg{text-align:center;padding:60px 20px;color:#6b7280;font-size:14px}
.acc-login-msg button{margin-top:16px;padding:9px 22px;border:none;border-radius:8px;background:#425aef;color:#fff;font-size:14px;cursor:pointer}

/* 管理中心 */
.admin-layout{display:flex;gap:20px;max-width:980px;margin:0 auto;align-items:flex-start}
.admin-side{width:170px;flex-shrink:0;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:14px 10px}
.admin-side .at{font-size:15px;font-weight:700;color:#1f2937;padding:6px 12px 14px;border-bottom:1px solid var(--border-color,#e5e7eb);margin-bottom:10px}
[data-theme="dark"] .admin-side .at{color:#e5e7eb}
.admin-menu{padding:10px 12px;border-radius:8px;font-size:13.5px;color:#6b7280;cursor:pointer;margin-bottom:2px}
.admin-menu:hover{background:rgba(66,90,239,.08);color:#425aef}
.admin-menu.active{background:#425aef;color:#fff;font-weight:600}
.admin-sub{padding:8px 12px 8px 26px;border-radius:8px;font-size:13px;color:#6b7280;cursor:pointer}
.admin-sub:hover{background:rgba(66,90,239,.08);color:#425aef}
.admin-sub.active{background:#425aef;color:#fff;font-weight:600}
.admin-back{margin-top:14px;padding-top:12px;border-top:1px solid var(--border-color,#e5e7eb);font-size:12.5px}
.admin-back a{color:#9ca3af;text-decoration:none}
.admin-back a:hover{color:#425aef}
.admin-main{flex:1;min-width:0;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:22px}
.admin-main .acc-card{background:transparent;border:none;padding:0}
.admin-main h3{font-size:15px;color:#1f2937;margin:0 0 14px}
[data-theme="dark"] .admin-main h3{color:#e5e7eb}
.a-search{display:flex;gap:8px;margin-bottom:14px}
.a-search input{flex:1;padding:9px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:13.5px;outline:none;background:#fff;color:#1f2937;box-sizing:border-box}
[data-theme="dark"] .a-search input{background:#0d1117;border-color:#374151;color:#e5e7eb}
.a-btn{padding:5px 12px;border-radius:6px;border:none;font-size:12.5px;cursor:pointer;background:#f3f4f6;color:#374151;font-family:inherit}
[data-theme="dark"] .a-btn{background:#1f2937;color:#e5e7eb}
.a-btn:hover{opacity:.85}
.a-btn.danger{background:#fee2e2;color:#dc2626}
[data-theme="dark"] .a-btn.danger{background:#2d1a1a;color:#f87171}
.a-btn.primary{background:#425aef;color:#fff}
.a-table{width:100%;border-collapse:collapse;font-size:13px}
.a-table th,.a-table td{padding:9px 8px;border-bottom:1px solid var(--border-color,#e5e7eb);text-align:left;color:#1f2937}
[data-theme="dark"] .a-table th,[data-theme="dark"] .a-table td{color:#e5e7eb}
.a-table th{color:#6b7280;font-weight:600;font-size:12.5px}
.a-load{font-size:13px;color:#9ca3af;padding:20px 0}
.a-form{display:flex;gap:8px;margin-bottom:16px;flex-wrap:nowrap}
.a-form input{flex:1;min-width:0;padding:9px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:13.5px;outline:none;background:#fff;color:#1f2937;box-sizing:border-box}
.a-form .a-btn{flex-shrink:0;white-space:nowrap}
[data-theme="dark"] .a-form input{background:#0d1117;border-color:#374151;color:#e5e7eb}
.badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:12px}
.badge.ok{background:#d1fae5;color:#059669}
.badge.bad{background:#fee2e2;color:#dc2626}
[data-theme="dark"] .badge.ok{background:#064e3b;color:#34d399}
[data-theme="dark"] .badge.bad{background:#450a0a;color:#f87171}
.a-empty{font-size:13px;color:#9ca3af;padding:16px 0}
.mon-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.mon-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:10px;padding:16px}
.mon-name{font-size:14px;font-weight:600;color:#1f2937;margin-bottom:10px}
[data-theme="dark"] .mon-name{color:#e5e7eb}
.mon-items{display:flex;flex-direction:column;gap:6px;font-size:13px;color:#6b7280}
[data-theme="dark"] .mon-items{color:#9ca3af}
.mon-items b{color:#425aef}
.a-tip{font-size:12px;color:#9ca3af;margin-top:8px}
</style>

<div class="acc-wrap" id="accWrap"></div>

<script>
(function () {
  var AUTH = 'https://ai-gateway.ray2.asia';
  var token = window.__rayToken || localStorage.getItem('ray_auth_token') || '';
  var avatarDataUrl = '';
  var curUser = null;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function toast(msg) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:10px 20px;border-radius:8px;font-size:13px;z-index:2000';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2000);
  }
  function adminApi(path, opts) {
    return fetch(AUTH + path, Object.assign({ headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' } }, opts || {})).then(function (r) { return r.json(); });
  }
  function fmtTime(ms) {
    if (!ms) return '-';
    var d = new Date(ms);
    return (d.getMonth() + 1) + '-' + d.getDate() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }

  // 刷新余额显示（充值/兑换/切 tab 时调用，避免必须刷新页面）
  function refreshBalance() {
    fetch(AUTH + '/auth/me', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.ok && d.user) {
          curUser = d.user;
          var bal = document.getElementById('accBal');
          if (bal) bal.textContent = '余额：' + (d.user.balance || 0) + ' 点';
        }
      })
      .catch(function () {});
  }

  function showLoginMsg() {
    document.getElementById('accWrap').innerHTML = '<div class="acc-login-msg"><p>请先登录后查看</p><button onclick="location.href=\'/\'">返回首页登录</button></div>';
  }

  // ===== 个人中心 =====
  function render(u, container) {
    var wrap = container || document.getElementById('accWrap');
    wrap.innerHTML = '' +
      '<div class="acc-card">' +
        '<div class="acc-top">' +
          '<div class="acc-avatar-box">' +
            '<img id="accAvatar" src="' + (u.avatar || '/img/avatar.jpg') + '" alt="头像">' +
            '<button class="up" id="accUpload">更换头像</button>' +
            '<input type="file" id="accFile" accept="image/*" style="display:none">' +
          '</div>' +
          '<div style="min-width:0">' +
            '<div class="acc-name"><span class="acc-edit" id="accEditName" title="修改昵称"><img src="/img/pencil.svg" class="acc-edit-ico" alt="修改昵称"></span><span id="accName"></span></div>' +
            '<div class="acc-mail-sm" id="accMailSm"></div>' +
            '<div class="acc-bal" id="accBal"></div>' +
          '</div>' +
        '</div>' +
        '<div class="acc-tabs">' +
          '<button class="acc-tab active" data-tab="favs">我的收藏</button>' +
          '<button class="acc-tab" data-tab="services">我的服务</button>' +
          '<button class="acc-tab" data-tab="recharge">点数充值</button>' +
          '<button class="acc-tab" data-tab="orders">订单记录</button>' +
          '<button class="acc-tab" data-tab="spends">扣费记录</button>' +
        '</div>' +
        '<div id="accBody"></div>' +
      '</div>';

    document.getElementById('accName').textContent = u.nickname || u.email.split('@')[0];
    document.getElementById('accMailSm').textContent = u.email;
    document.getElementById('accBal').textContent = '余额：' + (u.balance || 0) + ' 点';

    // 点笔修改昵称
    document.getElementById('accEditName').addEventListener('click', function () {
      var nameEl = document.getElementById('accName');
      var input = document.createElement('input');
      input.className = 'acc-nick-input';
      input.value = u.nickname || '';
      input.maxLength = 20;
      nameEl.replaceWith(input);
      input.focus();
      var done = false;
      var restore = function (val) {
        if (done) return;
        done = true;
        var span = document.createElement('span');
        span.id = 'accName';
        span.textContent = val;
        input.replaceWith(span);
      };
      var save = function () {
        if (done) return;
        var val = input.value.trim();
        if (!val) { toast('昵称不能为空'); restore(u.nickname || ''); return; }
        fetch(AUTH + '/auth/update-profile', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ nickname: val }) })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (!d.ok) { toast(d.error || '保存失败'); restore(u.nickname || ''); return; }
            u.nickname = val;
            restore(val);
            toast('昵称已更新');
            if (window.__rayRefreshAuth) window.__rayRefreshAuth();
          })
          .catch(function () { toast('网络错误'); restore(u.nickname || ''); });
      };
      input.addEventListener('blur', save);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); save(); } });
    });

    // 头像上传（选图即保存）
    document.getElementById('accUpload').addEventListener('click', function () { document.getElementById('accFile').click(); });
    document.getElementById('accFile').addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
          var size = 128, canvas = document.createElement('canvas');
          canvas.width = size; canvas.height = size;
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
          var ratio = Math.max(size / img.width, size / img.height);
          var w = img.width * ratio, h = img.height * ratio;
          ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
          var dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          document.getElementById('accAvatar').src = dataUrl;
          fetch(AUTH + '/auth/update-profile', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ avatar: dataUrl }) })
            .then(function (r) { return r.json(); })
            .then(function (d) { if (d.ok) { toast('头像已更新'); if (window.__rayRefreshAuth) window.__rayRefreshAuth(); } else toast(d.error || '失败'); });
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(f);
      e.target.value = '';
    });

    // tab 切换
    var initTab = (new URLSearchParams(location.search)).get('tab') || 'favs';
    wrap.querySelectorAll('.acc-tab').forEach(function (t) {
      t.addEventListener('click', function () {
        wrap.querySelectorAll('.acc-tab').forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        accTab(t.getAttribute('data-tab'));
      });
    });
    wrap.querySelectorAll('.acc-tab').forEach(function (x) { x.classList.remove('active'); });
    var initEl = wrap.querySelector('.acc-tab[data-tab="' + initTab + '"]');
    if (initEl) initEl.classList.add('active');
    accTab(initTab);
  }

  function accTab(tab) {
    var body = document.getElementById('accBody');
    refreshBalance();
    if (tab === 'favs') {
      body.innerHTML = '<div class="a-load">加载中…</div>';
      fetch(AUTH + '/auth/favorites', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.ok) { body.innerHTML = '<div class="acc-hint">' + (d.error || '加载失败') + '</div>'; return; }
          if (!d.favorites.length) { body.innerHTML = '<div class="acc-hint">还没有收藏任何文章，去文章页点「收藏」吧</div>'; return; }
          var html = '<div class="acc-list">';
          d.favorites.forEach(function (f) {
            html += '<a href="' + esc(f.post_path) + '" target="_blank">📌 ' + esc(f.post_title || f.post_path) + '</a>';
          });
          html += '</div>';
          body.innerHTML = html;
        });
    } else if (tab === 'services') {
      servicesPage(body);
    } else if (tab === 'recharge') {
      body.innerHTML = '<div class="acc-hint">选择支付方式和充值金额，1 元 = 1 点。</div>' +
        '<div class="acc-paytype">' +
          '<button class="acc-pay active" data-pay="alipay"><img src="/img/pay/alipay.svg" width="18" height="18" alt="支付宝">支付宝 <span class="rec">推荐</span></button>' +
          '<button class="acc-pay" data-pay="wechat"><img src="/img/pay/wechat.svg" width="18" height="18" alt="微信支付">微信支付</button>' +
        '</div>' +
        '<div id="accPlanWrap"></div>' +
        '<div id="accPayArea"></div>' +
        '<div class="acc-hint" style="margin-top:18px">— 有兑换码？ —</div>' +
        '<div class="a-form" style="max-width:320px"><input id="accRedeem" placeholder="输入兑换码"><button class="a-btn primary" id="accRedeemBtn">兑换</button></div>' +
        '<div class="acc-hint" id="accRedeemMsg"></div>';
      var curPay = 'alipay';
      var payArea = body.querySelector('#accPayArea');
      var planWrap = body.querySelector('#accPlanWrap');
      function renderPlan() {
        if (curPay === 'alipay') {
          planWrap.innerHTML =
            '<div class="acc-plan">' + [1, 3, 5, 10, 30, 50, 100].map(function (a) { return '<button data-amt="' + a + '">' + a + ' 元</button>'; }).join('') + '</div>' +
            '<div class="a-form" style="max-width:300px"><input id="accCustomAmt" type="number" min="1" placeholder="自定义金额（元）"><button class="a-btn primary" id="accCustomBtn">自定义充值</button></div>';
          payArea.innerHTML = '<div class="acc-hint">选择档位，或输入自定义金额充值</div>';
          planWrap.querySelectorAll('.acc-plan button').forEach(function (b) {
            b.addEventListener('click', function () {
              planWrap.querySelectorAll('.acc-plan button').forEach(function (x) { x.classList.remove('active'); });
              b.classList.add('active');
              createAlipayOrder(parseFloat(b.getAttribute('data-amt')), payArea);
            });
          });
          planWrap.querySelector('#accCustomBtn').addEventListener('click', function () {
            var v = parseFloat(document.getElementById('accCustomAmt').value);
            if (!v || v <= 0) { toast('请输入正确的金额'); return; }
            createAlipayOrder(v, payArea);
          });
          planWrap.querySelector('#accCustomAmt').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
              var v = parseFloat(this.value);
              if (!v || v <= 0) { toast('请输入正确的金额'); return; }
              createAlipayOrder(v, payArea);
            }
          });
        } else {
          planWrap.innerHTML = '';
          renderWechat(payArea);
        }
      }
      body.querySelectorAll('.acc-pay').forEach(function (p) {
        p.addEventListener('click', function () {
          body.querySelectorAll('.acc-pay').forEach(function (x) { x.classList.remove('active'); });
          p.classList.add('active');
          curPay = p.getAttribute('data-pay');
          renderPlan();
        });
      });
      renderPlan();
      document.getElementById('accRedeemBtn').addEventListener('click', function () {
        var code = document.getElementById('accRedeem').value.trim();
        var msg = document.getElementById('accRedeemMsg');
        if (!code) { msg.textContent = '请输入兑换码'; return; }
        msg.textContent = '正在兑换…';
        fetch(AUTH + '/auth/redeem', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ code: code }) })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (!d.ok) { msg.textContent = d.error; return; }
            msg.textContent = '✅ ' + d.msg;
            document.getElementById('accRedeem').value = '';
            if (window.__rayRefreshAuth) window.__rayRefreshAuth();
            refreshBalance();
          })
          .catch(function () { msg.textContent = '网络错误'; });
      });
    } else if (tab === 'orders') {
      ordersPage(body);
    } else if (tab === 'spends') {
      body.innerHTML = '<div class="a-load">加载中…</div>';
      fetch(AUTH + '/auth/spend-log', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.ok) { body.innerHTML = '<div class="acc-hint">' + (d.error || '加载失败') + '</div>'; return; }
          if (!d.logs.length) { body.innerHTML = '<div class="acc-hint">暂无扣费记录</div>'; return; }
          var items = { email: '邮箱服务', daily: '每日日报', ai: 'AI 聊天', redeem: '兑换' };
          var html = '<table class="a-table"><tr><th>项目</th><th>描述</th><th>点数</th><th>时间</th></tr>';
          d.logs.forEach(function (l) {
            html += '<tr><td>' + (items[l.item] || l.item) + '</td><td>' + esc(l.detail) + '</td><td style="color:#ef4444">-' + l.points + '</td><td>' + fmtTime(l.created_at) + '</td></tr>';
          });
          html += '</table>';
          body.innerHTML = html;
        })
        .catch(function () { body.innerHTML = '<div class="acc-hint">网络错误</div>'; });
    }
  }

  // 订单记录 + 余额校验
  function ordersPage(body) {
    body.innerHTML = '<div class="a-load">加载中…</div>';
    fetch(AUTH + '/auth/orders', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) { body.innerHTML = '<div class="acc-hint">' + (d.error || '加载失败') + '</div>'; return; }
        var html = '';
        var bal = d.balance || 0;
        var total = d.total_confirmed || 0;
        if (bal > total) {
          html += '<div class="acc-wx-tip">⚠️ 余额异常：余额 ' + bal + ' 点大于总充值 ' + total + ' 点。<br>错误，请联系管理员 ray@ray2.asia</div>';
        }
        html += '<div class="acc-hint">当前余额：' + bal + ' 点 · 已确认总充值：' + total + ' 点</div>';
        if (d.orders.length) {
          html += '<table class="a-table"><tr><th>订单号</th><th>金额</th><th>点数</th><th>支付方式</th><th>状态</th><th>付款时间</th></tr>';
          d.orders.forEach(function (o) {
            var method = o.method === 'alipay' ? '支付宝' : o.method === 'wechat' ? '微信' : o.method === 'manual' ? '补录' : o.method;
            var status = o.status === 'confirmed' ? '<span class="badge ok">已到账</span>' : o.status === 'pending' ? '<span class="badge bad">待确认</span>' : '<span class="badge bad">已失效</span>';
            var invLink = o.status === 'confirmed' ? ' <a href="javascript:void(0)" class="inv-link" style="color:#425aef;font-size:12px" data-oid="' + o.id + '" data-amt="' + o.amount + '">去开发票</a>' : '';
            html += '<tr><td style="font-family:monospace;font-size:12px">XH' + o.id + invLink + '</td><td>¥' + o.amount + '</td><td>' + o.points + '</td><td>' + method + '</td><td>' + status + '</td><td>' + fmtTime(o.confirmed_at || o.created_at) + '</td></tr>';
          });
          html += '</table>';
        } else {
          html += '<div class="acc-hint">暂无充值记录</div>';
        }
        body.innerHTML = html;
        body.querySelectorAll('.inv-link').forEach(function (a) {
          a.addEventListener('click', function () { showInvoiceForm(body, parseInt(a.getAttribute('data-oid')), parseFloat(a.getAttribute('data-amt'))); });
        });
      })
      .catch(function () { body.innerHTML = '<div class="acc-hint">网络错误</div>'; });
  }

  // 发票申请表单
  function showInvoiceForm(body, oid, amount) {
    var old = body.querySelector('#invFormWrap');
    if (old) old.remove();
    var wrap = document.createElement('div');
    wrap.id = 'invFormWrap';
    wrap.style.cssText = 'border:1px solid #d1d5db;border-radius:8px;padding:16px;margin-bottom:16px;background:var(--card-bg,#fff)';
    var inp = 'width:100%;padding:9px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:13.5px;outline:none;background:#fff;color:#1f2937;box-sizing:border-box;margin-bottom:8px';
    wrap.innerHTML =
      '<h4 style="margin:0 0 10px">🧾 开发票（订单 XH' + oid + ' · ' + amount + ' 元）</h4>' +
      '<div style="max-width:340px">' +
        '<select id="invType" style="' + inp + '">' +
          '<option value="personal">个人抬头</option><option value="enterprise">企业抬头</option>' +
        '</select>' +
        '<input id="invTitle" placeholder="发票抬头 *" style="' + inp + '">' +
        '<input id="invTaxNo" placeholder="企业税号（企业抬头必填）" style="' + inp + 'display:none">' +
        '<input id="invEmail" placeholder="接收发票的邮箱 *" style="' + inp + '">' +
        '<button class="a-btn primary" id="invSubmit" style="width:100%">提交开票申请</button>' +
      '</div>' +
      '<div class="acc-hint" id="invMsg"></div>' +
      '<button class="a-btn" id="invClose" style="margin-top:8px">关闭</button>';
    body.insertBefore(wrap, body.firstChild);
    document.getElementById('invType').addEventListener('change', function () {
      document.getElementById('invTaxNo').style.display = this.value === 'enterprise' ? '' : 'none';
    });
    document.getElementById('invClose').addEventListener('click', function () { wrap.remove(); });
    document.getElementById('invSubmit').addEventListener('click', function () {
      var msg = document.getElementById('invMsg');
      var title = document.getElementById('invTitle').value.trim();
      var taxNo = document.getElementById('invTaxNo').value.trim();
      var email = document.getElementById('invEmail').value.trim();
      var type = document.getElementById('invType').value;
      if (!title) { msg.textContent = '请填写发票抬头'; return; }
      if (type === 'enterprise' && !taxNo) { msg.textContent = '企业抬头需要填写税号'; return; }
      if (!email) { msg.textContent = '请填写接收发票的邮箱'; return; }
      msg.textContent = '正在提交…';
      fetch(AUTH + '/auth/invoice', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ order_id: oid, inv_type: type, title: title, tax_no: taxNo, invoice_email: email }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.ok) { msg.textContent = d.error || '提交失败'; return; }
          msg.textContent = '✅ 开票申请已提交，发票开好后会发送到你填写的邮箱。';
          document.getElementById('invSubmit').disabled = true;
        })
        .catch(function () { msg.textContent = '网络错误'; });
    });
  }

  // ===== 我的服务 =====
  function servicesPage(body) {
    body.innerHTML = '<div class="a-load">加载中…</div>';
    fetch(AUTH + '/auth/my-services', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) { body.innerHTML = '<div class="acc-hint">' + (d.error || '加载失败') + '</div>'; return; }
        var map = {};
        (d.services || []).forEach(function (s) { map[s.service_type] = s; });
        var defs = [
          { type: 'email', name: '@ray2.asia 邮箱申请', desc: '获得 xxx@ray2.asia 邮箱，收信转发到你的邮箱', price: '12 点 / 年' },
          { type: 'digital', name: 'AI 数字人聊天', desc: '与我的数字分身对话', price: '免费' },
          { type: 'daily', name: '每日日报订阅', desc: '每天收到 AI 汇总的新闻日报', price: '2 点/月 · 20 点/年' },
          { type: 'ai', name: 'AI 网关', desc: 'AI 聊天、多模型对话', price: '免费' }
        ];
        defs.forEach(function (sv) { sv.data = map[sv.type] || null; });
        function isOpen(s) {
          if (s.type === 'digital' || s.type === 'ai') return true;
          return s.data && (s.data.status === 'active' || s.data.status === 'pending' || s.data.status === 'paused');
        }
        function sortKey(s) {
          if (s.type === 'digital' || s.type === 'ai') return -1; // 永久已开通，排最前
          if (s.data && s.data.created_at) return s.data.created_at;
          return Infinity; // 未开通，排最后
        }
        defs.sort(function (a, b) {
          var oa = isOpen(a), ob = isOpen(b);
          if (oa !== ob) return oa ? -1 : 1;
          if (oa && ob) return sortKey(a) - sortKey(b);
          return 0;
        });
        var html = '';
        defs.forEach(function (sv) { html += svcCard(sv.type, sv.name, sv.desc, sv.data, sv.price); });
        body.innerHTML = html;
        bindSvc(body);
      })
      .catch(function () { body.innerHTML = '<div class="acc-hint">网络错误</div>'; });
  }

  var SVC_CATS = { game: '游戏圈', anime: '二次元', china: '国内大新闻', world: '国际大新闻', ai: 'AI圈大新闻', contest: '大学生竞赛', github: 'GitHub热榜', tech: '科技圈大新闻', finance: '金融经济' };

  function svcCard(type, name, desc, data, price) {
    var permanent = (type === 'digital' || type === 'ai');
    var statusHtml, extra = '';
    if (permanent) {
      statusHtml = '<span class="badge ok">已开通</span>';
    } else if (data && data.status === 'active') {
      var info = {};
      try { info = JSON.parse(data.detail || '{}'); } catch (e) {}
      var catCount = (info.interests || []).length + (info.custom ? 1 : 0);
      var sendText = info.send_time ? '发送：每天 ' + info.send_time : '';
      if (type === 'daily') {
        statusHtml = '<div style="display:flex;flex-direction:column;align-items:stretch;gap:6px">' +
          '<span class="badge ok" style="align-self:center">已开通</span>' +
          '<button class="a-btn" data-act="pause" data-type="daily">暂停服务</button>' +
          '<button class="a-btn primary" data-act="change" data-count="' + catCount + '">更改品类</button>' +
          '</div>';
      } else {
        statusHtml = '<span class="badge ok">已开通</span>';
      }
      extra = '<div class="svc-exp">到期：' + fmtTime(data.expires_at) + (type === 'daily' && sendText ? ' · ' + sendText : '') + '</div>';
    } else if (data && data.status === 'paused') {
      statusHtml = '<span class="badge bad">已暂停</span><div style="margin-top:6px"><button class="a-btn primary" data-act="resume" data-type="' + type + '">恢复服务</button></div>';
      extra = '<div class="svc-exp">到期：' + fmtTime(data.expires_at) + '</div>';
    } else if (data && data.status === 'pending') {
      statusHtml = '<span class="badge bad">待确认</span>';
      extra = '<div class="svc-exp">等待管理员开通' + (data.detail ? '（' + data.detail + '）' : '') + '</div>';
    } else {
      statusHtml = '<button class="a-btn primary" data-svc="' + type + '">去开通</button>';
      var tip = type === 'email' ? '点击「去开通」查看为什么你需要这个域名邮箱' : '';
      extra = '<div class="svc-price">' + price + (tip ? ' · ' + tip : '') + '</div>';
    }
    return '<div class="svc-card"><div class="svc-main"><div class="svc-name">' + name + '</div><div class="svc-desc">' + desc + '</div>' + extra + '</div><div class="svc-status">' + statusHtml + '</div></div>';
  }

  function bindSvc(body) {
    body.querySelectorAll('[data-svc], [data-act]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var type = btn.getAttribute('data-svc');
        var act = btn.getAttribute('data-act');
        if (type === 'email') location.href = '/account/service.html?type=email';
        else if (type === 'daily') location.href = '/account/service.html?type=daily';
        else if (act === 'pause') {
          var t = btn.getAttribute('data-type');
          if (!confirm('确认暂停每日日报订阅？暂停后不再发送日报，到期时间保留。')) return;
          fetch(AUTH + '/auth/service-pause', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ service_type: t }) })
            .then(function (r) { return r.json(); })
            .then(function (d) { toast(d.ok ? '已暂停' : (d.error || '操作失败')); servicesPage(body); })
            .catch(function () { toast('网络错误'); });
        } else if (act === 'change') {
          location.href = '/account/service.html?type=daily&mode=change&count=' + (btn.getAttribute('data-count') || 4);
        } else if (act === 'resume') {
          var rt = btn.getAttribute('data-type');
          if (!confirm('确认恢复每日日报订阅？恢复后按原品类和到期时间继续发送。')) return;
          fetch(AUTH + '/auth/service-resume', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ service_type: rt }) })
            .then(function (r) { return r.json(); })
            .then(function (d) { toast(d.ok ? '已恢复' : (d.error || '操作失败')); servicesPage(body); })
            .catch(function () { toast('网络错误'); });
        }
      });
    });
  }

  function openEmailForm(body) {
    body.insertAdjacentHTML('beforeend',
      '<div class="svc-form"><h3>开通 @ray2.asia 邮箱</h3>' +
      '<div class="acc-hint">12 点 / 年。设置你想要的邮箱前缀（字母/数字/._-，1-30 位）：</div>' +
      '<div class="a-form" style="max-width:340px"><input id="svcMailPrefix" placeholder="前缀"><span style="align-self:center;flex-shrink:0">@ray2.asia</span></div>' +
      '<button class="a-btn primary" id="svcMailBtn">确认开通（12 点）</button>' +
      '<div class="acc-hint" id="svcMailMsg"></div></div>');
    document.getElementById('svcMailBtn').addEventListener('click', function () {
      var prefix = document.getElementById('svcMailPrefix').value.trim();
      var msg = document.getElementById('svcMailMsg');
      if (!prefix) { msg.textContent = '请输入前缀'; return; }
      msg.textContent = '正在提交…';
      fetch(AUTH + '/auth/service-order', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ service_type: 'email', email_prefix: prefix }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.ok) { msg.textContent = d.error || '提交失败'; return; }
          msg.textContent = '✅ ' + (d.msg || '已提交');
          refreshBalance();
          setTimeout(function () { servicesPage(body); }, 1200);
        })
        .catch(function () { msg.textContent = '网络错误'; });
    });
  }

  function openDailyForm(body) {
    body.insertAdjacentHTML('beforeend',
      '<div class="svc-form"><h3>开通每日日报订阅</h3>' +
      '<div class="acc-hint">每天收到 AI 汇总的新闻日报。</div>' +
      '<div class="a-form" style="max-width:360px"><button class="a-btn primary" id="svcDailyMonth">1 个月（2 点）</button><button class="a-btn primary" id="svcDailyYear">1 年（20 点）</button></div>' +
      '<div class="acc-hint" id="svcDailyMsg"></div></div>');
    var doBuy = function (duration) {
      var msg = document.getElementById('svcDailyMsg');
      msg.textContent = '正在开通…';
      fetch(AUTH + '/auth/service-order', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ service_type: 'daily', duration: duration }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.ok) { msg.textContent = d.error || '开通失败'; return; }
          msg.textContent = '✅ ' + (d.msg || '已开通');
          refreshBalance();
          setTimeout(function () { servicesPage(body); }, 1200);
        })
        .catch(function () { msg.textContent = '网络错误'; });
    };
    document.getElementById('svcDailyMonth').addEventListener('click', function () { doBuy('month'); });
    document.getElementById('svcDailyYear').addEventListener('click', function () { doBuy('year'); });
  }

  function renderWechat(area) {
    var planWrap = document.getElementById('accPlanWrap');
    if (planWrap) {
      planWrap.innerHTML =
        '<div class="acc-plan">' + [1, 3, 5, 10, 30, 50, 100].map(function (a) { return '<button data-amt="' + a + '">' + a + ' 元</button>'; }).join('') + '</div>' +
        '<div class="a-form" style="max-width:300px"><input id="accWxCustomAmt" type="number" min="1" placeholder="自定义金额（元）"><button class="a-btn primary" id="accWxCustomBtn">自定义充值</button></div>';
      planWrap.querySelectorAll('.acc-plan button').forEach(function (b) {
        b.addEventListener('click', function () {
          planWrap.querySelectorAll('.acc-plan button').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          createWechatOrder(parseFloat(b.getAttribute('data-amt')), area);
        });
      });
      planWrap.querySelector('#accWxCustomBtn').addEventListener('click', function () {
        var v = parseFloat(document.getElementById('accWxCustomAmt').value);
        if (!v || v <= 0) { toast('请输入正确的金额'); return; }
        createWechatOrder(v, area);
      });
    }
    area.innerHTML = '<div class="acc-hint">选择档位，或输入自定义金额充值</div>';
  }

  function createWechatOrder(amount, area) {
    area.innerHTML = '<div class="a-load">正在生成支付二维码…</div>';
    fetch(AUTH + '/pay/wechat/create', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ amount: amount }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) { area.innerHTML = '<div class="acc-hint">' + (d.error || '下单失败') + '</div>'; return; }
        area.innerHTML = '<div class="acc-qr"><img src="' + esc(d.qrcode) + '" alt="支付二维码"><p>请用微信扫码支付 ' + amount + ' 元</p><div class="a-load">等待支付…</div></div>';
        var iv = setInterval(function () {
          fetch(AUTH + '/pay/order-status?order_id=' + d.order_id, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(function (r) { return r.json(); })
            .then(function (st) {
              if (st.ok && st.status === 'confirmed') {
                clearInterval(iv);
                area.innerHTML = '<div class="acc-qr"><p style="color:#059669;font-weight:600">✅ 充值成功，已到账 ' + st.points + ' 点</p></div>';
                if (window.__rayRefreshAuth) window.__rayRefreshAuth();
                refreshBalance();
              } else if (st.ok && st.status === 'failed') {
                clearInterval(iv);
                area.innerHTML = '<div class="acc-hint">订单已失效，请重试</div>';
              }
            });
        }, 3000);
      })
      .catch(function () { area.innerHTML = '<div class="acc-hint">网络错误</div>'; });
  }

  function createAlipayOrder(amount, area) {
    area.innerHTML = '<div class="a-load">正在生成支付二维码…</div>';
    fetch(AUTH + '/pay/alipay/create', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ amount: amount }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) { area.innerHTML = '<div class="acc-hint">' + (d.error || '下单失败') + '</div>'; return; }
        area.innerHTML = '<div class="acc-qr"><img src="' + esc(d.qrcode) + '" alt="支付二维码"><p>请用支付宝扫码支付 ' + amount + ' 元</p><div class="a-load">等待支付…</div></div>';
        var iv = setInterval(function () {
          fetch(AUTH + '/pay/order-status?order_id=' + d.order_id, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(function (r) { return r.json(); })
            .then(function (st) {
              if (st.ok && st.status === 'confirmed') {
                clearInterval(iv);
                area.innerHTML = '<div class="acc-qr"><p style="color:#059669;font-weight:600">✅ 充值成功，已到账 ' + st.points + ' 点</p></div>';
                if (window.__rayRefreshAuth) window.__rayRefreshAuth();
                refreshBalance();
              } else if (st.ok && (st.status === 'failed')) {
                clearInterval(iv);
                area.innerHTML = '<div class="acc-hint">订单已失效，请重试</div>';
              }
            });
        }, 3000);
      })
      .catch(function () { area.innerHTML = '<div class="acc-hint">网络错误</div>'; });
  }

  // ===== 管理中心 =====
  function renderAdmin() {
    var wrap = document.getElementById('accWrap');
    wrap.style.maxWidth = 'none';
    wrap.innerHTML = '' +
      '<div class="admin-layout">' +
        '<div class="admin-side">' +
          '<div class="at">管理中心</div>' +
          '<div class="admin-menu active" data-page="users">👥 用户管理</div>' +
          '<div class="admin-menu" data-page="monitor" id="monParent">📊 服务监控 <span style="float:right">▸</span></div>' +
          '<div id="monSub" style="display:none">' +
            '<div class="admin-sub" data-page="monitor-email">📧 邮箱服务</div>' +
            '<div class="admin-sub" data-page="monitor-digital">🤖 数字人聊天</div>' +
            '<div class="admin-sub" data-page="monitor-daily">📰 每日日报</div>' +
            '<div class="admin-sub" data-page="monitor-gateway">🌐 AI 网关</div>' +
          '</div>' +
          '<div class="admin-menu" data-page="recharge">💰 充值补录</div>' +
          '<div class="admin-menu" data-page="revenue">💰 总营收统计</div>' +
          '<div class="admin-menu" data-page="redeem">🎟️ 兑换码管理</div>' +
          '<div class="admin-menu" data-page="invoice">🧾 发票处理</div>' +
          '<div class="admin-menu" data-page="me">🙋 个人中心</div>' +
          '<div class="admin-back"><a href="/">← 返回博客</a></div>' +
        '</div>' +
        '<div class="admin-main" id="adminMain"></div>' +
      '</div>';
    var side = wrap.querySelector('.admin-side');
    side.addEventListener('click', function (e) {
      var m = e.target.closest('.admin-menu, .admin-sub');
      if (!m) return;
      // 服务监控：展开/收起子项
      if (m.getAttribute('data-page') === 'monitor') {
        var sub = document.getElementById('monSub');
        var show = sub.style.display !== 'block';
        sub.style.display = show ? 'block' : 'none';
        side.querySelectorAll('.admin-menu, .admin-sub').forEach(function (x) { x.classList.remove('active'); });
        if (show) m.classList.add('active');
        return;
      }
      side.querySelectorAll('.admin-menu, .admin-sub').forEach(function (x) { x.classList.remove('active'); });
      m.classList.add('active');
      if (m.classList.contains('admin-sub')) {
        var par = document.getElementById('monParent');
        if (par) par.classList.add('active');
      }
      adminPage(m.getAttribute('data-page'));
    });
    adminPage('users');
  }

  function adminPage(page) {
    var main = document.getElementById('adminMain');
    if (page === 'users') usersPage(main);
    else if (page === 'monitor') monitorPage(main);
    else if (page === 'monitor-email') monitorServicePage(main, 'email');
    else if (page === 'monitor-digital') monitorServicePage(main, 'digital');
    else if (page === 'monitor-daily') monitorServicePage(main, 'daily');
    else if (page === 'monitor-gateway') monitorServicePage(main, 'gateway');
    else if (page === 'revenue') revenuePage(main);
    else if (page === 'recharge') rechargePage(main);
    else if (page === 'redeem') redeemPage(main);
    else if (page === 'invoice') invoicePage(main);
    else if (page === 'me') render(curUser, main);
  }

  // 单服务监控：用户列表 + token（成本占位）
  function monitorServicePage(main, type) {
    var names = { email: '📧 邮箱服务', digital: '🤖 数字人聊天', daily: '📰 每日日报', gateway: '🌐 AI 网关' };
    main.innerHTML = '<h3>' + names[type] + '</h3><div class="a-load">加载中…</div>';
    Promise.all([
      adminApi('/admin/monitor/' + type),
      type === 'gateway' ? adminApi('/admin/config') : Promise.resolve(null)
    ]).then(function (res) {
      var d = res[0], cfg = res[1];
      if (!d.ok) { main.innerHTML = '<h3>' + names[type] + '</h3><div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
      var html = '<h3>' + names[type] + '</h3>';
      if (type === 'gateway' && cfg && cfg.ok) {
        var realTxt = cfg.real_rate ? '<b>' + cfg.real_rate.toFixed(4) + '</b>' : '<b style="color:#ef4444">获取失败</b>';
        var profitTxt = cfg.profit_rate ? (cfg.profit_rate * 100).toFixed(1) + '%' : '-';
        html += '<div class="mon-card" style="margin-bottom:12px"><div class="mon-name">定价参数（汇率 / 倍率）</div><div class="mon-items" style="gap:8px;flex-wrap:wrap">' +
          '<span>设定汇率 <input type="number" id="cfgRate" value="' + cfg.rate + '" step="0.1" min="0.1" style="width:76px;padding:4px 6px;border:1px solid #d1d5db;border-radius:6px;font-size:13px"></span>' +
          '<span>倍率 <input type="number" id="cfgMul" value="' + cfg.multiplier + '" step="0.1" min="0.1" style="width:76px;padding:4px 6px;border:1px solid #d1d5db;border-radius:6px;font-size:13px"></span>' +
          '<button class="a-btn primary" id="cfgSave" style="padding:5px 14px">保存</button>' +
          '</div>' +
          '<div class="mon-name" style="margin-top:8px;font-size:12px;color:#6b7280;font-weight:400">实时美元/人民币汇率：' + realTxt + '</div>' +
          '<div class="mon-name" style="margin-top:4px;font-size:12px;color:#6b7280;font-weight:400">利润率：(设定汇率 × 倍率) ÷ 真实汇率 = <b id="cfgProfit" data-real="' + (cfg.real_rate || '') + '" style="color:#425aef">' + profitTxt + '</b></div>' +
          '<div class="mon-name" style="margin-top:4px;color:#9ca3af;font-size:12px;font-weight:400">保存后用户端定价表按新值计算</div></div>';
      }
      html += '<div class="mon-card" style="margin-bottom:12px"><div class="mon-name">Token 消耗</div><div class="mon-items">' +
        '<span>输入：<b>' + d.tokens.input + '</b></span><span>输出：<b>' + d.tokens.output + '</b></span>' +
        (d.calls !== undefined ? '<span>调用次数：<b>' + d.calls + '</b></span>' : '') +
        '</div></div>';
      if (d.users && d.users.length) {
        html += '<table class="a-table"><tr><th>用户</th><th>状态</th><th>到期</th><th>操作</th></tr>';
        d.users.forEach(function (u) {
          var st = u.status === 'active' ? '<span class="badge ok">开通</span>' : u.status === 'paused' ? '<span class="badge bad">暂停</span>' : '<span class="badge bad">' + esc(u.status) + '</span>';
          var toggleBtn = '<button class="a-btn ' + (u.status === 'active' ? 'danger' : 'primary') + '" data-monitor-toggle data-id="' + u.service_id + '" data-status="' + (u.status === 'active' ? 'paused' : 'active') + '">' + (u.status === 'active' ? '暂停' : '恢复') + '</button>';
          html += '<tr><td>' + esc(u.nickname || '') + ' ' + esc(u.email) + '</td><td>' + st + '</td><td>' + fmtTime(u.expires_at) + '</td><td>' + toggleBtn + '</td></tr>';
        });
        html += '</table>';
      } else if (d.users && !d.users.length) {
        html += '<div class="a-empty">暂无该服务用户</div>';
      } else {
        html += '<div class="a-empty">暂无用户数据</div>';
      }
      main.innerHTML = html;
      if (type === 'gateway') bindGatewayConfig(main);
      bindMonitorToggle(main);
    }).catch(function () { main.innerHTML = '<h3>' + names[type] + '</h3><div class="a-empty">网络错误</div>'; });
  }

  function bindGatewayConfig(main) {
    var btn = main.querySelector('#cfgSave');
    if (!btn) return;
    var rateEl = main.querySelector('#cfgRate');
    var mulEl = main.querySelector('#cfgMul');
    var profitEl = main.querySelector('#cfgProfit');
    function updateProfit() {
      var r = parseFloat(rateEl.value) || 0;
      var m = parseFloat(mulEl.value) || 0;
      var real = parseFloat(profitEl.getAttribute('data-real')) || 0;
      profitEl.textContent = (r > 0 && m > 0 && real > 0) ? (r * m / real * 100).toFixed(1) + '%' : '-';
    }
    rateEl.addEventListener('input', updateProfit);
    mulEl.addEventListener('input', updateProfit);
    btn.addEventListener('click', function () {
      var rate = parseFloat(rateEl.value);
      var mul = parseFloat(mulEl.value);
      if (!isFinite(rate) || rate <= 0) { toast('请输入有效汇率'); return; }
      if (!isFinite(mul) || mul <= 0) { toast('请输入有效倍率'); return; }
      btn.disabled = true;
      adminApi('/admin/config', { method: 'POST', body: JSON.stringify({ rate: rate, multiplier: mul }) })
        .then(function (d) { btn.disabled = false; toast(d.ok ? '已保存' : (d.error || '保存失败')); })
        .catch(function () { btn.disabled = false; toast('网络错误'); });
    });
  }

  function bindMonitorToggle(main) {
    main.querySelectorAll('[data-monitor-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        var status = btn.getAttribute('data-status');
        if (!confirm('确认' + (status === 'paused' ? '暂停' : '恢复') + '该用户的服务？')) return;
        adminApi('/admin/service-toggle', { method: 'POST', body: JSON.stringify({ service_id: parseInt(id), status: status }) })
          .then(function (d) { toast(d.ok ? '已' + (status === 'paused' ? '暂停' : '恢复') : (d.error || '操作失败')); location.reload(); })
          .catch(function () { toast('网络错误'); });
      });
    });
  }

  // 总营收统计（成本占位）
  function revenuePage(main) {
    main.innerHTML = '<h3>💰 总营收统计</h3><div class="a-load">加载中…</div>';
    adminApi('/admin/revenue').then(function (d) {
      if (!d.ok) { main.innerHTML = '<h3>💰 总营收统计</h3><div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
      var html = '<h3>💰 总营收统计</h3><div class="mon-grid">' +
        '<div class="mon-card"><div class="mon-name">充值总额</div><div class="mon-items"><span>金额：<b>¥' + d.total_amount + '</b></span><span>笔数：<b>' + d.total_orders + '</b></span></div></div>';
      (d.by_method || []).forEach(function (m) {
        html += '<div class="mon-card"><div class="mon-name">' + esc(m.method) + '</div><div class="mon-items"><span>金额：<b>¥' + m.amount + '</b></span><span>笔数：<b>' + m.count + '</b></span></div></div>';
      });
      html += '<div class="mon-card"><div class="mon-name">Token 消耗</div><div class="mon-items"><span>输入：<b>' + d.tokens.input + '</b></span><span>输出：<b>' + d.tokens.output + '</b></span></div></div>';
      html += '<div class="mon-card"><div class="mon-name">成本估算</div><div class="mon-items"><span>待核算</span></div></div>';
      html += '</div>';
      main.innerHTML = html;
    }).catch(function () { main.innerHTML = '<h3>💰 总营收统计</h3><div class="a-empty">网络错误</div>'; });
  }

  // 服务监控（除 AI 聊天调用外）
  function monitorPage(main) {
    main.innerHTML = '<h3>📊 服务监控</h3><div class="a-load">加载中…</div>';
    adminApi('/admin/monitor').then(function (d) {
      if (!d.ok) { main.innerHTML = '<h3>📊 服务监控</h3><div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
      var html = '<h3>📊 服务监控</h3><div class="mon-grid">' +
        '<div class="mon-card"><div class="mon-name">📧 @ray2.asia 邮箱</div><div class="mon-items">' +
          '<span>已开通：<b>' + d.email.active + '</b></span><span>待确认：<b>' + d.email.pending + '</b></span><span>7 天内到期：<b>' + d.email.expiring + '</b></span></div></div>' +
        '<div class="mon-card"><div class="mon-name">🤖 AI 数字人</div><div class="mon-items">' +
          '<span>总调用：<b>' + d.digital.calls + '</b> 次</span><span>近 24h：<b>' + d.digital.today + '</b> 次</span></div></div>' +
        '<div class="mon-card"><div class="mon-name">📰 每日日报</div><div class="mon-items">' +
          '<span>订阅中：<b>' + d.daily.active + '</b></span><span>今日已发送：<b>' + d.daily.sent_today + '</b></span><span>今日待发送：<b>' + d.daily.pending + '</b></span><span>7 天内到期：<b>' + d.daily.expiring + '</b></span></div></div>' +
        '<div class="mon-card"><div class="mon-name">🌐 AI 网关</div><div class="mon-items">' +
          '<span>注册用户：<b>' + d.gateway.users + '</b></span></div></div>' +
        '</div>';
      main.innerHTML = html;
    }).catch(function () { main.innerHTML = '<h3>📊 服务监控</h3><div class="a-empty">网络错误</div>'; });
  }

  // 事件委托：处理所有带 data-action 的按钮
  function bindActions(container) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.getAttribute('data-action');
      var uid = btn.getAttribute('data-uid');
      if (action === 'toggle') {
        adminApi('/admin/user-status', { method: 'POST', body: JSON.stringify({ user_id: parseInt(uid), status: btn.getAttribute('data-status') }) }).then(function (d) {
          toast(d.ok ? '已更新' : d.error); usersPage(document.getElementById('adminMain'));
        });
      } else if (action === 'usage') {
        usagePage(parseInt(uid), btn.getAttribute('data-mail'));
      } else if (action === 'confirm') {
        adminApi('/admin/recharge-confirm', { method: 'POST', body: JSON.stringify({ order_id: parseInt(btn.getAttribute('data-oid')) }) }).then(function (d) {
          toast(d.ok ? '已确认到账' : d.error); rechargePage(document.getElementById('adminMain'));
        });
      }
    });
  }

  // 用户管理
  function usersPage(main) {
    main.innerHTML = '<h3>👥 用户管理</h3>' +
      '<div class="a-search"><input id="auQ" placeholder="搜索邮箱 / 昵称"><button class="a-btn primary" id="auBtn">搜索</button></div>' +
      '<div id="auList" class="a-load">加载中…</div>';
    bindActions(main);
    var load = function (q) {
      adminApi('/admin/users?q=' + encodeURIComponent(q)).then(function (d) {
        if (!d.ok) { main.querySelector('#auList').innerHTML = '<div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
        if (!d.users.length) { main.querySelector('#auList').innerHTML = '<div class="a-empty">没有找到用户</div>'; return; }
        var html = '<table class="a-table"><tr><th>ID</th><th>邮箱</th><th>余额</th><th>状态</th><th>操作</th></tr>';
        d.users.forEach(function (u) {
          var st = u.status === 'active' ? '<span class="badge ok">正常</span>' : '<span class="badge bad">封禁</span>';
          html += '<tr><td>' + u.id + '</td><td>' + esc(u.nickname || '') + ' ' + esc(u.email) + '</td><td>' + u.balance + '</td><td>' + st + '</td>' +
            '<td><button class="a-btn ' + (u.status === 'active' ? 'danger' : 'primary') + '" data-action="toggle" data-uid="' + u.id + '" data-status="' + (u.status === 'active' ? 'disabled' : 'active') + '">' + (u.status === 'active' ? '封禁' : '解封') + '</button> ' +
            '<button class="a-btn" data-action="usage" data-uid="' + u.id + '" data-mail="' + esc(u.email) + '">消费</button></td></tr>';
        });
        html += '</table>';
        main.querySelector('#auList').innerHTML = html;
      });
    };
    load('');
    main.querySelector('#auBtn').addEventListener('click', function () { load(main.querySelector('#auQ').value.trim()); });
    main.querySelector('#auQ').addEventListener('keydown', function (e) { if (e.key === 'Enter') load(this.value.trim()); });
  }

  // 用户消费记录
  function usagePage(uid, mail) {
    var main = document.getElementById('adminMain');
    main.innerHTML = '<h3>消费记录：' + esc(mail) + '</h3><div id="auUsage" class="a-load">加载中…</div><p><button class="a-btn" id="auBack">← 返回用户列表</button></p>';
    bindActions(main);
    main.querySelector('#auBack').addEventListener('click', function () { usersPage(main); });
    adminApi('/admin/user-usage?user_id=' + uid).then(function (d) {
      if (!d.ok) { main.querySelector('#auUsage').innerHTML = '<div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
      if (!d.logs.length) { main.querySelector('#auUsage').innerHTML = '<div class="a-empty">暂无消费记录</div>'; return; }
      var html = '<table class="a-table"><tr><th>时间</th><th>模型</th><th>输入/输出</th><th>点数</th></tr>';
      d.logs.forEach(function (l) {
        html += '<tr><td>' + fmtTime(l.created_at) + '</td><td>' + esc(l.model || '-') + '</td><td>' + l.input_tokens + ' / ' + l.output_tokens + '</td><td>' + l.points + '</td></tr>';
      });
      html += '</table>';
      main.querySelector('#auUsage').innerHTML = html;
    });
  }

  // 充值补录
  function rechargePage(main) {
    main.innerHTML = '<h3>💰 补录充值</h3>' +
      '<div class="a-form"><input id="arUid" placeholder="用户ID" type="number"><input id="arAmt" placeholder="金额(元)" type="number" step="0.01"><button class="a-btn primary" id="arBtn">补录（1元=1点）</button></div>' +
      '<div class="a-err" style="font-size:12px;color:#ef4444;min-height:14px;margin-bottom:10px" id="arErr"></div>' +
      '<h3>待确认充值</h3><div id="arPending" class="a-load">加载中…</div>';
    bindActions(main);
    main.querySelector('#arBtn').addEventListener('click', function () {
      var uid = main.querySelector('#arUid').value.trim();
      var amt = main.querySelector('#arAmt').value.trim();
      var err = main.querySelector('#arErr');
      if (!uid || !amt) { err.textContent = '请填写用户ID和金额'; return; }
      adminApi('/admin/recharge', { method: 'POST', body: JSON.stringify({ user_id: parseInt(uid), amount: parseFloat(amt) }) }).then(function (d) {
        if (!d.ok) { err.textContent = d.error || '补录失败'; return; }
        err.textContent = '';
        toast('已补录 ' + d.points + ' 点');
        loadPending();
      });
    });
    var loadPending = function () {
      adminApi('/admin/pending-recharges').then(function (d) {
        if (!d.ok) { main.querySelector('#arPending').innerHTML = '<div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
        if (!d.orders.length) { main.querySelector('#arPending').innerHTML = '<div class="a-empty">暂无待确认充值</div>'; return; }
        var html = '<table class="a-table"><tr><th>ID</th><th>邮箱</th><th>金额</th><th>点数</th><th>时间</th><th>操作</th></tr>';
        d.orders.forEach(function (o) {
          html += '<tr><td>' + o.id + '</td><td>' + esc(o.email) + '</td><td>¥' + o.amount + '</td><td>' + o.points + '</td><td>' + fmtTime(o.created_at) + '</td>' +
            '<td><button class="a-btn primary" data-action="confirm" data-oid="' + o.id + '">确认到账</button></td></tr>';
        });
        html += '</table>';
        main.querySelector('#arPending').innerHTML = html;
      });
    };
    loadPending();
  }

  // 兑换码管理
  function redeemPage(main) {
    main.innerHTML = '<h3>🎟️ 生成兑换码</h3>' +
      '<div class="a-form"><input id="rrPts" placeholder="每个兑换码的点数" type="number"><input id="rrCnt" placeholder="生成数量" type="number"><button class="a-btn primary" id="rrBtn">生成</button></div>' +
      '<div id="rrCodes" style="margin-bottom:6px"></div>' +
      '<h3>兑换记录</h3><div id="rrList" class="a-load">加载中…</div>';
    bindActions(main);
    main.querySelector('#rrBtn').addEventListener('click', function () {
      var pts = main.querySelector('#rrPts').value.trim();
      var cnt = main.querySelector('#rrCnt').value.trim();
      if (!pts || !cnt) { toast('请填写点数和数量'); return; }
      adminApi('/admin/redeem-create', { method: 'POST', body: JSON.stringify({ points: parseInt(pts), count: parseInt(cnt) }) }).then(function (d) {
        if (!d.ok) { toast(d.error || '生成失败'); return; }
        var codesHtml = '<div class="a-tip">生成 ' + d.codes.length + ' 个兑换码：</div><div style="font-family:monospace;font-size:12.5px;color:#425aef;word-break:break-all">' + esc(d.codes.join('  ')) + '</div>';
        main.querySelector('#rrCodes').innerHTML = codesHtml;
        loadRedeem();
      });
    });
    var loadRedeem = function () {
      adminApi('/admin/redeem-list').then(function (d) {
        if (!d.ok) { main.querySelector('#rrList').innerHTML = '<div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
        if (!d.codes.length) { main.querySelector('#rrList').innerHTML = '<div class="a-empty">暂无兑换码</div>'; return; }
        var html = '<table class="a-table"><tr><th>兑换码</th><th>点数</th><th>状态</th><th>创建时间</th><th>操作</th></tr>';
        d.codes.forEach(function (c) {
          var st = c.status === 'unused' ? '<span class="badge ok">未使用</span>' : '<span class="badge bad">已使用</span>';
          var op = c.status === 'unused' ? '<button class="a-btn danger rr-del" data-id="' + c.id + '">失效并删除</button>' : '';
          html += '<tr><td style="font-family:monospace">' + esc(c.code) + '</td><td>' + c.points + '</td><td>' + st + '</td><td>' + fmtTime(c.created_at) + '</td><td>' + op + '</td></tr>';
        });
        html += '</table>';
        main.querySelector('#rrList').innerHTML = html;
        main.querySelectorAll('.rr-del').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var id = parseInt(btn.getAttribute('data-id'));
            if (!confirm('确定要失效并删除该兑换码吗？删除后无法恢复')) return;
            btn.disabled = true;
            adminApi('/admin/redeem-delete', { method: 'POST', body: JSON.stringify({ id: id }) }).then(function (d) {
              if (!d.ok) { toast(d.error || '删除失败'); btn.disabled = false; return; }
              toast('已删除');
              loadRedeem();
            });
          });
        });
      });
    };
    loadRedeem();
  }

  // 发票处理
  function invoicePage(main) {
    main.innerHTML = '<h3>🧾 发票处理</h3><div id="invList" class="a-load">加载中…</div>';
    var load = function () {
      adminApi('/admin/invoices').then(function (d) {
        if (!d.ok) { main.querySelector('#invList').innerHTML = '<div class="a-empty">' + (d.error || '加载失败') + '</div>'; return; }
        var list = d.invoices || [];
        if (!list.length) { main.querySelector('#invList').innerHTML = '<div class="a-empty">暂无发票申请</div>'; return; }
        var html = '';
        list.forEach(function (inv) {
          var st = inv.status === 'pending' ? '<span class="badge ok">待处理</span>' : '<span class="badge bad">已发送</span>';
          var typeName = inv.inv_type === 'enterprise' ? '企业' : '个人';
          html += '<div style="border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:10px">' +
            '<div><b>#' + inv.id + '</b> ' + esc(inv.title) + ' · ' + inv.amount + ' 元 · ' + st + '</div>' +
            '<div style="font-size:12px;color:#6b7280;margin:4px 0">用户：' + esc(inv.email) + '（#' + inv.user_id + '）｜订单：XH' + inv.order_id + '｜类型：' + typeName + '｜税号：' + esc(inv.tax_no || '无') + '｜接收邮箱：' + esc(inv.invoice_email) + '｜申请时间：' + fmtTime(inv.created_at) + (inv.sent_at ? '｜发送时间：' + fmtTime(inv.sent_at) : '') + '</div>' +
            (inv.status === 'pending' ?
              '<div style="margin-top:8px">' +
                '<input id="invSubj_' + inv.id + '" placeholder="邮件主题" value="你的发票已开具（' + inv.amount + ' 元）" style="width:100%;margin-bottom:6px;padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;box-sizing:border-box">' +
                '<textarea id="invContent_' + inv.id + '" rows="2" placeholder="邮件内容（可留空）" style="width:100%;margin-bottom:6px;padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;box-sizing:border-box"></textarea>' +
                '<div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;font-size:12px;color:#6b7280">' +
                  '<input type="file" id="invFile_' + inv.id + '" accept="image/*,.pdf" style="font-size:12px">' +
                  '<span id="invFileName_' + inv.id + '"></span>' +
                '</div>' +
                '<button class="a-btn primary" data-send="' + inv.id + '">📨 发送发票</button>' +
              '</div>' : '') +
          '</div>';
        });
        main.querySelector('#invList').innerHTML = html;
        list.forEach(function (inv) {
          var fi = document.getElementById('invFile_' + inv.id);
          if (fi) fi.addEventListener('change', function () {
            var f = this.files[0];
            if (f) document.getElementById('invFileName_' + inv.id).textContent = f.name + ' (' + Math.round(f.size / 1024) + 'KB)';
          });
        });
        main.querySelectorAll('[data-send]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var id = parseInt(btn.getAttribute('data-send'));
            var fileInput = document.getElementById('invFile_' + id);
            var doSend = function (attachment, filename, mime) {
              btn.disabled = true;
              adminApi('/admin/invoice-send', { method: 'POST', body: JSON.stringify({
                invoice_id: id,
                subject: document.getElementById('invSubj_' + id).value,
                content: document.getElementById('invContent_' + id).value,
                attachment: attachment || '',
                filename: filename || '',
                mime: mime || ''
              }) }).then(function (d) {
                if (!d.ok) { toast(d.error || '发送失败'); btn.disabled = false; return; }
                toast('发票已发送');
                load();
              });
            };
            if (fileInput && fileInput.files && fileInput.files[0]) {
              var f = fileInput.files[0];
              var reader = new FileReader();
              reader.onload = function (ev) {
                var base64 = (ev.target.result || '').split(',')[1] || '';
                doSend(base64, f.name, f.type || 'application/octet-stream');
              };
              reader.readAsDataURL(f);
            } else {
              doSend('', '', '');
            }
          });
        });
      });
    };
    load();
  }

  // ===== 启动 =====
  if (!token) { showLoginMsg(); return; }
  fetch(AUTH + '/auth/me', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d.ok || !d.user) { showLoginMsg(); return; }
      curUser = d.user;
      if (d.user.role === 'admin') renderAdmin();
      else render(d.user);
    })
    .catch(function () { showLoginMsg(); });
})();
</script>
