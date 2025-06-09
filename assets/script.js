/**
 * Modern Real Estate Website Script
 * Enhanced with fullPage.js, Swiper.js, GSAP animations, and smooth interactions
 */

// ====== GLOBAL VARIABLES ======
let fullPageInstance = null;
let propertiesSwiper = null;
let isLoading = true;

// ====== PROPERTY DATA ======
const properties = [
  {
    id: 1,
    title: "Đất nền trung tâm Trà Vinh",
    location: "TP. Trà Vinh, Trà Vinh",
    area: 120,
    price: 3.2,
    type: "thổ cư",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
    desc: "Vị trí đắc địa, pháp lý rõ ràng, gần trường học và bệnh viện."
  },
  {
    id: 2,
    title: "Đất dự án ven sông Hậu",
    location: "Càng Long, Trà Vinh",
    area: 200,
    price: 2.8,
    type: "dự án",
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=600&q=80",
    desc: "Khu dân cư cao cấp, tiện ích nội khu đầy đủ, sổ hồng riêng."
  },
  {
    id: 3,
    title: "Đất nông nghiệp sinh lời cao",
    location: "Tiểu Cần, Trà Vinh",
    area: 1000,
    price: 1.5,
    type: "nông nghiệp",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    desc: "Đất rộng, thích hợp đầu tư hoặc làm trang trại."
  },
  {
    id: 4,
    title: "Đất nền khu đô thị mới",
    location: "Duyên Hải, Trà Vinh",
    area: 150,
    price: 2.1,
    type: "thổ cư",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80",
    desc: "Khu vực phát triển, gần trung tâm thương mại, an ninh tốt."
  },
  {
    id: 5,
    title: "Đất vườn view sông",
    location: "Châu Thành, Trà Vinh",
    area: 800,
    price: 1.8,
    type: "nông nghiệp",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    desc: "Không gian thoáng đãng, view sông đẹp, đầu tư sinh lời."
  },
  {
    id: 6,
    title: "Đất thổ cư mặt tiền",
    location: "Cầu Kè, Trà Vinh",
    area: 180,
    price: 2.9,
    type: "thổ cư",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    desc: "Mặt tiền đường lớn, thuận lợi kinh doanh, pháp lý đầy đủ."
  }
];

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
  initializeLoading();
  initializeGSAP();
  initializeBackgroundSlideshow();
  setTimeout(() => {
    initializeFullPage();
    initializeSwiper();
    initializeNavigation();
    initializeForms();
    initializeFloatingContact();
    initializeLazyLoading();
    finishLoading();
  }, 1500);
});

// ====== LOADING ANIMATION ======
function initializeLoading() {
  const progressBar = document.querySelector('.progress-bar');
  let progress = 0;
  
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
    }
    progressBar.style.width = progress + '%';
  }, 100);
}

function finishLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  gsap.to(loadingOverlay, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      loadingOverlay.style.display = 'none';
      isLoading = false;
      startAnimations();
    }
  });
}

// ====== BACKGROUND SLIDESHOW ======
function initializeBackgroundSlideshow() {
  const slides = document.querySelectorAll('.bg-slide');
  let currentSlide = 0;
  
  // Change slide every 5 seconds
  setInterval(() => {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// ====== GSAP ANIMATIONS ======
function initializeGSAP() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Remove old background animations - slideshow handles background now
}

function startAnimations() {
  // Hero section animations
  const heroElements = document.querySelectorAll('[data-delay]');
  heroElements.forEach(element => {
    const delay = parseInt(element.dataset.delay) || 0;
    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        delay: delay / 1000,
        ease: "power2.out"
      }
    );
  });
  
  // Floating cards animation
  gsap.to('.card-item', {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    stagger: 0.2
  });
  
  // Scroll indicator animation
  gsap.to('.scroll-arrow', {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  });
}

// ====== FULLPAGE.JS INITIALIZATION ======
function initializeFullPage() {
  fullPageInstance = new fullpage('#fullpage', {
    // Navigation
    menu: '.slide-navigation',
    anchors: ['hero', 'search', 'areas', 'properties', 'map', 'contact'],
    navigation: false,
    
    // Scrolling
    scrollingSpeed: 1000,
    easing: 'easeInOutCubic',
    css3: true,
    
    // Design
    verticalCentered: false,
    
    // Hide watermark
    credits: { enabled: false },
    
    // Callbacks
    onLeave: function(origin, destination, direction) {
      updateNavigation(destination.index);
      animateSlideTransition(destination.index);
    },
    
    afterLoad: function(origin, destination, direction) {
      triggerSlideAnimations(destination.index);
    }
  });
}

// ====== NAVIGATION ======
function initializeNavigation() {
  const navDots = document.querySelectorAll('.nav-dot');
  
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      fullPageInstance.moveTo(index + 1);
    });
  });
  
  // Header navigation
  const headerNavLinks = document.querySelectorAll('.header-nav .nav-link');
  headerNavLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      fullPageInstance.moveTo(index + 1);
      
      // Close mobile menu if it's open
      const headerNav = document.querySelector('.header-nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (headerNav.classList.contains('mobile-active')) {
        headerNav.classList.remove('mobile-active');
        menuToggle.classList.remove('active');
      }
    });
  });
  
  // Mobile hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const headerNav = document.querySelector('.header-nav');
  
  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle menu visibility
      headerNav.classList.toggle('mobile-active');
      menuToggle.classList.toggle('active');
      
      // Track menu toggle event
      trackEvent('mobile_menu_toggle', { 
        isOpen: headerNav.classList.contains('mobile-active')
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!headerNav.contains(e.target) && !menuToggle.contains(e.target)) {
        headerNav.classList.remove('mobile-active');
        menuToggle.classList.remove('active');
      }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && headerNav.classList.contains('mobile-active')) {
        headerNav.classList.remove('mobile-active');
        menuToggle.classList.remove('active');
      }
    });
  }
  
  // Hero buttons
  const heroButtons = document.querySelectorAll('.hero-actions .btn');
  heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (button.textContent.includes('Khám phá')) {
        fullPageInstance.moveTo(2); // Go to search section
      }
    });
  });
}

function updateNavigation(activeIndex) {
  const navDots = document.querySelectorAll('.nav-dot');
  const headerNavLinks = document.querySelectorAll('.header-nav .nav-link');
  
  // Update nav dots
  navDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
  
  // Update header navigation
  headerNavLinks.forEach((link, index) => {
    link.classList.toggle('active', index === activeIndex);
  });
}

function animateSlideTransition(slideIndex) {
  // Add transition effects based on slide
  const slides = document.querySelectorAll('.section');
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      gsap.fromTo(slide.querySelector('.slide-content'), 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  });
}

function triggerSlideAnimations(slideIndex) {
  const currentSlide = document.querySelectorAll('.section')[slideIndex];
  const animatedElements = currentSlide.querySelectorAll('[data-delay]');
  
  // Special handling for map section (index 4)
  if (slideIndex === 4) {
    animateMapSection(currentSlide);
    return;
  }
  
  // Special handling for contact section (index 5)
  if (slideIndex === 5) {
    animateContactSection(currentSlide);
    return;
  }
  
  animatedElements.forEach(element => {
    const delay = parseInt(element.dataset.delay) || 0;
    gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: delay / 1000,
        ease: "power2.out"
      }
    );
  });
}

// ====== MAP SECTION ANIMATIONS ======
function animateMapSection(mapSection) {
  const mapContainer = mapSection.querySelector('.map-container');
  const mapWrapper = mapSection.querySelector('.map-wrapper');
  const infoCards = mapSection.querySelectorAll('.info-card');
  
  // Animate container
  gsap.fromTo(mapContainer, 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      ease: "power2.out"
    }
  );
  
  // Animate map frame with slight delay
  gsap.fromTo(mapWrapper, 
    { opacity: 0, scale: 0.95 },
    { 
      opacity: 1, 
      scale: 1, 
      duration: 1.2,
      delay: 0.3,
      ease: "back.out(1.7)"
    }
  );
  
  // Animate info cards staggered
  gsap.fromTo(infoCards, 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      delay: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }
  );
  
  // Add CSS classes for hover effects
  setTimeout(() => {
    mapContainer.classList.add('in-view');
    infoCards.forEach(card => card.classList.add('in-view'));
  }, 1000);
}

// ====== CONTACT SECTION ANIMATIONS ======
function animateContactSection(contactSection) {
  const contactContent = contactSection.querySelector('.contact-content');
  const contactFormWrapper = contactSection.querySelector('.contact-form-wrapper');
  const contactItems = contactSection.querySelectorAll('.contact-item');
  const socialLinks = contactSection.querySelector('.social-links');
  
  // Animate contact content
  gsap.fromTo(contactContent, 
    { opacity: 0, x: -50 },
    { 
      opacity: 1, 
      x: 0, 
      duration: 1,
      ease: "power2.out"
    }
  );
  
  // Animate form wrapper
  gsap.fromTo(contactFormWrapper, 
    { opacity: 0, x: 50 },
    { 
      opacity: 1, 
      x: 0, 
      duration: 1,
      delay: 0.2,
      ease: "power2.out"
    }
  );
  
  // Animate contact items staggered
  gsap.fromTo(contactItems, 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      delay: 0.4,
      stagger: 0.2,
      ease: "power2.out"
    }
  );
  
  // Animate social links
  if (socialLinks) {
    gsap.fromTo(socialLinks, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out"
      }
    );
  }
  
  // Add CSS classes for hover effects and animations
  setTimeout(() => {
    contactItems.forEach(item => item.classList.add('in-view'));
  }, 1000);
  
  // Add form validation and interactions
  initializeContactFormInteractions(contactSection);
}

// ====== SWIPER CAROUSEL ======
function initializeSwiper() {
  renderProperties();
  
  // Initialize Properties Swiper
  propertiesSwiper = new Swiper('.propertiesSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.propertiesSwiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.propertiesSwiper .swiper-button-next',
      prevEl: '.propertiesSwiper .swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });

  // Initialize Areas Swiper
  const areasSwiper = new Swiper('.areasSwiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false,
    },
    pagination: {
      el: '.areasSwiper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.areasSwiper .swiper-button-next',
      prevEl: '.areasSwiper .swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1200: {
        slidesPerView: 2.5,
        spaceBetween: 60,
      }
    },
    on: {
      slideChange: function () {
        // Add smooth transition effects when slides change
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          activeSlide.style.transform += ' scale(1.02)';
          setTimeout(() => {
            activeSlide.style.transform = activeSlide.style.transform.replace(' scale(1.02)', '');
          }, 300);
        }
      }
    }
  });
}

function renderProperties() {
  const container = document.getElementById('propertiesContainer');
  
  container.innerHTML = properties.map(property => `
    <div class="swiper-slide">
      <div class="property-card">
        <div class="property-image">
          <img src="${property.img}" alt="${property.title}" loading="lazy">
          <div class="property-badge">${property.type}</div>
          <div class="property-overlay">
            <button class="btn btn-outline btn-sm">Xem chi tiết</button>
          </div>
        </div>
        <div class="property-content">
          <h5 class="property-title">${property.title}</h5>
          <div class="property-location">
            <i class="bx bx-map"></i>
            <span>${property.location}</span>
          </div>
          <div class="property-details">
            <div class="property-detail">
              <i class="bx bx-area"></i>
              <span>${property.area} m²</span>
            </div>
            <div class="property-price">
              <i class="bx bx-money"></i>
              <span>${property.price} tỷ</span>
            </div>
          </div>
          <p class="property-desc">${property.desc}</p>
          <div class="property-actions">
            <button class="btn btn-primary">Liên hệ ngay</button>
            <button class="btn btn-outline">
              <i class="bx bx-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ====== FORM HANDLING ======
function initializeForms() {
  // Advanced search form
  const searchForm = document.getElementById('advancedSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
  
  // Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
}

function handleSearch(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const searchParams = {
    location: formData.get('location')?.toLowerCase() || '',
    type: formData.get('type') || '',
    minArea: Number(formData.get('minArea')) || 0,
    maxArea: Number(formData.get('maxArea')) || Infinity,
    minPrice: Number(formData.get('minPrice')) || 0,
    maxPrice: Number(formData.get('maxPrice')) || Infinity
  };
  
  // Filter properties
  const filteredProperties = properties.filter(property => {
    return (!searchParams.location || property.location.toLowerCase().includes(searchParams.location)) &&
           (!searchParams.type || property.type === searchParams.type) &&
           (property.area >= searchParams.minArea && property.area <= searchParams.maxArea) &&
           (property.price >= searchParams.minPrice && property.price <= searchParams.maxPrice);
  });
  
  // Show results (you can extend this to show results in a modal or navigate to results page)
  showSearchResults(filteredProperties);
}

function showSearchResults(results) {
  // Navigate to properties section and update carousel
  fullPageInstance.moveTo(4);
  
  // Update swiper with filtered results
  setTimeout(() => {
    updatePropertiesSwiper(results);
  }, 500);
  
  // Show toast notification
  showToast(`Tìm thấy ${results.length} bất động sản phù hợp`);
}

function updatePropertiesSwiper(propertiesList) {
  const container = document.getElementById('propertiesContainer');
  
  if (propertiesList.length === 0) {
    container.innerHTML = `
      <div class="swiper-slide">
        <div class="no-results">
          <i class="bx bx-search-alt-2"></i>
          <h5>Không tìm thấy bất động sản phù hợp</h5>
          <p>Vui lòng thử lại với điều kiện tìm kiếm khác</p>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = propertiesList.map(property => `
      <div class="swiper-slide">
        <div class="property-card">
          <div class="property-image">
            <img src="${property.img}" alt="${property.title}" loading="lazy">
            <div class="property-badge">${property.type}</div>
            <div class="property-overlay">
              <button class="btn btn-outline btn-sm">Xem chi tiết</button>
            </div>
          </div>
          <div class="property-content">
            <h5 class="property-title">${property.title}</h5>
            <div class="property-location">
              <i class="bx bx-map"></i>
              <span>${property.location}</span>
            </div>
            <div class="property-details">
              <div class="property-detail">
                <i class="bx bx-area"></i>
                <span>${property.area} m²</span>
              </div>
              <div class="property-price">
                <i class="bx bx-money"></i>
                <span>${property.price} tỷ</span>
              </div>
            </div>
            <p class="property-desc">${property.desc}</p>
            <div class="property-actions">
              <button class="btn btn-primary">Liên hệ ngay</button>
              <button class="btn btn-outline">
                <i class="bx bx-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Reinitialize swiper
  if (propertiesSwiper) {
    propertiesSwiper.update();
  }
}

function handleContactForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  // Simulate form submission
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin me-2"></i>Đang gửi...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    e.target.reset();
    showToast('Tin nhắn đã được gửi thành công!');
    
    // Track form submission
    trackEvent('contact_form_submit', { 
      method: 'main_contact_form',
      timestamp: new Date().toISOString()
    });
  }, 2000);
}

// ====== CONTACT FORM INTERACTIONS ======
function initializeContactFormInteractions(contactSection) {
  const contactForm = contactSection.querySelector('.contact-form');
  const formInputs = contactSection.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  const contactItems = contactSection.querySelectorAll('.contact-item');
  const socialLinks = contactSection.querySelectorAll('.social-link');
  
  // Enhanced form interactions
  formInputs.forEach(input => {
    // Focus effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
      gsap.to(input, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    // Blur effect
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      gsap.to(input, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    // Real-time validation feedback
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('valid');
      } else {
        input.parentElement.classList.remove('valid');
        input.parentElement.classList.add('error');
      }
    });
  });
  
  // Contact item interactions
  contactItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    // Click tracking for contact items
    item.addEventListener('click', (e) => {
      const contactType = item.querySelector('.contact-details h6').textContent.toLowerCase();
      trackEvent('contact_item_click', { 
        type: contactType,
        method: 'main_contact_section'
      });
      
      // Add ripple effect
      createContactRipple(e, item);
    });
  });
  
  // Social link interactions
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.querySelector('i').className.split(' ').pop().replace('bi-', '');
      
      // Track social link clicks
      trackEvent('social_link_click', { 
        platform: platform,
        section: 'contact'
      });
      
      // Add ripple effect
      createContactRipple(e, link);
      
      // Simulate opening link after animation
      setTimeout(() => {
        // window.open(link.href, '_blank');
        showToast(`Chuyển hướng đến ${platform}...`, 'info');
      }, 300);
    });
  });
  
  // Form submission with enhanced effects
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Add submit animation
      const submitButton = contactForm.querySelector('button[type="submit"]');
      gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      
      // Call original handler
      handleContactForm(e);
    });
  }
}

// Create ripple effect for contact interactions
function createContactRipple(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(191, 167, 106, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: contactRipple 0.6s ease-out;
    pointer-events: none;
    z-index: 10;
  `;
  
  // Ensure element has relative positioning
  const originalPosition = element.style.position;
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
    if (!originalPosition) {
      element.style.position = '';
    }
  }, 600);
}

// ====== FLOATING CONTACT ======
function initializeFloatingContact() {
  const floatingContact = document.querySelector('.floating-contact');
  const contactToggle = document.querySelector('.contact-toggle');
  const contactOptions = document.querySelectorAll('.contact-option');
  
  if (contactToggle && floatingContact) {
    // Toggle contact options visibility
    contactToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingContact.classList.toggle('active');
      
      // Add some visual feedback
      if (floatingContact.classList.contains('active')) {
        // Stop the floating animation temporarily
        contactToggle.style.animation = 'none';
      } else {
        // Resume floating animation
        contactToggle.style.animation = 'float 3s ease-in-out infinite';
      }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!floatingContact.contains(e.target)) {
        floatingContact.classList.remove('active');
        contactToggle.style.animation = 'float 3s ease-in-out infinite';
      }
    });
    
    // Track clicks on contact options
    contactOptions.forEach((option, index) => {
      option.addEventListener('click', (e) => {
        const type = option.classList.contains('phone') ? 'phone' : 
                    option.classList.contains('zalo') ? 'zalo' : 'messenger';
        
        // Analytics tracking
        trackEvent('contact_click', { type, method: 'floating_contact' });
        
        // Add ripple effect
        createRipple(e, option);
        
        // Close the menu after a short delay
        setTimeout(() => {
          floatingContact.classList.remove('active');
          contactToggle.style.animation = 'float 3s ease-in-out infinite';
        }, 150);
      });
    });
  }
}

// Create ripple effect for contact options
function createRipple(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(191, 167, 106, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
    z-index: 10;
  `;
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// ====== LAZY LOADING ======
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src || img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// ====== UTILITY FUNCTIONS ======
function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  
  let icon = 'bx-check-circle';
  if (type === 'error') icon = 'bx-error-circle';
  else if (type === 'info') icon = 'bx-info-circle';
  
  toast.innerHTML = `
    <div class="toast-content">
      <i class="bx ${icon}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(toast);
  
  // Animate in
  gsap.fromTo(toast, 
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 0.3 }
  );
  
  // Remove after delay
  setTimeout(() => {
    gsap.to(toast, {
      opacity: 0,
      y: -50,
      duration: 0.3,
      onComplete: () => toast.remove()
    });
  }, 3000);
}

// ====== RESPONSIVE HANDLING ======
function handleResize() {
  const headerNav = document.querySelector('.header-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (window.innerWidth <= 768) {
    // Mobile-specific adjustments
    if (fullPageInstance) {
      fullPageInstance.setAutoScrolling(false);
      fullPageInstance.setFitToSection(false);
    }
  } else {
    // Desktop-specific adjustments
    if (fullPageInstance) {
      fullPageInstance.setAutoScrolling(true);
      fullPageInstance.setFitToSection(true);
    }
    
    // Close mobile menu when switching to desktop
    if (headerNav && menuToggle) {
      headerNav.classList.remove('mobile-active');
      menuToggle.classList.remove('active');
    }
  }
}

window.addEventListener('resize', handleResize);

// ====== PERFORMANCE OPTIMIZATION ======
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ====== ERROR HANDLING ======
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // You can add error reporting here
});

// ====== ANALYTICS & TRACKING ======
function trackEvent(eventName, properties = {}) {
  // Placeholder for analytics tracking
  console.log('Event tracked:', eventName, properties);
  // You can integrate with Google Analytics, Facebook Pixel, etc.
}
