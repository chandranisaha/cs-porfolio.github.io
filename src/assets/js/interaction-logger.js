
// Interaction logger - tracks all clicks and views

document.addEventListener('DOMContentLoaded', () => {
  initInteractionLogger();
});

const initInteractionLogger = () => {
  // Track clicks
  document.addEventListener('click', (e) => {
    const target = e.target;
    let targetType = target.tagName.toLowerCase();
    
    // Get more specific target type
    if (target.classList.contains('btn-primary')) {
      targetType = 'button (primary)';
    } else if (target.closest('button')) {
      targetType = 'button';
    } else if (target.closest('a')) {
      targetType = 'link';
    } else if (target.closest('img')) {
      targetType = 'image';
    } else if (target.closest('input')) {
      targetType = 'input';
    }
    
    logInteraction('click', targetType);
  });
  
  // Track views using IntersectionObserver
  const sections = document.querySelectorAll('section');
  
  const viewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'unnamed-section';
          logInteraction('view', `section#${sectionId}`);
          
          // Unobserve after logging once
          viewObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 } // At least 50% of the section must be visible
  );
  
  sections.forEach((section) => {
    viewObserver.observe(section);
  });
  
  // Log images when they come into view
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imgAlt = entry.target.alt || 'unnamed-image';
          logInteraction('view', `image: ${imgAlt}`);
          
          // Unobserve after logging once
          imageObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  images.forEach((img) => {
    imageObserver.observe(img);
  });
};

// Function to log interactions to console
const logInteraction = (eventType, targetType) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} | ${eventType} | ${targetType}`);
};

// Export the initInteractionLogger function for use in other modules
export { initInteractionLogger };
