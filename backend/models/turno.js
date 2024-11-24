import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario asociado es obligatorio'],
    },
    turno: {
        type: Number,
        enum: [1, 2, 3],
        required: [true, 'El turno es obligatorio'],
    },
    periodo: {
        type: String,
        required: [true, 'El periodo es obligatorio'], // Ejemplo: "2024-11"
    },
    sucursal: {
        type: String,
        required: [true, 'La sucursal es obligatoria'],
    },
});

export default mongoose.model('Turno', turnoSchema);