import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
    tipoServicio: { type: String, enum: ['desayuno', 'almuerzo', 'once', 'cena1', 'cena2'], required: true },
    descripcion: { type: String, required: true },
    valor: { type: Number, required: true },
    alternativas: { type: [String] }
  });
  
  const Servicio = mongoose.model('Servicio', servicioSchema);
  
  module.exports = Servicio;
