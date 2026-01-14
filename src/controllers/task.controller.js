import Task from '../models/task.model.js';


export const getTasks = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const tasks = await Task.findAll({ 
        where: { isArchived: false, userId: currentUser},
        order: [['createdAt', 'DESC']] 
    });
    // console.log('tasks', tasks)
    res.status(200).json(tasks);
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

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const currentUser = req.user.id;

  const task = await Task.findByPk(id);
  if(currentUser !== task.userId){
    return res.status(403).json({message: 'You are not allowed to access this task',});
  }

  if (!['Pending', 'IN Progress', 'Done'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteTask = async (req, res) => {
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
