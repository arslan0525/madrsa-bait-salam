document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if(this.getAttribute('href') !== '#') {
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
          e.preventDefault();
          navLinks.classList.remove('active'); // close menu on mobile
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Toggle current item
      const isActive = item.classList.contains('active');
      
      // Close all other items (optional, but cleaner)
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // WhatsApp Admission Form Logic
  const admissionForm = document.getElementById('admissionForm');
  
  if(admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Gather field values
      const name = document.getElementById('studentName').value.trim();
      const fatherName = document.getElementById('fatherName').value.trim();
      const program = document.getElementById('programOptions').value;
      const phone = document.getElementById('whatsappNumber').value.trim();
      const city = document.getElementById('city').value.trim();

      // Basic validation
      if(!name || !fatherName || !phone || !city) {
        alert("براہ کرم تمام فیلڈز پُر کریں۔"); // Please fill all fields
        return;
      }

      // Format message exactly as requested
      const message = `السلام علیکم،\nمیں داخلہ لینا چاہتا ہوں:\n\nنام: ${name}\nوالد کا نام: ${fatherName}\nپروگرام: ${program}\nواٹس ایپ نمبر: ${phone}\nشہر: ${city}`;

      // Encode for URI
      const encodedMessage = encodeURIComponent(message);
      
      // Madrasa WhatsApp Number
      const targetPhone = "923353585999";
      
      // WhatsApp API URL
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    });
  }
});
