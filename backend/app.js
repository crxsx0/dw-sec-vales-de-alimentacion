import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

// Importar middlewares
import autenticarJWT from './middlewares/auth/authJWT.js';
import authRouter from './routes/auth.js';

// Importar rutas
import usuarioRouter from './routes/usuario.js';
import valesRouter from './routes/vales.js';
import serviciosRouter from './routes/servicios.js';
import transaccionesRouter from './routes/transacciones.js';
import auditoriasRouter from './routes/auditorias.js';
import turnosRouter from './routes/turnos.js';

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

// Ruta para la autenticación
app.use('/auth', authRouter);

// Ruta para los usuarios
app.use('/usuarios', usuarioRouter);

// Ruta para los vales
app.use('/vales', valesRouter);

// Ruta para los servicios
app.use('/servicios', serviciosRouter);

// Ruta para las transacciones
app.use('/transacciones', transaccionesRouter);

// Ruta para las auditorías
app.use('/auditorias', auditoriasRouter);

// Ruta para los turnos
app.use('/turnos', turnosRouter);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
	res.status(404).json({ error: 'Ruta no encontrada' });
});



export default app;
