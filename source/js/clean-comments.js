function removeEls() {
  var root = document.querySelector('.twikoo');
  if (!root) return;

  // 隐藏评论区左上角设置齿轮
  var settings = root.querySelector('[class*="admin"]');
  if (settings) settings.style.display = 'none';

  // 隐藏工具栏里的图片上传 (找 fa-image 图标的父级)
  root.querySelectorAll('.tk-toolbar > *').forEach(function(el) {
    if (el.querySelector('.fa-image') || el.innerHTML.includes('svg')) {
      el.style.display = 'none';
    }
  });

  // 隐藏 bilibili 表情标签
  root.querySelectorAll('.tk-tabs .tk-tab').forEach(function(el) {
    if (el.textContent.toLowerCase().includes('bili')) {
      el.style.display = 'none';
    }
  });
}
setInterval(removeEls, 300);
