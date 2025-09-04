/**
 * Main JavaScript file for the "Historia y datos de Bocas del Toro" website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the functionality when the DOM is fully loaded
    initBackToTop();
    initMobileMenu();
    initSmoothScrolling();
    initExternalLinks();
});

/**
 * Initialize the back to top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    // Add js-enabled class to body for CSS targeting
    document.body.classList.add('js-enabled');
    
    const header = document.querySelector('header');
    
    if (!header) return;
    
    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span>☰</span>';
    menuToggle.setAttribute('aria-label', 'Toggle Menu');
    
    // Insert button before the navigation
    const nav = header.querySelector('nav');
    if (nav) {
        nav.parentNode.insertBefore(menuToggle, nav);
        
        // Toggle navigation on button click
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
        
        // Close menu when a link is clicked
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Select all internal links (those that point to an ID)
    const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get the header height to offset the scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading the page
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize external links to open in new tabs
 */
function initExternalLinks() {
    // Select all external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        // Add target and rel attributes for security and UX
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Optionally, add an icon or text to indicate external link
        if (!link.querySelector('.external-link-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-link-icon';
            icon.innerHTML = ' ↗';
            icon.setAttribute('aria-hidden', 'true');
            link.appendChild(icon);
        }
    });
}

/**
 * Initialize image gallery if present (for potential future use)
 */
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length === 0) return;
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Implementation of lightbox or gallery functionality could go here
            // This is just a placeholder for future enhancement
            console.log('Gallery image clicked:', this.src);
        });
    });
}

/**
 * Helper function to detect if the device is touch-enabled
 * @returns {boolean} True if the device has touch capabilities
 */
function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

/**
 * Helper function to format dates consistently
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

// Add window resize handler if needed
window.addEventListener('resize', function() {
    // Handle responsive adjustments if needed
});

// Execute once more on load to ensure all assets are loaded
window.addEventListener('load', function() {
    // Any final adjustments after page is fully loaded
}); 