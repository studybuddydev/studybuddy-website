// scripts.js

// if (!window.location.pathname.includes('en.html')) {
//     const lang = (new URLSearchParams(window.location.search)).get('lang');
//     const userLang = navigator.language || navigator.userLanguage;
//     if (lang !== 'it' && userLang !== 'it-IT') {
//         window.location.href = '/en.html';
//     }
// }

const isDesktop = window.matchMedia('(min-width: 768px)').matches;


// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and its plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // =========================
    // 1. Page Load Animations
    // =========================
    if (isDesktop) {

        // Animate Header Elements
        // gsap.from('header .logo', {
        //     duration: 1,
        //     y: -50,
        //     opacity: 0,
        //     ease: 'power2.out'
        // });

        // gsap.from('header ul li a', {
        //     duration: 1,
        //     y: -20,
        //     opacity: 0,
        //     stagger: 0.2,
        //     delay: 0.5,
        //     ease: 'power2.out'
        // });

        // gsap.from('header .btn-primary', {
        //     duration: 1,
        //     scale: 0.8,
        //     opacity: 0,
        //     ease: 'back.out(1.7)',
        //     delay: 1
        // });

        // gsap.from('.lang-switch-link', {
        //     duration: 1,
        //     scale: 0.8,
        //     opacity: 0,
        //     ease: 'back.out(1.7)',
        //     delay: 1
        // });

        // // Animate Hero Section
        // gsap.from('.hero-content h1', {
        //     duration: 1,
        //     x: -100,
        //     opacity: 0,
        //     ease: 'power2.out'
        // });

        // gsap.from('.hero-content p', {
        //     duration: 1,
        //     x: -100,
        //     opacity: 0,
        //     ease: 'power2.out',
        //     delay: 0.5
        // });

        // gsap.from('.cta-buttons .btn', {
        //     duration: 1,
        //     y: 50,
        //     opacity: 0,
        //     stagger: 0.2,
        //     ease: 'power2.out',
        //     delay: 0.5
        // });

        // gsap.from('.hero-image img', {
        //     duration: 1.5,
        //     scale: 0.8,
        //     opacity: 0,
        //     ease: 'power2.out',
        //     delay: 0
        // });

    }

    // ================================
    // 2. Scroll-Based Section Animations
    // ================================

    // // Features Section Animation
    // gsap.utils.toArray('.features .feature-row').forEach((section) => {
    //     gsap.from(section, {
    //         scrollTrigger: {
    //             trigger: section,
    //             start: 'top 80%',
    //             toggleActions: 'play none none reverse',
    //         },
    //         y: 50,
    //         opacity: 0,
    //         duration: 1,
    //         ease: 'power2.out',
    //         stagger: 0.2
    //     });
    // });

    // // Pricing Section Animation
    // gsap.utils.toArray('.pricing .pricing-card').forEach((card) => {
    //     gsap.from(card, {
    //         scrollTrigger: {
    //             trigger: card,
    //             start: 'top 85%',
    //             toggleActions: 'play none none reverse',
    //         },
    //         y: 50,
    //         opacity: 0,
    //         duration: 1,
    //         ease: 'power2.out',
    //         stagger: 0.2
    //     });
    // });

    // // Testimonials Section Animation
    // gsap.from('.testimonials-header h2', {
    //     scrollTrigger: {
    //         trigger: '.testimonials',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     x: -100,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'power2.out'
    // });

    // gsap.from('.testimonial', {
    //     scrollTrigger: {
    //         trigger: '.testimonials',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     y: 50,
    //     opacity: 0,
    //     duration: 1,
    //     stagger: 0.2,
    //     ease: 'power2.out'
    // });

    // // Contact Section Animation
    // gsap.from('.contact h2', {
    //     scrollTrigger: {
    //         trigger: '.contact',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     x: -100,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'power2.out'
    // });

    // gsap.from('.contact p', {
    //     scrollTrigger: {
    //         trigger: '.contact',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     x: -100,
    //     opacity: 0,
    //     duration: 1,
    //     delay: 0.5,
    //     ease: 'power2.out'
    // });

    // gsap.from('.contact form', {
    //     scrollTrigger: {
    //         trigger: '.contact',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     y: 50,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'power2.out'
    // });

    // document.getElementById('waitlist-form').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const emailInput = document.getElementById('email-input');
    //     const messageElement = document.getElementById('waitlist-message');
    //     const email = emailInput.value.trim();

    //     // Basic email validation
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //     if (!emailRegex.test(email)) {
    //         messageElement.textContent = 'Inserisci un\'email valida';
    //         messageElement.className = 'waitlist-message error';
    //         return;
    //     }

    //     // Here you would typically add AJAX call to your backend
    //     // This is a placeholder implementation
    //     fetch('/api/waitlist', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email: email })
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Errore durante l\'iscrizione');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         messageElement.textContent = 'Grazie! Sei stato aggiunto alla waitlist.';
    //         messageElement.className = 'waitlist-message success';
    //         emailInput.value = ''; // Clear input
    //     })
    //     .catch(error => {
    //         messageElement.textContent = 'Si è verificato un errore. Riprova.';
    //         messageElement.className = 'waitlist-message error';
    //     });
    // });

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

    if (mobileMenuToggle && navMenu) {
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
    } else {
        console.log('Element not found: .mobile-menu-toggle or header ul');
    }


    // =============================
    /* 
       sta roba dovrebbe far cambiare l'immagine del telefono 
       quando passi sopra le card ma non funziona 
    */
    // =============================
    document.addEventListener('DOMContentLoaded', () => {
        // Use more specific and error-resistant selectors
        const phoneImage = document.querySelector('#app-showcase .phone-mockup img');
        const cards = document.querySelectorAll('#app-showcase .card');

        // Detailed error checking
        if (!phoneImage) {
            console.error('Phone image element not found!');
            return;
        }

        if (cards.length === 0) {
            console.error('No cards found!');
            return;
        }

        // Define image mapping for each card
        const imageMap = {
            'Traccia i progressi': '/imgs/iPhone2D_progress.png',
            'Studia in compagnia': '/imgs/iPhone2D_study_group.png',
            'Mantieni il focus': '/imgs/iPhone2D_timer.png',
            'Gestisci i tuoi esami': '/imgs/iPhone2D_exams.png'
        };

        cards.forEach(card => {
            // More robust title selection
            const titleElement = card.querySelector('.text-stack h2');

            if (!titleElement) {
                console.warn('No title found for a card');
                return;
            }

            const cardTitle = titleElement.textContent.trim();

            card.addEventListener('mouseenter', () => {
                // Fallback to default image if no specific image found
                const newImageSrc = imageMap[cardTitle] || '/imgs/iPhone2D_home.png';

                phoneImage.style.opacity = 0;

                setTimeout(() => {
                    phoneImage.src = newImageSrc;
                    phoneImage.style.opacity = 1;
                }, 300);
            });
        });

        // Optional: Reset to home image when mouse leaves the section
        const section = document.querySelector('#app-showcase');
        if (section) {
            section.addEventListener('mouseleave', () => {
                phoneImage.style.opacity = 0;
                setTimeout(() => {
                    phoneImage.src = '/imgs/iPhone2D_home.png';
                    phoneImage.style.opacity = 1;
                }, 300);
            });
        }
    });
    // =============================
    // 6. Additional Animations
    // =============================

    // // Animate Footer Elements
    // gsap.from('footer .logo', {
    //     scrollTrigger: {
    //         trigger: 'footer',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     y: -50,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'power2.out'
    // });

    // gsap.from('footer .footer-section', {
    //     scrollTrigger: {
    //         trigger: 'footer',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     y: 50,
    //     opacity: 0,
    //     duration: 1,
    //     stagger: 0.2,
    //     ease: 'power2.out'
    // });

    // gsap.from('.footer-bottom-content', {
    //     scrollTrigger: {
    //         trigger: '.footer-bottom',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //     },
    //     y: 50,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'power2.out'
    // });


});


document.addEventListener('DOMContentLoaded', () => {
    const experienceImg = document.getElementById('experience-img');
    if (!experienceImg) {
        console.log('Element not found: experience-img');
        return;
    }

    let timeoutSetOriginal = null;
    for (let i = 1; i <= 4; i++) {
        const exp = document.getElementById(`experience-${i}`);
        if (exp) {
            exp.addEventListener('mouseover', () => {
                if (timeoutSetOriginal) clearTimeout(timeoutSetOriginal);
                experienceImg.src = `/imgs/experiences/screenshot${i}.webp`;
            });
            exp.addEventListener('mouseleave', () => {
                timeoutSetOriginal = setTimeout(() => {
                    experienceImg.src = "/imgs/experiences/home_screen.webp";
                    timeoutSetOriginal = null;
                }, 500);
            });
        } else {
            console.error(`Element not found: experience-${i}`);
        }
    }
});

