(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');
  const menuBackdrop = document.querySelector('.menu-backdrop');
  const links = [...document.querySelectorAll('.site-nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const closeMenu = () => {
    menu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.visually-hidden').textContent = 'Открыть меню';
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuBackdrop.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('.visually-hidden').textContent = isOpen ? 'Закрыть меню' : 'Открыть меню';
  });

  links.forEach(link => link.addEventListener('click', closeMenu));
  menuBackdrop.addEventListener('click', closeMenu);
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -58% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
})();
