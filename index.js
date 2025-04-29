window.addEventListener('scroll', function () {
    const parallax = document.querySelector('.parallax-bg');
    const scrolled = window.scrollY;
    
    // Adjust the rate here (e.g., 0.4 for subtle parallax)
    parallax.style.transform = `translateY(${scrolled * 0.4}px)`;
  });