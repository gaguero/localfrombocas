# Local From Bocas - System Patterns

## Arquitectura del Sistema

### Estructura de Archivos
```
local-from-bocas/
├── index.html                 # Página de inicio
├── servicios.html            # Servicios y productos
├── vlogs.html               # Blog/artículos
├── panama.html              # Página principal de Panamá
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
│   └── styles.css           # Sistema de diseño completo
├── js/
│   └── main.js              # Funcionalidad interactiva
├── images/                  # Imágenes y assets
└── content/                 # Contenido dinámico
    └── articulos/           # Artículos del blog
```

## Patrones de Diseño

### Sistema de Colores
- **Variables CSS**: Todas las referencias de color centralizadas
- **Dark Mode**: Variables preparadas para tema oscuro
- **Consistencia**: Uso estricto de la paleta definida

### Componentes Reutilizables
- **Cards**: Para servicios, artículos y productos
- **Botones**: 4 variantes (primary, secondary, olive, text)
- **Pills Vintage**: Para etiquetas y categorías
- **Steps**: Números circulares para procesos
- **Callouts**: Burbujas de precio y destacados

### Layout Patterns
- **Container**: Máximo 1200px con padding responsivo
- **Grid System**: 2, 3, 4 columnas que se adaptan a móvil
- **Spacing**: Sistema consistente basado en múltiplos de 8px
- **Hero Sections**: Full-bleed con overlay degradado

## Patrones de Navegación

### Estructura Optimizada para Conversión
1. **Inicio** → Primera impresión y propuesta de valor
2. **Servicios** → Productos principales (fuente de ingresos)
3. **Vlogs** → Contenido de valor para engagement
4. **Panamá** → Autoridad y expertise
5. **Nosotros** → Confianza y conexión emocional
6. **Contacto** → Punto de conversión final

### Navegación Responsiva
- **Desktop**: Navbar horizontal con tabs cápsula
- **Mobile**: Menú hamburguesa (a implementar)
- **Sticky Navigation**: Header fijo para mejor UX

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

## Patrones Técnicos

### Performance
- **CSS optimizado**: Variables, reutilización de estilos
- **Imágenes**: Formatos modernos (WebP), lazy loading
- **JavaScript**: Carga diferida, funcionalidad progresiva
- **Caching**: Headers apropiados para assets estáticos

### SEO
- **Meta tags**: Títulos y descripciones únicos por página
- **Estructura semántica**: HTML5 con roles ARIA
- **URLs amigables**: Estructura clara y descriptiva
- **Sitemap**: Generación automática para motores de búsqueda

### Accesibilidad
- **Contraste**: Cumple estándares WCAG AA
- **Navegación por teclado**: Todos los elementos accesibles
- **Screen readers**: Roles y labels apropiados
- **Responsive**: Funciona en todos los dispositivos

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
