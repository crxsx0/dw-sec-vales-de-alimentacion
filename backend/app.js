import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import autenticarJWT from './middlewares/auth/authJWT.js';
import authRouter from './routes/auth.js';
import usuarioRouter from './routes/usuario.js';
import valesRouter from './routes/vales.js';
import serviciosRouter from './routes/servicios.js';
import transaccionesRouter from './routes/transacciones.js';

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

app.use('/vales', valesRouter);

app.use('/servicios', serviciosRouter);

app.use('/transacciones', transaccionesRouter);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
	res.status(404).json({ error: 'Ruta no encontrada' });
});



export default app;
