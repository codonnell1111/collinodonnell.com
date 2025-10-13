// ===== Carousel scroll buttons =====
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const container = wrapper.querySelector('.scroll-container');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');
  if (!container || !leftBtn || !rightBtn) return;
  leftBtn.addEventListener('click', () => container.scrollBy({ left: -container.clientWidth * 0.8, behavior: 'smooth' }));
  rightBtn.addEventListener('click', () => container.scrollBy({ left: container.clientWidth * 0.8, behavior: 'smooth' }));
});

// ===== Scroll reveal =====
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('reveal-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('reveal-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// ===== Contact modal =====
(() => {
  const openBtn = document.getElementById('open-contact-modal');
  const closeBtn = document.getElementById('close-contact-modal');
  const modal = document.getElementById('contact-modal');
  if (!openBtn || !modal) return;

  const open = () => { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); };
  const close = () => { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show')) close(); });
})();

// ===== Mobile nav (hamburger) =====
(() => {
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const scrim  = document.getElementById('nav-scrim'); // NEW
  if (!toggle || !drawer) return;

  const close = () => {
    drawer.hidden = true;
    if (scrim) scrim.hidden = true;       // NEW
    toggle.setAttribute('aria-expanded', 'false');
  };
  const open  = () => {
    drawer.hidden = false;
    if (scrim) scrim.hidden = false;      // NEW
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  if (scrim) scrim.addEventListener('click', close);   // NEW
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();



