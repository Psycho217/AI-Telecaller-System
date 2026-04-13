// ============================
// NEVARA AI — GLOBAL SCRIPT
// ============================

// ---- MOBILE NAV ----
const burger   = document.getElementById('nav-burger');
const mNav     = document.getElementById('mobile-nav');
const mClose   = document.getElementById('mobile-nav-close');
if (burger && mNav) {
  burger.addEventListener('click', () => {
    mNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (mClose && mNav) {
  mClose.addEventListener('click', () => {
    mNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq-item').forEach(item => {
  const head = item.querySelector('.faq-head');
  if (!head) return;
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- PRICING TOGGLE ----
const toggleBtns = document.querySelectorAll('.pricing-toggle button');
const priceAmounts = document.querySelectorAll('[data-monthly]');
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode;
    priceAmounts.forEach(el => {
      el.textContent = mode === 'annual' ? el.dataset.annual : el.dataset.monthly;
    });
    document.querySelectorAll('[data-billing]').forEach(el => {
      el.textContent = mode === 'annual' ? 'Billed annually' : 'Billed monthly';
    });
  });
});

// ---- ANIMATED HERO COUNTERS ----
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = val.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}

// ---- DEMO-MODE FORMS ----
document.querySelectorAll('form[data-demo]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = form.querySelector('.form-success');
    if (msg) msg.classList.remove('hidden');
    form.querySelectorAll('input, select, textarea').forEach(i => {
      if (i.type !== 'submit' && i.type !== 'button') i.value = '';
    });
  });
});
