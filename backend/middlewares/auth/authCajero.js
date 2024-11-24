const isCajero = (req, res, next) => {
    if (req.rolAuth !== 'cajero') {
        return res.status(403).json({ message: 'Acceso denegado.' });
    }

    next();
}