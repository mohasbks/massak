// Hero Section Functionality
function initializeHeroSection() {
    // Hero Search Functionality
    const searchInput = document.querySelector('.hero-search-input');
    const searchBtn = document.querySelector('.hero-search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchValue = searchInput.value.trim();
            if (searchValue) {
                // Add search animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    console.log('البحث عن:', searchValue);
                    // Here you would implement actual search
                }, 200);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Quick Filters Functionality
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active from all
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // Animation effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Animate hero stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            // Start animation when in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateNumber();
                    observer.disconnect();
                }
            });
            
            observer.observe(stat);
        });
    };
    
    animateNumbers();
}

// News Section Animation
function initializeNewsSection() {
    const newsCards = document.querySelectorAll('.news-card');
    
    // Intersection Observer for news cards animation
    const newsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                newsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    // Set initial state and observe
    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        newsObserver.observe(card);
    });
    
    // Add hover effect for news links
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.news-card');
            card.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                card.style.transform = '';
                // Navigate to news detail (placeholder)
                console.log('Navigate to news detail');
            }, 200);
        });
    });
    
    // Featured card special animation
    const featuredCard = document.querySelector('.news-card.featured');
    if (featuredCard) {
        featuredCard.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #004d3d 0%, #006b54 100%)';
        });
        
        featuredCard.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #006b54 0%, #004d3d 100%)';
        });
    }
}

// Simple Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) return;
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Function to hide loading screen
    function hideLoadingScreen() {
        if (!loadingScreen) return;
        
        loadingScreen.style.opacity = '0';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Remove from DOM after fade out
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.remove();
            }
        }, 300);
    }
    
    // Hide loading screen when page is loaded
    if (document.readyState === 'complete') {
        setTimeout(hideLoadingScreen, 800);
    } else {
        window.addEventListener('load', () => {
            setTimeout(hideLoadingScreen, 800);
        });
    }
    
    // Fallback: hide after 3 seconds
    setTimeout(hideLoadingScreen, 3000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For stagger animations on cards
                const staggerElements = entry.target.querySelectorAll('.stagger-animate');
                staggerElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and animated elements
    const animatedElements = document.querySelectorAll('.section-animate, .fade-up, .fade-left, .fade-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (!section.classList.contains('hero')) {
            section.classList.add('section-animate');
        }
    });
    
    // Add animation to specific elements
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-up');
    });
    
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.classList.add('fade-up', 'stagger-animate');
    });
    
    document.querySelectorAll('.property-card').forEach((el, index) => {
        el.classList.add('scale-in', 'stagger-animate');
    });
    
    document.querySelectorAll('.premium-card').forEach((el, index) => {
        el.classList.add('fade-up', 'stagger-animate');
    });
    
    document.querySelectorAll('.testimonial-card').forEach((el, index) => {
        el.classList.add('fade-' + (index % 2 === 0 ? 'left' : 'right'));
    });
    
    document.querySelectorAll('.news-card').forEach((el, index) => {
        el.classList.add('fade-up', 'stagger-animate');
    });
    
    // Re-observe elements after adding classes
    document.querySelectorAll('.section-animate, .fade-up, .fade-left, .fade-right, .scale-in')
        .forEach(el => observer.observe(el));
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all components
    initializeNavbar();
    initializeHeroSection();
    initializeSearchTabs();
    initializePremiumAdsTabs();
    initializeFeaturedAds();
    initializeStatistics();
    initializeTestimonials();
    initializeNewsSection();
    initializeScrollAnimations();
    
    console.log('🎉 جميع المميزات تم تحميلها بنجاح!');
});

// Navbar Functionality
function initializeNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    }
                    if (index === 1) {
                        span.style.opacity = '0';
                    }
                    if (index === 2) {
                        span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
                // Reset hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = navbar ? navbar.offsetHeight : 70;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Search Tabs Functionality - Fixed
function initializeSearchTabs() {
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Animation effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            const tabType = this.textContent.trim();
            console.log(`تم التبديل إلى: ${tabType}`);
        });
    });

    // Search form submission
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get form values
            const location = document.querySelector('.search-field select:nth-child(1)')?.value;
            const propertyType = document.querySelector('.search-field select:nth-child(2)')?.value;
            const budget = document.querySelector('.search-field select:nth-child(3)')?.value;
            
            // Add search animation
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';
            
            setTimeout(() => {
                searchBtn.innerHTML = '<i class="fas fa-search"></i> بحث';
                alert('تم البحث بنجاح! سيتم توجيهك إلى صفحة النتائج.');
            }, 2000);
        });
    }
}

// Premium Ads Tabs Functionality
function initializePremiumAdsTabs() {
    const tabs = document.querySelectorAll('.premium-tab');
    const panels = document.querySelectorAll('.premium-panel');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${this.dataset.tab}-panel`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active');
                
                // Animate cards in the panel
                const cards = targetPanel.querySelectorAll('.premium-card');
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    });
    
    // Add hover effects to premium cards
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 107, 84, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add click handler for premium buttons
    const premiumBtns = document.querySelectorAll('.premium-btn');
    premiumBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.premium-card');
            const title = card.querySelector('h3').textContent;
            showNotification(`تم فتح تفاصيل: ${title}`, 'success');
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Add slide animation
        testimonialCards[index].style.opacity = '0';
        testimonialCards[index].style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            testimonialCards[index].style.opacity = '1';
            testimonialCards[index].style.transform = 'translateX(0)';
        }, 100);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlider();
            startSlider();
        });
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    currentSlide = currentSlide === 0 ? testimonialCards.length - 1 : currentSlide - 1;
                    showSlide(currentSlide);
                }
                stopSlider();
                startSlider();
            }
        }
    }

    // Pause on hover
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopSlider);
        testimonialsSection.addEventListener('mouseleave', startSlider);
    }

    // Start the slider
    startSlider();
}

// Statistics Counter Animation
function initializeStatistics() {
    const statsSection = document.querySelector('.statistics');
    if (!statsSection) return;
    
    const stats = statsSection.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                const text = stat.textContent.replace('+', '');
                const target = parseInt(text) || 1000;
                animateCounter(stat, target);
            });
        }
    }, { threshold: 0.3 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .property-card, .ad-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Property Card Interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('property-btn')) {
        e.preventDefault();
        
        // Add loading state
        const btn = e.target;
        const originalText = btn.textContent;
        btn.textContent = 'جاري التحميل...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('سيتم توجيهك إلى صفحة تفاصيل العقار');
        }, 1500);
    }
});

// Form Interactions
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
        
        // Simple form validation and submission
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        e.target.reset();
    }
});

// Button Hover Effects
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('btn')) {
        e.target.style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('btn')) {
        e.target.style.transform = 'translateY(0)';
    }
});

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// initLazyLoading();

// Utility Functions
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

// Scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2c7a7b, #38a169);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(44, 122, 123, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(44, 122, 123, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 15px rgba(44, 122, 123, 0.3)';
    });
}

// Initialize scroll to top
addScrollToTop();

// Initialize service cards animations
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length === 0) return;
    
    serviceCards.forEach((card, index) => {
        // Add initial animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// Call service cards initialization
setTimeout(() => {
    animateServiceCards();
}, 500);

// Performance optimization
window.addEventListener('load', () => {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Advanced Animations
function initAdvancedAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Staggered animations for feature cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.feature-card, .property-card, .premium-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fade-in', 'visible');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    // Observe sections for staggered animations
    const sections = document.querySelectorAll('.features, .properties, .premium-ads');
    sections.forEach(section => observer.observe(section));

    // Floating animation for premium badges
    const premiumBadges = document.querySelectorAll('.premium-badge');
    premiumBadges.forEach(badge => {
        badge.style.animation = 'float 3s ease-in-out infinite';
    });

    // Enhanced testimonial animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('transitionend', () => {
            if (card.classList.contains('active')) {
                card.style.animation = 'fadeInUp 0.8s ease-out';
            }
        });
    });

    // Smooth reveal animations for statistics
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInRight 0.8s ease-out';
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statsObserver.observe(card));

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn, .premium-btn, .property-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        });
    });

    // Magnetic effect for premium cards
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `
                translateY(-15px) 
                rotateX(${deltaY * 5}deg) 
                rotateY(${deltaX * 5}deg) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Text typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Enhanced Premium Card Interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('premium-btn')) {
        e.preventDefault();
        
        // Add ripple effect
        const btn = e.target;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
        
        // Button loading state
        const originalText = btn.textContent;
        btn.textContent = 'جاري التحميل...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('سيتم توجيهك إلى صفحة تفاصيل العقار المميز');
        }, 2000);
    }
});

// Property Comparison Tool
let selectedProperties = [];

function initializeComparison() {
    return; // Feature disabled
    const startBtn = document.getElementById('start-comparison');
    const propertyCards = document.querySelectorAll('.property-card');
    
    // Add comparison checkboxes to property cards
    propertyCards.forEach((card, index) => {
        const checkbox = document.createElement('div');
        checkbox.className = 'comparison-checkbox';
        checkbox.innerHTML = `
            <input type="checkbox" id="compare-${index}" data-property="${index}">
            <label for="compare-${index}">مقارنة</label>
        `;
        card.appendChild(checkbox);
        
        const checkboxInput = checkbox.querySelector('input');
        checkboxInput.addEventListener('change', (e) => {
            handlePropertySelection(e, index, card);
        });
    });
    
    startBtn?.addEventListener('click', showComparisonTable);
}

function handlePropertySelection(e, index, card) {
    const isChecked = e.target.checked;
    const propertyData = extractPropertyData(card);
    
    if (isChecked && selectedProperties.length < 3) {
        selectedProperties.push({ index, data: propertyData });
        card.classList.add('selected-for-comparison');
    } else if (!isChecked) {
        selectedProperties = selectedProperties.filter(p => p.index !== index);
        card.classList.remove('selected-for-comparison');
    } else {
        e.target.checked = false;
        showNotification('يمكنك مقارنة 3 عقارات كحد أقصى', 'warning');
    }
    
    updateSelectionCounter();
}

function extractPropertyData(card) {
    return {
        title: card.querySelector('h3')?.textContent || 'عقار',
        price: card.querySelector('.price')?.textContent || 'غير محدد',
        location: card.querySelector('.location')?.textContent || 'غير محدد',
        area: card.querySelector('.area')?.textContent || 'غير محدد',
        rooms: card.querySelector('.rooms')?.textContent || 'غير محدد'
    };
}

function updateSelectionCounter() {
    const counter = document.querySelector('.selection-count');
    if (counter) {
        counter.textContent = `${selectedProperties.length} عقار محدد`;
    }
}

function showComparisonTable() {
    if (selectedProperties.length < 2) {
        showNotification('يجب اختيار عقارين على الأقل للمقارنة', 'warning');
        return;
    }
    
    const table = document.getElementById('comparison-table');
    const grid = table.querySelector('.comparison-grid');
    
    // Clear existing content except header
    const header = grid.querySelector('.comparison-row.header');
    grid.innerHTML = '';
    grid.appendChild(header);
    
    // Add comparison rows
    const features = ['السعر', 'الموقع', 'المساحة', 'عدد الغرف'];
    const dataKeys = ['price', 'location', 'area', 'rooms'];
    
    features.forEach((feature, i) => {
        const row = document.createElement('div');
        row.className = 'comparison-row';
        
        let rowHTML = `<div class="comparison-cell">${feature}</div>`;
        
        selectedProperties.forEach(property => {
            rowHTML += `<div class="comparison-cell">${property.data[dataKeys[i]]}</div>`;
        });
        
        // Fill empty cells if less than 3 properties
        for (let j = selectedProperties.length; j < 3; j++) {
            rowHTML += `<div class="comparison-cell">-</div>`;
        }
        
        row.innerHTML = rowHTML;
        grid.appendChild(row);
    });
    
    table.style.display = 'block';
    table.scrollIntoView({ behavior: 'smooth' });
}

// Advanced Search Filters (disabled)
function initializeFeaturedAds() {
    console.log('Featured ads initialized');
}

function initializeTestimonials() {
    console.log('Testimonials initialized');
}

function initializeAdvancedSearch() {
    return; // Feature removed
    console.log('Initializing advanced search...');
    
    const roomButtons = document.querySelectorAll('.room-btn');
    const areaMinSlider = document.getElementById('area-min');
    const areaMaxSlider = document.getElementById('area-max');
    const searchBtn = document.querySelector('.search-btn');
    const resetBtn = document.querySelector('.reset-btn');
    
    console.log('Found elements:', {
        roomButtons: roomButtons.length,
        areaMinSlider: !!areaMinSlider,
        areaMaxSlider: !!areaMaxSlider,
        searchBtn: !!searchBtn,
        resetBtn: !!resetBtn
    });
    
    // Room selection
    roomButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            roomButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            console.log('Selected rooms:', btn.dataset.rooms);
        });
    });
    
    // Area range sliders
    function updateAreaDisplay() {
        if (!areaMinSlider || !areaMaxSlider) return;
        
        const minValue = parseInt(areaMinSlider.value);
        const maxValue = parseInt(areaMaxSlider.value);
        
        // Ensure min is not greater than max
        if (minValue >= maxValue) {
            areaMinSlider.value = maxValue - 50;
        }
        
        const minDisplay = document.getElementById('area-min-value');
        const maxDisplay = document.getElementById('area-max-value');
        
        if (minDisplay) minDisplay.textContent = areaMinSlider.value;
        if (maxDisplay) maxDisplay.textContent = areaMaxSlider.value;
    }
    
    if (areaMinSlider) {
        areaMinSlider.addEventListener('input', updateAreaDisplay);
    }
    if (areaMaxSlider) {
        areaMaxSlider.addEventListener('input', updateAreaDisplay);
    }
    
    // Initialize display
    updateAreaDisplay();
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performAdvancedSearch();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetFilters();
        });
    }
}

function performAdvancedSearch() {
    const filters = collectFilters();
    showNotification(`تم تطبيق ${Object.keys(filters).length} مرشح للبحث`, 'success');
    
    // Animate search button
    const btn = document.querySelector('.search-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
    
    console.log('Applied filters:', filters);
}

function collectFilters() {
    const filters = {};
    
    // Property types
    const propertyTypes = [];
    document.querySelectorAll('.checkbox-group input:checked').forEach(input => {
        propertyTypes.push(input.value);
    });
    if (propertyTypes.length > 0) filters.propertyTypes = propertyTypes;
    
    // Rooms
    const activeRoom = document.querySelector('.room-btn.active');
    if (activeRoom) filters.rooms = activeRoom.dataset.rooms;
    
    // Area
    const areaMin = document.getElementById('area-min')?.value;
    const areaMax = document.getElementById('area-max')?.value;
    if (areaMin && areaMax) {
        filters.area = { min: areaMin, max: areaMax };
    }
    
    // Features
    const features = [];
    document.querySelectorAll('.features-grid input:checked').forEach(input => {
        features.push(input.value);
    });
    if (features.length > 0) filters.features = features;
    
    return filters;
}

function resetFilters() {
    console.log('Resetting filters...');
    
    // Uncheck all checkboxes
    document.querySelectorAll('.checkbox-group input, .features-grid input').forEach(input => {
        input.checked = false;
    });
    
    // Reset room selection
    document.querySelectorAll('.room-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset sliders
    const areaMin = document.getElementById('area-min');
    const areaMax = document.getElementById('area-max');
    const minDisplay = document.getElementById('area-min-value');
    const maxDisplay = document.getElementById('area-max-value');
    
    if (areaMin) areaMin.value = 100;
    if (areaMax) areaMax.value = 500;
    if (minDisplay) minDisplay.textContent = '100';
    if (maxDisplay) maxDisplay.textContent = '500';
    
    showNotification('تم إعادة تعيين جميع المرشحات', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Enhanced property card interactions
function enhancePropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        // Add hover effect with smooth transition
        card.style.transition = 'all 0.3s ease';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 35px rgba(0, 107, 84, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click handler for property button
        const btn = card.querySelector('.property-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const title = card.querySelector('h3').textContent;
                showNotification(`جاري عرض تفاصيل: ${title}`, 'info');
                setTimeout(() => {
                    showQuickView(card);
                }, 500);
            });
        }
    });
    
    // Add animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    propertyCards.forEach(card => {
        observer.observe(card);
    });
}

function toggleFavorite(btn) {
    const isFavorite = btn.innerHTML === '❤️';
    btn.innerHTML = isFavorite ? '🤍' : '❤️';
    btn.classList.toggle('favorited', !isFavorite);
    
    showNotification(
        isFavorite ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
        'success'
    );
}

function showQuickView(card) {
    const title = card.querySelector('h3').textContent;
    const price = card.querySelector('.property-price').textContent;
    const location = card.querySelector('.property-location').textContent;
    const image = card.querySelector('.property-image img').src;
    
    // Create modal content
    const modalContent = `
        <div class="quick-view-modal">
            <div class="quick-view-content">
                <button class="close-modal">&times;</button>
                <img src="${image}" alt="${title}">
                <h2>${title}</h2>
                <p class="price">${price}</p>
                <p class="location">${location}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary">عرض التفاصيل</button>
                    <button class="btn btn-secondary">اتصل بنا</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Add close functionality
    const modal = document.querySelector('.quick-view-modal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Animate reason cards on scroll
function animateReasonCards() {
    const reasonCards = document.querySelectorAll('.reason-card');
    
    if (!reasonCards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    reasonCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Animate news cards on scroll
function animateNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    if (newsCards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
    
    // Add hover effects
    newsCards.forEach(card => {
        let isHovered = false;
        
        card.addEventListener('mouseenter', () => {
            if (!isHovered) {
                isHovered = true;
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 107, 84, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Add click handler for news links
    newsCards.forEach(card => {
        const newsLink = card.querySelector('.news-link');
        if (newsLink) {
            newsLink.addEventListener('click', (e) => {
                e.preventDefault();
                const title = card.querySelector('h3').textContent;
                showNotification(`جاري تحميل: ${title}`, 'info');
            });
        }
    });
}

// Console welcome message
console.log('%c🏠 مرحباً بك في مسعاك العقارية! 🏠', 'color: #00A67E; font-size: 20px; font-weight: bold;');
console.log('%cتم تحميل الموقع بنجاح مع المميزات الجديدة ✨', 'color: #008B6B; font-size: 14px;');
