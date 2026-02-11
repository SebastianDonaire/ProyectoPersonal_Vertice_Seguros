// Main entry point for Vertice Seguros Clone

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 500);
    });
  }

  // 2. Tab System for Quote Form
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetId) {
          pane.classList.add('active');
        }
      });
    });
  });

  // 3. Smooth Scroll & Tab Sync
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.substring(1);

      // Sincronizar con el cotizador si el destino es una sección de producto
      const baseType = targetId.replace('-seccion', '');
      const targetTabBtn = document.querySelector(`.tab-btn[data-tab="${baseType}"]`);
      if (targetTabBtn) {
        (targetTabBtn as HTMLElement).click();
      }

      // Smooth scroll al destino real
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Cerrar otros (opcional, para efecto acordeón puro)
        faqItems.forEach(i => i.classList.remove('active'));

        // Abrir el actual si no estaba activo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Hero Carousel
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }

  // 5. Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Impact Counters Animation
  const statsSection = document.querySelector('.stats-section');
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const htmlCounter = counter as HTMLElement;
      const target = +htmlCounter.getAttribute('data-target')!;
      const speed = 2000 / target; // Duración total de ~2 segundos

      const updateCount = () => {
        const currentCount = +htmlCounter.innerText;
        if (currentCount < target) {
          htmlCounter.innerText = Math.ceil(currentCount + (target / 100)).toString();
          setTimeout(updateCount, speed / 10);
        } else {
          htmlCounter.innerText = target.toString();
        }
      };
      updateCount();
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 7. Back to Top Logic
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 8. Scroll-based Step Highlighting (Proceso de Reclamación)
  const defensorSteps = document.querySelector('.defensor-steps');
  if (defensorSteps) {
    const stepItems = defensorSteps.querySelectorAll('.step-item-horizontal');
    let stepsAnimated = false;

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !stepsAnimated) {
          stepsAnimated = true;
          stepItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('active');
            }, index * 400);
          });
        } else if (!entry.isIntersecting && stepsAnimated) {
          stepsAnimated = false;
          stepItems.forEach(item => item.classList.remove('active'));
        }
      });
    }, { threshold: 0.3 });

    stepObserver.observe(defensorSteps);
  }

  console.log('App initialized: Vertice Seguros Clone (v2 legalized)');
});
