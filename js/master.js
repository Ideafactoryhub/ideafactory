// Firebase imports (MUST be outside DOMContentLoaded)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuRl8o5jM5IJre8tSREsaRjAmuROTG2hs',
  authDomain: 'ideafactory-2d67e.firebaseapp.com',
  projectId: 'ideafactory-2d67e',
  storageBucket: 'ideafactory-2d67e.appspot.com',
  messagingSenderId: '801823458198',
  appId: '1:801823458198:web:926c95f5542dfeffbf93b7',
  measurementId: 'G-RGVVZ6EPM5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  // ========== Navigation Scroll and Mobile Menu ==========
  const allLinks = document.querySelectorAll('[data-section]');
  const toggleBtn = document.querySelector('.header-area .toggle-menu');
  const linksContainer = document.querySelector(
    '.header-area .links-container',
  );

  toggleBtn.onclick = () => {
    toggleBtn.classList.toggle('active');
    linksContainer.classList.toggle('active');
  };

  allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      allLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      const targetSelector = link.dataset.section || link.getAttribute('href');
      const target = document.querySelector(targetSelector);
      if (target) {
        const yOffset = -80;
        const y =
          target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      toggleBtn.classList.remove('active');
      linksContainer.classList.remove('active');
    });
  });

  // ========== Scroll To Top Button ==========
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('active', window.scrollY > 100);
  });

  // ========== Support Buttons ==========
  const supportBtn = document.getElementById('supportUs');
  const supportBtn2 = document.getElementById('supportUs2');

  window.addEventListener('scroll', () => {
    const visible = window.scrollY > 100;
    supportBtn?.classList.toggle('active', visible);
    supportBtn2?.classList.toggle('active', visible);
  });

  [supportBtn, supportBtn2].forEach((btn) => {
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(
        'https://paypal.me/hamzaelbeialy',
        'paypalDonate',
        'width=600,height=700,scrollbars=yes',
      );
    });
  });

  // ========== Tilt Card ==========
  const card = document.getElementById('tiltCard');
  const container = document.getElementById('tiltContainer');

  if (card && container) {
    container.addEventListener('mousemove', (e) => {
      const bounds = container.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const xRotation = ((e.clientY - centerY) / 20).toFixed(2);
      const yRotation = ((centerX - e.clientX) / 20).toFixed(2);
      card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.08)`;
    });

    container.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });

    container.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // ========== Observe Elements Once ==========
  const observeOnce = (el, className, threshold = 0.15) => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          el.classList.add(className);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(el);
  };

  // Animate sections on scroll
  [
    { id: 'home', className: 'active1' },
    { id: 'tiltContainer', className: 'active2' },
    { id: 'infoBox', className: 'active1' },
    { id: 'aboutImg', className: 'active2' },
    { id: 'contactLeft', className: 'active1' },
    { id: 'contact-form', className: 'active2' },
    { id: 'reviews', className: 'active1' },
  ].forEach(({ id, className }) =>
    observeOnce(document.getElementById(id), className),
  );

  ['cont1', 'cont2', 'cont3', 'cont4', 'cont5', 'cont6'].forEach((id, i) => {
    observeOnce(document.getElementById(id), `active${i + 1}`);
  });

  // ========== Work Section Delayed Reveal ==========
  const workSection = document.getElementById('work');
  const work1 = document.getElementById('work1');
  const work2 = document.getElementById('work2');
  const work3 = document.getElementById('work3');

  if (workSection && work1 && work2 && work3) {
    const workObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          work1.classList.add('active');
          setTimeout(() => work2.classList.add('active'), 500);
          setTimeout(() => work3.classList.add('active'), 1000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );
    workObserver.observe(workSection);
  }

  // ========== Theme Toggle ==========
  const themeBtn = document.querySelector('.theme-btn');
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.querySelector('span.sun')?.classList.toggle('active');
    themeBtn.querySelector('span.moon')?.classList.toggle('active');
  });

  // ========== Reviews (Firebase Firestore) ==========
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  async function loadReviews() {
    reviewList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    querySnapshot.forEach((doc) => {
      const rev = doc.data();
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <h3><i class="fas fa-user" style="color: white;"></i> ${rev.name}</h3>
        <p>${rev.text}</p>
      `;
      reviewList.appendChild(card);
    });
    updateScrollButtonsVisibility();
  }

  reviewForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (name && text) {
      try {
        await addDoc(collection(db, 'reviews'), { name, text });
        reviewForm.reset();
        loadReviews();
      } catch (err) {
        console.error('Error adding review:', err);
      }
    }
  });

  function updateScrollButtonsVisibility() {
    const canScroll = reviewList.scrollWidth > reviewList.clientWidth;
    leftBtn.style.display = canScroll ? 'block' : 'none';
    rightBtn.style.display = canScroll ? 'block' : 'none';
  }

  window.scrollReviewsLeft = () => {
    reviewList.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(updateScrollButtonsVisibility, 400);
  };

  window.scrollReviewsRight = () => {
    reviewList.scrollBy({ left: 300, behavior: 'smooth' });
    setTimeout(updateScrollButtonsVisibility, 400);
  };

  // Load all reviews initially
  loadReviews();
});
