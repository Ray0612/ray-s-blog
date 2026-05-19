// 统计所有文章总字数（不含书架页面）
hexo.extend.helper.register('total_words', function() {
  var total = 0;
  var posts = this.site.posts;
  for (var i = 0; i < posts.length; i++) {
    var post = posts.data[i];
    var text = (post._content || '').replace(/\s+/g, '');
    total += text.length;
  }
  return total;
});
