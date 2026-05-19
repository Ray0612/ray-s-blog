// 计算总字数
hexo.extend.helper.register('total_words', function() {
  var total = 0;
  var posts = this.site.posts;
  for (var i = 0; i < posts.length; i++) {
    var text = (posts.data[i]._content || '').replace(/\s+/g, '');
    total += text.length;
  }
  return total;
});

// 渲染完成后，在HTML中插入字数统计
hexo.extend.filter.register('after_render:html', function(html, data) {
  if (!html || html.includes('字数')) return html;
  if (!html.includes('class="site-data"')) return html;
  // 计算字数
  var total = 0;
  var posts = hexo.model('Post').toArray();
  for (var i = 0; i < posts.length; i++) {
    var text = (posts[i]._content || '').replace(/\s+/g, '');
    total += text.length;
  }
  var insertHtml = '<a href="javascript:void(0)"><div class="headline">字数</div><div class="length-num">' + total + '</div></a>';
  html = html.replace(/(<div class="headline">文章<\/div><div class="length-num">\d+<\/div><\/a>)(<a)/, '$1' + insertHtml + '$2');
  return html;
});
