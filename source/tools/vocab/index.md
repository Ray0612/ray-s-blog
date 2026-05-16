---
title: 词汇记忆助手
date: 2026-05-16
comments: false
---

<link rel="stylesheet" href="/css/tools.css">

{% raw %}
<div id="vocab-app">
  <!-- Step 1: 选词库 -->
  <div id="step-category" class="vs-step">
    <h3>📚 选择词库</h3>
    <div class="cat-grid" id="cat-list"></div>
  </div>

  <!-- Step 2: 选天数 -->
  <div id="step-days" class="vs-step" style="display:none">
    <h3>📅 选择记忆天数</h3>
    <div class="day-grid">
      <button class="day-btn" onclick="setDays(10)">10 天</button>
      <button class="day-btn" onclick="setDays(20)">20 天</button>
      <button class="day-btn" onclick="setDays(30)">30 天</button>
      <button class="day-btn" onclick="setDays(60)">60 天</button>
    </div>
    <div class="day-custom">
      <input id="day-input" type="number" min="1" max="365" placeholder="自定义天数">
      <button class="ts-btn" style="width:auto;padding:8px 20px;margin:0" onclick="var d=parseInt(document.getElementById('day-input').value);if(d>0)setDays(d)">确定</button>
    </div>
  </div>

  <!-- Step 3: 选筛选方式 -->
  <div id="step-mode" class="vs-step" style="display:none">
    <h3>🔍 选择筛选方式</h3>
    <div class="mode-grid">
      <button class="mode-btn" onclick="startFilter('card')">
        <div class="mode-icon">🃏</div>
        <div class="mode-name">逐个卡片</div>
        <div class="mode-desc">逐个词标记认识/不认识</div>
      </button>
      <button class="mode-btn" onclick="startFilter('batch')">
        <div class="mode-icon">📋</div>
        <div class="mode-name">批量勾选</div>
        <div class="mode-desc">每页30词，批量勾选已掌握的</div>
      </button>
      <button class="mode-btn" onclick="startFilter('quick')">
        <div class="mode-icon">⚡</div>
        <div class="mode-name">快速浏览</div>
        <div class="mode-desc">列表滚动，标记已掌握</div>
      </button>
      <button class="mode-btn mode-skip" onclick="skipFilter()">
        <div class="mode-icon">⏭️</div>
        <div class="mode-name">跳过筛选</div>
        <div class="mode-desc">直接按全部词库生成记忆计划</div>
      </button>
    </div>
  </div>

  <!-- 筛选区域 -->
  <div id="filter-area" style="display:none">
    <div class="filter-header">
      <span id="filter-stats">加载中...</span>
      <span>
        <button class="vs-btn-sm" onclick="resetAll()">⟲ 重新开始</button>
      </span>
    </div>

    <!-- Mode A: 逐个卡片 -->
    <div id="mode-card" class="mode-panel" style="display:none">
      <div class="card-box">
        <div class="card-word" id="card-word">loading</div>
        <div class="card-meaning" id="card-meaning"></div>
        <div class="card-btns" id="card-btns">
          <button class="vs-btn vs-btn-know" onclick="cardAction(true)">✅ 认识</button>
          <button class="vs-btn vs-btn-dont" onclick="cardAction(false)">❌ 不认识</button>
        </div>
      </div>
      <div style="text-align:center;margin-top:12px">
        <button class="vs-btn" onclick="finishFilter()">→ 生成记忆计划</button>
      </div>
    </div>

    <!-- Mode B: 批量勾选 -->
    <div id="mode-batch" class="mode-panel" style="display:none">
      <div id="batch-words"></div>
      <div class="batch-nav">
        <button class="vs-btn-sm" onclick="batchPageTurn(-1)">‹ 上一页</button>
        <span id="batch-info"></span>
        <button class="vs-btn-sm" onclick="batchPageTurn(1)">下一页 ›</button>
        <span class="batch-jump">跳转 <input id="batch-jump" type="number" min="1" style="width:50px"> <button class="vs-btn-sm" onclick="batchJump()">GO</button></span>
      </div>
      <div class="batch-footer">
        <button class="vs-btn-sm" onclick="batchAll()">全选本页</button>
        <button class="vs-btn-sm" onclick="batchClear()">清空本页</button>
        <button class="vs-btn vs-btn-know" onclick="batchSubmit()">✅ 标记选中为已掌握</button>
        <button class="vs-btn" onclick="finishFilter()">→ 生成记忆计划</button>
      </div>
    </div>

    <!-- Mode C: 快速浏览 -->
    <div id="mode-quick" class="mode-panel" style="display:none">
      <div id="quick-list"></div>
      <div style="text-align:center;margin-top:16px;font-size:.82rem;color:var(--card-meta,#999)" id="quick-info"></div>
      <div style="text-align:center;margin-top:12px">
        <button class="vs-btn" onclick="finishFilter()">→ 生成记忆计划</button>
      </div>
    </div>
  </div>

  <!-- 生成计划 -->
  <div id="step-plan" style="display:none">
    <div class="plan-header">
      <span id="plan-stats"></span>
      <button class="ts-btn" style="width:auto;padding:10px 20px;display:inline-block;margin-right:8px" onclick="printPlan(this)" title="适用于电脑端非Safari浏览器，排版精美速度快">🖨️ 打印导出PDF</button>
      <button id="_cloud_btn" class="ts-btn" style="width:auto;padding:10px 20px;display:inline-block;background:#43a047" onclick="cloudPlan(this)" title="适用于所有端，速度稍慢">☁️ 云导出PDF</button>
    </div>
    <div id="plan-content"></div>
  </div>
</div>

<script>
var CATS = [
  { id: 'cet4', name: '四级词汇', file: '/files/vocab/四级词汇.csv', count: 4449 },
  { id: 'cet6', name: '六级词汇', file: '/files/vocab/六级词汇.csv', count: 2084 },
];
var words = [], knownSet = new Set(), currentCat = 'cet4';
var curDays = 0, curMode = '';
var batchPage = 0, BATCH_SIZE = 30;
var batchWordList = [];

function loadCats() {
  var el = document.getElementById('cat-list');
  el.innerHTML = '';
  for (var i = 0; i < CATS.length; i++) {
    el.innerHTML += '<div class="cat-card" onclick="selectCat(' + i + ')" data-idx="' + i + '"><div class="cat-name">' + CATS[i].name + '</div><div class="cat-count">' + CATS[i].count + ' 词</div></div>';
  }
}
loadCats();
// 预热 PDF 生成 Worker，避免云导出冷启动超时
fetch('https://pdf.ray2.asia/', { method: 'POST', body: '{"days":[[0]],"planDays":1}', headers: {'Content-Type':'application/json'} }).catch(function(){});

function selectCat(idx) {
  document.querySelectorAll('.cat-card').forEach(function(el) { el.classList.toggle('active', parseInt(el.dataset.idx) === idx); });
  currentCat = CATS[idx].id;
  loadCSV(CATS[idx].file);
}

function loadCSV(url) {
  document.getElementById('filter-stats').textContent = '加载词库中...';
  fetch(url).then(function(r) { return r.text(); }).then(function(text) {
    var lines = text.trim().split('\n');
    words = [];
    for (var i = 1; i < lines.length; i++) {
      var parts = lines[i].split(',');
      if (parts.length >= 3) words.push({ word: parts[1].trim(), meaning: parts.slice(2).join(',').trim() });
    }
    document.getElementById('filter-stats').textContent = '✅ 已加载 ' + words.length + ' 个词';
    showStep('step-days');
  });
}

function showStep(id) {
  var steps = document.querySelectorAll('.vs-step');
  for (var i = 0; i < steps.length; i++) steps[i].style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

function setDays(d) { if (!d || d < 1) return; curDays = d; showStep('step-mode'); }

// === 开始筛选 ===
function startFilter(mode) {
  curMode = mode; knownSet = new Set();
  document.getElementById('filter-area').style.display = 'block';
  document.getElementById('step-plan').style.display = 'none';
  document.querySelectorAll('.mode-panel').forEach(function(el) { el.style.display = 'none'; });
  if (mode === 'card') startCard();
  else if (mode === 'batch') startBatch();
  else if (mode === 'quick') startQuick();
}

function skipFilter() {
  knownSet = new Set();
  finishFilter();
}

function getUnknown() {
  var u = [];
  for (var i = 0; i < words.length; i++) { if (!knownSet.has(i)) u.push(i); }
  return u;
}

function updateStats() {
  var u = getUnknown();
  document.getElementById('filter-stats').textContent = '总词: ' + words.length + ' | 已掌握: ' + knownSet.size + ' | 剩余: ' + u.length;
}

// === Mode A: 卡片 ===
var cardIdx = 0;

function startCard() {
  cardIdx = 0; document.getElementById('mode-card').style.display = 'block'; nextCard();
}

function nextCard() {
  while (cardIdx < words.length && knownSet.has(cardIdx)) cardIdx++;
  if (cardIdx >= words.length) { finishFilter(); return; }
  document.getElementById('card-word').textContent = words[cardIdx].word;
  document.getElementById('card-meaning').textContent = words[cardIdx].meaning;
  updateStats();
}

function cardAction(know) {
  if (know) knownSet.add(cardIdx);
  cardIdx++;
  nextCard();
}

// === Mode B: 批量 ===
function startBatch() {
  batchWordList = getUnknown();
  batchPage = 0;
  document.getElementById('mode-batch').style.display = 'block';
  renderBatch();
}

function renderBatch() {
  var total = batchWordList.length;
  var totalPages = Math.ceil(total / BATCH_SIZE) || 1;
  if (batchPage >= totalPages) batchPage = totalPages - 1;
  if (batchPage < 0) batchPage = 0;

  var start = batchPage * BATCH_SIZE;
  var pageWords = batchWordList.slice(start, start + BATCH_SIZE);

  var html = '<div class="batch-grid">';
  for (var i = 0; i < pageWords.length; i++) {
    var idx = pageWords[i];
    var known = knownSet.has(idx);
    html += '<label class="batch-item' + (known ? ' batch-known' : '') + '"><input type="checkbox" class="batch-cb" data-idx="' + idx + '" ' + (known ? 'checked disabled' : '') + '><span class="batch-word">' + esc(words[idx].word) + '</span><span class="batch-mean">' + esc(words[idx].meaning) + '</span></label>';
  }
  html += '</div>';
  document.getElementById('batch-words').innerHTML = html;
  document.getElementById('batch-info').textContent = (batchPage + 1) + '/' + totalPages + ' 页 | 总计 ' + total + ' 词 | 已掌握 ' + knownSet.size;
  updateStats();
}

function batchPageTurn(d) { batchPage += d; renderBatch(); }

function batchJump() {
  var p = parseInt(document.getElementById('batch-jump').value);
  if (p > 0) { batchPage = p - 1; renderBatch(); }
}

function batchAll() { document.querySelectorAll('.batch-cb:not(:disabled)').forEach(function(el) { el.checked = true; }); }
function batchClear() { document.querySelectorAll('.batch-cb:not(:disabled)').forEach(function(el) { el.checked = false; }); }

function batchSubmit() {
  document.querySelectorAll('.batch-cb:checked:not(:disabled)').forEach(function(el) { knownSet.add(parseInt(el.dataset.idx)); });
  renderBatch();
}

// === Mode C: 快速浏览 ===
function startQuick() {
  document.getElementById('mode-quick').style.display = 'block'; renderQuick();
}

function renderQuick() {
  var html = '';
  for (var i = 0; i < words.length; i++) {
    html += '<div class="quick-item' + (knownSet.has(i) ? ' quick-known' : '') + '" id="qi_' + i + '"><span class="quick-word">' + esc(words[i].word) + '</span><span class="quick-mean">' + esc(words[i].meaning) + '</span><button class="quick-btn" onclick="toggleKnown(this,' + i + ')">' + (knownSet.has(i) ? '✓' : '✕') + '</button></div>';
  }
  document.getElementById('quick-list').innerHTML = html;
  document.getElementById('quick-info').textContent = '总词: ' + words.length + ' | 已掌握: ' + knownSet.size + ' | 剩余: ' + getUnknown().length;
  updateStats();
}

function toggleKnown(btn, idx) {
  if (knownSet.has(idx)) { knownSet.delete(idx); btn.textContent = '✕'; }
  else { knownSet.add(idx); btn.textContent = '✓'; }
  var item = document.getElementById('qi_' + idx);
  if (item) item.classList.toggle('quick-known', knownSet.has(idx));
  document.getElementById('quick-info').textContent = '总词: ' + words.length + ' | 已掌握: ' + knownSet.size + ' | 剩余: ' + getUnknown().length;
  updateStats();
}


// === 生成计划 ===
function finishFilter() {
  document.querySelectorAll('.mode-panel').forEach(function(el) { el.style.display = 'none'; });
  document.getElementById('step-plan').style.display = 'block';
  generatePlan();
}

function generatePlan() {
  var unknown = getUnknown();
  if (unknown.length === 0) {
    document.getElementById('plan-content').innerHTML = '<div style="text-align:center;padding:40px;color:var(--font-color,#333)">🎉 所有词汇都已掌握！</div>';
    document.getElementById('plan-stats').textContent = '🎉 全部掌握';
    return;
  }

  var perDay = Math.ceil(unknown.length / curDays);
  var html = '';
  for (var d = 0; d < curDays; d++) {
    var start = d * perDay;
    var dayWords = unknown.slice(start, start + perDay);
    if (dayWords.length === 0) break;
    html += '<div class="day-section"><div class="day-header">Day ' + (d + 1) + '<span class="day-count">' + dayWords.length + ' 词</span></div><div class="day-body">';
    for (var w = 0; w < dayWords.length; w++) {
      html += '<span class="day-word">' + esc(words[dayWords[w]].word) + '</span><span class="day-mean">' + esc(words[dayWords[w]].meaning) + '</span>';
    }
    html += '</div></div>';
  }

  document.getElementById('plan-content').innerHTML = html;
  document.getElementById('plan-stats').textContent = '📊 ' + curDays + ' 天 · 共 ' + unknown.length + ' 个词 · 每天约 ' + perDay + ' 词';
}

function printPlan() {
  var unknown = getUnknown();
  if (unknown.length === 0) return;
  window.print();
}

function cloudPlan(btn) {
  var unknown = getUnknown();
  if (unknown.length === 0) return;
  if (!btn) btn = document.querySelector('#_cloud_btn');
  btn.textContent = '⏳ 云导出中...'; btn.disabled = true;

  var perDay = Math.ceil(unknown.length / curDays);
  var daysList = [];
  for (var d = 0; d < curDays; d++) {
    var start = d * perDay;
    var dayWords = unknown.slice(start, start + perDay);
    if (dayWords.length === 0) break;
    daysList.push(dayWords);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://pdf.ray2.asia/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (xhr.status === 200) {
      var url = URL.createObjectURL(xhr.response);
      var a = document.createElement('a'); a.href = url;
      a.download = '词汇记忆计划_' + curDays + '天.pdf'; a.click();
      URL.revokeObjectURL(url);
    } else { alert('生成失败，请重试'); }
    btn.textContent = '☁️ 云导出PDF'; btn.disabled = false;
  };
  xhr.onerror = function() { alert('网络错误，请重试'); btn.textContent = '☁️ 云导出PDF'; btn.disabled = false; };
  xhr.send(JSON.stringify({ days: daysList, planDays: curDays, wordSet: currentCat }));
}

function resetAll() {
  document.getElementById('filter-area').style.display = 'none';
  document.getElementById('step-plan').style.display = 'none';
  knownSet = new Set(); showStep('step-category');
}

function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
</script>

<style>
#vocab-app { max-width:740px; margin:0 auto 40px; }
#vocab-app h3 { font-size:1.1rem; font-weight:600; margin-bottom:16px; color:var(--font-color,#333); }

/* 词库卡片 */
.cat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
.cat-card { padding:24px; border-radius:10px; border:2px solid var(--border-color,#eee); text-align:center; cursor:pointer; transition:all .2s; background:var(--card-bg,#fff); }
.cat-card:hover { border-color:var(--theme-color,#425aef); transform:translateY(-2px); }
.cat-card.active { border-color:var(--theme-color,#425aef); background:rgba(66,90,239,.06); }
.cat-name { font-weight:600; font-size:1rem; color:var(--font-color,#333); }
.cat-count { font-size:.8rem; color:var(--card-meta,#999); margin-top:4px; }

/* 天数 */
.day-grid { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px; }
.day-btn { padding:14px 28px; border:2px solid var(--border-color,#eee); border-radius:8px; cursor:pointer; font-size:.95rem; background:var(--card-bg,#fff); color:var(--font-color,#333); transition:all .2s; }
.day-btn:hover { border-color:var(--theme-color,#425aef); color:var(--theme-color,#425aef); }
.day-custom { display:flex; gap:8px; align-items:center; margin-top:8px; }
.day-custom input { width:120px; padding:10px 12px; border:1px solid var(--border-color,#ddd); border-radius:6px; font-size:.9rem; background:var(--card-bg,#fff); color:var(--font-color,#333); outline:none; }

/* 模式选择 */
.mode-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
.mode-btn { padding:24px 16px; border:2px solid var(--border-color,#eee); border-radius:10px; cursor:pointer; background:var(--card-bg,#fff); transition:all .2s; text-align:center; }
.mode-btn:hover { border-color:var(--theme-color,#425aef); transform:translateY(-2px); }
.mode-skip { border-style:dashed; }
.mode-icon { font-size:1.8rem; margin-bottom:6px; }
.mode-name { font-weight:600; font-size:.9rem; color:var(--font-color,#333); }
.mode-desc { font-size:.75rem; color:var(--card-meta,#999); margin-top:4px; }

/* 筛选头部 */
.filter-header { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-color,#eee); margin-bottom:16px; font-size:.85rem; color:var(--card-meta,#999); }

/* 卡片 */
.card-box { max-width:480px; margin:0 auto 16px; padding:40px 24px; border-radius:12px; border:2px solid var(--border-color,#eee); text-align:center; background:var(--card-bg,#fff); }
.card-word { font-size:1.8rem; font-weight:700; color:var(--font-color,#333); margin-bottom:12px; }
.card-meaning { font-size:1rem; color:var(--card-meta,#666); margin-bottom:20px; }
.card-btns { display:flex; gap:16px; justify-content:center; }

/* 通用按钮 */
.vs-btn { padding:10px 24px; border:none; border-radius:6px; cursor:pointer; font-size:.9rem; transition:all .2s; color:#fff; background:var(--theme-color,#425aef); }
.vs-btn:hover { opacity:.85; }
.vs-btn-know { background:#43a047; }
.vs-btn-dont { background:#e53935; }
.vs-btn-sm { padding:6px 14px; border:1px solid var(--border-color,#ddd); border-radius:4px; cursor:pointer; font-size:.8rem; background:var(--card-bg,#fff); color:var(--font-color,#333); transition:all .15s; }
.vs-btn-sm:hover { border-color:var(--theme-color,#425aef); color:var(--theme-color,#425aef); }

/* 批量 */
.batch-grid { display:grid; gap:4px; margin-bottom:8px; }
.batch-item { display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:4px; cursor:pointer; transition:background .15s; }
.batch-item:hover { background:rgba(66,90,239,.08); }
.batch-item:hover .batch-word { color:var(--theme-color,#425aef); }
.batch-known { opacity:.4; pointer-events:none; }
.batch-cb { width:16px; height:16px; cursor:pointer; accent-color:var(--theme-color,#425aef); }
.batch-word { font-weight:500; min-width:120px; color:var(--font-color,#333); transition:color .15s; }
.batch-mean { font-size:.83rem; color:var(--card-meta,#666); }
.batch-nav { display:flex; justify-content:center; align-items:center; gap:10px; margin-bottom:8px; font-size:.82rem; color:var(--card-meta,#999); flex-wrap:wrap; }
.batch-jump { display:flex; align-items:center; gap:4px; }
.batch-jump input { padding:4px 6px; border:1px solid var(--border-color,#ddd); border-radius:3px; font-size:.8rem; text-align:center; background:var(--card-bg,#fff); color:var(--font-color,#333); }
.batch-footer { display:flex; justify-content:center; align-items:center; gap:8px; flex-wrap:wrap; margin-top:8px; }

/* 快速浏览 */
.quick-item { display:flex; align-items:center; gap:8px; padding:4px 0; border-bottom:1px solid var(--border-color,#f0f0f0); }
.quick-known { opacity:.35; }
.quick-word { font-weight:500; min-width:120px; color:var(--font-color,#333); font-size:.85rem; }
.quick-mean { font-size:.82rem; color:var(--card-meta,#666); flex:1; }
.quick-btn { padding:2px 10px; border:none; border-radius:3px; cursor:pointer; font-size:.75rem; background:var(--border-color,#eee); color:var(--card-meta,#999); flex-shrink:0; }

/* 计划 */
.plan-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px; font-size:.9rem; color:var(--card-meta,#999); }
.day-section { break-inside:avoid; margin-bottom:16px; }
.day-header { font-weight:600; padding:6px 0; border-bottom:1px solid var(--border-color,#ddd); margin-bottom:6px; color:var(--font-color,#333); display:flex; justify-content:space-between; }
.day-count { font-weight:400; font-size:.8rem; color:var(--card-meta,#999); }
.day-body { columns:3; column-gap:16px; }
.day-word { display:block; font-size:.82rem; font-weight:500; color:var(--font-color,#333); }
.day-mean { display:block; font-size:.78rem; color:var(--card-meta,#666); margin-bottom:6px; break-inside:avoid; }

@media print {
  body * { visibility:hidden; }
  #step-plan, #step-plan * { visibility:visible; }
  #step-plan { position:absolute; left:0; top:0; width:100%; padding:10px 15px; box-sizing:border-box; }
  @page { margin:12mm 10mm; }
  .plan-header { display:none; }
  .day-section { break-inside:avoid; page-break-inside:avoid; margin-bottom:14px; }
  .day-header { font-weight:700; font-size:11pt; border-bottom:1px solid #333; margin-bottom:4px; color:#333; }
  .day-count { font-weight:400; font-size:9pt; color:#999; }
  .day-body { columns:5; column-gap:10px; }
  .day-word { font-size:8.5pt; font-weight:600; color:#000; }
  .day-mean { font-size:7.5pt; color:#888; margin-bottom:3px; }
}
</style>
{% endraw %}
