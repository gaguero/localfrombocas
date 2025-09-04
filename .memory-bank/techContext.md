# Local From Bocas - Tech Context

## Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Sistema de diseño personalizado con variables CSS
- **JavaScript (Vanilla)**: Interactividad sin dependencias externas
- **Responsive Design**: Mobile-first approach

### Hosting y Deployment
- **Railway**: Plataforma de hosting para el sitio web
- **GitHub**: Control de versiones y colaboración
- **Custom Domain**: Dominio personalizado para la marca

### Herramientas de Desarrollo
- **VS Code/Cursor**: Editor de código principal
- **Git**: Control de versiones
- **Terminal**: Comandos de desarrollo y deployment

## Arquitectura del Proyecto

### Estructura de Carpetas
```
local-from-bocas/
├── css/                     # Estilos del sistema de diseño
├── js/                      # Funcionalidad JavaScript
├── images/                  # Assets visuales
├── content/                 # Contenido dinámico
└── panama/                  # Subpáginas de provincias
```

### Sistema de Diseño
- **Variables CSS**: Centralización de colores, tipografías y espaciados
- **Componentes modulares**: Botones, cards, inputs reutilizables
- **Grid system**: Layout responsivo basado en CSS Grid
- **Typography scale**: Jerarquía tipográfica consistente

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

## Performance y Optimización

### CSS
- **Variables CSS**: Reducción de duplicación
- **Minificación**: Para producción
- **Critical CSS**: Estilos críticos inline
- **Unused CSS**: Eliminación de estilos no utilizados

### JavaScript
- **Vanilla JS**: Sin dependencias externas
- **Progressive enhancement**: Funcionalidad básica sin JS
- **Lazy loading**: Carga diferida de scripts no críticos
- **Minificación**: Para producción

### Imágenes
- **WebP format**: Mejor compresión
- **Responsive images**: srcset para diferentes resoluciones
- **Lazy loading**: Carga bajo demanda
- **Optimización**: Compresión automática

## SEO y Accesibilidad

### SEO Técnico
- **Meta tags**: Títulos y descripciones únicos
- **Structured data**: Schema.org markup
- **Sitemap**: Generación automática
- **Robots.txt**: Control de indexación

### Accesibilidad
- **WCAG AA**: Cumplimiento de estándares
- **Semantic HTML**: Estructura semántica
- **ARIA labels**: Para elementos interactivos
- **Keyboard navigation**: Navegación por teclado

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

## Seguridad

### Medidas Implementadas
- **HTTPS**: Certificado SSL automático
- **Security headers**: Headers de seguridad
- **Content Security Policy**: Prevención de XSS
- **Input validation**: Validación de formularios

### Backup y Recuperación
- **Git history**: Historial completo de cambios
- **Railway backups**: Backups automáticos del servidor
- **Content backup**: Respaldo del contenido
- **Disaster recovery**: Plan de recuperación ante desastres
