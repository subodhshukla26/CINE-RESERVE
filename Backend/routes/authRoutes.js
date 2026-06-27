import express from 'express';
import { login, profile, signup } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/profile', authMiddleware, profile);

export default router;
