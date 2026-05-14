function clean() {
  // 等 Twikoo 加载完，直接操作 document
  var wrap = document.getElementById('twikoo-wrap');
  if (!wrap || !wrap.querySelector('.twikoo')) return;

  // 齿轮
  var admin = wrap.querySelector('[class*="admin"]');
  if (admin && admin != wrap) { try { admin.style.display='none' } catch(e){} }

  // 工具栏 - 图片上传
  wrap.querySelectorAll('.tk-toolbar > *').forEach(function(el){
    try {
      if (el.querySelector('.fa-image') || el.classList.contains('tk-input-image')) {
        el.style.display='none';
      }
    } catch(e){}
  });

  // bilibili 标签
  wrap.querySelectorAll('.tk-tabs .tk-tab').forEach(function(el){
    try {
      if (el.textContent.toLowerCase().includes('bili')) el.style.display='none';
    } catch(e){}
  });

  // emoji
  var items = wrap.querySelectorAll('.OwO-item');
  if (items.length > 28) {
    [20,23,25,26,27].forEach(function(i){
      try { if(items[i]) items[i].style.display='none'; } catch(e){}
    });
  }
}
// 每秒检查一次，持续10秒
var count = 0;
var t = setInterval(function(){
  clean();
  if (++count > 30) clearInterval(t);  // 30次后停止
}, 1000);
