// Select all navigation links
const allLinks = document.querySelectorAll('.links a');

// Mobile Menu Toggle
const toggleBtn = document.querySelector('.header-area .toggle-menu');
const linksContainer = document.querySelector('.header-area .links-container');

toggleBtn.onclick = () => {
  toggleBtn.classList.toggle('active');
  linksContainer.classList.toggle('active');
};

// Smooth scroll and handle nav link click
allLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove 'active' from all links and add to the clicked one
    allLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    // Smooth scroll to section
    const targetSelector = link.dataset.section || link.getAttribute('href');
    const target = document.querySelector(targetSelector);
    if (target) {
      const yOffset = -80;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Close mobile menu
    toggleBtn.classList.remove('active');
    linksContainer.classList.remove('active');
  });
});

// Scroll To Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('active', window.scrollY > 100);
});

// Support Button
const supportBtn = document.getElementById('supportUs');
const supportBtn2 = document.getElementById('supportUs2');

window.addEventListener('scroll', () => {
  supportBtn.classList.toggle('active', window.scrollY > 100);
  supportBtn2.classList.toggle('active', window.scrollY > 100);
});

supportBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.open(
    'https://paypal.me/hamzaelbeialy',
    'paypalDonate',
    'width=600,height=700,scrollbars=yes',
  );
});
supportBtn2.addEventListener('click', (e) => {
  e.preventDefault();
  window.open(
    'https://paypal.me/hamzaelbeialy',
    'paypalDonate',
    'width=600,height=700,scrollbars=yes',
  );
});

// Tilt Card Effect
const card = document.getElementById('tiltCard');
const container = document.getElementById('tiltContainer');

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

// Scroll-triggered animations using IntersectionObserver
const observeFade = (el, className) => {
  if (!el) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    { threshold: 0.15 },
  );
  observer.observe(el);
};

// Observe key sections
observeFade(document.getElementById('home'), 'active1');
observeFade(document.getElementById('tiltContainer'), 'active2');
observeFade(document.getElementById('infoBox'), 'active1');
observeFade(document.getElementById('aboutImg'), 'active2');
observeFade(document.getElementById('contactLeft'), 'active1');
observeFade(document.getElementById('contact-form'), 'active2');

// Observe experience elements
['cont1', 'cont2', 'cont3', 'cont4', 'cont5', 'cont6'].forEach((id, index) => {
  observeFade(document.getElementById(id), `active${index + 1}`);
});

// Observe work section elements with delay
const workSection = document.getElementById('work');
const work1 = document.getElementById('work1');
const work2 = document.getElementById('work2');
const work3 = document.getElementById('work3');

if (workSection && work1 && work2 && work3) {
  const workObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          work1.classList.add('active');
          setTimeout(() => work2.classList.add('active'), 500);
          setTimeout(() => work3.classList.add('active'), 1000);
        } else if (entry.intersectionRatio === 0) {
          work1.classList.remove('active');
          work2.classList.remove('active');
          work3.classList.remove('active');
        }
      });
    },
    {
      threshold: [0, 0.01],
    },
  );
  workObserver.observe(workSection);
}

// Change Theme
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeBtn.querySelector('span.sun').classList.toggle('active');
  themeBtn.querySelector('span.moon').classList.toggle('active');
});
