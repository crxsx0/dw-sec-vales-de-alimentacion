import mongoose from "mongoose";

const valeSchema = new mongoose.Schema({
    tipoServicio: {
        type: String,
        required: [true, 'El tipo de servicio es obligatorio'],
    },
    estado: {
        type: String,
        enum: ['emitido', 'utilizado', 'no utilizado'],
        default: 'emitido',
    },
    fechaEmision: {
        type: Date,
        default: Date.now,
    },
    fechaUso: {
        type: Date,
    },
    ubicacionUso: {
        type: String,
    },
    usuarioAutorizado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario autorizado es obligatorio'],
    },
});

export default mongoose.model('Vale', valeSchema);