#!/bin/bash
# Script para iniciar el servidor web del proyecto "Historia y datos de Bocas del Toro"

# Cambiar al directorio del proyecto
cd "$(dirname "$0")/output/web"

# Comprobar si existe la imagen de muestra
if [ ! -f "imagenes/mapa-bocas.jpg" ]; then
    echo "Creando directorio de imágenes y descargando una imagen de muestra..."
    mkdir -p imagenes
    # Intentar descargar una imagen de muestra
    if command -v curl &> /dev/null; then
        curl -s -o imagenes/mapa-bocas.jpg https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bocas_del_Toro_Archipelago_map-es.svg/800px-Bocas_del_Toro_Archipelago_map-es.svg.png || echo "No se pudo descargar la imagen de muestra"
    elif command -v wget &> /dev/null; then
        wget -q -O imagenes/mapa-bocas.jpg https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bocas_del_Toro_Archipelago_map-es.svg/800px-Bocas_del_Toro_Archipelago_map-es.svg.png || echo "No se pudo descargar la imagen de muestra"
    else
        echo "AVISO: No se pudo descargar la imagen de muestra. Necesitas curl o wget instalados."
    fi
fi

# Iniciar el servidor
echo "Iniciando el servidor web..."
echo "Presiona Ctrl+C para detener el servidor"
python3 server.py 