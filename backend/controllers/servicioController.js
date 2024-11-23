import mongoose from "mongoose";
import Servicio from "../models/servicio.js";

// Obtener todos los servicios
const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un servicio por ID
const obtenerServicioPorId = async (req, res) => {
    try {
        const servicioId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(servicioId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const servicio = await Servicio.findById(servicioId);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }

        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo servicio
const crearServicio = async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        const servicioGuardado = await nuevoServicio.save();
        res.status(201).json(servicioGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar un servicio
const editarServicio = async (req, res) => {
    try {
        const servicioId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(servicioId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const servicioActualizado = await Servicio.findByIdAndUpdate(servicioId, req.body, {
            new: true,
            runValidators: true
        });

        if (!servicioActualizado) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }

        res.status(200).json(servicioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un servicio
const eliminarServicio = async (req, res) => {
    try {
        const servicioId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(servicioId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const servicioEliminado = await Servicio.findByIdAndDelete(servicioId);
        if (!servicioEliminado) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }

        res.status(200).json({ message: 'Servicio eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerServicios,
    obtenerServicioPorId,
    crearServicio,
    editarServicio,
    eliminarServicio
};