const validateTask = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: 'Task title is required',
    });
  }

  if (description && description.length > 500) {
    return res.status(400).json({
      message: 'Description must be less than 500 characters',
    });
  }

  next();
};

export default validateTask;
