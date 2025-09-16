# SYSTEM PATTERNS - Local From Bocas

## 🏗️ Architecture Overview
The project follows a **static site architecture** with client-side interactivity, designed for performance and simplicity.

## 📁 File Organization
```
local-from-bocas/
├── index.html              # Main homepage
├── panama.html            # Country overview with interactive maps
├── [contact, nosotros, servicios, vlogs].html  # Core pages
├── panama/                # Province/comarca pages (13 files)
├── css/                   # Stylesheets (4 files)
├── js/                    # JavaScript modules (4 files)
├── data/                  # GeoJSON data (25+ files)
├── svgs/                  # Province map assets (8 files)
└── favicon.ico           # Site icon
```

## 🎨 Design System
### Color Palette
- **Primary**: Island Sand (#F2E9DC), Jungle Teal (#0F5B55)
- **Secondary**: Palm Leaf (#8DBB66), Seafoam (#E6F3EE)
- **Accent**: Sunset Coral (#FF7466), Ocean Blue (#2C8AC6)
- **Functional**: Success Green (#3BAA64), Error Red (#E0524D)

### Typography
- **Headings**: DM Serif Display (serif, elegant)
- **Body**: Inter (sans-serif, readable)
- **Hierarchy**: Clear size and weight distinctions

### Layout Patterns
- **CSS Grid**: Main layout structure
- **Flexbox**: Component-level layouts
- **Responsive**: Mobile-first approach with breakpoints
- **Cards**: Consistent card-based content organization

## 🗺️ Map System
### Geographic Data
- **Source**: Real coordinate data with 3,025+ points
- **Format**: GeoJSON with proper MultiPolygon geometries
- **Projection**: Custom projection calculations for accurate display
- **Districts**: Complete district boundaries including corregimientos

### Interactive Features
- **Hover Effects**: District tooltips and highlighting
- **Click Handlers**: District selection and information display
- **Controls**: Zoom, pan, reset, fullscreen functionality
- **Responsive**: Adapts to different screen sizes

## 💻 JavaScript Architecture
### Module Structure
- **main.js**: Core application logic and page-specific functionality
- **province-map.js**: Interactive map rendering and interactions
- **province-data.js**: Province and comarca data definitions
- **dynamic-css.js**: Dynamic styling and animations

### Performance Patterns
- **IntersectionObserver**: Scroll-based animations
- **requestAnimationFrame**: Smooth counter animations
- **Event Delegation**: Efficient event handling
- **Debouncing/Throttling**: Optimized scroll and resize handlers

## 🎯 Component Patterns
### Card Components
- **Province Cards**: Consistent layout for province information
- **Snapshot Cards**: Data visualization containers
- **Article Cards**: Content preview cards

### Interactive Elements
- **Hover States**: Smooth transitions and visual feedback
- **Loading States**: Proper loading indicators
- **Error Handling**: Graceful fallbacks for failed operations

## 📱 Responsive Patterns
### Breakpoints
- **Mobile**: < 768px (single column, touch-optimized)
- **Tablet**: 768px - 1024px (adjusted grid, maintained functionality)
- **Desktop**: > 1024px (full grid, hover effects)

### Mobile Optimizations
- **Touch Targets**: Adequate size for finger interaction
- **Swipe Gestures**: Natural mobile navigation
- **Performance**: Optimized for mobile data connections


