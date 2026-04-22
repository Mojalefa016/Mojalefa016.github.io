/* ============================================================
   Mojalefa Mokhampane — Portfolio Script
   ============================================================ */

/* ── 1. SMOOTH SCROLL (with active nav highlight) ── */
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});


/* ── 2. ACTIVE NAV LINK ON SCROLL ── */
const sections   = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      allNavLinks.forEach(link => link.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (match) match.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });


/* ── 3. SCROLL-REVEAL ANIMATIONS ── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        siblings.forEach((el, idx) => {
          el.style.transitionDelay = `${idx * 80}ms`;
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── 4. SKILL BAR ANIMATION ON SCROLL ── */
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.bar-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, 200);
        }
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.skill-item').forEach(el => barObserver.observe(el));


/* ── 5. NAV SHADOW + SHRINK ON SCROLL ── */
const nav = document.querySelector('nav');

function handleNavScroll() {
  if (window.scrollY > 30) {
    nav.style.boxShadow = '0 4px 40px rgba(0,0,0,.55)';
    nav.style.padding   = '.65rem 2.5rem';
  } else {
    nav.style.boxShadow = 'none';
    nav.style.padding   = '1rem 2.5rem';
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });


/* ── 6. STAT COUNTER ANIMATION ── */
function animateCounter(el) {
  const raw    = el.textContent.trim();
  const suffix = raw.replace(/[0-9]/g, '');   // e.g. '+', '%', 'BSc'
  const num    = parseInt(raw);
  if (isNaN(num)) return;                       // skip non-numeric (BSc)

  let start     = 0;
  const end     = num;
  const duration = 1400;
  const step    = Math.ceil(duration / end);

  const timer = setInterval(() => {
    start += 1;
    el.textContent = start + suffix;
    if (start >= end) {
      el.textContent = raw;                     // restore exact original
      clearInterval(timer);
    }
  }, step);
}

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));


/* ── 7. TYPED HERO SUBTITLE EFFECT ── */
const heroSub = document.querySelector('.hero-sub');

if (heroSub) {
  const roles   = [
    'Software Engineer',
    'Backend Developer',
    'Database Enthusiast',
    'Systems Developer',
    'Java & Python Coder',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  // Wrap the strong tag so we only type inside it
  const strong = heroSub.querySelector('strong');
  if (strong) {
    function typeLoop() {
      const current = roles[roleIndex];
      if (!deleting) {
        strong.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);       // pause at full word
          return;
        }
      } else {
        strong.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting  = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 55 : 95);
    }

    // Start after hero animation finishes
    setTimeout(typeLoop, 1200);
  }
}


/* ── 8. PROJECT CARD TILT EFFECT ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const midX   = rect.width  / 2;
    const midY   = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -5;
    const rotateY = ((x - midX) / midX) *  5;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .1s ease';
  });
});


/* ── 9. COPY EMAIL ON CLICK ── */
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const email = link.getAttribute('href').replace('mailto:', '');
    navigator.clipboard.writeText(email).then(() => {
      const original = link.textContent;
      link.textContent = '✅ Copied!';
      link.style.color = 'var(--accent)';
      setTimeout(() => {
        link.textContent = original;
        link.style.color  = '';
      }, 2000);
    }).catch(() => {
      // Fallback: just open mail client
      window.location.href = link.getAttribute('href');
    });
  });
});


/* ── 10. BACK TO TOP BUTTON ── */
const backTop = document.createElement('button');
backTop.innerHTML    = '↑';
backTop.title        = 'Back to top';
backTop.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--accent);
  color: #080c18;
  border: none;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(245,166,35,.4);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .3s ease, transform .3s ease;
  z-index: 999;
`;

document.body.appendChild(backTop);

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backTop.style.opacity   = '1';
    backTop.style.transform = 'translateY(0)';
  } else {
    backTop.style.opacity   = '0';
    backTop.style.transform = 'translateY(12px)';
  }
}, { passive: true });


/* ── 11. ACTIVE NAV LINK STYLE (inject CSS) ── */
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--accent) !important;
  }
  .nav-links a.active::after {
    content: '';
    display: block;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    margin-top: 2px;
    animation: fadeIn .3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scaleX(0); }
    to   { opacity: 1; transform: scaleX(1); }
  }
  nav { transition: padding .3s ease, box-shadow .3s ease; }
`;
document.head.appendChild(style);


/* ── 12. PAGE LOAD PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  z-index: 9999;
  transition: width .2s ease;
  box-shadow: 0 0 10px rgba(245,166,35,.6);
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });
