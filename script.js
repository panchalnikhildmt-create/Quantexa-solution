const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Thanks! Your inquiry is on its way. We will reach out shortly.';
    form.reset();
  });
}

const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingPanels = document.querySelectorAll('.pricing-panel');
const designSearch = document.getElementById('design-search');
const designItems = document.querySelectorAll('.design-item');

pricingTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    pricingTabs.forEach((item) => item.classList.remove('active'));
    pricingPanels.forEach((panel) => panel.classList.remove('active'));

    tab.classList.add('active');
    const target = tab.getAttribute('data-target');
    const panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('active');
    }
  });
});

if (designSearch) {
  designSearch.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();

    designItems.forEach((item) => {
      const searchableText = item.getAttribute('data-search') || '';
      const matches = searchableText.includes(query);
      item.classList.toggle('hidden', !matches && query !== '');
    });
  });
}
