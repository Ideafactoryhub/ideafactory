import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

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

  /* ---------- Tilt Card ---------- */
  const card = document.getElementById('tiltWrapper');
  const container = document.getElementById('tiltWrapper');
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

  /* ---------- Intersection Observe Once Helper ---------- */
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

  [
    { id: 'home', className: 'active1' },
    { id: 'tiltWrapper', className: 'active2' },
    { id: 'infoBox', className: 'active1' },
    { id: 'aboutImg', className: 'active2' },
    { id: 'reviews', className: 'active1' },
  ].forEach(({ id, className }) =>
    observeOnce(document.getElementById(id), className),
  );

  ['cont1', 'cont2', 'cont3', 'cont4', 'cont5', 'cont6'].forEach((id, i) => {
    observeOnce(document.getElementById(id), `active${i + 1}`);
  });

  /* ---------- Work Section Delayed Reveal ---------- */
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

  /* =========================================================
   * Theme Toggle Button
   * ========================================================= */
  const themeBtn = document.querySelector('.theme-btn');
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.querySelector('span.sun')?.classList.toggle('active');
    themeBtn.querySelector('span.moon')?.classList.toggle('active');
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

      reviews.forEach((rev, index) => {
        const card = document.createElement('div');
        card.className = 'review-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
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
   * "Your Idea" Form (Firestore + Firebase Storage ONLY)
   * ========================================================= */
  const ideaForm = document.getElementById('contact-form');

  // if (ideaForm) {
  //   ideaForm.addEventListener('submit', async (e) => {
  //     e.preventDefault();

  //     const name = ideaForm.name?.value.trim();
  //     const email = ideaForm.email?.value.trim();
  //     const category = ideaForm.category?.value;
  //     const message = ideaForm.message?.value.trim();
  //     const imageFile = ideaForm.image?.files[0];

  //     if (!name || !email || !category || !message) {
  //       alert('Please fill all required fields.');
  //       return;
  //     }

  //     try {
  //       let imageUrl = '';
  //       if (imageFile) {
  //         try {
  //           const storageRef = ref(
  //             storage,
  //             `ideas/${Date.now()}_${imageFile.name}`,
  //           );
  //           const snapshot = await uploadBytes(storageRef, imageFile);
  //           imageUrl = await getDownloadURL(snapshot.ref);
  //         } catch (uploadErr) {
  //           console.error('🔥 Image upload failed:', uploadErr);
  //           alert('Image upload failed. Check the file format and try again.');
  //           return;
  //         }

  //         await addDoc(collection(db, 'ideas'), {
  //           name,
  //           email,
  //           category,
  //           message,
  //           imageUrl,
  //           timestamp: serverTimestamp(),
  //         });

  //         ideaForm.reset();
  //         alert('✅ Idea submitted successfully!');
  //       }
  //     } catch (err) {
  //       console.error('❌ Error submitting idea:', err);
  //       alert('Submission failed. Try again later.');
  //     }
  //   });
  // }

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

      // Optional: validate email format
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

      // Sort by most recent first
      ideas.sort((a, b) => b.timestamp - a.timestamp);

      ideas.forEach((idea, index) => {
        const card = document.createElement('div');
        card.className = 'idea-card fade-in';
        card.style.animationDelay = `${index * 0.15}s`;
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

// your idea btns
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

  // Call once on load
  updateIdeaScrollButtonsVisibility();

  // Optional: check periodically or after idea rendering
  setInterval(updateIdeaScrollButtonsVisibility, 1500);
});
const contactSection = document.querySelector('.contact');
if (contactSection) {
  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        contactSection.classList.add('fade-up');
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(contactSection);
}
// animation for typing effect
const textArray = [
  'Turning ideas into reality.',
  'Empowering innovation and creativity.',
  'Transforming ideas into projects.',
  'Connecting innovators for change.',
  'Building a creative community.',
];

let i = 0; // Current text index
let j = 0; // Character index
let isDeleting = false;
let speed = 100; // Typing speed

function typeEffect() {
  const typingElement = document.getElementById('typing');
  const currentText = textArray[i];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, j++);
    if (j > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800); // Pause before deleting
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
