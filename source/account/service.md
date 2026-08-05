---
title: 服务开通
date: 2026-08-05
comments: false
aside: false
---

<style>
.s-wrap{max-width:560px;margin:0 auto}
.s-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:28px}
.s-card h2{font-size:18px;color:#1f2937;margin:0 0 16px}
[data-theme="dark"] .s-card h2{color:#e5e7eb}
.s-card h3{font-size:14px;color:#425aef;margin:20px 0 8px}
.s-card ul{margin:0;padding-left:18px;color:#6b7280;font-size:13.5px;line-height:1.8}
[data-theme="dark"] .s-card ul{color:#9ca3af}
.s-form{margin-top:20px;border-top:1px solid var(--border-color,#e5e7eb);padding-top:16px}
.s-form label{display:block;font-size:13px;color:#6b7280;margin-bottom:8px}
[data-theme="dark"] .s-form label{color:#9ca3af}
.s-row{display:flex;gap:8px;align-items:center;margin-bottom:12px}
.s-row input{flex:1;min-width:0;padding:10px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;outline:none;background:#fff;color:#1f2937;box-sizing:border-box}
[data-theme="dark"] .s-row input{background:#0d1117;border-color:#374151;color:#e5e7eb}
.s-row span{flex-shrink:0;color:#6b7280}
.s-form button{width:100%;padding:11px;border:none;border-radius:8px;background:#425aef;color:#fff;font-size:14px;cursor:pointer;font-family:inherit}
.s-form button:hover:not(:disabled){opacity:.85}
.s-msg{font-size:13px;color:#6b7280;margin-top:10px;min-height:16px}
.s-back{display:block;text-align:center;margin-top:16px;font-size:13px;color:#9ca3af;text-decoration:none}
.s-back:hover{color:#425aef}
.s-sections{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.s-sec{display:flex;gap:10px;padding:12px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;cursor:pointer;align-items:flex-start}
.s-sec:has(input:checked){border-color:#425aef;background:rgba(66,90,239,.06)}
.s-sec input{margin-top:3px}
.s-sec b{display:block;font-size:13.5px;color:#1f2937}
[data-theme="dark"] .s-sec b{color:#e5e7eb}
.s-sec i{display:block;font-size:12px;color:#9ca3af;font-style:normal;margin-top:2px;line-height:1.5}
.s-dur{padding:11px 18px;border:1px solid var(--border-color,#e5e7eb);border-radius:8px;background:var(--card-bg,#fff);color:#1f2937;font-size:14px;cursor:pointer;font-family:inherit}
[data-theme="dark"] .s-dur{background:#1f2937;color:#e5e7eb}
.s-dur:hover{border-color:#425aef;color:#425aef}
.s-dur.active{border-color:#425aef;color:#425aef;font-weight:600;box-shadow:0 0 0 1px #425aef}
.s-durs{display:flex;gap:8px;flex-wrap:wrap}
.s-custom{display:block;font-size:13px;color:#6b7280;margin:10px 0 6px}
[data-theme="dark"] .s-custom{color:#9ca3af}
.s-cost{font-size:14px;color:#425aef;font-weight:600;margin:14px 0}
.s-confirm{width:100%;padding:11px;border:none;border-radius:8px;background:#425aef;color:#fff;font-size:14px;cursor:pointer;font-family:inherit;margin-top:4px}
.s-confirm:hover:not(:disabled){opacity:.85}
.s-login{text-align:center;padding:60px 20px;color:#6b7280}
.s-login a{color:#425aef}
</style>

<div class="s-wrap" id="svcOpen"></div>

<script>
(function () {
  var AUTH = 'https://ai-gateway.ray2.asia';
  var token = window.__rayToken || localStorage.getItem('ray_auth_token') || '';
  var type = new URLSearchParams(location.search).get('type') || 'email';
  var box = document.getElementById('svcOpen');
  var SECTIONS = [
    { id: 'game', name: '游戏圈', desc: '游戏行业动态、新作发布与电竞' },
    { id: 'anime', name: '二次元', desc: '动漫、漫画、ACGN 圈新鲜事' },
    { id: 'china', name: '国内大新闻', desc: '国内要闻与社会热点' },
    { id: 'world', name: '国际大新闻', desc: '全球要闻与国际局势' },
    { id: 'ai', name: 'AI 圈大新闻', desc: 'AI 行业动态与模型发布' },
    { id: 'contest', name: '大学生竞赛', desc: '学科竞赛、保研加分赛事资讯' },
    { id: 'github', name: 'GitHub 热榜', desc: '热门开源项目与技术趋势' },
    { id: 'tech', name: '科技圈大新闻', desc: '科技行业动态与创新' },
    { id: 'finance', name: '金融经济', desc: '财经、市场与经济要闻' }
  ];
  if (!token) { box.innerHTML = '<div class="s-login">请先 <a href="/account/">登录</a> 后开通服务</div>'; return; }
  if (type === 'email') renderEmail(); else renderDaily();

  function renderEmail() {
    box.innerHTML = '' +
      '<div class="s-card"><h2>开通 @ray2.asia 邮箱</h2>' +
      '<h3>为什么你需要 @ray2.asia 的邮箱？</h3>' +
      '<ul>' +
        '<li><b>轻松注册国外 AI 服务</b>：ChatGPT、Claude、Midjourney 等国外 AI 服务对 QQ、163 等国内邮箱常设限或风控，自定义域名邮箱更容易通过注册与验证。</li>' +
        '<li><b>更专业的形象</b>：简历、商务、投稿中使用域名邮箱，比 QQ 邮箱正式得多。</li>' +
        '<li><b>收信集中转发</b>：所有来信自动转发到你自己的邮箱，无需安装新客户端。</li>' +
        '<li><b>隐私隔离</b>：用独立邮箱处理各类注册，避免主邮箱被骚扰。</li>' +
      '</ul>' +
      '<h3>@ray2.asia 可以为你做什么？</h3>' +
      '<ul>' +
        '<li>获得专属邮箱地址：<b>xxx@ray2.asia</b>（1 年使用权）</li>' +
        '<li>收信实时转发到你指定的邮箱</li>' +
        '<li>用于注册各类 AI 工具、学术网站、海外服务、订阅</li>' +
      '</ul>' +
      '<div class="s-form"><label>设置邮箱前缀（字母/数字/._-，1-30 位）</label>' +
      '<div class="s-row"><input id="sMailPrefix" placeholder="例如 wang"><span>@ray2.asia</span></div>' +
      '<button id="sMailBtn">确认开通（12 点）</button>' +
      '<div class="s-msg" id="sMailMsg"></div></div>' +
      '<a class="s-back" href="/account/">← 返回个人中心</a></div>';
    document.getElementById('sMailBtn').addEventListener('click', function () {
      var p = document.getElementById('sMailPrefix').value.trim();
      var msg = document.getElementById('sMailMsg');
      if (!p) { msg.textContent = '请输入前缀'; return; }
      msg.textContent = '正在提交…';
      fetch(AUTH + '/auth/service-order', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ service_type: 'email', email_prefix: p }) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (!d.ok) { msg.textContent = d.error; return; } msg.textContent = '✅ ' + d.msg; setTimeout(function () { location.href = '/account/'; }, 1500); })
        .catch(function () { msg.textContent = '网络错误'; });
    });
  }

  function renderDaily() {
    var q = new URLSearchParams(location.search);
    var mode = q.get('mode') || '';
    var lockCount = parseInt(q.get('count') || '0') || 0;
    var title = mode === 'change' ? '更改每日日报订阅品类' : '开通每日日报订阅';
    var catHint = mode === 'change'
      ? '选择 ' + lockCount + ' 个品类（品类数量保持不变，只能换不能增减）'
      : '选择你感兴趣的品类（至少 4 个，多于 4 个每多 1 个 +0.5 点/月）';
    box.innerHTML = '' +
      '<div class="s-card"><h2>' + title + '</h2>' +
      '<h3>' + catHint + '</h3>' +
      '<div class="s-sections">' + SECTIONS.map(function (s) { return '<label class="s-sec"><input type="checkbox" value="' + s.id + '"><span><b>' + s.name + '</b><i>' + s.desc + '</i></span></label>'; }).join('') +
        '<label class="s-sec"><input type="checkbox" id="sCustomChk"><span><b>自定义品类</b><i>描述你关注的领域，为你定制</i></span></label>' +
      '</div>' +
      '<div id="sCustomWrap" style="display:none"><label class="s-custom">自定义品类描述</label><input id="sCustomDesc" placeholder="描述你关注的领域" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;outline:none;background:#fff;color:#1f2937"></div>' +
      (mode === 'change' ? '' :
        '<h3>订阅时长</h3>' +
        '<div class="s-durs"><button class="s-dur active" data-dur="1m">1 个月</button><button class="s-dur" data-dur="3m">3 个月</button><button class="s-dur" data-dur="6m">6 个月</button><button class="s-dur" data-dur="1y">1 年</button></div>') +
      '<h3>每日发送时间</h3>' +
      '<input type="time" id="sSendTime" value="08:00" style="padding:8px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;background:#fff;color:#1f2937">' +
      '<div class="s-cost" id="sCost"></div>' +
      '<button class="s-confirm" id="sDailyBtn">' + (mode === 'change' ? '确认更改' : '确认开通') + '</button>' +
      '<div class="s-msg" id="sDailyMsg"></div>' +
      '<a class="s-back" href="/account/">← 返回个人中心</a></div>';
    var dur = '1m';
    var recalc = function () {
      var count = document.querySelectorAll('.s-sec input:checked').length;
      if (mode === 'change') {
        document.getElementById('sCost').textContent = count === lockCount ? '品类数量保持 ' + lockCount + ' 个，无需额外扣费' : '请选择 ' + lockCount + ' 个品类（已选 ' + count + ' 个）';
        return;
      }
      if (count < 4) { document.getElementById('sCost').textContent = '至少选择 4 个品类（已选 ' + count + ' 个）'; return; }
      var m = 2 + (count - 4) * 0.5;
      var p = dur === '3m' ? m * 3 : dur === '6m' ? m * 6 : dur === '1y' ? 20 + (count - 4) * 6 : m;
      document.getElementById('sCost').textContent = '本次消耗：' + p + ' 点';
    };
    document.querySelectorAll('.s-sec input').forEach(function (c) {
      c.addEventListener('change', function () {
        if (c.id === 'sCustomChk') document.getElementById('sCustomWrap').style.display = c.checked ? '' : 'none';
        if (mode === 'change') {
          var n = document.querySelectorAll('.s-sec input:checked').length;
          if (n > lockCount) c.checked = false;
        }
        recalc();
      });
    });
    document.querySelectorAll('.s-dur').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.s-dur').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        dur = b.getAttribute('data-dur');
        recalc();
      });
    });
    recalc();
    document.getElementById('sDailyBtn').addEventListener('click', function () {
      var interests = [];
      document.querySelectorAll('.s-sec input:checked').forEach(function (c) { if (c.id !== 'sCustomChk') interests.push(c.value); });
      var customDesc = document.getElementById('sCustomChk').checked ? document.getElementById('sCustomDesc').value.trim() : '';
      var count = interests.length + (customDesc ? 1 : 0);
      var msg = document.getElementById('sDailyMsg');
      if (mode === 'change') {
        if (count !== lockCount) { msg.textContent = '请选择 ' + lockCount + ' 个品类（已选 ' + count + ' 个）'; return; }
        if (!confirm('更改每日日报订阅品类（保持 ' + lockCount + ' 个品类）？\n不额外扣费。\n\n是否确认更改？')) return;
      } else {
        if (count < 4) { msg.textContent = '至少选择 4 个品类（已选 ' + count + ' 个）'; return; }
        var m = 2 + (count - 4) * 0.5;
        var cost = dur === '3m' ? m * 3 : dur === '6m' ? m * 6 : dur === '1y' ? 20 + (count - 4) * 6 : m;
        var durName = { '1m': '1 个月', '3m': '3 个月', '6m': '6 个月', '1y': '1 年' }[dur];
        if (!confirm('您的服务：每日日报订阅（' + durName + '，' + count + ' 个品类）\n本次消耗点数：' + cost + ' 点\n\n是否确认开通？')) return;
      }
      msg.textContent = '正在提交…';
      fetch(AUTH + '/auth/service-order', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ service_type: 'daily', duration: dur, interests: interests, custom_desc: customDesc, send_time: document.getElementById('sSendTime').value || '08:00' }) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (!d.ok) { msg.textContent = d.error; return; } msg.textContent = '✅ ' + d.msg; setTimeout(function () { location.href = '/account/'; }, 1500); })
        .catch(function () { msg.textContent = '网络错误'; });
    });
  }
})();
</script>
