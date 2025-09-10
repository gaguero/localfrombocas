#!/usr/bin/env python3
"""
Script to group corregimientos by their parent districts and merge geometries
to create proper district boundaries for Panama provinces.
"""

import json
import geopandas as gpd
from shapely.geometry import shape, MultiPolygon
from shapely.ops import unary_union
import os
from datetime import datetime

def load_geojson(file_path):
    """Load GeoJSON file and return GeoDataFrame."""
    try:
        gdf = gpd.read_file(file_path)
        print(f"Loaded {file_path}: {len(gdf)} features")
        return gdf
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

def get_district_mapping():
    """Get the mapping of corregimientos to their parent districts for each province."""
    return {
        'bocas-del-toro': {
            'BOCAS DEL TORO': ['BOCAS DEL TORO', 'BASTIMENTOS', 'TIERRA OSCURA', 'PUNTA LAUREL'],
            'CHANGUINOLA': ['CHANGUINOLA', 'GUABITO', 'EL EMPALME', 'LAS TABLAS', 'LAS DELICIAS', 'COCHIGRO', 'LA GLORIA'],
            'ALMIRANTE': ['ALMIRANTE', 'CAUCHERO', 'NANCE DEL RISCO', 'VALLE DE AGUA ARRIBA', 'VALLE DEL RISCO'],
            'CHIRIQUÍ GRANDE': ['CHIRIQUÍ GRANDE', 'BAJO CEDRO', 'MIRAMAR', 'PUNTA PEÑA', 'PUNTA ROBALO', 'RAMBALA']
        },
        'chiriquí': {
            # Add Chiriquí district mapping here - this would need to be researched
            # For now, we'll create a placeholder
            'DAVID': ['DAVID'],
            'BOQUETE': ['BOQUETE'],
            'VOLCÁN': ['VOLCÁN'],
            'SAN FÉLIX': ['SAN FÉLIX'],
            'SAN LORENZO': ['SAN LORENZO'],
            'BARRANCA': ['BARRANCA'],
            'BOQUERÓN': ['BOQUERÓN'],
            'BUGABA': ['BUGABA'],
            'DIVISORIA': ['DIVISORIA'],
            'GUALACA': ['GUALACA'],
            'HORNITO': ['HORNITO'],
            'PEDREGAL': ['PEDREGAL'],
            'PUEBLO NUEVO': ['PUEBLO NUEVO'],
            'RENACIMIENTO': ['RENACIMIENTO'],
            'SAN ANDRÉS': ['SAN ANDRÉS'],
            'SANTA CRUZ': ['SANTA CRUZ'],
            'TOLÉ': ['TOLÉ']
        }
        # Add other provinces as needed
    }

def normalize_name(name):
    """Normalize name for comparison."""
    return name.lower().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ñ', 'n')

def group_corregimientos_by_district(corregimientos, district_mapping):
    """Group corregimientos by their parent districts."""
    grouped = {}
    
    # Initialize grouped structure
    for district_name in district_mapping.keys():
        grouped[district_name] = []
    
    # Group corregimientos
    for corregimiento in corregimientos:
        corregimiento_name = corregimiento['properties']['name']
        assigned = False
        
        # Find which district this corregimiento belongs to
        for district_name, corregimiento_list in district_mapping.items():
            if corregimiento_name in corregimiento_list:
                grouped[district_name].append(corregimiento)
                assigned = True
                break
        
        # If not found in mapping, try to match by name similarity
        if not assigned:
            normalized_name = normalize_name(corregimiento_name)
            for district_name, corregimiento_list in district_mapping.items():
                normalized_district = normalize_name(district_name)
                if normalized_name == normalized_district or normalized_district in normalized_name:
                    grouped[district_name].append(corregimiento)
                    assigned = True
                    break
        
        # If still not assigned, try partial matching
        if not assigned:
            for district_name, corregimiento_list in district_mapping.items():
                for correg_name in corregimiento_list:
                    if normalize_name(correg_name) in normalized_name or normalized_name in normalize_name(correg_name):
                        grouped[district_name].append(corregimiento)
                        assigned = True
                        break
                if assigned:
                    break
        
        # If still not assigned, put in a general category
        if not assigned:
            if 'UNASSIGNED' not in grouped:
                grouped['UNASSIGNED'] = []
            grouped['UNASSIGNED'].append(corregimiento)
    
    return grouped

def merge_geometries(corregimientos):
    """Merge geometries of corregimientos into a single district geometry."""
    if not corregimientos:
        return None
    
    geometries = []
    for corregimiento in corregimientos:
        geom = shape(corregimiento['geometry'])
        geometries.append(geom)
    
    if len(geometries) == 1:
        return geometries[0]
    else:
        # Merge all geometries
        merged = unary_union(geometries)
        return merged

def create_district_geojson(province_name, province_feature, grouped_corregimientos, output_dir):
    """Create a new GeoJSON file with proper district boundaries."""
    output_file = os.path.join(output_dir, f"{province_name}-districts.geojson")
    
    features = []
    
    # Add province boundary as first feature
    province_feature_new = {
        "type": "Feature",
        "properties": {
            "name": province_feature['properties']['name'],
            "type": "province",
            "iso_code": province_feature['properties'].get('iso_code', ''),
            "shape_id": province_feature['properties'].get('shape_id', ''),
            "admin_level": 1
        },
        "geometry": province_feature['geometry']
    }
    features.append(province_feature_new)
    
    # Add merged district features
    for district_name, corregimientos in grouped_corregimientos.items():
        if district_name == 'UNASSIGNED' or not corregimientos:
            continue
            
        merged_geometry = merge_geometries(corregimientos)
        if merged_geometry is None:
            continue
        
        # Convert geometry to GeoJSON format
        if hasattr(merged_geometry, '__geo_interface__'):
            geometry_dict = merged_geometry.__geo_interface__
        else:
            # Fallback for simple geometries
            geometry_dict = {
                "type": "MultiPolygon" if merged_geometry.geom_type == 'MultiPolygon' else "Polygon",
                "coordinates": list(merged_geometry.exterior.coords) if merged_geometry.geom_type == 'Polygon' else []
            }
        
        district_feature = {
            "type": "Feature",
            "properties": {
                "name": district_name,
                "type": "district",
                "admin_level": 2,
                "province": province_feature['properties']['name'],
                "corregimientos_count": len(corregimientos),
                "corregimientos": [c['properties']['name'] for c in corregimientos]
            },
            "geometry": geometry_dict
        }
        features.append(district_feature)
    
    # Create GeoJSON structure
    geojson_data = {
        "type": "FeatureCollection",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": features,
        "properties": {
            "name": province_feature['properties']['name'],
            "district_count": len([f for f in features if f['properties']['type'] == 'district']),
            "created": datetime.now().isoformat(),
            "description": f"GeoJSON file for {province_feature['properties']['name']} with proper district boundaries"
        }
    }
    
    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(geojson_data, f, indent=2, ensure_ascii=False)
    
    print(f"Created {output_file} with {len([f for f in features if f['properties']['type'] == 'district'])} districts")
    return output_file

def process_province(province_name, input_file, output_dir):
    """Process a single province to create proper district boundaries."""
    print(f"\nProcessing {province_name}...")
    
    # Load the GeoJSON file
    gdf = load_geojson(input_file)
    if gdf is None:
        return None
    
    # Convert to dictionary format
    geojson_data = json.loads(gdf.to_json())
    
    # Separate province and corregimiento features
    province_feature = None
    corregimientos = []
    
    for feature in geojson_data['features']:
        if feature['properties'].get('type') == 'province':
            province_feature = feature
        elif feature['properties'].get('type') == 'district':
            corregimientos.append(feature)
    
    if not province_feature:
        print(f"No province feature found in {input_file}")
        return None
    
    print(f"Found {len(corregimientos)} corregimientos")
    
    # Get district mapping for this province
    district_mappings = get_district_mapping()
    if province_name not in district_mappings:
        print(f"No district mapping found for {province_name}")
        return None
    
    district_mapping = district_mappings[province_name]
    
    # Group corregimientos by districts
    grouped_corregimientos = group_corregimientos_by_district(corregimientos, district_mapping)
    
    print(f"Grouped into {len([k for k, v in grouped_corregimientos.items() if k != 'UNASSIGNED' and v])} districts:")
    for district_name, corregs in grouped_corregimientos.items():
        if district_name != 'UNASSIGNED' and corregs:
            print(f"  - {district_name}: {len(corregs)} corregimientos")
    
    if 'UNASSIGNED' in grouped_corregimientos and grouped_corregimientos['UNASSIGNED']:
        print(f"  - UNASSIGNED: {len(grouped_corregimientos['UNASSIGNED'])} corregimientos")
        for correg in grouped_corregimientos['UNASSIGNED']:
            print(f"    * {correg['properties']['name']}")
    
    # Create new GeoJSON with proper districts
    output_file = create_district_geojson(province_name, province_feature, grouped_corregimientos, output_dir)
    return output_file

def main():
    """Main function to process all provinces."""
    print("Starting district boundary creation process...")
    
    # Create output directory
    output_dir = "corrected_districts"
    os.makedirs(output_dir, exist_ok=True)
    
    # Process Bocas del Toro first
    bocas_file = "geojson_output/bocas-del-toro.geojson"
    if os.path.exists(bocas_file):
        process_province('bocas-del-toro', bocas_file, output_dir)
    
    # Process Chiriquí
    chiriqui_file = "geojson_output/chiriquí.geojson"
    if os.path.exists(chiriqui_file):
        process_province('chiriquí', chiriqui_file, output_dir)
    
    print(f"\nProcess completed! Check the '{output_dir}' directory for results.")

if __name__ == "__main__":
    main()





