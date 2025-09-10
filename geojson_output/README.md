# Panama Provinces and Comarcas GeoJSON Files

This directory contains individual GeoJSON files for each province and comarca in Panama, with their respective districts included.

## Generated Files

| Province/Comarca | Filename | Districts | File Size |
|------------------|----------|-----------|-----------|
| Provincia de Bocas del Toro | `bocas-del-toro.geojson` | 23 | 1.4M |
| Colón Province | `colón-province.geojson` | 42 | 5.9M |
| Provincia de Darién | `darién.geojson` | 30 | 1.2M |
| Comarca Emberá-Wounaan | `emberá-wounaan.geojson` | 8 | 188K |
| Comarca Guna Yala | `guna-yala.geojson` | 7 | 878K |
| Provincia de Herrera | `herrera.geojson` | 53 | 651K |
| Provincia de Los Santos | `los-santos.geojson` | 80 | 1.1M |
| Comarca Ngäbe-Buglé | `ngäbe-buglé.geojson` | 54 | 959K |
| Provincia de Panamá Oeste | `panamá-oeste.geojson` | 59 | 1.3M |
| Provincia de Panamá | `panamá.geojson` | 55 | 1.2M |
| Provincia de Veraguas | `veraguas.geojson` | 115 | 1.8M |
| Provincia de Chiriquí | `chiriquí.geojson` | 102 | 2.1M |
| Provincia de Coclé | `coclé.geojson` | 44 | 507K |

**Total:** 13 provinces/comarcas, 672 districts

## File Structure

Each GeoJSON file contains:

1. **Province/Comarca Boundary**: The main administrative boundary as a MultiPolygon
2. **Districts**: All districts within that province/comarca as separate Polygon features
3. **Metadata**: Administrative information, creation date, and district count

### Feature Properties

**Province/Comarca Features:**
- `name`: Full name of the province/comarca
- `type`: "province" or "comarca"
- `iso_code`: ISO 3166-2 code (e.g., "PA-1")
- `shape_id`: Unique identifier
- `admin_level`: 1 (province level)

**District Features:**
- `name`: District name
- `type`: "district"
- `shape_id`: Unique identifier
- `admin_level`: 3 (district level)
- `province`: Parent province/comarca name

## Usage

These files can be used in:
- Web mapping applications (Leaflet, Mapbox, Google Maps)
- GIS software (QGIS, ArcGIS)
- Data analysis tools
- Interactive dashboards

## Coordinate Reference System

All files use WGS84 (EPSG:4326) coordinate system.

## Data Source

- **Source**: geoBoundaries
- **Original Files**: 
  - `geoBoundaries-PAN-ADM1.geojson` (provinces/comarcas)
  - `geoBoundaries-PAN-ADM3_simplified.geojson` (districts)
- **Processing Date**: September 5, 2025
- **Method**: Spatial intersection analysis using GeoPandas

## Index File

The `index.json` file contains metadata about all generated files for programmatic access.

## Validation

- ✅ All 13 provinces/comarcas processed
- ✅ Total of 672 districts distributed across files
- ✅ Valid GeoJSON structure for all files
- ✅ Proper spatial relationships maintained
- ✅ Consistent coordinate reference system






