import express from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';
import isAdmin from '../middlewares/auth/authAdmin.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para crear un usuario
router.post('/', isAdmin, crearUsuario);

// Ruta para editar un usuario
router.put('/:id', isAdmin, editarUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', isAdmin, eliminarUsuario);

export default router;
