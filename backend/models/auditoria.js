import mongoose from "mongoose";

const auditoriaSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    valesEmitidos: { type: Number, required: true },
    valesUtilizados: { type: Number, required: true },
    valesNoUtilizados: { type: Number, required: true },
    periodo: { type: String, required: true }, // Ejemplo: "2024-11"
    detalles: { type: String }
});

const Auditoria = mongoose.model('Auditoria', auditoriaSchema);

module.exports = Auditoria;