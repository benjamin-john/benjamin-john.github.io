// Tiny photo lightbox: links with data-lightbox open in a full-screen viewer.
// Without JS the thumbnails simply link to the full-size photo.
(function () {
  var links = document.querySelectorAll('a[data-lightbox]');
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lb';
  dlg.setAttribute('aria-label', 'Photo viewer');
  dlg.innerHTML =
    '<div class="lb-bar"><span class="lb-count"></span><button type="button" class="lb-close" aria-label="Close">&times;</button></div>' +
    '<div class="lb-stage"><img alt=""></div>' +
    '<div class="lb-nav"><button type="button" class="lb-prev" aria-label="Previous photo">&larr;</button>' +
    '<button type="button" class="lb-next" aria-label="Next photo">&rarr;</button></div>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('img');
  var count = dlg.querySelector('.lb-count');
  var group = [];
  var index = 0;

  function show(i) {
    index = (i + group.length) % group.length;
    var a = group[index];
    img.src = a.getAttribute('href');
    img.alt = (a.querySelector('img') || {}).alt || '';
    count.textContent = a.dataset.lightbox + ' · ' + (index + 1) + ' / ' + group.length;
    var multi = group.length > 1;
    dlg.querySelector('.lb-nav').style.visibility = multi ? 'visible' : 'hidden';
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      var name = a.dataset.lightbox;
      group = Array.prototype.filter.call(links, function (l) { return l.dataset.lightbox === name; });
      show(group.indexOf(a));
      dlg.showModal();
    });
  });

  dlg.querySelector('.lb-close').onclick = function () { dlg.close(); };
  dlg.querySelector('.lb-prev').onclick = function () { show(index - 1); };
  dlg.querySelector('.lb-next').onclick = function () { show(index + 1); };
  dlg.addEventListener('close', function () { img.removeAttribute('src'); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  dlg.querySelector('.lb-stage').addEventListener('click', function (e) {
    if (e.target === e.currentTarget) dlg.close();
  });

  var startX = null;
  dlg.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
