document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / speed;
      let current = 0;
      const updateCount = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCount, 1);
        } else {
          counter.textContent = target;
        }
      };
      updateCount();
    });
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.team-card, .testimonial-card').forEach(item => {
      observer.observe(item);
    });
    
    // Journey Section Animations
    // Animate section header on load
    const sectionHeader = document.querySelector('.section-header');
    setTimeout(() => {
      sectionHeader.classList.add('animate-in');
    }, 300);
    
    // Enhanced animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Function to check if an element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    }
    
    // Function to handle animation on scroll
    function handleScrollAnimation() {
      timelineItems.forEach((item, index) => {
        if (isElementInViewport(item)) {
          // Add staggered delay based on index
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 150); // 150ms delay between each item
        }
      });
    }
    
    // Initial check on load
    setTimeout(handleScrollAnimation, 500);
    
    // Check on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
          handleScrollAnimation();
          scrollTimeout = null;
        }, 50);
      }
    });
    
    // Add hover effects for timeline items
    timelineItems.forEach(item => {
      // Mouse enter effect
      item.addEventListener('mouseenter', function() {
        const dot = this.querySelector('.timeline-dot');
        
        // Enhance dot on hover
        if (dot) {
          dot.style.transform = 'translateY(-50%) scale(1.2)';
          dot.style.boxShadow = '0 0 15px 5px rgba(0, 255, 255, 0.5)';
          
          // For purple dots
          if (this.classList.contains('animate-in') && this.querySelector('.timeline-dot').style.backgroundColor === 'rgb(157, 78, 221)') {
            dot.style.boxShadow = '0 0 15px 5px rgba(157, 78, 221, 0.5)';
          }
        }
      });
      
      // Mouse leave effect
      item.addEventListener('mouseleave', function() {
        const dot = this.querySelector('.timeline-dot');
        
        // Reset dot
        if (dot) {
          dot.style.transform = 'translateY(-50%) scale(1)';
          dot.style.boxShadow = '';
        }
      });
    });
    
    // Optional: Add click interaction for mobile
    timelineItems.forEach(item => {
      item.addEventListener('click', function() {
        // Toggle focus class for mobile interactions
        timelineItems.forEach(i => {
          if (i !== item) i.classList.remove('focused');
        });
        this.classList.toggle('focused');
      });
    });
  });