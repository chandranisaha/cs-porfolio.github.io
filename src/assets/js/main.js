
// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', () => {
  // Initialize custom cursor
  initCursor();
  
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Initialize scroll animations
  initScrollAnimations();
});

// Custom cursor functionality
const initCursor = () => {
  const cursor = document.getElementById('cursor');
  const links = document.querySelectorAll('a, button');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
  });
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.style.width = '15px';
      cursor.style.height = '15px';
    });
  });
};

// Mobile menu toggle
const initMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    navLinksItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
};

// Scroll animations using Intersection Observer
const initScrollAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
};

// Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});
