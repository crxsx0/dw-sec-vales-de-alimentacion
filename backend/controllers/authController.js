import Usuario from '../models/usuario.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

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

export { loginUsuario };
