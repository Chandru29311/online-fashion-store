/**
 * Stackly - Online Fashion & Clothing Boutique
 * Sample Data Store & Initial Fallback Data
 * Pure Vanilla JavaScript
 */

const FASHION_DATA = {
  // Boutique Brand Information
  brand: {
    name: "Stackly",
    tagline: "Haute Couture & Everyday Elegance",
    description: "Curating timeless luxury garments, contemporary runway trends, and artisanal fashion accessories crafted for the discerning wardrobe.",
    phone: "+91 9876543210",
    email: "concierge@stackly.com",
    address: "MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008",
    mapsUrl: "https://www.google.com/maps/place/Stackly/@11.6829566,78.1739798,17z/data=!3m1!4b1!4m6!3m5!1s0x3babefef7fd970bb:0xe11aef1a71994f9!8m2!3d11.6829566!4d78.1739798!16s%2Fg%2F11l660s35r?entry=ttu"
  },

  // Featured Categories (Minimum 4 categories required)
  categories: [
    {
      id: "womens-dresses",
      slug: "womens-dresses",
      name: "Women's Dresses",
      subtitle: "Evening gowns, slip dresses & cocktail wear",
      itemCount: "48+ Styles",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
      icon: "fa-solid fa-person-dress",
      badge: "Trending"
    },
    {
      id: "mens-shirts",
      slug: "mens-shirts",
      name: "Men's Shirts",
      subtitle: "Tailored Oxford, linen & casual silks",
      itemCount: "35+ Styles",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
      icon: "fa-solid fa-shirt",
      badge: "Popular"
    },
    {
      id: "womens-bags",
      slug: "womens-bags",
      name: "Designer Bags",
      subtitle: "Luxury leather totes, clutches & crossbodies",
      itemCount: "26+ Styles",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
      icon: "fa-solid fa-bag-shopping",
      badge: "Exclusive"
    },
    {
      id: "womens-shoes",
      slug: "womens-shoes",
      name: "Luxury Footwear",
      subtitle: "Stiletto pumps, designer boots & chic mules",
      itemCount: "42+ Styles",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",
      icon: "fa-solid fa-shoe-prints",
      badge: "New"
    },
    {
      id: "fragrances",
      slug: "fragrances",
      name: "Perfumes & Scents",
      subtitle: "Artisanal eau de parfum & signature scents",
      itemCount: "30+ Scents",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
      icon: "fa-solid fa-spray-can-sparkles",
      badge: "Best Seller"
    },
    {
      id: "sunglasses",
      slug: "sunglasses",
      name: "Chic Eyewear",
      subtitle: "Polarized UV shades & oversized frames",
      itemCount: "22+ Styles",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
      icon: "fa-solid fa-glasses",
      badge: "Summer Pick"
    }
  ],

  // Promotional Offers & Coupon Codes (Minimum 3 required)
  offers: [
    {
      id: "offer-1",
      code: "STACKLY25",
      headline: "Summer Runway Sale",
      discount: "25% OFF",
      type: "percentage",
      value: 25,
      minPurchase: 60,
      description: "Get 25% off on all women's dresses and summer apparel collections. Applicable on orders above $60.",
      tag: "Limited Time",
      badgeColor: "#e11d48",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
      expiryDate: "Valid through season"
    },
    {
      id: "offer-2",
      code: "WELCOME15",
      headline: "New Client Privileges",
      discount: "15% OFF",
      type: "percentage",
      value: 15,
      minPurchase: 0,
      description: "Enjoy an instant 15% discount on your first Stackly boutique fashion order. No minimum purchase required.",
      tag: "First Order",
      badgeColor: "#059669",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80",
      expiryDate: "For new customers"
    },
    {
      id: "offer-3",
      code: "LUXE30",
      headline: "Luxury Bags & Fragrances",
      discount: "30% OFF",
      type: "percentage",
      value: 30,
      minPurchase: 120,
      description: "Indulge in pure luxury! Save 30% on designer handbags, accessories, and signature fragrances over $120.",
      tag: "VIP Exclusive",
      badgeColor: "#d97706",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
      expiryDate: "VIP Exclusive"
    }
  ],

  // Customer Testimonials (Minimum 3 required)
  testimonials: [
    {
      id: "t-1",
      name: "Amara Okafor",
      role: "Fashion Curator & Model",
      city: "Paris",
      avatar: "assets/images/avatar-amara-okafor.webp",
      rating: 5,
      date: "October 2026",
      review: "Stackly has revolutionized my personal wardrobe. The drape and stitching of their evening gowns rival haute couture fashion houses in Milan. Plus, express dispatch got it to my doorstep in under 48 hours!",
      verified: true
    },
    {
      id: "t-2",
      name: "Sophia Chen",
      role: "Celebrity Stylist",
      city: "New York",
      avatar: "assets/images/avatar-sophia-chen.webp",
      rating: 5,
      date: "September 2026",
      review: "As a professional wardrobe stylist, fabric authenticity is non-negotiable. Stackly’s silk shirts and leather bags have that unmistakable quiet luxury feel. My clients constantly rave about these pieces.",
      verified: true
    },
    {
      id: "t-3",
      name: "Lucas Moretti",
      role: "Architect & Creative Director",
      city: "Milan",
      avatar: "assets/images/avatar-lucas-moretti.webp",
      rating: 5,
      date: "November 2026",
      review: "Finding tailored menswear with modern silhouettes and breathable luxury linens used to be a hassle. The sizing recommendation on Stackly was spot-on, and the unboxing experience was pure art.",
      verified: true
    },
    {
      id: "t-4",
      name: "Elena Rostova",
      role: "Luxury Lifestyle Journalist",
      city: "London",
      avatar: "assets/images/avatar-elena-rostova.webp",
      rating: 5,
      date: "August 2026",
      review: "I acquired their signature leather clutch and a floral midi dress. The craftsmanship is flawless, the customer concierge is ultra-responsive, and applying the VIP discount code took seconds!",
      verified: true
    }
  ],

  // Reliable Fallback Products (Guarantees immediate rich rendering if API is throttled or offline)
  fallbackProducts: [
    {
      id: 177,
      title: "Black Velvet Evening Gown",
      description: "An elegant and timeless evening gown sculpted with rich velvet accents. With a sleek silhouette and corset bodice, it is perfect for gala affairs and red carpet events.",
      category: "womens-dresses",
      price: 129.99,
      discountPercentage: 10.5,
      rating: 4.85,
      stock: 25,
      tags: ["clothing", "dresses", "evening", "luxury"],
      sku: "STK-DRS-177",
      shippingInformation: "Free Express Shipping in 2-3 days",
      warrantyInformation: "30-day luxury fit guarantee",
      returnPolicy: "Complimentary returns within 30 days",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Breathtaking fit and silhouette! Looked like a custom Parisian piece.", reviewerName: "Amara O." },
        { rating: 5, comment: "High quality fabric that drapes gracefully.", reviewerName: "Chloe M." }
      ]
    },
    {
      id: 178,
      title: "Corset Leather With Pleated Skirt",
      description: "A bold and edgy luxury ensemble pairing a tailored vegan leather corset with an accordion pleated skirt. Ideal for fashion-forward trendsetters.",
      category: "womens-dresses",
      price: 89.99,
      discountPercentage: 16.2,
      rating: 4.72,
      stock: 18,
      tags: ["clothing", "corset", "skirts", "trendy"],
      sku: "STK-DRS-178",
      shippingInformation: "Ships overnight",
      warrantyInformation: "1 year fabric warranty",
      returnPolicy: "30 days return policy",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Unbelievable quality and flattering cut.", reviewerName: "Sophia C." }
      ]
    },
    {
      id: 83,
      title: "Blue & Black Check Tailored Shirt",
      description: "Crafted from 100% long-staple Egyptian cotton. Features mother-of-pearl buttons and a modern semi-spread collar for sharp smart-casual elegance.",
      category: "mens-shirts",
      price: 59.99,
      discountPercentage: 12.0,
      rating: 4.88,
      stock: 40,
      tags: ["menswear", "shirts", "cotton", "formal"],
      sku: "STK-MSH-083",
      shippingInformation: "Ships in 24 hours",
      warrantyInformation: "Anti-shrinkage guarantee",
      returnPolicy: "30 days free return",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Crisp, comfortable and fits like a glove.", reviewerName: "Lucas M." }
      ]
    },
    {
      id: 190,
      title: "Chic Quilted Leather Crossbody Bag",
      description: "Handcrafted Italian calfskin leather with gold-tone chain strap and interlocking monogram buckle. Features multiple compartments and RFID-shielded lining.",
      category: "womens-bags",
      price: 149.99,
      discountPercentage: 20.0,
      rating: 4.94,
      stock: 12,
      tags: ["accessories", "bags", "leather", "luxury"],
      sku: "STK-BAG-190",
      shippingInformation: "Complimentary luxury box packaging",
      warrantyInformation: "Lifetime hardware warranty",
      returnPolicy: "30 days hassle-free return",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Looks and feels like a $1,000 designer handbag!", reviewerName: "Elena R." }
      ]
    },
    {
      id: 195,
      title: "Pointed Toe Stiletto Pumps",
      description: "Sophisticated 90mm stiletto heels finished in patent leather with memory foam padded insoles for all-day comfort and commanding presence.",
      category: "womens-shoes",
      price: 119.50,
      discountPercentage: 15.0,
      rating: 4.79,
      stock: 15,
      tags: ["shoes", "heels", "pumps", "party"],
      sku: "STK-SHO-195",
      shippingInformation: "Ships in 2 business days",
      warrantyInformation: "6 months sole guarantee",
      returnPolicy: "Free size exchanges",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Surprisingly comfortable for 90mm heels!", reviewerName: "Jessica T." }
      ]
    },
    {
      id: 6,
      title: "Calais Blossom Eau De Parfum",
      description: "An intoxicating blend of Damask rose, bergamot, velvet amber, and cedarwood notes. Long-lasting luxury projection designed for evening statements.",
      category: "fragrances",
      price: 79.99,
      discountPercentage: 18.0,
      rating: 4.91,
      stock: 35,
      tags: ["perfume", "fragrance", "scent", "luxury"],
      sku: "STK-FRG-006",
      shippingInformation: "Ships in secure thermal box",
      warrantyInformation: "100% authentic designer formulation",
      returnPolicy: "Sealed bottle 30-day returns",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "I get stopped and complimented constantly wearing this.", reviewerName: "Aria W." }
      ]
    },
    {
      id: 179,
      title: "Silk Jacquard Slip Midi Dress",
      description: "Lustrous mulberry silk with delicate cowl neck detailing and adjustable cross-back straps. Glides gracefully along your curves.",
      category: "womens-dresses",
      price: 99.00,
      discountPercentage: 22.0,
      rating: 4.82,
      stock: 20,
      tags: ["dresses", "silk", "slip", "summer"],
      sku: "STK-DRS-179",
      shippingInformation: "Ships in 24 hours",
      warrantyInformation: "Natural silk guarantee",
      returnPolicy: "30 days returns",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Sensational drape and color richness.", reviewerName: "Naomi K." }
      ]
    },
    {
      id: 165,
      title: "Aviator Vintage UV Sunglasses",
      description: "Classic teardrop gold-tone titanium wire frames with gradient amber polarized lenses offering 100% UVA/UVB eye protection.",
      category: "sunglasses",
      price: 49.99,
      discountPercentage: 15.0,
      rating: 4.86,
      stock: 28,
      tags: ["eyewear", "sunglasses", "aviator", "summer"],
      sku: "STK-SUN-165",
      shippingInformation: "Includes hard leather case & cloth",
      warrantyInformation: "1 year lens scratch guarantee",
      returnPolicy: "30 days return",
      availabilityStatus: "In Stock",
      thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
      ],
      reviews: [
        { rating: 5, comment: "Super lightweight and crisp polarization.", reviewerName: "David L." }
      ]
    }
  ]
};

// Expose globally for browser usage
window.FASHION_DATA = FASHION_DATA;
