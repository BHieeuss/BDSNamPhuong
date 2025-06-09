/**
 * Modern Real Estate Website Script
 * Enhanced with fullPage.js, Swiper.js, GSAP animations, and smooth interactions
 */

// ====== GLOBAL VARIABLES ======
let fullPageInstance = null;
let propertiesSwiper = null;
let isLoading = true;

// Optimized performance tracking
const scrollObservers = new Map();
const loadedImages = new Set();

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
  // Khởi tạo theo thứ tự ưu tiên
  initializeLoading();
  initializeGSAP();
  initializeBackgroundSlideshow();
  
  // Khởi tạo các components khác sau một delay nhỏ
  setTimeout(() => {
    initializeFullPage();
    initializeSwiper();
    initializeNavigation();
    initializeForms();
    initializeFloatingContact();
    initializeLazyLoading();
    
    // Finish loading cuối cùng
    finishLoading();
  }, 1000); // Giảm từ 1500ms xuống 1000ms
  
  // Thêm performance monitoring
  window.addEventListener('load', () => {
    // Đảm bảo ScrollTrigger được refresh sau khi tất cả resources đã load
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });
});

// ====== LOADING ANIMATION ======
function initializeLoading() {
  const progressBar = document.querySelector('.progress-bar');
  const loadingText = document.querySelector('.loading-text');
  let progress = 0;
  let isLoadingComplete = false;
  
  // Tạo hiệu ứng loading text động
  const loadingMessages = [
    'Đang tải...',
  ];
  let messageIndex = 0;
  
  // Progress animation với tốc độ thông minh hơn
  const progressInterval = setInterval(() => {
    if (!isLoadingComplete) {
      // Tốc độ loading thay đổi theo progress
      const speedMultiplier = progress < 50 ? 1.5 : progress < 80 ? 1 : 0.5;
      progress += (Math.random() * 8 + 2) * speedMultiplier;
      
      if (progress >= 100) {
        progress = 100;
        isLoadingComplete = true;
        clearInterval(progressInterval);
      }
      
      progressBar.style.width = progress + '%';
      
      // Thay đổi text theo progress
      const newMessageIndex = Math.floor((progress / 100) * loadingMessages.length);
      if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
        messageIndex = newMessageIndex;
        if (loadingText) {
          gsap.to(loadingText, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              loadingText.textContent = loadingMessages[messageIndex];
              gsap.to(loadingText, {
                opacity: 1,
                duration: 0.2
              });
            }
          });
        }
      }
    }
  }, 80); // Giảm interval để mượt hơn
  
  // Đảm bảo loading hoàn tất sau thời gian tối đa
  setTimeout(() => {
    if (!isLoadingComplete) {
      progress = 100;
      isLoadingComplete = true;
      clearInterval(progressInterval);
      progressBar.style.width = '100%';
    }
  }, 2000);
}

function finishLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingContent = document.querySelector('.loading-content');
  
  // Đợi một chút để đảm bảo tất cả resources đã load
  setTimeout(() => {
    // Animate loading content trước
    gsap.to(loadingContent, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Sau đó fade out toàn bộ overlay
        gsap.to(loadingOverlay, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            loadingOverlay.style.display = 'none';
            isLoading = false;
            
            // Khởi động animations sau khi loading hoàn tất
            setTimeout(() => {
              startAnimations();
              // Refresh ScrollTrigger sau khi tất cả đã ổn định
              ScrollTrigger.refresh();
            }, 100);
          }
        });
      }
    });
  }, 300);
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
  
  // Initialize scroll-triggered animations for all elements with data-delay
  initializeScrollAnimations();
}

function initializeScrollAnimations() {
  // Set initial state cho tất cả animated elements
  gsap.set('[data-delay]', {
    opacity: 0,
    y: 60,
    scale: 0.9
  });
  
  // Tạo một object để theo dõi trạng thái animation của mỗi section
  const sectionStates = new Map();
  
  // Create scroll-triggered animations for each section
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    const animatedElements = section.querySelectorAll('[data-delay]');
    
    if (animatedElements.length > 0) {
      // Khởi tạo trạng thái cho section này
      sectionStates.set(section, { animated: false, isVisible: false });
      
      // Create ScrollTrigger với show/hide animation mượt mà
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%", 
        end: "bottom 25%",
        toggleActions: "play reverse play reverse", // Animation khi vào và ra
        onEnter: () => {
          const state = sectionStates.get(section);
          state.isVisible = true;
          state.animated = true;
          
          // Show animation với stagger mượt mà
          animatedElements.forEach((element, i) => {
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            
            gsap.to(element, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: (delay / 1000) + (i * 0.1),
              ease: "power2.out"
            });
          });
        },
        onLeave: () => {
          const state = sectionStates.get(section);
          state.isVisible = false;
          
          // Hide animation mượt mà khi rời khỏi viewport
          gsap.to(animatedElements, {
            opacity: 0,
            y: -40,
            scale: 0.95,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          const state = sectionStates.get(section);
          state.isVisible = true;
          
          // Show animation mượt mà khi scroll back
          animatedElements.forEach((element, i) => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: i * 0.05, // Delay ngắn hơn khi scroll back
              ease: "power2.out"
            });
          });
        },
        onLeaveBack: () => {
          const state = sectionStates.get(section);
          state.isVisible = false;
          
          // Hide animation khi scroll up ra khỏi viewport
          gsap.to(animatedElements, {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.in"
          });
        }
      });
    }
  });
  
  // Add special animations for specific elements
  initializeSpecialAnimations();
}

function initializeSpecialAnimations() {
  // Animation states are now tracked globally
  
  // Animate area cards với show/hide effect
  const areaCards = document.querySelectorAll('.area-card');
  if (areaCards.length > 0) {
    // Set initial state
    gsap.set(areaCards, {
      opacity: 0,
      y: 60,
      scale: 0.8
    });

    ScrollTrigger.create({
      trigger: '.areas-section',
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        gsap.to(areaCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to(areaCards, {
          opacity: 0,
          y: -40,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(areaCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(areaCards, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in"
        });
      }
    });
  }
  
  // Animate contact items với show/hide effect
  const contactItems = document.querySelectorAll('.contact-item');
  if (contactItems.length > 0) {
    // Set initial state
    gsap.set(contactItems, {
      opacity: 0,
      x: -40,
      scale: 0.9
    });

    ScrollTrigger.create({
      trigger: '.contact-section',
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        gsap.to(contactItems, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to(contactItems, {
          opacity: 0,
          x: -30,
          scale: 0.95,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(contactItems, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(contactItems, {
          opacity: 0,
          x: 30,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in"
        });
      }
    });
  }
  
  // Animate map container với show/hide effect
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    // Set initial state
    gsap.set(mapContainer, {
      opacity: 0,
      scale: 0.9,
      y: 40
    });

    ScrollTrigger.create({
      trigger: '.map-section',
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        gsap.to(mapContainer, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to(mapContainer, {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 0.5,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(mapContainer, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(mapContainer, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });
  }
  
  // Animate search section với show/hide effect
  const searchContent = document.querySelector('.search-content');
  if (searchContent) {
    // Set initial state
    gsap.set(searchContent, {
      opacity: 0,
      y: 50,
      scale: 0.95
    });

    ScrollTrigger.create({
      trigger: '.search-section',
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        gsap.to(searchContent, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to(searchContent, {
          opacity: 0,
          y: -40,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(searchContent, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(searchContent, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });
  }
}

function startAnimations() {
  // Đảm bảo hero section không bị conflict với scroll animations
  const heroElements = document.querySelectorAll('.hero-section [data-delay]');
  
  // Chỉ animate hero nếu nó đang ở viewport
  if (window.scrollY < window.innerHeight / 2) {
    heroElements.forEach((element) => {
      const delay = parseInt(element.getAttribute('data-delay')) || 0;
      
      // Set initial state mượt mà hơn
      gsap.set(element, {
        opacity: 0,
        y: 40,
        scale: 0.95
      });
      
      gsap.to(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: (delay + 300) / 1000, // Giảm delay để nhanh hơn
        ease: "power2.out"
      });
    });
    
    // Animate scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.fromTo(scrollIndicator, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power2.out"
      });
    }
  }
}

// ====== FULLPAGE.JS INITIALIZATION ======
// Removed - No longer using fullPage.js for section transitions
function initializeFullPage() {
  // Disabled fullPage functionality to use normal scrolling
}

// ====== NAVIGATION ======
function initializeNavigation() {
  // Simplified navigation without fullPage.js
  // Mobile hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle menu visibility
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      // Track menu toggle event
      trackEvent('mobile_menu_toggle', { 
        isOpen: mobileMenu.classList.contains('active')
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ====== Smooth Scroll for Header & Mobile Menu ======
  function scrollToSection(e, selector) {
    const target = document.querySelector(selector);
    if (target) {
      e.preventDefault();
      const header = document.querySelector('.floating-header');
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  // Header nav links
  document.querySelectorAll('.header-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        scrollToSection(e, href);
        document.querySelectorAll('.header-nav .nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  // Mobile nav links
  document.querySelectorAll('.mobile-nav .mobile-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        scrollToSection(e, href);
        document.querySelectorAll('.mobile-nav .mobile-nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Close mobile menu after click
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// ====== SLIDE ANIMATIONS ======
// Removed slide transition animations - keeping only lazy loading

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
        </div>      </div>
    </div>
  `).join('');
  
  // Initialize property card animations after rendering
  initializePropertyAnimation();
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
  // Scroll to properties section using smooth scroll
  const propertiesSection = document.querySelector('[data-anchor="properties"]');
  if (propertiesSection) {
    propertiesSection.scrollIntoView({ behavior: 'smooth' });
  }
  
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
  const images = document.querySelectorAll('img[loading="lazy"], img[data-src]');
  const loadedImages = new Set(); // Theo dõi images đã load
  
  if ('IntersectionObserver' in window) {
    // Observer cho việc load hình ảnh
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const imgSrc = img.dataset.src || img.src;
          
          // Kiểm tra xem image đã được load chưa
          if (!loadedImages.has(imgSrc) && imgSrc) {
            loadedImages.add(imgSrc);
            
            // Set initial state
            gsap.set(img, { opacity: 0, scale: 1.1 });
            
            // Load image với placeholder
            const tempImg = new Image();
            tempImg.onload = () => {
              img.src = imgSrc;
              img.classList.remove('lazy');
              
              // Fade in animation với scale effect
              gsap.to(img, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
              });
            };
            tempImg.onerror = () => {
              // Nếu load lỗi, vẫn hiển thị với opacity thấp
              gsap.to(img, {
                opacity: 0.3,
                scale: 1,
                duration: 0.3
              });
            };
            tempImg.src = imgSrc;
            
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '100px 0px', // Load sớm hơn
      threshold: 0.1
    });

    // Observer cho việc show/hide hình ảnh khi scroll
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const img = entry.target;
        
        if (entry.isIntersecting) {
          // Show image khi vào viewport
          gsap.to(img, {
            opacity: loadedImages.has(img.dataset.src || img.src) ? 1 : 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          // Hide image khi ra khỏi viewport (tuỳ chọn)
          // Comment dòng dưới nếu không muốn ẩn hình ảnh
          gsap.to(img, {
            opacity: 0.7,
            scale: 0.98,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      });
    }, {
      rootMargin: '-50px 0px',
      threshold: 0.2
    });
    
    images.forEach(img => {
      // Observe cho lazy loading
      if (!loadedImages.has(img.src) && !loadedImages.has(img.dataset.src)) {
        imageObserver.observe(img);
      }
      
      // Observe cho visibility effects
      visibilityObserver.observe(img);
    });
  } else {
    // Fallback cho browsers không hỗ trợ IntersectionObserver
    images.forEach(img => {
      const imgSrc = img.src || img.dataset.src;
      if (imgSrc) {
        img.src = imgSrc;
        img.classList.remove('lazy');
        gsap.set(img, { opacity: 1, scale: 1 });
      }
    });
  }
}

// ====== PROPERTY ANIMATIONS ======
function initializePropertyAnimation() {
  // Only create animation if property cards exist
  const propertyCards = document.querySelectorAll('.property-card');
  if (propertyCards.length === 0) {
    return; // No property cards found, skip animation setup
  }

  // Set initial state for property cards
  gsap.set(propertyCards, {
    opacity: 0,
    y: 50,
    scale: 0.9
  });

  // Create scroll-triggered animation for property cards với show/hide effect
  ScrollTrigger.create({
    trigger: '.properties-section',
    start: "top 75%",
    end: "bottom 25%",
    toggleActions: "play reverse play reverse",
    onEnter: () => {
      gsap.to(propertyCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    },
    onLeave: () => {
      gsap.to(propertyCards, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.in"
      });
    },
    onEnterBack: () => {
      gsap.to(propertyCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(propertyCards, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.in"
      });
    }
  });
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
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  
  // Close mobile menu when switching to desktop
  if (window.innerWidth > 768) {
    if (mobileMenu && menuToggle) {
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

window.addEventListener('resize', handleResize);

// ====== PERFORMANCE OPTIMIZATION ======
// Debounce function cho scroll events
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

// Throttle function cho high-frequency events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
  // Chỉ refresh ScrollTrigger khi cần thiết
  if (!isLoading) {
    ScrollTrigger.refresh();
  }
}, 250);

// Add scroll listener chỉ khi cần thiết
let scrollListenerAdded = false;
function addScrollOptimization() {
  if (!scrollListenerAdded) {
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    scrollListenerAdded = true;
  }
}

// ====== PERFORMANCE OPTIMIZATIONS ======
// Batch ScrollTrigger refresh
let refreshTimeout;
function batchScrollTriggerRefresh() {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

// Optimized visibility check
function isElementInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return (
    rect.bottom >= viewHeight * threshold &&
    rect.top <= viewHeight * (1 - threshold)
  );
}

// Memory cleanup for animations
function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => {
    if (!trigger.trigger || !document.contains(trigger.trigger)) {
      trigger.kill();
    }
  });
}

// Run cleanup periodically
setInterval(cleanupAnimations, 30000); // Every 30 seconds

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
