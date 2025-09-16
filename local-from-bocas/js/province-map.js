// Province Map Interactive System
// Handles district-level maps for individual provinces

class ProvinceMap {
    constructor(containerId, provinceData) {
        this.container = document.getElementById(containerId);
        this.provinceData = provinceData;
        this.districts = {};
        this.currentHoveredDistrict = null;
    }

    // Load and render the district map
    async loadDistrictMap() {
        try {
            // Use the specific GeoJSON file for this province
            const provinceFileName = this.getProvinceFileName();
            const response = await fetch(`../data/${provinceFileName}?v=${Date.now()}&nocache=${Math.random()}`);
            const geo = await response.json();
            
            // Separate province and district features
            const provinceFeature = geo.features.find(f => f.properties.type === 'province');
            const districtFeatures = geo.features.filter(f => f.properties.type === 'district');
            
            this.renderDistrictMap(geo, provinceFeature, districtFeatures);
        } catch (error) {
            console.error('Error loading district GeoJSON:', error);
            this.container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #dc3545; font-size: 18px; text-align: center; padding: 20px;">
                    <div>
                        <h3>❌ Error Loading Map</h3>
                        <p>Error: ${error.message}</p>
                        <p>Please check the browser console for details.</p>
                        <button onclick="location.reload()" style="margin-top: 10px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Retry
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Get the correct filename for the province
    getProvinceFileName() {
        const provinceName = this.provinceData.name.toLowerCase();
        const fileNameMap = {
            'bocas del toro': 'accurate-bocas-del-toro-districts.geojson',
            'chiriquí': 'chiriquí-districts.geojson',
            'coclé': 'coclé-districts.geojson',
            'colón': 'colón-districts.geojson',
            'darién': 'darién-districts.geojson',
            'herrera': 'herrera-districts.geojson',
            'los santos': 'los-santos-districts.geojson',
            'panamá': 'panamá-districts.geojson',
            'panamá oeste': 'panamá-oeste-districts.geojson',
            'veraguas': 'veraguas-districts.geojson',
            'guna yala': 'guna-yala-districts.geojson',
            'emberá-wounaan': 'emberá-wounaan-districts.geojson',
            'ngäbe-buglé': 'ngäbe-buglé-districts.geojson'
        };
        
        return fileNameMap[provinceName] || 'bocas-del-toro-districts.geojson';
    }

    // Normalize name for comparison
    normalizeName(name) {
        return name.toLowerCase()
            .replace(/[áàäâ]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöô]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/ñ/g, 'n')
            .replace(/[^a-z0-9]/g, '');
    }

    // Group corregimientos by their parent districts
    groupCorregimientosByDistrict(corregimientos) {
        const grouped = {};
        
        // For Bocas del Toro, map corregimientos to their parent districts
        const districtMapping = {
            'BOCAS DEL TORO': ['BOCAS DEL TORO', 'BASTIMENTOS', 'TIERRA OSCURA', 'PUNTA LAUREL'],
            'CHANGUINOLA': ['CHANGUINOLA', 'GUABITO', 'EL EMPALME', 'LAS TABLAS', 'LAS DELICIAS', 'COCHIGRO', 'LA GLORIA'],
            'ALMIRANTE': ['ALMIRANTE', 'CAUCHERO', 'NANCE DEL RISCO', 'VALLE DE AGUA ARRIBA', 'VALLE DEL RISCO'],
            'CHIRIQUÍ GRANDE': ['CHIRIQUÍ GRANDE', 'BAJO CEDRO', 'MIRAMAR', 'PUNTA PEÑA', 'PUNTA ROBALO', 'RAMBALA']
        };

        // Initialize grouped structure
        Object.keys(districtMapping).forEach(districtName => {
            grouped[districtName] = [];
        });

        // Group corregimientos
        corregimientos.forEach(corregimiento => {
            const corregimientoName = corregimiento.properties.name;
            let assigned = false;

            // Find which district this corregimiento belongs to
            for (const [districtName, corregimientoList] of Object.entries(districtMapping)) {
                if (corregimientoList.includes(corregimientoName)) {
                    grouped[districtName].push(corregimiento);
                    assigned = true;
                    break;
                }
            }

            // If not found in mapping, try to match by name similarity
            if (!assigned) {
                const normalizedName = this.normalizeName(corregimientoName);
                for (const [districtName, corregimientoList] of Object.entries(districtMapping)) {
                    const normalizedDistrict = this.normalizeName(districtName);
                    if (normalizedName.includes(normalizedDistrict) || normalizedDistrict.includes(normalizedName)) {
                        grouped[districtName].push(corregimiento);
                        assigned = true;
                        break;
                    }
                }
            }

            // If still not assigned, put in a general category
            if (!assigned) {
                if (!grouped['OTHER']) grouped['OTHER'] = [];
                grouped['OTHER'].push(corregimiento);
            }
        });

        return grouped;
    }

    // Render the district map
    renderDistrictMap(geo, provinceFeature, districtFeatures) {
        this.container.innerHTML = '';

        // Use the district features directly (they are now proper districts, not corregimientos)
        const provinceDistricts = districtFeatures;

        // Province data loaded and processed

        if (provinceDistricts.length === 0) {
            console.warn('No districts found for province:', this.provinceData.name);
            this.container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 18px;">No se encontraron distritos para esta provincia</div>';
            return;
        }

        // Calculate bounds for the province districts
        let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;

        function scanCoords(coords) {
            for (const poly of coords) {
                const rings = Array.isArray(poly[0][0]) ? poly : [poly];
                for (const ring of rings) {
                    for (const pt of ring) {
                        const [lon, lat] = pt;
                        if (lon < minLon) minLon = lon;
                        if (lon > maxLon) maxLon = lon;
                        if (lat < minLat) minLat = lat;
                        if (lat > maxLat) maxLat = lat;
                    }
                }
            }
        }

        for (const f of provinceDistricts) {
            const g = f.geometry;
            if (!g) continue;
            if (g.type === 'Polygon') scanCoords([g.coordinates]);
            if (g.type === 'MultiPolygon') scanCoords(g.coordinates);
        }

        // Geographic bounds calculated

        // Focus on the main Bocas del Toro archipelago
        // Exclude extreme outliers like Escudo de Veraguas that distort the view
        const mainLonMin = -82.9;  // Focus on main archipelago
        const mainLonMax = -82.0;  // Exclude very eastern parts
        const mainLatMin = 8.8;    // Focus on main archipelago
        const mainLatMax = 9.6;    // Exclude very northern parts
        
        // Use focused bounds for better proportions
        const focusedLonRange = mainLonMax - mainLonMin;
        const focusedLatRange = mainLatMax - mainLatMin;
        const aspectRatio = focusedLonRange / focusedLatRange;
        
        // Set viewBox dimensions maintaining proper aspect ratio
        const viewH = 600;
        const viewW = Math.max(800, viewH * aspectRatio);
        
        // Add padding to prevent clipping
        const padding = 50;
        const scaleX = (viewW - 2 * padding) / focusedLonRange;
        const scaleY = (viewH - 2 * padding) / focusedLatRange;
        const scale = Math.min(scaleX, scaleY);
        
        // Center on the main Bocas del Toro archipelago
        const centerX = (mainLonMin + mainLonMax) / 2;
        const centerY = (mainLatMin + mainLatMax) / 2;
        
        function project([lon, lat]) {
            const x = (lon - centerX) * scale + viewW / 2;
            const y = (centerY - lat) * scale + viewH / 2;
            return [x, y];
        }

        // Create SVG with proper viewBox
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${viewW} ${viewH}`);
        svg.style.width = '100%';
        svg.style.height = '100%';

        // Map projection calculations completed

        function pathFromPolygon(coords) {
            let d = '';
            for (const ring of coords) {
                const [startX, startY] = project(ring[0]);
                d += `M ${startX} ${startY}`;
                for (let i = 1; i < ring.length; i++) {
                    const [x, y] = project(ring[i]);
                    d += ` L ${x} ${y}`;
                }
                d += ' Z ';
            }
            return d.trim();
        }

        // Add gradient definitions for districts
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        const gradients = [
            { id: 'districtGradient1', colors: ['#E6F3EE', '#8DBB66'] },
            { id: 'districtGradient2', colors: ['#8DBB66', '#0F5B55'] },
            { id: 'districtGradient3', colors: ['#0F5B55', '#FF6B6B'] },
            { id: 'districtGradient4', colors: ['#FF6B6B', '#4ECDC4'] }
        ];

        gradients.forEach((gradient, idx) => {
            const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            grad.setAttribute('id', gradient.id);
            grad.setAttribute('x1', '0%');
            grad.setAttribute('y1', '0%');
            grad.setAttribute('x2', '100%');
            grad.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', gradient.colors[0]);
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', gradient.colors[1]);
            
            grad.appendChild(stop1);
            grad.appendChild(stop2);
            defs.appendChild(grad);
        });

        svg.appendChild(defs);

        // Render each district
        provinceDistricts.forEach((f, idx) => {
            const g = f.geometry;
            let d = '';
            if (g.type === 'Polygon') {
                d = pathFromPolygon(g.coordinates);
            } else if (g.type === 'MultiPolygon') {
                d = g.coordinates.map(poly => pathFromPolygon(poly)).join(' ');
            } else {
                return;
            }

            const districtName = f.properties.name || f.properties.shapeName;
            const districtData = this.provinceData.districts.find(d => 
                this.normalizeName(d.name) === this.normalizeName(districtName)
            );

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            path.setAttribute('class', `district-path district-gradient-${(idx % 4) + 1}`);
            path.setAttribute('data-district', districtName.toLowerCase().replace(/\s+/g, '-'));
            path.setAttribute('data-district-name', districtName);
            path.setAttribute('data-district-index', idx);

            // Store district data
            this.districts[districtName.toLowerCase()] = districtData || {
                name: districtName,
                population: 'N/A',
                area: 'N/A',
                highlights: []
            };

            // Enhanced hover events with animation
            path.addEventListener('mouseenter', (event) => {
                this.highlightDistrict(path, districtName, event);
                this.showDistrictCard(districtName, event);
            });

            path.addEventListener('mouseleave', () => {
                this.unhighlightDistrict(path);
                this.hideDistrictCard();
            });

            // Enhanced click event with selection
            path.addEventListener('click', (event) => {
                this.selectDistrict(path, districtName, event);
                this.onDistrictClick(districtName);
            });

            // Add animation delay for staggered appearance
            path.style.animationDelay = `${idx * 0.1}s`;
            path.style.opacity = '0';
            path.style.animation = 'fadeInDistrict 0.6s ease forwards';

            svg.appendChild(path);
        });

        this.container.appendChild(svg);
        
        // Add map controls functionality
        this.addMapControls();
    }

    // Highlight district on hover
    highlightDistrict(path, districtName, event) {
        // Remove previous highlights
        document.querySelectorAll('.district-path').forEach(p => {
            p.classList.remove('highlighted');
        });
        
        // Add highlight to current district
        path.classList.add('highlighted');
        
        // Add ripple effect
        this.createRippleEffect(event, path);
        
        // Show district name tooltip
        this.showDistrictTooltip(districtName, event);
    }

    // Remove highlight from district
    unhighlightDistrict(path) {
        path.classList.remove('highlighted');
        this.hideDistrictTooltip();
    }

    // Select district on click
    selectDistrict(path, districtName, event) {
        // Remove previous selections
        document.querySelectorAll('.district-path').forEach(p => {
            p.classList.remove('selected');
        });
        
        // Add selection to current district
        path.classList.add('selected');
        
        // Add selection animation
        this.createSelectionEffect(event, path);
    }

    // Create ripple effect on hover
    createRippleEffect(event, path) {
        const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const rect = path.getBoundingClientRect();
        const svgRect = path.ownerSVGElement.getBoundingClientRect();
        
        const x = event.clientX - svgRect.left;
        const y = event.clientY - svgRect.top;
        
        ripple.setAttribute('cx', x);
        ripple.setAttribute('cy', y);
        ripple.setAttribute('r', '0');
        ripple.setAttribute('fill', 'rgba(15, 91, 85, 0.3)');
        ripple.setAttribute('class', 'ripple-effect');
        
        path.ownerSVGElement.appendChild(ripple);
        
        // Animate ripple
        const animation = ripple.animate([
            { r: '0', opacity: '1' },
            { r: '20', opacity: '0' }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            ripple.remove();
        };
    }

    // Create selection effect on click
    createSelectionEffect(event, path) {
        const selection = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const rect = path.getBoundingClientRect();
        const svgRect = path.ownerSVGElement.getBoundingClientRect();
        
        const x = event.clientX - svgRect.left;
        const y = event.clientY - svgRect.top;
        
        selection.setAttribute('cx', x);
        selection.setAttribute('cy', y);
        selection.setAttribute('r', '0');
        selection.setAttribute('fill', 'rgba(15, 91, 85, 0.5)');
        selection.setAttribute('class', 'selection-effect');
        
        path.ownerSVGElement.appendChild(selection);
        
        // Animate selection
        const animation = selection.animate([
            { r: '0', opacity: '1' },
            { r: '30', opacity: '0' }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            selection.remove();
        };
    }

    // Show district information card
    showDistrictCard(districtName, event) {
        const districtData = this.districts[districtName.toLowerCase()];
        if (!districtData) return;

        // Create or update dynamic card
        let card = document.getElementById('districtCard');
        if (!card) {
            card = this.createDistrictCard();
        }

        // Update card content
        this.updateDistrictCard(card, districtData);

        // Position card
        this.positionDistrictCard(card, event);

        // Show with animation
        card.classList.add('show');
        this.currentHoveredDistrict = districtName;
    }

    // Hide district information card
    hideDistrictCard() {
        const card = document.getElementById('districtCard');
        if (card) {
            card.classList.remove('show');
            // Remove after animation completes
            setTimeout(() => {
                if (card && !card.classList.contains('show')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
        this.currentHoveredDistrict = null;
    }

    // Create district card element
    createDistrictCard() {
        const card = document.createElement('div');
        card.id = 'districtCard';
        card.className = 'district-card';
        card.style.display = 'none';
        
        card.innerHTML = `
            <div class="district-card-content">
                <div class="district-card-header">
                    <h3 id="districtCardTitle">Distrito</h3>
                    <div class="pill" id="districtCardPill">📍 Distrito</div>
                </div>
                <div class="district-card-body">
                    <div class="district-stats" id="districtStats">
                        <!-- Stats will be populated dynamically -->
                    </div>
                    <p id="districtCardDescription">Descripción del distrito...</p>
                    <div class="district-highlights" id="districtHighlights">
                        <!-- Highlights will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(card);
        return card;
    }

    // Update district card content
    updateDistrictCard(card, districtData) {
        const title = card.querySelector('#districtCardTitle');
        const pill = card.querySelector('#districtCardPill');
        const description = card.querySelector('#districtCardDescription');
        const stats = card.querySelector('#districtStats');
        const highlights = card.querySelector('#districtHighlights');

        title.textContent = districtData.name;
        pill.textContent = `📍 ${districtData.name}`;
        description.textContent = districtData.description || `Información sobre ${districtData.name}`;

        // Update stats
        stats.innerHTML = `
            <div class="stat-item">
                <div class="stat-number">${districtData.population || 'N/A'}</div>
                <div class="stat-label">Habitantes</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${districtData.area || 'N/A'}</div>
                <div class="stat-label">km²</div>
            </div>
        `;

        // Update highlights
        highlights.innerHTML = '';
        if (districtData.highlights && districtData.highlights.length > 0) {
            districtData.highlights.forEach(highlight => {
                const span = document.createElement('span');
                span.className = 'pill-light';
                span.textContent = highlight;
                highlights.appendChild(span);
            });
        }
    }

    // Position district card
    positionDistrictCard(card, event) {
        const rect = this.container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const cardWidth = 300;
        const cardHeight = 250;
        
        // Position to the right of the cursor, but adjust if it goes off screen
        let finalX = Math.min(x + 20, rect.width - cardWidth - 20);
        let finalY = Math.max(10, Math.min(y - cardHeight / 2, rect.height - cardHeight - 10));
        
        // If it would go off the right side, position to the left
        if (x + 20 + cardWidth > rect.width) {
            finalX = Math.max(10, x - cardWidth - 20);
        }
        
        card.style.left = `${finalX}px`;
        card.style.top = `${finalY}px`;
    }

    // Handle district click
    onDistrictClick(districtName) {
        // District selected
        // You can add navigation or other actions here
    }

    // Show district name tooltip
    showDistrictTooltip(districtName, event) {
        // Remove existing tooltip
        this.hideDistrictTooltip();
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.id = 'districtTooltip';
        tooltip.className = 'district-tooltip';
        tooltip.textContent = districtName;
        
        // Position tooltip relative to the map container
        const rect = this.container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Adjust position to avoid going off-screen
        const tooltipWidth = 120; // Approximate width
        const tooltipHeight = 30; // Approximate height
        
        let finalX = x + 10;
        let finalY = y - 40;
        
        // Adjust if tooltip would go off the right edge
        if (finalX + tooltipWidth > rect.width) {
            finalX = x - tooltipWidth - 10;
        }
        
        // Adjust if tooltip would go off the top edge
        if (finalY < 0) {
            finalY = y + 20;
        }
        
        tooltip.style.left = `${finalX}px`;
        tooltip.style.top = `${finalY}px`;
        
        // Add to map container
        this.container.appendChild(tooltip);
        
        // Show with animation
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
    }

    // Hide district tooltip
    hideDistrictTooltip() {
        const tooltip = document.getElementById('districtTooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Add map controls functionality
    addMapControls() {
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        const resetViewBtn = document.getElementById('resetViewBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.zoomIn());
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.zoomOut());
        }

        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => this.resetView());
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
    }

    // Zoom in functionality
    zoomIn() {
        const svg = this.container.querySelector('svg');
        if (!svg) return;

        const currentScale = parseFloat(svg.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || '1');
        const newScale = Math.min(currentScale * 1.2, 3);
        
        svg.style.transform = `scale(${newScale})`;
        svg.style.transformOrigin = 'center center';
        svg.style.transition = 'transform 0.3s ease';
    }

    // Zoom out functionality
    zoomOut() {
        const svg = this.container.querySelector('svg');
        if (!svg) return;

        const currentScale = parseFloat(svg.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || '1');
        const newScale = Math.max(currentScale / 1.2, 0.5);
        
        svg.style.transform = `scale(${newScale})`;
        svg.style.transformOrigin = 'center center';
        svg.style.transition = 'transform 0.3s ease';
    }

    // Reset view functionality
    resetView() {
        const svg = this.container.querySelector('svg');
        if (!svg) return;

        svg.style.transform = 'scale(1)';
        svg.style.transformOrigin = 'center center';
        svg.style.transition = 'transform 0.3s ease';
    }

    // Toggle fullscreen functionality
    toggleFullscreen() {
        const mapContainer = this.container;
        
        if (!document.fullscreenElement) {
            mapContainer.requestFullscreen().then(() => {
                // Adjust map size for fullscreen
                const svg = mapContainer.querySelector('svg');
                if (svg) {
                    svg.style.width = '100vw';
                    svg.style.height = '100vh';
                }
            }).catch(err => {
                // Fullscreen error handled
            });
        } else {
            document.exitFullscreen().then(() => {
                // Reset map size
                const svg = mapContainer.querySelector('svg');
                if (svg) {
                    svg.style.width = '100%';
                    svg.style.height = 'auto';
                }
            });
        }
    }
}

// CSS styles for district cards
const districtCardStyles = `
    .district-card {
        position: absolute;
        width: 300px;
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        pointer-events: none;
    }
    
    .district-card-content {
        padding: 0;
    }
    
    .district-card-header {
        position: relative;
        padding: 1rem;
        background: linear-gradient(135deg, var(--jungle-teal) 0%, var(--ocean-blue) 100%);
        color: white;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
    
    .district-card-header h3 {
        margin: 0;
        color: white;
        font-size: 1.2rem;
    }
    
    .district-card-header .pill {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
    }
    
    .district-card-body {
        padding: 1rem;
    }
    
    .district-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .district-stats .stat-item {
        text-align: center;
        padding: 0.5rem;
        background: var(--seafoam);
        border-radius: var(--radius-sm);
    }
    
    .district-stats .stat-number {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--jungle-teal);
        font-family: var(--font-display);
    }
    
    .district-stats .stat-label {
        color: var(--neutral-gray);
        font-weight: 500;
        font-size: 12px;
    }
    
    .district-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-top: 0.5rem;
    }
    
    .district-path {
        fill: var(--seafoam);
        stroke: var(--jungle-teal);
        stroke-width: 1.5;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .district-path:hover {
        fill: var(--palm-leaf);
        transform: scale(1.02);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Add styles to document
if (!document.getElementById('districtCardStyles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'districtCardStyles';
    styleSheet.textContent = districtCardStyles;
    document.head.appendChild(styleSheet);
}
