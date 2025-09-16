// dynamic-css.js - Dynamic CSS functionality for Local From Bocas
// This file provides dynamic styling capabilities for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    initDynamicCSS();
});

function initDynamicCSS() {
    // Initialize dynamic CSS features
    initScrollAnimations();
    initHoverEffects();
    initResponsiveAdjustments();
    initThemeSwitching();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.card, .stat-item, .snapshot-card, .province-card, .comarca-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.card, .province-card, .comarca-card, .snapshot-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Dynamic card highlighting
    const dynamicCard = document.getElementById('dynamicCard');
    if (dynamicCard) {
        dynamicCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
        });
        
        dynamicCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
    }
}

// ===== RESPONSIVE ADJUSTMENTS =====
function initResponsiveAdjustments() {
    function adjustLayout() {
        const width = window.innerWidth;
        
        // Adjust grid columns based on screen size
        const grids = document.querySelectorAll('.grid-3, .grid-4');
        grids.forEach(grid => {
            if (width < 768) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (width < 1024) {
                if (grid.classList.contains('grid-4')) {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                }
            } else {
                // Reset to original classes
                if (grid.classList.contains('grid-4')) {
                    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                } else if (grid.classList.contains('grid-3')) {
                    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                }
            }
        });

        // Adjust map container width
        const mapContainer = document.querySelector('.full-width-map-container');
        if (mapContainer) {
            if (width < 768) {
                mapContainer.style.width = '100vw';
                mapContainer.style.marginLeft = 'calc(-50vw + 50%)';
            } else if (width < 1024) {
                mapContainer.style.width = '95vw';
                mapContainer.style.marginLeft = 'auto';
            } else {
                mapContainer.style.width = '90vw';
                mapContainer.style.marginLeft = 'auto';
            }
        }
    }

    // Run on load and resize
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
}

// ===== THEME SWITCHING =====
function initThemeSwitching() {
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Theme switching functionality (if needed in the future)
    window.switchTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
}

// ===== DYNAMIC STYLING UTILITIES =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Dynamic CSS animations */
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Enhanced hover effects */
        .card:hover,
        .province-card:hover,
        .comarca-card:hover,
        .snapshot-card:hover {
            transition: all 0.3s ease;
        }
        
        /* Dynamic card animations */
        .dynamic-card {
            transition: all 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .grid-3,
            .grid-4 {
                grid-template-columns: 1fr !important;
            }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
            .grid-4 {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
        
        /* Smooth transitions for all interactive elements */
        * {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        /* Loading states */
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid var(--jungle-teal);
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// ===== EXPORT FOR GLOBAL USE =====
window.DynamicCSS = {
    init: initDynamicCSS,
    addLoadingState: function(element) {
        element.classList.add('loading');
    },
    removeLoadingState: function(element) {
        element.classList.remove('loading');
    },
    switchTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};
