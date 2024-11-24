const isAdmin = async (req, res, next) => {
    if (req.rolAuth !== 'administrador') {
        return res.status(403).json({ message: 'Acceso denegado.' });
    }

    next();
}

export default isAdmin;
