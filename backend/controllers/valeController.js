import mongoose from 'mongoose';
import Vale from '../models/vale.js';

// Obtener todos los vales
const obtenerVales = async (req, res) => {
    try {
        const vales = await Vale.find();
        res.status(200).json(vales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un vale por ID
const obtenerValePorId = async (req, res) => {
    try {
        const valeId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(valeId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const vale = await Vale.findById(valeId);
        if (!vale) {
            return res.status(404).json({ message: 'Vale no encontrado.' });
        }

        res.status(200).json(vale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo vale
const crearVale = async (req, res) => {
    try {
        const nuevoVale = new Vale(req.body);
        const valeGuardado = await nuevoVale.save();
        res.status(201).json(valeGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar un vale
const editarVale = async (req, res) => {
    try {
        const valeId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(valeId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const valeActualizado = await Vale.findByIdAndUpdate(valeId, req.body, {
            new: true,
            runValidators: true
        });

        if (!valeActualizado) {
            return res.status(404).json({ message: 'Vale no encontrado.' });
        }

        res.status(200).json(valeActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un vale
const eliminarVale = async (req, res) => {
    try {
        const valeId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(valeId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const valeEliminado = await Vale.findByIdAndDelete(valeId);
        if (!valeEliminado) {
            return res.status(404).json({ message: 'Vale no encontrado.' });
        }

        res.status(200).json({ message: 'Vale eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { obtenerVales, obtenerValePorId, crearVale, editarVale, eliminarVale };