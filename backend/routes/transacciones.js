import express from 'express';
import isAdmin from '../middlewares/auth/authAdmin.js';
import isCajero from '../middlewares/auth/authCajero.js';
import { obtenerTransacciones, obtenerTransaccionPorId, crearTransaccion, editarTransaccion, eliminarTransaccion } from '../controllers/transaccionController.js';
import e from 'express';

const router = express.Router();

router.get('/', isAdmin, obtenerTransacciones);
router.get('/:id', isAdmin, obtenerTransaccionPorId);
router.post('/', isCajero, crearTransaccion);
router.put('/:id', isAdmin, editarTransaccion);
router.delete('/:id', isAdmin, eliminarTransaccion);

export default router;
