/* ============================================
   SHREYANSH JAIN — Portfolio Scripts
   Animations, Counter, Smooth Scroll, Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar__links a');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- Active Nav Link ----------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.navbar__links a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // ---------- Mobile Menu ----------
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---------- Skill Bar Animation ----------
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---------- Smooth Scroll for all internal links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = '#16a34a';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ---------- Parallax on Hero ----------
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ---------- Typing effect for hero label ----------
  const heroLabel = document.querySelector('.hero__label span');
  if (heroLabel) {
    const text = heroLabel.textContent;
    heroLabel.textContent = '';
    heroLabel.style.borderRight = '2px solid var(--primary)';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroLabel.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
      } else {
        // Blink cursor then remove
        setTimeout(() => {
          heroLabel.style.borderRight = 'none';
        }, 2000);
      }
    }
    setTimeout(typeWriter, 800);
  }

  // ---------- Navbar background on hero ----------
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navbar.style.background = 'transparent';
          navbar.style.borderBottomColor = 'transparent';
          navbar.querySelector('.navbar__logo').style.color = '#fff';
          navbar.querySelectorAll('.navbar__links a').forEach(a => {
            a.style.color = 'rgba(255,255,255,0.7)';
          });
        } else {
          navbar.style.background = 'rgba(255,255,255,0.92)';
          navbar.querySelector('.navbar__logo').style.color = '';
          navbar.querySelectorAll('.navbar__links a').forEach(a => {
            a.style.color = '';
          });
        }
      });
    }, { threshold: 0.3 });
    heroObserver.observe(hero);
  }

});
