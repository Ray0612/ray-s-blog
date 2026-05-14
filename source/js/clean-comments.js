setInterval(function(){
  document.querySelectorAll('.tk-admin-actions,.tk-input-image,a[href*="guides.github.com"]').forEach(function(e){e.remove()});
  document.querySelectorAll('.tk-tabs .tk-tab').forEach(function(e){if(e.textContent.includes('bilibili')||e.textContent.includes('Bilibili')||e.textContent.includes('B站'))e.remove()});
},500);
