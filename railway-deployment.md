# Railway Deployment Guide - Local From Bocas

## 🚀 Configuración de Railway

### 1. Conectar GitHub con Railway
1. **Ir a Railway.app** y hacer login
2. **Seleccionar "New Project"**
3. **Elegir "Deploy from GitHub repo"**
4. **Conectar con el repositorio**: `gaguero/localfrombocas`
5. **Railway detectará automáticamente** que es un sitio estático

### 2. Configuración Automática
Railway detectará automáticamente:
- **Tipo de proyecto**: Static Site
- **Build command**: No requerido (sitio estático)
- **Start command**: `python3 -m http.server 8000`
- **Puerto**: 8000

### 3. Variables de Entorno (Opcional)
```bash
# Para configuración personalizada
PORT=8000
NODE_ENV=production
```

### 4. Dominio Personalizado
1. **En Railway Dashboard** → Settings → Domains
2. **Agregar dominio**: `localfrombocas.com`
3. **Configurar DNS**:
   - **Tipo**: CNAME
   - **Nombre**: www
   - **Valor**: `[railway-url].railway.app`
   - **Tipo**: A
   - **Nombre**: @
   - **Valor**: `[railway-ip]`

## 📁 Estructura de Deployment

### Archivos Clave para Railway
```
local-from-bocas/
├── railway.json          # Configuración de Railway
├── package.json          # Metadatos del proyecto
├── index.html            # Página principal
├── css/styles.css        # Estilos del sitio
└── js/main.js            # Funcionalidad JavaScript
```

### Configuración de railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python3 -m http.server 8000",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## 🔄 Deployment Automático

### Workflow
1. **Push a GitHub** → Trigger automático
2. **Railway detecta cambios** → Inicia build
3. **Deploy automático** → Sitio actualizado
4. **SSL automático** → HTTPS habilitado

### Monitoreo
- **Railway Dashboard**: Estado del deployment
- **Logs**: Ver logs en tiempo real
- **Métricas**: Performance y uptime
- **Alerts**: Notificaciones de errores

## 🌐 URLs de Acceso

### Durante Desarrollo
- **Railway URL**: `https://[project-name].railway.app`
- **Local**: `http://localhost:8000`

### Producción
- **Dominio personalizado**: `https://localfrombocas.com`
- **Railway URL**: `https://[project-name].railway.app`

## 🛠️ Troubleshooting

### Problemas Comunes
1. **Build fallido**: Verificar railway.json
2. **404 en rutas**: Configurar redirects
3. **SSL issues**: Verificar configuración DNS
4. **Performance**: Optimizar assets

### Logs Útiles
```bash
# Ver logs en Railway Dashboard
# O usar Railway CLI
railway logs
```

## 📊 Métricas y Monitoreo

### Métricas Disponibles
- **Uptime**: Disponibilidad del sitio
- **Response time**: Tiempo de respuesta
- **Traffic**: Tráfico y visitas
- **Errors**: Errores y excepciones

### Alertas Configuradas
- **Downtime**: Notificación si el sitio está caído
- **High response time**: Si la respuesta es > 2s
- **Build failures**: Si el deployment falla

## 🔐 Seguridad

### SSL/TLS
- **Certificado automático**: Let's Encrypt
- **HTTPS redirect**: Automático
- **HSTS**: Headers de seguridad

### Headers de Seguridad
```javascript
// Configurar en Railway
{
  "headers": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
}
```

## 💰 Costos

### Plan Gratuito
- **Deployments ilimitados**
- **500 horas de ejecución/mes**
- **1GB de storage**
- **Dominio .railway.app**

### Plan Pro ($5/mes)
- **Ejecución ilimitada**
- **Dominio personalizado**
- **Métricas avanzadas**
- **Soporte prioritario**

## 📞 Soporte

### Recursos
- **Railway Docs**: https://docs.railway.app
- **GitHub Issues**: Para bugs del proyecto
- **Railway Support**: Para problemas de deployment

### Contacto
- **Email**: support@railway.app
- **Discord**: Railway Community
- **Twitter**: @railway
