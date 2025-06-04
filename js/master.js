// Select all navigation links
const allLinks = document.querySelectorAll('.links a');

// Smooth scroll to section on click
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();

      // Scroll to section defined in data-section attribute or href
      const targetSelector =
        e.target.dataset.section || e.target.getAttribute('href');
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
scrollToSomewhere(allLinks);

// Handle the 'active' class for navigation links
function handleActive(ev) {
  // Remove 'active' class from all siblings
  ev.target.parentElement.querySelectorAll('.active').forEach((element) => {
    element.classList.remove('active');
  });
  // Add active to clicked link
  ev.target.classList.add('active');
}

allLinks.forEach((link) => link.addEventListener('click', handleActive));

// Scroll To Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
});

// Support Button

const supportBtn = document.getElementById('supportUs');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    supportBtn.classList.add('active');
  } else {
    supportBtn.classList.remove('active');
  }
});

supportBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // Your PayPal.me link (replace YOUR_PAYPAL_ME_LINK)
  const url = 'https://paypal.me/hamzaelbeialy';

  // Open a small popup window
  window.open(url, 'paypalDonate', 'width=600,height=700,scrollbars=yes');
});

// Tilt Card Effect on Mouse Move
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

// Your scroll-triggered animations for experience/contact sections
const showText = document.getElementById('home');
const tiltCard = document.getElementById('tiltContainer');
const aboutText = document.getElementById('infoBox');
const aboutImg = document.getElementById('aboutImg');
const contactLeft = document.getElementById('contactLeft');
const contactForm = document.getElementById('contact-form');

const experienceElementsLarge = [
  {
    el: document.getElementById('cont1'),
    min: 55 * 16,
    max: 110 * 16,
    class: 'active1',
  },
  {
    el: document.getElementById('cont2'),
    min: 63 * 16,
    max: 122 * 16,
    class: 'active2',
  },
  {
    el: document.getElementById('cont3'),
    min: 69 * 16,
    max: 128 * 16,
    class: 'active3',
  },
  {
    el: document.getElementById('cont4'),
    min: 75 * 16,
    max: 137 * 16,
    class: 'active4',
  },
  {
    el: document.getElementById('cont5'),
    min: 83 * 16,
    max: 145 * 16,
    class: 'active5',
  },
  {
    el: document.getElementById('cont6'),
    min: 91 * 16,
    max: 155 * 16,
    class: 'active6',
  },
];

const experienceElementsSmall = [
  {
    el: document.getElementById('cont1'),
    min: 80 * 16,
    max: 140 * 16,
    class: 'active1',
  },
  {
    el: document.getElementById('cont2'),
    min: 90 * 16,
    max: 150 * 16,
    class: 'active2',
  },
  {
    el: document.getElementById('cont3'),
    min: 102 * 16,
    max: 162 * 16,
    class: 'active3',
  },
  {
    el: document.getElementById('cont4'),
    min: 110 * 16,
    max: 172 * 16,
    class: 'active4',
  },
  {
    el: document.getElementById('cont5'),
    min: 122 * 16,
    max: 182 * 16,
    class: 'active5',
  },
  {
    el: document.getElementById('cont6'),
    min: 130 * 16,
    max: 195 * 16,
    class: 'active6',
  },
];

const contactTriggersLarge = [
  { el: contactLeft, min: 115 * 16, max: 185 * 16, class: 'active1' },
  { el: contactForm, min: 115 * 16, max: 185 * 16, class: 'active2' },
];

const contactTriggersSmall = [
  //{ el: contactLeft, min: 145 * 16, max: 250 * 16, class: 'active1' },
  { el: contactForm, min: 164 * 16, max: 280 * 16, class: 'active2' },
];

const textTriggerAtLarge = 23 * 16;
const cardTriggerAtLarge = 23 * 16;
const aboutMinTriggerLarge = 18 * 16;
const aboutMaxTriggerLarge = 55 * 16;

const textTriggerAtSmall = 40 * 16;
const cardTriggerAtSmall = 40 * 16;
const aboutMinTriggerSmall = 13 * 16;
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
      const isInRange = scrollY >= min && scrollY < max;
      el.classList.toggle(className, isInRange);
    });

    contactTriggersLarge.forEach(({ el, min, max, class: className }) => {
      const isInRange = scrollY >= min && scrollY < max;
      el.classList.toggle(className, isInRange);
    });
  } else {
    showText.classList.toggle('active1', scrollY < textTriggerAtSmall);
    tiltCard.classList.toggle('active2', scrollY < cardTriggerAtSmall);

    const isInAboutRange =
      scrollY >= aboutMinTriggerSmall && scrollY <= aboutMaxTriggerSmall;
    aboutText.classList.toggle('active1', isInAboutRange);
    aboutImg.classList.toggle('active2', isInAboutRange);

    experienceElementsSmall.forEach(({ el, min, max, class: className }) => {
      const isInRange = scrollY >= min && scrollY < max;
      el.classList.toggle(className, isInRange);
    });

    contactTriggersSmall.forEach(({ el, min, max, class: className }) => {
      const isInRange = scrollY >= min && scrollY < max;
      el.classList.toggle(className, isInRange);
    });
  }
});

window.addEventListener('resize', () => {
  window.dispatchEvent(new Event('scroll'));
});

// Mobile Menu Toggle
const toggleBtn = document.querySelector('.header-area .toggle-menu');
const linksContainer = document.querySelector('.header-area .links-container');

toggleBtn.onclick = () => {
  toggleBtn.classList.toggle('active');
  linksContainer.classList.toggle('active');
};

allLinks.forEach((link) => {
  link.addEventListener('click', () => {
    toggleBtn.classList.remove('active');
    linksContainer.classList.remove('active');
  });
});

// Change Theme
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  themeBtn.querySelector('span.sun').classList.toggle('active');
  themeBtn.querySelector('span.moon').classList.toggle('active');
});
