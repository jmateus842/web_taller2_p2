# Sistema de Gestión de Fotos

Un proyecto de gestión de fotos desarrollado con Node.js, Express y Sequelize.

## 🚀 Proyecto Inicializado

### ✅ Completado en esta fase:

1. **Inicialización del proyecto Node.js**
   - `package.json` configurado
   - Scripts de desarrollo agregados (`npm run dev`, `npm start`)

2. **Dependencias instaladas**
   - `express`: Framework web
   - `nodemon`: Recarga automática durante desarrollo
   - `ejs`: Motor de plantillas
   - `sequelize`: ORM para base de datos
   - `mysql2`: Driver de MySQL
   - `sequelize-cli`: Herramientas de línea de comandos

3. **Estructura básica creada**
   - `app.js`: Archivo principal de la aplicación
   - `views/`: Carpeta para plantillas EJS
   - `public/`: Carpeta para archivos estáticos
   - `views/index.ejs`: Página de bienvenida

4. **Sequelize configurado**
   - `config/config.json`: Configuración de la base de datos
   - `models/`: Carpeta para modelos de datos
   - `migrations/`: Carpeta para scripts de migración
   - `seeders/`: Carpeta para datos de prueba

### 🎯 Próximos pasos (siguiendo la guía):

1. **✅ Instalar Sequelize y configurar** - COMPLETADO
   ```bash
   npm install -g sequelize-cli
   npm install --save sequelize mysql2
   sequelize init
   ```

2. **Configurar base de datos MySQL**

3. **Crear modelo de Foto**

4. **Implementar rutas y controladores**

## 🛠️ Comandos útiles

- `npm run dev`: Iniciar servidor en modo desarrollo
- `npm start`: Iniciar servidor en producción
- `npm test`: Ejecutar pruebas (configurar después)

## 📁 Estructura del proyecto

```
proyecto_sequelize/
├── app.js              # Archivo principal
├── package.json        # Configuración del proyecto
├── config/             # Configuración de Sequelize
│   └── config.json    # Configuración de la base de datos
├── models/             # Modelos de datos
│   └── index.js       # Configuración de Sequelize
├── migrations/         # Scripts de migración de BD
├── seeders/           # Datos de prueba
├── views/             # Plantillas EJS
│   └── index.ejs     # Página principal
├── public/            # Archivos estáticos
└── node_modules/      # Dependencias
```

## 🌐 Acceso

Una vez iniciado el servidor, visita: http://localhost:3000 