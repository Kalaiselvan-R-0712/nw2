// ======================
// HEADER SCROLL EFFECT
// ======================
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ======================
// MOBILE MENU TOGGLE
// ======================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    navLinks.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  });
}

// ======================
// SMOOTH SCROLL WITH OFFSET
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ======================
// FORM SUBMISSION HANDLER
// ======================
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Remove old message if any
    const oldMsg = form.querySelector('.form-message');
    if (oldMsg) oldMsg.remove();

    // Create & append success message
    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.style.marginTop = '0.5rem';
    msg.style.color = 'green';
    msg.textContent = '✅ Thank you! We will get back to you soon.';
    form.appendChild(msg);

    form.reset();
  });
});

// ======================
// INTERSECTION OBSERVER FOR FADE-IN
// ======================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Attach observer to fade-section elements
document.querySelectorAll('.fade-section').forEach(section => {
  observer.observe(section);
});
