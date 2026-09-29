// Lasag Dev (lasagdev.com) — Modern Interactions
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('y');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Intersection Observer for Scroll Reveals
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => {
          entry.target.classList.add('in');
        }, i * 80);
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // 3. Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Copy Email to Clipboard with Toast Notification
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'support@lasagdev.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('support@lasagdev.com copied to clipboard!');
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('support@lasagdev.com copied to clipboard!');
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 5. Screenshot Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const thumbs = document.querySelectorAll('.gallery-thumb img');

  if (lightboxModal && lightboxImg) {
    thumbs.forEach(thumb => {
      thumb.parentElement.addEventListener('click', () => {
        lightboxImg.src = thumb.src;
        lightboxImg.alt = thumb.alt || 'Game Screenshot Preview';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});
