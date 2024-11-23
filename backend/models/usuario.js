import mongoose from 'mongoose';


const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigoEmpleado: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['funcionario', 'administrador', 'cajero'], required: true },
    turnoActual: { type: Number, required: true },
    sucursal: { type: String, required: true }
  });

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
