import mongoose from "mongoose";

const valeSchema = new mongoose.Schema({
    codigoVale: { type: String, unique: true, required: true },
    tipoServicio: { type: String, enum: ['desayuno', 'almuerzo', 'once', 'cena1', 'cena2'], required: true },
    estado: { type: String, enum: ['emitido', 'utilizado', 'no utilizado'], default: 'emitido' },
    fechaEmision: { type: Date, default: Date.now },
    fechaUso: { type: Date },
    ubicacionUso: { type: String },
    valeAdicional: { type: Boolean, default: false },
    usuarioAutorizado: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
  });


const Vale = mongoose.model('Vale', valeSchema);

module.exports = Vale;
