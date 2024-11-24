import mongoose from "mongoose";

const valeSchema = new mongoose.Schema({
    codigoVale: {
        type: String,
        required: [true, 'El código del vale es obligatorio'],
        unique: true,
    },
    tipoServicio: {
        type: String,
        enum: ['desayuno', 'almuerzo', 'once', 'cena1', 'cena2'],
        required: [true, 'El tipo de servicio es obligatorio'],
    },
    estado: {
        type: String,
        enum: ['emitido', 'utilizado', 'no utilizado'],
        default: 'emitido',
    },
    valor: {
        type: Number,
        required: [true, 'El valor del vale es obligatorio'],
    },
    fechaEmision: {
        type: Date,
        default: Date.now,
    },
    fechaUso: {
        type: Date,
    },
    usuarioAutorizado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario autorizado es obligatorio'],
    },
});

export default mongoose.model('Vale', valeSchema);