// 创建评论区 HTML 容器
(function(){
var inner = document.getElementById('content-inner');
if (!inner) return;
// 首页有 recent-posts，文章页没有
if (inner.querySelector('#recent-posts')) return;
if (document.getElementById('my-comments')) return;
var div = document.createElement('div');
div.id = 'post-comment';
div.style.cssText = 'width:100%;clear:both';
div.innerHTML = '<div class="comment-head" style="padding:8px 0;margin-bottom:8px;border-bottom:1px solid var(--border-color,#eee);display:flex;align-items:center;gap:6px;font-size:1.1em"><i class="fas fa-comments fa-fw"></i><span> 评论</span></div><div id="my-comments"><p style="text-align:center;color:var(--text-meta,#999);padding:20px 0;font-size:.9rem">⏳ 加载中...</p></div>';
inner.appendChild(div);
})();
