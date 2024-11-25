// server.js
import connectDB from './config/database.js';
import app from './app.js';
import config from './config/config.js';

// Conectar a MongoDB
connectDB()
  .then(() => {
    // Iniciar servidor solo después de conectar a MongoDB
    app.listen(config.PORT_API_SERVER, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT_API_SERVER}`);
    });
  })
  .catch(error => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  });
