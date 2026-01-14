import express from 'express';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js'; // JWT auth middleware

const router = express.Router();

// Protect all routes
router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
