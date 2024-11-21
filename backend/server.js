// server.js
import connectDB from './config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB()
  .then(() => {
    // Iniciar servidor solo después de conectar a MongoDB
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  });
