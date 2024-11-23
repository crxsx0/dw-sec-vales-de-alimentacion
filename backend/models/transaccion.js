import mongoose from 'mongoose';

const transaccionSchema = new mongoose.Schema({
    codigoVale: {
        type: String,
        required: [true, 'El código del vale es obligatorio'],
    },
    productos: {
        type: [String],
        required: [true, 'Los productos consumidos son obligatorios'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'Debe haber al menos un producto en la transacción',
        },
    },
    totalConsumido: {
        type: Number,
        required: [true, 'El total consumido es obligatorio'],
        min: [0, 'El total consumido debe ser mayor o igual a 0'],
    },
    saldoRemanente: {
        type: Number,
        default: 0,
        min: [0, 'El saldo remanente debe ser mayor o igual a 0'],
    },
    fechaTransaccion: {
        type: Date,
        default: Date.now,
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria'],
    },
});

module.exports = mongoose.model('Transaccion', transaccionSchema);