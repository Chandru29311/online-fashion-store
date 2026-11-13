/**
 * Stackly - Online Fashion & Clothing Boutique
 * Reusable HTML Component Renderers & Helpers
 * Pure Vanilla JavaScript
 */

const Components = {
  /**
   * Helper: Generate Star Rating HTML
   */
  renderStars(rating = 5) {
    const fullStars = Math.floor(rating);
    const hasHalf = (rating - fullStars) >= 0.4;
    let html = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<i class="fa-solid fa-star star-filled"></i>';
      } else if (i === fullStars + 1 && hasHalf) {
        html += '<i class="fa-solid fa-star-half-stroke star-filled"></i>';
      } else {
        html += '<i class="fa-regular fa-star star-empty"></i>';
      }
    }
    return html;
  },

  /**
   * Helper: Calculate Original Price before discount
   */
  calcOriginalPrice(price, discountPercent) {
    if (!discountPercent || discountPercent <= 0) return null;
    const orig = price / (1 - discountPercent / 100);
    return orig.toFixed(2);
  },

  /**
   * Helper: Format category slug into human readable string
   */
  formatCategory(category = '') {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Product Card Component
   */
  productCard(product, isWishlisted = false) {
    const origPrice = this.calcOriginalPrice(product.price, product.discountPercentage);
    const categoryName = this.formatCategory(product.category);
    const discountBadge = product.discountPercentage > 5 
      ? `<span class="prod-badge discount-badge">-${Math.round(product.discountPercentage)}%</span>` 
      : '';
    const isNew = product.id % 2 === 0;
    const newBadge = isNew ? `<span class="prod-badge new-badge">New</span>` : '';
    const ratingScore = Number(product.rating || 4.5).toFixed(1);
    const reviewsCount = product.reviews ? product.reviews.length : Math.floor(12 + (product.id % 25));
    const imageSrc = product.thumbnail || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80';

    return `
      <div class="product-card hover-lift" data-aos="fade-up" data-product-id="${product.id}">
        <div class="product-media">
          <img src="${imageSrc}" alt="${product.title}" loading="lazy" class="product-thumb-img">
          
          <div class="product-badges-wrap">
            ${newBadge}
            ${discountBadge}
          </div>

          <!-- Quick Action Buttons -->
          <div class="product-overlay-actions">
            <button type="button" class="action-circle-btn btn-quick-view" data-product-id="${product.id}" title="Quick View Product Details" aria-label="Quick View">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button type="button" class="action-circle-btn btn-toggle-wishlist ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
        </div>

        <div class="product-info">
          <div class="product-meta">
            <span class="product-category">${categoryName}</span>
            <span class="product-rating">
              <i class="fa-solid fa-star"></i> ${ratingScore} <small>(${reviewsCount})</small>
            </span>
          </div>

          <h3 class="product-title" title="${product.title}">${product.title}</h3>

          <div class="product-price-row">
            <div class="price-container">
              <span class="current-price">$${Number(product.price).toFixed(2)}</span>
              ${origPrice ? `<span class="original-price">$${origPrice}</span>` : ''}
            </div>
            
            <button type="button" class="btn-add-cart" data-cart-id="${product.id}" title="Add to Shopping Cart" aria-label="Add to Cart">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Featured Category Card
   */
  categoryCard(cat) {
    return `
      <div class="category-card hover-lift" data-aos="fade-up" data-category-slug="${cat.slug}">
        <div class="category-img-box">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy">
          <div class="category-overlay"></div>
          ${cat.badge ? `<span class="category-badge">${cat.badge}</span>` : ''}
        </div>
        <div class="category-details">
          <div class="category-icon-bubble">
            <i class="${cat.icon}"></i>
          </div>
          <h3 class="category-title">${cat.name}</h3>
          <p class="category-sub">${cat.subtitle}</p>
          <span class="category-cta">
            Shop Collection <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    `;
  },

  /**
   * Promotional Special Offer Card
   */
  offerCard(promo) {
    return `
      <div class="offer-card hover-lift" data-aos="fade-up">
        <div class="offer-img-box">
          <img src="${promo.image}" alt="${promo.headline}" loading="lazy">
          <span class="offer-tag" style="background:${promo.badgeColor};">${promo.tag}</span>
        </div>
        <div class="offer-body">
          <div class="offer-discount-badge">${promo.discount}</div>
          <h3 class="offer-title">${promo.headline}</h3>
          <p class="offer-desc">${promo.description}</p>
          
          <div class="offer-coupon-box">
            <div class="coupon-code-pill" title="Click to copy coupon code">
              <span class="code-label">PROMO CODE:</span>
              <strong class="code-text" id="code-${promo.code}">${promo.code}</strong>
            </div>
            <button type="button" class="btn btn-secondary btn-sm copy-promo-btn" data-coupon="${promo.code}">
              <i class="fa-regular fa-copy"></i> Copy
            </button>
          </div>

          <div class="offer-terms">
            <i class="fa-regular fa-clock"></i> ${promo.expiryDate}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Customer Testimonial Card
   */
  testimonialCard(t) {
    return `
      <div class="testimonial-slide">
        <div class="testimonial-bubble">
          <div class="quote-stars">
            ${this.renderStars(t.rating)}
          </div>
          <p class="testimonial-quote">"${t.review}"</p>
          <div class="testimonial-author-box">
            <img src="${t.avatar}" alt="${t.name}" class="author-avatar" loading="lazy">
            <div class="author-info">
              <h4 class="author-name">
                ${t.name}
                ${t.verified ? `<span class="verified-badge" title="Verified Stackly Client"><i class="fa-solid fa-circle-check"></i> Verified</span>` : ''}
              </h4>
              <span class="author-role">${t.role} • ${t.city}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Shopping Cart Item Row Component
   */
  cartItemRow(item) {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    const imageSrc = item.thumbnail || (item.images && item.images[0]) || '';
    const origPrice = this.calcOriginalPrice(item.price, item.discountPercentage);

    return `
      <div class="cart-item-row" data-cart-item-id="${item.id}">
        <img src="${imageSrc}" alt="${item.title}" class="cart-item-thumb">
        
        <div class="cart-item-details">
          <h4 class="cart-item-title" title="${item.title}">${item.title}</h4>
          <div class="cart-item-pricing">
            <span class="cart-unit-price">$${Number(item.price).toFixed(2)}</span>
            ${origPrice ? `<span class="cart-orig-price">$${origPrice}</span>` : ''}
          </div>

          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button type="button" class="qty-btn btn-cart-dec" data-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button type="button" class="qty-btn btn-cart-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>

            <div class="cart-item-total">
              $${itemTotal}
            </div>
          </div>
        </div>

        <button type="button" class="btn-remove-cart" data-id="${item.id}" title="Remove item" aria-label="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  },

  /**
   * Wishlist Item Row Component
   */
  wishlistItemRow(item) {
    const imageSrc = item.thumbnail || (item.images && item.images[0]) || '';
    const ratingScore = Number(item.rating || 4.5).toFixed(1);

    return `
      <div class="wishlist-item-row" data-wishlist-item-id="${item.id}">
        <img src="${imageSrc}" alt="${item.title}" class="wishlist-thumb">
        
        <div class="wishlist-details">
          <h4 class="wishlist-title" title="${item.title}">${item.title}</h4>
          <div class="wishlist-meta">
            <span class="wishlist-price">$${Number(item.price).toFixed(2)}</span>
            <span class="wishlist-rate"><i class="fa-solid fa-star"></i> ${ratingScore}</span>
          </div>
          <span class="wishlist-stock-status in-stock">
            <i class="fa-solid fa-check"></i> In Stock & Ready to Ship
          </span>
        </div>

        <div class="wishlist-actions">
          <button type="button" class="btn btn-primary btn-sm btn-move-to-cart" data-id="${item.id}" title="Move to Cart">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-remove-wishlist" data-id="${item.id}" title="Remove from Wishlist">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Skeleton Card for Loading State
   */
  skeletonCard() {
    return `
      <div class="product-card skeleton-card">
        <div class="skeleton-img skeleton-box"></div>
        <div class="product-info">
          <div class="skeleton-line skeleton-box" style="width: 40%; height: 14px; margin-bottom: 10px;"></div>
          <div class="skeleton-line skeleton-box" style="width: 85%; height: 20px; margin-bottom: 8px;"></div>
          <div class="skeleton-line skeleton-box" style="width: 60%; height: 16px; margin-bottom: 16px;"></div>
          <div class="skeleton-line skeleton-box" style="width: 100%; height: 36px; border-radius: 9999px;"></div>
        </div>
      </div>
    `;
  }
};

// Expose globally
window.Components = Components;
