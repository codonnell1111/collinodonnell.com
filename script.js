// ===== Carousel scroll buttons =====
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const container = wrapper.querySelector('.scroll-container');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');

  if (!container || !leftBtn || !rightBtn) return;

  leftBtn.addEventListener('click', () => {
    container.scrollBy({ left: -container.clientWidth * 0.8, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    container.scrollBy({ left: container.clientWidth * 0.8, behavior: 'smooth' });
  });
});

// ===== Scroll reveal (IntersectionObserver) =====
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('reveal-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// ===== Dark mode toggle (persisted with localStorage) =====
(function () {
  const btn = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') document.body.classList.add('dark');

  const setIcon = () => {
    if (!btn) return;
    btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  };
  setIcon();

  btn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    setIcon();
  });
})();

// ===== Contact modal (no backend; Netlify forms) =====
(function () {
  const openBtn = document.getElementById('open-contact-modal');
  const closeBtn = document.getElementById('close-contact-modal');
  const modal = document.getElementById('contact-modal');

  if (!openBtn || !modal) return;

  const open = () => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show')) close(); });
})();
