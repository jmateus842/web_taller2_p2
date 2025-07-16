const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

async function setupDatabase() {
  console.log('🔧 Setting up database for photo gallery project...\n');
  
  try {
    // First, connect without specifying a database to create it
    const sequelize = new Sequelize({
      username: config.development.username,
      password: config.development.password,
      host: config.development.host,
      port: config.development.port,
      dialect: config.development.dialect,
      logging: false
    });

    // Test connection
    await sequelize.authenticate();
    console.log('✅ MySQL connection successful!');
    
    // Create the database if it doesn't exist
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.development.database};`);
    console.log(`✅ Database '${config.development.database}' created/verified successfully!`);
    
    // Close the connection
    await sequelize.close();
    
    // Now test connection to the specific database
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
    console.log(`✅ Successfully connected to database '${config.development.database}'!`);
    await dbSequelize.close();
    
    console.log('\n🎉 Database setup complete!');
    console.log('📊 Database name:', config.development.database);
    console.log('🔗 Host:', config.development.host);
    console.log('👤 User:', config.development.username);
    console.log('\n📝 Next steps:');
    console.log('1. Update the password in config/config.json');
    console.log('2. Run: npx sequelize model:create --name foto --attributes titulo:string,descripcion:string,calificacion:float,ruta:string');
    console.log('3. Run: npx sequelize db:migrate');
    
  } catch (error) {
    console.error('❌ Database setup failed:');
    console.error('Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check if the password in config/config.json is correct');
    console.log('3. Try connecting manually: mysql -u root -p');
    console.log('4. If no password was set during MySQL installation, change "your_mysql_password_here" to null');
  }
}

setupDatabase(); 