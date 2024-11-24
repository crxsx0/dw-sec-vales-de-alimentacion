import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res) => {
    loginUsuario(req, res);
});

router.post('/register', (req, res) => {
    registrarUsuario(req, res);
});

export default router;