import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import autenticarJWT from './middlewares/authJWT.js';
import authRouter from './routes/auth.js';
import usuarioRouter from './routes/usuario.js';

// Inicialización de la aplicación
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(autenticarJWT)

// Rutas
app.get('/', (req, res) => {
	res.json({ message: 'API funcionando correctamente' });
});

app.use('/auth', authRouter);

app.use('/usuarios', usuarioRouter);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
	res.status(404).json({ error: 'Ruta no encontrada' });
});



export default app;
