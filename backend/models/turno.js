import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
    turno: {
        type: Number,
        enum: [1, 2, 3],
        required: [true, 'El turno es obligatorio'],
        unique: true
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