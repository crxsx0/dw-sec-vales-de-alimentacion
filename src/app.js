// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB()
  .then(() => {
    // Middleware
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Rutas
    app.get('/', (req, res) => {
      res.json({ message: 'API funcionando correctamente' });
    });

    // Manejo de rutas no encontradas
    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Ruta no encontrada' });
    });

    // Iniciar servidor solo después de conectar a MongoDB
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  });
