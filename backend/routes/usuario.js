import express from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    obtenerUsuarios(req, res);
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
    obtenerUsuarioPorId(req, res);
});

// Ruta para crear un usuario
router.post('/', (req, res) => {
    crearUsuario(req, res);
});

// Ruta para editar un usuario
router.put('/:id', (req, res) => {
    editarUsuario(req, res);
});

// Ruta para eliminar un usuario
router.delete('/:id', (req, res) => {
    eliminarUsuario(req, res);
});

export default router;
