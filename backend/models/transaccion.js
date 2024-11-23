import mongoose from 'mongoose';

const transaccionSchema = new mongoose.Schema({
    codigoVale: { type: String, required: true },
    productos: { type: [String], required: true },
    totalConsumido: { type: Number, required: true },
    saldoRemanente: { type: Number, default: 0 },
    fechaTransaccion: { type: Date, default: Date.now },
    ubicacion: { type: String, required: true }
  });
  
const Transaccion = mongoose.model('Transaccion', transaccionSchema);

module.exports = Transaccion;