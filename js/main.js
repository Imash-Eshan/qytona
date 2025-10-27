// Main JavaScript for Qytona Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 33, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '20px 0';
        }
    });
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('animate');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.2)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Initialize scroll animations
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Interactive floating cube
    const floatingCube = document.getElementById('floating-cube');
    
    if (floatingCube) {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            floatingCube.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset cube position when mouse leaves the window
        document.addEventListener('mouseleave', function() {
            floatingCube.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Portfolio item interactions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(20px)';
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#f0361e"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#2e4351",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Scroll Reveal Animation System
class ScrollReveal {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.init();
    }

    init() {
        // Configure the intersection observer
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Start animation when element is 50px from viewport bottom
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, options);

        // Initialize animations after page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        // Add scroll-reveal class to elements that should animate
        this.addRevealClasses();
        
        // Observe all reveal elements
        this.elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger-children, .service-card, .service-detailed-card, .portfolio-item, .portfolio-item-full, .section-title, .hero-buttons, .testimonial-card, .form-group, .team-member');
        
        this.elements.forEach(element => {
            this.observer.observe(element);
        });

        // Special handling for hero title lines
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.observer.observe(heroTitle);
        }
    }

    animateElement(element) {
        // Add revealed class to trigger animation
        element.classList.add('revealed');

        // Special handling for staggered children
        if (element.classList.contains('stagger-children')) {
            const children = element.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.transitionDelay = `${(i + 1) * 0.1}s`;
            }
        }

        // Special handling for hero title lines
        if (element.classList.contains('hero-title')) {
            const titleLines = element.querySelectorAll('.title-line');
            titleLines.forEach((line, index) => {
                line.style.transitionDelay = `${(index + 1) * 0.2}s`;
            });
        }
    }

    addRevealClasses() {
        // Auto-add scroll-reveal classes to common elements
        const selectors = [
            '.service-card',
            '.service-detailed-card', 
            '.portfolio-item',
            '.portfolio-item-full',
            '.section-title',
            '.testimonial-card',
            '.team-member',
            '.value-card',
            '.process-step:not(.process-step)', // Exclude process steps since they have their own
            '.stats-grid',
            '.contact-method'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.classList.contains('scroll-reveal') && 
                    !element.classList.contains('process-step')) {
                    element.classList.add('scroll-reveal');
                }
            });
        });

        // Add stagger to grids
        const grids = [
            '.services-grid',
            '.services-detailed-grid',
            '.portfolio-grid',
            '.portfolio-grid-full',
            '.values-grid',
            '.team-grid',
            '.testimonials-grid',
            '.faq-grid'
        ];

        grids.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('stagger-children');
            });
        });
    }

    // Method to manually trigger animations if needed
    refresh() {
        this.elements.forEach(element => {
            if (!element.classList.contains('revealed')) {
                const rect = element.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInViewport) {
                    this.animateElement(element);
                    this.observer.unobserve(element);
                }
            }
        });
    }
}

// Initialize scroll reveal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.scrollReveal = new ScrollReveal();
    
    // Refresh on resize to catch any layout changes
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            window.scrollReveal.refresh();
        }, 250);
    });
});