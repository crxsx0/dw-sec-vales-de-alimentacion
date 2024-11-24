import express from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', (req, res) => {
    obtenerUsuarios(req, res);
});

router.get('/:id', (req, res) => {
    obtenerUsuarioPorId(req, res);
});

router.post('/', (req, res) => {
    crearUsuario(req, res);
});

router.put('/:id', (req, res) => {
    editarUsuario(req, res);
});

router.delete('/:id', (req, res) => {
    eliminarUsuario(req, res);
});

export default router;
