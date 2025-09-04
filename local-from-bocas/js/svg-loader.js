// SVG Loader para Local From Bocas
// Carga dinámicamente los SVGs de provincias y comarcas

class SVGLoader {
    constructor() {
        this.svgCache = new Map();
        this.basePath = 'svgs/';
    }

    // Cargar SVG por nombre de provincia/comarca
    async loadSVG(regionName) {
        // Normalizar nombre para archivo
        const fileName = this.normalizeFileName(regionName);
        
        // Verificar cache
        if (this.svgCache.has(fileName)) {
            return this.svgCache.get(fileName);
        }

        try {
            const response = await fetch(`${this.basePath}${fileName}.svg`);
            if (!response.ok) {
                throw new Error(`SVG no encontrado: ${fileName}`);
            }
            
            const svgText = await response.text();
            this.svgCache.set(fileName, svgText);
            return svgText;
        } catch (error) {
            console.error('Error cargando SVG:', error);
            return this.getDefaultSVG(regionName);
        }
    }

    // Normalizar nombre para archivo
    normalizeFileName(regionName) {
        return regionName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[áàäâ]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöô]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/ñ/g, 'n')
            .replace(/ç/g, 'c');
    }

    // SVG por defecto si no se encuentra el específico
    getDefaultSVG(regionName) {
        return `
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <style>
                        .default-bg { fill: #E6F3EE; stroke: #0F5B55; stroke-width: 2; }
                        .default-text { font-family: 'Inter', sans-serif; font-size: 16px; fill: #0F5B55; }
                    </style>
                </defs>
                <rect width="400" height="300" fill="#F7F3EC"/>
                <rect class="default-bg" x="50" y="50" width="300" height="200" rx="20"/>
                <text class="default-text" x="200" y="150" text-anchor="middle">${regionName}</text>
                <text class="default-text" x="200" y="170" text-anchor="middle" font-size="12px">Mapa en desarrollo</text>
            </svg>
        `;
    }

    // Insertar SVG en un contenedor
    async insertSVG(containerId, regionName) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Contenedor no encontrado: ${containerId}`);
            return;
        }

        try {
            const svgContent = await this.loadSVG(regionName);
            container.innerHTML = svgContent;
            
            // Agregar clases CSS para estilizado
            const svg = container.querySelector('svg');
            if (svg) {
                svg.classList.add('region-svg');
                svg.setAttribute('data-region', regionName);
            }
        } catch (error) {
            console.error('Error insertando SVG:', error);
            container.innerHTML = this.getDefaultSVG(regionName);
        }
    }

    // Cargar múltiples SVGs
    async loadMultipleSVGs(regions) {
        const promises = regions.map(region => this.loadSVG(region));
        return Promise.all(promises);
    }

    // Obtener lista de SVGs disponibles
    getAvailableSVGs() {
        return [
            'bocas-del-toro',
            'chiriqui',
            'cocle',
            'colon',
            'darien',
            'herrera',
            'los-santos',
            'panama',
            'panama-oeste',
            'veraguas',
            'guna-yala',
            'embera-wounaan',
            'ngabe-bugle'
        ];
    }

    // Pre-cargar SVGs para mejor performance
    async preloadSVGs() {
        const availableSVGs = this.getAvailableSVGs();
        const promises = availableSVGs.map(svg => this.loadSVG(svg));
        
        try {
            await Promise.all(promises);
            console.log('SVGs pre-cargados exitosamente');
        } catch (error) {
            console.error('Error pre-cargando SVGs:', error);
        }
    }

    // Limpiar cache
    clearCache() {
        this.svgCache.clear();
    }

    // Obtener estadísticas del cache
    getCacheStats() {
        return {
            size: this.svgCache.size,
            keys: Array.from(this.svgCache.keys())
        };
    }
}

// Instancia global
const svgLoader = new SVGLoader();

// Función de utilidad para cargar SVG en página
async function loadRegionSVG(regionName, containerId = 'region-map') {
    return svgLoader.insertSVG(containerId, regionName);
}

// Función para pre-cargar SVGs al cargar la página
function preloadRegionSVGs() {
    svgLoader.preloadSVGs();
}

// Auto-inicialización si hay un contenedor de mapa
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('region-map');
    if (mapContainer) {
        const regionName = mapContainer.getAttribute('data-region');
        if (regionName) {
            loadRegionSVG(regionName);
        }
    }
    
    // Pre-cargar SVGs en páginas de Panamá
    if (window.location.pathname.includes('panama')) {
        preloadRegionSVGs();
    }
});

// Exportar para uso en otros scripts
window.SVGLoader = SVGLoader;
window.svgLoader = svgLoader;
window.loadRegionSVG = loadRegionSVG;
window.preloadRegionSVGs = preloadRegionSVGs;
