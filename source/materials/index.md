---
title: 物理教学
date: 2026-05-15
comments: false
---

<style>
.tab-bar{display:flex;gap:8px;margin-bottom:24px;border-bottom:2px solid var(--border-color,#eee);padding-bottom:0}
.tab-btn{padding:10px 24px;border:none;background:none;cursor:pointer;font-size:1rem;color:var(--text-meta,#999);border-bottom:2px solid transparent;margin-bottom:-2px;transition:.2s}
.tab-btn.active{color:var(--theme-color,#425aef);border-bottom-color:var(--theme-color,#425aef);font-weight:600}
.tab-panel{display:none}
.tab-panel.active{display:block}
.toc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-top:16px}
.chapter-card{background:var(--card-bg,#fff);border:1px solid var(--border-color,#eee);border-radius:8px;padding:16px;transition:transform .2s}
.chapter-card:hover{transform:translateY(-2px)}
.chapter-card h3{margin:0 0 8px;font-size:.95em;color:var(--theme-color,#425aef)}
.chapter-card a{display:block;font-size:.82rem;padding:3px 0;color:var(--text-meta,#999);text-decoration:none}
.chapter-card a:hover{color:var(--theme-color,#425aef);text-decoration:underline}
.qa-list{max-width:700px;margin:0 auto}
.qa-item{padding:16px 0;border-bottom:1px solid var(--border-color,#eee)}
.qa-name{font-weight:600;font-size:.9rem;color:var(--text-color,#333)}
.qa-time{font-size:.78rem;color:var(--text-meta,#999);margin:2px 0 8px}
.qa-question{padding:10px 14px;background:var(--second-bg,#f5f5f5);border-radius:8px;font-size:.9rem;color:var(--text-color,#333);margin-bottom:8px;white-space:pre-wrap}
.qa-answer{padding:10px 14px;margin-left:20px;border-left:3px solid var(--theme-color,#425aef);font-size:.9rem;color:var(--text-color,#333);white-space:pre-wrap}
.qa-answer-label{font-size:.8rem;color:var(--theme-color,#425aef);font-weight:600;margin-bottom:4px}
.qa-form{margin-top:24px;padding:20px;border:1px solid var(--border-color,#eee);border-radius:8px}
.qa-form input,.qa-form textarea{width:100%;padding:10px;border:1px solid var(--border-color,#ddd);border-radius:6px;margin-bottom:8px;font-size:.9rem;background:var(--card-bg,#fff);color:var(--text-color,#333);outline:none;box-sizing:border-box;font-family:inherit}
.qa-form input:focus,.qa-form textarea:focus{border-color:var(--theme-color,#425aef)}
.qa-form textarea{min-height:80px;resize:vertical}
.qa-form button{padding:8px 24px;background:var(--theme-color,#425aef);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.9rem}
.qa-form button:disabled{opacity:.5}
.qa-empty{text-align:center;padding:40px 0;color:var(--text-meta,#999);font-size:.9rem}
.qa-pwd-area{display:flex;gap:8px;margin-top:8px;align-items:center}
.qa-pwd-area input{max-width:200px}
.qa-answer-form textarea{margin-top:8px}
.qa-answer-form button{padding:6px 16px;background:var(--theme-color,#425aef);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.85rem;margin-top:4px}
.qa-answered{font-size:.75rem;color:#4caf50;font-weight:600}
</style>

<div class="tab-bar">
  <button class="tab-btn active" onclick="switchTab('materials')">📚 教学资料</button>
  <button class="tab-btn" onclick="switchTab('qa')">❓ 答疑</button>
</div>

<!-- 教学资料 -->
<div id="tab-materials" class="tab-panel active">
<p>各章节讲义、课件和练习题：</p>
<div class="toc-grid">

<div class="chapter-card"><h3>第1章 匀变速直线运动</h3>
<a href="/materials/板块/第1章匀速直线运动/第1章　匀变速直线运动.pptx">📘 课件</a>
<a href="/materials/板块/第1章匀速直线运动/第1章匀变速直线运动题目（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第1章匀速直线运动/第1章匀变速直线运动题目（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第1章匀速直线运动/第一章 匀加速直线运动.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第2章 相互作用</h3>
<a href="/materials/板块/第2章相互作用/第2章　相互作用.pptx">📘 课件</a>
<a href="/materials/板块/第2章相互作用/第2章相互作用（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第2章相互作用/第2章相互作用（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第2章相互作用/第二章相互作用.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第3章 牛顿运动定律</h3>
<a href="/materials/板块/第3章牛顿运动定律/第3章　牛顿运动定律.pptx">📘 课件</a>
<a href="/materials/板块/第3章牛顿运动定律/第3章牛顿运动定律（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第3章牛顿运动定律/第3章牛顿运动定律（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第3章牛顿运动定律/牛顿运动定律.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第4章 曲线运动</h3>
<a href="/materials/板块/第4章曲线运动/第4章　曲线运动.pptx">📘 课件</a>
<a href="/materials/板块/第4章曲线运动/第4章曲线运动（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第4章曲线运动/第4章曲线运动（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第4章曲线运动/第四章曲线运动.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第5章 万有引力</h3>
<a href="/materials/板块/第5章万有引力与宇宙航行/第5章　万有引力与宇宙航行.pptx">📘 课件</a>
<a href="/materials/板块/第5章万有引力与宇宙航行/第5章万有引力与宇宙航行（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第5章万有引力与宇宙航行/第5章万有引力与宇宙航行（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第5章万有引力与宇宙航行/第五章万有引力与宇宙航行.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第6章 机械能守恒</h3>
<a href="/materials/板块/第6章机械能守恒定律/第6章　机械能守恒定律.pptx">📘 课件</a>
<a href="/materials/板块/第6章机械能守恒定律/第6章机械能守恒定律（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第6章机械能守恒定律/第6章机械能守恒定律（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第6章机械能守恒定律/第六章机械能守恒定律.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第7章 静电场</h3>
<a href="/materials/板块/第7章静电场/第7章  静电场.pptx">📘 课件</a>
<a href="/materials/板块/第7章静电场/第7章静电场（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第7章静电场/第7章静电场（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第7章静电场/静电场.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第8章 电路及其应用</h3>
<a href="/materials/板块/第8章电路及其应用/第8章　电路及其应用.pptx">📘 课件</a>
<a href="/materials/板块/第8章电路及其应用/第8章电路及其应用（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第8章电路及其应用/第8章电路及其应用（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第8章电路及其应用/电路及其应用.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第9章 磁场</h3>
<a href="/materials/板块/第9章磁场/第9章　磁场.pptx">📘 课件</a>
<a href="/materials/板块/第9章磁场/第9章磁场（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第9章磁场/第9章磁场（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第9章磁场/磁场.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第10章 电磁感应</h3>
<a href="/materials/板块/第10章电磁感应/第10章　电磁感应.pptx">📘 课件</a>
<a href="/materials/板块/第10章电磁感应/第10章电磁感应（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第10章电磁感应/题.docx">📝 题目</a></div>

<div class="chapter-card"><h3>第11章 动量</h3>
<a href="/materials/板块/第11章动量/第11章　动量守恒定律.pptx">📘 课件</a>
<a href="/materials/板块/第11章动量/第11章动量（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第11章动量/第11章动量（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第11章动量/动量.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第12章 机械振动与波</h3>
<a href="/materials/板块/第12章机械振动与机械波/第12章　机械振动　机械波.pptx">📘 课件</a>
<a href="/materials/板块/第12章机械振动与机械波/第12章机械振动与机械波（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第12章机械振动与机械波/第12章机械振动与机械波（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第12章机械振动与机械波/机械振动与机械波.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第13章 光</h3>
<a href="/materials/板块/第13章光/第13章　光.pptx">📘 课件</a>
<a href="/materials/板块/第13章光/第13章光（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第13章光/第13章光（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第13章光/光.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第14章 交变电流</h3>
<a href="/materials/板块/第14章交变电流、电磁振荡、电磁波与传感器/第14章　交变电流、电磁振荡、电磁波与传感器.pptx">📘 课件</a>
<a href="/materials/板块/第14章交变电流、电磁振荡、电磁波与传感器/第14章交变电流、电磁振荡、电磁波与传感器（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第14章交变电流、电磁振荡、电磁波与传感器/第14章交变电流、电磁振荡、电磁波与传感器（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第14章交变电流、电磁振荡、电磁波与传感器/交变电流.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第15章 热</h3>
<a href="/materials/板块/第15章热/第15章　热.pptx">📘 课件</a>
<a href="/materials/板块/第15章热/第15章热（较难）.docx">📝 题目（较难）</a>
<a href="/materials/板块/第15章热/第15章热（较易）.docx">📝 题目（较易）</a>
<a href="/materials/板块/第15章热/第十五章 热.pdf">📄 讲义 PDF</a></div>

<div class="chapter-card"><h3>第16章 近代物理</h3>
<a href="/materials/板块/第16章近代物理初步/第16章　近代物理初步.pptx">📘 课件</a>
<a href="/materials/板块/第16章近代物理初步/第16章近代物理初步（综合难度）.docx">📝 题目（综合）</a>
<a href="/materials/板块/第16章近代物理初步/近代.pdf">📄 讲义 PDF</a></div>

</div>
</div>

<!-- 答疑 -->
<div id="tab-qa" class="tab-panel">
<div id="qa-app" style="max-width:700px;margin:0 auto">
  <div class="qa-list" id="qa-list"><div class="qa-empty">⏳ 加载中...</div></div>
  <div class="qa-form">
    <h4 style="margin:0 0 12px">📝 提交问题</h4>
    <input id="qa-name" placeholder="你的名字 *">
    <textarea id="qa-question" placeholder="描述你的问题..." rows="3"></textarea>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <button onclick="pickImage('q')" style="padding:6px 16px;border:1px solid var(--border-color,#ddd);border-radius:6px;cursor:pointer;font-size:.85rem;background:var(--card-bg,#fff);color:var(--text-color,#333)">📷 添加图片</button>
      <span id="qa-img-name" style="font-size:.8rem;color:var(--text-meta,#999)"></span>
    </div>
    <div id="qa-img-preview" style="display:none;margin-bottom:8px;max-width:300px;border-radius:8px;overflow:hidden;position:relative">
      <img id="qa-img-show" style="width:100%;display:block">
      <button onclick="removeImage('q')" style="position:absolute;top:4px;right:4px;width:24px;height:24px;border-radius:50%;border:none;background:rgba(0,0,0,.5);color:#fff;cursor:pointer;font-size:14px;line-height:24px;text-align:center">×</button>
    </div>
    <button id="qa-submit" onclick="submitQA()">提交问题</button>
  </div>
</div>
</div>

<script>
var API = 'https://comment.ray2.asia';

function switchTab(t) {
  document.querySelectorAll('.tab-btn').forEach(function(b,i){b.classList.toggle('active',(i===0&&t==='materials')||(i===1&&t==='qa'))});
  document.querySelectorAll('.tab-panel').forEach(function(p,i){p.classList.toggle('active',(i===0&&t==='materials')||(i===1&&t==='qa'))});
  if (t==='qa') loadQA();
}

function loadQA() {
  var list = document.getElementById('qa-list');
  list.innerHTML = '<div class="qa-empty">⏳ 加载中...</div>';
  fetch(API + '/api/qa').then(function(r){return r.json()}).then(function(data){
    if (!data.length) { list.innerHTML = '<div class="qa-empty">暂无问题，快来提问吧</div>'; return; }
    var html = '';
    data.forEach(function(q){
      html += '<div class="qa-item">';
      html += '<div class="qa-name">' + esc(q.student_name) + (q.answered ? ' <span class="qa-answered">✅ 已解答</span>' : '') + '</div>';
      html += '<div class="qa-time">' + new Date(q.created_at).toLocaleString() + '</div>';
      html += '<div class="qa-question">' + esc(q.question) + (q.question_image ? '<br><img src="' + q.question_image + '" style="max-width:100%;max-height:300px;border-radius:6px;margin-top:8px;cursor:pointer" onclick="zoomImg(this)">' : '') + ' <span onclick="delQA('+q.id+')" style="cursor:pointer;color:#e53935;font-size:.8rem;float:right">🗑️</span></div>';
      if (q.answered) {
        html += '<div class="qa-answer"><div class="qa-answer-label">Ray 的解答</div>' + esc(q.answer) + (q.answer_image ? '<br><img src="' + q.answer_image + '" style="max-width:100%;max-height:300px;border-radius:6px;margin-top:8px;cursor:pointer" onclick="zoomImg(this)">' : '') + '</div>';
      } else {
        // 管理员回复框
        html += '<div class="qa-answer-form" style="display:none" id="qa-af-'+q.id+'">';
        html += '<textarea id="qa-at-'+q.id+'" placeholder="输入解答..." rows="2" style="width:100%;padding:8px;border:1px solid var(--border-color,#ddd);border-radius:6px;outline:none;font-family:inherit;font-size:.85rem;box-sizing:border-box"></textarea>';
        html += '<div style="margin:4px 0"><button onclick="pickAnswerImage('+q.id+')" style="padding:4px 12px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:.8rem;background:var(--card-bg,#fff);color:var(--text-color,#333)">📷 添加图片</button><span id="qa-ai-name-'+q.id+'" style="font-size:.75rem;color:var(--text-meta,#999);margin-left:6px"></span></div>';
        html += '<div id="qa-ai-preview-'+q.id+'" style="display:none;margin-bottom:4px;max-width:200px;position:relative"><img id="qa-ai-show-'+q.id+'" style="width:100%;border-radius:4px"><button onclick="removeAnswerImage('+q.id+')" style="position:absolute;top:2px;right:2px;width:20px;height:20px;border-radius:50%;border:none;background:rgba(0,0,0,.5);color:#fff;cursor:pointer;font-size:12px;line-height:20px;text-align:center">×</button></div>';
        html += '<button onclick="answerQA('+q.id+')" style="padding:6px 16px;background:var(--theme-color,#425aef);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.82rem;margin-top:4px">提交解答</button>';
        html += '</div>';
        html += '<button onclick="showAnswer('+q.id+')" style="padding:4px 12px;border:1px solid var(--border-color,#ddd);border-radius:4px;cursor:pointer;font-size:.8rem;margin-top:4px">🔑 解答</button>';
      }
      html += '</div>';
    });
    list.innerHTML = html;
  }).catch(function(){ list.innerHTML = '<div class="qa-empty">加载失败</div>'; });
}

var qaImage = '';
var qaAnswerImages = {};

function pickImage(type) {
  var inp = document.createElement('input'); inp.type='file'; inp.accept='image/jpeg,image/png,image/webp,image/gif';
  inp.onchange = function(){
    var f = inp.files[0]; if (!f || f.size > 20*1024*1024) { alert('图片需小于20MB'); return; }
    var r = new FileReader();
    r.onload = function(e){
      var img = new Image();
      img.onload = function(){
        var c = document.createElement('canvas');
        var maxW = 1200; var w = img.width, h = img.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }
        c.width = w; c.height = h;
        var ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, w, h);
        var data = c.toDataURL('image/jpeg', 0.7);
        qaImage = data;
        document.getElementById('qa-img-name').textContent = '✅ 已添加 (' + Math.round(data.length/1024) + 'KB)';
        document.getElementById('qa-img-preview').style.display = 'block';
        document.getElementById('qa-img-show').src = data;
      };
      img.src = e.target.result;
    };
    r.readAsDataURL(f);
  };
  inp.click();
}

function removeImage() { qaImage = ''; document.getElementById('qa-img-name').textContent = ''; document.getElementById('qa-img-preview').style.display = 'none'; }

function pickAnswerImage(id) {
  var inp = document.createElement('input'); inp.type='file'; inp.accept='image/jpeg,image/png,image/webp,image/gif';
  inp.onchange = function(){
    var f = inp.files[0]; if (!f || f.size > 20*1024*1024) { alert('图片需小于20MB'); return; }
    var r = new FileReader();
    r.onload = function(e){
      var img = new Image();
      img.onload = function(){
        var c = document.createElement('canvas'); var maxW = 1200; var w = img.width, h = img.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }
        c.width = w; c.height = h; var ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, w, h);
        var data = c.toDataURL('image/jpeg', 0.7);
        qaAnswerImages[id] = data;
        document.getElementById('qa-ai-name-'+id).textContent = '✅ 已添加';
        document.getElementById('qa-ai-preview-'+id).style.display = 'block';
        document.getElementById('qa-ai-show-'+id).src = data;
      };
      img.src = e.target.result;
    };
    r.readAsDataURL(f);
  };
  inp.click();
}

function removeAnswerImage(id) { qaAnswerImages[id] = ''; document.getElementById('qa-ai-name-'+id).textContent = ''; document.getElementById('qa-ai-preview-'+id).style.display = 'none'; }

function submitQA() {
  var name = document.getElementById('qa-name').value.trim();
  var question = document.getElementById('qa-question').value.trim();
  if (!name || !question) { alert('请填写姓名和问题'); return; }
  var btn = document.getElementById('qa-submit'); btn.disabled = true; btn.textContent = '提交中...';
  fetch(API + '/api/qa', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:name, question:question, question_image:qaImage})})
    .then(function(r){return r.json()}).then(function(d){
      if (d.id) { document.getElementById('qa-question').value=''; qaImage=''; document.getElementById('qa-img-name').textContent=''; document.getElementById('qa-img-preview').style.display='none'; loadQA(); }
      else alert(d.error||'提交失败');
    }).catch(function(){alert('网络错误')})
    .finally(function(){btn.disabled=false;btn.textContent='提交问题';});
}

var qaPwd = '';

function showAnswer(id) {
  if (!qaPwd) {
    var p = prompt('管理密码：');
    if (!p) return;
    qaPwd = p;
  }
  document.getElementById('qa-af-'+id).style.display = 'block';
}

function delQA(id) {
  if (!qaPwd) { var p = prompt('管理密码：'); if (!p) return; qaPwd = p; }
  if (!confirm('确定删除该问题？')) return;
  fetch(API + '/api/qa/delete', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:id, admin:qaPwd})})
    .then(function(r){return r.json()}).then(function(d){ if(d.success) loadQA(); else { alert('密码错误'); qaPwd=''; } });
}

function answerQA(id) {
  var answer = document.getElementById('qa-at-'+id).value.trim();
  if (!answer) { alert('请输入解答'); return; }
  var img = qaAnswerImages[id] || '';
  fetch(API + '/api/qa/answer', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:id, answer:answer, answer_image:img, admin:qaPwd})})
    .then(function(r){return r.json()}).then(function(d){
      if (d.success) { qaAnswerImages[id]=''; loadQA(); }
      else { alert('密码错误，请重新输入'); qaPwd = ''; }
    }).catch(function(){alert('网络错误')});
}

function zoomImg(el) {
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
  var img = document.createElement('img');
  img.src = el.src;
  img.style.cssText = 'max-width:92%;max-height:92%;border-radius:8px;box-shadow:0 4px 30px rgba(0,0,0,.4)';
  ov.appendChild(img);
  ov.onclick = function(){ document.body.removeChild(ov); };
  document.body.appendChild(ov);
}

function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
</script>
