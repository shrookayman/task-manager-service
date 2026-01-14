import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
// import { validateDto } from '../middleware/auth.middleware.js';
// import { RegisterDto } from '../dtos/request/register.request.dto.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router;
