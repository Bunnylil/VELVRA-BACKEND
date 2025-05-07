document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("product-grid");
  const pagination = document.getElementById("pagination");
  const clearBtn = document.querySelector(".clear-btn");

  // Filter elements
  const sortOptions = document.querySelectorAll('input[name="sort"]');
  const genderFilters = document.querySelectorAll('input[name="gender"]');
  const sportFilters = document.querySelectorAll('input[name="sport"]');
  const colorFilters = document.querySelectorAll('input[name="color"]');
  const brandFilters = document.querySelectorAll('input[name="brand"]');
  const sizeButtons = document.querySelectorAll(".size-btn");
  const minPriceInput = document.querySelector('input[name="minPrice"]');
  const maxPriceInput = document.querySelector('input[name="maxPrice"]');
  const priceOkBtn = document.querySelector(".ok-btn");

  // Filter state
  let currentFilters = {
    sort: null,
    genders: [],
    sports: [],
    colors: [],
    brands: [],
    sizes: [],
    minPrice: null,
    maxPrice: null,
  };

  // Pagination state
  const productsPerPage = 12;
  let currentPage = 1;
  let allProducts = [];

  // Initialize with all filter sections collapsed
  function initFilterSections() {
    document.querySelectorAll(".filter-options").forEach((section) => {
      section.style.display = "none";
    });
    document.querySelectorAll(".toggle-icon").forEach((icon) => {
      icon.textContent = "+";
    });
  }

  // Fetch products from backend
  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:5000/api/men/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      allProducts = await response.json();
      renderProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      productGrid.innerHTML = '<div class="no-results">Error loading products. Please try again later.</div>';
    }
  }

  // Initialize
  initFilterSections();
  fetchProducts();
  setupEventListeners();

  function setupEventListeners() {
    // Sort options
    sortOptions.forEach((option) => {
      option.addEventListener("change", (e) => {
        currentFilters.sort = e.target.value;
        applyFilters();
      });
    });

    // Gender filters
    genderFilters.forEach((filter) => {
      filter.addEventListener("change", (e) => {
        if (e.target.checked) {
          currentFilters.genders.push(e.target.value);
        } else {
          currentFilters.genders = currentFilters.genders.filter(
            (g) => g !== e.target.value
          );
        }
        applyFilters();
      });
    });

    // Sport filters
    sportFilters.forEach((filter) => {
      filter.addEventListener("change", (e) => {
        if (e.target.checked) {
          currentFilters.sports.push(e.target.value);
        } else {
          currentFilters.sports = currentFilters.sports.filter(
            (s) => s !== e.target.value
          );
        }
        applyFilters();
      });
    });

    // Color filters
    colorFilters.forEach((filter) => {
      filter.addEventListener("change", (e) => {
        if (e.target.checked) {
          currentFilters.colors.push(e.target.value);
        } else {
          currentFilters.colors = currentFilters.colors.filter(
            (c) => c !== e.target.value
          );
        }
        applyFilters();
      });
    });

    // Brand filters
    brandFilters.forEach((filter) => {
      filter.addEventListener("change", (e) => {
        if (e.target.checked) {
          currentFilters.brands.push(e.target.value);
        } else {
          currentFilters.brands = currentFilters.brands.filter(
            (b) => b !== e.target.value
          );
        }
        applyFilters();
      });
    });

    // Size filters
    sizeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const size = parseInt(e.target.dataset.size);
        if (e.target.classList.contains("active")) {
          e.target.classList.remove("active");
          currentFilters.sizes = currentFilters.sizes.filter((s) => s !== size);
        } else {
          e.target.classList.add("active");
          currentFilters.sizes.push(size);
        }
        applyFilters();
      });
    });

    // Price filter
    priceOkBtn.addEventListener("click", () => {
      currentFilters.minPrice = minPriceInput.value
        ? parseInt(minPriceInput.value)
        : null;
      currentFilters.maxPrice = maxPriceInput.value
        ? parseInt(maxPriceInput.value)
        : null;
      applyFilters();
    });

    // Clear all filters
    clearBtn.addEventListener("click", clearAllFilters);

    // Filter section toggles
    document.querySelectorAll(".filter-header").forEach((header) => {
      header.addEventListener("click", function () {
        const options = this.nextElementSibling;
        const icon = this.querySelector(".toggle-icon");

        if (options.style.display === "none" || !options.style.display) {
          options.style.display = "block";
          icon.textContent = "-";
          this.setAttribute("aria-expanded", "true");
        } else {
          options.style.display = "none";
          icon.textContent = "+";
          this.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  async function applyFilters() {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (currentFilters.sort) params.append('sort', currentFilters.sort);
      if (currentFilters.genders.length) params.append('genders', currentFilters.genders.join(','));
      if (currentFilters.sports.length) params.append('sports', currentFilters.sports.join(','));
      if (currentFilters.colors.length) params.append('colors', currentFilters.colors.join(','));
      if (currentFilters.brands.length) params.append('brands', currentFilters.brands.join(','));
      if (currentFilters.minPrice !== null) params.append('minPrice', currentFilters.minPrice);
      if (currentFilters.maxPrice !== null) params.append('maxPrice', currentFilters.maxPrice);
      
      // Reset to page 1 when filters change
      currentPage = 1;
      
      const response = await fetch(`http://localhost:5000/api/men/products/filter?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const filteredProducts = await response.json();
      
      // Apply size filter client-side since it's more complex with MongoDB
      let finalProducts = [...filteredProducts];
      if (currentFilters.sizes.length > 0) {
        finalProducts = finalProducts.filter((product) =>
          product.sizes.some((s) => currentFilters.sizes.includes(s))
        );
      }
      
      renderProducts(finalProducts);
    } catch (error) {
      console.error('Error applying filters:', error);
      productGrid.innerHTML = '<div class="no-results">Error applying filters. Please try again.</div>';
    }
  }

  function clearAllFilters() {
    // Reset filter state
    currentFilters = {
      sort: null,
      genders: [],
      sports: [],
      colors: [],
      brands: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
    };

    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Uncheck all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });

    // Clear size selections
    sizeButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Clear price inputs
    minPriceInput.value = "";
    maxPriceInput.value = "";

    // Reset to original products
    fetchProducts();
  }

  function renderProducts(productsToRender) {
    // Calculate pagination
    const totalPages = Math.ceil(productsToRender.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = productsToRender.slice(startIndex, endIndex);

    // Clear existing products
    productGrid.innerHTML = "";

    // Render products
    if (paginatedProducts.length === 0) {
      productGrid.innerHTML =
        '<div class="no-results">No products match your filters.</div>';
    } else {
      paginatedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        
        // Prepare product data for the product page
        const productData = {
          id: product.id,
          name: product.name,
          brand: product.brand,
          model: product.model,
          price: product.price,
          colors: product.colors,
          sizes: product.sizes,
          videosets: product.videosets,
          details: product.details,
          rating: product.rating,
          trending: product.trending,
          new: product.new,
          image: product.image
        };

        productCard.innerHTML = `
          <div class="product-image">
            <a href="product.html" class="product-link" data-product='${JSON.stringify(productData)}'>
              <img src="${product.image}" alt="${product.name}" loading="lazy">
            </a>
          </div>
          <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price}</div>
          </div>
        `;
        productGrid.appendChild(productCard);
      });

      // Add click handlers to product links
      document.querySelectorAll('.product-link').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const productData = JSON.parse(this.getAttribute('data-product'));
          localStorage.setItem('currentProduct', JSON.stringify(productData));
          window.location.href = this.getAttribute('href');
        });
      });
    }

    // Render pagination
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous button
    const prevButton = document.createElement("button");
    prevButton.className = "pagination-btn";
    prevButton.innerHTML = "&laquo;";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts(allProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    pagination.appendChild(prevButton);

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      const firstPageButton = document.createElement("button");
      firstPageButton.className = "pagination-btn";
      firstPageButton.textContent = "1";
      firstPageButton.addEventListener("click", () => {
        currentPage = 1;
        renderProducts(allProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      pagination.appendChild(firstPageButton);

      if (startPage > 2) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "...";
        pagination.appendChild(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.className = `pagination-btn ${
        currentPage === i ? "active" : ""
      }`;
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderProducts(allProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      pagination.appendChild(pageButton);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "...";
        pagination.appendChild(ellipsis);
      }

      const lastPageButton = document.createElement("button");
      lastPageButton.className = "pagination-btn";
      lastPageButton.textContent = totalPages;
      lastPageButton.addEventListener("click", () => {
        currentPage = totalPages;
        renderProducts(allProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      pagination.appendChild(lastPageButton);
    }

    // Next button
    const nextButton = document.createElement("button");
    nextButton.className = "pagination-btn";
    nextButton.innerHTML = "&raquo;";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts(allProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    pagination.appendChild(nextButton);
  }
});