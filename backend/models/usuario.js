import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    },
    codigoEmpleado: {
        type: String,
        required: [true, 'El código de empleado es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    rol: {
        type: String,
        enum: ['funcionario', 'administrador', 'cajero'],
        required: [true, 'El rol es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        match: [/^\S+@\S+\.\S+$/, 'El correo electrónico no es válido'],
    },
    perfil: {
        type: String,
        enum: ['obrero', 'jefe', 'gerente'],
        required: [true, 'El perfil del usuario es obligatorio'],
    },
    turnoActual: {
        type: Number,
        required: [true, 'El turno actual es obligatorio'],
    },
    sucursal: {
        type: String,
        required: [true, 'La sucursal es obligatoria'],
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
