/* ================================================================
   RUSS Cold Pressed Juice — Script
   ================================================================ */

/* ----------------------------------------------------------------
   Header: add shadow on scroll
   ---------------------------------------------------------------- */
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ----------------------------------------------------------------
   FAQ accordion
   ---------------------------------------------------------------- */
(function () {
  document.querySelectorAll('.faq-item__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ----------------------------------------------------------------
   Scroll-triggered reveal animation
   ---------------------------------------------------------------- */
(function () {
  // Elements to animate — add staggered delay classes to siblings
  const SELECTORS = [
    '.benefit-card',
    '.step',
    '.testimonial-card',
    '.payment-card',
    '.faq-item',
    '.product__details',
    '.product__orb-wrap',
    '.quality__card',
    '.delivery__card',
    '.about__body',
    '.about__inner .section-header',
  ];

  // Tag elements and add stagger delays within grid/flex parents
  document.querySelectorAll(SELECTORS.join(', ')).forEach(function (el, idx) {
    el.classList.add('reveal');
    // Stagger siblings inside the same parent
    const siblings = Array.from(el.parentElement.children).filter(function (c) {
      return c.classList.contains('reveal');
    });
    const position = siblings.indexOf(el);
    if (position === 1) el.classList.add('reveal-delay-1');
    if (position === 2) el.classList.add('reveal-delay-2');
    if (position === 3) el.classList.add('reveal-delay-3');
    if (position >= 4)  el.classList.add('reveal-delay-4');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();
