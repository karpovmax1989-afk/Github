/* GOLDEN KEY — общие скрипты */

// Тема (светлая/тёмная)
(function () {
  const saved = localStorage.getItem('gk-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const isDark = current
    ? current === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('gk-theme', next);
}

// Мобильное меню
function toggleNav() {
  document.querySelector('.main-nav')?.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function () {
  // Кнопки темы и меню
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', toggleTheme));
  document.querySelectorAll('[data-nav-toggle]').forEach(b => b.addEventListener('click', toggleNav));

  // Ступенчатое появление карточек в сетках (stagger)
  document.querySelectorAll('.feature-grid, .property-grid, .testimonial-grid, .team-grid').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      if (child.classList.contains('reveal')) child.style.setProperty('--i', i % 6);
    });
  });

  // Появление секций при скролле
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Анимированные счётчики статистики
  function animateCounter(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/([\d\s.,]+)/);
    if (!match) return;
    const numStr = match[1].replace(/\s/g, '').replace(',', '.');
    const target = parseFloat(numStr);
    if (isNaN(target)) return;
    const decimals = (numStr.split('.')[1] || '').length;
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice(match.index + match[1].length);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = (target * eased).toFixed(decimals);
      const shown = decimals ? val : Math.round(val).toLocaleString('ru-RU');
      el.textContent = prefix + shown + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = raw; // финальное точное значение
    }
    requestAnimationFrame(tick);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (!reduceMotion) e.target.querySelectorAll('.stat-num, .r-num, .m-num').forEach(animateCounter);
      countIO.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stats-strip, .rating-big, .case-metrics').forEach(el => countIO.observe(el));

  // Форма обратной связи (демо)
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2500);
    });
  });

  // Кнопка "в избранное"
  document.querySelectorAll('.property-fav').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('active');
      this.style.background = this.classList.contains('active') ? 'var(--gold)' : '';
      this.style.color = this.classList.contains('active') ? '#fff' : '';
    });
  });
});
