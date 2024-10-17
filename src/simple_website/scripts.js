// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Navbar animation
    gsap.from('header', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero h1', { y: 50, opacity: 0, duration: 0.8 })
          .from('.hero p', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
          .from('.cta-buttons', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
          .from('.hero-image', { scale: 0.9, opacity: 0, duration: 1 }, '-=0.4');
  
    // Features section animation
    ScrollTrigger.batch('.feature-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      start: 'top 80%',
    });
  
    // App showcase animation
    gsap.from('.phone-mockup', {
      scrollTrigger: {
        trigger: '.app-showcase',
        start: 'top 70%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.2)'
    });
  
    // How it works animation
    ScrollTrigger.batch('.step', {
      onEnter: (elements) => {
        gsap.from(elements, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      start: 'top 80%',
    });
  
    // Testimonials animation
    ScrollTrigger.batch('.testimonial', {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      start: 'top 80%',
    });
  
    // Pricing cards animation
    ScrollTrigger.batch('.pricing-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      start: 'top 80%',
    });
  
    // CTA section animation
    gsap.from('.cta', {
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  
    // Contact form animation
    gsap.from('.contact form', {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  
    // Parallax effect for hero background
    gsap.to('.parallax-bg', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.2,
      ease: 'none'
    });
  
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        gsap.to(window, {duration: 1, scrollTo: target, ease: 'power2.inOut'});
      });
    });
  });