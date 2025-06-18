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

// Scroll-triggered animations
const showText = document.getElementById('home');
const tiltCard = document.getElementById('tiltContainer');
const aboutText = document.getElementById('infoBox');
const aboutImg = document.getElementById('aboutImg');
const contactLeft = document.getElementById('contactLeft');
const contactForm = document.getElementById('contact-form');

const experienceElementsLarge = [
  {
    el: document.getElementById('cont1'),
    min: 48 * 16,
    max: 115 * 16,
    class: 'active1',
  },
  {
    el: document.getElementById('cont2'),
    min: 55 * 16,
    max: 122 * 16,
    class: 'active2',
  },
  {
    el: document.getElementById('cont3'),
    min: 62 * 16,
    max: 129 * 16,
    class: 'active3',
  },
  {
    el: document.getElementById('cont4'),
    min: 69 * 16,
    max: 136 * 16,
    class: 'active4',
  },
  {
    el: document.getElementById('cont5'),
    min: 76 * 16,
    max: 143 * 16,
    class: 'active5',
  },
  {
    el: document.getElementById('cont6'),
    min: 83 * 16,
    max: 150 * 16,
    class: 'active6',
  },
];

const experienceElementsSmall = [
  {
    el: document.getElementById('cont1'),
    min: 58 * 16,
    max: 150 * 16,
    class: 'active1',
  },
  {
    el: document.getElementById('cont2'),
    min: 66 * 16,
    max: 158 * 16,
    class: 'active2',
  },
  {
    el: document.getElementById('cont3'),
    min: 74 * 16,
    max: 166 * 16,
    class: 'active3',
  },
  {
    el: document.getElementById('cont4'),
    min: 82 * 16,
    max: 174 * 16,
    class: 'active4',
  },
  {
    el: document.getElementById('cont5'),
    min: 90 * 16,
    max: 182 * 16,
    class: 'active5',
  },
  {
    el: document.getElementById('cont6'),
    min: 98 * 16,
    max: 190 * 16,
    class: 'active6',
  },
];

const contactTriggersLarge = [
  { el: contactLeft, min: 115 * 16, max: 185 * 16, class: 'active1' },
  { el: contactForm, min: 115 * 16, max: 185 * 16, class: 'active2' },
];

const contactTriggersSmall = [
  { el: contactForm, min: 120 * 16, max: 280 * 16, class: 'active2' },
];

const textTriggerAtLarge = 27 * 16;
const cardTriggerAtLarge = 27 * 16;
const aboutMinTriggerLarge = 15 * 16;
const aboutMaxTriggerLarge = 65 * 16;

const textTriggerAtSmall = 40 * 16;
const cardTriggerAtSmall = 40 * 16;
const aboutMinTriggerSmall = 10 * 16;
const aboutMaxTriggerSmall = 125 * 16;

window.addEventListener('load', () => {
  showText.classList.add('active1');
  tiltCard.classList.add('active2');
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const isSmallScreen = window.innerWidth <= 870;

  if (!isSmallScreen) {
    showText.classList.toggle('active1', scrollY < textTriggerAtLarge);
    tiltCard.classList.toggle('active2', scrollY < cardTriggerAtLarge);

    const isInAboutRange =
      scrollY >= aboutMinTriggerLarge && scrollY <= aboutMaxTriggerLarge;
    aboutText.classList.toggle('active1', isInAboutRange);
    aboutImg.classList.toggle('active2', isInAboutRange);

    experienceElementsLarge.forEach(({ el, min, max, class: className }) => {
      el.classList.toggle(className, scrollY >= min && scrollY < max);
    });

    contactTriggersLarge.forEach(({ el, min, max, class: className }) => {
      el.classList.toggle(className, scrollY >= min && scrollY < max);
    });
  } else {
    showText.classList.toggle('active1', scrollY < textTriggerAtSmall);
    tiltCard.classList.toggle('active2', scrollY < cardTriggerAtSmall);

    const isInAboutRange =
      scrollY >= aboutMinTriggerSmall && scrollY <= aboutMaxTriggerSmall;
    aboutText.classList.toggle('active1', isInAboutRange);
    aboutImg.classList.toggle('active2', isInAboutRange);

    experienceElementsSmall.forEach(({ el, min, max, class: className }) => {
      el.classList.toggle(className, scrollY >= min && scrollY < max);
    });

    contactTriggersSmall.forEach(({ el, min, max, class: className }) => {
      el.classList.toggle(className, scrollY >= min && scrollY < max);
    });
  }
});

window.addEventListener('resize', () => {
  window.dispatchEvent(new Event('scroll'));
});

// Change Theme
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeBtn.querySelector('span.sun').classList.toggle('active');
  themeBtn.querySelector('span.moon').classList.toggle('active');
});
