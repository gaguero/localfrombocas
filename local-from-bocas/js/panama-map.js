// Mapa Interactivo de Panamá - Local From Bocas
// Funcionalidad específica para el mapa SVG interactivo

document.addEventListener('DOMContentLoaded', function() {
    initPanamaMap();
});

function initPanamaMap() {
    const mapContainer = document.getElementById('panamaMap');
    const mapContainerFull = document.getElementById('panamaMapFull');
    
    if (mapContainer) {
        createInteractiveMap(mapContainer, 'small');
    }
    
    if (mapContainerFull) {
        createInteractiveMap(mapContainerFull, 'full');
    }
}

function createInteractiveMap(container, size) {
    // Datos de las provincias y comarcas
    const panamaData = {
        provincias: [
            {
                id: 'bocas-del-toro',
                nombre: 'Bocas del Toro',
                capital: 'Bocas Town',
                region: 'Caribe',
                color: '#0F5B55',
                tipo: 'provincia',
                descripcion: 'Conocida como "Las Galápagos del Siglo XXI"',
                atractivos: ['Biodiversidad', 'Islas', 'Cultura Afrocaribeña']
            },
            {
                id: 'chiriqui',
                nombre: 'Chiriquí',
                capital: 'David',
                region: 'Tierras Altas',
                color: '#8DBB66',
                tipo: 'provincia',
                descripcion: 'La "Suiza de Panamá" con tierras altas y volcanes',
                atractivos: ['Volcán Barú', 'Café de altura', 'Bosques nubosos']
            },
            {
                id: 'cocle',
                nombre: 'Coclé',
                capital: 'Penonomé',
                region: 'Pacífico Central',
                color: '#FF7466',
                tipo: 'provincia',
                descripcion: 'Corazón geográfico con playas del Pacífico',
                atractivos: ['Carnaval tradicional', 'Playas del Pacífico', 'Cordillera Central']
            },
            {
                id: 'colon',
                nombre: 'Colón',
                capital: 'Colón',
                region: 'Caribe',
                color: '#2C8AC6',
                tipo: 'provincia',
                descripcion: 'Puerta de entrada del Caribe con Zona Libre',
                atractivos: ['Fortificaciones coloniales', 'Zona Libre', 'Islas caribeñas']
            },
            {
                id: 'darien',
                nombre: 'Darién',
                capital: 'La Palma',
                region: 'Selva Virgen',
                color: '#5B4B3F',
                tipo: 'provincia',
                descripcion: 'La provincia más salvaje con selvas vírgenes',
                atractivos: ['Selva virgen', 'Comunidades indígenas', 'Biodiversidad única']
            },
            {
                id: 'herrera',
                nombre: 'Herrera',
                capital: 'Chitré',
                region: 'Azuero',
                color: '#8DBB66',
                tipo: 'provincia',
                descripcion: 'Corazón de la Península de Azuero',
                atractivos: ['Folclor tradicional', 'Artesanías', 'Tradición ganadera']
            },
            {
                id: 'los-santos',
                nombre: 'Los Santos',
                capital: 'Las Tablas',
                region: 'Azuero',
                color: '#FF7466',
                tipo: 'provincia',
                descripcion: 'Cuna del folclor panameño',
                atractivos: ['Festival de la Mejorana', 'Playas del Pacífico', 'Folclor auténtico']
            },
            {
                id: 'panama',
                nombre: 'Panamá',
                capital: 'Ciudad de Panamá',
                region: 'Capital',
                color: '#0F5B55',
                tipo: 'provincia',
                descripcion: 'La capital con el Canal de Panamá',
                atractivos: ['Canal de Panamá', 'Casco Antiguo', 'Vida urbana']
            },
            {
                id: 'panama-oeste',
                nombre: 'Panamá Oeste',
                capital: 'La Chorrera',
                region: 'Pacífico',
                color: '#2C8AC6',
                tipo: 'provincia',
                descripcion: 'La provincia más joven con playas del Pacífico',
                atractivos: ['Playas del Pacífico', 'Desarrollo urbano', 'Acceso al mar']
            },
            {
                id: 'veraguas',
                nombre: 'Veraguas',
                capital: 'Santiago',
                region: 'Dos Mares',
                color: '#5B4B3F',
                tipo: 'provincia',
                descripcion: 'La única provincia con costas en ambos océanos',
                atractivos: ['Caribe y Pacífico', 'Historia colonial', 'Paisajes naturales']
            }
        ],
        comarcas: [
            {
                id: 'guna-yala',
                nombre: 'Guna Yala',
                capital: 'El Porvenir',
                region: 'Caribe',
                color: '#0F5B55',
                tipo: 'comarca',
                descripcion: 'Comarca autónoma con 365 islas',
                atractivos: ['365 islas', 'Molas tradicionales', 'Aguas cristalinas']
            },
            {
                id: 'embera-wounaan',
                nombre: 'Emberá-Wounaan',
                capital: 'Unión Chocó',
                region: 'Selva',
                color: '#8DBB66',
                tipo: 'comarca',
                descripcion: 'Comarca en la selva del Darién',
                atractivos: ['Selva tropical', 'Artesanías en madera', 'Tradiciones ancestrales']
            },
            {
                id: 'ngabe-bugle',
                nombre: 'Ngäbe-Buglé',
                capital: 'Llano Tugrí',
                region: 'Tierras Altas',
                color: '#FF7466',
                tipo: 'comarca',
                descripcion: 'La comarca más grande en las tierras altas',
                atractivos: ['Tierras altas', 'Cultivo de café', 'Tradiciones vivas']
            }
        ]
    };

    // Crear el mapa SVG
    createMapSVG(container, panamaData, size);
}

function createMapSVG(container, data, size) {
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Crear SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 600');
    svg.setAttribute('class', 'panama-svg');
    
    // Crear paths para cada provincia/comarca
    const allRegions = [...data.provincias, ...data.comarcas];
    
    allRegions.forEach(region => {
        const path = createRegionPath(region);
        svg.appendChild(path);
    });
    
    // Crear tooltip
    const tooltip = createTooltip();
    
    // Agregar al contenedor
    container.appendChild(svg);
    container.appendChild(tooltip);
    
    // Agregar eventos
    addMapEvents(svg, tooltip, allRegions);
}

function createRegionPath(region) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Coordenadas simplificadas para cada región
    const coordinates = getRegionCoordinates(region.id);
    
    path.setAttribute('id', region.id);
    path.setAttribute('class', `region ${region.tipo}`);
    path.setAttribute('d', coordinates);
    path.setAttribute('data-name', region.nombre);
    path.setAttribute('data-capital', region.capital);
    path.setAttribute('data-region', region.region);
    path.setAttribute('data-color', region.color);
    path.setAttribute('data-descripcion', region.descripcion);
    path.setAttribute('data-atractivos', region.atractivos.join(', '));
    path.setAttribute('data-link', `panama/${region.id}.html`);
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.setAttribute('aria-label', `Explorar ${region.nombre}`);
    
    return path;
}

function getRegionCoordinates(regionId) {
    // Coordenadas simplificadas para el mapa
    const coordinates = {
        'bocas-del-toro': 'M50 50 L150 50 L150 120 L50 120 Z',
        'chiriqui': 'M50 120 L150 120 L150 200 L50 200 Z',
        'cocle': 'M150 200 L250 200 L250 280 L150 280 Z',
        'colon': 'M250 50 L350 50 L350 120 L250 120 Z',
        'darien': 'M300 400 L400 400 L400 500 L300 500 Z',
        'herrera': 'M150 280 L250 280 L250 360 L150 360 Z',
        'los-santos': 'M150 360 L250 360 L250 440 L150 440 Z',
        'panama': 'M250 200 L350 200 L350 280 L250 280 Z',
        'panama-oeste': 'M200 280 L250 280 L250 360 L200 360 Z',
        'veraguas': 'M100 200 L200 200 L200 360 L100 360 Z',
        'guna-yala': 'M350 50 L400 50 L400 120 L350 120 Z',
        'embera-wounaan': 'M300 300 L400 300 L400 400 L300 400 Z',
        'ngabe-bugle': 'M50 200 L150 200 L150 300 L50 300 Z'
    };
    
    return coordinates[regionId] || 'M0 0 L0 0 Z';
}

function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.id = 'mapTooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <h3 class="tooltip-title"></h3>
            <p class="tooltip-capital"></p>
            <p class="tooltip-region"></p>
            <p class="tooltip-descripcion"></p>
            <div class="tooltip-actions">
                <span class="pill-light tooltip-pill"></span>
                <button class="btn btn-primary btn-sm">Explorar</button>
            </div>
        </div>
    `;
    return tooltip;
}

function addMapEvents(svg, tooltip, regions) {
    const paths = svg.querySelectorAll('.region');
    
    paths.forEach(path => {
        // Hover events
        path.addEventListener('mouseenter', function(e) {
            showTooltip(e, this, tooltip);
        });
        
        path.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e, tooltip);
        });
        
        path.addEventListener('mouseleave', function() {
            hideTooltip(tooltip);
        });
        
        // Click event
        path.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                // Simular navegación (en producción iría a la página real)
                showNotification(`Navegando a ${this.getAttribute('data-name')}...`, 'info');
                // window.location.href = link;
            }
        });
        
        // Keyboard events para accesibilidad
        path.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function showTooltip(event, path, tooltip) {
    const name = path.getAttribute('data-name');
    const capital = path.getAttribute('data-capital');
    const region = path.getAttribute('data-region');
    const descripcion = path.getAttribute('data-descripcion');
    const tipo = path.classList.contains('comarca') ? 'Comarca' : 'Provincia';
    
    // Actualizar contenido del tooltip
    tooltip.querySelector('.tooltip-title').textContent = name;
    tooltip.querySelector('.tooltip-capital').textContent = `Capital: ${capital}`;
    tooltip.querySelector('.tooltip-region').textContent = `Región: ${region}`;
    tooltip.querySelector('.tooltip-descripcion').textContent = descripcion;
    tooltip.querySelector('.tooltip-pill').textContent = tipo;
    
    // Mostrar tooltip
    tooltip.style.display = 'block';
    tooltip.classList.add('show');
    
    // Actualizar posición
    updateTooltipPosition(event, tooltip);
}

function updateTooltipPosition(event, tooltip) {
    const x = event.clientX;
    const y = event.clientY;
    
    // Ajustar posición para que no se salga de la pantalla
    const tooltipRect = tooltip.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let left = x + 10;
    let top = y - 10;
    
    if (left + tooltipRect.width > windowWidth) {
        left = x - tooltipRect.width - 10;
    }
    
    if (top < 0) {
        top = y + 10;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function hideTooltip(tooltip) {
    tooltip.classList.remove('show');
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 200);
}

// Función para agregar estilos del mapa
function addMapStyles() {
    if (document.querySelector('#panama-map-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'panama-map-styles';
    styles.textContent = `
        .interactive-map {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background: var(--island-sand);
            border-radius: var(--radius-lg);
            padding: 2rem;
            box-shadow: var(--shadow-lg);
        }
        
        .panama-svg {
            width: 100%;
            height: auto;
            background: var(--pure-white);
            border-radius: var(--radius-md);
        }
        
        .region {
            fill: var(--seafoam);
            stroke: var(--jungle-teal);
            stroke-width: 2;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .region:hover {
            fill: var(--jungle-teal);
            stroke: var(--ocean-blue);
            stroke-width: 3;
            transform: scale(1.02);
            transform-origin: center;
        }
        
        .region.comarca {
            fill: var(--palm-leaf);
            stroke: var(--cacao-brown);
        }
        
        .region.comarca:hover {
            fill: var(--cacao-brown);
            stroke: var(--jungle-teal);
        }
        
        .map-tooltip {
            position: fixed;
            background: var(--pure-white);
            border: 2px solid var(--jungle-teal);
            border-radius: var(--radius-lg);
            padding: 1rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            display: none;
            max-width: 300px;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.2s ease;
        }
        
        .map-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .tooltip-title {
            color: var(--jungle-teal);
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            font-family: var(--font-display);
        }
        
        .tooltip-capital,
        .tooltip-region {
            color: var(--ink);
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        
        .tooltip-descripcion {
            color: var(--neutral-gray);
            font-size: 0.85rem;
            margin-bottom: 1rem;
            line-height: 1.4;
        }
        
        .tooltip-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .tooltip-pill {
            font-size: 0.75rem;
        }
        
        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
        }
        
        @media (max-width: 768px) {
            .interactive-map {
                padding: 1rem;
            }
            
            .map-tooltip {
                max-width: 250px;
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// Inicializar estilos cuando se carga el script
addMapStyles();