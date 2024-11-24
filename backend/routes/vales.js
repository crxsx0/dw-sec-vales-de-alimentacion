import express from 'express';
import { obtenerVales, obtenerValePorId, crearVale, editarVale, eliminarVale } from '../controllers/valeController.js';

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
router.post('/', (req, res) => {
    crearVale(req, res);
});

// Ruta para editar un vale
router.put('/:id', (req, res) => {
    editarVale(req, res);
});

// Ruta para eliminar un vale
router.delete('/:id', (req, res) => {
    eliminarVale(req, res);
});

export default router;
