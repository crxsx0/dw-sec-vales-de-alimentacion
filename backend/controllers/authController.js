import Usuario from '../models/usuario.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const registrarUsuario = async (req, res) => {
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

const loginUsuario = async (req, res) => {
    try {
        const { codigoEmpleado, password } = req.body;

        const usuario = await Usuario.findOne({ codigoEmpleado });
        if (!usuario) {
            return res.status(400).json({ message: 'Código de empleado o contraseña incorrectos.' });
        }

        if (password !== usuario.password) {
            return res.status(400).json({ message: 'Código de empleado o contraseña incorrectos.' });
        }
        
        const token = jwt.sign({ usuario: usuario.codigoEmpleado, rol: usuario.rol }, config.JWT_SECRET);

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { registrarUsuario, loginUsuario };
