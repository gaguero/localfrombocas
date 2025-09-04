// Local From Bocas - Main JavaScript File
// Funcionalidad principal del sitio web

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
    initSmoothScrolling();
    initLazyLoading();
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Resaltar enlace activo
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validar formulario
            if (validateContactForm(data)) {
                // Simular envío (en producción, aquí se enviaría al servidor)
                showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                this.reset();
            }
        });
    }
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'Este campo es requerido');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Validar email
    const emailInput = document.getElementById('email');
    if (data.email && !isValidEmail(data.email)) {
        showFieldError(emailInput, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    clearFieldError(input);
    input.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.card, .feature-item, .stat-item, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    // Crear botón de menú móvil si no existe
    const navbar = document.querySelector('.navbar-container');
    const nav = document.querySelector('.navbar-nav');
    
    if (navbar && nav && window.innerWidth <= 768) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
        
        navbar.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-open');
                mobileMenuButton.classList.remove('active');
            });
        });
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajustar para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
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
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Cerrar notificación">×</button>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 400px;
                padding: 1rem;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                background: var(--success-green);
                color: white;
            }
            .notification-error {
                background: var(--error-red);
                color: white;
            }
            .notification-info {
                background: var(--ocean-blue);
                color: white;
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 1rem;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Configurar cierre
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => hideNotification(notification));
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => hideNotification(notification), 5000);
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== UTILIDADES =====
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
    };
}

// ===== EVENTOS GLOBALES =====
// Redimensionar ventana
window.addEventListener('resize', debounce(function() {
    // Re-inicializar menú móvil si es necesario
    const mobileButton = document.querySelector('.mobile-menu-button');
    if (mobileButton && window.innerWidth > 768) {
        mobileButton.remove();
        const nav = document.querySelector('.navbar-nav');
        if (nav) nav.classList.remove('mobile-open');
    }
}, 250));

// Scroll optimizado
window.addEventListener('scroll', throttle(function() {
    // Aquí se pueden agregar más efectos de scroll si es necesario
}, 16));

// ===== FUNCIONES ESPECÍFICAS DE PÁGINAS =====

// Función para la página de servicios
function initServicesPage() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función para la página de vlogs
function initVlogsPage() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Aquí se puede agregar lógica para abrir el artículo
            console.log('Artículo clickeado:', this.querySelector('h3').textContent);
        });
    });
}

// Función para la página de Panamá
function initPanamaPage() {
    const provinceCards = document.querySelectorAll('.province-card, .comarca-card');
    
    provinceCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

// ===== INICIALIZACIÓN CONDICIONAL =====
// Inicializar funciones específicas según la página
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

switch(currentPage) {
    case 'servicios.html':
        initServicesPage();
        break;
    case 'vlogs.html':
        initVlogsPage();
        break;
    case 'panama.html':
        initPanamaPage();
        break;
}

// ===== CONSOLA DE DESARROLLO =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🏝️ Local From Bocas - Sitio web cargado correctamente');
    console.log('📧 Para soporte: info@localfrombocas.com');
    console.log('🌐 Repositorio: https://github.com/gaguero/localfrombocas');
}
