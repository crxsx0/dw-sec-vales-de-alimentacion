import mongoose from 'mongoose';
import Transaccion from '../models/transaccion.js';

// Obtener todas las transacciones
const obtenerTransacciones = async (req, res) => {
    try {
        const transacciones = await Transaccion.find();
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una transacción por ID
const obtenerTransaccionPorId = async (req, res) => {
    try {
        const transaccionId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(transaccionId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const transaccion = await Transaccion.findById(transaccionId);
        if (!transaccion) {
            return res.status(404).json({ message: 'Transacción no encontrada.' });
        }

        res.status(200).json(transaccion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva transacción
const crearTransaccion = async (req, res) => {
    try {
        const { codigoVale, productos, totalConsumido, saldoRemanente, ubicacion } = req.body;

        if (!codigoVale || !productos || !totalConsumido || !ubicacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const nuevaTransaccion = new Transaccion({
            codigoVale,
            productos,
            totalConsumido,
            saldoRemanente,
            ubicacion
        });

        const transaccionGuardada = await nuevaTransaccion.save();
        res.status(201).json(transaccionGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar una transacción existente
const editarTransaccion = async (req, res) => {
    try {
        const transaccionId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(transaccionId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const transaccionActualizada = await Transaccion.findByIdAndUpdate(transaccionId, req.body, {
            new: true,
            runValidators: true
        });

        if (!transaccionActualizada) {
            return res.status(404).json({ message: 'Transacción no encontrada.' });
        }

        res.status(200).json(transaccionActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una transacción
const eliminarTransaccion = async (req, res) => {
    try {
        const transaccionId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(transaccionId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const transaccionEliminada = await Transaccion.findByIdAndDelete(transaccionId);
        if (!transaccionEliminada) {
            return res.status(404).json({ message: 'Transacción no encontrada.' });
        }

        res.status(200).json({ message: 'Transacción eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { obtenerTransacciones, obtenerTransaccionPorId, crearTransaccion, editarTransaccion, eliminarTransaccion };
