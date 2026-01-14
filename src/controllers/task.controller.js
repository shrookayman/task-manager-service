import Task from '../models/task.model.js';
import {TaskStatus} from '../Enums/taskStatus.js'

export const getTasks = async (req, res) => {
  try {
    const currentUser = req.user.id;

   
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

   
    const totalTasks = await Task.count({ where: { isArchived: false, userId: currentUser } });

    const tasks = await Task.findAll({
      where: { isArchived: false, userId: currentUser },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.status(200).json({
      tasks,
      totalTasks,
      page,
      totalPages: Math.ceil(totalTasks / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const currentUser = req.user.id;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const task = await Task.create({ title, description , userId : currentUser});
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const allowedTransitions = {
  [TaskStatus.PENDING]: [TaskStatus.IN_PROGRESS],
  [TaskStatus.IN_PROGRESS]: [TaskStatus.DONE],
  [TaskStatus.DONE]: [TaskStatus.PENDING]
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status: newStatus } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!Object.values(TaskStatus).includes(newStatus)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const allowedNext = allowedTransitions[task.status];
    if (!allowedNext.includes(newStatus)) {
      return res.status(400).json({
        message: `Cannot change status from ${task.status} to ${newStatus}`,
      });
    }

    task.status = newStatus;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  const currentUser = req.user.id;
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if(currentUser !== task.userId){
        return res.status(403).json({message: 'You are not allowed to access this task',});
    }

    task.isArchived = true;
    await task.save();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
