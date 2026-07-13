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

  // Появление секций при скролле
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
