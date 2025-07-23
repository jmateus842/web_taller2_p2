const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

async function setupDatabase() {
  console.log('🔧 Configurando base de datos para el proyecto de galería de fotos...\n');
  
  try {
    // Primero, conectar sin especificar una base de datos para crearla
    const sequelize = new Sequelize({
      username: config.development.username,
      password: config.development.password,
      host: config.development.host,
      port: config.development.port,
      dialect: config.development.dialect,
      logging: false
    });

    // Probar conexion
    await sequelize.authenticate();
    console.log('✅ Conexión MySQL exitosa!');
    
    // Crear la base de datos si no existe
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.development.database};`);
    console.log(`✅ Base de datos '${config.development.database}' creada/verificada exitosamente!`);
    
    // Cerrar la conexion
    await sequelize.close();
    
    // Ahora probar conexion a la base de datos especifica
    const dbSequelize = new Sequelize(
      config.development.database,
      config.development.username,
      config.development.password,
      {
        host: config.development.host,
        port: config.development.port,
        dialect: config.development.dialect,
        logging: false
      }
    );
    
    await dbSequelize.authenticate();
    console.log(`✅ Conexión exitosa a la base de datos '${config.development.database}'!`);
    await dbSequelize.close();
    
    console.log('\n🎉 Configuración de base de datos completa!');
    console.log('📊 Nombre de la base de datos:', config.development.database);
    console.log('🔗 Host:', config.development.host);
    console.log('👤 Usuario:', config.development.username);
    console.log('\n📝 Próximos pasos:');
    console.log('1. Actualizar la contraseña en config/config.json');
    console.log('2. Ejecutar: npx sequelize model:create --name foto --attributes titulo:string,descripcion:string,calificacion:float,ruta:string');
    console.log('3. Ejecutar: npx sequelize db:migrate');
    
  } catch (error) {
    console.error('❌ Configuración de base de datos fallida:');
    console.error('Error:', error.message);
    console.log('\n🔧 Solución de problemas:');
    console.log('1. Asegúrate de que MySQL esté en ejecución');
    console.log('2. Verifica si la contraseña en config/config.json es correcta');
    console.log('3. Intenta conectarte manualmente: mysql -u root -p');
    console.log('4. Si no se estableció contraseña durante la instalación de MySQL, cambia "your_mysql_password_here" a null');
  }
}

setupDatabase(); 