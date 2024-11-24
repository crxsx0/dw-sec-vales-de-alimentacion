import express from 'express';
import { obtenerVales, obtenerValePorId, crearVale, editarVale, eliminarVale } from '../controllers/valeController.js';
import isAdmin from '../middlewares/auth/authAdmin.js';
const router = express.Router();

// Ruta para obtener todos los vales
router.get('/', (req, res) => {
    obtenerVales(req, res);
});

// Ruta para obtener un vale por ID
router.get('/:id', (req, res) => {
    obtenerValePorId(req, res);
});

// Ruta para crear un vale
router.post('/', isAdmin, crearVale);

// Ruta para editar un vale
router.put('/:id', isAdmin, editarVale);

// Ruta para eliminar un vale
router.delete('/:id', isAdmin, eliminarVale);

export default router;
