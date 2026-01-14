
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

const validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Confirm Password should match Password'});
  }


  if (!password || !PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 6 characters and include a letter, number, and special character',
    });
  }

  next();
};

export default validateRegister;
