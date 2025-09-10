#!/usr/bin/env python3
"""
Script to process all Panama provinces and create corrected district boundaries.
"""

import json
import geopandas as gpd
from shapely.geometry import shape, MultiPolygon
from shapely.ops import unary_union
import os
from datetime import datetime

def get_all_district_mappings():
    """Get district mappings for all Panama provinces and comarcas."""
    return {
        'bocas-del-toro': {
            'BOCAS DEL TORO': ['BOCAS DEL TORO', 'BASTIMENTOS', 'TIERRA OSCURA', 'PUNTA LAUREL'],
            'CHANGUINOLA': ['CHANGUINOLA', 'GUABITO', 'EL EMPALME', 'LAS TABLAS', 'LAS DELICIAS', 'COCHIGRO', 'LA GLORIA'],
            'ALMIRANTE': ['ALMIRANTE', 'CAUCHERO', 'NANCE DEL RISCO', 'VALLE DE AGUA ARRIBA', 'VALLE DEL RISCO'],
            'CHIRIQUÍ GRANDE': ['CHIRIQUÍ GRANDE', 'BAJO CEDRO', 'MIRAMAR', 'PUNTA PEÑA', 'PUNTA ROBALO', 'RAMBALA']
        },
        'chiriquí': {
            'DAVID': ['DAVID'],
            'BOQUETE': ['BOQUETE', 'CALDERA'],
            'VOLCÁN': ['VOLCÁN'],
            'SAN FÉLIX': ['SAN FÉLIX'],
            'SAN LORENZO': ['SAN LORENZO'],
            'BOQUERÓN': ['BOQUERÓN'],
            'BUGABA': ['BUGABA'],
            'DIVISORIA': ['DIVISORIA'],
            'GUALACA': ['GUALACA'],
            'HORNITO': ['HORNITO'],
            'PEDREGAL': ['PEDREGAL', 'DOS RÍOS'],
            'PUEBLO NUEVO': ['PUEBLO NUEVO'],
            'RENACIMIENTO': ['RENACIMIENTO'],
            'SAN ANDRÉS': ['SAN ANDRÉS'],
            'SANTA CRUZ': ['SANTA CRUZ', 'HORCONCITOS'],
            'TOLÉ': ['TOLÉ', 'CERRO PUNTA']
        },
        'coclé': {
            'PENONOMÉ': ['PENONOMÉ'],
            'AGUADULCE': ['AGUADULCE'],
            'ANTÓN': ['ANTÓN'],
            'LA PINTADA': ['LA PINTADA'],
            'NATÁ': ['NATÁ'],
            'OLÁ': ['OLÁ']
        },
        'colón': {
            'COLÓN': ['COLÓN'],
            'CHAGRES': ['CHAGRES'],
            'DONOSO': ['DONOSO'],
            'PORTOBELO': ['PORTOBELO'],
            'SANTA ISABEL': ['SANTA ISABEL']
        },
        'darién': {
            'LA PALMA': ['LA PALMA'],
            'CHEPIGANA': ['CHEPIGANA'],
            'PINOGANA': ['PINOGANA'],
            'SANTA FE': ['SANTA FE'],
            'YAVIZA': ['YAVIZA']
        },
        'herrera': {
            'CHITRÉ': ['CHITRÉ'],
            'LAS MINAS': ['LAS MINAS'],
            'LOS POZOS': ['LOS POZOS'],
            'OCÚ': ['OCÚ'],
            'PARITA': ['PARITA'],
            'PESÉ': ['PESÉ'],
            'SANTA MARÍA': ['SANTA MARÍA']
        },
        'los-santos': {
            'LAS TABLAS': ['LAS TABLAS'],
            'GUARARÉ': ['GUARARÉ'],
            'LOS SANTOS': ['LOS SANTOS'],
            'MACARACAS': ['MACARACAS'],
            'PEDASÍ': ['PEDASÍ'],
            'POCRÍ': ['POCRÍ'],
            'TONOSÍ': ['TONOSÍ']
        },
        'panamá': {
            'PANAMÁ': ['PANAMÁ'],
            'SAN MIGUELITO': ['SAN MIGUELITO'],
            'TABOGA': ['TABOGA'],
            'ANCON': ['ANCON'],
            'BALBOA': ['BALBOA'],
            'CHAME': ['CHAME'],
            'CHEPO': ['CHEPO'],
            'CHIMÁN': ['CHIMÁN'],
            'PACORA': ['PACORA'],
            'SAN CARLOS': ['SAN CARLOS'],
            'SANTA ANA': ['SANTA ANA']
        },
        'panamá-oeste': {
            'LA CHORRERA': ['LA CHORRERA'],
            'ARRAIJÁN': ['ARRAIJÁN'],
            'CAPIRA': ['CAPIRA'],
            'CHAME': ['CHAME'],
            'SAN CARLOS': ['SAN CARLOS']
        },
        'veraguas': {
            'SANTIAGO': ['SANTIAGO'],
            'ATALAYA': ['ATALAYA'],
            'CALOBRE': ['CALOBRE'],
            'CAÑAZAS': ['CAÑAZAS'],
            'LA MESA': ['LA MESA'],
            'LAS PALMAS': ['LAS PALMAS'],
            'MARIATO': ['MARIATO'],
            'MONTIJO': ['MONTIJO'],
            'RIO DE JESÚS': ['RIO DE JESÚS'],
            'SAN FRANCISCO': ['SAN FRANCISCO'],
            'SANTA FÉ': ['SANTA FÉ'],
            'SONÁ': ['SONÁ']
        },
        'guna-yala': {
            'GARACHINÉ': ['GARACHINÉ'],
            'NARGA': ['NARGA'],
            'MULATUPO': ['MULATUPO'],
            'PUERTO OCUMA': ['PUERTO OCUMA'],
            'TUBUALÁ': ['TUBUALÁ'],
            'UQUITUPO': ['UQUITUPO'],
            'YANDUP': ['YANDUP']
        },
        'emberá-wounaan': {
            'CÉMACO': ['CÉMACO'],
            'SAMBÚ': ['SAMBÚ']
        },
        'ngäbe-buglé': {
            'BESIKO': ['BESIKO'],
            'JIRONDAI': ['JIRONDAI'],
            'KANKINTÚ': ['KANKINTÚ'],
            'KUSAPIN': ['KUSAPIN'],
            'MIRONÓ': ['MIRONÓ'],
            'MÜNA': ['MÜNA'],
            'NÛKINI': ['NÛKINI'],
            'SANTIAGO': ['SANTIAGO'],
            'SÄNTI': ['SÄNTI']
        }
    }

def process_all_provinces():
    """Process all provinces and create corrected district files."""
    print("Starting processing of all Panama provinces and comarcas...")
    
    # Create output directory
    output_dir = "corrected_districts"
    os.makedirs(output_dir, exist_ok=True)
    
    # Get all district mappings
    district_mappings = get_all_district_mappings()
    
    # List of all province files
    province_files = [
        'bocas-del-toro.geojson',
        'chiriquí.geojson', 
        'coclé.geojson',
        'colón-province.geojson',
        'darién.geojson',
        'herrera.geojson',
        'los-santos.geojson',
        'panamá.geojson',
        'panamá-oeste.geojson',
        'veraguas.geojson',
        'guna-yala.geojson',
        'emberá-wounaan.geojson',
        'ngäbe-buglé.geojson'
    ]
    
    processed_count = 0
    total_districts = 0
    
    for province_file in province_files:
        # Extract province name from filename
        province_name = province_file.replace('.geojson', '').replace('-province', '')
        
        input_path = f"geojson_output/{province_file}"
        
        if not os.path.exists(input_path):
            print(f"⚠️  File not found: {input_path}")
            continue
            
        if province_name not in district_mappings:
            print(f"⚠️  No district mapping for: {province_name}")
            continue
            
        print(f"\n🔄 Processing {province_name}...")
        
        try:
            # Load the GeoJSON file
            gdf = gpd.read_file(input_path)
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
                print(f"❌ No province feature found in {input_path}")
                continue
                
            print(f"   Found {len(corregimientos)} corregimientos")
            
            # Group corregimientos by districts
            grouped_corregimientos = group_corregimientos_by_district(
                corregimientos, 
                district_mappings[province_name]
            )
            
            # Count districts
            district_count = len([k for k, v in grouped_corregimientos.items() 
                                if k != 'UNASSIGNED' and v])
            total_districts += district_count
            
            print(f"   Grouped into {district_count} districts:")
            for district_name, corregs in grouped_corregimientos.items():
                if district_name != 'UNASSIGNED' and corregs:
                    print(f"     - {district_name}: {len(corregs)} corregimientos")
            
            if 'UNASSIGNED' in grouped_corregimientos and grouped_corregimientos['UNASSIGNED']:
                print(f"     - UNASSIGNED: {len(grouped_corregimientos['UNASSIGNED'])} corregimientos")
            
            # Create corrected GeoJSON
            output_file = create_district_geojson(
                province_name, 
                province_feature, 
                grouped_corregimientos, 
                output_dir
            )
            
            if output_file:
                processed_count += 1
                print(f"   ✅ Created: {output_file}")
            
        except Exception as e:
            print(f"❌ Error processing {province_name}: {e}")
            continue
    
    print(f"\n🎉 Processing completed!")
    print(f"   Processed: {processed_count} provinces")
    print(f"   Total districts: {total_districts}")
    print(f"   Output directory: {output_dir}")

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
        
        # If not found, try partial matching
        if not assigned:
            normalized_name = normalize_name(corregimiento_name)
            for district_name, corregimiento_list in district_mapping.items():
                for correg_name in corregimiento_list:
                    if normalize_name(correg_name) in normalized_name or normalized_name in normalize_name(correg_name):
                        grouped[district_name].append(corregimiento)
                        assigned = True
                        break
                if assigned:
                    break
        
        # If still not assigned, put in unassigned category
        if not assigned:
            if 'UNASSIGNED' not in grouped:
                grouped['UNASSIGNED'] = []
            grouped['UNASSIGNED'].append(corregimiento)
    
    return grouped

def normalize_name(name):
    """Normalize name for comparison."""
    return name.lower().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ñ', 'n')

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
        merged = unary_union(geometries)
        return merged

def create_district_geojson(province_name, province_feature, grouped_corregimientos, output_dir):
    """Create a new GeoJSON file with proper district boundaries."""
    output_file = os.path.join(output_dir, f"{province_name}-districts.geojson")
    
    features = []
    
    # Add province boundary
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
    
    return output_file

if __name__ == "__main__":
    process_all_provinces()





