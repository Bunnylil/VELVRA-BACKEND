document.addEventListener('DOMContentLoaded', function() {
    
    const productData = JSON.parse(localStorage.getItem('currentProduct'));
    
    if (productData) {
        
        initializeProductPage(productData);
    } else {
        
        initializeDefaultProduct();
    }

    
    initializeColorSelection();
    initializeSizeSelection();
    initializeCartAndFavorites();
    initializeExpandableDetails();
    initializeThumbnailClickHandlers();
});

function initializeProductPage(product) {
    
    document.querySelector('.art-number').textContent = `ART ${product.id.toString().padStart(3, '0')}`;
    document.querySelector('.product-title').textContent = product.name;
    
    
    const firstColor = product.colors[0];
    const firstColorName = firstColor.charAt(0).toUpperCase() + firstColor.slice(1);
    document.querySelector('.style-name').innerHTML = 
        `${product.brand} ${product.model} <span class="style-price">$${product.price}</span>`;
    document.querySelector('.total-price').textContent = `$ ${product.price}.-`;

    
    const detailsContent = document.querySelector('#product-details .details-content');
    detailsContent.innerHTML = '';
    product.details.forEach(detail => {
        detailsContent.innerHTML += `<p>${detail}</p>`;
    });

    // Initialize size options
    const sizeOptionsContainer = document.querySelector('.size-options');
    sizeOptionsContainer.innerHTML = '';
    product.sizes.forEach(size => {
        sizeOptionsContainer.innerHTML += `
            <div class="size-option" data-size="${size}">${size}</div>
        `;
    });

    // Initialize color options
    const colorOptionsContainer = document.querySelector('.color-options');
    colorOptionsContainer.innerHTML = '';
    
    product.colors.forEach((color, index) => {
        const colorName = color.charAt(0).toUpperCase() + color.slice(1);
        colorOptionsContainer.innerHTML += `
            <div class="color-option ${color} ${index === 0 ? 'selected' : ''}" 
                 data-color="${color}" 
                 data-video-set="${index + 1}" 
                 title="${colorName}">
                <div class="color-swatch"></div>
            </div>
        `;
    });

    
    if (product.videosets && product.videosets[firstColor]) {
        updateVideoThumbnails(product.videosets[firstColor]);
    } else {
        // Fallback to default videos if none specified
        const defaultVideos = [
            'videos/default1.mp4',
            'videos/default2.mp4',
            'videos/default3.mp4',
            'videos/default4.mp4',
            'videos/default5.mp4',
            'videos/default6.mp4'
        ];
        updateVideoThumbnails(defaultVideos);
    }

    
    initializeSizeSelection();
}

function initializeDefaultProduct() {
    
    const defaultProduct = {
        id: '001',
        name: 'Classic Derby',
        brand: 'Vibram',
        model: 'Gamble',
        price: 95,
        colors: ['black', 'brown'],
        sizes: [38, 39, 40, 41, 42],
        videosets: {
            'black': [
                'videos/vid1 (1).mp4',
                'videos/vid1 (2).mp4',
                'videos/vid1 (3).mp4',
                'videos/vid1 (4).mp4',
                'videos/vid1 (5).mp4',
                'videos/vid1 (6).mp4'
            ],
            'brown': [
                'videos/vid2 (1).mp4',
                'videos/vid2 (2).mp4',
                'videos/vid2 (3).mp4',
                'videos/vid2 (4).mp4',
                'videos/vid2 (5).mp4',
                'videos/vid2 (6).mp4'
            ]
        },
        details: [
            "Premium leather upper for durability and style",
            "Vibram outsole for superior traction",
            "Padded collar for ankle support",
            "Breathable mesh lining",
            "Handcrafted with attention to detail",
            "Available in multiple colors"
        ]
    };

    initializeProductPage(defaultProduct);
}

function updateVideoThumbnails(videos) {
    const thumbnailsContainer = document.querySelector('.video-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    videos.forEach((video, index) => {
        thumbnailsContainer.innerHTML += `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                 data-angle="${index + 1}" 
                 data-video-set="1">
                <video autoplay loop muted playsinline>
                    <source src="${video}" type="video/mp4">
                </video>
            </div>
        `;
    });
    
    
    if (videos.length > 0) {
        const mainVideo = document.getElementById('mainVideo');
        mainVideo.innerHTML = `<source src="${videos[0]}" type="video/mp4">`;
        mainVideo.load();
        mainVideo.play().catch(e => console.log('Autoplay prevented:', e));
    }

    
    updatePaginationDots(videos.length);
}

function updatePaginationDots(count) {
    const dotsContainer = document.querySelector('.pagination-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        dotsContainer.innerHTML += `
            <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `;
    }
}

function initializeThumbnailClickHandlers() {
    document.addEventListener('click', function(e) {
        
        if (e.target.closest('.thumbnail')) {
            const thumbnail = e.target.closest('.thumbnail');
            const videoSrc = thumbnail.querySelector('video source').src;
            const mainVideo = document.getElementById('mainVideo');
            
           
            document.querySelector('.thumbnail.active').classList.remove('active');
            thumbnail.classList.add('active');
            
            
            mainVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
            mainVideo.load();
            mainVideo.play().catch(e => console.log('Autoplay prevented:', e));
            
           
            const index = Array.from(document.querySelectorAll('.thumbnail')).indexOf(thumbnail);
            updateActiveDot(index);
        }
        
        
        if (e.target.classList.contains('dot')) {
            const index = parseInt(e.target.dataset.index);
            const thumbnails = document.querySelectorAll('.thumbnail');
            
            if (thumbnails[index]) {
                
                thumbnails[index].click();
            }
        }
    });
}

function updateActiveDot(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function initializeColorSelection() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.color-option')) {
            const colorOption = e.target.closest('.color-option');
            const selectedColor = colorOption.dataset.color;
            
           
            document.querySelector('.color-option.selected').classList.remove('selected');
            colorOption.classList.add('selected');
            
            
            const productData = JSON.parse(localStorage.getItem('currentProduct')) || {};
            
            
            if (productData.videosets && productData.videosets[selectedColor]) {
                updateVideoThumbnails(productData.videosets[selectedColor]);
            }
            
            
            const colorName = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);
            document.querySelector('.product-title').textContent = `${productData.name} ${colorName}`;
            
            
            const priceAdjustments = {
                'black': 0,
                'brown': 10,
                'tan': 15,
                'navy': 20,
                'blue': 25,
                'pink': 30
            };
            const adjustedPrice = (productData.price || 95) + (priceAdjustments[selectedColor] || 0);
            
            document.querySelector('.style-name').innerHTML = 
                `${productData.brand} ${productData.model} ${colorName} <span class="style-price">$${adjustedPrice}</span>`;
            document.querySelector('.total-price').textContent = `$ ${adjustedPrice}.-`;
        }
    });
}

function initializeSizeSelection() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('size-option')) {
            
            document.querySelectorAll('.size-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            
            e.target.classList.add('selected');
        }
    });
    
    // Select the middle size by default (or first if only one)
    const sizeOptions = document.querySelectorAll('.size-option');
    if (sizeOptions.length > 0) {
        const defaultSizeIndex = Math.floor(sizeOptions.length / 2);
        sizeOptions[defaultSizeIndex].classList.add('selected');
    }
}

// In the initializeCartAndFavorites function, modify the addToCartBtn click handler:
function initializeCartAndFavorites() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const favoriteBtn = document.querySelector('.favorite-btn');
    
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productData = JSON.parse(localStorage.getItem('currentProduct')) || {};
        const selectedColor = document.querySelector('.color-option.selected').dataset.color;
        const selectedSize = document.querySelector('.size-option.selected').textContent;
        const productName = document.querySelector('.product-title').textContent;
        const priceText = document.querySelector('.style-price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const mainVideo = document.getElementById('mainVideo').querySelector('source').src;
        
        // Create cart item object
        const cartItem = {
            name: productName,
            color: selectedColor,
            size: selectedSize,
            price: price,
            quantity: 1,
            video: mainVideo, // Store the video URL
            id: productData.id || Date.now() // Use product ID or timestamp as fallback
        };
        
        // Get existing cart items or initialize empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => 
            item.name === cartItem.name && 
            item.color === cartItem.color && 
            item.size === cartItem.size);
        
        if (existingItemIndex >= 0) {
            // Update quantity if item exists
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cartItems.push(cartItem);
        }
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Visual feedback
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 500);
        
        alert(`${productName} (${selectedColor}, size ${selectedSize}) added to cart!`);
    });
    
    // ... rest of the favorite button code ...

    
    favoriteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productData = JSON.parse(localStorage.getItem('currentProduct')) || {};
        const productName = productData.name || 'Product';
        
        
        const isFavorite = this.classList.contains('favorited');
        
        if (isFavorite) {
            this.classList.remove('favorited');
            this.innerHTML = '<i class="far fa-heart"></i>';
            console.log('Removed from favorites:', productName);
        } else {
            this.classList.add('favorited');
            this.innerHTML = '<i class="fas fa-heart"></i>';
            console.log('Added to favorites:', productName);
        }
    });
}

function initializeExpandableDetails() {
    document.querySelectorAll('.details-header').forEach(header => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        
       
        content.style.display = 'none';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-right');
        
        header.addEventListener('click', function() {
            const isHidden = content.style.display === 'none';
            
            
            content.style.display = isHidden ? 'block' : 'none';
            
           
            if (isHidden) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
            }
        });
    });
    

    const firstTabPanel = document.querySelector('.tab-panel');
    if (firstTabPanel) {
        firstTabPanel.classList.add('active');
    }
}