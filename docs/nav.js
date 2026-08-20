// Shared sidebar and mobile menu logic
(function () {
  var lectures = [
    ['01', 'Tokenization'],
    ['02', 'PyTorch &amp; Resources'],
    ['03', 'Architectures'],
    ['04', 'Attention &amp; MoE'],
    ['05', 'GPUs &amp; TPUs'],
    ['06', 'Kernels &amp; Triton'],
    ['07', 'Parallelism I'],
    ['08', 'Parallelism II'],
    ['09', 'Scaling Laws I'],
    ['10', 'Inference'],
    ['11', 'Scaling Laws II'],
    ['12', 'Evaluation'],
    ['13', 'Data: Sources'],
    ['14', 'Data: Processing'],
    ['15', 'SFT &amp; RLHF'],
    ['16', 'RLVR'],
    ['17', 'Multimodality']
  ];

  var page = location.pathname.split('/').pop() || 'index.html';

  var html = '<div class="logo">CS<span>336</span> Notes</div>';
  html += '<a href="index.html"' + (page === 'index.html' ? ' class="active"' : '') + '>Overview</a>';
  html += '<a href="assignments.html"' + (page === 'assignments.html' ? ' class="active"' : '') + '>Assignments</a>';
  html += '<a href="references.html"' + (page === 'references.html' ? ' class="active"' : '') + '>References</a>';
  html += '<a href="algorithms.html"' + (page === 'algorithms.html' ? ' class="active"' : '') + '>Algorithms</a>';
  html += '<h2>Lectures</h2>';
  for (var i = 0; i < lectures.length; i++) {
    var num = lectures[i][0], label = lectures[i][1];
    var href = 'lec' + num + '.html';
    var cls = page === href ? ' class="active"' : '';
    html += '<a href="' + href + '"' + cls + '><span class="num">' + num + '</span>' + label + '</a>';
  }
  html += '<a href="https://github.com/Ychen463/CS336-Language-Modeling-from-Scratch" target="_blank" class="ghside">GitHub</a>';

  var nav = document.getElementById('sidebar');
  if (nav) nav.innerHTML = html;

  // Mobile menu button
  var btn = document.createElement('button');
  btn.className = 'menu-btn';
  btn.textContent = '\u2630';
  btn.onclick = function () { nav.classList.toggle('open'); };
  document.body.appendChild(btn);
})();
