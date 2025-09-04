#!/usr/bin/env python3
"""
Servidor HTTP simple para el proyecto "Historia y datos de Bocas del Toro"
Este script inicia un servidor HTTP en el puerto 8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from datetime import datetime

# Configuración
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        """Personalizar el registro de solicitudes."""
        sys.stdout.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {self.address_string()} - {format % args}\n")

def main():
    os.chdir(DIRECTORY)
    
    # Verificar que existan los archivos esenciales
    required_files = ['index.html', 'css/styles.css', 'js/main.js']
    for file in required_files:
        if not os.path.exists(file):
            print(f"Error: No se encuentra el archivo '{file}'")
            print("Por favor, asegúrate de estar ejecutando este script desde la carpeta correcta.")
            sys.exit(1)
    
    # Crear la carpeta de imágenes si no existe
    os.makedirs('imagenes', exist_ok=True)
    
    # Iniciar el servidor
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n{'=' * 60}")
        print(f" Servidor iniciado en {url}")
        print(f" Presiona Ctrl+C para detener el servidor")
        print(f"{'=' * 60}\n")
        
        # Abrir el navegador automáticamente
        try:
            webbrowser.open(url)
        except:
            print("No se pudo abrir el navegador automáticamente.")
            print(f"Por favor, abre manualmente: {url}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")

if __name__ == "__main__":
    main() 