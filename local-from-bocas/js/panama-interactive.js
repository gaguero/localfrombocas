// Datos de las provincias y comarcas
const regionData = {
    'bocas-del-toro': {
        name: 'Bocas del Toro',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/0F5B55/FFFFFF?text=Bocas+del+Toro+Caribbean',
        pill: '🏝️ Caribe',
        description: 'Conocida como "Las Galápagos del Siglo XXI", esta provincia caribeña alberga una biodiversidad excepcional y una rica cultura afrocaribeña.',
        highlights: ['🌊 Archipiélago único', '🌿 Biodiversidad excepcional', '🎭 Cultura afrocaribeña']
    },
    'chiriqui': {
        name: 'Chiriquí',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/8DBB66/FFFFFF?text=Chiriqui',
        pill: '🏔️ Tierras Altas',
        description: 'La "Suiza de Panamá" con sus tierras altas, volcanes y clima templado. Cuna de la agricultura de altura y el ecoturismo.',
        highlights: ['🌋 Volcán Barú', '☕ Café de altura', '🌲 Bosques nubosos']
    },
    'cocle': {
        name: 'Coclé',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/FF7466/FFFFFF?text=Cocle',
        pill: '🏖️ Pacífico Central',
        description: 'Corazón geográfico de Panamá con playas del Pacífico, montañas y una rica tradición cultural que incluye el famoso Carnaval de Penonomé.',
        highlights: ['🎭 Carnaval tradicional', '🏖️ Playas del Pacífico', '🏔️ Cordillera Central']
    },
    'colon': {
        name: 'Colón',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/2C8AC6/FFFFFF?text=Colon',
        pill: '🚢 Zona Libre',
        description: 'Puerta de entrada del Caribe con la Zona Libre de Colón, fortificaciones coloniales y playas caribeñas vírgenes.',
        highlights: ['🏰 Fortificaciones coloniales', '🛒 Zona Libre', '🏝️ Islas caribeñas']
    },
    'darien': {
        name: 'Darién',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/5B4B3F/FFFFFF?text=Darien',
        pill: '🌿 Selva Virgen',
        description: 'La provincia más salvaje de Panamá con selvas vírgenes, comunidades indígenas y el famoso Tapón del Darién.',
        highlights: ['🌳 Selva virgen', '👥 Comunidades indígenas', '🦜 Biodiversidad única']
    },
    'herrera': {
        name: 'Herrera',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/8DBB66/FFFFFF?text=Herrera',
        pill: '🌾 Azuero',
        description: 'Corazón de la Península de Azuero con tradiciones folclóricas, artesanías y una rica herencia cultural española.',
        highlights: ['🎭 Folclor tradicional', '🏺 Artesanías', '🌾 Tradición ganadera']
    },
    'los-santos': {
        name: 'Los Santos',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/FF7466/FFFFFF?text=Los+Santos',
        pill: '🎭 Folclor',
        description: 'Cuna del folclor panameño con el famoso Festival de la Mejorana, tradiciones centenarias y hermosas playas del Pacífico.',
        highlights: ['🎪 Festival de la Mejorana', '🏖️ Playas del Pacífico', '🎭 Folclor auténtico']
    },
    'panama': {
        name: 'Panamá',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/0F5B55/FFFFFF?text=Panama',
        pill: '🏙️ Capital',
        description: 'La capital del país con el Casco Antiguo, rascacielos modernos, el Canal de Panamá y una vibrante vida urbana.',
        highlights: ['🏗️ Canal de Panamá', '🏛️ Casco Antiguo', '🌆 Vida urbana']
    },
    'panama-oeste': {
        name: 'Panamá Oeste',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/2C8AC6/FFFFFF?text=Panama+Oeste',
        pill: '🌊 Pacífico',
        description: 'La provincia más joven con hermosas playas del Pacífico, desarrollo urbano y acceso directo a la capital.',
        highlights: ['🏖️ Playas del Pacífico', '🏘️ Desarrollo urbano', '🌊 Acceso al mar']
    },
    'veraguas': {
        name: 'Veraguas',
        type: 'provincia',
        image: 'https://via.placeholder.com/350x200/5B4B3F/FFFFFF?text=Veraguas',
        pill: '🌊 Dos Mares',
        description: 'La única provincia con costas en ambos océanos, rica en historia colonial y hermosos paisajes naturales.',
        highlights: ['🌊 Caribe y Pacífico', '🏰 Historia colonial', '🏔️ Paisajes naturales']
    },
    'guna-yala': {
        name: 'Guna Yala',
        type: 'comarca',
        image: 'https://via.placeholder.com/350x200/0F5B55/FFFFFF?text=Guna+Yala',
        pill: '🏝️ Caribe',
        description: 'Comarca autónoma en el Caribe con 365 islas, cultura guna preservada y hermosas playas vírgenes.',
        highlights: ['🏝️ 365 islas', '🎨 Molas tradicionales', '🌊 Aguas cristalinas']
    },
    'embera-wounaan': {
        name: 'Emberá-Wounaan',
        type: 'comarca',
        image: 'https://via.placeholder.com/350x200/8DBB66/FFFFFF?text=Embera-Wounaan',
        pill: '🌿 Selva',
        description: 'Comarca en la selva del Darién que preserva las tradiciones de los pueblos emberá y wounaan.',
        highlights: ['🌳 Selva tropical', '🎨 Artesanías en madera', '🏹 Tradiciones ancestrales']
    },
    'ngabe-bugle': {
        name: 'Ngäbe-Buglé',
        type: 'comarca',
        image: 'https://via.placeholder.com/350x200/FF7466/FFFFFF?text=Ngabe-Bugle',
        pill: '🏔️ Tierras Altas',
        description: 'La comarca más grande de Panamá en las tierras altas, hogar de los pueblos ngäbe y buglé.',
        highlights: ['🏔️ Tierras altas', '☕ Cultivo de café', '🎭 Tradiciones vivas']
    }
};

// Función para mostrar la tarjeta dinámica
function showDynamicCard(regionKey) {
    const region = regionData[regionKey];
    if (!region) return;

    const card = document.getElementById('dynamicCard');
    const image = document.getElementById('dynamicCardImage');
    const pill = document.getElementById('dynamicCardPill');
    const title = document.getElementById('dynamicCardTitle');
    const description = document.getElementById('dynamicCardDescription');
    const highlights = document.getElementById('dynamicCardHighlights');
    const button = document.getElementById('dynamicCardButton');

    image.src = region.image;
    image.alt = region.name;
    pill.textContent = region.pill;
    title.textContent = region.name;
    description.textContent = region.description;
    
    highlights.innerHTML = '';
    region.highlights.forEach(highlight => {
        const span = document.createElement('span');
        span.className = 'pill-light';
        span.textContent = highlight;
        highlights.appendChild(span);
    });

    button.textContent = region.type === 'comarca' ? 'Explorar Comarca' : 'Explorar Provincia';
    button.href = `panama/${regionKey}.html`;

    card.style.display = 'block';
}

// Función para ocultar la tarjeta dinámica
function hideDynamicCard() {
    const card = document.getElementById('dynamicCard');
    card.style.display = 'none';
}

// Función para cargar y renderizar el mapa GeoJSON
async function loadPanamaMap() {
    try {
        const response = await fetch('./data/geoBoundaries-PAN-ADM1.geojson');
        const geo = await response.json();
        renderMap(geo);
    } catch (error) {
        console.error('Error cargando GeoJSON:', error);
    }
}

// Función para renderizar el mapa
function renderMap(geo) {
    const container = document.getElementById('panamaMap');
    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1000 400');
    svg.style.width = '100%';
    svg.style.height = '100%';

    // Calcular bounds
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

    for (const f of geo.features) {
        const g = f.geometry;
        if (!g) continue;
        if (g.type === 'Polygon') scanCoords([g.coordinates]);
        if (g.type === 'MultiPolygon') scanCoords(g.coordinates);
    }

    const viewW = 1000, viewH = 400;
    function project([lon, lat]) {
        const x = (lon - minLon) / (maxLon - minLon) * viewW;
        const y = (maxLat - lat) / (maxLat - minLat) * viewH;
        return [x, y];
    }

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

    geo.features.forEach((f, idx) => {
        const g = f.geometry;
        let d = '';
        if (g.type === 'Polygon') {
            d = pathFromPolygon(g.coordinates);
        } else if (g.type === 'MultiPolygon') {
            d = g.coordinates.map(poly => pathFromPolygon(poly)).join(' ');
        } else {
            return;
        }

        const name = f.properties.shapeName || `Región ${idx + 1}`;
        const normalizedName = normalizeName(name);
        const isComarca = name.includes('Comarca');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', isComarca ? 'comarca-path' : 'province-path');
        path.setAttribute('data-region', normalizedName);

        // Eventos de hover
        path.addEventListener('mouseenter', () => {
            showDynamicCard(normalizedName);
        });

        path.addEventListener('mouseleave', () => {
            hideDynamicCard();
        });

        // Evento de click
        path.addEventListener('click', () => {
            window.location.href = `panama/${normalizedName}.html`;
        });

        svg.appendChild(path);
    });

    container.appendChild(svg);
}

// Función para normalizar nombres
function normalizeName(name) {
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

// Cargar el mapa cuando se carga la página
document.addEventListener('DOMContentLoaded', loadPanamaMap);
