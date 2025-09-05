/**
 * Mapa Interactivo de Panamá usando GeoJSON
 * Renderiza límites administrativos reales de provincias y comarcas
 */

class GeoJSONMap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            width: 800,
            height: 600,
            padding: 20,
            colors: {
                default: '#E6F3EE',      // Seafoam
                hover: '#8DBB66',        // Palm Leaf
                selected: '#0F5B55',     // Jungle Teal
                stroke: '#0F5B55',       // Jungle Teal
                text: '#242424'          // Ink
            },
            ...options
        };
        
        this.provinces = new Map();
        this.currentHover = null;
        this.init();
    }

    async init() {
        try {
            // Cargar datos GeoJSON
            const response = await fetch('./data/geoBoundaries-PAN-ADM1.geojson');
            const geojson = await response.json();
            
            // Procesar datos
            this.processGeoJSON(geojson);
            
            // Crear SVG
            this.createSVG();
            
            // Renderizar mapa
            this.renderMap();
            
            // Agregar interactividad
            this.addInteractivity();
            
        } catch (error) {
            console.error('Error cargando mapa GeoJSON:', error);
            this.showError();
        }
    }

    processGeoJSON(geojson) {
        geojson.features.forEach(feature => {
            const name = feature.properties.shapeName;
            const iso = feature.properties.shapeISO;
            
            // Normalizar nombres para URLs
            const normalizedName = this.normalizeName(name);
            
            this.provinces.set(normalizedName, {
                name: name,
                iso: iso,
                geometry: feature.geometry,
                type: this.getProvinceType(name)
            });
        });
    }

    normalizeName(name) {
        const nameMap = {
            'Provincia de Bocas del Toro': 'bocas-del-toro',
            'Colón Province': 'colon',
            'Provincia de Darién': 'darien',
            'Comarca Emberá-Wounaan': 'embera-wounaan',
            'Comarca Guna Yala': 'guna-yala',
            'Provincia de Herrera': 'herrera',
            'Provincia de Los Santos': 'los-santos',
            'Comarca Ngäbe-Buglé': 'ngabe-bugle',
            'Provincia de Panamá': 'panama',
            'Provincia de Panamá Oeste': 'panama-oeste',
            'Provincia de Veraguas': 'veraguas',
            'Provincia de Chiriquí': 'chiriqui',
            'Provincia de Coclé': 'cocle'
        };
        
        return nameMap[name] || name.toLowerCase().replace(/\s+/g, '-');
    }

    getProvinceType(name) {
        if (name.includes('Comarca')) return 'comarca';
        return 'provincia';
    }

    createSVG() {
        // Limpiar contenedor
        this.container.innerHTML = '';
        
        // Crear SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', this.options.width);
        this.svg.setAttribute('height', this.options.height);
        this.svg.setAttribute('viewBox', `0 0 ${this.options.width} ${this.options.height}`);
        this.svg.style.borderRadius = '12px';
        this.svg.style.background = '#F2E9DC'; // Island Sand
        
        this.container.appendChild(this.svg);
    }

    renderMap() {
        // Calcular bounds del mapa
        const bounds = this.calculateBounds();
        const scale = this.calculateScale(bounds);
        const translate = this.calculateTranslate(bounds, scale);
        
        // Crear grupo principal
        this.mapGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.mapGroup.setAttribute('transform', `translate(${translate.x}, ${translate.y}) scale(${scale})`);
        
        // Renderizar cada provincia
        this.provinces.forEach((province, key) => {
            const path = this.createProvincePath(province, key);
            this.mapGroup.appendChild(path);
        });
        
        this.svg.appendChild(this.mapGroup);
        
        // Agregar leyenda
        this.addLegend();
    }

    calculateBounds() {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        this.provinces.forEach(province => {
            const coords = this.extractCoordinates(province.geometry);
            coords.forEach(([x, y]) => {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            });
        });
        
        return { minX, minY, maxX, maxY };
    }

    extractCoordinates(geometry) {
        const coords = [];
        
        if (geometry.type === 'Polygon') {
            geometry.coordinates[0].forEach(coord => {
                coords.push([coord[0], coord[1]]);
            });
        } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach(polygon => {
                polygon[0].forEach(coord => {
                    coords.push([coord[0], coord[1]]);
                });
            });
        }
        
        return coords;
    }

    calculateScale(bounds) {
        const width = bounds.maxX - bounds.minX;
        const height = bounds.maxY - bounds.minY;
        const scaleX = (this.options.width - this.options.padding * 2) / width;
        const scaleY = (this.options.height - this.options.padding * 2) / height;
        return Math.min(scaleX, scaleY) * 0.9;
    }

    calculateTranslate(bounds, scale) {
        const width = bounds.maxX - bounds.minX;
        const height = bounds.maxY - bounds.minY;
        const centerX = bounds.minX + width / 2;
        const centerY = bounds.minY + height / 2;
        
        return {
            x: this.options.width / 2 - centerX * scale,
            y: this.options.height / 2 - centerY * scale
        };
    }

    createProvincePath(province, key) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Convertir geometría a path SVG
        const pathData = this.geometryToPath(province.geometry);
        path.setAttribute('d', pathData);
        
        // Estilos
        path.setAttribute('fill', this.options.colors.default);
        path.setAttribute('stroke', this.options.colors.stroke);
        path.setAttribute('stroke-width', '1');
        path.setAttribute('class', `province-path ${province.type}`);
        path.setAttribute('data-province', key);
        path.setAttribute('data-name', province.name);
        path.setAttribute('data-iso', province.iso);
        
        return path;
    }

    geometryToPath(geometry) {
        let pathData = '';
        
        if (geometry.type === 'Polygon') {
            pathData = this.polygonToPath(geometry.coordinates[0]);
        } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach(polygon => {
                pathData += this.polygonToPath(polygon[0]) + ' ';
            });
        }
        
        return pathData;
    }

    polygonToPath(coordinates) {
        if (coordinates.length < 3) return '';
        
        let path = `M ${coordinates[0][0]} ${coordinates[0][1]}`;
        
        for (let i = 1; i < coordinates.length; i++) {
            path += ` L ${coordinates[i][0]} ${coordinates[i][1]}`;
        }
        
        path += ' Z';
        return path;
    }

    addInteractivity() {
        // Hover effects
        this.svg.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('province-path')) {
                this.handleHover(e.target);
            }
        });
        
        this.svg.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('province-path')) {
                this.handleMouseOut(e.target);
            }
        });
        
        // Click events
        this.svg.addEventListener('click', (e) => {
            if (e.target.classList.contains('province-path')) {
                this.handleClick(e.target);
            }
        });
    }

    handleHover(element) {
        if (this.currentHover) {
            this.currentHover.setAttribute('fill', this.options.colors.default);
        }
        
        element.setAttribute('fill', this.options.colors.hover);
        this.currentHover = element;
        
        // Mostrar tooltip
        this.showTooltip(element);
    }

    handleMouseOut(element) {
        if (this.currentHover === element) {
            element.setAttribute('fill', this.options.colors.default);
            this.currentHover = null;
            this.hideTooltip();
        }
    }

    handleClick(element) {
        const province = element.getAttribute('data-province');
        const name = element.getAttribute('data-name');
        
        // Navegar a la página de la provincia
        window.location.href = `panama/${province}.html`;
    }

    showTooltip(element) {
        const name = element.getAttribute('data-name');
        const iso = element.getAttribute('data-iso');
        const type = element.classList.contains('comarca') ? 'Comarca' : 'Provincia';
        
        // Crear tooltip si no existe
        if (!this.tooltip) {
            this.tooltip = document.createElement('div');
            this.tooltip.style.cssText = `
                position: absolute;
                background: rgba(15, 91, 85, 0.95);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                font-family: 'Inter', sans-serif;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(this.tooltip);
        }
        
        this.tooltip.innerHTML = `
            <div style="font-weight: 600;">${name}</div>
            <div style="font-size: 12px; opacity: 0.8;">${type} • ${iso}</div>
        `;
        
        this.tooltip.style.display = 'block';
    }

    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.style.display = 'none';
        }
    }

    addLegend() {
        const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        legend.setAttribute('class', 'legend');
        
        // Título
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', 20);
        title.setAttribute('y', 30);
        title.setAttribute('font-family', 'Inter, sans-serif');
        title.setAttribute('font-size', '16');
        title.setAttribute('font-weight', '600');
        title.setAttribute('fill', this.options.colors.text);
        title.textContent = 'Panamá - Provincias y Comarcas';
        
        // Leyenda de colores
        const provinciasRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        provinciasRect.setAttribute('x', 20);
        provinciasRect.setAttribute('y', 50);
        provinciasRect.setAttribute('width', 12);
        provinciasRect.setAttribute('height', 12);
        provinciasRect.setAttribute('fill', this.options.colors.default);
        provinciasRect.setAttribute('stroke', this.options.colors.stroke);
        
        const provinciasText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        provinciasText.setAttribute('x', 40);
        provinciasText.setAttribute('y', 62);
        provinciasText.setAttribute('font-family', 'Inter, sans-serif');
        provinciasText.setAttribute('font-size', '12');
        provinciasText.setAttribute('fill', this.options.colors.text);
        provinciasText.textContent = 'Provincias';
        
        legend.appendChild(title);
        legend.appendChild(provinciasRect);
        legend.appendChild(provinciasText);
        
        this.svg.appendChild(legend);
    }

    showError() {
        this.container.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 400px;
                background: #F7F3EC;
                border-radius: 12px;
                color: #E0524D;
                font-family: 'Inter', sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <div>
                    <h3>Error cargando el mapa</h3>
                    <p>No se pudo cargar el mapa interactivo de Panamá.</p>
                </div>
            </div>
        `;
    }
}

// Inicializar mapa cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('panamaMap');
    if (mapContainer) {
        new GeoJSONMap('panamaMap', {
            width: 800,
            height: 600
        });
    }
});
