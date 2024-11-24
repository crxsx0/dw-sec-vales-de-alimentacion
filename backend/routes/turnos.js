import express from 'express';
import isAdmin from '../middlewares/auth/authAdmin.js';
import { obtenerTurnos, obtenerTurnoPorId, crearTurno, editarTurno, eliminarTurno } from '../controllers/turnoController.js';

const router = express.Router();

router.get('/', obtenerTurnos); // Ruta para obtener todos los turnos
router.get('/:id', obtenerTurnoPorId); // Ruta para obtener un turno por ID
router.post('/', isAdmin, crearTurno); // Ruta para crear un turno
router.put('/:id', isAdmin, editarTurno); // Ruta para editar un turno
router.delete('/:id', isAdmin, eliminarTurno); // Ruta para eliminar un turno

export default router;
