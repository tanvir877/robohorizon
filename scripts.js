document.addEventListener('DOMContentLoaded', () => {
  // Counter Animation
  const counters = document.querySelectorAll('.counter-value');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });

  // Scroll Animation
  const statCards = document.querySelectorAll('.stats-section .stat-card');
  const productCards = document.querySelectorAll('.featured-products-section .product-card');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    statCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < windowHeight * 0.8) {
        card.classList.add('visible');
      }
    });

    productCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < windowHeight * 0.8) {
        card.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load
});