import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import validateRegister  from '../middleware/validateRegister.js';

const router = express.Router();

// Register route
router.post('/register',validateRegister, register);

// Login route
router.post('/login', login);

export default router;
