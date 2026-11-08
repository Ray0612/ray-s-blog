// 形态 1：把背景大图改到阿里云 VPS（static.ray2.asia:6443）
// HTML 仍由 Cloudflare Pages 提供，只有 /img/bg/ 走国内直连。
// 在 _config.yml 里设 static_host 即可；不设则保持原样（本地预览可关掉）。
hexo.extend.filter.register('after_render:html', function (str) {
  var host = hexo.config.static_host;
  if (!host) return str;
  // 只改 "/img/bg/  'img/bg/  (img/bg/ 这三种引用，
  // 不会误伤 https://blog.ray2.asia/img/bg/ 这种完整 URL
  return str.replace(/(["'(])\/img\/bg\//g, function (m, p1) {
    return p1 + host.replace(/\/+$/, '') + '/img/bg/';
  });
});
