/* =====================================================================
   Spec2JIRA — site.js
   Vanilla, dependency-free, loaded with `defer`.
   Includes navigation/reveal helpers plus consent-gated website analytics.
   Google Analytics is loaded only after explicit visitor consent.
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

  /* ---- 3. Consent-gated website analytics ----------------------- */
  var GA_MEASUREMENT_ID = 'G-B95QGF0R7L';
  var ANALYTICS_CONSENT_KEY = 'spec2jira_analytics_consent';
  var gaLoaded = false;

  var ensureGtag = function () {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
  };

  var loadGoogleAnalytics = function () {
    if (gaLoaded) { return; }
    gaLoaded = true;

    ensureGtag();

    // Spec2JIRA uses GA only for website analytics, not advertising.
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  };

  var clearAnalyticsCookies = function () {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) { return; }

      var expiry = 'Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = name + '=; expires=' + expiry + '; path=/';
      document.cookie = name + '=; expires=' + expiry + '; path=/; domain=' + window.location.hostname;
      document.cookie = name + '=; expires=' + expiry + '; path=/; domain=.' + window.location.hostname;
    });
  };

  var consentStyles = function () {
    if (document.getElementById('analytics-consent-styles')) { return; }

    var style = document.createElement('style');
    style.id = 'analytics-consent-styles';
    style.textContent =
      '.analytics-consent{position:fixed;left:20px;right:20px;bottom:20px;z-index:1000;max-width:760px;margin:auto;padding:18px 20px;border:1px solid #DDE3EC;border-radius:14px;background:#fff;color:#3E4C61;box-shadow:0 24px 64px -24px rgb(16 27 44 / .38);font:14px/1.55 Inter,system-ui,sans-serif}' +
      '.analytics-consent strong{display:block;margin-bottom:5px;color:#101B2C;font-size:15px}' +
      '.analytics-consent p{margin:0}' +
      '.analytics-consent-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;align-items:center}' +
      '.analytics-consent button{padding:9px 14px;border-radius:10px;font-weight:700}' +
      '.analytics-consent .allow{background:#1D6FE0;color:#fff}' +
      '.analytics-consent .necessary{border:1px solid #DDE3EC;background:#fff;color:#101B2C}' +
      '.analytics-consent a{font-weight:600}' +
      '.analytics-settings{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}' +
      '.analytics-settings:hover{text-decoration:underline}' +
      '@media(max-width:600px){.analytics-consent{left:12px;right:12px;bottom:12px}.analytics-consent-actions{align-items:stretch}.analytics-consent button{flex:1 1 150px}}';
    document.head.appendChild(style);
  };

  var hideConsentBanner = function () {
    var banner = document.getElementById('analytics-consent');
    if (banner) { banner.remove(); }
  };

  var setAnalyticsConsent = function (value) {
    var wasGranted = localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'granted';
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    hideConsentBanner();

    if (value === 'granted') {
      loadGoogleAnalytics();
      return;
    }

    if (wasGranted && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
      clearAnalyticsCookies();
      // Reload so the Google script is no longer present on the page.
      window.location.reload();
    }
  };

  var showConsentBanner = function () {
    hideConsentBanner();
    consentStyles();

    var banner = document.createElement('div');
    banner.id = 'analytics-consent';
    banner.className = 'analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics preferences');
    banner.innerHTML =
      '<strong>Optional website analytics</strong>' +
      '<p>We use Google Analytics to understand campaign traffic and whether visitors click “Start for free”. No Confluence or Jira content is collected.</p>' +
      '<div class="analytics-consent-actions">' +
        '<button type="button" class="allow">Allow analytics</button>' +
        '<button type="button" class="necessary">Only necessary</button>' +
        '<a href="/privacy">Privacy details</a>' +
      '</div>';

    banner.querySelector('.allow').addEventListener('click', function () {
      setAnalyticsConsent('granted');
    });
    banner.querySelector('.necessary').addEventListener('click', function () {
      setAnalyticsConsent('denied');
    });

    document.body.appendChild(banner);
  };

  var consent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (consent === 'granted') {
    loadGoogleAnalytics();
  } else if (consent !== 'denied') {
    showConsentBanner();
  }

  // Add a persistent settings control to the existing footer navigation.
  var footerNav = document.querySelector('.footer-bottom nav');
  if (footerNav) {
    var settingsButton = document.createElement('button');
    settingsButton.type = 'button';
    settingsButton.className = 'analytics-settings';
    settingsButton.textContent = 'Analytics settings';
    settingsButton.addEventListener('click', showConsentBanner);
    footerNav.appendChild(settingsButton);
  }

  // Campaign conversion event: track every "Start for free" CTA to Marketplace.
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a');
    if (!link) { return; }

    var text = (link.textContent || '').replace(/\s+/g, ' ').trim();
    var href = link.href || '';

    if (
      text !== 'Start for free' ||
      href.indexOf('marketplace.atlassian.com/apps/1475765564/spec2tickets-for-confluence-and-jira') === -1
    ) {
      return;
    }

    if (localStorage.getItem(ANALYTICS_CONSENT_KEY) !== 'granted' || !window.gtag) {
      return;
    }

    var placement = 'other';
    if (link.closest('.site-header')) {
      placement = 'nav';
    } else if (link.closest('.hero-dark')) {
      placement = 'hero';
    } else if (link.closest('.cta-final')) {
      placement = 'final_cta';
    }

    window.gtag('event', 'marketplace_click', {
      cta_text: 'Start for free',
      placement: placement,
      page_path: window.location.pathname,
      link_url: href
    });
  });

  /* ---- 4. Footer year -------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
