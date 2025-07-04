// ========== Navigation Scroll and Mobile Menu ==========
const allLinks = document.querySelectorAll('.links a');
const toggleBtn = document.querySelector('.header-area .toggle-menu');
const linksContainer = document.querySelector('.header-area .links-container');

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
  supportBtn.classList.toggle('active', visible);
  supportBtn2.classList.toggle('active', visible);
});

[supportBtn, supportBtn2].forEach((btn) => {
  btn.addEventListener('click', (e) => {
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

// Key sections
observeOnce(document.getElementById('home'), 'active1');
observeOnce(document.getElementById('tiltContainer'), 'active2');
observeOnce(document.getElementById('infoBox'), 'active1');
observeOnce(document.getElementById('aboutImg'), 'active2');
observeOnce(document.getElementById('contactLeft'), 'active1');
observeOnce(document.getElementById('contact-form'), 'active2');

// Experience cards
['cont1', 'cont2', 'cont3', 'cont4', 'cont5', 'cont6'].forEach((id, index) => {
  observeOnce(document.getElementById(id), `active${index + 1}`);
});

// ========== Work Section with Delay ==========
const workSection = document.getElementById('work');
const work1 = document.getElementById('work1');
const work2 = document.getElementById('work2');
const work3 = document.getElementById('work3');

if (workSection && work1 && work2 && work3) {
  const workObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          work1.classList.add('active');
          setTimeout(() => work2.classList.add('active'), 500);
          setTimeout(() => work3.classList.add('active'), 1000);
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    {
      threshold: 0.15,
    },
  );
  workObserver.observe(workSection);
}

// ========== Theme Toggle ==========
const themeBtn = document.querySelector('.theme-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeBtn.querySelector('span.sun').classList.toggle('active');
  themeBtn.querySelector('span.moon').classList.toggle('active');
});
