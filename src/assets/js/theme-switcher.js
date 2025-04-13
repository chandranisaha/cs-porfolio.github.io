
// Theme switcher functionality

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
});

const initThemeSwitcher = () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for user preference in localStorage or system preference
  const preferredTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply initial theme
  setTheme(preferredTheme);
  
  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    setTheme(newTheme);
    // Save user preference to localStorage
    localStorage.setItem('theme', newTheme);
  });
  
  // Function to set theme
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
  }
};

// Export the initThemeSwitcher function for use in other modules
export { initThemeSwitcher };
