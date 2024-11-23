import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    turno: { type: Number, enum: [1, 2, 3], required: true },
    periodo: { type: String, required: true }, // Ejemplo: "2024-11"
    sucursal: { type: String, required: true }
  });
  
const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;
