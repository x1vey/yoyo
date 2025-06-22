
// Modal functionality
const modal = document.getElementById('lead-form-modal');
const heroCta = document.getElementById('hero-cta');
const afterHeroCta = document.getElementById('after-hero-cta');
const bottomCta = document.getElementById('bottom-cta');
const closeBtn = document.getElementsByClassName('close')[0];
const leadForm = document.getElementById('lead-form');

// Open modal when CTA buttons are clicked
heroCta.addEventListener('click', () => {
  modal.style.display = 'block';
  trackEvent('hero_cta_clicked', { location: 'hero_section' });
});

afterHeroCta.addEventListener('click', () => {
  modal.style.display = 'block';
  trackEvent('after_hero_cta_clicked', { location: 'after_hero_section' });
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
  
  // HERE IS WHERE YOU ADD YOUR LEAD MAGNET DELIVERY LOGIC
  console.log('Lead captured:', { name, email });
  
  // Example: Send to your email service, CRM, or lead magnet delivery system
  // fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name, email })
  // });
  
  // For now, show success message
  alert(`Thank you ${name}! Check your email at ${email} for your free fitness guide.`);
  
  // Track conversion
  trackEvent('lead_captured', { name, email });
  
  // Close modal and reset form
  modal.style.display = 'none';
  leadForm.reset();
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
  // ADD YOUR ANALYTICS TRACKING HERE
  // Examples:
  // gtag('event', eventName, eventData); // Google Analytics
  // fbq('track', eventName, eventData); // Facebook Pixel
  // analytics.track(eventName, eventData); // Segment
}

// Form submission handler for lead magnet delivery
function handleLeadSubmission(leadData) {
  console.log('Lead submission:', leadData);
  // ADD YOUR LEAD MAGNET DELIVERY LOGIC HERE
  // This could integrate with:
  // - Email services (Mailchimp, ConvertKit, etc.)
  // - CRM systems (HubSpot, Salesforce, etc.)
  // - Lead magnet delivery services
  // - Your own backend API
  
  // Example implementations:
  
  // 1. Send to email service:
  // return fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'Bearer YOUR_API_KEY',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email_address: leadData.email,
  //     status: 'subscribed',
  //     merge_fields: { FNAME: leadData.name }
  //   })
  // });
  
  // 2. Send to your backend:
  // return fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(leadData)
  //   });
  
  // 3. Use a form service like Formspree:
  // return fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(leadData)
  // });
}

console.log('🚀 Landing page loaded successfully!');
console.log('📝 To connect your lead magnet delivery, edit the handleLeadSubmission function in script.js');
console.log('🖼️ To change images, replace the Cloudinary URLs in index.html');
