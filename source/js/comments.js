(function(){
var MAX_WAIT = 10000;
var start = Date.now();
function tryInsert() {
  var art = document.querySelector('article');
  if (art) {
    var d = document.createElement('div');
    d.id = 'rc-test';
    d.style.cssText = 'border:3px solid red;padding:20px;margin:20px 0;text-align:center;font-size:1.2em;color:var(--text-color,#000)';
    d.textContent = '✅ 评论系统已加载';
    art.parentNode.insertBefore(d, art.nextSibling);
    return;
  }
  if (Date.now() - start < MAX_WAIT) setTimeout(tryInsert, 200);
}
tryInsert();
})();
