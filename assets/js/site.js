/* =====================================================================
   Spec2JIRA — site.js
   Vanilla, dependency-free, loaded with `defer`. Spec §5 scope only:
   (1) mobile nav toggle, (2) reveal-on-scroll, (3) footer year.
   No trackers, no external requests.
   ===================================================================== */
(function () {
  'use strict';

  /* js-flag: enables the .reveal hidden state (page is fully visible
     without JS; .reveal styles apply only under `.js`). */
  document.documentElement.classList.add('js');

  /* ---- 1. Mobile nav toggle -------------------------------------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  if (header && toggle) {
    var closeNav = function () {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Esc closes and returns focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        closeNav();
        toggle.focus();
      }
    });

    // Click outside the header closes the panel.
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) {
        closeNav();
      }
    });

    // Choosing a link closes the mobile panel.
    header.querySelectorAll('.nav-menu a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---- 2. Reveal on scroll --------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // No animation: show everything immediately.
    reveals.forEach(function (el) { el.classList.add('reveal-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---- 3. Footer year -------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
