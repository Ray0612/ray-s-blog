---
title: 每日日报
date: 2026-06-02
comments: false
---

<style>
.daily-loading{text-align:center;padding:60px 20px;color:#9ca3af;font-size:14px}
.daily-error{text-align:center;padding:40px 20px;color:#dc2626;font-size:14px}
.daily-list{margin-bottom:16px}
.daily-list a{display:inline-block;padding:4px 10px;margin:3px;border:1px solid var(--border-color,#e5e7eb);border-radius:6px;font-size:13px;color:var(--text-color,#374151);text-decoration:none;transition:.15s}
.daily-list a:hover,.daily-list a.active{border-color:var(--theme-color,#425aef);color:var(--theme-color,#425aef);background:rgba(66,90,239,.05)}
.daily-content{background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:12px;padding:20px 24px;min-height:200px;line-height:1.8;font-size:14px;color:var(--text-color,#1f2937)}
.daily-content h2{font-size:17px;margin:14px 0 8px;padding-bottom:6px;border-bottom:2px solid #e5e7eb;color:var(--text-color,#111827)}
.daily-content h3{font-size:15px;margin:10px 0 6px;color:var(--text-color,#111827)}
.daily-content p{margin:4px 0}
.daily-content strong{color:var(--text-color,#111827)}
.daily-content br{content:'';display:block;margin:2px 0}
.daily-footer{text-align:center;padding:12px;color:#9ca3af;font-size:12px;margin-top:16px}
</style>

<div id="daily-app">
  <div class="daily-loading">⏳ 加载中...</div>
</div>

<script>
var API = 'https://daily.ray2.asia';

// 加载日报列表
fetch(API + '/api/list')
  .then(function(r) { return r.json(); })
  .then(function(list) {
    renderApp(list);
    // 默认加载第一篇
    if (list.length > 0) loadNewsletter(list[0].date);
  })
  .catch(function(e) {
    document.getElementById('daily-app').innerHTML = '<div class="daily-error">加载失败：' + e.message + '</div>';
  });

function renderApp(list) {
  var html = '';

  if (list.length > 0) {
    html += '<div class="daily-list">';
    for (var i = 0; i < list.length; i++) {
      html += '<a href="javascript:void(0)" onclick="loadNewsletter(\'' + list[i].date + '\')" id="link-' + list[i].date + '">' + list[i].date + '</a>';
    }
    html += '</div>';
  } else {
    html += '<div class="daily-loading">暂无日报，每天 6:00 自动生成</div>';
  }

  html += '<div class="daily-content" id="daily-content">' + (list.length === 0 ? '' : '选择上方日期查看日报') + '</div>';
  html += '<div class="daily-footer">由 DeepSeek V4 Flash 生成 · AI 内容仅供参考</div>';

  document.getElementById('daily-app').innerHTML = html;
}

function loadNewsletter(date) {
  var content = document.getElementById('daily-content');
  content.innerHTML = '<div class="daily-loading">⏳ 加载中...</div>';

  // 高亮当前日期
  var links = document.querySelectorAll('.daily-list a');
  for (var i = 0; i < links.length; i++) links[i].classList.remove('active');
  var activeLink = document.getElementById('link-' + date);
  if (activeLink) activeLink.classList.add('active');

  fetch(API + '/api/item?date=' + date)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.body_html) {
        content.innerHTML = data.body_html;
      } else {
        content.innerHTML = '<div class="daily-error">日报内容为空</div>';
      }
    })
    .catch(function(e) {
      content.innerHTML = '<div class="daily-error">加载失败：' + e.message + '</div>';
    });
}
</script>
