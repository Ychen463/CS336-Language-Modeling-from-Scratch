// Shared topbar, sidebar, and mobile menu logic
(function () {
  var modules = [
    { title: 'Basics', assignment: ['a1', 'A1: Basics'], lectures: [
      ['01', 'Tokenization'],
      ['02', 'PyTorch &amp; Resources'],
      ['03', 'Architectures'],
      ['04', 'Attention &amp; MoE']
    ]},
    { title: 'Systems', assignment: ['a2', 'A2: Systems'], lectures: [
      ['05', 'GPUs &amp; TPUs'],
      ['06', 'Kernels &amp; Triton'],
      ['07', 'Parallelism I'],
      ['08', 'Parallelism II']
    ]},
    { title: 'Scaling', assignment: ['a3', 'A3: Scaling'], lectures: [
      ['09', 'Scaling Laws I'],
      ['10', 'Inference'],
      ['11', 'Scaling Laws II']
    ]},
    { title: 'Data', assignment: ['a4', 'A4: Data'], lectures: [
      ['12', 'Evaluation'],
      ['13', 'Data: Sources'],
      ['14', 'Data: Processing']
    ]},
    { title: 'Alignment', assignment: ['a5', 'A5: Alignment'], lectures: [
      ['15', 'SFT &amp; RLHF'],
      ['16', 'RLVR'],
      ['17', 'Multimodality']
    ]}
  ];

  var page = location.pathname.split('/').pop() || 'index.html';

  // ── Determine current page title ──
  var pageNames = {
    'index.html': 'Overview',
    'assignments.html': 'Assignments',
    'references.html': 'References',
    'algorithms.html': 'Algorithms'
  };
  var pageName = pageNames[page] || '';
  if (!pageName) {
    for (var mi = 0; mi < modules.length; mi++) {
      var ls = modules[mi].lectures;
      for (var li = 0; li < ls.length; li++) {
        if (page === 'lec' + ls[li][0] + '.html') {
          pageName = 'Lec ' + ls[li][0] + ': ' + ls[li][1].replace(/&amp;/g, '&');
          break;
        }
      }
      if (pageName) break;
      // Check assignment pages
      if (modules[mi].assignment && page === modules[mi].assignment[0] + '.html') {
        pageName = modules[mi].assignment[1].replace(/&amp;/g, '&');
        break;
      }
    }
  }

  // ── Build topbar (full-width, above everything) ──
  var topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<div class="topbar-left">' +
      '<a href="index.html" class="topbar-brand">CS<span>336</span></a>' +
      '<span class="topbar-sep">/</span>' +
      '<span class="topbar-page">' + (pageName || 'Language Modeling from Scratch') + '</span>' +
    '</div>' +
    '<div class="topbar-right">' +
      '<a href="https://github.com/Ychen463/CS336-Language-Modeling-from-Scratch" target="_blank" class="topbar-gh" title="GitHub">' +
        '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>' +
      '</a>' +
      '<div class="zh-toggle">' +
        '<label class="toggle-label">' +
          '<span class="toggle-text">中文</span>' +
          '<input type="checkbox" id="zh-switch">' +
          '<span class="toggle-slider"></span>' +
        '</label>' +
      '</div>' +
    '</div>';
  document.body.insertBefore(topbar, document.body.firstChild);

  // ── Build sidebar (no logo, starts with nav links) ──
  var html = '';
  html += '<a href="index.html"' + (page === 'index.html' ? ' class="active"' : '') + '>Overview</a>';
  html += '<a href="assignments.html"' + (page === 'assignments.html' ? ' class="active"' : '') + '>Assignments</a>';
  html += '<a href="references.html"' + (page === 'references.html' ? ' class="active"' : '') + '>References</a>';
  html += '<a href="algorithms.html"' + (page === 'algorithms.html' ? ' class="active"' : '') + '>Algorithms</a>';
  for (var m = 0; m < modules.length; m++) {
    html += '<h2>' + modules[m].title + '</h2>';
    var lecs = modules[m].lectures;
    for (var i = 0; i < lecs.length; i++) {
      var num = lecs[i][0], label = lecs[i][1];
      var href = 'lec' + num + '.html';
      var cls = page === href ? ' class="active"' : '';
      html += '<a href="' + href + '"' + cls + '><span class="num">' + num + '</span>' + label + '</a>';
    }
    // Add assignment link under each module
    if (modules[m].assignment) {
      var aId = modules[m].assignment[0], aLabel = modules[m].assignment[1];
      var aHref = aId + '.html';
      var aCls = page === aHref ? ' class="active sidebar-assignment"' : ' class="sidebar-assignment"';
      html += '<a href="' + aHref + '"' + aCls + '>' + aLabel + '</a>';
    }
  }

  var nav = document.getElementById('sidebar');
  if (nav) nav.innerHTML = html;

  // ── Wrap sidebar + main in body-row ──
  var main = document.querySelector('main');
  if (nav && main) {
    var row = document.createElement('div');
    row.className = 'body-row';
    nav.parentNode.insertBefore(row, nav);
    row.appendChild(nav);
    row.appendChild(main);
  }

  // ── Chinese annotation toggle logic ──
  var zhSwitch = document.getElementById('zh-switch');
  var zhOn = localStorage.getItem('zh-annotations') !== 'off';
  zhSwitch.checked = zhOn;
  if (!zhOn) document.body.classList.add('hide-zh');
  zhSwitch.onchange = function () {
    if (zhSwitch.checked) {
      document.body.classList.remove('hide-zh');
      localStorage.setItem('zh-annotations', 'on');
    } else {
      document.body.classList.add('hide-zh');
      localStorage.setItem('zh-annotations', 'off');
    }
  };

  // ── Mobile menu button ──
  var btn = document.createElement('button');
  btn.className = 'menu-btn';
  btn.textContent = '\u2630';
  btn.onclick = function () { nav.classList.toggle('open'); };
  document.body.appendChild(btn);

  // ── Auto-generate Table of Contents (3-level: h2 > h3 > h4) ──
  // Scans <main> for headings with id attributes and builds a numbered TOC.
  // Numbering matches CSS counters (h2=1., h3=1.1, h4=1.1.1).
  var tocContainer = document.getElementById('toc');
  if (tocContainer && main) {
    var allH = main.querySelectorAll('h2[id], h3[id], h4[id]');
    var headings = [];
    for (var fi = 0; fi < allH.length; fi++) {
      var el = allH[fi];
      if (!el.closest('.tldr') && !el.closest('.toc') && !el.closest('.concepts')) {
        headings.push(el);
      }
    }
    if (headings.length > 0) {
      // Compute section numbers to match CSS counters
      var cnt = [0, 0, 0];
      var nums = [];
      for (var ni = 0; ni < headings.length; ni++) {
        var t = headings[ni].tagName;
        if (t === 'H2') { cnt[0]++; cnt[1] = 0; cnt[2] = 0; nums.push(cnt[0] + '.'); }
        else if (t === 'H3') { cnt[1]++; cnt[2] = 0; nums.push(cnt[0] + '.' + cnt[1]); }
        else { cnt[2]++; nums.push(cnt[0] + '.' + cnt[1] + '.' + cnt[2]); }
      }
      // Build TOC
      var tocHtml = '<details class="toc" open><summary>Table of Contents</summary><div class="toc-body">';
      var level = 0;
      for (var hi = 0; hi < headings.length; hi++) {
        var h = headings[hi];
        var tag = h.tagName;
        var depth = tag === 'H2' ? 1 : tag === 'H3' ? 2 : 3;
        while (level >= depth) { tocHtml += '</ul>'; level--; }
        while (level < depth) {
          var cls = level === 0 ? 'toc-l1' : level === 1 ? 'toc-l2' : 'toc-l3';
          tocHtml += '<ul class="' + cls + '">';
          level++;
        }
        tocHtml += '<li><a href="#' + h.id + '"><span class="toc-num">' + nums[hi] + '</span>' + h.textContent + '</a></li>';
      }
      while (level > 0) { tocHtml += '</ul>'; level--; }
      tocHtml += '</div></details>';
      tocContainer.innerHTML = tocHtml;
    }
  }
})();
