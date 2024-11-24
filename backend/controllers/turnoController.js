import mongoose from "mongoose";
import Turno from "../models/turno.js";

// Obtener todos los turnos
const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un turno por ID
const obtenerTurnoPorId = async (req, res) => {
    try {
        const turnoId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(turnoId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const turno = await Turno.findById(turnoId)
        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado.' });
        }

        res.status(200).json(turno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo turno
const crearTurno = async (req, res) => {
    try {
        const nuevoTurno = new Turno(req.body);
        const turnoGuardado = await nuevoTurno.save();
        res.status(201).json(turnoGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar un turno existente
const editarTurno = async (req, res) => {
    try {
        const turnoId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(turnoId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const turnoActualizado = await Turno.findByIdAndUpdate(turnoId, req.body, {
            new: true,
            runValidators: true
        });

        if (!turnoActualizado) {
            return res.status(404).json({ message: 'Turno no encontrado.' });
        }

        res.status(200).json(turnoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un turno
const eliminarTurno = async (req, res) => {
    try {
        const turnoId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(turnoId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const turnoEliminado = await Turno.findByIdAndDelete(turnoId);
        if (!turnoEliminado) {
            return res.status(404).json({ message: 'Turno no encontrado.' });
        }

        res.status(200).json({ message: 'Turno eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { obtenerTurnos, obtenerTurnoPorId, crearTurno, editarTurno, eliminarTurno };
