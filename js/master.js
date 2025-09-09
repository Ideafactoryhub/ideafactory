import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDuRl8o5jM5IJre8tSREsaRjAmuROTG2hs',
  authDomain: 'ideafactory-2d67e.firebaseapp.com',
  projectId: 'ideafactory-2d67e',
  storageBucket: 'ideafactory-2d67e.appspot.com',
  messagingSenderId: '801823458198',
  appId: '1:801823458198:web:926c95f5542dfeffbf93b7',
  measurementId: 'G-RGVVZ6EPM5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Navigation Scroll & Mobile Menu ---------- */
  const allLinks = document.querySelectorAll('[data-section]');
  const toggleBtn = document.querySelector('.header-area .toggle-menu');
  const linksContainer = document.querySelector(
    '.header-area .links-container',
  );

  if (toggleBtn && linksContainer) {
    toggleBtn.onclick = () => {
      toggleBtn.classList.toggle('active');
      linksContainer.classList.toggle('active');
    };
  }

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
      toggleBtn?.classList.remove('active');
      linksContainer?.classList.remove('active');
    });
  });

  /* ---------- Scroll To Top Button ---------- */
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('active', window.scrollY > 100);
  });

  /* ---------- Support Buttons ---------- */
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

  /* =========================================================
   * Theme Toggle Button
   * ========================================================= */
  const themeBtn = document.querySelector('.theme-btn');

  // Check saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeBtn?.querySelector('span.moon')?.classList.add('active');
    themeBtn?.querySelector('span.sun')?.classList.remove('active');
  } else {
    document.body.classList.remove('dark-theme');
    themeBtn?.querySelector('span.sun')?.classList.add('active');
    themeBtn?.querySelector('span.moon')?.classList.remove('active');
  }

  // Toggle theme
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      themeBtn.querySelector('span.moon')?.classList.add('active');
      themeBtn.querySelector('span.sun')?.classList.remove('active');
    } else {
      localStorage.setItem('theme', 'light');
      themeBtn.querySelector('span.sun')?.classList.add('active');
      themeBtn.querySelector('span.moon')?.classList.remove('active');
    }
  });

  /* =========================================================
   * Reviews (Firestore)
   * ========================================================= */
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  async function loadReviews() {
    if (!reviewList) return;
    reviewList.innerHTML = '';
    try {
      const snap = await getDocs(collection(db, 'reviews'));
      const reviews = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.name && data.text) {
          reviews.push({
            name: data.name,
            text: data.text,
            timestamp: data.timestamp ?? null,
          });
        }
      });

      reviews.sort(
        (a, b) =>
          (b.timestamp?.toMillis?.() ?? 0) - (a.timestamp?.toMillis?.() ?? 0),
      );

      reviews.forEach((rev) => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <h3><i class="fas fa-user"></i> ${rev.name}</h3>
          <p>${rev.text}</p>
        `;
        reviewList.appendChild(card);
      });

      updateScrollButtonsVisibility();
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  }

  reviewForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('reviewerName');
    const textEl = document.getElementById('reviewText');
    const name = nameEl?.value.trim();
    const text = textEl?.value.trim();
    if (name && text) {
      try {
        await addDoc(collection(db, 'reviews'), {
          name,
          text,
          timestamp: serverTimestamp(),
        });
        reviewForm.reset();
        loadReviews();
      } catch (err) {
        console.error('Error adding review:', err);
      }
    }
  });

  function updateScrollButtonsVisibility() {
    if (!reviewList) return;
    const canScroll = reviewList.scrollWidth > reviewList.clientWidth;
    if (leftBtn) leftBtn.style.display = canScroll ? 'block' : 'none';
    if (rightBtn) rightBtn.style.display = canScroll ? 'block' : 'none';
  }

  window.scrollReviewsLeft = () => {
    reviewList?.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(updateScrollButtonsVisibility, 400);
  };
  window.scrollReviewsRight = () => {
    reviewList?.scrollBy({ left: 300, behavior: 'smooth' });
    setTimeout(updateScrollButtonsVisibility, 400);
  };
  loadReviews();

  /* =========================================================
   * "Your Idea" Form (Firestore)
   * ========================================================= */
  const ideaForm = document.getElementById('contact-form');
  if (ideaForm) {
    ideaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = ideaForm.name?.value.trim();
      const email = ideaForm.email?.value.trim();
      const category = ideaForm.category?.value;
      const message = ideaForm.message?.value.trim();

      if (!name || !email || !category || !message) {
        alert('Please fill all required fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        await addDoc(collection(db, 'ideas'), {
          name,
          email,
          category,
          message,
          timestamp: serverTimestamp(),
        });

        ideaForm.reset();
        alert('✅ Idea submitted successfully!');
      } catch (err) {
        console.error('❌ Error submitting idea:', err);
        alert('Submission failed. Try again later.');
      }
    });
  }
});

function initIdeasRealtime() {
  const ideasDisplay = document.getElementById('ideasDisplay');
  if (!ideasDisplay) return;

  const ideasRef = collection(db, 'ideas');
  onSnapshot(
    ideasRef,
    (snapshot) => {
      ideasDisplay.innerHTML = '';
      const ideas = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.name && data.message) {
          ideas.push({
            ...data,
            timestamp: data.timestamp?.toMillis?.() ?? 0,
          });
        }
      });

      ideas.sort((a, b) => b.timestamp - a.timestamp);

      ideas.forEach((idea) => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
          <h4><i class="fas fa-user"></i> ${idea.name || 'Anonymous'} 
            <span>(${idea.category || 'Other'})</span>
          </h4>
          ${
            idea.imageUrl
              ? `<div class="idea-image"><img src="${idea.imageUrl}" alt="Idea Image" /></div>`
              : ''
          }
          <p>${idea.message || ''}</p>
        `;
        ideasDisplay.appendChild(card);
      });
    },
    (err) => {
      console.error('❌ Error loading ideas:', err);
      ideasDisplay.innerHTML =
        '<p class="error">Failed to load ideas. Please try again later.</p>';
    },
  );
}
initIdeasRealtime();

/* ---------- Scroll buttons for ideas ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const ideaList = document.getElementById('ideasDisplay');
  const scrollUpBtn = document.getElementById('scrollUpBtn');
  const scrollDownBtn = document.getElementById('scrollDownBtn');

  function updateIdeaScrollButtonsVisibility() {
    if (!ideaList) return;
    const canScroll = ideaList.scrollHeight > ideaList.clientHeight;
    if (scrollUpBtn) scrollUpBtn.style.display = canScroll ? 'block' : 'none';
    if (scrollDownBtn)
      scrollDownBtn.style.display = canScroll ? 'block' : 'none';
  }

  window.scrollIdeasUp = () => {
    ideaList?.scrollBy({ top: -200, behavior: 'smooth' });
    setTimeout(updateIdeaScrollButtonsVisibility, 400);
  };

  window.scrollIdeasDown = () => {
    ideaList?.scrollBy({ top: 200, behavior: 'smooth' });
    setTimeout(updateIdeaScrollButtonsVisibility, 400);
  };

  scrollUpBtn?.addEventListener('click', window.scrollIdeasUp);
  scrollDownBtn?.addEventListener('click', window.scrollIdeasDown);

  updateIdeaScrollButtonsVisibility();
  setInterval(updateIdeaScrollButtonsVisibility, 1500);
});

/* ---------- Typing Effect ---------- */
const textArray = [
  'Turning ideas into reality.',
  'Empowering innovation and creativity.',
  'Transforming ideas into projects.',
  'Connecting innovators for change.',
  'Building a creative community.',
];
let i = 0;
let j = 0;
let isDeleting = false;
let speed = 100;

function typeEffect() {
  const typingElement = document.getElementById('typing');
  const currentText = textArray[i];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, j++);
    if (j > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % textArray.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : speed);
}
typeEffect();

/* ---------- Particles ---------- */
particlesJS('particles-js', {
  particles: {
    number: { value: 50 },
    color: { value: '#bc9516' },
    shape: { type: 'circle' },
    opacity: { value: 0.8 },
    size: { value: 4, random: true },
    move: { enable: true, speed: 2 },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: 'repulse' } },
  },
});
function updateAOS() {
  if (window.innerWidth <= 867) {
    for (let i = 1; i <= 6; i++) {
      const el = document.getElementById(`cont${i}`);
      if (el) {
        el.setAttribute('data-aos', 'fade-down-right');
      }
    }
  } else {
    document
      .getElementById('cont1')
      ?.setAttribute('data-aos', 'fade-down-right');
    document
      .getElementById('cont2')
      ?.setAttribute('data-aos', 'fade-down-left');
    document
      .getElementById('cont3')
      ?.setAttribute('data-aos', 'fade-down-right');
    document
      .getElementById('cont4')
      ?.setAttribute('data-aos', 'fade-down-left');
    document
      .getElementById('cont5')
      ?.setAttribute('data-aos', 'fade-down-right');
    document
      .getElementById('cont6')
      ?.setAttribute('data-aos', 'fade-down-left');
  }

  AOS.refresh();
}
window.addEventListener('load', updateAOS);
window.addEventListener('resize', updateAOS);
