/* =========================================================
   SABA — Main JS
   Handles: language switching, mobile nav, testimonial carousel
   ========================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'saba_lang';
  const DEFAULT_LANG = 'pt';
  const SUPPORTED = ['pt', 'en', 'it'];
  const LANG_HTML = { pt: 'pt-BR', en: 'en', it: 'it' };

  /* ----- helpers ----- */
  function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => {
      if (acc == null) return undefined;
      // support array indices like "items.0.t"
      const idx = Number(key);
      if (!Number.isNaN(idx) && Array.isArray(acc)) return acc[idx];
      return acc[key];
    }, obj);
  }

  /* ----- i18n ----- */
  function applyTranslations(lang) {
    const T = window.SABA_TRANSLATIONS[lang];
    if (!T) return;

    // textContent / innerHTML
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const path = el.getAttribute('data-i18n');
      const val = getByPath(T, path);
      if (typeof val === 'string') {
        // some values contain inline html (<br/>, <strong>) — use innerHTML
        if (/[<>]/.test(val)) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const path = el.getAttribute('data-i18n-placeholder');
      const val = getByPath(T, path);
      if (typeof val === 'string') el.setAttribute('placeholder', val);
    });

    // <title> and meta description
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) titleEl.textContent = T.meta?.title || titleEl.textContent;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && T.meta?.description) metaDesc.setAttribute('content', T.meta.description);

    // <html lang>
    document.documentElement.setAttribute('lang', LANG_HTML[lang] || 'pt-BR');

    // active state on buttons
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    applyTranslations(lang);
  }

  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const browser = (navigator.language || 'pt').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(browser)) return browser;
    return DEFAULT_LANG;
  }

  /* ----- mobile nav ----- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });

    // close on link click (mobile)
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 980) {
          nav.setAttribute('data-open', 'false');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ----- testimonials carousel ----- */
  function initCarousel() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;
    const items = Array.from(track.querySelectorAll('.testimonial'));
    const prev = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');
    const dots = Array.from(document.querySelectorAll('.carousel-dots .dot'));

    let current = 0;

    function update() {
      // mobile: show only current
      items.forEach((it, i) => it.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function go(n) {
      current = (n + items.length) % items.length;
      update();
    }

    prev && prev.addEventListener('click', () => go(current - 1));
    next && next.addEventListener('click', () => go(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    // auto-advance only on mobile
    let timer;
    function tickStart() {
      clearInterval(timer);
      if (window.innerWidth < 980) {
        timer = setInterval(() => go(current + 1), 6000);
      }
    }
    window.addEventListener('resize', tickStart);
    tickStart();

    update();
  }

  /* ----- language buttons ----- */
  function initLangButtons() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
  }

  /* ----- contact form (basic UX, no backend) ----- */
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      // if action still has placeholder, prevent and show fallback
      if (form.getAttribute('action').includes('your-id')) {
        e.preventDefault();
        const lang = document.documentElement.getAttribute('lang')?.startsWith('it') ? 'it'
                  : document.documentElement.getAttribute('lang')?.startsWith('en') ? 'en' : 'pt';
        const msgs = {
          pt: 'Formulário ainda não conectado. Configure o action do <form> (ex: Formspree).',
          en: 'Form is not connected yet. Configure the <form> action (e.g. Formspree).',
          it: 'Il modulo non è ancora collegato. Configura l\'attributo action del <form> (es. Formspree).'
        };
        alert(msgs[lang]);
      }
    });
  }

  /* ----- init ----- */
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(detectInitialLang());
    initLangButtons();
    initMobileNav();
    initCarousel();
    initContactForm();
  });
})();
