import mongoose from "mongoose";
import Auditoria from "../models/auditoria.js";

// Obtener todas las auditorías
const obtenerAuditorias = async (req, res) => {
    try {
        const auditorias = await Auditoria.find().populate('usuarioId');
        res.status(200).json(auditorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una auditoría por ID
const obtenerAuditoriaPorId = async (req, res) => {
    try {
        const auditoriaId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(auditoriaId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const auditoria = await Auditoria.findById(auditoriaId).populate('usuarioId');
        if (!auditoria) {
            return res.status(404).json({ message: 'Auditoría no encontrada.' });
        }

        res.status(200).json(auditoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva auditoría
const crearAuditoria = async (req, res) => {
    try {
        const nuevaAuditoria = new Auditoria(req.body);
        const auditoriaGuardada = await nuevaAuditoria.save();
        res.status(201).json(auditoriaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar una auditoría existente
const editarAuditoria = async (req, res) => {
    try {
        const auditoriaId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(auditoriaId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const auditoriaActualizada = await Auditoria.findByIdAndUpdate(auditoriaId, req.body, {
            new: true,
            runValidators: true
        });

        if (!auditoriaActualizada) {
            return res.status(404).json({ message: 'Auditoría no encontrada.' });
        }

        res.status(200).json(auditoriaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una auditoría
const eliminarAuditoria = async (req, res) => {
    try {
        const auditoriaId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(auditoriaId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const auditoriaEliminada = await Auditoria.findByIdAndDelete(auditoriaId);
        if (!auditoriaEliminada) {
            return res.status(404).json({ message: 'Auditoría no encontrada.' });
        }

        res.status(200).json({ message: 'Auditoría eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerAuditorias,
    obtenerAuditoriaPorId,
    crearAuditoria,
    editarAuditoria,
    eliminarAuditoria
};