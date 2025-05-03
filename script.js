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

  document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('cyclingVideo');
    let videoSources = [];
    let currentVideoIndex = 0;
    let isChanging = false;
  
    // Fetch videos from backend
    async function fetchVideos() {
      try {
        const response = await fetch('http://localhost:5000/api/thumbnails');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.thumbnails && data.thumbnails.length > 0) {
          // Extract video URLs from the thumbnails array
          videoSources = data.thumbnails.map(thumb => thumb.videoUrl);
          console.log('Fetched videos:', videoSources); // Debug log
          
          // Set initial video
          if (videoSources.length > 0) {
            videoElement.src = videoSources[0];
            await videoElement.load();
            
            // Start playing the first video
            try {
              await videoElement.play();
            } catch (err) {
              console.log('Autoplay prevented:', err);
              // Add play button for user interaction
              addPlayButton();
            }
            
            // Preload next video
            if (videoSources.length > 1) {
              preloadNextVideo(1);
            }
          }
        } else {
          console.warn('No thumbnails found, using fallback videos');
          useFallbackVideos();
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        useFallbackVideos();
      }
    }
  
    function useFallbackVideos() {
      videoSources = [
        "videos/fallback1.mp4",
        "videos/fallback2.mp4"
      ];
      videoElement.src = videoSources[0];
      videoElement.load();
    }
  
    function addPlayButton() {
      const playBtn = document.createElement('button');
      playBtn.textContent = 'Play Video';
      playBtn.style.position = 'absolute';
      playBtn.style.zIndex = '10';
      playBtn.addEventListener('click', () => {
        videoElement.play();
        playBtn.remove();
      });
      videoElement.parentNode.appendChild(playBtn);
    }
  
    function preloadNextVideo(index) {
      const nextVideo = document.createElement('video');
      nextVideo.src = videoSources[index];
      nextVideo.preload = 'auto';
    }
  
    function changeVideo() {
      if (isChanging || videoSources.length === 0) return;
      isChanging = true;
      
      videoElement.classList.add('fade-out');
      
      setTimeout(async () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        videoElement.src = videoSources[currentVideoIndex];
        
        // Preload next video
        const nextIndex = (currentVideoIndex + 1) % videoSources.length;
        preloadNextVideo(nextIndex);
        
        try {
          await videoElement.play();
          videoElement.classList.remove('fade-out');
        } catch (err) {
          console.log('Video play error:', err);
        } finally {
          isChanging = false;
        }
      }, 500);
    }
  
    // Initialize
    fetchVideos().then(() => {
      const rotationInterval = setInterval(changeVideo, 15000);
      videoElement.addEventListener('ended', changeVideo);
    });
  });