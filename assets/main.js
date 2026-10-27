// Theme: follow the system unless the visitor picked one (saved choice is applied in <head>).
(function () {
  const root = document.documentElement;

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    root.dataset.theme = current === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
})();

// Nav border once the page scrolls, and highlight the current section.
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });

const links = [...document.querySelectorAll('.nav nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// Fade sections in as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Only play demo videos while they are on screen.
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) v.play().catch(() => {});
    else v.pause();
  });
}, { threshold: 0.2 });
document.querySelectorAll('video[autoplay]').forEach((v) => videoObserver.observe(v));

document.getElementById('year').textContent = new Date().getFullYear();
