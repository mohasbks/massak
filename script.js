// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar
    initializeNavbar();
    
    // Initialize ads tabs
    initializeAdsTabs();
    
    // Initialize premium ads tabs
    initializePremiumAdsTabs();
    
    // Initialize featured ads tabs
    initializeFeaturedAdsTabs();
    
    // Initialize statistics counter
    initStatisticsCounter();
    
    // Force statistics animation after a short delay
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0) {
            console.log('Forcing statistics animation...');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current).toLocaleString();
                }, 16);
            });
        }
    }, 1000);
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize advanced animations
    initializeAdvancedAnimations();
    
    // Initialize property comparison
    initializeComparison();
    
    // Initialize advanced search
    initializeAdvancedSearch();
    
    // Enhance property cards
    enhancePropertyCards();
    
    console.log('🎉 جميع المميزات تم تحميلها بنجاح مع التحديثات الجديدة!');
});

// Navbar Functionality
function initializeNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Search Tabs Functionality
function initSearchTabs() {
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // You can add different search functionality here based on tab
            const tabType = tab.getAttribute('data-tab');
            console.log(`Search type changed to: ${tabType}`);
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
    console.log('Initializing premium ads tabs...');
    const tabs = document.querySelectorAll('.premium-tab');
    const panels = document.querySelectorAll('.premium-panel');
    
    console.log('Found premium tabs:', tabs.length);
    console.log('Found premium panels:', panels.length);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Premium tab clicked:', tab.dataset.tab);
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${tab.dataset.tab}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                console.log('Activated panel:', targetPanel.id);
                
                // Add animation to cards
                const cards = targetPanel.querySelectorAll('.premium-card');
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            } else {
                console.log('Panel not found for:', tab.dataset.tab);
            }
        });
    });

    // Add your ad button functionality
    const addAdBtn = document.querySelector('.add-ad-btn');
    if (addAdBtn) {
        addAdBtn.addEventListener('click', () => {
            // Add loading animation
            addAdBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            addAdBtn.disabled = true;
            
            setTimeout(() => {
                addAdBtn.innerHTML = 'أضف إعلانك الآن';
                addAdBtn.disabled = false;
                alert('سيتم توجيهك إلى صفحة إضافة الإعلان');
            }, 2000);
        });
    }

    // Premium card interactions
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Ads Tabs Functionality
function initAdsTabs() {
    const adsTabs = document.querySelectorAll('.ads-tab');
    const adsPanels = document.querySelectorAll('.ads-panel');
    
    adsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            adsTabs.forEach(t => t.classList.remove('active'));
            adsPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(`${targetTab}-panel`).classList.add('active');
            
            // Add fade animation
            const activePanel = document.getElementById(`${targetTab}-panel`);
            activePanel.style.opacity = '0';
            setTimeout(() => {
                activePanel.style.opacity = '1';
            }, 100);
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
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number with commas
                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
        
        hasAnimated = true;
    }

    // Trigger animation when statistics section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        observer.observe(statsSection);
        // Also trigger immediately if section is already visible
        setTimeout(() => {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounters();
            }
        }, 500);
    } else {
        console.log('Statistics section not found');
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



// Advanced Search Filters
function initializeAdvancedSearch() {
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
        // Add favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '🤍';
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(favoriteBtn);
        });
        
        card.appendChild(favoriteBtn);
        
        // Add quick view button
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'quick-view-btn';
        quickViewBtn.textContent = 'عرض سريع';
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showQuickView(card);
        });
        
        card.appendChild(quickViewBtn);
    });
}

function toggleFavorite(btn) {
    const isFavorite = btn.innerHTML === '❤️';
    btn.innerHTML = isFavorite ? '🤍' : '❤️';
    btn.classList.toggle('favorited', !isFavorite);
    
    const message = isFavorite ? 'تم إزالة العقار من المفضلة' : 'تم إضافة العقار للمفضلة';
    showNotification(message, 'success');
}

function showQuickView(card) {
    const title = card.querySelector('h3')?.textContent || 'عقار';
    const price = card.querySelector('.price')?.textContent || 'غير محدد';
    const image = card.querySelector('img')?.src || '';
    
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h3>${title}</h3>
                <span class="modal-price">${price}</span>
            </div>
            <div class="modal-body">
                <img src="${image}" alt="${title}" class="modal-image">
                <div class="modal-details">
                    <p>تفاصيل العقار ستظهر هنا...</p>
                    <button class="btn btn-primary">اتصل الآن</button>
                    <button class="btn btn-secondary">جدولة زيارة</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

// Console welcome message
console.log('%c🏠 مرحباً بك في مسعاك العقارية! 🏠', 'color: #00A67E; font-size: 20px; font-weight: bold;');
console.log('%cتم تحميل الموقع بنجاح مع المميزات الجديدة ✨', 'color: #008B6B; font-size: 14px;');
