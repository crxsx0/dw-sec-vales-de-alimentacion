import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const autenticarJWT = (req, res, next) => {
    const token = req.body.token

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.usuarioAuth = decoded.usuario;
        req.rolAuth = decoded.rol;
        next();
    } catch (error) {
        req.usuarioAuth = null;
        req.rolAuth = null;
        return next();
    }
};

export default autenticarJWT;
