 // Mobile nav toggle
 const navToggleButton = document.getElementById('nav-toggle');
 const navMenu = document.getElementById('nav-menu');
 if (navToggleButton && navMenu) {
   navToggleButton.addEventListener('click', () => {
     const willOpen = !navMenu.classList.contains('open');
     navMenu.classList.toggle('open');
     navToggleButton.setAttribute('aria-expanded', String(willOpen));
   });
 }
 
 // Smooth scroll and active link highlight
 const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
 navLinks.forEach((link) => {
   link.addEventListener('click', (e) => {
     const targetId = link.getAttribute('href');
     if (!targetId) return;
     const target = document.querySelector(targetId);
     if (!target) return;
     e.preventDefault();
     target.scrollIntoView({ behavior: 'smooth', block: 'start' });
     if (navMenu && navMenu.classList.contains('open')) navMenu.classList.remove('open');
   });
 });
 
 // Observe sections to set active nav link
 const sectionIds = ['#about', '#projects', '#skills', '#contact'];
 const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
     const id = '#' + entry.target.id;
     const matching = navLinks.find((a) => a.getAttribute('href') === id);
     if (matching) {
       if (entry.isIntersecting) {
         navLinks.forEach((a) => a.classList.remove('active'));
         matching.classList.add('active');
       }
     }
   });
 }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
 sectionIds.forEach((id) => {
   const el = document.querySelector(id);
   if (el) observer.observe(el);
 });
 
 // Year in footer
 const yearEl = document.getElementById('year');
 if (yearEl) {
   yearEl.textContent = String(new Date().getFullYear());
 }

