document.addEventListener("DOMContentLoaded", function () {
  const userContainer = document.querySelector(".user-container");
  const userDropdown = document.querySelector(".user-dropdown");

  if (userContainer) {
    [];
    userContainer.addEventListener("click", function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle("active");

      document.querySelectorAll(".user-dropdown").forEach((dropdown) => {
        if (
          dropdown !== userDropdown &&
          dropdown.classList.contains("active")
        ) {
          dropdown.classList.remove("active");
        }
      });
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      this.setAttribute("aria-expanded", navMenu.classList.contains("active"));
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".user-dropdown")) {
      document.querySelectorAll(".user-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }

    if (!e.target.closest(".menu-toggle") && !e.target.closest(".nav-menu")) {
      if (navMenu) navMenu.classList.remove("active");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".user-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });

      if (navMenu) {
        navMenu.classList.remove("active");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  function handleResize() {
    if (window.innerWidth >= 992 && navMenu) {
      navMenu.classList.remove("active");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  window.addEventListener("resize", handleResize);
});

document.addEventListener("DOMContentLoaded", function () {
  const videoElement = document.getElementById("cyclingVideo");
  let videoSources = [];
  let currentVideoIndex = 0;
  let isChanging = false;

  // Fetch videos from backend
  async function fetchVideos() {
    try {
      const response = await fetch("http://localhost:5000/api/thumbnails");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.thumbnails && data.thumbnails.length > 0) {
        // Extract video URLs from the thumbnails array
        videoSources = data.thumbnails.map((thumb) => thumb.videoUrl);
        console.log("Fetched videos:", videoSources); // Debug log

        // Set initial video
        if (videoSources.length > 0) {
          videoElement.src = videoSources[0];
          await videoElement.load();

          // Start playing the first video
          try {
            await videoElement.play();
          } catch (err) {
            console.log("Autoplay prevented:", err);
            // Add play button for user interaction
            addPlayButton();
          }

          // Preload next video
          if (videoSources.length > 1) {
            preloadNextVideo(1);
          }
        }
      } else {
        console.warn("No thumbnails found, using fallback videos");
        useFallbackVideos();
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      useFallbackVideos();
    }
  }

  function useFallbackVideos() {
    videoSources = ["videos/fallback1.mp4", "videos/fallback2.mp4"];
    videoElement.src = videoSources[0];
    videoElement.load();
  }

  function addPlayButton() {
    const playBtn = document.createElement("button");
    playBtn.textContent = "Play Video";
    playBtn.style.position = "absolute";
    playBtn.style.zIndex = "10";
    playBtn.addEventListener("click", () => {
      videoElement.play();
      playBtn.remove();
    });
    videoElement.parentNode.appendChild(playBtn);
  }

  function preloadNextVideo(index) {
    const nextVideo = document.createElement("video");
    nextVideo.src = videoSources[index];
    nextVideo.preload = "auto";
  }

  function changeVideo() {
    if (isChanging || videoSources.length === 0) return;
    isChanging = true;

    videoElement.classList.add("fade-out");

    setTimeout(async () => {
      currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      videoElement.src = videoSources[currentVideoIndex];

      // Preload next video
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      preloadNextVideo(nextIndex);

      try {
        await videoElement.play();
        videoElement.classList.remove("fade-out");
      } catch (err) {
        console.log("Video play error:", err);
      } finally {
        isChanging = false;
      }
    }, 500);
  }

  // Initialize
  fetchVideos().then(() => {
    const rotationInterval = setInterval(changeVideo, 15000);
    videoElement.addEventListener("ended", changeVideo);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();

    if (data.success) {
      displayProducts(data.products);
    } else {
      console.error("Error fetching products:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayProducts(products) {
  const productGrid = document.getElementById("productGrid");

  if (!productGrid) return;

  productGrid.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
        <div class="product-image">
          <a href="product.html?id=${product._id}">
            <img src="${product.imageUrl}" alt="${product.name}">
          </a>
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price}</div>
        </div>
      `;

    productGrid.appendChild(productCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const brandElement = document.querySelector(".brand");
  const priceElement = document.querySelector(".price");
  const productNameElement = document.querySelector(".product-name2");
  const descriptionElement = document.querySelector(".description");
  const colorOptionsContainer = document.querySelector(".color-options2");
  const videoElement = document.getElementById("productVideo2");
  const videoSource = videoElement.querySelector("source");
  const timerElement = document.getElementById("discountTimer");

  // Product Data Variables
  let currentProduct = null;
  let selectedSizes = {
    male: null,
    female: null,
    kids: null,
  };

  // Initialize the application
  async function init() {
    await fetchProductData();
    startTimer();
  }

  // Fetch product data from backend
  async function fetchProductData() {
    try {
      const response = await fetch("http://localhost:5000/api/discounta");
      if (!response.ok) throw new Error("Network response was not ok");

      currentProduct = await response.json();
      updateProductUI();
    } catch (error) {
      console.error("Error fetching product data:", error);
      showErrorStates();
    }
  }

  // Update UI with product data
  function updateProductUI() {
    if (!currentProduct) return;

    // Update basic product info
    updateTextContent(brandElement, currentProduct.brand);
    updatePrice(priceElement, currentProduct.price);
    updateTextContent(productNameElement, currentProduct.name);
    updateTextContent(descriptionElement, currentProduct.description);

    // Update sizes
    if (currentProduct.sizes) {
      updateSizeOptions("male", currentProduct.sizes.male);
      updateSizeOptions("female", currentProduct.sizes.female);
      updateSizeOptions("kids", currentProduct.sizes.kids);
    }

    // Update colors
    updateColorOptions(currentProduct.colors);

    // Set initial video
    if (currentProduct.videos && currentProduct.colors?.length > 0) {
      const initialColor = currentProduct.colors[0];
      updateVideoSource(currentProduct.videos[initialColor]);
    }
  }

  // Helper function to update text content
  function updateTextContent(element, value) {
    if (element && value) element.textContent = value;
  }

 
  function updatePrice(element, price) {
    if (element && price) {
      const priceParts = price.toFixed(2).split(".");
      element.innerHTML = `$${priceParts[0]}<sup>${priceParts[1]}</sup>`;
    }
  }

  
  function updateSizeOptions(category, sizes) {
    const container = document.querySelector(`.${category}-sizes`);
    if (!container) return;

    container.innerHTML = "";

    if (sizes?.length > 0) {
      sizes.forEach((size) => {
        const sizeElement = document.createElement("span");
        sizeElement.className = "size-option";
        sizeElement.textContent = size;
        sizeElement.addEventListener("click", () =>
          selectSize(category, size, sizeElement)
        );
        container.appendChild(sizeElement);
      });
    } else {
      container.innerHTML = '<span class="no-sizes">No sizes available</span>';
    }
  }

  
  function selectSize(category, size, element) {
    
    document
      .querySelectorAll(`.${category}-sizes .size-option`)
      .forEach((opt) => {
        opt.classList.remove("selected");
      });

    
    if (selectedSizes[category] === size) {
      selectedSizes[category] = null;
    } else {
      selectedSizes[category] = size;
      element.classList.add("selected");
    }
  }

  
  function updateColorOptions(colors) {
    if (!colorOptionsContainer || !colors?.length) return;

    colorOptionsContainer.innerHTML = "";
    colors.forEach((color, index) => {
      const isSelected = index === 0;
      const colorOption = document.createElement("span");
      colorOption.className = `color-option ${color} ${
        isSelected ? "selected" : ""
      }`;
      colorOption.setAttribute(
        "aria-label",
        color.charAt(0).toUpperCase() + color.slice(1)
      );
      colorOption.setAttribute("data-color", color);
      colorOption.addEventListener("click", () =>
        selectColor(color, colorOption)
      );
      colorOptionsContainer.appendChild(colorOption);
    });
  }

  
  function selectColor(color, element) {
    
    document.querySelectorAll(".color-option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    
    element.classList.add("selected");

    
    if (currentProduct?.videos?.[color]) {
      updateVideoSource(currentProduct.videos[color]);
    }
  }

  
  function updateVideoSource(src) {
    if (!src) return;

    videoSource.setAttribute("src", src);
    videoElement.load();
    videoElement.play().catch((e) => console.log("Autoplay prevented:", e));
  }

  function startTimer() {
    const TIMER_KEY = "offerEndTime";
    const DEFAULT_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    const timerElement = document.getElementById("timer");

    if (!timerElement) return;

    let offerEndTime = localStorage.getItem(TIMER_KEY);

    if (!offerEndTime) {
      offerEndTime = Date.now() + DEFAULT_DURATION;
      localStorage.setItem(TIMER_KEY, offerEndTime);
    } else {
      offerEndTime = parseInt(offerEndTime, 10);
    }

    const timerInterval = setInterval(() => {
      const now = Date.now();
      const distance = offerEndTime - now;

      if (distance <= 0) {
        timerElement.textContent = "Offer expired";
        localStorage.removeItem(TIMER_KEY);
        clearInterval(timerInterval);
        return;
      }

      const hours = String(
        Math.floor((distance / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((distance / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((distance / 1000) % 60)).padStart(
        2,
        "0"
      );

      timerElement.textContent = `Offer ends in: ${hours}:${minutes}:${seconds}`;
    }, 1000);
  }

  
  function showErrorStates() {
    updateTextContent(brandElement, "Brand not available");
    updateTextContent(priceElement, "$--");
    updateTextContent(productNameElement, "Product not available");
    updateTextContent(descriptionElement, "Description not available");
    colorOptionsContainer.innerHTML =
      '<span class="error">Colors not available</span>';

    document.querySelectorAll(".size-options").forEach((container) => {
      container.innerHTML = '<span class="error">Sizes not available</span>';
    });
  }

  
  init();
});


document.querySelector('.newsletter-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const emailInput = this.querySelector('.email-input');
  const errorMessage = this.querySelector('.error-message');
  const successMessage = this.querySelector('.success-message');
  const email = emailInput.value.trim();
  
  // Reset messages and styles
  errorMessage.textContent = '';
  errorMessage.classList.remove('visible');
  successMessage.textContent = '';
  emailInput.classList.remove('error');
  
  if (!email) {
    errorMessage.textContent = 'Please enter your email address';
    errorMessage.classList.add('visible');
    emailInput.classList.add('error');
    return;
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      successMessage.textContent = data.message;
      emailInput.value = '';
    } else {
      errorMessage.textContent = data.message;
      errorMessage.classList.add('visible');
      emailInput.classList.add('error');
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.textContent = 'Failed to connect to the server. Please try again later.';
    errorMessage.classList.add('visible');
    emailInput.classList.add('error');
  }
});