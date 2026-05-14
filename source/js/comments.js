(function(){
// 简单测试：在文章底部加一条红线 + 文字
var art = document.querySelector('article');
if (!art) return;
var d = document.createElement('div');
d.id = 'rc-test';
d.style.cssText = 'border:3px solid red;padding:20px;margin:20px 0;text-align:center;font-size:1.2em';
d.textContent = '✅ 脚本运行成功！';
art.parentNode.insertBefore(d, art.nextSibling);
})();
