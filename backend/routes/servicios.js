import express from 'express';
import isAdmin from '../middlewares/authAdmin.js';
import { obtenerServicios, obtenerServicioPorId, crearServicio, editarServicio, eliminarServicio } from '../controllers/servicioController.js';

const router = express.Router();

router.get('/', obtenerServicios); // Ruta para obtener todos los servicios
router.get('/:id', obtenerServicioPorId); // Ruta para obtener un servicio por ID
router.post('/', isAdmin, crearServicio); // Ruta para crear un servicio
router.put('/:id', isAdmin, editarServicio); // Ruta para editar un servicio
router.delete('/:id', isAdmin, eliminarServicio); // Ruta para eliminar un servicio

export default router;