# Local From Bocas - System Patterns

## Arquitectura del Sistema

### Estructura de Archivos
```
local-from-bocas/
├── index.html                 # Página de inicio
├── servicios.html            # Servicios y productos
├── vlogs.html               # Blog/artículos
├── panama.html              # Página principal de Panamá con mapa interactivo
├── panama/                  # Subpáginas de provincias y comarcas
│   ├── bocas-del-toro.html
│   ├── chiriqui.html
│   ├── cocle.html
│   ├── colon.html
│   ├── darien.html
│   ├── herrera.html
│   ├── los-santos.html
│   ├── panama.html
│   ├── panama-oeste.html
│   ├── veraguas.html
│   ├── guna-yala.html
│   ├── embera-wounaan.html
│   └── ngabe-bugle.html
├── nosotros.html            # Sobre la marca
├── contacto.html            # Formularios de contacto
├── css/
│   ├── styles.css           # Sistema de diseño completo
│   ├── geojson-map.css      # Estilos específicos para mapas
│   └── panama-map.css       # Estilos del mapa de Panamá
├── js/
│   ├── main.js              # Funcionalidad interactiva principal
│   ├── panama-interactive.js # Funcionalidad del mapa interactivo
│   ├── panama-map.js        # Lógica del mapa de Panamá
│   └── svg-loader.js        # Cargador de SVGs
├── data/
│   └── geoBoundaries-PAN-ADM1.geojson # Datos geográficos de Panamá
├── svgs/                    # Archivos SVG de provincias y comarcas
│   ├── bocas-del-toro.svg
│   ├── chiriqui.svg
│   ├── cocle.svg
│   ├── colon.svg
│   ├── darien.svg
│   ├── embera-wounaan.svg
│   ├── guna-yala.svg
│   └── ngabe-bugle.svg
├── images/                  # Imágenes y assets
└── content/                 # Contenido dinámico
    └── articulos/           # Artículos del blog
```

## Patrones de Diseño

### Sistema de Colores
- **Variables CSS**: Todas las referencias de color centralizadas
- **Dark Mode**: Variables preparadas para tema oscuro
- **Consistencia**: Uso estricto de la paleta definida
- **Paleta inspirada en Bocas del Toro**: Colores que reflejan la naturaleza caribeña

### Componentes Reutilizables
- **Cards**: Para servicios, artículos y productos
- **Botones**: 4 variantes (primary, secondary, olive, text)
- **Pills Vintage**: Para etiquetas y categorías
- **Steps**: Números circulares para procesos
- **Callouts**: Burbujas de precio y destacados
- **Mapa Interactivo**: Componente reutilizable para mapas SVG

### Layout Patterns
- **Container**: Máximo 1200px con padding responsivo
- **Grid System**: 2, 3, 4 columnas que se adaptan a móvil
- **Spacing**: Sistema consistente basado en múltiplos de 8px
- **Hero Sections**: Full-bleed con overlay degradado
- **Ancho Adaptativo**: Sistema inteligente para mapas (90% desktop, 95% tablet, 100% móvil)

## Patrones de Navegación

### Estructura Optimizada para Conversión
1. **Inicio** → Primera impresión y propuesta de valor
2. **Servicios** → Productos principales (fuente de ingresos)
3. **Vlogs** → Contenido de valor para engagement
4. **Panamá** → Autoridad y expertise con mapa interactivo
5. **Nosotros** → Confianza y conexión emocional
6. **Contacto** → Punto de conversión final

### Navegación Responsiva
- **Desktop**: Navbar horizontal con tabs cápsula
- **Mobile**: Menú hamburguesa implementado
- **Sticky Navigation**: Header fijo para mejor UX
- **Navegación por Mapa**: Click directo en provincias/comarcas

## Patrones de Mapa Interactivo

### Sistema de Posicionamiento Inteligente
- **Provincias del lado izquierdo**: Popup a la derecha
- **Provincias del lado derecho**: Popup a la izquierda
- **Provincias especiales**: Posicionamiento específico (ej: Colón en la parte inferior)
- **Lógica adaptativa**: Se ajusta según la posición del cursor

### Funcionalidades del Mapa
- **Hover interactivo**: Popups informativos al pasar el mouse
- **Click navigation**: Navegación directa a páginas de provincias
- **GeoJSON real**: Datos geográficos precisos de Panamá
- **Responsive design**: Se adapta a todos los tamaños de pantalla
- **Contenedor transparente**: Sin bordes ni fondos de color

### Estructura de Datos
```javascript
const regionData = {
    'bocas-del-toro': {
        name: 'Bocas del Toro',
        type: 'provincia',
        image: 'url',
        pill: '🏝️ Caribe',
        description: 'Descripción de la región...',
        highlights: ['🌊 Archipiélago único', '🌿 Biodiversidad excepcional']
    }
    // ... más regiones
};
```

## Patrones de Contenido

### Artículos de Valor
- **Estructura consistente**: Título, resumen, contenido, CTA
- **SEO optimizado**: Meta tags, headings jerárquicos
- **Imágenes optimizadas**: Lazy loading, formatos modernos
- **Compartir social**: Botones para redes sociales

### Páginas de Servicios
- **Hero section**: Propuesta de valor clara
- **Beneficios**: Lista de ventajas del servicio
- **Testimonios**: Social proof de clientes
- **CTA prominente**: Botón de acción claro

### Páginas de Provincias/Comarcas
- **Hero section**: Imagen representativa de la región
- **Información geográfica**: Ubicación, características principales
- **Atractivos turísticos**: Lugares de interés
- **Cultura e historia**: Información cultural específica
- **Galería de imágenes**: Visualización de la región

## Patrones Técnicos

### Performance
- **CSS optimizado**: Variables, reutilización de estilos
- **Imágenes**: Formatos modernos (WebP), lazy loading
- **JavaScript**: Carga diferida, funcionalidad progresiva
- **Caching**: Headers apropiados para assets estáticos
- **Mapa SVG**: Renderizado eficiente con GeoJSON

### SEO
- **Meta tags**: Títulos y descripciones únicos por página
- **Estructura semántica**: HTML5 con roles ARIA
- **URLs amigables**: Estructura clara y descriptiva
- **Sitemap**: Generación automática para motores de búsqueda
- **Contenido geográfico**: Optimización para búsquedas locales

### Accesibilidad
- **Contraste**: Cumple estándares WCAG AA
- **Navegación por teclado**: Todos los elementos accesibles
- **Screen readers**: Roles y labels apropiados
- **Responsive**: Funciona en todos los dispositivos
- **Mapa accesible**: Navegación por teclado en elementos SVG

## Patrones de Deployment

### GitHub Workflow
- **Main branch**: Código de producción
- **Feature branches**: Desarrollo de nuevas funcionalidades
- **Pull requests**: Revisión de código antes de merge
- **Issues**: Seguimiento de bugs y mejoras

### Railway Deployment
- **Automatic deploys**: Desde main branch
- **Environment variables**: Configuración segura
- **Custom domain**: Configuración de DNS
- **SSL**: Certificados automáticos

## Patrones de Mapa Interactivo Específicos

### Carga de Datos
```javascript
async function loadPanamaMap() {
    const response = await fetch('./data/geoBoundaries-PAN-ADM1.geojson');
    const geo = await response.json();
    renderMap(geo);
}
```

### Renderizado SVG
```javascript
function renderMap(geo) {
    // Crear SVG
    // Calcular bounds
    // Proyectar coordenadas
    // Crear paths para cada provincia/comarca
    // Agregar eventos de hover y click
}
```

### Posicionamiento de Popups
```javascript
// Provincias específicas con posicionamiento fijo
const rightSideProvinces = ['bocas-del-toro', 'chiriqui', 'ngabe-bugle'];
const leftSideProvinces = ['herrera', 'los-santos', 'veraguas', 'cocle'];
const bottomSideProvinces = ['colon'];
```

## Patrones de Responsive Design

### Breakpoints
- **Desktop**: >1024px - Ancho 90%, máximo 1400px
- **Tablet**: 768px - 1024px - Ancho 95%
- **Mobile**: <768px - Ancho 100%

### Mapa Responsivo
- **Desktop**: Altura 600px, bordes redondeados
- **Tablet**: Altura 500px, bordes menos redondeados
- **Mobile**: Altura 400px, sin bordes, ancho completo