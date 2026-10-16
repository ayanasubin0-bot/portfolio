document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    html.classList.add('dark-theme');
    themeToggle.textContent = '&#9729;';
  }

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-theme');
    const isDark = html.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '&#9729;' : '&#9728;';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else if (card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const revealElements = document.querySelectorAll(
    'section, .project-card, .skill-card, .blog-card, .testimonial-card, .stat'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => observer.observe(el));

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Contact form submitted:', data);
    alert('Thanks for reaching out! I will get back to you soon.');
    form.reset();
  });
});
