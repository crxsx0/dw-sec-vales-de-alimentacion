import express from 'express';
import { loginUsuario } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res) => {
    loginUsuario(req, res);
});

export default router;