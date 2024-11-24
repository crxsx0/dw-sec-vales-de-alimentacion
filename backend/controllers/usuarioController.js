import mongoose from "mongoose";
import Usuario from '../models/usuario.js';
import Vale from "../models/vale.js";
import Auditoria from "../models/auditoria.js";
import Turno from "../models/turno.js";

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const userId = req.params.id;

        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { nombre, codigoEmpleado, password, rol, email, turnoActual, perfil, sucursal } = req.body;
        
        if (req.rolAuth !== 'administrador') {
            return res.status(401).json({ message: 'No tienes permisos para realizar esta acción.' });
        }

        // Validar campos obligatorios
        if (!nombre || !codigoEmpleado || !password || !rol || !email || !turnoActual || !sucursal) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        if (await Usuario.findOne({ codigoEmpleado })) {
            return res.status(400).json({ message: 'El código de empleado ya está registrado.' });
        }

        const nuevoUsuario = new Usuario({
            nombre,
            codigoEmpleado,
            password,
            rol,
            email,
            turnoActual,
            perfil,
            sucursal
        });

        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Editar un usuario existente
const editarUsuario = async (req, res) => {
    try {
        const userId = req.params.id;

        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(userId, req.body, {
            new: true, // Retorna el usuario actualizado
            runValidators: true // Aplica las validaciones del esquema
        });

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Eliminar datos relacionados
        await Vale.deleteMany({ usuarioAutorizado: userId });
        await Auditoria.deleteMany({ usuarioId: userId });
        await Turno.deleteMany({ usuarioId: userId });

        // Eliminar usuario
        await Usuario.findByIdAndDelete(userId);

        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario };
