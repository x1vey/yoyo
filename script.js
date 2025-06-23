// Modal functionality
const modal = document.getElementById('lead-form-modal');
const heroCta = document.getElementById('hero-cta');
const bottomCta = document.getElementById('bottom-cta');
const closeBtn = document.getElementsByClassName('close')[0];
const leadForm = document.getElementById('lead-form');

// Open modal when CTA buttons are clicked
heroCta.addEventListener('click', () => {
  modal.style.display = 'block';
  trackEvent('hero_cta_clicked', { location: 'hero_section' });
});

bottomCta.addEventListener('click', () => {
  modal.style.display = 'block';
  trackEvent('bottom_cta_clicked', { location: 'bottom_section' });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission
leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(leadForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const jsonData = {
    name: name,
    email: email
  };
  
  console.log('Lead captured:', { name, email });
  
  const scriptURL = "https://script.google.com/macros/s/AKfycbxtQlwSyzfsAKtj98qviH9H9AZ9CDBRt1agRDZaZ51E8JsT0JG5d3GDBeyDI9Seu6vQqA/exec";

  fetch(scriptURL, {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': "text/plain;charset=utf-8"
      }
    })
    .then(response => {
      // Redirect to thank you page with query parameters
     // window.location.href = `PASTE THANK YOU URL HERE`;
    })
    .catch(error => {
      console.error('Error:', error);
      alert("There was an error submitting the form. Please try again.");
    });
  
  // Track conversion
  trackEvent('lead_captured', { name, email });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .about-text, .about-image').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Analytics tracking function
function trackEvent(eventName, eventData) {
  console.log('Event tracked:', eventName, eventData);
  // Add your analytics tracking here
}
