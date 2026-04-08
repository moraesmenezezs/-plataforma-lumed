// Sidebar toggle - collapsar/expandir
(function() {
  'use strict';

  var navbar = document.getElementById('navbar-top');
  var toggle = document.getElementById('navbar-toggle');
  var overlay = document.getElementById('sidebar-overlay');

  if (!navbar || !toggle) return;

  // Restaurar estado salvo
  var collapsed = localStorage.getItem('lumed_sidebar_collapsed') === 'true';
  if (collapsed && window.innerWidth > 768) {
    navbar.classList.add('collapsed');
    document.body.classList.add('sidebar-collapsed');
  }

  // Toggle click
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();

    if (window.innerWidth <= 768) {
      // Mobile: abrir/fechar overlay
      navbar.classList.toggle('menu-open');
    } else {
      // Desktop: colapsar/expandir
      navbar.classList.toggle('collapsed');
      document.body.classList.toggle('sidebar-collapsed');
      localStorage.setItem('lumed_sidebar_collapsed', navbar.classList.contains('collapsed'));
    }
  });

  // Overlay click (mobile) - fechar sidebar
  if (overlay) {
    overlay.addEventListener('click', function() {
      navbar.classList.remove('menu-open');
    });
  }

  // Fechar sidebar mobile ao clicar num link
  var navItems = navbar.querySelectorAll('.nav-item');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navbar.classList.remove('menu-open');
      }
    });
  }
})();
