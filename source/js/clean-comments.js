function removeEls() {
  var root = document.querySelector('.twikoo');
  if (!root) return;

  // 隐藏齿轮
  var settings = root.querySelector('[class*="admin"]');
  if (settings) settings.style.display = 'none';

  // 隐藏图片上传按钮
  root.querySelectorAll('.tk-toolbar > *').forEach(function(el) {
    if (el.querySelector('.fa-image') || el.innerHTML.includes('svg')) {
      el.style.display = 'none';
    }
  });

  // 隐藏 bilibili 标签
  root.querySelectorAll('.tk-tabs .tk-tab').forEach(function(el) {
    if (el.textContent.toLowerCase().includes('bili')) {
      el.style.display = 'none';
    }
  });

  // 删除指定位置的 emoji（第21、24、26、27、28个）
  var emojis = root.querySelectorAll('.OwO-item');
  if (emojis.length > 28) {
    [20,23,25,26,27].forEach(function(i){
      if (emojis[i]) emojis[i].style.display = 'none';
    });
  }
}
setInterval(removeEls, 300);
