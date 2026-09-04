// ==============================
// Typing Effect for Hero Section
// ==============================
const phrases = ["Full-Stack Applications.", "Intelligent AI Platforms.", "Scalable REST APIs.", "Interactive Web Experiences."];
const typewriterElement = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeWriter, typingSpeed);
}

// ==============================
// Scroll Reveal (all variants)
// ==============================
const revealSelectors = '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .section-divider';
const revealElements = document.querySelectorAll(revealSelectors);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { rootMargin: '0px', threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ==============================
// Timeline Draw-Line Animation
// ==============================
const timelines = document.querySelectorAll('.timeline');

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('draw-line');
      }
    });
  },
  { rootMargin: '0px', threshold: 0.2 }
);

timelines.forEach((tl) => timelineObserver.observe(tl));

// ==============================
// Stat Counter Animation
// ==============================
function animateCounter(el, target) {
  const suffix = '+';
  const duration = 1800; // ms
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const statItems = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'), 10);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statItems.forEach((item) => counterObserver.observe(item));

// ==============================
// Navbar Shrink on Scroll
// ==============================
const nav = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ==============================
// Smooth Scroll for Nav Links
// ==============================
document.querySelectorAll('.nav-links a, .hero-cta a').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ==============================
// Init
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  if (typewriterElement) {
    typeWriter();
  }
});
