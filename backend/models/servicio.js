import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
    tipoServicio: {
        type: String,
        required: [true, 'El tipo de servicio es obligatorio'],
        unique: true,
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del servicio es obligatoria'],
    },
    valor: {
        type: Number,
        required: [true, 'El valor del servicio es obligatorio'],
        min: [0, 'El valor debe ser mayor o igual a 0'],
    },
    alternativas: {
        type: [String],
        default: [],
    },
});

export default mongoose.model('Servicio', servicioSchema);