import mongoose from 'mongoose';

const transaccionSchema = new mongoose.Schema({
    codigoVale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vale',
        required: [true, 'El código del vale es obligatorio'],
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

export default mongoose.model('Transaccion', transaccionSchema);
