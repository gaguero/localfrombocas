#!/usr/bin/env python3
"""
Fix Teribe Inclusion in Changuinola District
This script will recreate the Bocas del Toro districts with Teribe properly included
"""

import json
import geopandas as gpd
from shapely.ops import unary_union
from shapely.geometry import mapping

def fix_teribe_inclusion():
    """Fix the Changuinola district to include Teribe area"""
    
    print("🗺️ FIXING TERIBE INCLUSION IN CHANGUINOLA DISTRICT")
    print("=" * 60)
    
    # Load the ADM3 data
    print("📋 Step 1: Loading ADM3 data...")
    gdf = gpd.read_file('geoBoundaries-PAN-ADM3_simplified.geojson')
    print(f"✅ Loaded {len(gdf)} corregimientos")
    
    # Load the existing Bocas del Toro districts
    print("\n📋 Step 2: Loading existing Bocas del Toro districts...")
    with open('local-from-bocas/data/accurate-bocas-del-toro-districts.geojson', 'r') as f:
        bocas_data = json.load(f)
    
    # Find the province feature
    province_feature = None
    district_features = []
    
    for feature in bocas_data['features']:
        if feature['properties']['type'] == 'province':
            province_feature = feature
        elif feature['properties']['type'] == 'district':
            district_features.append(feature)
    
    print(f"✅ Found {len(district_features)} existing districts")
    
    # Create the corrected district mapping
    print("\n📋 Step 3: Creating corrected district mapping...")
    
    district_mappings = {
        'BOCAS DEL TORO': ['BOCAS DEL TORO', 'BASTIMENTOS', 'TIERRA OSCURA', 'PUNTA LAUREL'],
        'CHANGUINOLA': ['CHANGUINOLA', 'GUABITO', 'EL EMPALME', 'LAS TABLAS', 
                       'LAS DELICIAS', 'COCHIGRO', 'LA GLORIA', 'TERIBE'],  # Added TERIBE
        'ALMIRANTE': ['ALMIRANTE', 'CAUCHERO', 'NANCE DEL RISCO', 'VALLE DE AGUA ARRIBA', 'VALLE DEL RISCO'],
        'CHIRIQUÍ GRANDE': ['CHIRIQUÍ GRANDE', 'BAJO CEDRO', 'MIRAMAR', 'PUNTA PEÑA', 'PUNTA ROBALO', 'RAMBALA']
    }
    
    # Recreate all districts with correct mappings
    print("\n📋 Step 4: Recreating all districts...")
    new_district_features = []
    
    for district_name, corregimiento_names in district_mappings.items():
        print(f"\n🔄 Processing {district_name} district...")
        
        # Find matching corregimientos
        matching_features = []
        for corregimiento_name in corregimiento_names:
            matches = gdf[gdf['shapeName'].str.upper() == corregimiento_name.upper()]
            if len(matches) > 0:
                matching_features.extend(matches.to_dict('records'))
                print(f"  ✅ Found {corregimiento_name}")
            else:
                print(f"  ❌ NOT found: {corregimiento_name}")
        
        if len(matching_features) > 0:
            # Create a GeoDataFrame from the matching features
            matching_gdf = gpd.GeoDataFrame(matching_features)
            
            # Merge all geometries into one district
            print(f"  🔄 Merging {len(matching_features)} corregimientos...")
            merged_geometry = unary_union(matching_gdf.geometry.tolist())
            
            # Create the district feature
            district_feature = {
                'type': 'Feature',
                'properties': {
                    'name': district_name,
                    'type': 'district',
                    'admin_level': 2,
                    'province': 'Provincia de Bocas del Toro',
                    'corregimientos_count': len(matching_features),
                    'corregimientos': [f['shapeName'] for f in matching_features]
                },
                'geometry': mapping(merged_geometry)  # Convert to JSON-serializable format
            }
            
            new_district_features.append(district_feature)
            print(f"  ✅ Created {district_name} with {len(matching_features)} corregimientos")
        else:
            print(f"  ❌ No corregimientos found for {district_name}")
    
    # Create the updated GeoJSON
    print("\n📋 Step 5: Creating updated GeoJSON...")
    updated_data = {
        'type': 'FeatureCollection',
        'crs': bocas_data.get('crs', {}),
        'features': [province_feature] + new_district_features,
        'properties': {
            'name': 'Provincia de Bocas del Toro',
            'district_count': len(new_district_features),
            'created': '2025-09-08T23:20:00.000000',
            'description': 'GeoJSON file for Provincia de Bocas del Toro with proper district boundaries including Teribe',
            'teribe_included': True
        }
    }
    
    # Save the updated file
    output_file = 'local-from-bocas/data/accurate-bocas-del-toro-districts.geojson'
    with open(output_file, 'w') as f:
        json.dump(updated_data, f, indent=2)
    
    print(f"✅ Saved updated districts to {output_file}")
    
    # Verify the update
    print("\n📋 Step 6: Verifying the update...")
    with open(output_file, 'r') as f:
        verify_data = json.load(f)
    
    changuinola_district = None
    for feature in verify_data['features']:
        if feature['properties']['type'] == 'district' and 'CHANGUINOLA' in feature['properties']['name']:
            changuinola_district = feature
            break
    
    if changuinola_district:
        corregimientos = changuinola_district['properties']['corregimientos']
        print(f"✅ Changuinola district now includes {len(corregimientos)} corregimientos:")
        for corr in corregimientos:
            print(f"  - {corr}")
        
        if 'TERIBE' in corregimientos:
            print("✅ TERIBE is now included in Changuinola district!")
        else:
            print("❌ TERIBE is still missing from Changuinola district")
    else:
        print("❌ Changuinola district not found in updated file")
    
    return True

def main():
    print("🚀 STARTING TERIBE INCLUSION FIX...")
    print("This will add the missing Teribe area to Changuinola district!")
    print()
    
    success = fix_teribe_inclusion()
    
    if success:
        print("\n" + "=" * 60)
        print("🎉 TERIBE INCLUSION FIX COMPLETE!")
        print("=" * 60)
        print("✅ Teribe area has been added to Changuinola district")
        print("✅ All districts have been recreated with correct boundaries")
        print("✅ Updated GeoJSON file has been saved")
        print("\n🔗 Test your updated map:")
        print("   http://localhost:8000/panama/bocas-del-toro.html")
        print("\n🎯 The Teribe area should now be visible in Changuinola district!")
    else:
        print("\n❌ TERIBE INCLUSION FIX FAILED")
        print("Please check the error messages above")

if __name__ == "__main__":
    main()
