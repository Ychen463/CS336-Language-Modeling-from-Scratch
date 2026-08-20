// Shared sidebar, topbar, and mobile menu logic
(function () {
  var modules = [
    { title: 'Basics', lectures: [
      ['01', 'Tokenization'],
      ['02', 'PyTorch &amp; Resources'],
      ['03', 'Architectures'],
      ['04', 'Attention &amp; MoE']
    ]},
    { title: 'Systems', lectures: [
      ['05', 'GPUs &amp; TPUs'],
      ['06', 'Kernels &amp; Triton'],
      ['07', 'Parallelism I'],
      ['08', 'Parallelism II']
    ]},
    { title: 'Scaling', lectures: [
      ['09', 'Scaling Laws I'],
      ['10', 'Inference'],
      ['11', 'Scaling Laws II']
    ]},
    { title: 'Data', lectures: [
      ['12', 'Evaluation'],
      ['13', 'Data: Sources'],
      ['14', 'Data: Processing']
    ]},
    { title: 'Alignment', lectures: [
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
    }
  }

  // ── Build sidebar ──
  var html = '<div class="logo">CS<span>336</span> Notes</div>';
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
  }
  html += '<a href="https://github.com/Ychen463/CS336-Language-Modeling-from-Scratch" target="_blank" class="ghside">GitHub</a>';

  var nav = document.getElementById('sidebar');
  if (nav) nav.innerHTML = html;

  // ── Build topbar ──
  var topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<div class="topbar-left">' +
      '<span class="topbar-brand">CS<span>336</span></span>' +
      '<span class="topbar-sep">/</span>' +
      '<span class="topbar-page">' + (pageName || 'Language Modeling from Scratch') + '</span>' +
    '</div>' +
    '<div class="topbar-right">' +
      '<div class="zh-toggle">' +
        '<label class="toggle-label">' +
          '<span class="toggle-text">中文</span>' +
          '<input type="checkbox" id="zh-switch">' +
          '<span class="toggle-slider"></span>' +
        '</label>' +
      '</div>' +
    '</div>';

  // Wrap main in a content column and insert topbar above it
  var main = document.querySelector('main');
  if (main) {
    var col = document.createElement('div');
    col.className = 'content-col';
    main.parentNode.insertBefore(col, main);
    col.appendChild(topbar);
    col.appendChild(main);
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
})();
