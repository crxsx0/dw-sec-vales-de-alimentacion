import mongoose from "mongoose";

const auditoriaSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario asociado es obligatorio'],
    },
    valesEmitidos: {
        type: Number,
        required: [true, 'El número de vales emitidos es obligatorio'],
    },
    valesUtilizados: {
        type: Number,
        required: [true, 'El número de vales utilizados es obligatorio'],
    },
    valesNoUtilizados: {
        type: Number,
        required: [true, 'El número de vales no utilizados es obligatorio'],
    },
    periodo: {
        type: String,
        required: [true, 'El periodo es obligatorio'], // Ejemplo: "2024-11"
    },
    detalles: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Auditoria', auditoriaSchema);