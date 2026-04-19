document.addEventListener('DOMContentLoaded', () => {
  // --- Theme & Language Management ---
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const body = document.body;
  const html = document.documentElement;

  // Load saved preferences
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedLang = localStorage.getItem('lang') || 'ur';

  if (savedTheme === 'dark') body.classList.add('dark-theme');
  setLanguage(savedLang);

  // Theme Toggle Logic
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon(currentTheme);
    });
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  // Language Toggle Logic
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const currentLang = html.getAttribute('lang') === 'ur' ? 'en' : 'ur';
      setLanguage(currentLang);
      localStorage.setItem('lang', currentLang);
    });
  }

  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    
    langToggle.innerHTML = lang === 'ur' 
      ? '<i class="fas fa-globe"></i> English' 
      : '<i class="fas fa-globe"></i> اردو';
  }

  // --- UI Interactions ---

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
      const isActive = item.classList.contains('active');
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

      const name = document.getElementById('studentName').value.trim();
      const fatherName = document.getElementById('fatherName').value.trim();
      const program = document.getElementById('programOptions').value;
      const phone = document.getElementById('whatsappNumber').value.trim();
      const city = document.getElementById('city').value.trim();

      if(!name || !fatherName || !phone || !city) {
        const msg = html.getAttribute('lang') === 'ur' ? "براہ کرم تمام فیلڈز پُر کریں۔" : "Please fill all fields.";
        alert(msg);
        return;
      }

      const message = lang === 'ur' 
        ? `السلام علیکم،\nمیں داخلہ لینا چاہتا ہوں:\n\nنام: ${name}\nوالد کا نام: ${fatherName}\nپروگرام: ${program}\nواٹس ایپ نمبر: ${phone}\nشہر: ${city}`
        : `Assalam-o-Alaikum,\nI want to apply for admission:\n\nName: ${name}\nFather's Name: ${fatherName}\nProgram: ${program}\nWhatsApp: ${phone}\nCity: ${city}`;

      const encodedMessage = encodeURIComponent(message);
      const targetPhone = "923353585999";
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }

  // --- Scroll Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // observer.unobserve(entry.target); // Optional: keep animating or just once
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealOnScroll.observe(el));
});
