import express from 'express';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js'; 
import validateTask  from '../middleware/validateTask.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getTasks);
router.post('/',validateTask, createTask);
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
