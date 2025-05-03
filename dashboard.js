document.addEventListener('DOMContentLoaded', function() {
    
    const userContainer = document.querySelector('.user-container');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userContainer) {[]
      userContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
        
        
        document.querySelectorAll('.user-dropdown').forEach(dropdown => {
          if (dropdown !== userDropdown && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
          }
        });
      });
    }
  
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
      });
    }
  
    
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.user-dropdown')) {
        document.querySelectorAll('.user-dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
      
      if (!e.target.closest('.menu-toggle') && !e.target.closest('.nav-menu')) {
        if (navMenu) navMenu.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.user-dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
        
        if (navMenu) {
          navMenu.classList.remove('active');
          if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  
    
    function handleResize() {
      
      if (window.innerWidth >= 992 && navMenu) {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  
    window.addEventListener('resize', handleResize);
  });