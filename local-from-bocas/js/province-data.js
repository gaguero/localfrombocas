// Province Data Configuration
// Contains specific data for each province including districts and statistics
// Updated to match actual GeoJSON district data

const provinceData = {
    'bocas-del-toro': {
        name: 'Bocas del Toro',
        type: 'provincia',
        geoJsonId: 'PA-1',
        image: 'https://via.placeholder.com/1920x800/0F5B55/FFFFFF?text=Bocas+del+Toro+Caribbean',
        pill: '🏝️ Caribe',
        description: 'Conocida como "Las Galápagos del Siglo XXI", esta provincia caribeña alberga una biodiversidad excepcional y una rica cultura afrocaribeña.',
        highlights: ['🌊 Archipiélago único', '🌿 Biodiversidad excepcional', '🎭 Cultura afrocaribeña'],
        
        // Province statistics
        stats: {
            area: '4,643 km²',
            population: '125,000',
            districts: 4,
            islands: 9,
            nationalParks: 3
        },
        
        // District information - Official 4 districts of Bocas del Toro
        districts: [
            {
                name: 'BOCAS DEL TORO',
                population: '15,000',
                area: '120 km²',
                description: 'Distrito capital que incluye la ciudad de Bocas Town, centro urbano y cultural de la provincia.',
                highlights: ['🏛️ Bocas Town', '🏖️ Playa Bluff', '🌊 Surf', '🏨 Hoteles'],
                isCapital: true,
                corregimientos: ['Bocas del Toro', 'Bastimentos', 'Boca del Drago', 'Punta Laurel', 'San Cristóbal', 'Tierra Oscura']
            },
            {
                name: 'CHANGUINOLA',
                population: '45,000',
                area: '1,200 km²',
                description: 'Distrito continental más poblado, centro agrícola y comercial de la provincia.',
                highlights: ['🌾 Agricultura', '🏭 Comercio', '🚂 Ferrocarril', '🌿 Plantaciones'],
                corregimientos: ['Changuinola', 'Barriada 4 de Abril', 'Barranco Adentro', 'Finca 4', 'Finca 6', 'Finca 12', 'Finca 30', 'Finca 51', 'Finca 60', 'Finca 66', 'Guabito', 'La Mesa', 'El Empalme', 'El Silencio', 'Las Tablas', 'Las Delicias', 'Cochigro', 'La Gloria']
            },
            {
                name: 'ALMIRANTE',
                population: '8,000',
                area: '300 km²',
                description: 'Distrito portuario con importante actividad comercial y turística.',
                highlights: ['🚢 Puerto', '🏨 Turismo', '🛒 Comercio', '🌊 Costa'],
                corregimientos: ['Almirante', 'Bajo Culubre', 'Barriada Guaymí', 'Barrio Francés', 'Cauchero', 'Ceiba', 'Miraflores', 'Nance de Riscó', 'Valle de Aguas Arriba', 'Valle de Riscó']
            },
            {
                name: 'CHIRIQUÍ GRANDE',
                population: '8,500',
                area: '800 km²',
                description: 'Distrito costero con hermosas playas y actividades pesqueras.',
                highlights: ['🌊 Playas', '🐟 Pesca', '🏖️ Turismo', '🌴 Coco'],
                corregimientos: ['Chiriquí Grande', 'Bajo Cedro', 'Miramar', 'Punta Peña', 'Punta Robalo', 'Rambala']
            }
        ]
    },

    'chiriquí': {
        name: 'Chiriquí',
        type: 'provincia',
        geoJsonId: 'PA-4',
        image: 'https://via.placeholder.com/1920x800/0F5B55/FFFFFF?text=Chiriquí+Mountains',
        pill: '🏔️ Montañas',
        description: 'Conocida como "La Suiza de Panamá", esta provincia montañosa ofrece paisajes espectaculares y clima templado.',
        highlights: ['🏔️ Volcán Barú', '☕ Café de altura', '🌿 Tierras altas', '🌡️ Clima templado'],
        
        stats: {
            area: '6,477 km²',
            population: '416,000',
            districts: 102,
            elevation: '3,475m (Volcán Barú)',
            coffeeFarms: 500
        },
        
        // Note: 102 districts - too many to list individually
        districts: [
            {
                name: 'DAVID',
                population: '150,000',
                area: '1,200 km²',
                description: 'Distrito capital de Chiriquí, centro comercial y administrativo de la provincia.',
                highlights: ['🏛️ Capital', '🏭 Comercio', '🏥 Servicios', '✈️ Aeropuerto'],
                isCapital: true
            },
            {
                name: 'BOQUETE',
                population: '25,000',
                area: '500 km²',
                description: 'Distrito de tierras altas famoso por su café y clima templado.',
                highlights: ['☕ Café', '🌡️ Clima templado', '🏔️ Montañas', '🌿 Naturaleza']
            },
            {
                name: 'VOLCÁN',
                population: '15,000',
                area: '400 km²',
                description: 'Distrito de alta montaña con hermosos paisajes y agricultura de altura.',
                highlights: ['🏔️ Volcán Barú', '🌾 Agricultura', '🌡️ Clima frío', '🌿 Naturaleza']
            }
            // Note: 99 more districts exist in the GeoJSON but not listed here for brevity
        ]
    },

    'panamá': {
        name: 'Panamá',
        type: 'provincia',
        geoJsonId: 'PA-8',
        image: 'https://via.placeholder.com/1920x800/0F5B55/FFFFFF?text=Panamá+City',
        pill: '🏙️ Capital',
        description: 'Provincia capital que alberga la Ciudad de Panamá, centro financiero y cultural del país.',
        highlights: ['🏙️ Ciudad de Panamá', '🏛️ Casco Antiguo', '🌉 Canal de Panamá', '🏦 Centro financiero'],
        
        stats: {
            area: '11,747 km²',
            population: '1,500,000',
            districts: 55,
            elevation: '0-1,000m',
            urbanArea: '85%'
        },
        
        districts: [
            {
                name: 'PANAMÁ',
                population: '800,000',
                area: '2,500 km²',
                description: 'Distrito capital que incluye la Ciudad de Panamá, centro urbano y financiero.',
                highlights: ['🏛️ Casco Antiguo', '🏦 Centro financiero', '🌉 Canal', '🏙️ Rascacielos'],
                isCapital: true
            },
            {
                name: 'SAN MIGUELITO',
                population: '300,000',
                area: '1,800 km²',
                description: 'Distrito urbano con importante población y desarrollo comercial.',
                highlights: ['🏙️ Urbano', '🏭 Comercio', '🏥 Servicios', '🚇 Metro']
            },
            {
                name: 'TABOGA',
                population: '2,000',
                area: '50 km²',
                description: 'Distrito insular con hermosas playas y turismo.',
                highlights: ['🏝️ Isla Taboga', '🏖️ Playas', '🌊 Turismo', '🐟 Pesca']
            }
            // Note: 52 more districts exist in the GeoJSON
        ]
    },

    'veraguas': {
        name: 'Veraguas',
        type: 'provincia',
        geoJsonId: 'PA-9',
        image: 'https://via.placeholder.com/1920x800/0F5B55/FFFFFF?text=Veraguas+Nature',
        pill: '🌿 Naturaleza',
        description: 'Provincia central con rica biodiversidad, playas vírgenes y tradiciones culturales.',
        highlights: ['🏖️ Playas vírgenes', '🌿 Biodiversidad', '🎭 Tradiciones', '🏔️ Montañas'],
        
        stats: {
            area: '10,677 km²',
            population: '220,000',
            districts: 115,
            coastline: '200 km',
            nationalParks: 2
        },
        
        districts: [
            {
                name: 'SANTIAGO',
                population: '80,000',
                area: '1,500 km²',
                description: 'Distrito capital de Veraguas, centro comercial y administrativo.',
                highlights: ['🏛️ Capital', '🏭 Comercio', '🏥 Servicios', '🌾 Agricultura'],
                isCapital: true
            },
            {
                name: 'ATALAYA',
                population: '15,000',
                area: '800 km²',
                description: 'Distrito con rica biodiversidad y actividades ecoturísticas.',
                highlights: ['🌿 Biodiversidad', '🐦 Aves', '🌊 Ecoturismo', '🏔️ Naturaleza']
            },
            {
                name: 'CALOBRE',
                population: '12,000',
                area: '600 km²',
                description: 'Distrito con tradiciones culturales y actividades agrícolas.',
                highlights: ['🎭 Cultura', '🌾 Agricultura', '🏔️ Montañas', '🌿 Plantaciones']
            }
            // Note: 112 more districts exist in the GeoJSON
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = provinceData;
}
