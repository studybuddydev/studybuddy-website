// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Floating CTA Visibility
  const floatingCTA = document.querySelector('.floating-cta');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
          floatingCTA.style.display = 'flex';
      } else {
          floatingCTA.style.display = 'none';
      }
  });

  // Waitlist Signup Form
  const waitlistForm = document.getElementById('waitlist-form');
  const exitWaitlistForm = document.getElementById('exit-waitlist-form');
  const progressBar = document.getElementById('progress-bar');

  const handleSignup = (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input').value;
      // Simulate signup process
      progressBar.style.width = '100%';

      // Track conversion
      trackConversion(email);

      // Show success message
      alert('Grazie per esserti iscritto alla waitlist!');

      // Reset form
      e.target.reset();
      progressBar.style.width = '0%';
  };

  waitlistForm.addEventListener('submit', handleSignup);
  exitWaitlistForm.addEventListener('submit', handleSignup);

  // Conversion Tracking Function
  function trackConversion(email) {
      // Implement your tracking logic here (e.g., Google Analytics, Mixpanel)
      console.log(`Conversion tracked for email: ${email}`);
  }

  // Exit-Intent Popup
  const exitIntentPopup = document.getElementById('exit-intent-popup');
  const closePopup = exitIntentPopup.querySelector('.close-popup');

  let hasShownPopup = false;

  document.addEventListener('mouseout', (e) => {
      if (!hasShownPopup && e.clientY < 50) {
          exitIntentPopup.style.display = 'flex';
          hasShownPopup = true;
      }
  });

  closePopup.addEventListener('click', () => {
      exitIntentPopup.style.display = 'none';
  });

  // Social Proof Notifications
  const socialProofContainer = document.getElementById('social-proof-notifications');

  function showSocialProof(message) {
      const notification = document.createElement('div');
      notification.classList.add('notification');
      notification.textContent = message;
      socialProofContainer.appendChild(notification);

      // Remove after 3 seconds
      setTimeout(() => {
          notification.style.animation = 'slide-out 0.5s forwards';
          notification.addEventListener('animationend', () => {
              notification.remove();
          });
      }, 3000);
  }

  // Simulate social proof notifications
  setInterval(() => {
      const messages = [
          'Giulia si è appena iscritta alla waitlist!',
          'Marco ha appena condiviso StudyBuddy sui social!',
          'Laura ha completato il suo primo obiettivo di studio!'
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      showSocialProof(randomMessage);
  }, 10000);

  // GSAP Animations Optimization
  if (window.innerWidth < 768) {
      // Optimize GSAP animations for mobile
      gsap.to('.hero-content', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
      gsap.to('.hero-image img', { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: 'power2.out' });
  } else {
      // Desktop GSAP animations
      gsap.from('.hero-content', { opacity: 0, y: -50, duration: 1, ease: 'power2.out' });
      gsap.from('.hero-image img', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5, ease: 'power2.out' });
  }
});
