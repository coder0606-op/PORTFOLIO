// ==============================
// Custom Cursor Logic
// ==============================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Slight delay for the outline for a fluid effect
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// ==============================
// Background Particles
// ==============================
const particlesContainer = document.getElementById('particles-container');
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Randomize size, position, and animation delay
  const size = Math.random() * 5 + 2;
  const posX = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 10 + 15;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}vw`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationDuration = `${duration}s`;
  
  particlesContainer.appendChild(particle);
}

// ==============================
// 3D Tilt Effect for Glass Cards
// ==============================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// ==============================
// Typing Effect
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
    typingSpeed = 40;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeWriter, typingSpeed);
}

// ==============================
// Scroll Reveal Observers
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
  const duration = 2000;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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
// Init
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  if (typewriterElement) {
    typeWriter();
  }
});
