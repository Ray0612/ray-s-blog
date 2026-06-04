---
title: 围棋对弈
date: 2026-06-04
comments: false
aside: false
---

<style>
html, body, .layout, .aside, main, #content-inner{max-width:100%!important;width:100%!important}
.page{z-index:1}
#go-wrap{display:flex;flex-direction:column;align-items:center;padding:10px 0}
#go-wrap h1{font-size:20px;margin:4px 0;color:var(--theme-color,#425aef)}
#go-wrap .sub{font-size:12px;color:var(--text-meta,#999);margin-bottom:6px}
#go-board canvas{cursor:pointer;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.2)}
#go-controls{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:10px 0}
#go-controls button{padding:5px 14px;border:none;border-radius:5px;cursor:pointer;font-size:12px;transition:.15s}
#go-controls button:hover{opacity:.8}
.btn-pri{background:var(--theme-color,#425aef);color:#fff}
.btn-sec{background:#e5e7eb;color:#374151}
[data-theme="dark"] .btn-sec{background:#374151;color:#e5e7eb}
#go-info{font-size:12px;color:var(--text-meta,#999);min-height:18px;text-align:center}
#go-score{font-size:13px;color:var(--theme-color,#425aef);margin-top:4px;min-height:18px}
#go-side label{font-size:13px;margin:0 6px;color:var(--text-color,#374151);cursor:pointer}
[data-theme="dark"] #go-side label{color:#e5e7eb}
</style>

<div id="go-wrap">
<h1>⚫ 围棋对弈 ⚪</h1>
<div class="sub">TinyGo 对弈 · 业余二段左右水平</div>
<div id="go-side">
  <label><input type="radio" name="side" value="1" checked onchange="newGame(1)"> 执黑</label>
  <label><input type="radio" name="side" value="2" onchange="newGame(2)"> 执白</label>
</div>
<div id="go-board"><canvas id="cv"></canvas></div>
<div id="go-controls">
  <button class="btn-pri" onclick="newGame()">新一局</button>
  <button class="btn-sec" onclick="undo()">悔棋</button>
  <button class="btn-sec" onclick="countScore()">数子</button>
  <button class="btn-sec" onclick="saveSGF()">导出棋谱</button>
</div>
<div id="go-info">点击棋盘落子</div>
<div id="go-score"></div>
</div>

<script>
var API = 'https://go.ray2.asia';
var S = 19, CS = 29, C = CS, PAD = 18, HUMAN = 1;
var bd = [], cur = 1, hst = [], thk = false;
var cv = document.getElementById('cv'), ctx = cv.getContext('2d');
cv.width = cv.height = (S-1) * C + PAD * 2;

function draw() {
  ctx.clearRect(0,0,cv.width,cv.height);
  ctx.fillStyle='#c8a96e'; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.strokeStyle='#8b7355'; ctx.lineWidth=0.7;
  ctx.beginPath();
  for(var i=0;i<S;i++){var x=i*C+PAD,y=i*C+PAD;ctx.moveTo(PAD,y);ctx.lineTo(PAD+(S-1)*C,y);ctx.moveTo(x,PAD);ctx.lineTo(x,PAD+(S-1)*C)}
  ctx.stroke();
  ctx.fillStyle='#8b7355';
  for(var r of[3,9,15])for(var c of[3,9,15]){ctx.beginPath();ctx.arc(c*C+PAD,r*C+PAD,3,0,Math.PI*2);ctx.fill()}
  if(!bd||bd.length!==S*S)return;
  for(var i=0;i<bd.length;i++){
    if(bd[i]===0)continue;
    var r=Math.floor(i/S),c=i%S,x=c*C+PAD,y=r*C+PAD;
    ctx.beginPath();ctx.arc(x,y,11,0,Math.PI*2);
    if(bd[i]===1){var g=ctx.createRadialGradient(x-3,y-3,2,x,y,11);g.addColorStop(0,'#555');g.addColorStop(1,'#111');ctx.fillStyle=g}
    else{var g=ctx.createRadialGradient(x-3,y-3,2,x,y,11);g.addColorStop(0,'#fff');g.addColorStop(1,'#ccc');ctx.fillStyle=g}
    ctx.fill()
  }
}

async function api(method, path, data){
  var opt = {method:method, headers:{'Content-Type':'application/json'}};
  if(data) opt.body = JSON.stringify(data);
  var r = await fetch(API + path, opt);
  return r.json();
}

cv.onclick = function(e){
  var rect=cv.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top;
  var c=Math.round((mx-PAD)/C),r=Math.round((my-PAD)/C);
  if(c<0||c>=S||r<0||r>=S)return;
  if(thk||cur!==HUMAN)return;
  place(r*S+c);
};

async function place(move){
  var d = await api('POST','/move',{move:move,color:HUMAN});
  if(!d.ok)return;
  hst.push([...bd]); bd=d.board; cur=d.current; draw();
  document.getElementById('go-score').textContent = '';
  if(cur!==HUMAN && !d.over) aiTurn();
}

async function aiTurn(){
  thk=1; info('AI 思考中...');
  var d = await api('POST','/ai'); thk=0;
  if(d.ok){
    hst.push([...bd]); bd=d.board; cur=d.current; draw();
    info(d.move==-1?'AI停手':(d.time.toFixed(1)+'s'));
    if(d.over) info('终局');
  }
}

async function newGame(side){
  HUMAN = side || parseInt(document.querySelector('input[name="side"]:checked').value);
  var d = await api('POST','/new',{color:HUMAN});
  hst = []; bd = d.board; cur = d.current; thk = false;
  draw(); info('新一局');
  document.getElementById('go-score').textContent = '';
  if(HUMAN===2) aiTurn();
}

async function countScore(){
  var d = await api('POST','/count');
  document.getElementById('go-score').innerHTML =
    '黑 ' + d.black_stones + '子+' + d.black_territory + '目=' + d.black_total +
    ' | 白 ' + d.white_stones + '子+' + d.white_territory + '目+' + '6.5贴目=' + d.white_total +
    ' | <strong>' + d.winner + '胜 ' + d.diff + '目</strong>';
}

function undo(){
  if(hst.length<2||thk)return;
  var movesBefore = hst.length - 2;  // 回退两步（人和AI各一步）
  hst.pop(); hst.pop();
  api('POST','/revert',{moves:movesBefore}).then(function(d){
    if(d.ok){bd=d.board;cur=d.current;draw()}
  });
  document.getElementById('go-score').textContent = '';
}

function saveSGF(){ window.open('https://go.ray2.asia/sgf'); }
function info(s){document.getElementById('go-info').textContent=s;}

// 启动
newGame(1);
</script>
