import express from 'express';
import isAdmin from '../middlewares/authAdmin.js';
import { obtenerServicios, obtenerServicioPorId, crearServicio, editarServicio, eliminarServicio } from '../controllers/servicioController.js';

const router = express.Router();

router.get('/', obtenerServicios);
router.get('/:id', obtenerServicioPorId);
router.post('/', isAdmin, crearServicio);
router.put('/:id', isAdmin, editarServicio);
router.delete('/:id', isAdmin, eliminarServicio);

export default router;