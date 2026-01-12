// ===== MODERN PORTFOLIO INTERACTIONS =====

// Loading screen animation with fallback
function hideLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Hide loader when page loads
window.addEventListener('load', () => {
    setTimeout(hideLoader, 1000);
});

// Fallback: Hide loader if it takes too long
setTimeout(hideLoader, 3000);

// Hide loader when DOM is ready (immediate fallback)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideLoader, 2000);
});

// Navigation scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero title
function typeWriter() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;

    const text = 'Jainivash';
    const cursor = document.querySelector('.cursor');
    let i = 0;

    // Clear initial text
    nameElement.textContent = '';

    function type() {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 150);
        } else {
            // Start blinking cursor
            if (cursor) {
                cursor.style.opacity = '1';
            }
        }
    }

    setTimeout(type, 1500);
}

// Particle animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 170, 0.5);
            border-radius: 50%;
            pointer-events: none;
        `;

        // Random initial position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        particlesContainer.appendChild(particle);

        // Animate particle
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = 20000 + Math.random() * 20000;
    const delay = Math.random() * 5000;

    particle.style.animation = `
        float ${duration}ms ${delay}ms infinite ease-in-out
    `;

    // Add keyframes for floating animation
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px); 
                    opacity: 0.3;
                }
                25% { 
                    transform: translateY(-20px) translateX(10px); 
                    opacity: 1;
                }
                50% { 
                    transform: translateY(-40px) translateX(-10px); 
                    opacity: 0.3;
                }
                75% { 
                    transform: translateY(-20px) translateX(15px); 
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    typeWriter();
    createParticles();

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section, .skill-card, .project-card');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll-triggered animations
    const animateElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;

        observer.observe(el);
    });

    // Animate skill progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => {
        progressObserver.observe(card);
        .animate -in {
            opacity: 1!important;
            transform: translateY(0)!important;
        }

            .skill - category {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease - out;
        }
        
        .project - card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease - out;
        }
        
        .skill - category.animate -in {
            opacity: 1;
            transform: translateY(0);
        }

            .project - card.animate -in {
                opacity: 1;
                transform: translateY(0);
            }
                `;
    document.head.appendChild(style);
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${ scrolled * speed}px)`;
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();

    // Add stagger animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${ 0.5 + index * 0.1 } s`;
        link.style.animation = 'fadeInUp 0.6s ease-out both';
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Cursor trail effect (optional enhancement)
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });

        if (trail.length > trailLength) {
            trail.shift();
        }

        updateTrail();
    });

    function updateTrail() {
        const existingTrails = document.querySelectorAll('.cursor-trail');
        existingTrails.forEach(t => t.remove());

        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
        position: fixed;
        width: ${ 4 - index * 0.3 } px;
        height: ${ 4 - index * 0.3 } px;
        background: rgba(0, 212, 170, ${(trailLength - index) / trailLength * 0.5});
    border - radius: 50 %;
    pointer - events: none;
    z - index: 9999;
    left: ${ point.x } px;
    top: ${ point.y } px;
    transition: opacity 0.3s ease;
    `;
            document.body.appendChild(dot);

            setTimeout(() => {
                dot.style.opacity = '0';
                setTimeout(() => dot.remove(), 300);
            }, 100);
        });
    }
}

// Uncomment to enable cursor trail
// createCursorTrail();
