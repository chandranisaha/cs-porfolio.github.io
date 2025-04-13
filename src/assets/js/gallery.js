
// Gallery functionality

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initGalleryAnimation();
});

// Initialize gallery carousel (kept for reference if needed)
const initGallery = () => {
  const track = document.querySelector('.gallery-track');
  if (!track) return; // Exit if carousel doesn't exist
  
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const indicators = document.querySelector('.gallery-indicators');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let isTransitioning = false;
  
  // Create indicator dots
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('gallery-indicator');
    if (index === 0) indicator.classList.add('active');
    
    indicator.addEventListener('click', () => {
      if (isTransitioning || currentIndex === index) return;
      goToSlide(index);
    });
    
    indicators.appendChild(indicator);
  });
  
  const allIndicators = document.querySelectorAll('.gallery-indicator');
  
  // Function to go to a specific slide
  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentIndex = index;
    
    // Update track position with smooth transition
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    allIndicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });
    
    // Reset transition flag after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  };
  
  // Event listeners for prev/next buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      
      const newIndex = (currentIndex + 1) % slides.length;
      goToSlide(newIndex);
    });
  }
  
  // Auto-advance slides
  let slideInterval = setInterval(() => {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  }, 5000);
  
  // Pause auto-advance on hover
  if (track) {
    track.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        const newIndex = (currentIndex + 1) % slides.length;
        goToSlide(newIndex);
      }, 5000);
    });
    
    // Handle swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left
        const newIndex = (currentIndex + 1) % slides.length;
        goToSlide(newIndex);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
      }
    };
  }
};

// Initialize animations for the gallery grid
const initGalleryAnimation = () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return;
  
  // Add reveal animations with a staggered delay
  galleryItems.forEach((item, index) => {
    const delay = index * 100; // 100ms delay between each item
    
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      // Force reflow
      void item.offsetWidth;
      
      item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, delay);
  });
};

// Export functions for use in other modules
export { initGallery, initGalleryAnimation };
