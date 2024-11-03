// scripts.js

// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP and its plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // =========================
  // 1. Page Load Animations
  // =========================

  // Animate Header Elements
  gsap.from('header .logo', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power2.out'
  });

  gsap.from('header ul li a', {
      duration: 1,
      y: -20,
      opacity: 0,
      stagger: 0.2,
      delay: 0.5,
      ease: 'power2.out'
  });

  gsap.from('header .btn-primary', {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.7)',
      delay: 1
  });

  // Animate Hero Section
  gsap.from('.hero-content h1', {
      duration: 1,
      x: -100,
      opacity: 0,
      ease: 'power2.out'
  });

  gsap.from('.hero-content p', {
      duration: 1,
      x: -100,
      opacity: 0,
      ease: 'power2.out',
      delay: 0.5
  });

  gsap.from('.cta-buttons .btn', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 1
  });

  gsap.from('.hero-image img', {
      duration: 1.5,
      scale: 0.8,
      opacity: 0,
      ease: 'power2.out',
      delay: 1
  });

  // ================================
  // 2. Scroll-Based Section Animations
  // ================================

  // Features Section Animation
  gsap.utils.toArray('.features .feature-row').forEach((section) => {
      gsap.from(section, {
          scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2
      });
  });

  // Pricing Section Animation
  gsap.utils.toArray('.pricing .pricing-card').forEach((card) => {
      gsap.from(card, {
          scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2
      });
  });

  // Testimonials Section Animation
  gsap.from('.testimonials-header h2', {
      scrollTrigger: {
          trigger: '.testimonials',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
  });

  gsap.from('.testimonial', {
      scrollTrigger: {
          trigger: '.testimonials',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
  });

  // Contact Section Animation
  gsap.from('.contact h2', {
      scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
  });

  gsap.from('.contact p', {
      scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power2.out'
  });

  gsap.from('.contact form', {
      scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
  });

  // =============================
  // 3. Testimonials Slider
  // =============================

  const testimonialSlider = document.querySelector('.testimonial-slider');
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');

  // Function to slide testimonials
  function slideTestimonials(direction) {
    const slideWidth = testimonialSlider.querySelector('.testimonial').offsetWidth + 60; // width + gap
    if (direction === 'left') {
        testimonialSlider.scrollLeft -= slideWidth;
    } else if (direction === 'right') {
        testimonialSlider.scrollLeft += slideWidth;
    }
  }

  // Add event listeners to arrows
  arrowLeft.addEventListener('click', () => {
      slideTestimonials('left');
  });

  arrowRight.addEventListener('click', () => {
      slideTestimonials('right');
  });

  // Optional: Loop the slider infinitely
  // You can implement an infinite loop by resetting position when end/start is reached

  // =============================
  // 4. Smooth Scroll for Navigation
  // =============================

  const navLinks = document.querySelectorAll('header ul li a');

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          gsap.to(window, {
              duration: 1.5,
              scrollTo: {
                  y: targetId,
                  offsetY: 80 // Adjust based on header height
              },
              ease: 'power2.out'
          });
      });
  });

  // =============================
  // 5. Mobile Menu Toggle
  // =============================

  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('header ul');

  mobileMenuToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
          gsap.to(navMenu, {
              height: 0,
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                  navMenu.style.display = 'none';
              }
          });
      } else {
          navMenu.style.display = 'flex';
          gsap.fromTo(navMenu, 
              { height: 0, opacity: 0 }, 
              { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.inOut' }
          );
      }
  });

  // =============================
  // 6. Additional Animations
  // =============================

  // Animate Footer Elements
  gsap.from('footer .logo', {
      scrollTrigger: {
          trigger: 'footer',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
  });

  gsap.from('footer .footer-section', {
      scrollTrigger: {
          trigger: 'footer',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
  });

  gsap.from('.footer-bottom-content', {
      scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
  });

});
