// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===== LOADER =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Initialize animations after loader
        setTimeout(() => {
            initAnimations();
        }, 500);
    }, 2500);
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX SCROLLING =====
function initParallax() {
    // Hero parallax
    gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Products section parallax
    gsap.to('.parallax-products-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.products-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== GSAP ANIMATIONS =====
function initAnimations() {
    // Collection cards animation
    gsap.from('.collection-card', {
        scrollTrigger: {
            trigger: '.collections-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Product cards animation
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.products-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // About section animation
    gsap.from('.about-img', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Stats animation
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isPlusSign = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        const current = Math.ceil(this.targets()[0].textContent);
                        if (isPercentage) {
                            stat.textContent = current + '%';
                        } else if (isPlusSign) {
                            stat.textContent = current.toLocaleString() + '+';
                        } else {
                            stat.textContent = current.toLocaleString();
                        }
                    }
                });
            }
        });
    });
    
    // Testimonials animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Contact section animation
    gsap.from('.contact-info-item', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Footer animation
    gsap.from('.footer-section > .container > .row > div', {
        scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Initialize parallax
    initParallax();
}

// ===== 3D TILT EFFECT FOR COLLECTION CARDS =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
            duration: 0.3,
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out'
        });
    });
});

// ===== PRODUCT HOVER EFFECTS =====
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.product-image'), {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.product-image'), {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// ===== ADD TO CART ANIMATION =====
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });
        
        // Change button text temporarily
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.background = 'var(--primary-sage)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// ===== FORM SUBMISSION =====
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Animate button
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.background = 'var(--primary-sage)';
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// ===== NEWSLETTER FORM =====
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input = this.querySelector('input');
    const button = this.querySelector('button');
    
    gsap.to(button, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
    });
    
    setTimeout(() => {
        input.value = '';
        input.placeholder = 'Thanks for subscribing!';
        
        setTimeout(() => {
            input.placeholder = 'Enter your email';
        }, 3000);
    }, 500);
});

// ===== PARALLAX MOUSE MOVEMENT =====
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    gsap.to('.parallax-bg::before', {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out'
    });
});

// ===== SCROLL REVEAL FOR SECTION TITLES =====
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// ===== CURSOR CUSTOM EFFECT (Optional Enhancement) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-sage);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

// Show custom cursor on desktop
if (window.innerWidth > 991) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .product-card, .collection-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Perform scroll-based operations here if needed
    });
});

// ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.product-card, .collection-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

console.log('🌊 AQUA LUXE - Website Initialized Successfully');
