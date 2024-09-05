import authMiddleware from '../middleware/authMiddleware.js'; 
import express from 'express';
import {register, login, getProfile} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;
