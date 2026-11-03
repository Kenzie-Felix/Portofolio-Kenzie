
    // 1. DARK / LIGHT MODE TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    let isDarkMode = false;

    themeToggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle('dark-mode', isDarkMode);
      if (isDarkMode) {
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      } else {
        themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      }
    });

    // 2. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });

    // 3. ACTIVE NAVIGATION LINK ON SCROLL
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      // BACK TO TOP TOGGLE
      if (scrollPosition > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. SCROLL REVEAL INTERSECTION OBSERVER
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // 5. CONTACT FORM VALIDATION & FEEDBACK
    function handleFormSubmit(event) {
      event.preventDefault();
      const statusEl = document.getElementById('formStatus');
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !subject || !message) {
        statusEl.style.display = 'block';
        statusEl.style.color = '#EF4444';
        statusEl.textContent = 'Harap isi semua bidang formulir.';
        return;
      }

      statusEl.style.display = 'block';
      statusEl.style.color = '#10B981';
      statusEl.textContent = 'Pesan Anda telah berhasil dikirim! Terima kasih telah menghubungi Neevaxius.';
      document.getElementById('contactForm').reset();

      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 5000);
    }
  