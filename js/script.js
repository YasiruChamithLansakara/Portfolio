// ===================================
// Portfolio Website JavaScript
// Author: Yasiru Lansakara
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeNavbar();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeActiveNavLinks();
    checkFormSubmissionSuccess();
});

// ===================================
// Typewriter Animation
// ===================================

function initializeTypewriter() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const roles = [
        'AI Enthusiast',
        'Machine Learning Developer',
        'Computer Vision Explorer',
        'Software Engineer',
        'Data Scientist',
        'AI Researcher',
        'Problem Solver'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove characters
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Add characters
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// ===================================
// Navbar Functionality
// ===================================

function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const hamburger = this.querySelector('.hamburger');
            if (hamburger) {
                hamburger.style.transform = navMenu.classList.contains('active') 
                    ? 'rotate(45deg)' 
                    : 'rotate(0)';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                    const hamburger = navToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.style.transform = 'rotate(0)';
                    }
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle && navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0)';
                }
            }
        }
    });
}

// ===================================
// Smooth Scrolling
// ===================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Active Navigation Link Highlighting
// ===================================

function initializeActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call once on load
}

// ===================================
// Scroll Animations
// ===================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements you want to animate
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .project-card, ' +
        '.timeline-item, .contact-form-wrapper, .contact-info-item, ' +
        '.highlight-item'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// ===================================
// Skill Bars Animation
// ===================================

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;
    
    const animateSkillBars = () => {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > skillsSectionTop && 
            scrollPosition < skillsSectionTop + skillsSectionHeight + 200 && 
            !animated) {
            
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }, index * 100);
            });
            
            animated = true;
        }
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on load
}

// ===================================
// Contact Form Handling
// ===================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Clear form on page load/back navigation (mobile fix)
        window.addEventListener('pageshow', function(event) {
            if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
                const emailField = document.getElementById('email');
                const messageField = document.getElementById('message');
                if (emailField) emailField.value = '';
                if (messageField) messageField.value = '';
                contactForm.reset();
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = {
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Basic validation
            if (!validateEmail(formData.email)) {
                e.preventDefault();
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            if (formData.message.length < 10) {
                e.preventDefault();
                showMessage('Please enter a message with at least 10 characters.', 'error');
                return;
            }
            
            // Mark that form is being submitted
            sessionStorage.setItem('formSubmitted', 'true');
            sessionStorage.setItem('formSubmitTime', Date.now().toString());
            
            // Let the form submit naturally to Formspree
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
        });
    }
}

// ===================================
// Utility Functions
// ===================================

// Check if form was successfully submitted
function checkFormSubmissionSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const wasSubmitted = sessionStorage.getItem('formSubmitted') === 'true';
    const submitTime = sessionStorage.getItem('formSubmitTime');
    
    // Check if submission was recent (within last 10 seconds)
    const isRecentSubmission = submitTime && (Date.now() - parseInt(submitTime)) < 10000;
    
    if (urlParams.get('success') === 'true' || (wasSubmitted && isRecentSubmission)) {
        const contactForm = document.getElementById('contactForm');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        if (contactForm) {
            // Multiple clearing attempts for stubborn mobile browsers
            const clearForm = () => {
                if (emailField) {
                    emailField.value = '';
                    emailField.defaultValue = '';
                    emailField.setAttribute('value', '');
                }
                if (messageField) {
                    messageField.value = '';
                    messageField.defaultValue = '';
                    messageField.textContent = '';
                    messageField.innerHTML = '';
                }
            };
            
            // Clear immediately
            clearForm();
            
            // Reset form
            contactForm.reset();
            
            // Clear again after short delays (for mobile browsers)
            setTimeout(clearForm, 50);
            setTimeout(clearForm, 100);
            setTimeout(clearForm, 250);
            
            // Force re-render by temporarily hiding and showing
            setTimeout(() => {
                if (emailField) emailField.style.display = 'none';
                if (messageField) messageField.style.display = 'none';
                setTimeout(() => {
                    if (emailField) emailField.style.display = '';
                    if (messageField) messageField.style.display = '';
                    clearForm();
                }, 10);
            }, 300);
            
            // Reset submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                submitButton.disabled = false;
            }
            
            if (urlParams.get('success') === 'true') {
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            }
            
            // Clear session storage
            sessionStorage.removeItem('formSubmitted');
            sessionStorage.removeItem('formSubmitTime');
            
            // Remove success parameter from URL
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
        }
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show message (success or error)
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    // Add appropriate styling based on type
    if (type === 'error') {
        messageDiv.style.background = 'rgba(239, 68, 68, 0.1)';
        messageDiv.style.borderColor = 'var(--error)';
        messageDiv.style.color = 'var(--error)';
    }
    
    // Insert message after form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// ===================================
// Additional Features
// ===================================

// Lazy loading for images (if you add images later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Back to top button (optional enhancement)
function createBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--accent-gradient);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition-normal);
        z-index: 999;
        box-shadow: var(--shadow-glow);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debouncing to scroll-heavy functions if needed
// window.addEventListener('scroll', debounce(someFunction, 20));

// ===================================
// Console Welcome Message
// ===================================

console.log('%c👋 Welcome to Yasiru Lansakara\'s Portfolio!', 
    'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 
    'color: #8b5cf6; font-size: 14px;');
console.log('%c💼 Open for opportunities and collaborations!', 
    'color: #10b981; font-size: 14px;');
