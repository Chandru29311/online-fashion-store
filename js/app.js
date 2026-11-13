/**
 * Stackly - Online Fashion & Clothing Boutique
 * Core Application Logic & API Integration
 * Pure Vanilla JavaScript (ES6+), Fetch API with Async/Await, LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Application State & Storage
  // =========================================================================
  const AppState = {
    // API & Product Data
    allFashionProducts: [],
    filteredProducts: [],
    categories: [],
    
    // Catalog Filtering & Sorting State
    currentCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    displayLimit: 8,
    pageSize: 8,

    // Shopping Cart State (LocalStorage backed)
    cart: JSON.parse(localStorage.getItem('stackly_cart')) || [],
    
    // Wishlist State (LocalStorage backed)
    wishlist: JSON.parse(localStorage.getItem('stackly_wishlist')) || [],

    // Orders History State (LocalStorage backed)
    orders: JSON.parse(localStorage.getItem('stackly_orders')) || [],

    // Coupon & Discount State
    appliedCoupon: JSON.parse(localStorage.getItem('stackly_coupon')) || null,

    // Active Modal Product
    selectedProduct: null,
    modalQuantity: 1,

    // Testimonial Carousel
    testimonialIndex: 0,
    testimonialTimer: null,

    // Loading & Error flags
    isLoading: false,
    apiError: false
  };

  // Supported boutique fashion categories from DummyJSON
  const FASHION_CATEGORY_SLUGS = [
    'womens-dresses',
    'womens-shoes',
    'womens-bags',
    'womens-jewellery',
    'womens-watches',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'tops',
    'sunglasses',
    'fragrances',
    'beauty',
    'skin-care'
  ];

  // =========================================================================
  // 2. DOM Elements Cache
  // =========================================================================
  const elements = {
    // Preloader
    preloader: document.getElementById('preloader'),

    // Navigation & Header
    siteHeader: document.getElementById('siteHeader'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    navLinks: document.getElementById('navLinks'),
    headerSearchInput: document.getElementById('headerSearchInput'),
    cartTriggerBtn: document.getElementById('cartTriggerBtn'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    wishlistTriggerBtn: document.getElementById('wishlistTriggerBtn'),
    wishlistCountBadge: document.getElementById('wishlistCountBadge'),

    // Hero Section
    heroSearchInput: document.getElementById('heroSearchInput'),
    heroSearchBtn: document.getElementById('heroSearchBtn'),
    heroTagsContainer: document.getElementById('heroTagsContainer'),

    // Categories Section
    categoriesGrid: document.getElementById('categoriesGrid'),

    // New Arrivals Section
    newArrivalsGrid: document.getElementById('newArrivalsGrid'),

    // Trending & Main Catalog Section
    catalogCategoryTabs: document.getElementById('catalogCategoryTabs'),
    productSearchInput: document.getElementById('productSearchInput'),
    productSortSelect: document.getElementById('productSortSelect'),
    clearFiltersBtn: document.getElementById('clearFiltersBtn'),
    productsCountLabel: document.getElementById('productsCountLabel'),
    trendingProductsGrid: document.getElementById('trendingProductsGrid'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    catalogLoading: document.getElementById('catalogLoading'),
    catalogError: document.getElementById('catalogError'),
    retryFetchBtn: document.getElementById('retryFetchBtn'),

    // Best Sellers Section
    bestSellersGrid: document.getElementById('bestSellersGrid'),

    // Special Offers Section
    offersGrid: document.getElementById('offersGrid'),

    // Testimonials Section
    testimonialTrack: document.getElementById('testimonialTrack'),
    prevTestimonialBtn: document.getElementById('prevTestimonialBtn'),
    nextTestimonialBtn: document.getElementById('nextTestimonialBtn'),
    testimonialDots: document.getElementById('testimonialDots'),

    // Newsletter Section
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail'),
    newsletterFeedback: document.getElementById('newsletterFeedback'),

    // Product Details Modal
    modalBackdrop: document.getElementById('modalBackdrop'),
    productModal: document.getElementById('productModal'),
    closeProductModalBtn: document.getElementById('closeProductModalBtn'),
    modalMainImg: document.getElementById('modalMainImg'),
    modalThumbnailsList: document.getElementById('modalThumbnailsList'),
    modalCategoryBadge: document.getElementById('modalCategoryBadge'),
    modalStockBadge: document.getElementById('modalStockBadge'),
    modalTitle: document.getElementById('modalTitle'),
    modalStars: document.getElementById('modalStars'),
    modalRatingScore: document.getElementById('modalRatingScore'),
    modalReviewsCount: document.getElementById('modalReviewsCount'),
    modalCurrentPrice: document.getElementById('modalCurrentPrice'),
    modalOriginalPrice: document.getElementById('modalOriginalPrice'),
    modalDiscountBadge: document.getElementById('modalDiscountBadge'),
    modalDesc: document.getElementById('modalDesc'),
    modalSku: document.getElementById('modalSku'),
    modalShipping: document.getElementById('modalShipping'),
    modalWarranty: document.getElementById('modalWarranty'),
    modalReturnPolicy: document.getElementById('modalReturnPolicy'),
    modalReviewsList: document.getElementById('modalReviewsList'),
    modalQtyVal: document.getElementById('modalQtyVal'),
    modalQtyDec: document.getElementById('modalQtyDec'),
    modalQtyInc: document.getElementById('modalQtyInc'),
    modalAddToCartBtn: document.getElementById('modalAddToCartBtn'),
    modalWishlistBtn: document.getElementById('modalWishlistBtn'),

    // Cart Drawer
    cartDrawerBackdrop: document.getElementById('cartDrawerBackdrop'),
    cartDrawer: document.getElementById('cartDrawer'),
    closeCartDrawerBtn: document.getElementById('closeCartDrawerBtn'),
    cartDrawerItems: document.getElementById('cartDrawerItems'),
    cartDrawerHeaderCount: document.getElementById('cartDrawerHeaderCount'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartShipping: document.getElementById('cartShipping'),
    cartDiscountRow: document.getElementById('cartDiscountRow'),
    cartDiscountAmount: document.getElementById('cartDiscountAmount'),
    cartGrandTotal: document.getElementById('cartGrandTotal'),
    cartCouponInput: document.getElementById('cartCouponInput'),
    cartApplyCouponBtn: document.getElementById('cartApplyCouponBtn'),
    cartCouponFeedback: document.getElementById('cartCouponFeedback'),
    cartCheckoutBtn: document.getElementById('cartCheckoutBtn'),
    clearCartBtn: document.getElementById('clearCartBtn'),

    // Wishlist Drawer
    wishlistDrawerBackdrop: document.getElementById('wishlistDrawerBackdrop'),
    wishlistDrawer: document.getElementById('wishlistDrawer'),
    closeWishlistDrawerBtn: document.getElementById('closeWishlistDrawerBtn'),
    wishlistDrawerItems: document.getElementById('wishlistDrawerItems'),
    wishlistDrawerHeaderCount: document.getElementById('wishlistDrawerHeaderCount'),
    clearWishlistBtn: document.getElementById('clearWishlistBtn'),

    // Checkout Modal
    checkoutModal: document.getElementById('checkoutModal'),
    closeCheckoutModalBtn: document.getElementById('closeCheckoutModalBtn'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutSummaryItems: document.getElementById('checkoutSummaryItems'),
    checkoutSubtotal: document.getElementById('checkoutSubtotal'),
    checkoutDiscount: document.getElementById('checkoutDiscount'),
    checkoutShipping: document.getElementById('checkoutShipping'),
    checkoutTotal: document.getElementById('checkoutTotal'),

    // Order Confirmation Modal
    orderSuccessModal: document.getElementById('orderSuccessModal'),
    closeOrderSuccessModalBtn: document.getElementById('closeOrderSuccessModalBtn'),
    orderIdText: document.getElementById('orderIdText'),
    orderDateText: document.getElementById('orderDateText'),
    orderDeliveryText: document.getElementById('orderDeliveryText'),
    orderCustomerName: document.getElementById('orderCustomerName'),
    orderTotalPaid: document.getElementById('orderTotalPaid'),
    orderItemsSummaryList: document.getElementById('orderItemsSummaryList'),
    continueShoppingBtn: document.getElementById('continueShoppingBtn'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // =========================================================================
  // 3. Lenis Smooth Scroll & AOS Animations Setup
  // =========================================================================
  let lenisInstance = null;

  function lockPageScroll() {
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (lenisInstance && typeof lenisInstance.stop === 'function') {
      lenisInstance.stop();
    }
  }

  function unlockPageScroll() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (lenisInstance && typeof lenisInstance.start === 'function') {
      lenisInstance.start();
    }
  }

  function initScrollAndAnimations() {
    // Initialize Lenis if available
    if (typeof Lenis !== 'undefined') {
      try {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
          smoothTouch: false
        });
        lenisInstance = lenis;

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis initialization notice:', err);
      }
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 750,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
    }

    // Hide preloader smoothly
    setTimeout(() => {
      if (elements.preloader) {
        elements.preloader.classList.add('fade-out');
        setTimeout(() => {
          elements.preloader.style.display = 'none';
        }, 500);
      }
    }, 450);
  }

  // =========================================================================
  // 4. Toast Notification System
  // =========================================================================
  function showToast(message, type = 'info', icon = null) {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} slide-in`;
    
    let defaultIcon = 'fa-solid fa-circle-info';
    if (type === 'success') defaultIcon = 'fa-solid fa-circle-check';
    if (type === 'warning') defaultIcon = 'fa-solid fa-triangle-exclamation';
    if (type === 'error') defaultIcon = 'fa-solid fa-circle-xmark';
    if (type === 'wishlist') defaultIcon = 'fa-solid fa-heart';
    if (type === 'cart') defaultIcon = 'fa-solid fa-bag-shopping';

    toast.innerHTML = `
      <div class="toast-icon">
        <i class="${icon || defaultIcon}"></i>
      </div>
      <div class="toast-body">
        <span class="toast-msg">${message}</span>
      </div>
      <button class="toast-close" aria-label="Close notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    });

    elements.toastContainer.appendChild(toast);

    // Auto dismiss after 3.8 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }
    }, 3800);
  }

  // =========================================================================
  // 5. API Integration: Fetch DummyJSON Products
  // =========================================================================
  async function fetchDummyJSONProducts() {
    AppState.isLoading = true;
    AppState.apiError = false;
    renderCatalogLoadingState(true);

    try {
      // DummyJSON Products API
      // Fetching all products to filter the comprehensive boutique collection
      const response = await fetch('https://dummyjson.com/products?limit=0', {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API responded with HTTP status ${response.status}`);
      }

      const data = await response.json();
      const rawProducts = data.products || [];

      // Filter products strictly to boutique fashion, beauty & accessories categories
      let fashionList = rawProducts.filter(item => 
        FASHION_CATEGORY_SLUGS.includes(item.category)
      );

      // If category list was somehow empty, include general items or fallback
      if (fashionList.length < 15) {
        fashionList = rawProducts.slice(0, 30);
      }

      // Add boutique enhancement tags and luxury brand attribution
      AppState.allFashionProducts = fashionList.map(item => ({
        ...item,
        boutiqueBrand: item.brand || 'Stackly Atelier',
        stock: item.stock || 25,
        rating: item.rating || 4.7
      }));

      AppState.apiError = false;
    } catch (error) {
      console.warn('API Fetch notice: using luxury sample data store.', error);
      // Seamlessly fall back to FASHION_DATA fallback products so the boutique works flawlessly!
      if (window.FASHION_DATA && window.FASHION_DATA.fallbackProducts) {
        AppState.allFashionProducts = [...window.FASHION_DATA.fallbackProducts];
      }
      AppState.apiError = true;
    } finally {
      AppState.isLoading = false;
      renderCatalogLoadingState(false);
      
      // Update catalog and dynamic sections
      applyFiltersAndSort();
      renderNewArrivals();
      renderBestSellers();
      if (typeof AOS !== 'undefined') AOS.refresh();
    }
  }

  function renderCatalogLoadingState(isLoading) {
    if (elements.catalogLoading) {
      elements.catalogLoading.style.display = isLoading ? 'grid' : 'none';
      if (isLoading && elements.catalogLoading.children.length === 0) {
        let skeletons = '';
        for (let i = 0; i < 8; i++) {
          skeletons += Components.skeletonCard();
        }
        elements.catalogLoading.innerHTML = skeletons;
      }
    }
    if (elements.trendingProductsGrid) {
      elements.trendingProductsGrid.style.display = isLoading ? 'none' : 'grid';
    }
    if (elements.catalogError) {
      elements.catalogError.style.display = (AppState.apiError && AppState.allFashionProducts.length === 0) ? 'block' : 'none';
    }
  }

  // =========================================================================
  // 6. Section Renderers: Categories, Offers, Testimonials
  // =========================================================================
  function renderFeaturedCategories() {
    if (!elements.categoriesGrid || !window.FASHION_DATA) return;
    const cats = window.FASHION_DATA.categories || [];
    elements.categoriesGrid.innerHTML = cats.map(c => Components.categoryCard(c)).join('');

    // Attach click events on category cards
    elements.categoriesGrid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const slug = card.getAttribute('data-category-slug');
        setCategoryFilter(slug);
        
        // Smooth scroll to catalog
        const catalogSec = document.getElementById('catalogSection');
        if (catalogSec) {
          catalogSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function renderSpecialOffers() {
    if (!elements.offersGrid || !window.FASHION_DATA) return;
    const offers = window.FASHION_DATA.offers || [];
    elements.offersGrid.innerHTML = offers.map(o => Components.offerCard(o)).join('');

    // Attach click event for copy promo buttons
    elements.offersGrid.querySelectorAll('.copy-promo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.getAttribute('data-coupon');
        copyCouponToClipboard(code);
      });
    });
  }

  function copyCouponToClipboard(code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Promo code "${code}" copied! It has also been auto-applied to your shopping cart.`, 'success');
        applyCouponCode(code, false);
      }).catch(() => {
        fallbackCopyText(code);
      });
    } else {
      fallbackCopyText(code);
    }
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Promo code "${text}" copied & applied to cart!`, 'success');
      applyCouponCode(text, false);
    } catch (err) {
      showToast(`Coupon code is ${text}. Enter it at checkout!`, 'info');
    }
    document.body.removeChild(tempInput);
  }

  function renderTestimonials() {
    if (!elements.testimonialTrack || !window.FASHION_DATA) return;
    const list = window.FASHION_DATA.testimonials || [];
    elements.testimonialTrack.innerHTML = list.map(t => Components.testimonialCard(t)).join('');

    // Render dot indicators
    if (elements.testimonialDots) {
      elements.testimonialDots.innerHTML = list.map((_, i) => `
        <button type="button" class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
      `).join('');

      elements.testimonialDots.querySelectorAll('.slider-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          goToTestimonial(idx);
        });
      });
    }

    startTestimonialAutoplay();
  }

  function goToTestimonial(index) {
    const list = window.FASHION_DATA ? window.FASHION_DATA.testimonials : [];
    if (!list.length) return;

    AppState.testimonialIndex = (index + list.length) % list.length;
    const offset = AppState.testimonialIndex * -100;
    if (elements.testimonialTrack) {
      elements.testimonialTrack.style.transform = `translateX(${offset}%)`;
    }

    if (elements.testimonialDots) {
      elements.testimonialDots.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === AppState.testimonialIndex);
      });
    }
  }

  function startTestimonialAutoplay() {
    if (AppState.testimonialTimer) clearInterval(AppState.testimonialTimer);
    AppState.testimonialTimer = setInterval(() => {
      goToTestimonial(AppState.testimonialIndex + 1);
    }, 6000);
  }

  // =========================================================================
  // 7. Dynamic Catalog: Filtering, Search, Sorting & Pagination
  // =========================================================================
  function applyFiltersAndSort() {
    let result = [...AppState.allFashionProducts];

    // Category Filter
    if (AppState.currentCategory !== 'all') {
      if (AppState.currentCategory === 'women') {
        result = result.filter(p => ['womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches', 'tops'].includes(p.category));
      } else if (AppState.currentCategory === 'men') {
        result = result.filter(p => ['mens-shirts', 'mens-shoes', 'mens-watches'].includes(p.category));
      } else if (AppState.currentCategory === 'beauty') {
        result = result.filter(p => ['fragrances', 'beauty', 'skin-care'].includes(p.category));
      } else if (AppState.currentCategory === 'accessories') {
        result = result.filter(p => ['womens-bags', 'sunglasses', 'womens-jewellery', 'womens-watches', 'mens-watches'].includes(p.category));
      } else {
        result = result.filter(p => p.category === AppState.currentCategory);
      }
    }

    // Search Query Filter
    if (AppState.searchQuery && AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (AppState.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (AppState.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (AppState.sortBy === 'rating-high') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (AppState.sortBy === 'discount-high') {
      result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    AppState.filteredProducts = result;
    renderCatalogProducts();
  }

  function renderCatalogProducts() {
    if (!elements.trendingProductsGrid) return;

    const visibleItems = AppState.filteredProducts.slice(0, AppState.displayLimit);

    if (visibleItems.length === 0) {
      elements.trendingProductsGrid.innerHTML = `
        <div class="empty-results-box" style="grid-column: 1 / -1; text-align:center; padding:3rem 1.5rem;">
          <div style="font-size:3rem; color:var(--text-muted); margin-bottom:1rem;">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 style="font-size:1.4rem; margin-bottom:0.5rem; font-family:var(--font-serif);">No runway pieces found</h3>
          <p style="color:var(--text-muted); margin-bottom:1.5rem;">We couldn't find matching boutique styles for "${AppState.searchQuery || AppState.currentCategory}".</p>
          <button type="button" class="btn btn-secondary btn-sm" id="resetCatalogSearchBtn">
            Reset Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('resetCatalogSearchBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
      }
    } else {
      elements.trendingProductsGrid.innerHTML = visibleItems.map(p => {
        const isWish = isItemWishlisted(p.id);
        return Components.productCard(p, isWish);
      }).join('');
    }

    // Update count label
    if (elements.productsCountLabel) {
      elements.productsCountLabel.textContent = `Showing ${visibleItems.length} of ${AppState.filteredProducts.length} Designer Pieces`;
    }

    // Update Load More Button visibility
    if (elements.loadMoreContainer && elements.loadMoreBtn) {
      if (AppState.displayLimit >= AppState.filteredProducts.length) {
        elements.loadMoreContainer.style.display = 'none';
      } else {
        elements.loadMoreContainer.style.display = 'block';
        const remaining = AppState.filteredProducts.length - AppState.displayLimit;
        elements.loadMoreBtn.innerHTML = `<span>Load More Styles (${remaining} remaining)</span> <i class="fa-solid fa-arrow-down"></i>`;
      }
    }

    // Refresh animations
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  function renderNewArrivals() {
    if (!elements.newArrivalsGrid) return;
    // Curate newest / distinct fashion arrivals
    const list = AppState.allFashionProducts.slice(0, 4);
    elements.newArrivalsGrid.innerHTML = list.map(p => {
      const isWish = isItemWishlisted(p.id);
      return Components.productCard(p, isWish);
    }).join('');
  }

  function renderBestSellers() {
    if (!elements.bestSellersGrid) return;
    // Filter top rated items
    const topRated = [...AppState.allFashionProducts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);

    elements.bestSellersGrid.innerHTML = topRated.map(p => {
      const isWish = isItemWishlisted(p.id);
      return Components.productCard(p, isWish);
    }).join('');
  }

  function setCategoryFilter(slug) {
    AppState.currentCategory = slug;
    AppState.displayLimit = AppState.pageSize;

    // Update active tab UI
    if (elements.catalogCategoryTabs) {
      elements.catalogCategoryTabs.querySelectorAll('.filter-tab').forEach(tab => {
        const cat = tab.getAttribute('data-category');
        tab.classList.toggle('active', cat === slug);
      });
    }

    applyFiltersAndSort();
  }

  function resetAllFilters() {
    AppState.currentCategory = 'all';
    AppState.searchQuery = '';
    AppState.sortBy = 'featured';
    AppState.displayLimit = AppState.pageSize;

    if (elements.productSearchInput) elements.productSearchInput.value = '';
    if (elements.headerSearchInput) elements.headerSearchInput.value = '';
    if (elements.heroSearchInput) elements.heroSearchInput.value = '';
    if (elements.productSortSelect) elements.productSortSelect.value = 'featured';

    if (elements.catalogCategoryTabs) {
      elements.catalogCategoryTabs.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === 'all');
      });
    }

    applyFiltersAndSort();
  }

  // =========================================================================
  // 8. Product Details Modal
  // =========================================================================
  function openProductModal(productId) {
    const product = AppState.allFashionProducts.find(p => p.id === Number(productId));
    if (!product) return;

    AppState.selectedProduct = product;
    AppState.modalQuantity = 1;

    // Populate Modal Details
    const origPrice = Components.calcOriginalPrice(product.price, product.discountPercentage);
    const images = (product.images && product.images.length > 0) 
      ? product.images 
      : [product.thumbnail || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80'];

    if (elements.modalMainImg) {
      elements.modalMainImg.src = images[0];
      elements.modalMainImg.alt = product.title;
    }

    // Thumbnails
    if (elements.modalThumbnailsList) {
      elements.modalThumbnailsList.innerHTML = images.map((img, i) => `
        <button type="button" class="modal-thumb-btn ${i === 0 ? 'active' : ''}" data-src="${img}" aria-label="View photo ${i + 1}">
          <img src="${img}" alt="Thumbnail ${i + 1}">
        </button>
      `).join('');

      elements.modalThumbnailsList.querySelectorAll('.modal-thumb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.modalThumbnailsList.querySelectorAll('.modal-thumb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const newSrc = btn.getAttribute('data-src');
          if (elements.modalMainImg) elements.modalMainImg.src = newSrc;
        });
      });
    }

    if (elements.modalTitle) elements.modalTitle.textContent = product.title;
    if (elements.modalCategoryBadge) elements.modalCategoryBadge.textContent = Components.formatCategory(product.category);
    if (elements.modalStockBadge) {
      const isAvailable = (product.stock > 0);
      elements.modalStockBadge.className = `modal-stock-badge ${isAvailable ? 'in-stock' : 'out-of-stock'}`;
      elements.modalStockBadge.innerHTML = isAvailable 
        ? `<i class="fa-solid fa-circle-check"></i> In Stock (${product.stock} items available)` 
        : `<i class="fa-solid fa-circle-xmark"></i> Out of Stock`;
    }

    if (elements.modalStars) elements.modalStars.innerHTML = Components.renderStars(product.rating || 4.7);
    if (elements.modalRatingScore) elements.modalRatingScore.textContent = Number(product.rating || 4.7).toFixed(1);
    if (elements.modalReviewsCount) {
      const count = product.reviews ? product.reviews.length : 18;
      elements.modalReviewsCount.textContent = `(${count} verified client reviews)`;
    }

    if (elements.modalCurrentPrice) elements.modalCurrentPrice.textContent = `$${Number(product.price).toFixed(2)}`;
    if (elements.modalOriginalPrice) {
      if (origPrice) {
        elements.modalOriginalPrice.textContent = `$${origPrice}`;
        elements.modalOriginalPrice.style.display = 'inline';
      } else {
        elements.modalOriginalPrice.style.display = 'none';
      }
    }
    if (elements.modalDiscountBadge) {
      if (product.discountPercentage > 5) {
        elements.modalDiscountBadge.textContent = `Save ${Math.round(product.discountPercentage)}%`;
        elements.modalDiscountBadge.style.display = 'inline-block';
      } else {
        elements.modalDiscountBadge.style.display = 'none';
      }
    }

    if (elements.modalDesc) elements.modalDesc.textContent = product.description || 'Exclusive boutique piece crafted from premium materials.';
    if (elements.modalSku) elements.modalSku.textContent = product.sku || `STK-${product.id}`;
    if (elements.modalShipping) elements.modalShipping.textContent = product.shippingInformation || 'Express shipping in 2-3 business days';
    if (elements.modalWarranty) elements.modalWarranty.textContent = product.warrantyInformation || 'Stackly 30-day fit & luxury authenticity guarantee';
    if (elements.modalReturnPolicy) elements.modalReturnPolicy.textContent = product.returnPolicy || '30 days complimentary returns';

    // Quantity Stepper reset
    if (elements.modalQtyVal) elements.modalQtyVal.textContent = '1';

    // Wishlist Button state inside modal
    if (elements.modalWishlistBtn) {
      const isWish = isItemWishlisted(product.id);
      elements.modalWishlistBtn.innerHTML = `
        <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        <span>${isWish ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
      `;
      elements.modalWishlistBtn.classList.toggle('active', isWish);
    }

    // Customer Reviews List
    if (elements.modalReviewsList) {
      const reviews = product.reviews && product.reviews.length > 0 
        ? product.reviews 
        : [
            { reviewerName: "Claire Dupont", rating: 5, comment: "Breathtaking quality! Looks stunning in person.", date: "2026-08-15" },
            { reviewerName: "Marcus Vance", rating: 5, comment: "Arrived in gorgeous luxury packaging. Highly recommend.", date: "2026-09-02" }
          ];

      elements.modalReviewsList.innerHTML = reviews.map(rev => `
        <div class="modal-review-item">
          <div class="review-header">
            <span class="reviewer-name"><i class="fa-solid fa-user-check"></i> ${rev.reviewerName}</span>
            <span class="review-stars">${Components.renderStars(rev.rating)}</span>
          </div>
          <p class="review-comment">"${rev.comment}"</p>
        </div>
      `).join('');
    }

    // Show modal
    if (elements.modalBackdrop && elements.productModal) {
      elements.modalBackdrop.classList.add('active');
      elements.productModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProductModal() {
    if (elements.modalBackdrop && elements.productModal) {
      elements.modalBackdrop.classList.remove('active');
      elements.productModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // =========================================================================
  // 9. Shopping Cart Functionality (LocalStorage Backed)
  // =========================================================================
  function addToCart(productId, quantity = 1) {
    const product = AppState.allFashionProducts.find(p => p.id === Number(productId));
    if (!product) return;

    const existingIndex = AppState.cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      AppState.cart[existingIndex].quantity += quantity;
    } else {
      AppState.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        category: product.category,
        quantity: quantity
      });
    }

    saveCartToStorage();
    renderCart();
    showToast(`"${product.title}" (${quantity}x) added to your shopping bag!`, 'cart');
  }

  function removeFromCart(productId) {
    const item = AppState.cart.find(i => i.id === Number(productId));
    AppState.cart = AppState.cart.filter(i => i.id !== Number(productId));
    saveCartToStorage();
    renderCart();
    if (item) {
      showToast(`Removed "${item.title}" from your bag.`, 'info');
    }
  }

  function updateCartQuantity(productId, delta) {
    const item = AppState.cart.find(i => i.id === Number(productId));
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCartToStorage();
      renderCart();
    }
  }

  function saveCartToStorage() {
    localStorage.setItem('stackly_cart', JSON.stringify(AppState.cart));
    updateCartBadges();
  }

  function updateCartBadges() {
    const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (elements.cartCountBadge) {
      elements.cartCountBadge.textContent = totalCount;
      elements.cartCountBadge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    }
    if (elements.cartDrawerHeaderCount) {
      elements.cartDrawerHeaderCount.textContent = `(${totalCount} items)`;
    }
  }

  function calculateCartTotals() {
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Free shipping if subtotal > $75, else $10 flat
    const shipping = subtotal > 75 || subtotal === 0 ? 0 : 10;
    
    // Discount Calculation
    let discount = 0;
    if (AppState.appliedCoupon && subtotal > 0) {
      if (AppState.appliedCoupon.type === 'percentage') {
        discount = (subtotal * AppState.appliedCoupon.value) / 100;
      } else if (AppState.appliedCoupon.type === 'fixed') {
        discount = Math.min(AppState.appliedCoupon.value, subtotal);
      }
    }

    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`,
      shippingNum: shipping,
      discount: discount.toFixed(2),
      total: total.toFixed(2)
    };
  }

  function renderCart() {
    updateCartBadges();

    if (!elements.cartDrawerItems) return;

    if (AppState.cart.length === 0) {
      elements.cartDrawerItems.innerHTML = `
        <div class="empty-drawer-state">
          <i class="fa-solid fa-bag-shopping" style="font-size:3.5rem; color:var(--text-light); margin-bottom:1rem;"></i>
          <h4>Your shopping bag is empty</h4>
          <p>Discover our new arrivals and runway pieces to elevate your style.</p>
          <button type="button" class="btn btn-primary btn-sm" id="emptyCartExploreBtn">
            Explore Collection
          </button>
        </div>
      `;

      const expBtn = document.getElementById('emptyCartExploreBtn');
      if (expBtn) {
        expBtn.addEventListener('click', () => {
          closeCartDrawer();
          const catSec = document.getElementById('catalogSection');
          if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      elements.cartDrawerItems.innerHTML = AppState.cart.map(item => Components.cartItemRow(item)).join('');
    }

    // Totals
    const totals = calculateCartTotals();
    if (elements.cartSubtotal) elements.cartSubtotal.textContent = `$${totals.subtotal}`;
    if (elements.cartShipping) elements.cartShipping.textContent = totals.shipping;
    if (elements.cartGrandTotal) elements.cartGrandTotal.textContent = `$${totals.total}`;

    // Discount Row
    if (elements.cartDiscountRow && elements.cartDiscountAmount) {
      if (Number(totals.discount) > 0) {
        elements.cartDiscountRow.style.display = 'flex';
        elements.cartDiscountAmount.textContent = `-$${totals.discount} (${AppState.appliedCoupon.code})`;
      } else {
        elements.cartDiscountRow.style.display = 'none';
      }
    }
  }

  function applyCouponCode(code, showToastMessage = true) {
    if (!code || code.trim() === '') {
      if (elements.cartCouponFeedback) {
        elements.cartCouponFeedback.innerHTML = `<span style="color:var(--coral);">Please enter a promo code.</span>`;
      }
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    const availableOffers = (window.FASHION_DATA && window.FASHION_DATA.offers) || [];
    
    // Add extra VIP and seasonal codes
    const couponMap = {
      'STACKLY25': { code: 'STACKLY25', type: 'percentage', value: 25, min: 60, desc: '25% Off Summer Boutique' },
      'WELCOME15': { code: 'WELCOME15', type: 'percentage', value: 15, min: 0, desc: '15% Off Welcome Gift' },
      'LUXE30': { code: 'LUXE30', type: 'percentage', value: 30, min: 100, desc: '30% Off Luxury Collection' },
      'VIP50': { code: 'VIP50', type: 'fixed', value: 50, min: 150, desc: '$50 Off Haute Couture' }
    };

    // Also match any offer from FASHION_DATA
    availableOffers.forEach(o => {
      couponMap[o.code] = { code: o.code, type: o.type, value: o.value, min: o.minPurchase || 0, desc: o.headline };
    });

    const coupon = couponMap[cleanCode];
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (coupon) {
      if (subtotal < coupon.min) {
        const msg = `Promo code "${cleanCode}" requires a minimum order of $${coupon.min}. Add $${(coupon.min - subtotal).toFixed(2)} more!`;
        if (elements.cartCouponFeedback) {
          elements.cartCouponFeedback.innerHTML = `<span style="color:var(--warm);">${msg}</span>`;
        }
        if (showToastMessage) showToast(msg, 'warning');
        return;
      }

      AppState.appliedCoupon = coupon;
      localStorage.setItem('stackly_coupon', JSON.stringify(coupon));
      renderCart();

      const successMsg = `Coupon "${cleanCode}" applied! ${coupon.desc}`;
      if (elements.cartCouponFeedback) {
        elements.cartCouponFeedback.innerHTML = `<span style="color:var(--secondary); font-weight:600;"><i class="fa-solid fa-circle-check"></i> ${successMsg}</span>`;
      }
      if (showToastMessage) showToast(successMsg, 'success');
    } else {
      const errMsg = `Coupon code "${cleanCode}" is invalid or expired.`;
      if (elements.cartCouponFeedback) {
        elements.cartCouponFeedback.innerHTML = `<span style="color:var(--coral);">${errMsg}</span>`;
      }
      if (showToastMessage) showToast(errMsg, 'error');
    }
  }

  function openCartDrawer() {
    renderCart();
    if (elements.cartDrawer && elements.cartDrawerBackdrop) {
      elements.cartDrawer.classList.add('active');
      elements.cartDrawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (elements.cartDrawer && elements.cartDrawerBackdrop) {
      elements.cartDrawer.classList.remove('active');
      elements.cartDrawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // =========================================================================
  // 10. Wishlist Functionality (LocalStorage Backed)
  // =========================================================================
  function isItemWishlisted(productId) {
    return AppState.wishlist.some(item => item.id === Number(productId));
  }

  function toggleWishlist(productId) {
    const product = AppState.allFashionProducts.find(p => p.id === Number(productId));
    if (!product) return;

    const index = AppState.wishlist.findIndex(item => item.id === product.id);

    if (index > -1) {
      AppState.wishlist.splice(index, 1);
      showToast(`Removed "${product.title}" from Wishlist.`, 'info');
    } else {
      AppState.wishlist.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        category: product.category,
        rating: product.rating
      });
      showToast(`Saved "${product.title}" to your Wishlist!`, 'wishlist');
    }

    saveWishlistToStorage();
    updateWishlistBadges();
    renderWishlist();

    // Update active state across all visible cards
    document.querySelectorAll(`.btn-toggle-wishlist[data-wishlist-id="${product.id}"]`).forEach(btn => {
      const isWish = isItemWishlisted(product.id);
      btn.classList.toggle('active', isWish);
      btn.innerHTML = `<i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
    });

    // Update modal button if currently open
    if (AppState.selectedProduct && AppState.selectedProduct.id === product.id && elements.modalWishlistBtn) {
      const isWish = isItemWishlisted(product.id);
      elements.modalWishlistBtn.classList.toggle('active', isWish);
      elements.modalWishlistBtn.innerHTML = `
        <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        <span>${isWish ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
      `;
    }
  }

  function saveWishlistToStorage() {
    localStorage.setItem('stackly_wishlist', JSON.stringify(AppState.wishlist));
    updateWishlistBadges();
  }

  function updateWishlistBadges() {
    const count = AppState.wishlist.length;
    if (elements.wishlistCountBadge) {
      elements.wishlistCountBadge.textContent = count;
      elements.wishlistCountBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    if (elements.wishlistDrawerHeaderCount) {
      elements.wishlistDrawerHeaderCount.textContent = `(${count} items)`;
    }
  }

  function renderWishlist() {
    updateWishlistBadges();

    if (!elements.wishlistDrawerItems) return;

    if (AppState.wishlist.length === 0) {
      elements.wishlistDrawerItems.innerHTML = `
        <div class="empty-drawer-state">
          <i class="fa-regular fa-heart" style="font-size:3.5rem; color:var(--text-light); margin-bottom:1rem;"></i>
          <h4>Your Wishlist is empty</h4>
          <p>Tap the heart icon on any runway piece to save your favorite boutique finds.</p>
        </div>
      `;
    } else {
      elements.wishlistDrawerItems.innerHTML = AppState.wishlist.map(item => Components.wishlistItemRow(item)).join('');
    }
  }

  function openWishlistDrawer() {
    renderWishlist();
    if (elements.wishlistDrawer && elements.wishlistDrawerBackdrop) {
      elements.wishlistDrawer.classList.add('active');
      elements.wishlistDrawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeWishlistDrawer() {
    if (elements.wishlistDrawer && elements.wishlistDrawerBackdrop) {
      elements.wishlistDrawer.classList.remove('active');
      elements.wishlistDrawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // =========================================================================
  // 11. Checkout & Order Confirmation Popup
  // =========================================================================
  function openCheckoutModal() {
    if (AppState.cart.length === 0) {
      showToast('Your shopping bag is empty! Add items before checkout.', 'warning');
      return;
    }

    closeCartDrawer();
    const totals = calculateCartTotals();

    // Populate Checkout Summary
    if (elements.checkoutSummaryItems) {
      elements.checkoutSummaryItems.innerHTML = AppState.cart.map(item => `
        <div class="checkout-item-preview">
          <img src="${item.thumbnail}" alt="${item.title}" class="checkout-item-img">
          <div class="checkout-item-info">
            <h5>${item.title}</h5>
            <span class="checkout-item-qty">Qty: ${item.quantity} × $${item.price}</span>
          </div>
          <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');
    }

    if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `$${totals.subtotal}`;
    if (elements.checkoutShipping) elements.checkoutShipping.textContent = totals.shipping;
    if (elements.checkoutDiscount) elements.checkoutDiscount.textContent = `-$${totals.discount}`;
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = `$${totals.total}`;

    if (elements.modalBackdrop && elements.checkoutModal) {
      elements.modalBackdrop.classList.add('active');
      elements.checkoutModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckoutModal() {
    if (elements.modalBackdrop && elements.checkoutModal) {
      elements.modalBackdrop.classList.remove('active');
      elements.checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function handleOrderSubmission(e) {
    e.preventDefault();

    const nameInput = document.getElementById('checkoutName');
    const emailInput = document.getElementById('checkoutEmail');
    const addressInput = document.getElementById('checkoutAddress');
    const phoneInput = document.getElementById('checkoutPhone');

    const customerName = nameInput ? nameInput.value.trim() : 'Valued Client';
    const customerEmail = emailInput ? emailInput.value.trim() : 'client@stackly.com';
    const totals = calculateCartTotals();

    // Generate unique order ID
    const orderId = `STK-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const estDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Store in orders history
    const orderRecord = {
      orderId,
      date: today,
      customerName,
      customerEmail,
      items: [...AppState.cart],
      totalPaid: totals.total,
      deliveryEstimate: estDelivery
    };

    AppState.orders.unshift(orderRecord);
    localStorage.setItem('stackly_orders', JSON.stringify(AppState.orders));

    // Clear cart and applied coupon
    AppState.cart = [];
    AppState.appliedCoupon = null;
    localStorage.removeItem('stackly_cart');
    localStorage.removeItem('stackly_coupon');
    updateCartBadges();

    // Close checkout modal & open Order Confirmation Popup
    closeCheckoutModal();
    showOrderConfirmationPopup(orderRecord);
  }

  function showOrderConfirmationPopup(order) {
    if (elements.orderIdText) elements.orderIdText.textContent = order.orderId;
    if (elements.orderDateText) elements.orderDateText.textContent = order.date;
    if (elements.orderDeliveryText) elements.orderDeliveryText.textContent = order.deliveryEstimate;
    if (elements.orderCustomerName) elements.orderCustomerName.textContent = order.customerName;
    if (elements.orderTotalPaid) elements.orderTotalPaid.textContent = `$${order.totalPaid}`;

    if (elements.orderItemsSummaryList) {
      elements.orderItemsSummaryList.innerHTML = order.items.map(it => `
        <div class="confirmed-order-item">
          <span>${it.title} (x${it.quantity})</span>
          <strong>$${(it.price * it.quantity).toFixed(2)}</strong>
        </div>
      `).join('');
    }

    if (elements.modalBackdrop && elements.orderSuccessModal) {
      elements.modalBackdrop.classList.add('active');
      elements.orderSuccessModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    showToast(`Order ${order.orderId} confirmed successfully!`, 'success');
  }

  function closeOrderConfirmationPopup() {
    if (elements.modalBackdrop && elements.orderSuccessModal) {
      elements.modalBackdrop.classList.remove('active');
      elements.orderSuccessModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // =========================================================================
  // 12. Global Event Listeners & Delegation
  // =========================================================================
  function initEventListeners() {
    // Mobile Navigation Hamburger
    if (elements.hamburgerBtn && elements.navLinks) {
      elements.hamburgerBtn.addEventListener('click', () => {
        elements.hamburgerBtn.classList.toggle('active');
        elements.navLinks.classList.toggle('active');
        const isOpen = elements.navLinks.classList.contains('active');
        if (isOpen) {
          lockPageScroll();
        } else {
          unlockPageScroll();
        }
      });

      // Close mobile menu on nav link click
      elements.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          elements.hamburgerBtn.classList.remove('active');
          elements.navLinks.classList.remove('active');
          unlockPageScroll();
        });
      });

      // Close mobile menu on click outside header
      document.addEventListener('click', (e) => {
        if (elements.navLinks && elements.navLinks.classList.contains('active')) {
          if (!elements.siteHeader.contains(e.target)) {
            elements.hamburgerBtn.classList.remove('active');
            elements.navLinks.classList.remove('active');
            unlockPageScroll();
          }
        }
      });

      // Prevent scrolling outside or through the open hamburger drawer
      window.addEventListener('wheel', (e) => {
        if (elements.navLinks && elements.navLinks.classList.contains('active')) {
          if (!elements.navLinks.contains(e.target)) {
            e.preventDefault();
          }
        }
      }, { passive: false });

      document.addEventListener('touchmove', (e) => {
        if (elements.navLinks && elements.navLinks.classList.contains('active')) {
          if (!elements.navLinks.contains(e.target)) {
            e.preventDefault();
          }
        }
      }, { passive: false });
    }

    // Sticky Header Scroll effect
    window.addEventListener('scroll', () => {
      if (elements.siteHeader) {
        if (window.scrollY > 40) {
          elements.siteHeader.classList.add('scrolled');
        } else {
          elements.siteHeader.classList.remove('scrolled');
        }
      }
    });

    // Cart Trigger Button & Wishlist Trigger Button in Header
    if (elements.cartTriggerBtn) {
      elements.cartTriggerBtn.addEventListener('click', openCartDrawer);
    }
    if (elements.wishlistTriggerBtn) {
      elements.wishlistTriggerBtn.addEventListener('click', openWishlistDrawer);
    }

    // Drawers Close Buttons & Backdrops
    if (elements.closeCartDrawerBtn) {
      elements.closeCartDrawerBtn.addEventListener('click', closeCartDrawer);
    }
    if (elements.cartDrawerBackdrop) {
      elements.cartDrawerBackdrop.addEventListener('click', closeCartDrawer);
    }
    if (elements.closeWishlistDrawerBtn) {
      elements.closeWishlistDrawerBtn.addEventListener('click', closeWishlistDrawer);
    }
    if (elements.wishlistDrawerBackdrop) {
      elements.wishlistDrawerBackdrop.addEventListener('click', closeWishlistDrawer);
    }

    // Clear Cart and Clear Wishlist
    if (elements.clearCartBtn) {
      elements.clearCartBtn.addEventListener('click', () => {
        if (AppState.cart.length > 0 && confirm('Are you sure you want to clear your shopping bag?')) {
          AppState.cart = [];
          AppState.appliedCoupon = null;
          saveCartToStorage();
          renderCart();
          showToast('Shopping bag cleared.', 'info');
        }
      });
    }

    if (elements.clearWishlistBtn) {
      elements.clearWishlistBtn.addEventListener('click', () => {
        if (AppState.wishlist.length > 0 && confirm('Clear all saved pieces from your wishlist?')) {
          AppState.wishlist = [];
          saveWishlistToStorage();
          renderWishlist();
          renderCatalogProducts();
          showToast('Wishlist cleared.', 'info');
        }
      });
    }

    // Apply Coupon in Cart
    if (elements.cartApplyCouponBtn && elements.cartCouponInput) {
      elements.cartApplyCouponBtn.addEventListener('click', () => {
        applyCouponCode(elements.cartCouponInput.value, true);
      });
      elements.cartCouponInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyCouponCode(elements.cartCouponInput.value, true);
        }
      });
    }

    // Cart Drawer Checkout Button
    if (elements.cartCheckoutBtn) {
      elements.cartCheckoutBtn.addEventListener('click', openCheckoutModal);
    }

    // Checkout Form Submission & Modal Close
    if (elements.checkoutForm) {
      elements.checkoutForm.addEventListener('submit', handleOrderSubmission);
    }
    if (elements.closeCheckoutModalBtn) {
      elements.closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
    }

    // Order Success Modal Close
    if (elements.closeOrderSuccessModalBtn) {
      elements.closeOrderSuccessModalBtn.addEventListener('click', closeOrderConfirmationPopup);
    }
    if (elements.continueShoppingBtn) {
      elements.continueShoppingBtn.addEventListener('click', () => {
        closeOrderConfirmationPopup();
        const catSec = document.getElementById('catalogSection');
        if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Product Modal Close Buttons
    if (elements.closeProductModalBtn) {
      elements.closeProductModalBtn.addEventListener('click', closeProductModal);
    }
    if (elements.modalBackdrop) {
      elements.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.modalBackdrop) {
          closeProductModal();
          closeCheckoutModal();
          closeOrderConfirmationPopup();
        }
      });
    }

    // Modal Quantity Controls
    if (elements.modalQtyDec) {
      elements.modalQtyDec.addEventListener('click', () => {
        if (AppState.modalQuantity > 1) {
          AppState.modalQuantity--;
          if (elements.modalQtyVal) elements.modalQtyVal.textContent = AppState.modalQuantity;
        }
      });
    }
    if (elements.modalQtyInc) {
      elements.modalQtyInc.addEventListener('click', () => {
        const maxStock = (AppState.selectedProduct && AppState.selectedProduct.stock) || 10;
        if (AppState.modalQuantity < maxStock) {
          AppState.modalQuantity++;
          if (elements.modalQtyVal) elements.modalQtyVal.textContent = AppState.modalQuantity;
        } else {
          showToast(`Maximum stock limit (${maxStock}) reached for this item.`, 'warning');
        }
      });
    }

    // Modal Add to Cart Button
    if (elements.modalAddToCartBtn) {
      elements.modalAddToCartBtn.addEventListener('click', () => {
        if (AppState.selectedProduct) {
          addToCart(AppState.selectedProduct.id, AppState.modalQuantity);
          closeProductModal();
        }
      });
    }

    // Modal Wishlist Button
    if (elements.modalWishlistBtn) {
      elements.modalWishlistBtn.addEventListener('click', () => {
        if (AppState.selectedProduct) {
          toggleWishlist(AppState.selectedProduct.id);
        }
      });
    }

    // Search and Sort inputs in Catalog
    if (elements.productSearchInput) {
      elements.productSearchInput.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;
        AppState.displayLimit = AppState.pageSize;
        applyFiltersAndSort();
      });
    }

    if (elements.headerSearchInput) {
      elements.headerSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = e.target.value;
          AppState.searchQuery = query;
          if (elements.productSearchInput) elements.productSearchInput.value = query;
          AppState.displayLimit = AppState.pageSize;
          applyFiltersAndSort();
          const catSec = document.getElementById('catalogSection');
          if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (elements.heroSearchBtn && elements.heroSearchInput) {
      elements.heroSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = elements.heroSearchInput.value;
        AppState.searchQuery = query;
        if (elements.productSearchInput) elements.productSearchInput.value = query;
        AppState.displayLimit = AppState.pageSize;
        applyFiltersAndSort();
        const catSec = document.getElementById('catalogSection');
        if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
      });
      elements.heroSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          elements.heroSearchBtn.click();
        }
      });
    }

    if (elements.productSortSelect) {
      elements.productSortSelect.addEventListener('change', (e) => {
        AppState.sortBy = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (elements.clearFiltersBtn) {
      elements.clearFiltersBtn.addEventListener('click', resetAllFilters);
    }

    // Category Tabs in Catalog
    if (elements.catalogCategoryTabs) {
      elements.catalogCategoryTabs.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const cat = tab.getAttribute('data-category');
          setCategoryFilter(cat);
        });
      });
    }

    // Load More Button
    if (elements.loadMoreBtn) {
      elements.loadMoreBtn.addEventListener('click', () => {
        AppState.displayLimit += AppState.pageSize;
        renderCatalogProducts();
      });
    }

    // Retry Fetch Button on Error
    if (elements.retryFetchBtn) {
      elements.retryFetchBtn.addEventListener('click', () => {
        fetchDummyJSONProducts();
      });
    }

    // Testimonial Prev & Next Buttons
    if (elements.prevTestimonialBtn) {
      elements.prevTestimonialBtn.addEventListener('click', () => {
        goToTestimonial(AppState.testimonialIndex - 1);
        startTestimonialAutoplay();
      });
    }
    if (elements.nextTestimonialBtn) {
      elements.nextTestimonialBtn.addEventListener('click', () => {
        goToTestimonial(AppState.testimonialIndex + 1);
        startTestimonialAutoplay();
      });
    }

    // Newsletter Form - Redirect to 404 page on correct data submission
    if (elements.newsletterForm) {
      elements.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = elements.newsletterEmail ? elements.newsletterEmail.value.trim() : '';
        if (email && email.includes('@') && email.includes('.')) {
          window.location.href = '404.html';
        } else {
          showToast('Please enter a valid email address.', 'warning');
        }
      });
    }

    // Global Click Delegation (Quick view, Add to Cart, Wishlist, Cart Steppers)
    document.addEventListener('click', (e) => {
      // Quick View Click
      const quickViewBtn = e.target.closest('.btn-quick-view');
      if (quickViewBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = quickViewBtn.getAttribute('data-product-id');
        openProductModal(id);
        return;
      }

      // Add to Cart from Card Click
      const addCartBtn = e.target.closest('.btn-add-cart');
      if (addCartBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = addCartBtn.getAttribute('data-cart-id');
        addToCart(id, 1);
        return;
      }

      // Wishlist Toggle Click
      const wishBtn = e.target.closest('.btn-toggle-wishlist');
      if (wishBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishBtn.getAttribute('data-wishlist-id');
        toggleWishlist(id);
        return;
      }

      // Cart Item Quantity Steppers
      const cartIncBtn = e.target.closest('.btn-cart-inc');
      if (cartIncBtn) {
        e.preventDefault();
        const id = cartIncBtn.getAttribute('data-id');
        updateCartQuantity(id, 1);
        return;
      }

      const cartDecBtn = e.target.closest('.btn-cart-dec');
      if (cartDecBtn) {
        e.preventDefault();
        const id = cartDecBtn.getAttribute('data-id');
        updateCartQuantity(id, -1);
        return;
      }

      // Remove from Cart
      const removeCartBtn = e.target.closest('.btn-remove-cart');
      if (removeCartBtn) {
        e.preventDefault();
        const id = removeCartBtn.getAttribute('data-id');
        removeFromCart(id);
        return;
      }

      // Wishlist Move to Cart
      const moveCartBtn = e.target.closest('.btn-move-to-cart');
      if (moveCartBtn) {
        e.preventDefault();
        const id = moveCartBtn.getAttribute('data-id');
        addToCart(id, 1);
        toggleWishlist(id); // remove from wishlist
        return;
      }

      // Wishlist Remove
      const removeWishBtn = e.target.closest('.btn-remove-wishlist');
      if (removeWishBtn) {
        e.preventDefault();
        const id = removeWishBtn.getAttribute('data-id');
        toggleWishlist(id);
        return;
      }
    });

    // Escape Key to close all active modals & drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
        closeCheckoutModal();
        closeOrderConfirmationPopup();
        closeCartDrawer();
        closeWishlistDrawer();
      }
    });
  }

  // =========================================================================
  // 13. Application Initialization
  // =========================================================================
  function init() {
    initScrollAndAnimations();
    renderFeaturedCategories();
    renderSpecialOffers();
    renderTestimonials();
    updateCartBadges();
    updateWishlistBadges();
    initEventListeners();

    // Fetch API Data from DummyJSON
    fetchDummyJSONProducts();
  }

  init();
});
