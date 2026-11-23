/* Li-Tsai Chen portfolio — small vanilla script.
   - language toggle (中 / EN), remembered in localStorage
   - project detail "pages" via URL hash: #coffee, #fivesense, #gallery, #mindthegap
   - AI Dreamscape "load more", career-map lightbox */
(function () {
  var root = document.documentElement;
  var PROJECT_VIEWS = ['coffee', 'fivesense', 'gallery', 'mindthegap'];

  /* ---------- language ---------- */
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'zh-Hant';
    var specs = document.querySelector('.ltc-specs');
    if (specs) {
      specs.classList.toggle('is-en', lang === 'en');
      specs.classList.toggle('is-zh', lang !== 'en');
    }
    document.querySelectorAll('.ltc-specs .b-zh').forEach(function (b) { b.setAttribute('aria-pressed', lang !== 'en'); });
    document.querySelectorAll('.ltc-specs .b-en').forEach(function (b) { b.setAttribute('aria-pressed', lang === 'en'); });
    try { localStorage.setItem('ltc-lang', lang); } catch (e) {}
  }

  /* ---------- views ---------- */
  function currentView() {
    var h = location.hash.replace('#', '');
    return PROJECT_VIEWS.indexOf(h) >= 0 ? h : 'home';
  }
  function showView(view) {
    document.querySelectorAll('x-view').forEach(function (v) {
      v.hidden = v.getAttribute('data-view') !== view;
    });
  }
  function openView(view) {
    if (location.hash !== '#' + view) history.pushState(null, '', '#' + view);
    showView(view);
    window.scrollTo(0, 0);
  }
  function goHomeAndScroll(id) {
    var wasHome = currentView() === 'home';
    if (!wasHome) history.pushState(null, '', location.pathname + location.search);
    showView('home');
    setTimeout(function () {
      if (id === '__bottom') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      } else {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: wasHome ? 'smooth' : 'auto', block: 'start' });
      }
    }, 30);
  }

  /* ---------- dreamscape + map ---------- */
  function toggleDream(btn) {
    var open = root.classList.toggle('dream-open');
    if (btn) btn.setAttribute('aria-expanded', open);
  }
  function setMap(open) { root.classList.toggle('map-open', open); }

  var actions = {
    setZh: function () { setLang('zh'); },
    setEn: function () { setLang('en'); },
    goAbout: function () { goHomeAndScroll('about'); },
    goProjects: function () { goHomeAndScroll('projects'); },
    goDiscover: function () { goHomeAndScroll('discover'); },
    goContact: function () { goHomeAndScroll('__bottom'); },
    openCoffee: function () { openView('coffee'); },
    openFiveSense: function () { openView('fivesense'); },
    openGallery: function () { openView('gallery'); },
    openGap: function () { openView('mindthegap'); },
    toggleDream: function (el) { toggleDream(el); },
    openMap: function () { setMap(true); },
    closeMap: function () { setMap(false); }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var fn = actions[el.getAttribute('data-action')];
    if (!fn) return;
    e.preventDefault();
    e.stopPropagation();
    if (el.blur) el.blur();
    fn(el);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMap(false);
  });
  window.addEventListener('popstate', function () { showView(currentView()); window.scrollTo(0, 0); });

  /* ---------- init ---------- */
  var saved = null;
  try { saved = localStorage.getItem('ltc-lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'zh');
  showView(currentView());
})();
