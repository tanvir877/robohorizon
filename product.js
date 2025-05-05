document.addEventListener('DOMContentLoaded', function() {
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
    } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
    }
    });
    backToTopButton.addEventListener('click', function() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
    });
    });
    document.addEventListener('DOMContentLoaded', function() {
    // Custom checkbox functionality
    const checkboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
    // Additional functionality can be added here
    });
    });
    });
    document.addEventListener('DOMContentLoaded', function() {
    // Toggle switch functionality
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchEl => {
    switchEl.addEventListener('change', function() {
    // Additional functionality can be added here
    });
    });
    });