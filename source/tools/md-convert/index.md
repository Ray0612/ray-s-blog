---
title: Markdown 转换器
date: 2026-07-11
comments: false
aside: false
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.6.1/github-markdown.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">

<style>
.md-wrap{max-width:1200px;margin:0 auto;display:flex;flex-direction:column;height:calc(100vh - 120px);min-height:600px}
.md-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 16px;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:12px;margin-bottom:12px}
.md-filename{flex:1;min-width:160px;padding:8px 12px;border:1px solid var(--border-color,#d1d5db);border-radius:8px;font-size:14px;outline:none;background:var(--card-bg,#fff);color:var(--text-color,#1f2937)}
.md-filename:focus{border-color:var(--theme-color,#425aef)}
[data-theme="dark"] .md-filename{background:#1f2937;border-color:#374151;color:#e5e7eb}
.md-btn{padding:8px 20px;border:none;border-radius:8px;font-size:14px;cursor:pointer;color:#fff;background:var(--theme-color,#425aef);display:flex;align-items:center;gap:6px;transition:opacity .2s}
.md-btn:hover:not(:disabled){opacity:.85}
.md-btn:disabled{opacity:.5;cursor:not-allowed}
.md-btn-word{background:#2b7de9}
.md-btn-pdf{background:#e74c3c}
.md-btn-import{background:var(--text-meta,#9ca3af)}
.md-sep{width:1px;height:24px;background:var(--border-color,#e5e7eb)}
.md-body{flex:1;display:flex;gap:12px;min-height:0}
.md-panel{flex:1;display:flex;flex-direction:column;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:12px;overflow:hidden;min-width:0;min-height:0}
.md-panel-head{padding:8px 14px;font-size:13px;color:var(--text-color,#1f2937);border-bottom:1px solid var(--border-color,#e5e7eb);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.md-editor{flex:1;width:100%;min-height:0;resize:none;border:none;outline:none;padding:16px;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:13.5px;line-height:1.7;background:var(--card-bg,#fff);color:var(--text-color,#1f2937);box-sizing:border-box;overflow-y:auto}
[data-theme="dark"] .md-editor{background:#0d1117;color:#e6edf3}
.md-preview{flex:1;min-height:0;overflow-y:auto;padding:20px 24px;background:#fff;color:#1f2328}
.md-preview .markdown-body{
  font-size:14px;line-height:1.7;background:transparent;max-width:none;
  color-scheme: light;
  --color-fg-default:#1f2328; --color-fg-muted:#57606a; --color-fg-subtle:#6e7781;
  --color-canvas-default:#fff; --color-canvas-subtle:#f6f8fa;
  --color-border-default:#d0d7de; --color-border-muted:#d8dee4;
  --color-accent-fg:#0969da; --color-accent-emphasis:#0969da;
  color:#1f2328 !important;
}
.md-preview .markdown-body h1,.md-preview .markdown-body h2,.md-preview .markdown-body h3,
.md-preview .markdown-body h4,.md-preview .markdown-body p,.md-preview .markdown-body li,
.md-preview .markdown-body td,.md-preview .markdown-body th,.md-preview .markdown-body blockquote,
.md-preview .markdown-body strong,.md-preview .markdown-body em{color:#1f2328 !important}
.md-preview .markdown-body a{color:#0969da !important}
.md-preview .markdown-body pre{background:#f6f8fa}
.md-preview .markdown-body table{background:#fff !important}
.md-preview .markdown-body table tr{background:#fff !important}
.md-preview .markdown-body table tr:nth-child(2n){background-color:#f6f8fa !important}
.md-preview .markdown-body table td,.md-preview .markdown-body table th{background-color:transparent !important;border-color:#d0d7de !important}
.md-placeholder{display:flex;align-items:center;justify-content:center;height:100%;color:#6b7280;font-size:13px}
.md-footer{text-align:center;font-size:12px;color:var(--text-color,#1f2937);padding:12px;margin-top:8px}
/* 分栏 tab */
#tab1,#tab2{flex:1;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.md-tabs{display:flex;gap:8px;margin-bottom:12px;border-bottom:2px solid var(--border-color,#e5e7eb);padding-bottom:0;flex-shrink:0}
.md-tab{padding:10px 22px;border:none;background:none;cursor:pointer;font-size:14px;color:var(--text-meta,#6b7280);border-bottom:2px solid transparent;margin-bottom:-2px;transition:.2s;font-family:inherit}
.md-tab:hover{color:var(--theme-color,#425aef)}
.md-tab.active{color:var(--theme-color,#425aef);border-bottom-color:var(--theme-color,#425aef);font-weight:600}
[data-theme="dark"] .md-tab{color:#9ca3af}
[data-theme="dark"] .md-tab.active{color:#fff;border-bottom-color:var(--theme-color,#425aef)}
/* 深色模式适配 */
[data-theme="dark"] .md-panel-head{color:#fff}
[data-theme="dark"] .md-footer{color:#fff}
[data-theme="dark"] .md-preview{background:#0d1117}
[data-theme="dark"] .md-preview .markdown-body{
  color-scheme: dark;
  --color-fg-default:#e6edf3; --color-fg-muted:#8b949e; --color-fg-subtle:#6e7681;
  --color-canvas-default:#0d1117; --color-canvas-subtle:#161b22;
  --color-border-default:#30363d; --color-border-muted:#21262d;
  --color-accent-fg:#58a6ff; --color-accent-emphasis:#1f6feb;
  --color-bg-canvas-inset:#0d1117; --color-bg-subtle:#161b22;
  --color-fg-on-emphasis:#ffffff;
  color:#e6edf3 !important; background-color:transparent;
}
[data-theme="dark"] .md-preview .markdown-body h1,[data-theme="dark"] .md-preview .markdown-body h2,
[data-theme="dark"] .md-preview .markdown-body h3,[data-theme="dark"] .md-preview .markdown-body h4,
[data-theme="dark"] .md-preview .markdown-body p,[data-theme="dark"] .md-preview .markdown-body li,
[data-theme="dark"] .md-preview .markdown-body td,[data-theme="dark"] .md-preview .markdown-body th,
[data-theme="dark"] .md-preview .markdown-body strong,[data-theme="dark"] .md-preview .markdown-body em{color:#e6edf3 !important}
[data-theme="dark"] .md-preview .markdown-body a{color:#58a6ff !important}
[data-theme="dark"] .md-preview .markdown-body pre{background:#161b22}
[data-theme="dark"] .md-preview .markdown-body table{background:#0d1117 !important}
[data-theme="dark"] .md-preview .markdown-body table tr{background-color:transparent !important}
[data-theme="dark"] .md-preview .markdown-body table tr:nth-child(2n){background-color:#161b22 !important}
[data-theme="dark"] .md-preview .markdown-body table td, [data-theme="dark"] .md-preview .markdown-body table th{background-color:transparent !important;border-color:#30363d !important}
[data-theme="dark"] .md-placeholder{color:#8b949e}
@media (max-width:768px){.md-wrap{height:auto}.md-body{flex-direction:column;height:auto}.md-panel{min-height:300px}}
</style>

<div class="md-wrap">
  <div class="md-tabs">
    <button class="md-tab active" id="tabBtn1" onclick="switchTab(1)">📝 Markdown → Word/PDF</button>
    <button class="md-tab" id="tabBtn2" onclick="switchTab(2)">📂 Word/PDF/Excel/PPT → Markdown</button>
  </div>

  <!-- Tab 1: MD → Word/PDF -->
  <div id="tab1">
    <div class="md-toolbar">
      <input class="md-filename" id="mdFilename" value="document" placeholder="文件名">
      <span style="font-size:13px;color:var(--text-meta,#9ca3af);flex-shrink:0">导出为 .docx / .pdf</span>
      <button class="md-btn md-btn-import" onclick="importFile()">📁 导入文件</button>
      <span class="md-sep"></span>
      <button class="md-btn md-btn-word" onclick="convertWord()">⬇️ 转换 Word</button>
      <button class="md-btn md-btn-pdf" onclick="convertPdf()">⬇️ 转换 PDF</button>
      <input type="file" id="mdFileInput" accept=".md,.markdown,.txt" style="display:none" onchange="handleFile(event)">
    </div>
    <div class="md-body">
      <div class="md-panel">
        <div class="md-panel-head">Markdown 编辑器 <span id="mdCharCount" style="font-size:11px"></span></div>
        <textarea class="md-editor" id="mdEditor" oninput="onEdit()"></textarea>
      </div>
      <div class="md-panel">
        <div class="md-panel-head">实时预览</div>
        <div class="md-preview" id="mdPreview"><div class="md-placeholder">输入 Markdown 开始预览…</div></div>
      </div>
    </div>
    <div class="md-footer" id="mdStatus">✍️ 纯浏览器转换 · 公式在 Word 中可原生编辑</div>
  </div>

  <!-- Tab 2: 文件 → MD -->
  <div id="tab2" style="display:none">
    <div class="md-toolbar">
      <button class="md-btn md-btn-import" onclick="importOtherFile()">📁 选择文件</button>
      <span style="font-size:13px;color:var(--text-meta,#9ca3af);flex-shrink:0">支持 .pdf .docx .xlsx .pptx</span>
      <button class="md-btn md-btn-word" id="mdExtractBtn" onclick="extractMd()">⚙️ 转换为 Markdown</button>
      <button class="md-btn md-btn-pdf" id="mdDownloadMd" style="display:none" onclick="downloadMd()">⬇️ 下载 .md</button>
      <input type="file" id="mdOtherInput" accept=".pdf,.docx,.xlsx,.pptx" style="display:none" onchange="handleOtherFile(event)">
    </div>
    <div class="md-body">
      <div class="md-panel">
        <div class="md-panel-head">转换结果 <span id="mdExtractName" style="font-size:11px"></span></div>
        <div class="md-preview" id="mdExtractPreview"><div class="md-placeholder">选择文件并转换，Markdown 结果会显示在这里</div></div>
      </div>
    </div>
    <div class="md-footer" id="mdStatus2"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked@12/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>

<script type="module">
import { mml2omml } from 'https://cdn.jsdelivr.net/npm/mathml2omml@0.5.0/dist/index.esm.js';
window.__mml2omml = mml2omml;
window.__mmlReady = true;
</script>

<script>
var editor = document.getElementById('mdEditor');
var preview = document.getElementById('mdPreview');
var statusEl = document.getElementById('mdStatus');
var markedLib = window.marked;
markedLib.setOptions({ breaks: false, gfm: true });

// ===== 实时预览 =====
function render() {
  var text = editor.value;
  document.getElementById('mdCharCount').textContent = text.length + ' 字';
  if (!text.trim()) { preview.innerHTML = '<div class="md-placeholder">输入 Markdown 开始预览…</div>'; return; }
  try {
    var html = markedLib.parse(text);
    preview.innerHTML = '<article class="markdown-body">' + html + '</article>';
    if (window.renderMathInElement) {
      window.renderMathInElement(preview, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  } catch(e) { preview.innerHTML = '<div class="md-placeholder">渲染错误: ' + e.message + '</div>'; }
}
function onEdit() { render(); }

// ===== 编辑器与预览同步滚动 =====
var mdSyncing = false;
function syncMdScroll(src, dst) {
  if (mdSyncing) return;
  mdSyncing = true;
  var maxSrc = src.scrollHeight - src.clientHeight;
  var maxDst = dst.scrollHeight - dst.clientHeight;
  if (maxSrc > 0 && maxDst > 0) {
    var ratio = src.scrollTop / maxSrc;
    dst.scrollTop = ratio * maxDst;
  }
  mdSyncing = false;
}
editor.addEventListener('scroll', function() { syncMdScroll(editor, preview); });
preview.addEventListener('scroll', function() { syncMdScroll(preview, editor); });

function importFile() { document.getElementById('mdFileInput').click(); }
function handleFile(e) {
  var f = e.target.files[0]; if (!f) return;
  var reader = new FileReader();
  reader.onload = function(ev) { editor.value = ev.target.result; render(); statusEl.textContent = '📄 已导入 ' + f.name; };
  reader.readAsText(f); e.target.value = '';
}

// ===== OOXML 生成器 =====
function escXml(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function inlineText(tokens) {
  var s = '';
  (tokens||[]).forEach(function(t){ if(t.type==='text') s+=t.text; else if(t.text) s+=t.text; });
  return s;
}

// 把文本（含 $...$）转为 runs XML；fmt: {bold,italic,code}
function runsFromText(text, fmt) {
  var re = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
  var xml = ''; var last = 0; var m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) xml += textRun(text.slice(last, m.index), fmt);
    var raw = m[0]; var display = raw.indexOf('$$') === 0;
    var inner = raw.slice(display ? 2 : 1, display ? -2 : -1);
    xml += mathXml(inner, display);
    last = m.index + raw.length;
  }
  if (last < text.length) xml += textRun(text.slice(last), fmt);
  if (!xml) xml = textRun('', fmt);
  return xml;
}

function textRun(text, fmt) {
  fmt = fmt || {};
  var rPr = '<w:rPr>';
  if (fmt.bold) rPr += '<w:b/>';
  if (fmt.italic) rPr += '<w:i/>';
  if (fmt.strike) rPr += '<w:strike/>';
  if (fmt.code) rPr += '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:color w:val="24292F"/><w:shd w:val="clear" w:fill="EFF3F6"/><w:sz w:val="19"/>';
  rPr += '<w:sz w:val="21"/>';
  rPr += '</w:rPr>';
  return '<w:r>' + rPr + '<w:t xml:space="preserve">' + escXml(text) + '</w:t></w:r>';
}

// 链接 → 超链接（收集关系）
var __rels = [];
var __relCounter = 0;
function resetRels() { __rels = []; __relCounter = 0; }
function getRelsXml() {
  var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
  __rels.forEach(function(r) { xml += '<Relationship Id="' + r.id + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="' + escXml(r.url) + '" TargetMode="External"/>'; });
  xml += '</Relationships>';
  return xml;
}
function hyperlinkXml(text, url) {
  __relCounter++;
  var rid = 'rId' + __relCounter;
  __rels.push({ id: rid, url: url });
  return '<w:hyperlink r:id="' + rid + '"><w:r><w:rPr><w:color w:val="0563C1"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">' + escXml(text) + '</w:t></w:r></w:hyperlink>';
}

// ===== 数学公式：简单→可编辑OMML，复杂(n-ary)→图片 =====
var __mathImg = {};  // latex|display -> dataUrl
var __images = [];   // {id, dataUrl, w, h}
function resetImages() { __mathImg = {}; __images = []; }

// KaTeX SVG → PNG dataURL
function renderMathToPng(latex, display) {
  return new Promise(function(resolve, reject) {
    try {
      var svg = window.katex.renderToString(latex, { output: 'svg', throwOnError: false, displayMode: display });
      var img = new Image();
      img.onload = function() {
        try {
          var scale = 3;
          var canvas = document.createElement('canvas');
          canvas.width = Math.max(1, img.width * scale);
          canvas.height = Math.max(1, img.height * scale);
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve({ dataUrl: canvas.toDataURL('image/png'), w: img.width, h: img.height });
        } catch(e) { reject(e); }
      };
      img.onerror = function() { reject(new Error('svg load fail')); };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    } catch(e) { reject(e); }
  });
}

// 预渲染文档中所有公式为 PNG
async function collectAndRenderMath(md) {
  var re = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
  var set = {}; var m;
  while ((m = re.exec(md)) !== null) {
    var raw = m[0]; var disp = raw.indexOf('$$') === 0;
    var inner = raw.slice(disp ? 2 : 1, disp ? -2 : -1);
    var key = inner + '|' + disp;
    if (!(key in set)) {
      set[key] = renderMathToPng(inner, disp).then(function(r) { return r; }).catch(function() { return null; });
    }
  }
  for (var k in set) {
    var r = await set[k];
    __mathImg[k] = r;
  }
}

// 生成 docx 图片 drawing XML
function drawingXml(img, rId) {
  var wEmu = Math.round(img.w * 3 * 9525);
  var hEmu = Math.round(img.h * 3 * 9525);
  return '<w:r><w:drawing><wp:inline xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" distT="0" distB="0" distL="0" distR="0">' +
    '<wp:extent cx="' + wEmu + '" cy="' + hEmu + '"/>' +
    '<wp:docPr id="' + rId + '" name="math' + rId + '"/>' +
    '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
    '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
    '<pic:nvPicPr><pic:cNvPr id="' + rId + '" name="math.png"/><pic:cNvPicPr/></pic:nvPicPr>' +
    '<pic:blipFill><a:blip r:embed="rId' + rId + '" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
    '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + wEmu + '" cy="' + hEmu + '"/></a:xfrm>' +
    '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>';
}

function mathXml(latex, display) {
  try {
    // 简单公式 → 可编辑 OMML
    var mathml = window.katex.renderToString(latex, { output: 'mathml', throwOnError: false, displayMode: display });
    var omml = window.__mml2omml(mathml);
    // 复杂公式（含 n-ary 积分/求和等）→ 图片
    if (omml.indexOf('<m:nary>') !== -1) {
      var img = __mathImg[latex + '|' + display];
      if (img && img.dataUrl) {
        var id = __images.length + 1000;
        __images.push({ id: id, dataUrl: img.dataUrl, w: img.w, h: img.h });
        return drawingXml(img, id);
      }
    }
    if (display) return '<m:oMathPara><m:oMathParaPr><m:jc m:val="center"/></m:oMathParaPr>' + omml + '</m:oMathPara>';
    return omml;
  } catch(e) { return textRun('$' + latex + '$'); }
}

// 处理行内 tokens，返回 runs XML
function inlineXml(tokens, fmt) {
  fmt = fmt || {};
  var xml = '';
  var buf = '';
  function flush() { if (buf) { xml += runsFromText(buf, fmt); buf = ''; } }
  (tokens||[]).forEach(function(t){
    if (t.type === 'text') { buf += t.text; }
    else if (t.type === 'strong') { flush(); var inner = t.tokens ? inlineText(t.tokens) : t.text; xml += runsFromText(inner, Object.assign({}, fmt, {bold:true})); }
    else if (t.type === 'em') { flush(); var inner2 = t.tokens ? inlineText(t.tokens) : t.text; xml += runsFromText(inner2, Object.assign({}, fmt, {italic:true})); }
    else if (t.type === 'codespan') { flush(); xml += textRun(t.text, Object.assign({}, fmt, {code:true})); }
    else if (t.type === 'del') { flush(); var delInner = t.tokens ? inlineText(t.tokens) : t.text; xml += runsFromText(delInner || '', Object.assign({}, fmt, {strike:true})); }
    else if (t.type === 'link') { flush(); var lt = t.tokens ? inlineText(t.tokens) : t.text; xml += hyperlinkXml(lt, t.href || ''); }
    else if (t.type === 'br') { flush(); xml += '<w:r><w:br/></w:r>'; }
  });
  flush();
  return xml;
}

function pPr(indentLeft, align) {
  var xml = '<w:pPr>';
  if (indentLeft) xml += '<w:ind w:left="' + indentLeft + '"/>';
  if (align) xml += '<w:jc w:val="' + align + '"/>';
  xml += '<w:spacing w:after="120" w:line="300" w:lineRule="auto"/>';
  xml += '</w:pPr>';
  return xml;
}

function buildDocumentXml(tokens) {
  var body = '';
  tokens.forEach(function(tok) {
    if (tok.type === 'heading') {
      var sz = {1:36, 2:32, 3:28, 4:26}[tok.depth] || 26;
      var rPr = '<w:rPr><w:b/><w:sz w:val="' + sz + '"/></w:rPr>';
      body += '<w:p><w:pPr><w:spacing w:before="240" w:after="120"/></w:pPr><w:r>' + rPr + '<w:t>' + escXml(inlineText(tok.tokens)) + '</w:t></w:r></w:p>';
    }
    else if (tok.type === 'paragraph') {
      body += '<w:p>' + pPr() + inlineXml(tok.tokens) + '</w:p>';
    }
    else if (tok.type === 'code') {
      var lines = tok.text.split('\n');
      var runs = '';
      lines.forEach(function(l, i) {
        runs += '<w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:color w:val="24292F"/><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve">' + escXml(l) + '</w:t></w:r>';
        if (i < lines.length - 1) runs += '<w:r><w:br/></w:r>';
      });
      body += '<w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="D0D7DE"/><w:left w:val="single" w:sz="4" w:space="4" w:color="D0D7DE"/><w:bottom w:val="single" w:sz="4" w:space="4" w:color="D0D7DE"/><w:right w:val="single" w:sz="4" w:space="4" w:color="D0D7DE"/></w:pBdr><w:shd w:val="clear" w:fill="F6F8FA"/><w:spacing w:before="120" w:after="120"/></w:pPr>' + runs + '</w:p>';
    }
    else if (tok.type === 'blockquote') {
      (tok.tokens || []).forEach(function(pt) {
        var inTok = pt.tokens || (pt.type === 'text' ? [pt] : null);
        // 引用样式：左侧蓝色竖线 + 浅色背景 + 缩进（与普通斜体区分）
        var qpPr = '<w:pPr><w:pBdr><w:left w:val="single" w:sz="24" w:space="8" w:color="425aef"/></w:pBdr>' +
          '<w:shd w:val="clear" w:fill="EEF2FF"/><w:ind w:left="400"/><w:spacing w:after="120" w:line="300" w:lineRule="auto"/></w:pPr>';
        body += '<w:p>' + qpPr + inlineXml(inTok) + '</w:p>';
      });
    }
    else if (tok.type === 'list') {
      tok.items.forEach(function(item, i) {
        var bullet = tok.ordered ? ((tok.start||1)+i) + '. ' : '• ';
        var itemTokens = item.tokens && item.tokens[0] && item.tokens[0].tokens;
        var content = itemTokens ? inlineXml(itemTokens) : runsFromText(item.text);
        body += '<w:p>' + pPr(360) + '<w:r><w:rPr><w:b/></w:rPr><w:t>' + escXml(bullet) + '</w:t></w:r>' + content + '</w:p>';
      });
    }
    else if (tok.type === 'table') {
      var tbl = '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders><w:top w:val="single" w:sz="4"/><w:left w:val="single" w:sz="4"/><w:bottom w:val="single" w:sz="4"/><w:right w:val="single" w:sz="4"/><w:insideH w:val="single" w:sz="4"/><w:insideV w:val="single" w:sz="4"/></w:tblBorders></w:tblPr>';
      // 表头行
      tbl += '<w:tr><w:trPr><w:tblHeader/></w:trPr>';
      (tok.header || []).forEach(function(cell) {
        var cellTokens = cell.tokens;
        var cellXml = cellTokens ? inlineXml(cellTokens, {bold:true}) : runsFromText(cell.text || '', {bold:true});
        tbl += '<w:tc><w:tcPr><w:tcW w:w="2500" w:type="dxa"/><w:shd w:val="clear" w:fill="DDE6F5"/></w:tcPr><w:p>' + cellXml + '</w:p></w:tc>';
      });
      tbl += '</w:tr>';
      // 数据行
      tok.rows.forEach(function(row, ri) {
        tbl += '<w:tr>';
        row.forEach(function(cell) {
          var cellTokens = cell.tokens;
          var cellXml = cellTokens ? inlineXml(cellTokens) : runsFromText(cell.text || '');
          tbl += '<w:tc><w:tcPr><w:tcW w:w="2500" w:type="dxa"/></w:tcPr><w:p>' + cellXml + '</w:p></w:tc>';
        });
        tbl += '</w:tr>';
      });
      tbl += '</w:tbl>';
      body += tbl;
    }
    else if (tok.type === 'hr') {
      body += '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:color="999999"/></w:pBdr></w:pPr></w:p>';
    }
  });
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
    '<w:body>' + body +
    '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>' +
    '</w:body></w:document>';
}

// 生成 docx blob（供 Word 下载和 PDF 转换共用）
function buildDocxBlob(md) {
  return new Promise(async function(resolve, reject) {
    try {
      resetRels();
      resetImages();
      await collectAndRenderMath(md); // 预渲染公式为 PNG
      var tokens = markedLib.lexer(md);
      var documentXml = buildDocumentXml(tokens);
      var zip = new JSZip();
      var contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>';
      if (__images.length > 0) contentTypes += '<Default Extension="png" ContentType="image/png"/>';
      contentTypes += '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
      zip.file('[Content_Types].xml', contentTypes);
      zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
      zip.file('word/document.xml', documentXml);
      // 图片 + 关系
      if (__images.length > 0) {
        var relXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
        __rels.forEach(function(r) { relXml += '<Relationship Id="' + r.id + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="' + escXml(r.url) + '" TargetMode="External"/>'; });
        __images.forEach(function(img) { relXml += '<Relationship Id="rId' + img.id + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/math' + img.id + '.png"/>'; });
        relXml += '</Relationships>';
        zip.file('word/_rels/document.xml.rels', relXml);
        __images.forEach(function(img) {
          var b64 = img.dataUrl.split(',')[1];
          zip.file('word/media/math' + img.id + '.png', b64, { base64: true });
        });
      } else if (__rels.length > 0) {
        zip.file('word/_rels/document.xml.rels', getRelsXml());
      }
      zip.generateAsync({ type: 'blob' }).then(resolve).catch(reject);
    } catch(e) { reject(e); }
  });
}

function convertWord() {
  var md = editor.value;
  if (!md.trim()) { statusEl.textContent = '⚠️ 内容为空'; return; }
  statusEl.textContent = '⏳ 正在生成 Word…';
  buildDocxBlob(md).then(function(blob) {
    var filename = (document.getElementById('mdFilename').value || 'document').replace(/\.(md|markdown|txt)$/i,'') + '.docx';
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    statusEl.textContent = '✅ 已下载 ' + filename;
  }).catch(function(e) { statusEl.textContent = '❌ 转换失败: ' + e.message; });
}

// ===== PDF 生成（VPS LibreOffice 转 Word→PDF）=====
function convertPdf() {
  var md = editor.value;
  if (!md.trim()) { statusEl.textContent = '⚠️ 内容为空'; return; }
  statusEl.textContent = '⏳ 正在生成 Word 并转换 PDF…';
  buildDocxBlob(md).then(function(blob) {
    var filename = (document.getElementById('mdFilename').value || 'document').replace(/\.(md|markdown|txt)$/i,'') + '.pdf';
    fetch('https://md-pdf.ray2.asia/', {
      method: 'POST',
      body: blob
    }).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.blob();
    }).then(function(pdfBlob) {
      var url = URL.createObjectURL(pdfBlob);
      var a = document.createElement('a'); a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
      statusEl.textContent = '✅ 已下载 ' + filename;
    }).catch(function(e) { statusEl.textContent = '❌ PDF 转换失败: ' + e.message; });
  }).catch(function(e) { statusEl.textContent = '❌ 转换失败: ' + e.message; });
}

// ===== Tab 2: 文件 → Markdown（MarkItDown）=====
var mdExtractFile = null;
var mdExtractResult = '';

function switchTab(n) {
  document.getElementById('tab1').style.display = n === 1 ? 'flex' : 'none';
  document.getElementById('tab2').style.display = n === 2 ? 'flex' : 'none';
  document.getElementById('tabBtn1').classList.toggle('active', n === 1);
  document.getElementById('tabBtn2').classList.toggle('active', n === 2);
}

function importOtherFile() { document.getElementById('mdOtherInput').click(); }
function handleOtherFile(e) {
  var f = e.target.files[0]; if (!f) return;
  mdExtractFile = f;
  document.getElementById('mdExtractName').textContent = f.name;
  document.getElementById('mdExtractPreview').innerHTML = '<div class="md-placeholder">已选择：' + f.name + '，点击「转换为 Markdown」</div>';
  document.getElementById('mdDownloadMd').style.display = 'none';
  document.getElementById('mdStatus2').textContent = '';
  e.target.value = '';
}

function extractMd() {
  var status2 = document.getElementById('mdStatus2');
  if (!mdExtractFile) { status2.textContent = '⚠️ 请先选择文件'; return; }
  status2.textContent = '⏳ 正在转换，请稍候…';
  var btn = document.getElementById('mdExtractBtn');
  btn.disabled = true;
  fetch('https://md-extract.ray2.asia/?' + encodeURIComponent(mdExtractFile.name), {
    method: 'POST',
    body: mdExtractFile
  }).then(function(r) {
    if (!r.ok) return r.json().then(function(d) { throw new Error(d.error || ('HTTP ' + r.status)); });
    return r.text();
  }).then(function(md) {
    mdExtractResult = md;
    var pv = document.getElementById('mdExtractPreview');
    pv.style.position = 'relative';
    pv.style.overflow = 'hidden';
    pv.innerHTML = '<textarea class="md-editor" style="position:absolute;inset:0;width:100%;height:100%;min-height:0;resize:none" readonly>' + md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</textarea>';
    document.getElementById('mdDownloadMd').style.display = '';
    status2.textContent = '✅ 转换完成，可下载 .md 文件';
    btn.disabled = false;
  }).catch(function(e) {
    status2.textContent = '❌ 转换失败: ' + e.message;
    btn.disabled = false;
  });
}

function downloadMd() {
  if (!mdExtractResult) return;
  var base = (mdExtractFile ? mdExtractFile.name.replace(/\.[^.]+$/, '') : 'document') + '.md';
  var blob = new Blob([mdExtractResult], { type: 'text/markdown;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href = url; a.download = base; a.click();
  URL.revokeObjectURL(url);
}

editor.value = '# Markdown 转换器\n\n一个纯浏览器运行的 **Markdown → Word / PDF** 工具。\n\n## 支持数学公式\n\n行内公式：$E = mc^2$，以及 $x^2 + y^2 = z^2$\n\n块级公式：\n\n$$\n\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\n$$\n\n## 支持的元素\n\n- **加粗** / *斜体* / ~~删除线~~\n- `行内代码` 和代码块\n- [链接](https://blog.ray2.asia)\n- 表格、引用、列表\n\n### 示例表格\n\n| 功能 | 支持 |\n|------|------|\n| Word 导出 | ✅ |\n| PDF 导出 | ✅ |\n| 公式可编辑 | ✅ |\n\n> 提示：转换出的 Word 中，公式是原生对象，可在 Word 里双击编辑。\n\n```python\ndef hello():\n    print("Hello, Markdown!")\n```';
render();
</script>
