import express from 'express';
import isAdmin from '../middlewares/auth/authAdmin.js';
import { obtenerTransacciones, obtenerTransaccionPorId, crearTransaccion, editarTransaccion, eliminarTransaccion } from '../controllers/transaccionController.js';

const router = express.Router();

router.get('/', isAdmin, obtenerTransacciones);
router.get('/:id', isAdmin, obtenerTransaccionPorId);
router.post('/', isAdmin, crearTransaccion);
router.put('/:id', isAdmin, editarTransaccion);
router.delete('/:id', isAdmin, eliminarTransaccion);
