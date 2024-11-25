import express from 'express';
import isAdmin from '../middlewares/auth/authAdmin.js';
import { obtenerAuditorias, obtenerAuditoriaPorId, crearAuditoria, editarAuditoria } from '../controllers/auditoriaController.js';

const router = express.Router();

router.get('/', isAdmin, obtenerAuditorias);
router.get('/:id', isAdmin, obtenerAuditoriaPorId);
router.post('/', isAdmin, crearAuditoria);
router.put('/:id', isAdmin, editarAuditoria);

export default router;
