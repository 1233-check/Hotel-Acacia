/* ============================================
   HOTEL ACACIA — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Preloader ──
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
  });
  document.body.style.overflow = 'hidden';

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ── Hamburger menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ── Reveal on scroll ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Hero parallax on scroll ──
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // ── Counter animation ──
  const counters = document.querySelectorAll('.hero-stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        animateCounter(entry.target, target, suffix);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 25);
  }

  // ── Booking Modal ──
  const bookingModal = document.querySelector('.booking-modal');
  const openBookingBtns = document.querySelectorAll('[data-action="book"]');
  const closeBookingBtn = document.querySelector('.booking-close');

  if (bookingModal) {
    openBookingBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBookingBtn) {
      closeBookingBtn.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Booking form submit ──
  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData);
      const msg = `Hello Hotel Acacia! I'd like to book:\n` +
        `Room: ${data.roomType}\n` +
        `Check-in: ${data.checkIn}\n` +
        `Check-out: ${data.checkOut}\n` +
        `Guests: ${data.guests}\n` +
        `Name: ${data.guestName}\n` +
        `Phone: ${data.phone}`;
      const waUrl = `https://wa.me/918415935254?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // ── Testimonials horizontal scroll with drag ──
  const track = document.querySelector('.testimonials-track');
  if (track) {
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', (e) => {
      isDown = true; track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
    track.style.cursor = 'grab';
  }

  // ── Set min dates for booking form ──
  const checkInInput = document.querySelector('#checkIn');
  const checkOutInput = document.querySelector('#checkOut');
  if (checkInInput && checkOutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkInInput.addEventListener('change', () => {
      const nextDay = new Date(checkInInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
      if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
        checkOutInput.value = nextDay.toISOString().split('T')[0];
      }
    });
  }
});
