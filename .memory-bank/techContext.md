# Local From Bocas - Tech Context

## Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Sistema de diseño personalizado con variables CSS
- **JavaScript (Vanilla)**: Interactividad sin dependencias externas
- **Responsive Design**: Mobile-first approach
- **SVG**: Mapas vectoriales interactivos
- **GeoJSON**: Datos geográficos reales de Panamá

### Hosting y Deployment
- **Railway**: Plataforma de hosting para el sitio web
- **GitHub**: Control de versiones y colaboración
- **Custom Domain**: Dominio personalizado para la marca

### Herramientas de Desarrollo
- **VS Code/Cursor**: Editor de código principal
- **Git**: Control de versiones
- **Terminal**: Comandos de desarrollo y deployment
- **Memory Bank**: Sistema de documentación del proyecto

## Arquitectura del Proyecto

### Estructura de Carpetas
```
local-from-bocas/
├── css/                     # Estilos del sistema de diseño
│   ├── styles.css          # Sistema principal
│   ├── geojson-map.css     # Estilos de mapas
│   └── panama-map.css      # Estilos específicos de Panamá
├── js/                      # Funcionalidad JavaScript
│   ├── main.js             # Funcionalidad principal
│   ├── panama-interactive.js # Mapa interactivo
│   ├── panama-map.js       # Lógica del mapa
│   └── svg-loader.js       # Cargador de SVGs
├── data/                    # Datos geográficos
│   └── geoBoundaries-PAN-ADM1.geojson
├── svgs/                    # Archivos SVG de provincias
├── images/                  # Assets visuales
├── panama/                  # Subpáginas de provincias
└── content/                 # Contenido dinámico
```

### Sistema de Diseño
- **Variables CSS**: Centralización de colores, tipografías y espaciados
- **Componentes modulares**: Botones, cards, inputs reutilizables
- **Grid system**: Layout responsivo basado en CSS Grid
- **Typography scale**: Jerarquía tipográfica consistente
- **Mapa interactivo**: Componente reutilizable con posicionamiento inteligente

## Configuración de Deployment

### GitHub Repository
- **Repository name**: `local-from-bocas`
- **Branch strategy**: Main branch para producción
- **README**: Documentación del proyecto
- **Issues**: Seguimiento de tareas y bugs

### Railway Configuration
- **Service type**: Static site
- **Build command**: No requerido (sitio estático)
- **Deploy command**: Automático desde GitHub
- **Environment**: Production

### Dominio y DNS
- **Custom domain**: `localfrombocas.com` (a configurar)
- **SSL**: Certificado automático de Railway
- **CDN**: Distribución global incluida

## Dependencias y Assets

### Fuentes Web
- **DM Serif Display**: Para títulos y elementos display
- **Inter**: Para texto del cuerpo y UI
- **Cormorant Garamond**: Fallback para títulos
- **System fonts**: Fallback para mejor performance

### Imágenes y Assets
- **Formato preferido**: WebP con fallback JPEG/PNG
- **Optimización**: Compresión automática
- **Lazy loading**: Carga diferida para mejor performance
- **Responsive images**: Diferentes tamaños para diferentes dispositivos
- **SVG**: Mapas vectoriales para escalabilidad perfecta

### Datos Geográficos
- **GeoJSON**: Formato estándar para datos geográficos
- **geoBoundaries**: Fuente de datos administrativos de Panamá
- **Coordenadas precisas**: Datos reales de provincias y comarcas

## Performance y Optimización

### CSS
- **Variables CSS**: Reducción de duplicación
- **Minificación**: Para producción
- **Critical CSS**: Estilos críticos inline
- **Unused CSS**: Eliminación de estilos no utilizados
- **Responsive design**: Media queries optimizadas

### JavaScript
- **Vanilla JS**: Sin dependencias externas
- **Progressive enhancement**: Funcionalidad básica sin JS
- **Lazy loading**: Carga diferida de scripts no críticos
- **Minificación**: Para producción
- **Event delegation**: Optimización de eventos
- **RequestAnimationFrame**: Para animaciones suaves

### Imágenes
- **WebP format**: Mejor compresión
- **Responsive images**: srcset para diferentes resoluciones
- **Lazy loading**: Carga bajo demanda
- **Optimización**: Compresión automática
- **SVG**: Mapas vectoriales para escalabilidad

### Mapa Interactivo
- **GeoJSON optimizado**: Datos comprimidos
- **SVG renderizado**: Renderizado eficiente
- **Event listeners**: Optimización de eventos de hover y click
- **Posicionamiento inteligente**: Cálculos optimizados para popups

## SEO y Accesibilidad

### SEO Técnico
- **Meta tags**: Títulos y descripciones únicos
- **Structured data**: Schema.org markup
- **Sitemap**: Generación automática
- **Robots.txt**: Control de indexación
- **Contenido geográfico**: Optimización para búsquedas locales

### Accesibilidad
- **WCAG AA**: Cumplimiento de estándares
- **Semantic HTML**: Estructura semántica
- **ARIA labels**: Para elementos interactivos
- **Keyboard navigation**: Navegación por teclado
- **Mapa accesible**: Navegación por teclado en elementos SVG
- **Contraste**: Cumple estándares de accesibilidad

## Monitoreo y Analytics

### Herramientas de Análisis
- **Google Analytics**: Métricas de tráfico
- **Google Search Console**: Rendimiento en búsquedas
- **Railway Metrics**: Monitoreo del servidor
- **Core Web Vitals**: Métricas de performance

### Métricas Clave
- **Page load time**: Tiempo de carga
- **Bounce rate**: Tasa de rebote
- **Conversion rate**: Tasa de conversión
- **User engagement**: Tiempo en sitio
- **Mapa interactions**: Hover y click en provincias

## Seguridad

### Medidas Implementadas
- **HTTPS**: Certificado SSL automático
- **Security headers**: Headers de seguridad
- **Content Security Policy**: Prevención de XSS
- **Input validation**: Validación de formularios
- **Sanitización**: Limpieza de datos de entrada

### Backup y Recuperación
- **Git history**: Historial completo de cambios
- **Railway backups**: Backups automáticos del servidor
- **Content backup**: Respaldo del contenido
- **Disaster recovery**: Plan de recuperación ante desastres

## Funcionalidades Avanzadas

### Mapa Interactivo
- **GeoJSON real**: Datos geográficos precisos
- **Posicionamiento inteligente**: Popups según ubicación
- **Navegación por click**: Enlaces directos a páginas
- **Responsive design**: Adaptación a todos los dispositivos
- **Performance optimizado**: Renderizado eficiente

### Sistema de Popups
- **Posicionamiento específico**: Por provincia/comarca
- **Contenido dinámico**: Información en tiempo real
- **Animaciones suaves**: Transiciones elegantes
- **Accesibilidad**: Navegación por teclado

### Responsive Design
- **Mobile-first**: Enfoque desde móvil
- **Breakpoints inteligentes**: 768px, 1024px
- **Ancho adaptativo**: 90% desktop, 95% tablet, 100% móvil
- **Alturas responsivas**: 600px desktop, 500px tablet, 400px móvil

## Configuración de Desarrollo

### Variables de Entorno
- **NODE_ENV**: development/production
- **API_URL**: URL de la API (si se implementa)
- **ANALYTICS_ID**: ID de Google Analytics

### Scripts de Desarrollo
- **Servidor local**: `python3 -m http.server 8000`
- **Git workflow**: Feature branches + pull requests
- **Deployment**: Automático desde GitHub a Railway

## Tecnologías Específicas del Mapa

### GeoJSON
- **Formato**: Estándar para datos geográficos
- **Fuente**: geoBoundaries para datos administrativos
- **Estructura**: Features con geometrías y propiedades
- **Optimización**: Compresión y minificación

### SVG
- **Renderizado**: Creación dinámica de elementos SVG
- **Interactividad**: Eventos de hover y click
- **Escalabilidad**: Vectorial para cualquier resolución
- **Accesibilidad**: Navegación por teclado

### JavaScript Avanzado
- **Async/Await**: Para carga de datos
- **RequestAnimationFrame**: Para animaciones suaves
- **Event delegation**: Optimización de eventos
- **Closures**: Para encapsulación de datos