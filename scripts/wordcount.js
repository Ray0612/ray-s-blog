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
  if (!html || !html.includes('class="site-data"')) return html;
  // 计算字数
  var total = 0;
  var posts = hexo.model('Post').toArray();
  for (var i = 0; i < posts.length; i++) {
    var text = (posts[i]._content || '').replace(/\s+/g, '');
    total += text.length;
  }
  var insertHtml = '<a href="javascript:void(0)"><div class="headline">字数</div><div class="length-num">' + total + '</div></a>';
  // 替换所有匹配项（桌面和移动端各有一个 site-data）
  html = html.replace(/(<div class="headline">文章<\/div><div class="length-num">\d+<\/div><\/a>)(<a)/g, '$1' + insertHtml + '$2');
  return html;
});
